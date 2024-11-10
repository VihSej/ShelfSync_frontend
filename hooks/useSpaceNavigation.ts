// hooks/useSpaceNavigation.ts
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
export function useSpaceNavigation(shouldRender: boolean) {
  const [spaces, setSpaces] = useState<Space>();
  const [user, setUser] = useState<User>();
  const [subSpaces, setSubSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // User fetch effect
  useEffect(() => {
    const fetchUserData = async () => {
      if (shouldRender) {
        setIsLoading(true);
        try {
          await fetchUser(setUser);
        } catch (err) {
          console.error("Error fetching user:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUserData();
  }, [shouldRender]);

  // Space fetch effect
  useEffect(() => {
    const fetchSpaceData = async () => {
      if (user?.universe) {
        setIsLoading(true);
        try {
          await fetchSpace(user.universe, setSpaces);
        } catch (err) {
          console.error("Error fetching space:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSpaceData();
  }, [user]);

  // SubSpaces fetch effect
  useEffect(() => {
    const fetchSubSpaces = async () => {
      if (!spaces?.subSpaces.length) return;

      setIsLoading(true);
      try {
        const fetchedSubSpaces = await Promise.all(
          spaces.subSpaces.map((subSpaceId) => fetchSpace(subSpaceId))
        );

        // Filter out any null results from failed fetches
        const validSubSpaces = fetchedSubSpaces.filter(
          (space): space is Space => space !== null && space !== undefined
        );

        setSubSpaces(validSubSpaces);
      } catch (err) {
        console.error("Error fetching subspaces:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubSpaces();
  }, [spaces]);

  return { spaces, subSpaces, isLoading };
}
