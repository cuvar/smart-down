import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import NoAuth from "~/comp/NoAuth";
import NoteList from "~/comp/NoteList";

const Home: NextPage = () => {
  // todo: implement auth
  const [isAdmin, setIsAdmin] = useState(true);
  const { data: sessionData } = useSession();
  console.log(sessionData);

  return (
    <>
      <Head>
        <title>smart-down</title>
        <meta
          name="description"
          content="self hosted note taking app for collaboration"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {isAdmin ? <NoteList /> : <NoAuth />}
      </main>
    </>
  );
};

export default Home;
