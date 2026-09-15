import mongoose from "mongoose";

// 1. create a schema
// 2. model based of that schema

const noteSchema = new mongoose.Schema(
    {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title : {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    }, 
    { timestamps: true } // createdAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note