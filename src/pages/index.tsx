import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Admin from "~/comp/Admin";
import NoAuth from "~/comp/NoAuth";
import NoteList from "~/comp/NoteList";

// import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [isAdmin, setIsAdmin] = useState(true);

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
