"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import SendMessage from "../components/SendMessage";
import useClientAuth from "../hooks/useClientAuth";

export default function PageChat() {
  const router = useRouter();
  const { user, isFetch } = useClientAuth();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (!isFetch) {
      setIsloading(false);
    }
  }, [isFetch]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  return (
    <div className="w-full h-screen">
      <ChatContainer />
      <SendMessage />
    </div>
  );
}
