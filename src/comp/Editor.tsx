import { useState } from "react";
import { api } from "~/utils/api";
import { Note } from "~/server/note";

interface Props {
  note: Note;
}

export default function Editor(props: Props) {
  const [content, setContent] = useState(props.note.content);
  const setContentMutation = api.note.setContent.useMutation();

  function saveContent() {
    console.log("saving");
    console.log(content);
    setContentMutation.mutate({
      id: props.note.id,
      content: content,
    });
  }
  return (
    <>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        className="textarea-bordered textarea bg-yellow-100 p-4 leading-relaxed text-gray-600 selection:bg-gray-300 selection:text-slate-900"
        placeholder="Notes"
        defaultValue={content}
        onChange={(e) => setContent(e.target.value)}
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
