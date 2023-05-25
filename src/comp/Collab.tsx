import { signOut } from "next-auth/react";
import Editor from "./Editor";
import { Note } from "~/server/note";
import { api } from "~/utils/api";

interface Props {
  note: Note | undefined;
  isAdmin: boolean;
}

export default function Collab(props: Props) {
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

  const setShareableMutation = api.note.setShareable.useMutation({
    onSuccess() {
      isShareableQuery.refetch();
    },
  });
  const isShareableQuery = api.note.isShareable.useQuery({
    id: props.note?.id ?? "",
  });

  function setShareable(value: boolean) {
    setShareableMutation.mutate({
      id: props.note?.id ?? "",
      value: value,
    });
  }
  return (
    <div className="flex w-full max-w-3xl flex-col items-center space-y-4 px-10">
      <a
        href="/"
        className="flex space-x-2 hover:text-gray-300 active:text-gray-500"
      >
        <span>{backIcon}</span>
        <span>back</span>
      </a>
      {props.isAdmin ? (
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold">Admin mode</h1>
          <button
            className="hover:text-gray-300 active:text-gray-500"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </div>
      ) : (
        <h1 className="text-2xl font-bold">Collab mode</h1>
      )}
      {!props.note ? (
        <div>This note does not exist</div>
      ) : (
        <Editor note={props.note} />
      )}
      {props.isAdmin && (
        <div className="flex space-x-4">
          {isShareableQuery.data ? (
            <button
              className="btn-outline btn-error btn"
              onClick={() => setShareable(false)}
            >
              Stop collaboration
            </button>
          ) : (
            <button
              className="btn-outline btn-success btn"
              onClick={() => setShareable(true)}
            >
              Share
            </button>
          )}
        </div>
      )}
    </div>
  );
}
