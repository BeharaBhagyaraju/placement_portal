import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'recruiter'],
    required: true
  },
  cgpa: {
    type: Number,
    min: [0.0, "CGPA cannot be less than 0.0"],
    max: [10.0, "CGPA cannot be more than 10.0"],
    // Only required for students — frontend/backend logic ensures this
  },
  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume: { type: String },
    resumeOriginalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    profilePhoto: {
      type: String,
      default: ""
    }
  },
  resetToken: {
    type: String
  },
  resetTokenExpiry: {
    type: Date
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
