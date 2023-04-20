import Editor from "./Editor";

export default function Collab() {
  const backIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <a href="/" className="flex space-x-2">
        <span>{backIcon}</span>
        <span>back</span>
      </a>
      <h1 className="text-2xl font-bold">Collab mode</h1>
      <Editor />
    </div>
  );
}
