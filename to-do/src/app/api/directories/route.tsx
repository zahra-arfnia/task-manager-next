import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/dbConect";
import Directory from "@/src/models/directories";

interface DirectoryBody {
  name: string;
}

export async function GET(): Promise<NextResponse> {
await connectDB()
const dirs = await Directory.find()
return NextResponse.json(dirs)
}


export async function POST(req:Request) :Promise<NextResponse> {
    try {
        await connectDB()
        const body:DirectoryBody =await req.json()
        if (!body.name) {
            return NextResponse.json({message:"name is required"} , {status:400})
        }

        const newdir = await Directory.create({
            name :body.name
        })

        return NextResponse.json(newdir)
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:"server is errored in created new dir"} ,{status:500})
    }
}

