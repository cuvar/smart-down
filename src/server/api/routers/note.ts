import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  setContent,
} from "~/server/note/note";

export const noteRouter = createTRPCRouter({
  create: publicProcedure.query(() => {
    return createNote();
  }),
  getAll: publicProcedure.query(() => {
    return getAllNotes();
  }),
  getNote: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return getNote(input.id);
    }),
  setContent: publicProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(({ input }) => {
      setContent(input.id, input.content);
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      deleteNote(input.id);
    }),
});
