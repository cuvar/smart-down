export function parseTitle(content: string): string {
  const lines = content.split("\n");
  return lines[0] ?? "";
}

export declare interface Note {
  id: string;
  title: string;
  content: string;
}

export function isShareable(id: string): boolean {
  // todo: implement
  return false;
}
