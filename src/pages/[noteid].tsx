import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Collab from "~/comp/Collab";
import { api } from "~/utils/api";

const Note: NextPage = () => {
  const router = useRouter();
  const { noteid } = router.query;
  console.log(noteid);

  const getNoteQuery = api.note.getNote.useQuery({
    id: typeof noteid == "string" ? noteid : "",
  });

  return (
    <>
      <Head>
        <title>smart-down collab</title>
        <meta
          name="description"
          content="self hosted note taking app for collaboration"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Collab note={getNoteQuery.data} />
      </main>
    </>
  );
};

export default Note;
