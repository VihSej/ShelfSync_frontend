import { SERVER_URL, JWT_TOKEN } from "../envVariables";
import { useState } from "react";
import { Alert } from "react-native";

export default async function fetchSpace(
  id: string | undefined,
  setSpaces?: (value: any) => void
) {
  try {
    // Log the full URL for debugging
    console.log("Fetching from:", `${SERVER_URL}/spaces/${id}`);

    const response = await fetch(`${SERVER_URL}/spaces/${id}`, {
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
    console.log();
    console.log(data);
    console.log();
    setSpaces?.(data);
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching spaces:", errorMessage);
    Alert.alert("Error", errorMessage);
  }
}
