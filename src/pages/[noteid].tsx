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

  const isShareableQuery = api.note.isShareable.useQuery({
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
        {sessionData == null && !isShareableQuery.data ? (
          <NotFound />
        ) : (
          <Collab note={getNoteQuery.data} isAdmin={sessionData != null} />
        )}
      </main>
    </>
  );
};

const NotFound = () => {
  return (
    <div className="flex flex-col items-center space-y-10">
      <h3 className="text-3xl font-bold">Not allowed</h3>
      <p className="text-lg">Sorry, you're not allowed to view this :(</p>
    </div>
  );
};

export default Note;
