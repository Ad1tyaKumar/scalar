import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    students: [{
        type: String
    }],
    isLocked: {
        type: Boolean
    }
})

export default mongoose.model('mentor', mentorSchema);