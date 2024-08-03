"use client";

import useClientAuth from "@/app/hooks/useClientAuth";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  const { loginGoogle } = useClientAuth();
  return (
    <section className="w-full h-screen flex items-center justify-center p-3">
      <div className="max-w-[1000px] m-auto flex items-center justify-center flex-col gap-5 text-center">
        <h1 className="text-6xl uppercase font-black">
          chat
          <span className="text-orange-600"> APP</span>
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni sequi,
          neque suscipit, nulla dolore minima dolor assumenda mollitia at
          asperiores architecto, quam sed tempora sint exercitationem sapiente
          ducimus! Error, voluptate.
        </p>

        <button
          onClick={loginGoogle}
          className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md p-2 flex items-center gap-2"
        >
          <FcGoogle />
          <span>Se Connecter avec google</span>
        </button>
      </div>
    </section>
  );
}
