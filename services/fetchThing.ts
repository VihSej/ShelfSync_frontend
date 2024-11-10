import { SERVER_URL, JWT_TOKEN } from "../envVariables";
import { Alert } from "react-native";

interface Thing {
  _id: string;
  user_id: string;
  name: string;
  description?: string;
  space: any; // Define the Space type if available
  image?: string;
}

export default async function fetchItem(itemId: string): Promise<Thing | null> {
  try {
    const response = await fetch(`${SERVER_URL}/things/${itemId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      throw new Error("Item not found.");
    }

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized - Please log in again.");
      }
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data: Thing = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Error fetching item:", errorMessage);
    Alert.alert("Error", errorMessage);
    return null;
  }
}
