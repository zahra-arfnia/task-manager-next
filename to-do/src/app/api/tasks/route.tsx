import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/dbConect";
import Task from "@/src/models/tasks";

interface TaskBody {
  title: string;
  description: string;
  important?: boolean;
  completed?: boolean;
  deadline: string; 
  directory: string; 
}

export async function GET() : Promise<NextResponse> {
    await connectDB()
     const tasks = await Task.find().populate("directory", "name")
     return NextResponse.json(tasks)
}

export async function POST(req:Request) : Promise<NextResponse> {
    try {
        await connectDB()
        const body : TaskBody= await req.json()

        if (!body.title  || !body.deadline || !body.directory) {
            return NextResponse.json({message:" title , deadline , directory is requires"} ,{status:400})
        }

        const deadlinedate = new Date(body.deadline)

        const newTask =await Task.create({
              title: body.title,
      description: body.description,
      important: body.important ?? false,
      completed: body.completed ?? false,
      deadline: deadlinedate,
      directory: body.directory,
        })

        return NextResponse.json(newTask , {status:201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:"server is errored in created new task"} ,{status :500})
    }
}