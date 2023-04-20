import { useState } from "react";
import { api } from "~/utils/api";
import { Note } from "~/utils/types";

export default function NoteList() {
  // get all notes
  // redirect to notes

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

  async function newNote() {
    await createQuery.refetch();
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center space-y-4 px-10">
      <div className="flex w-full justify-between">
        <h1 className="w-full text-2xl font-bold">Your notes</h1>
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
                <td>
                  <a href={`/${n.id}`} className="h-full w-full">
                    {n.title}
                  </a>
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
