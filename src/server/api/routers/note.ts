import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { NoteRepository } from "~/server/note/repository";

const noteRepository = new NoteRepository();

export const noteRouter = createTRPCRouter({
  create: publicProcedure.query(() => {
    return noteRepository.createNote();
  }),
  getAll: publicProcedure.query(() => {
    return noteRepository.getAllNotes();
  }),
  getNote: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return noteRepository.getNote(input.id);
    }),
  setContent: publicProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(({ input }) => {
      noteRepository.setContent(input.id, input.content);
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      noteRepository.deleteNote(input.id);
    }),
});
