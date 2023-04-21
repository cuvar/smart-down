import { signIn } from "next-auth/react";

export default function NoAuth() {
  return (
    <>
      <div>You're not authorized</div>
      <button onClick={() => signIn()} className="hover:text-gray-300 active:text-gray-500">Sign in here</button>
    </>
  );
}
