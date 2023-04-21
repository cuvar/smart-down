import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Collab from "~/comp/Collab";
import { api } from "~/utils/api";

const Note: NextPage = () => {
  // todo: implement auth
  const { data: sessionData } = useSession();

  const router = useRouter();
  const { noteid } = router.query;

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
        <Collab note={getNoteQuery.data} isAdmin={sessionData != null} />
      </main>
    </>
  );
};

export default Note;
