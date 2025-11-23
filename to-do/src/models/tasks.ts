// import { Model , Schema , Document , Types, model } from "mongoose";

// export interface ITask extends Document{
//     title:string,
//     description:string,
//     important:boolean,
//     completed:boolean,
//     deadline:Date,
//     directory:Types.ObjectId
// }

// const TaskSchema = new Schema<ITask>({
//     title:{
//         type:String,
//         required:true,
//         maxlength:[15,"pleas add a name less 15 then charecters"]
//     },
//     description:{
//         type:String,
//         required:true,
//     },
//     important:{
//         type:Boolean,
//         default:false,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false,
//         required:true
//     },
//     deadline:{
//         type:Date,
//         required :true,
//     },
//     directory:{
//         type:Schema.Types.ObjectId,
//         ref:"Directory",
//         required:true
//     }

// },
// { timestamps: true }
// )

// const Task = model<ITask>("Task",TaskSchema)
// export default Task

import { Model , Schema , Document , Types, model, models } from "mongoose";

export interface ITask extends Document {
    title: string,
    description: string,
    important: boolean,
    completed: boolean,
    deadline: Date,
    directory: Types.ObjectId
}

const TaskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
        maxlength: [15, "please add a name less than 15 characters"]
    },
    description: {
        type: String,
    },
    important: {
        type: Boolean,
        default: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: Date,
        required: true,
    },
    directory: {
        type: Schema.Types.ObjectId,
        ref: "Directory",
        required: true
    }
},
{ timestamps: true }
);

// prevent OverwriteModelError
const Task = models.Task || model<ITask>("Task", TaskSchema);

export default Task;
