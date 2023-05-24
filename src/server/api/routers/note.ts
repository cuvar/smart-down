import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import jsot, { JostOperation } from "~/server/jost";
import { NoteRepository } from "~/server/note/repository";
import { isShareable } from "~/server/note/utils";
import { findDeletion, findInsertion } from "~/utils/string";

const noteRepository = new NoteRepository();
const storeMap = new Map<string, jsot>();

export const noteRouter = createTRPCRouter({
  create: publicProcedure.query(() => {
    const note = noteRepository.createNote();
    const newStore = new jsot("");
    storeMap.set(note, newStore);
    return note;
  }),
  getAll: publicProcedure.query(() => {
    const notes = noteRepository.getAllNotes();
    notes.forEach((note) => {
      let store = storeMap.get(note.id);
      if (typeof store === "undefined") {
        store = new jsot(note.content);
        storeMap.set(note.id, store);
      } else {
        store.setContent(note.content);
      }
    });
    return notes;
  }),
  getNote: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const note = noteRepository.getNote(input.id);

      let store = storeMap.get(input.id);
      if (typeof store === "undefined") {
        store = new jsot(note.content);
        storeMap.set(input.id, store);
      } else {
        store.setContent(note.content);
      }

      return note;
    }),
  isShareable: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return isShareable(input.id);
    }),
  save: publicProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(({ input }) => {
      let store = storeMap.get(input.id);
      if (typeof store === "undefined") {
        noteRepository.setContent(input.id, input.content);
        return;
      }
      const newContent = store.execute();
      noteRepository.setContent(input.id, newContent);
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      noteRepository.deleteNote(input.id);
    }),
  addInsertOperation: publicProcedure
    .input(z.object({ id: z.string(), before: z.string(), after: z.string() }))
    .mutation(({ input }) => {
      const store = getStoreById(input.id);
      const insertion = findInsertion(input.before, input.after);
      store.insert(insertion.position, insertion.text);
    }),
  addDeleteOperation: publicProcedure
    .input(z.object({ id: z.string(), before: z.string(), after: z.string() }))
    .mutation(({ input }) => {
      const store = getStoreById(input.id);
      const deletion = findDeletion(input.before, input.after);
      store.delete(deletion.position, deletion.length);
    }),
});

function getStoreById(id: string): jsot {
  let store = storeMap.get(id);
  if (typeof store === "undefined") {
    store = new jsot("");
    storeMap.set(id, store);
  }
  return store;
}

// todo: OT wont quite work when inserting at the same position
