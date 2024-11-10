import { SERVER_URL, JWT_TOKEN } from "../envVariables";
import { Alert } from "react-native";

export default async function fetchThings(
  spaceId: string,
  recursive: boolean = false
): Promise<any[]> {
  try {
    const queryParams = new URLSearchParams({
      space: spaceId,
      recursive: recursive.toString(),
    });

    const response = await fetch(`${SERVER_URL}/things?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized - Please login again");
      }
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching things:", errorMessage);
    Alert.alert("Error", errorMessage);
    return [];
  }
}
