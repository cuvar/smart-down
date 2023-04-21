import * as fs from "fs";
import * as crypto from "crypto";
import { Note } from "~/utils/types";

const NOTES_DIR = "notes";
const EXT = ".note";

export function createNote(): string {
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
}

export function deleteNote(id: string) {
  if (!fs.existsSync(NOTES_DIR)) {
    throw new Error("Notes directory does not exist");
  }

  fs.unlinkSync(`${NOTES_DIR}/${id}${EXT}`);
}

export function setContent(id: string, content: string) {
  if (!fs.existsSync(NOTES_DIR)) {
    fs.mkdirSync(NOTES_DIR);
  }

  fs.writeFileSync(`${NOTES_DIR}/${id}${EXT}`, content);
}

function parseTitle(content: string): string {
  const lines = content.split("\n");
  return lines[0] ?? "";
}

export function getNote(id: string): Note | null {
  if (!fs.existsSync(NOTES_DIR)) {
    throw new Error("Notes directory does not exist");
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
    throw new Error("Note not found");
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

export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) {
    throw new Error("Notes directory does not exist");
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
