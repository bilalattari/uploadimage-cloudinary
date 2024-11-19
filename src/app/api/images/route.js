import { ImageModal } from "@/lib/ImageModal";
import connectDB from "@/lib/dbConnect";

export async function POST(req) {
  await connectDB();
  const obj = await req.json();

  let newImg = await new ImageModal({ ...obj });
  newImg = await newImg.save();

  return Response.json({
    error: false,
    image: newImg,
  });
}

export async function GET(req) {
  await connectDB();

  let images = await ImageModal.find().sort({ createdAt: -1 });

  return Response.json({
    error: false,
    images: images,
  });
}
