

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { auth, googleProvider, User } from "../utils/firebaseConfig";
import { writeGrades, readGrades } from "../utils/database";
import { signInWithPopup, signOut } from "firebase/auth";
import { grade, assessment, gradingSchemes, calculateGradeForSchool } from "./component/types/type";
import toast from "react-hot-toast";
import ConfirmationDialog from "./component/ConfirmationDialog";
import { IconPalette, IconUserCircle, IconDeviceFloppy, IconArchive, IconTrash, IconLogout, IconInfoCircle, IconTool } from "@tabler/icons-react";
import EditableDropdown from "./component/editableDropdown";
import MovablePopup from "./component/movablePopup";
import GradingTable from "./component/gradeTable";
import AdvancedFeatures from "./component/advancedFeatures";
import { AnimatePresence, motion } from "framer-motion";
import SaveConfirmationDialog from "./component/saveConfirmationDialog";

interface AppProps {
    onThemeToggle: () => void;
}

const example: grade = {
  courseName: "Course Name",
  school: "UofT",
  assessments: [
    { name: "Assignment 1", marks: "100", outOf: "100", weight: "10", isBonus: false },
    { name: "Lab 2", marks: "100", outOf: "100", weight: "10", isBonus: false },
    { name: "Final Exam ", marks: "100", outOf: "100", weight: "10", isBonus: false },
  ],
  finalGrade: 100, 
  totalWeight: 100
}

