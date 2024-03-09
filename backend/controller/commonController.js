import express from "express";
import Student from '../model/studentModel.js';
import Mentor from '../model/mentorModel.js';

export const createStudent = async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json({
        success: true,
        student
    })
}

export const createMentor = async (req, res) => {
    console.log(req.body, 14);
    const mentor = await Mentor.create(req.body);
    res.status(201).json({
        success: true,
        mentor
    })
}

export const assignStudent = async (req, res) => {
    const { mentorId, studentId } = req.body;
    let mentor = await Mentor.findByIdAndUpdate(mentorId, { $push: { students: studentId } }, { new: true });
    res.status(200).json({
        success: true,
        mentor
    })
}

export const getStudentById = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.json({
        success: true,
        student
    })
}

export const getMentorDetails = async (req, res) => {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId);
    res.json({
        success: true,
        mentor
    })
}

export const getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.json({
        success: true,
        students
    })
}

export const unassignStudent = async (req, res) => {

    const mentor = await Mentor.findByIdAndUpdate(req.body.mentorId, { $pull: { students: req.body.studentId } }, { new: true });
    res.json({
        success: true,
        mentor
    })
}

export const updateMarks = async (req, res) => {
    const { ideationMarks, pitchMarks, executionMarks, studentID } = req.body;
    let student;
    if (ideationMarks) {
        student = await Student.findByIdAndUpdate(studentID, { ideation: ideationMarks }, { new: true })
    }
    if (executionMarks) {
        student = await Student.findByIdAndUpdate(studentID, { execution: executionMarks }, { new: true });
    }
    if (pitchMarks) {
        student == await Student.findByIdAndUpdate(studentID, { pitch: pitchMarks }, { new: true })
    }
    res.json({
        success: true,
        student
    })
}

export const lockMarks = async (req, res) => {
    const { mentorId } = req.body;
    const mentor = await Mentor.findByIdAndUpdate(mentorId, { isLocked: true }, { new: true });
    res.json({
        success: true,
        mentor
    })
}