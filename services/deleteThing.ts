import { SERVER_URL, JWT_TOKEN } from "../envVariables";
import { Alert } from "react-native";

export default async function deleteThing(id: string) {
  try {
    const response = await fetch(`${SERVER_URL}/things/${id}`, {
      method: "DELETE",
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
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching spaces:", errorMessage);
    Alert.alert("Error", errorMessage);
  }
}
