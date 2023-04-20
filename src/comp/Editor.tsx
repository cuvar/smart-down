import { useState } from "react";
import { api } from "~/utils/api";
import { Note } from "~/utils/types";

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
        className="textarea-bordered textarea bg-yellow-100 p-4"
        placeholder="Notes"
        defaultValue={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={() => saveContent()}>save</button>
    </>
  );
}
