interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NoteList() {
  // get all notes
  // redirect to notes

  const notes: Note[] = [
    {
      id: "12b3602b-fb94-4064-831f-4b72465ed83f",
      title: "Sample note",
      content: "# Sample note\nthis is a note\n- in markdown format",
    },
    {
      id: "84544b50-53a7-4bf8-8ca7-aca174f4a3b0",
      title: "Todos",
      content: "# Just some todos\n- first todo\n- second todo\n- third todo",
    },
  ];

  function newNote() {
    // todo: on backend
    // const newUuid = crypto.randomUUID();
    // console.log("new note:", newUuid);
    // window.location.href = `/${newUuid}`;
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
                  <a href={`/${n.id}`} className="h-full w-full bg-green-500">
                    {n.title}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
