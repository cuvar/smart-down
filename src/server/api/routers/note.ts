import * as fs from "fs";
import * as crypto from "crypto";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Note } from "~/utils/types";

const NOTES_DIR = "notes";
export const noteRouter = createTRPCRouter({
  create: publicProcedure.query(() => {
    const newUuid = crypto.randomUUID();
    // create a file with the uuid as the name
    if (!fs.existsSync(NOTES_DIR)) {
      fs.mkdirSync(NOTES_DIR);
    }

    fs.open(`${NOTES_DIR}/${newUuid}.note`, "w", (err, file) => {
      if (err) throw err;
      console.log("file created");
    });

    return newUuid;
  }),
  getAll: publicProcedure.query(() => {
    try {
      const notes = getNotes(NOTES_DIR);
      return notes;
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
});

function parseTitle(content: string): string {
  const lines = content.split("\n");
  return lines[0] ?? "";
}

function getNotes(dir: string): Note[] {
  if (!fs.existsSync(dir)) {
    return []; // no notes
  }

  const files = fs.readdirSync(NOTES_DIR);

  const mapped = files.map((f) => {
    const splitted = f.split(".");
    if (!f.endsWith(".note")) {
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
