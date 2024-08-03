"use client";

import { auth } from "@/db/configFirebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { TiUserOutline } from "react-icons/ti";
import useClientAuth from "../hooks/useClientAuth";

export default function Nav() {
  const { user, loginGoogle, redirectIfConnected } = useClientAuth();
  const router = useRouter();

  const goToDashboard = () => {
    if (!user) {
      loginGoogle();
    } else {
      redirectIfConnected();
    }
  };

  const handleSignout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <nav className="h-[70px] w-full  flex justify-between items-center bg-orange-600 p-3 mx-auto">
      <li
        onClick={goToDashboard}
        className="text-white flex items-center gap-2 p-2 rounded-full hover:text-orange-600 hover:bg-white transition-all"
      >
        <FaHome />
        <span>Home</span>
      </li>

      {!user ? (
        <button
          onClick={goToDashboard}
          className="text-white hover:bg-white hover:text-orange-600 p-3 rounded-full transition-all"
        >
          <TiUserOutline />
        </button>
      ) : (
        <button
          onClick={handleSignout}
          className="text-white hover:bg-white hover:text-orange-600 p-3 rounded-full transition-all"
        >
          <FaSignOutAlt />
        </button>
      )}
    </nav>
  );
}
