import express from "express";
import { assignStudent, createMentor, createStudent, getAllStudents, getMentorDetails, getStudentById, lockMarks, unassignStudent, updateMarks } from "../controller/commonController.js";
const router = express.Router();

//Mentor Routes
router
    .route('/mentor/create')
    .post(createMentor);

router
    .route('/mentor/:mentorId')
    .get(getMentorDetails);
router
    .route('/mentor/assign')
    .post(assignStudent);
router
    .route('/mentor/unassign')
    .post(unassignStudent);
router
    .route('/mentor/submit')
    .post(lockMarks);

//Student Routes
router
    .route('/student/all')
    .get(getAllStudents);
router
    .route('/student/create')
    .post(createStudent);
router
    .route('/student/update')
    .post(updateMarks);
router
    .route('/student/:id')
    .get(getStudentById);

export default router;