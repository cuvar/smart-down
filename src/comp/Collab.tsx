import Editor from "./Editor";

export default function Collab() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Collab mode</h1>
      <Editor />
    </div>
  );
}
