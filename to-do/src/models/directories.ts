// import { model, Schema, Document, Types } from "mongoose";

// export interface IDirectory extends Document {
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const DirectorySchema = new Schema<IDirectory>(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       maxlength: [10, "Please add a name less than 10 characters"],
//     },
//   },
//   { timestamps: true }
// );

// const Directory = model<IDirectory>("Directory", DirectorySchema);
// export default Directory;
import mongoose, { Schema, models, model } from "mongoose";

const DirectorySchema = new Schema({
  name: { type: String, required: true },
});


const Directory = models.Directory || model("Directory", DirectorySchema);

export default Directory;
