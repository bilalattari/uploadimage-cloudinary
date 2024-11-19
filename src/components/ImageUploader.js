"use client";

import { addImageToDB } from "@/actions/images";
import { uploadImage } from "@/actions/upload";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useState } from "react";

function ImageUploader() {
  const router = useRouter();
  const initialState = {
    message: "",
    imageUrl: "",
  };

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  // Using `useActionState` with the `uploadImage` action

  const [state, formAction, pending] = useActionState(
    async (previousState, formData) => {
      const result = await uploadImage(formData);
      return {
        message: result.message,
        imageUrl: result.imageUrl,
      };
    },
    initialState
  );

  const handleFileChange = (event) => {
    console.log("event=>", event.target.files[0]);
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <div className=" w-full my-10 lg:w-1/2 mx-auto">
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="w-full  rounded border p-2"
          maxLength={20}
          placeholder="Title"
        />
      </div>
      <form
        action={formAction}
        className="space-y-4 p-4 bg-white rounded-lg shadow-md w-full  lg:w-1/2 mx-auto"
      >
        <div>
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <span className="text-sm text-gray-600">
              {file
                ? `Selected file: ${file.name}`
                : "Click to select an image"}
            </span>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={pending || !file}
          >
            {pending ? "Uploading..." : "Upload"}
          </button>
        </div>

        {state.message && (
          <p
            aria-live="polite"
            className={`text-sm ${
              state.imageUrl ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}

        {state.imageUrl && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">
              Uploaded Image:
            </h3>
            <img
              src={state.imageUrl}
              alt="Uploaded"
              className="mt-2 w-full rounded-lg border border-gray-300"
            />
          </div>
        )}
      </form>
      <div className=" w-full my-10 lg:w-1/2 mx-auto">
        <button
          onClick={async () => {
            await addImageToDB({
              title,
              image: state.imageUrl,
            });
            router.back();
          }}
          disabled={title == "" || state.imageUrl == ""}
          className="bg-blue-300 rounded w-full p-3"
        >
          Add To DB
        </button>
      </div>
    </div>
  );
}

export default ImageUploader;
