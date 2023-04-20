import * as fs from "fs";
import * as crypto from "crypto";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
  setTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      // return {
      //   greeting: `Hello ${input.text}`,
      // };
      // todo:
    }),
});
