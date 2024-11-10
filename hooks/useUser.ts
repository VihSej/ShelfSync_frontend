import { useState, useEffect } from "react";
import fetchSpace from "../services/fetchSpace";
import fetchUser from "../services/fetchUser";
interface Space {
  _id: string;
  user_id: string;
  name: string;
  coords1: number[];
  coords2: number[];
  subSpaces: string[];
  thingList: string[];
}
interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  universe: string;
}
export function useUser() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetchUser(setUser);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUserData();
  }, []);

  return user;
}
