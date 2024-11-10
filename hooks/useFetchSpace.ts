import fetchSpace from "@/services/fetchSpace";
import { useEffect, useState } from "react";

interface Space {
  _id: string;
  user_id: string;
  name: string;
  coords1: number[];
  coords2: number[];
  subSpaces: string[];
  thingList: string[];
}

export default function useFetchSpace(id: string) {
  const [space, setSpace] = useState<Space>();
  const [subSpaces, setSubSpaces] = useState<Space[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSpaceData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSpace(id, setSpace);
      } catch (err) {
        console.error("Error fetching the space in useFetchSpace hook:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpaceData();
  }, [id]);

  // SubSpaces fetch effect
  useEffect(() => {
    const fetchSubSpaces = async () => {
      // Check if `space` or `subSpaces` is undefined or empty
      if (!space || !Array.isArray(space.subSpaces) || space.subSpaces.length === 0) {
        setSubSpaces([]);
        return;
      }
  
      setIsLoading(true);
      try {
        const fetchedSubSpaces = await Promise.all(
          space.subSpaces.map((subSpaceId) => fetchSpace(subSpaceId))
        );
  
        setSubSpaces(fetchedSubSpaces);
      } catch (err) {
        console.error("Error fetching subspaces:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSubSpaces();
  }, [space]);
  return { space, subSpaces, isLoading };
}
