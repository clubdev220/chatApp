import { db } from "@/db/configFirebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import useClientAuth from "../hooks/useClientAuth";

interface Message {
  id: string;
  name: String;
  text: String;
  avatar: string;
  createdAt: string;
}

export default function ChatContainer() {
  const [data, setData] = useState<Message[]>([]);
  const { user } = useClientAuth();

  useEffect(() => {
    const q = query(
      collection(db, "conversation"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const messages: Message[] = [];
      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: data.id,
          name: data.name,
          text: data.text,
          avatar: data.avatar,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
        });
      });

      setData(messages);
    });
    return () => unsubscribe();
  }, []);

  console.log(data);

  return (
    <>
      <div className="max-w-[700px] h-screen m-auto">
        {data.length === 0 ? (
          <div className="h-screen flex items-center justify-center">
            pas de message
          </div>
        ) : (
          <ul className="flex flex-col gap-3 p-10 pb-[150px]">
            {data.map((msg, index) => (
              <li
                key={index}
                className={`relative flex items-center p-3 max-w-xs rounded-lg ${
                  msg.id === user?.uid
                    ? "self-end rounded-br-none bg-orange-300 text-orange-900"
                    : "self-start rounded-bl-none bg-gray-300 text-gray-900"
                }`}
              >
                <Image
                  src={msg.avatar}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-bold"> {msg.name}</p>
                  <p>{msg.text}</p>
                  <span className="text-xs text-gray-600">
                    {msg.createdAt.toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
