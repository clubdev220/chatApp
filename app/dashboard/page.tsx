"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useClientAuth from "../hooks/useClientAuth";

export default function PageDashboard() {
  const router = useRouter();
  const { user, redirectIfConnected } = useClientAuth();
  console.log(user);

  useEffect(() => {
    if (!user) {
      redirectIfConnected();
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className="w-full h-screen relative">
          <div className="w-full h-screen flex items-center flex-col gap-5 p-3 pt-20">
            <span className="font-bold text-orange-600">Votre compte</span>
            <h1 className="text-6xl uppercase font-black">
              dash<span className="text-orange-600"> board</span>
            </h1>

            <ul className="flex flex-col justify-center items-center p-3 gap-2">
              <li className="">
                <img
                  src={`${user?.photoURL}`}
                  alt="photo de profils"
                  className="w-16 h-16 rounded-full"
                />
              </li>
            </ul>

            <button
              onClick={() => {
                router.push("/chat");
              }}
              className=" block bg-orange-600 px-3 py-1 text-white hover:bg-orange-400 my-2 rounded-md transition"
            >
              Accéder au chat
            </button>
          </div>
        </div>
      )}
      ;
    </>
  );
}
