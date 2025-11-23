import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/dbConect";
import Directory from "@/src/models/directories";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const res = await Directory.findById(params.id);

  if (!res) {
    return NextResponse.json({ message: "not found" }, { status: 404 });
  }
  return NextResponse.json(res);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await Directory.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "deleted" });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const body = await req.json();

  if (!body.name) {
    return NextResponse.json({ message: "name required" }, { status: 400 });
  }

  const updated = await Directory.findByIdAndUpdate(
    params.id,
    { name: body.name },
    { new: true }
  );

  return NextResponse.json(updated);
}
