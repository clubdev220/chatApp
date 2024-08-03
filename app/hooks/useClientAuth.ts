import { auth } from "@/db/configFirebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const provider = new GoogleAuthProvider();

const useClientAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetch, setIsFetch] = useState(true);

  const router = useRouter();

  const loginGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      router.push("/dashboard");
    }
  }; //fin la fonction loginGoogle

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        setIsFetch(false);
      } else {
        setUser(null);
        setIsFetch(false);
      }
    });

    return () => unsubscribe();
  }, []); //fin de useEffet

  const redirectIfConnected = () => {
    if (user) {
      router.push("/dashboard");
    }
  }; // fin de la fonction redirectIfConnected

  //retournement de toutes les fonction

  return { user, isFetch, redirectIfConnected, loginGoogle };
};

export default useClientAuth;
