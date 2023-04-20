import * as fs from "fs";
import * as crypto from "crypto";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Note } from "~/utils/types";

const NOTES_DIR = "notes";
const EXT = ".note";

export const noteRouter = createTRPCRouter({
  create: publicProcedure.query(() => {
    const newUuid = crypto.randomUUID();
    // create a file with the uuid as the name
    if (!fs.existsSync(NOTES_DIR)) {
      fs.mkdirSync(NOTES_DIR);
    }

    fs.open(`${NOTES_DIR}/${newUuid}${EXT}`, "w", (err, file) => {
      if (err) throw err;
      console.log("file created");
    });

    return newUuid;
  }),
  getAll: publicProcedure.query(() => {
    try {
      const notes = getAllNotes(NOTES_DIR);
      return notes;
    } catch (error) {
      throw error;
    }
  }),
  getNote: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      try {
        const note = getNote(NOTES_DIR, input.id);
        if (note == null) {
          throw new Error("Note not found");
        }
        return note;
      } catch (error) {
        throw error;
      }
    }),
  setTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      // return {
      //   greeting: `Hello ${input.text}`,
      // };
      // todo:
    }),
  setContent: publicProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(({ input }) => {
      // return {
      //   greeting: `Hello ${input.text}`,
      // };
      // todo:
    }),
});

function parseTitle(content: string): string {
  const lines = content.split("\n");
  return lines[0] ?? "";
}

function getNote(dir: string, id: string): Note | null {
  if (!fs.existsSync(dir)) {
    return null; // no notes dir
  }

  // check if id is UUID
  if (
    !id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    )
  ) {
    return null; // invalid id
  }

  const filePath = `${NOTES_DIR}/${id}${EXT}`;
  if (!fs.existsSync(filePath)) {
    return null; // no note with id
  }

  const data = fs.readFileSync(filePath, "utf8");
  const parsedTitle = parseTitle(data);
  const realTitle = parsedTitle?.trim() === "" ? "Untitled" : parsedTitle;

  return {
    id: id,
    title: realTitle,
    content: data,
  } as Note;
}

function getAllNotes(dir: string): Note[] {
  if (!fs.existsSync(dir)) {
    return []; // no notes
  }

  const files = fs.readdirSync(NOTES_DIR);

  const mapped = files.map((f) => {
    const splitted = f.split(".");
    if (!f.endsWith(`${EXT}`)) {
      throw new Error("Invalid file name");
    }

    const data = fs.readFileSync(`${NOTES_DIR}/${f}`, "utf8");
    const parsedTitle = parseTitle(data);
    const realTitle = parsedTitle?.trim() === "" ? "Untitled" : parsedTitle;

    return {
      id: splitted[0],
      title: realTitle,
      content: data,
    } as Note;
  });

  return mapped;
}