const Home: React.FC<AppProps> = ({ onThemeToggle }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allGrades, setAllGrades] = useState<grade[]>([example]);
  const [grades, setGrades] = useState<grade>(allGrades[0]);
  const [gradesIndex, setGradesIndex] = useState(0);
  const [calculated, setCalculated] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [totalWeight, setTotalWeight] = useState(0);
  const [school, setSchool] = useState("UofT");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogAction, setDialogAction] = useState<() => void>(() => () => {});
  const [advnaced, setAdvanced] = useState(true);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);


  const [saveDialogMessage, setSaveDialogMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [saveDialogAction, setSaveDialogAction] = useState<{
    onLocal?: () => void;
    onCloud?: () => void;
    onMerge?: () => void;
  }>({});

  const [confirmationAction, setConfirmationAction] = useState<() => void>(() => () => {});


  const openLogoutDialog = () => {
    setDialogMessage("Are you sure you want to log out?");
    setDialogAction(() => logout);
    setIsDialogOpen(true);  
  };

  const openRemoveCourseDialog = () => {
    setDialogMessage("Are you sure you want to remove this course?");
    setDialogAction(() => () => removeCourse()); // Wrap the action in another function
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); 
    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (auth.currentUser) {
        const user_grades = await readGrades();
        if (user_grades) {
          user_grades.forEach((grade: grade) => {if (!grade.school) {grade.school = "UofT";}});
          user_grades.forEach((grade: grade) => {
            grade.assessments.forEach((assessment: assessment) => {
              assessment.marks = String(assessment.marks);
              assessment.weight = String(assessment.weight);
              assessment.outOf = String(assessment.outOf);
            });
          });
          setAllGrades(user_grades);
          setGrades(user_grades[0]);
          localStorage.setItem("allGrades", JSON.stringify(user_grades));
        }
      }
    }
  
    const storedGrades = localStorage.getItem("allGrades");
    if (storedGrades) {
      const parsedGrades = JSON.parse(storedGrades);
      setAllGrades(parsedGrades);
      setGrades(parsedGrades[0]);
    } else {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("allGrades", JSON.stringify(allGrades));
  }, [allGrades]);


  useEffect(() => {
    calculateGrade(grades.assessments)

  }, [grades])

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("allGrades");
      localStorage.removeItem("theme"); 
      setAllGrades([example]);
      setGrades(example)
      toast("Successfully logged out!")
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const user_grades = await readGrades();
  
      if (!user_grades) {
        writeGrades(allGrades);
        toast("Successfully logged in with local data!");
      } else if (JSON.stringify(allGrades) === JSON.stringify([example])) {
        toast("Successfully logged in with cloud data!");
        setGrades(user_grades[0])
        setAllGrades(user_grades);
      } else {
        toast("Successfully logged in with merged data!");  
        setSaveDialogMessage("There is a conflict between local and cloud data. Which one would you like to keep?");
        setSaveDialogAction({
          onLocal: () => {
            writeGrades(allGrades);
            toast("Successfully logged in with local copy!");
          },
          onCloud: () => {
            setAllGrades(user_grades);
            setGrades(user_grades[0]);
            toast("Successfully logged in with cloud copy!");
          },
          onMerge: () => {
            const mergedGrades = [
              ...user_grades,
              ...allGrades.filter(
                (grade) =>
                  !user_grades.some((existing: any) => JSON.stringify(existing) === JSON.stringify(grade))
              ),
            ];
            setAllGrades(mergedGrades);
            setGrades(mergedGrades[0]);
            toast("Successfully logged in with merged data!");
          },
        });
        setIsSaveDialogOpen(true);
      }
    } catch (err) {
      console.error("Error signing in with Google:", err);
      toast("An error occurred while signing in. Please try again.");
    }
  };
  
  

  const calculateGrade = (assessments: assessment[]) => {

    let weight = 0;
    assessments.forEach((assessment) => weight += assessment.isBonus ? 0 : Number(assessment.weight))
    
    setTotalWeight(weight); 

    if (weight === 100) {
      let acc = 0;
      assessments.forEach(assessment => {
      if(assessment.marks && assessment.outOf){
        acc += (Number(assessment.marks) / Number(assessment.outOf)) * Number(assessment.weight);
      }
      });
      setCalculated(acc);
    } else {
      let acc = 0;
      assessments.forEach(assessment => {
        if(assessment.marks && assessment.outOf){
          acc += (Number(assessment.marks) / Number(assessment.outOf)) * Number(assessment.weight) * 100;
        }
      });
      setCalculated(parseFloat((acc / weight).toFixed(2)));
    }
  };
  
  const handleTextChange = (index: number, value: string) => {
    const newAssessments = [...grades.assessments];
    newAssessments[index]["name"] = value;
    setGrades({ ...grades, assessments: newAssessments });
    calculateGrade(newAssessments);
  };
  
  const handleChange = (index: number, value: string, field: keyof assessment) => {
    const newAssessments = [...grades.assessments];
  
    // Type-safe assignment
    if (field === "marks" || field === "outOf" || field === "weight") {
      newAssessments[index][field] = value; // Explicitly cast to bypass type issues
    } else if (field === "name") {
      newAssessments[index][field] = value as string;
    } else if (field === "isBonus") {
      newAssessments[index][field] = value === "true"; // Convert to boolean
    }
  
    setGrades({ ...grades, assessments: newAssessments });
  

    const numericAssessments = newAssessments.map((assessment) => ({
      ...assessment,
      [field]: field === "marks" || field === "outOf" || field === "weight"
        ? Number(value)
        : value,
    }));
  
    calculateGrade(numericAssessments);
  };
  
  const handleAddAssessment = () => {
    const newAssessments = [...grades.assessments];
    newAssessments.push({ name: "", marks: "0", outOf: "100", weight: "0", isBonus: false });
    setGrades({ ...grades, assessments: newAssessments });
  };

  const handleRemoveAssessment = (index: number) => {
    const newAssessments = grades.assessments.filter((_, i) => i !== index);
    setGrades({ ...grades, assessments: newAssessments });
  };
  
  const handleBonusChange = (index: number, value: boolean) => {
    const newAssessments = [...grades.assessments];
    newAssessments[index].isBonus = value;
    setGrades({ ...grades, assessments: newAssessments });
  };

  const handleCourseClick = (index: number) => {
    if (JSON.stringify(allGrades[gradesIndex]) !== JSON.stringify(grades)) {
      setDialogMessage("Any changes you have made will not be saved, are you sure you want to proceed?");
      setDialogAction(() => () => {
        setGrades(JSON.parse(JSON.stringify(allGrades[index])));
        setGradesIndex(index);
      });
      setIsDialogOpen(true);
    } else {
      setGrades(JSON.parse(JSON.stringify(allGrades[index])));
      setGradesIndex(index);
    }
  };
  

  const handleAddCourse = () => {
    const newGrades = [example, ...allGrades];

    if (JSON.stringify(allGrades[gradesIndex]) !== JSON.stringify(grades)) {
      setDialogMessage("Any changes you have made will not be saved, are you sure you want to proceed?");
      setDialogAction(() => () => {
        setAllGrades(newGrades);
        setGrades(example); 
        setGradesIndex(0);
        toast("course added")

      });
      setIsDialogOpen(true);
    } else {
      setAllGrades(newGrades);
      setGrades(example); 
      setGradesIndex(0);
      toast("course added")
    }
  };

  const removeCourse = async () => {  
    const allGradeCopy = [...allGrades];
    const index = gradesIndex;
    if (allGradeCopy.length === 1){ 
      toast("Cannot remove, Only one left!");
      return;
    }
    if (index !== -1) {
      allGradeCopy.splice(index, 1);
      setAllGrades(allGradeCopy);
      await writeGrades(allGradeCopy);
      localStorage.setItem("allGrades", JSON.stringify(allGradeCopy));

      if (index === 0 && allGradeCopy.length > 0) {
        setGrades(JSON.parse(JSON.stringify(allGradeCopy[0])));
        setGradesIndex(0);
      } else if (index > 0 && allGradeCopy.length > 0) {
        setGrades(JSON.parse(JSON.stringify(allGradeCopy[index - 1])));
        setGradesIndex(index - 1);
      } else {
        setGrades(example); 
        setGradesIndex(0);
      }
    }
    toast("course removed")
  };

  const handleCourseNameChange = (changed: string) => {
    const gradesCopy = { ...grades, courseName: changed };
    setGrades(gradesCopy);
  };

  const handleGradeSave = () => {
    const allGradeCopy = [...allGrades];
    const course = grades.courseName;
  
    for (let i = 0; i < allGradeCopy.length; i++) {
      const grade = allGradeCopy[i];
      if (grade.courseName === course && i !== gradesIndex) {
        toast("This course name is not unique");
        return;
      }
    }
  
    allGradeCopy[gradesIndex] = grades;
    setAllGrades(allGradeCopy);
    localStorage.setItem("allGrades", JSON.stringify(allGradeCopy));
  
    writeGrades(allGradeCopy);

    toast("Grade successfully saved ")
  };
  
  return (
  <div className="flex">
    <div className="md:w-1/5 2xl:w-2/5"></div>
    <div className="flex flex-col max-w-[95vw] md:w-3/5 md:mt-3">
      {/* Header */}
      <div className="flex flex-row justify-between text-skin-sub ">
        <div className="hover:text-skin-main hover:scale-110 transition-transform duration-200 text-xl">GradeSync</div> 
        <div className="flex gap-2">
            <IconPalette 
              height={30}
              width={30}
              strokeWidth="1.5" 
              className="hover:text-skin-main hover:scale-125 transition-transform duration-200 group" 
              onClick={onThemeToggle}
            />                 
          {!user ? (
            <IconUserCircle 
            height={30}
            width={30}
            strokeWidth="1.5" 
            className="hover:text-skin-main hover:scale-125 transition-transform duration-200" 
            onClick={() => signInWithGoogle()}
          /> 
          ) : (
          <div className="relative group w-[30px] h-[30px]">
            <img 
              src={user.photoURL?.toString()} 
              className="rounded-full w-full h-full group-hover:hidden"
              alt="User Avatar"
            />
            <IconLogout 
              height={30}
              width={30}
              strokeWidth="1.5" 
              className="absolute top-0 left-0 w-full h-full hidden group-hover:block hover:text-skin-main" 
              onClick={openLogoutDialog}
            /> 
          </div>
          )}

        </div>
      </div>
      {/* Main Page Content */}
      <div className="md:grid md:grid-cols-[8fr_1fr] mt-2">
        {/* course name & utils */}
        <div className="mt-3 text-xl flex justify-between text-skin-sub  rounded-t-lg px-4 py-2">
          <div className="max-w-[50%]">
          <EditableDropdown
              options={allGrades.map((grade) => grade.courseName)}
              value={grades.courseName}
              onChange={handleCourseNameChange}
              onCourseClick={handleCourseClick}
              onCourseAdd={handleAddCourse}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="bg-transparent text-sm border-2 border-skin-sub hover:text-skin-main hover:border-skin-main ring-0 focus:ring-0"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            >
              {gradingSchemes.map((schoolName) => (
                <option key={schoolName.name} value={schoolName.name}>{schoolName.name}</option>
              ))}
            </select>
            <IconTool 
              className={`hover:text-skin-main hover:scale-125 transition-transform duration-200 py-auto ${advnaced ? "text-skin-main" : "text-skin-sub"}`} 
              onClick={() => setAdvanced(!advnaced)}
            />
            <IconDeviceFloppy 
              className="hover:text-skin-main hover:scale-125 transition-transform duration-200" 
              onClick={() => handleGradeSave()}
            />
            <IconTrash 
              className="hover:text-skin-main hover:scale-125 transition-transform duration-200" 
              onClick={openRemoveCourseDialog}
            />
          </div>

        </div>    
        {/* Top-Right Corner piece */}
        <div className="hidden md:block">
        </div>
        {/* The table */}
        <div>
        <div className="bg-skin-fore rounded-lg shadow-lg p-3 pt-2 max-h-[80vh] overflow-y-auto overflow-x-hidden max-w-full">
            {/* The result */}
            <div className="flex gap-3">
              <div className="w-1/3">
                <div className="flex justify-between">
                  <div>Percentage</div>
                  <div className="relative group">
                    <IconInfoCircle className="hover:text-skin-main hover:scale-125 transition-transform duration-200 text-skin-sub" />
                    <div className="z-40 absolute left-0 top-full mb-2 w-64 p-2 text-xs text-skin-main bg-skin-highlight rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {totalWeight === 100
                      ? "The grade is calculated as the weighted average of all assessments. For example, if you scored 85% on an assessment worth 40% and 90% on an assessment worth 60%, the grade would be calculated as: (85 × 0.4) + (90 × 0.6) = 88%. GPA and letter grade are determined based on this final percentage, with 0.5 or above rounded up and lower values rounded down."
                      : "The grade is calculated as the weighted average of all assessments, scaled to 100%. For example, if the total weight of assessments is 80% and you scored 85% on one worth 40% and 90% on another worth 40%, the grade would be calculated as: ((85 × 0.4) + (90 × 0.4)) / 0.8 = 87.5%. GPA and letter grade are determined based on this final percentage, with 0.5 or above rounded up and lower values rounded down."}
                    </div>
                  </div>
                </div>
                <div className="mt-1 py-5 text-center text-xl bg-skin-back rounded-lg shadow-inner">
                  {calculated}
                </div>
              </div>
              <div className="w-1/3">
                Letter
                <div className="mt-1 py-5 text-center text-xl bg-skin-back rounded-lg shadow-inner">
                  {calculateGradeForSchool(calculated, school)?.letterGrade.toString()}
                </div>
              </div>
              <div className="w-1/3">
                <div className="flex justify-between">
                  <div>GPA</div>
                  <div 
                    className="text-sm text-skin-sub hover:text-skin-main md:hidden"
                    onClick={() => {
                      setIsPopupOpen(false);
                      setTimeout(() => setIsPopupOpen(true), 1);
                    }}
                  >Table
                  </div>
                  <div 
                    className="text-sm text-skin-sub hover:text-skin-main hidden md:block"
                    onClick={() => {
                      setIsPopupOpen(false);
                      setTimeout(() => setIsPopupOpen(true), 1);
                    }}
                  >View Table
                  </div>  </div>
                <div className="mt-1 py-5 text-center text-xl bg-skin-back rounded-lg shadow-inner">
                  {calculateGradeForSchool(calculated, school)?.gpa.toString()}
                </div>
              </div>
            </div>
            <table className="">
              <thead>
                <tr className="text-md"> 
                  <th className="p-2 text-left w-1/3 md:w-1/2">Name</th>
                  <th className="p-2 text-left w-1/3 md:w-1/6">Marks</th>
                  <th className="p-2 text-left w-1/8 md:w-1/6">Weight</th>
                  <th className="p-2 text-left w-1/8 md:w-1/12 whitespace-nowrap">Bonus</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                {grades.assessments.map((assessment, index) => (
                  <motion.tr 
                    key={index} 
                    className=""
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration:  0.5 }}
                  > 
                    <td className="p-0.5 ">
                      <input 
                        className="w-full bg-skin-back rounded-md shadow-inner p-1 pl-2 hover:drop-shadow-md " 
                        value={assessment.name}
                        onChange={(e) => handleTextChange(index, e.target.value)}
                      />
                    </td>
                    <td className="p-0.5">
                      <div className="flex items-center">
                        <input 
                          className="w-full bg-skin-back rounded-md shadow-inner p-1 pl-2 hover:drop-shadow-md" 
                          value={assessment.marks}
                          onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9.]/g, ""), "marks")}
                        />/
                        <input 
                          className="w-full bg-skin-back rounded-md shadow-inner p-1 pl-2 hover:drop-shadow-md" 
                          value={assessment.outOf}
                          onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9.]/g, ""), "outOf")}
                        />
                      </div>
                    </td>
                    <td className="p-0.5">
                      <input 
                        className="w-full bg-skin-back rounded-md shadow-inner p-1 pl-2 hover:drop-shadow-md" 
                        value={assessment.weight}
                        onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9.]/g, ""), "weight")}
                      />
                    </td>
                    <td className="text-center p-0.5 flex justify-around">
                      <input 
                        type="checkbox"
                        className="appearance-none checkbox-xl peer bg-skin-back rounded-md h-8 w-8 shadow-inner hover:drop-shadow-md cursor-pointer accent-skin-back hover:bg-skin-fore focus:ring-skin-highlight checked:appearance-auto checked:rounded-lg"
                        checked={Boolean(assessment.isBonus)}
                        onChange={(e) => handleBonusChange(index, e.target.checked)}
                      />
                      <IconTrash 
                        className="text-skin-sub hover:text-skin-main mt-1" 
                        onClick={() => handleRemoveAssessment(index)}
                      />
                    </td>
                  </motion.tr>
                ))}  
                </AnimatePresence>
                </tbody>
            </table>
          <div 
            className="bg-skin-back p-1 m-1 rounded-lg text-center drop-shadow-md hover:drop-shadow-none hover:shadow-inner active:bg-skin-highlight"
            onClick={() => handleAddAssessment()}
          >+ assessment
          </div>

        </div>
        <AnimatePresence>
          {advnaced && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AdvancedFeatures currentGrades={grades} setGrades={setGrades} setAdvanced={setAdvanced} school={school}/>
            </motion.div>
          )}
        </AnimatePresence>
        </div>




        {/* Course Selector */}
        <div className="hidden md:block ml-3">
          <ul className="flex flex-col text-md overflow-y-auto h-[80vh">
          <li
              className="p-2 hover:bg-skin-highlight  rounded-xl text-sm flex mb-1 text-center whitespace-nowrap hover:shadow-lg cursor-pointer"
              onClick={() => handleAddCourse()}
            >
              + course
            </li>
            {allGrades.map((course, index) => (
              <li
                key={index}
                onClick={() => handleCourseClick(index)}
                className={`p-2 rounded-xl flex items-center justify-between group hover:shadow-lg mb-1 active:shadow-inner cursor-pointer ${
                  index === gradesIndex ? "bg-skin-highlight text-skin-main" : "hover:bg-skin-highlight"}`}
              >
                <span className="text-left truncate max-w-[128px] whitespace-nowrap">
                  {course?.courseName}
                </span>
              </li>
            ))}

          </ul>
        </div>

        
      </div>
      
    </div>
    <div className="md:w-1/5 2xl:w-2/5   "></div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={isDialogOpen}
        message={dialogMessage}
        onConfirm={() => { 
          dialogAction(); 
          setIsDialogOpen(false);
        }}
        onCancel={() => setIsDialogOpen(false)}
      />
      <SaveConfirmationDialog
        open={isSaveDialogOpen}
        message={saveDialogMessage}
        onLocal={() => {
          if (saveDialogAction.onLocal) saveDialogAction.onLocal();
          setIsSaveDialogOpen(false);
        }}
        onCloud={() => {
          if (saveDialogAction.onCloud) saveDialogAction.onCloud();
          setIsSaveDialogOpen(false);
        }}
        onMerge={() => {
          if (saveDialogAction.onMerge) saveDialogAction.onMerge();
          setIsSaveDialogOpen(false);
        }}
      />

      {/* Movable Popup */}
      <MovablePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <GradingTable schoolName={school} />
      </MovablePopup>
  </div>
  );
}


export default Home;