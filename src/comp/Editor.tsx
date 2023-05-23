import { useState } from "react";
import { api } from "~/utils/api";
import { Note } from "~/server/note";

interface Props {
  note: Note;
}

export default function Editor(props: Props) {
  const [content, setContent] = useState(props.note.content);
  const [deleteTextBefore, setDeleteTextBefore] = useState(content);
  const saveMutation = api.note.save.useMutation();
  const addDeleteOperationMutation = api.note.addDeleteOperation.useMutation();

  function saveContent() {
    console.log("saving");
    console.log(content);
    saveMutation.mutate({
      id: props.note.id,
      content: content,
    });
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // if key is delete
    if (e.key === "Backspace") {
      console.log("deleting");
      // get text of note-area
      const deletion = findDeletion(deleteTextBefore, content);
      if (deletion === null) {
        return;
      }
      console.log(deletion);

      setDeleteTextBefore(content);
      addDeleteOperationMutation.mutate({
        id: props.note.id,
        pos: deletion.position,
        len: deletion.length,
      });
    } else {
      setDeleteTextBefore(content);
    }
  }

  function findDeletion(
    s1: string,
    s2: string
  ): { position: number; length: number } {
    console.log(s1);
    console.log(s2);
    for (let i = 0; i < s1.length; i++) {
      for (let j = i + 1; j <= s1.length; j++) {
        const temp = s1.slice(0, i) + s1.slice(j);
        if (temp === s2) {
          return { position: i, length: j - i };
        }
      }
    }
    return { position: -1, length: 0 };
  }

  return (
    <>
      <textarea
        name=""
        id="note-area"
        cols={30}
        rows={10}
        className="textarea-bordered textarea bg-yellow-100 p-4 leading-relaxed text-gray-600 selection:bg-gray-300 selection:text-slate-900"
        placeholder="Notes"
        defaultValue={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyUp={(e) => handleKeyUp(e)}
      ></textarea>
      <button
        onClick={() => saveContent()}
        className="hover:text-gray-300 active:text-gray-500"
      >
        save
      </button>
    </>
  );
}
