import { useRouter } from "expo-router";
import Home from "./Home";
import { useEffect } from "react";
import { isLoggedIn } from "@/services/auth";

export default function HomeScreen() {
  const router = useRouter();
  useEffect(() => {(async () => { 
    if (!(await isLoggedIn()))
      router.push("/login");
  })()}, []);

  return <Home />;
}
