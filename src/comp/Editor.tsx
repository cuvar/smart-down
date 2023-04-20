import { useState } from "react";
import { Note } from "~/utils/types";

interface Props {
  note: Note;
}

export default function Editor(props: Props) {
  const [content, setContent] = useState(props.note.content);
  const [title, setTitle] = useState(props.note.content);

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
      ></textarea>
    </>
  );
}
