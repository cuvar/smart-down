export function parseTitle(content: string): string {
  const lines = content.split("\n");
  return lines[0] ?? "";
}

export function isValidMetaFile(json: any): json is NoteMeta {
  if (!json.shareable || !Array.isArray(json.shareable)) return false;
  return true;
}

export declare interface Note {
  id: string;
  title: string;
  content: string;
}

export declare interface NoteMeta {
  shareable: string[];
}
