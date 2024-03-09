import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    ideation: {
        type: Number
    },
    execution: {
        type: Number
    },
    pitch: {
        type: Number
    }
})

export default mongoose.model('student', studentSchema);