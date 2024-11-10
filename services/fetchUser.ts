import { JWT_TOKEN, SERVER_URL } from "@/envVariables";

export default async function fetchUser(setUser: (value: any) => void) {
  try {
    const response = await fetch(`${SERVER_URL}/auth`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized - Please login again");
      }
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    setUser(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching user");
  }
}
