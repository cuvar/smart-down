import { useState } from "react";
import { api } from "~/utils/api";
import { Note } from "~/server/note";
import { signOut } from "next-auth/react";

const trashIcon = (
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
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

export default function NoteList() {
  // todo: implement collaboration with other users through links

  const [currentNote, setCurrentNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  const getAllQuery = api.note.getAll.useQuery(undefined, {
    onSuccess: (res) => setNotes(res),
  });
  const createQuery = api.note.create.useQuery(undefined, {
    enabled: false,
    onSuccess: (data) => {
      console.log("created note:", data);
      window.location.href = `/${data}`;
    },
  });
  const deleteMutation = api.note.delete.useMutation({
    onSuccess: () => getAllQuery.refetch(),
  });

  async function newNote() {
    await createQuery.refetch();
  }

  function deleteNote(id: string) {
    deleteMutation.mutate({ id: id });
    console.log("deleting note");
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center space-y-4 px-10">
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start mx-2">
          <h1 className="w-full text-2xl font-bold">Your notes</h1>
          <button className="hover:text-gray-300 active:text-gray-500" onClick={() => signOut()}>
            Log out
          </button>
        </div>
        <button className="btn-outline btn" onClick={newNote}>
          new note
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((n) => (
              <tr key={n.id} className="hover">
                <td className="flex justify-between">
                  <a href={`/${n.id}`} className="h-full w-full">
                    {n.title}
                  </a>
                  <button
                    onClick={() => deleteNote(n.id)}
                    className="hover:text-red-300 active:text-red-500"
                  >
                    {trashIcon}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>{currentNote}</div>
      </div>
    </div>
  );
}
