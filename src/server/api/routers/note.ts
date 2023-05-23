import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import jsot, { JostOperation } from "~/server/jost";
import { NoteRepository } from "~/server/note/repository";

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
    .input(z.object({ id: z.string(), pos: z.number(), content: z.string() }))
    .mutation(({ input }) => {
      let store = storeMap.get(input.id);
      if (typeof store === "undefined") {
        store = new jsot("");
        storeMap.set(input.id, store);
      }
      store.insert(input.pos, input.content);
    }),
  addDeleteOperation: publicProcedure
    .input(z.object({ id: z.string(), pos: z.number(), len: z.number() }))
    .mutation(({ input }) => {
      const store = getStoreById(input.id);
      store.delete(input.pos, input.len);
      console.log(store);
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
