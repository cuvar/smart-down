import Editor from "./Editor";

export default function Admin() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Admin view</h1>
      <Editor />
      <div className="flex space-x-2">
        <button className="btn-outline btn-primary btn">share</button>
        <button className="btn-outline btn-error btn">
          Stop collaboration
        </button>
      </div>
    </div>
  );
}
