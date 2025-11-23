import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/dbConect";
import Task from "@/src/models/tasks";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const res = await Task.findById(params.id);

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

  await Task.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "deleted" });
}

