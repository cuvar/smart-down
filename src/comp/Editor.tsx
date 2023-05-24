import { useState } from "react";
import { api } from "~/utils/api";
import { Note } from "~/server/note";

interface Props {
  note: Note;
}

export default function Editor(props: Props) {
  const [content, setContent] = useState(props.note.content);
  const [textBefore, setTextBefore] = useState(content);
  const getQuery = api.note.getNote.useQuery(
    { id: props.note.id },
    {
      onSuccess: (res) => {
        setContent(res.content);
        setTextBefore(res.content);
      },
    }
  );

  const saveMutation = api.note.save.useMutation({
    onSuccess: () => getQuery.refetch(),
  });
  const addDeleteOperationMutation = api.note.addDeleteOperation.useMutation();
  const addInsertOperationMutation = api.note.addInsertOperation.useMutation();

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

      addDeleteOperationMutation.mutate({
        id: props.note.id,
        before: textBefore,
        after: content,
      });

      setTextBefore(content);
    } else {
      if (textBefore === content) {
        return;
      }

      console.log("inserting");
      addInsertOperationMutation.mutate({
        id: props.note.id,
        before: textBefore,
        after: content,
      });

      setTextBefore(content);
    }
  }

  return (
    <>
      <textarea
        name=""
        id="note-area"
        // cols={50}
        rows={10}
        className="textarea-bordered textarea w-full bg-yellow-100 p-4 leading-relaxed text-gray-600 selection:bg-gray-300 selection:text-slate-900"
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
