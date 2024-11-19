import { getImages } from "@/actions/images";
import ImageUploader from "@/components/ImageUploader";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export default async function Home() {
  // const { images } = await getImages();
  // console.log("images=>", images);
  return (
    <div className="container mx-auto py-10">
      <div className="flex">
        <SearchBar />
        <Link href={"/addImage"}>
          <button className="bg-blue-300 rounded py-2 px-4">Add Image</button>
        </Link>
      </div>
      {/* <div className="flex flex-wrap gap-3 my-10">
        {images?.map((data) => {
          return (
            <div className="bg-gray-100 rounded p-2 flex flex-col">
              <img className="h-40 w-full rounded" src={data.image} />
              <h1 className="font-bold mt-2">{data.title}</h1>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
