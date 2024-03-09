import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import axios from "axios";
import backEndUrl from "../../Host";
import Modal from "@mui/material/Modal";

interface Student {
  _id: string;
  name: string;
  email: string;
  ideation: number;
  pitch: number;
  execution: number;
}

interface Mentor {
  _id: string;
  name: string;
  email: string;
  students: string[];
  isLocked: boolean;
}

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterMethod, setFilterMethod] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);
  const [mentor, setMentor] = useState<Mentor>();
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);
  const [ideation, setIdeation] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [execution, setExecution] = useState(0);
  const [curStudentId, setCurStudentId] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const newRef: any = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${backEndUrl}/student/all`);
      setStudents(res.data.students);
      const res1 = await axios.get(
        `${backEndUrl}/mentor/65ec03965b9024f0d009df3f`
      );
      console.log(res1.data.mentor);

      setMentor(res1.data.mentor);
      setLoading(false);
    })();
  }, []);

  const handleOutsideClick = (e: any) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setIsFiltering(false);
    }
  };
  return (
    <div className="main">
      <h3>Evaluation Dashboard</h3>
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <p>Hey! {mentor?.name}</p>
            <p>Assign Students for evaluation</p>
            <div>
              {isFiltering ? (
                <div
                  ref={newRef}
                  // onClick={() => setIsFiltering(false)}
                  className="filter2"
                >
                  <p
                    onClick={async () => {
                      const res = await axios.get(`${backEndUrl}/student/all`);
                      let student: Student[] = res.data.students;
                      let student1 = student.filter((item) => {
                        if (isChecked) {
                          return mentor?.students.filter(
                            (i) => i === item._id
                          ) &&
                            mentor?.students.filter((i) => i === item._id)
                              .length
                            ? true
                            : false;
                        } else {
                          return true;
                        }
                      });
                      let st = student1.filter((item: Student) => {
                        let isTrue = false;
                        if (item.pitch) {
                          isTrue = true;
                        }
                        if (item.execution) {
                          isTrue = true;
                        }
                        if (item.ideation) {
                          isTrue = true;
                        }
                        return !isTrue;
                      });
                      setStudents(st);
                      setFilterMethod(1);
                      setIsFiltering(false);
                    }}
                  >
                    Marks Unassigned
                  </p>
                  <hr />
                  <p
                    onClick={async () => {
                      const res = await axios.get(`${backEndUrl}/student/all`);
                      let student: Student[] = res.data.students;
                      let student1 = student.filter((item) => {
                        if (isChecked) {
                          return mentor?.students.filter(
                            (i) => i === item._id
                          ) &&
                            mentor?.students.filter((i) => i === item._id)
                              .length
                            ? true
                            : false;
                        } else {
                          return true;
                        }
                      });
                      let st = student1.filter((item) => {
                        let isTrue = false;
                        if (item.pitch) {
                          isTrue = true;
                        }
                        if (item.execution) {
                          isTrue = true;
                        }
                        if (item.ideation) {
                          isTrue = true;
                        }
                        return isTrue;
                      });
                      setStudents(st);
                      setFilterMethod(2);
                      setIsFiltering(false);
                    }}
                  >
                    Marks Assigned
                  </p>
                </div>
              ) : filterMethod ? (
                <div className="filter1">
                  <p
                    onClick={() => {
                      setIsFiltering(true);
                    }}
                  >
                    {filterMethod === 1 ? "Marks Unassigned" : "Marks Assigned"}
                  </p>
                  <i
                    onClick={async () => {
                      const res = await axios.get(`${backEndUrl}/student/all`);
                      let student: Student[] = res.data.students;
                      let student1 = student.filter((item) => {
                        if (isChecked) {
                          return mentor?.students.filter(
                            (i) => i === item._id
                          ) &&
                            mentor?.students.filter((i) => i === item._id)
                              .length
                            ? true
                            : false;
                        } else {
                          return true;
                        }
                      });
                      setStudents(student1);
                      setIsFiltering(false);

                      setFilterMethod(0);
                    }}
                    className="fa-solid fa-xmark"
                  ></i>
                </div>
              ) : (
                <div onClick={() => setIsFiltering(true)} className="filter1">
                  <p>Filter By</p>
                </div>
              )}
              {isFiltering ? <div> </div> : <></>}
              <div
                className="checkbox"
                onClick={async () => {
                  setStudentLoading(true);
                  let st = students.filter((item) => {
                    let isTrue = false;
                    if (item.pitch) {
                      isTrue = true;
                    }
                    if (item.execution) {
                      isTrue = true;
                    }
                    if (item.ideation) {
                      isTrue = true;
                    }
                    if (!filterMethod) {
                      return true;
                    }
                    if (filterMethod === 1) {
                      return !isTrue;
                    } else {
                      return isTrue;
                    }
                  });
                  if (!isChecked) {
                    let student1 = st.filter((item: Student) => {
                      return mentor?.students.filter((i) => i === item._id) &&
                        mentor?.students.filter((i) => i === item._id).length
                        ? true
                        : false;
                    });
                    setStudents(student1);
                  } else {
                    const res = await axios.get(`${backEndUrl}/student/all`);
                    setStudents(res.data.students);
                  }
                  setStudentLoading(false);
                  setIsChecked(!isChecked);
                }}
              >
                <input type="checkbox" id="check" checked={isChecked} />
                <p>Only show your students</p>
              </div>
            </div>
            {!students || !students.length ? (
              <div className="nostudents">No students to display</div>
            ) : (
              <></>
            )}
            {error ? <div className="error">{error}</div> : <></>}
            {students &&
              students.map((item) => {
                let isMarksAssigned: boolean = false;
                if (!item) {
                  return;
                }
                if (item.ideation) {
                  isMarksAssigned = true;
                }
                if (item.pitch) {
                  isMarksAssigned = true;
                }
                if (item.execution) {
                  isMarksAssigned = true;
                }

                return (
                  <div className="student">
                    <div>
                      {/* <div className="profile"></div> */}
                      <div>
                        <p>{item.name}</p>
                        <p>{item.email}</p>
                        {isMarksAssigned ? (
                          <p>
                            {"Total: "}
                            {item.execution
                              ? item.execution
                              : 0 + item.ideation
                              ? item.ideation
                              : 0 + item.pitch
                              ? item.pitch
                              : 0}{" "}
                            {`[Ideation: ${item.ideation}, E: ${item.execution}, V/P: ${item.pitch}]`}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="actions">
                      <div
                        onClick={() => {
                          if (mentor?.isLocked) {
                            setError("Cannot edit marks after submitting.");
                            return;
                          }
                          setCurStudentId(item._id);
                          setOpen(true);
                          console.log("alsdf");
                        }}
                      >
                        {mentor?.students.filter((i) => i === item._id) &&
                        mentor?.students.filter((i) => i === item._id).length
                          ? isMarksAssigned
                            ? "Edit Marks"
                            : "Assign Marks"
                          : ""}
                      </div>
                      {mentor?.students.filter((i) => i === item._id) &&
                      mentor?.students.filter((i) => i === item._id).length ? (
                        <div
                          onClick={async () => {
                            if (mentor?.students.length <= 3) {
                              setError("You must have atleast 3 students");
                              return;
                            }
                            setError("");
                            const res = await axios.post(
                              `${backEndUrl}/mentor/unassign`,
                              {
                                mentorId: mentor?._id,
                                studentId: item._id,
                              }
                            );
                            setMentor(res.data.mentor);
                          }}
                        >
                          Remove
                        </div>
                      ) : (
                        <div
                          onClick={async () => {
                            if (mentor?.students.length! >= 4) {
                              setError("Cannot Add more than 4 students");
                              return;
                            }
                            setError("");
                            const res = await axios.post(
                              `${backEndUrl}/mentor/assign`,
                              {
                                mentorId: mentor?._id,
                                studentId: item._id,
                              }
                            );
                            setMentor(res.data.mentor);
                          }}
                        >
                          Add
                        </div>
                      )}
                      {/* <div>Edit</div> */}
                    </div>
                  </div>
                );
              })}
            <div></div>
          </>
        )}

        <div
          onClick={async () => {
            const res = await axios.post(`${backEndUrl}/mentor/submit`, {
              mentorId: mentor!._id,
            });
            setMentor(res.data.mentor);
          }}
          className="submit"
        >
          {!mentor?.isLocked ? <p>FINAL SUBMIT</p> : <p>Submitted!</p>}
        </div>
      </div>

      <Modal
        open={open}
        className="modal"
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalDivParent">
          <div className="modalDiv">
            <div>
              <h3>Ideation</h3>
              <input
                type="number"
                value={ideation}
                onChange={(e) => {
                  if (!e.target.value) {
                    setIdeation(0);
                    return;
                  }
                  if (
                    parseInt(e.target.value) > 10 ||
                    parseInt(e.target.value) < 0
                  ) {
                    return;
                  }
                  setIdeation(parseInt(e.target.value));
                }}
              />
            </div>
            <div>
              <h3>Execution</h3>
              <input
                type="number"
                value={execution}
                onChange={(e) => {
                  if (!e.target.value) {
                    setExecution(0);
                    return;
                  }
                  if (
                    parseInt(e.target.value) > 10 ||
                    parseInt(e.target.value) < 0
                  ) {
                    return;
                  }
                  setExecution(parseInt(e.target.value));
                }}
              />
            </div>
            <div>
              <h3>Viva/Pitch</h3>
              <input
                type="number"
                value={pitch}
                onChange={(e) => {
                  if (!e.target.value) {
                    setPitch(0);
                    return;
                  }
                  if (
                    parseInt(e.target.value) > 10 ||
                    parseInt(e.target.value) < 0
                  ) {
                    return;
                  }
                  setPitch(parseInt(e.target.value));
                }}
              />
            </div>
            <div>
              <h4>Total</h4>
              {pitch + ideation + execution}
            </div>
          </div>
          <div
            onClick={async () => {
              await axios.post(`${backEndUrl}/student/update`, {
                studentID: curStudentId,
                ideationMarks: ideation,
                executionMarks: execution,
                pitchMarks: pitch,
              });
              const res = await axios.get(`${backEndUrl}/student/all`);
              let student: Student[] = res.data.students;
              let student1 = student.filter((item) => {
                if (isChecked) {
                  return mentor?.students.filter((i) => i === item._id) &&
                    mentor?.students.filter((i) => i === item._id).length
                    ? true
                    : false;
                } else {
                  return true;
                }
              });
              setStudents(student1);
              setOpen(false);
            }}
          >
            Save
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
