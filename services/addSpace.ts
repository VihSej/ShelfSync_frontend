import { SERVER_URL, JWT_TOKEN } from "../envVariables";

export async function addSpace(data: {
  name: string;
  description: string | null;
  coords1: number[];
  coords2: number[];
  superSpace: string;
  image: string | null; // Local URI
}) {
  try {
    // Prepare the FormData
    const formData = new FormData();

    // Add text fields
    formData.append("name", data.name);
    if (data.description) {
      formData.append("description", data.description);
    }
    formData.append("coords1[0]", data.coords1[0].toString());
    formData.append("coords1[1]", data.coords1[1].toString());
    formData.append("coords2[0]", data.coords2[0].toString());
    formData.append("coords2[1]", data.coords2[1].toString());
    formData.append("superSpace", data.superSpace);

    // Add the image field
    if (data.image) {
      const fileUriParts = data.image.split("/");
      const fileName = fileUriParts[fileUriParts.length - 1];

      formData.append("image", {
        uri: data.image, // The URI from ImagePicker
        name: fileName, // Filename
        type: "image/jpeg", // Adjust MIME type if necessary
      } as any);
    }

    // Make the API request
    const response = await fetch(`${SERVER_URL}/spaces`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`, // Use the token for authentication
        "Content-Type": "multipart/form-data", // Ensure correct content type
      },
      body: formData,
    });

    console.log(formData);

    // Check if the response is successful
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized - Please log in again");
      }
      throw new Error(`Failed to add space: ${response.statusText}`);
    }

    // Parse the JSON response
    const result = await response.json();

    // Return the result and validate the JWT token
    return {
      result, // Data from the API
      token: JWT_TOKEN, // Return the token to validate the user is logged in
    };
  } catch (error: any) {
    console.error("Error adding item:", error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
