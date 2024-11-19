"use server";

export async function uploadImage(formInfo) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(timestamp, apiSecret);

  try {
    const formData = new FormData();
    formData.append("file", formInfo.get("image"));
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Upload successful!",
        imageUrl: data.secure_url,
      };
    } else {
      console.error("Upload failed:", data.error.message);
      return {
        success: false,
        message: `Upload failed: ${data.error.message}`,
      };
    }
  } catch (error) {
    console.error("An error occurred during the upload:", error.message);
    return {
      success: false,
      message: `Error during upload: ${error.message}`,
    };
  }
}

function generateSignature(timestamp, apiSecret) {
  const crypto = require("crypto");
  return crypto
    .createHash("sha256")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
}
