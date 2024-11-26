import { NextResponse } from "next/server";
import { decryptData, encryptData } from "@/lib/encryption";

export const secureController = async (controller, request) => {
  try {
    let decryptedBody = null;

    // Attempt to parse and decrypt the body only if present
    if (request.body) {
      try {
        const encryptedBody = await request.json();
        decryptedBody = encryptedBody?.payload
          ? decryptData(encryptedBody.payload)
          : null;
      } catch (error) {
        console.warn("Failed to parse or decrypt body:", error);
        // Continue without a body if parsing fails
      }
    }

    console.log("Decrypted Request Body:", decryptedBody);

    // Execute the controller logic, passing decryptedBody if available
    const result = await controller(decryptedBody, request);

    console.log("Result from controller:", result);

    // Encrypt the response payload
    const encryptedResponse = encryptData(result);

    // Return a properly formatted response
    return NextResponse.json(
      { encryptedData: encryptedResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in secureController:", error);
    return NextResponse.json(
      { message: "Failed to process request" },
      { status: 500 }
    );
  }
};
