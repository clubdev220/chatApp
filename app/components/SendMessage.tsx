import { db } from "@/db/configFirebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoIosSend } from "react-icons/io";
import useClientAuth from "../hooks/useClientAuth";

export default function SendMessage() {
  const [value, setValue] = useState("");
  const { user } = useClientAuth();

  const ahndleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    console.log(val);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (user) {
        const { uid, displayName, photoURL } = user;
        await addDoc(collection(db, "conversation"), {
          text: value,
          id: uid,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setValue("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white fixed bottom-0 w-full py-10 flex items-center justify-center px-3 flex-col"
    >
      <div className="w-full flex items-center justify-center px-3">
        <input
          value={value}
          onChange={ahndleChange}
          placeholder="Votre message ..."
          className="p-3 w-full outline-none border-none rounded-l-md shadow-black"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-200 text-white p-3 flex items-center gap-2 border-none rounded-r-md"
        >
          <IoIosSend />
          Envoyer
        </button>
      </div>
    </form>
  );
}
