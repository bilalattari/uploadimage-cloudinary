"use server";

import { revalidatePath } from "next/cache";

export async function addImageToDB(obj) {
  let uploaded = await fetch(`http://localhost:3000/api/images`, {
    method: "POST",
    body: JSON.stringify(obj),
  });

  if (uploaded.ok) {
    uploaded = await uploaded.json();
    revalidatePath("/");
    return uploaded;
  } else {
    throw Error("Something Went Wrong");
  }
}

export async function getImages() {
  let uploaded = await fetch(`http://localhost:3000/api/images`);
  return await uploaded.json();
}