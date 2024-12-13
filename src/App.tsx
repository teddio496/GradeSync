import React, { useState, useEffect } from "react";
import { auth, googleProvider, User } from "./component/firebaseConfig";
import { writeGrades, readGrades } from "./component/database";
import { signInWithPopup, signOut } from "firebase/auth";
import { grade, assessment, gradingSchemes, calculateGradeForSchool } from "./types/type";
import toast from "react-hot-toast";
import { IconPalette, IconUserCircle, IconDeviceFloppy, IconArchive, IconTrash, IconLogout, IconInfoCircle } from "@tabler/icons-react";

const example: grade = {
  courseName: "Course Name",
  school: "UofT",
  assessments: [
    { name: "Assignment 1", marks: 100, outOf: 100, weight: 10, isBonus: false },
    { name: "Lab 2", marks: 100, outOf: 100, weight: 10, isBonus: false },
    { name: "Final Exam ", marks: 100, outOf: 100, weight: 10, isBonus: false },
  ]
}

export default function Home() {

  const [allGrades, setAllGrades] = useState<grade[]>([example]);
  const [grades, setGrades] = useState<grade>(allGrades[0]);
  const [gradesIndex, setGradesIndex] = useState(0);
  const [calculated, setCalculated] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [totalWeight, setTotalWeight] = useState(0);
  const [school, setSchool] = useState("UofT");

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
    calculateGrade(grades.assessments)
  }, [grades])

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("allGrades");
      localStorage.removeItem("theme"); 
      
      setAllGrades([example]);
      setGrades(example)
    } catch (err) {
      console.error(err);
    }
  };
  
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const user_grades = await readGrades();
      if (!user_grades) {
        writeGrades([example])
      } else{
        setAllGrades(user_grades);
        setGrades(user_grades[0]);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const calculateGrade = (assessments: assessment[]) => {

    let weight = 0;
    assessments.forEach((assessment) => weight += assessment.isBonus ? 0 : assessment.weight)
    
    setTotalWeight(weight); 
    console.log(weight);

    if (weight === 100) {
      let acc = 0;
      assessments.forEach(assessment => {
      if(assessment.marks && assessment.outOf){
        acc += (assessment.marks / assessment.outOf) * assessment.weight;
      }
      });
      setCalculated(acc);
    } else {
      let acc = 0;
      assessments.forEach(assessment => {
        if(assessment.marks && assessment.outOf){
          acc += (assessment.marks / assessment.outOf) * assessment.weight * 100;
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
  
  const handleChange = (index: number, value: string | number, field: keyof assessment) => {
    const newAssessments = [...grades.assessments];
  
    // Type-safe assignment
    if (field === "marks" || field === "outOf" || field === "weight") {
      newAssessments[index][field] = Number(value) as any; // Explicitly cast to bypass type issues
    } else if (field === "name") {
      newAssessments[index][field] = value as string;
    } else if (field === "isBonus") {
      newAssessments[index][field] = value === "true"; // Convert to boolean
    }
  
    setGrades({ ...grades, assessments: newAssessments });
  
    // Ensure numeric fields are converted properly
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
    newAssessments.push({ name: "", marks: 0, outOf: 100, weight: 0, isBonus: false });
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
      const proceed = window.confirm("Any changes you have made will not be saved, are you sure you want to proceed?");
      if (!proceed) return;
    }
    setGrades(JSON.parse(JSON.stringify(allGrades[index])));
    setGradesIndex(index);
  };

  const handleAddCourse = () => {
    if (JSON.stringify(allGrades[gradesIndex]) !== JSON.stringify(grades)) {
      const proceed = window.confirm(
        "Any changes you have made will not be saved, are you sure you want to proceed?"
      );
      if (!proceed) return;
    }

    const newGrades = [...allGrades, example];
    
    setAllGrades(newGrades);
    setGrades(example); 
    setGradesIndex(newGrades.length - 1);
    toast("course added")
  };
  

  const removeCourse = async () => {
    const course = grades.courseName;
    const isConfirmed = window.confirm(`Are you sure you want to delete the course "${course}"?`);
  
    if (isConfirmed) {
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
  
        if (index === 0 && allGrades.length > 1) {
          setGrades(JSON.parse(JSON.stringify(allGrades[1])));
          setGradesIndex(1);
        } else if (allGrades.length > 0) {
          setGrades(JSON.parse(JSON.stringify(allGrades[0])));
          setGradesIndex(0);
        } else {
          setGrades(example); // Use default example if no grades are left
        }
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
        window.alert("This course name is not unique");
        return;
      }
    }
  
    allGradeCopy[gradesIndex] = grades;
    setAllGrades(allGradeCopy);
    localStorage.setItem("allGrades", JSON.stringify(allGradeCopy));
  
    writeGrades(allGradeCopy);
  };
  
  return (
  <div className="flex">
    <div className="w-1/12 md:w-1/4"></div>
    <div className="flex flex-col flex-grow mt-3">
      {/* Header */}
      <div className="flex flex-row justify-between text-skin-sub ">
        <div className="hover:text-skin-main hover:scale-110 transition-transform duration-200 text-xl">GradeSync</div> 
        <div className="flex gap-2">
            <div className="relative">
            <IconPalette 
              height={30}
              width={30}
              stroke-width="1.5" 
              className="hover:text-skin-main hover:scale-125 transition-transform duration-200 group" 
            />                 
            <div className="absolute z-40 left-0 top-full mt-1 w-32 p-2 text-xs text-skin-main bg-skin-highlight rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Theme functionality to be implemented!
            </div>
            </div>
          {!user ? (
            <IconUserCircle 
            height={30}
            width={30}
            stroke-width="1.5" 
            className="hover:text-skin-main hover:scale-125 transition-transform duration-200" 
            onClick={() => signInWithGoogle()}
          /> 
          ) : (
            <div className="relative group">
              <img 
                src={user.photoURL?.toString()} 
                className="group-hover:hidden rounded-full w-[30px] h-[30px]"
                alt=""
              />
              <IconLogout 
                height={30}
                width={30}
                stroke-width="1.5" 
                className="hidden group-hover:block hover:text-skin-main hover:scale-125 transition-transform duration-200" 
                onClick={() => logout()}
              /> 
            </div>

          )}

        </div>
      </div>
      {/* Main Page Content */}

      <div className="flex flex-row mt-2">
        {/* The calculator */}
        <div className="flex-col flex-grow  h-max-full">
          {/* course name & utils */}
          <div className="mt-5 text-xl flex justify-between text-skin-sub">
            <input 
              className=" bg-transparent hover:text-skin-main border-b-2 border-skin-sub hover:border-skin-main ring-0 focused:ring-0" 
              value={grades.courseName}
              onChange={(e) => handleCourseNameChange(e.target.value)}
            />
            <div className="flex gap-2">
            <select
                className="bg-transparent text-sm border-b-2 border-skin-sub hover:text-skin-main hover:border-skin-main ring-0 focus:ring-0"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              >
                {gradingSchemes.map((schoolName) => (
                  <option key={schoolName.name} value={schoolName.name}>{schoolName.name}</option>
                ))}
              </select>
                <div className="relative group">
                <IconArchive className="hover:text-skin-main hover:scale-125 transition-transform duration-200"/>
                <div className="absolute z-40 left-0 top-full mt-1 w-32 p-2 text-xs text-skin-main bg-skin-highlight rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                  Archive functionality to be implemented!
                </div>
                </div>
              <IconDeviceFloppy className="hover:text-skin-main hover:scale-125 transition-transform duration-200" onClick={() => handleGradeSave()}/>
              <IconTrash className="hover:text-skin-main hover:scale-125 transition-transform duration-200" onClick={() => removeCourse()}/>
            </div>

          </div>    
          {/* The table */}
          
          <div className="bg-skin-fore rounded-lg shadow-lg p-3 mt-2 pt-2">

              {/* The result */}
              <div className="flex gap-3">
                <div className="w-1/3">
                  <div className="flex justify-between">
                    <div>Percentage</div>
                    <div className="relative group">
                      <IconInfoCircle className="hover:text-skin-main hover:scale-125 transition-transform duration-200" />
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
                  GPA
                  <div className="mt-1 py-5 text-center text-xl bg-skin-back rounded-lg shadow-inner">
                    {calculateGradeForSchool(calculated, school)?.gpa.toString()}
                  </div>
                </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-md"> 
                  <th className="p-2 text-left w-1/3 md:w-1/2">Name</th>
                  <th className="p-2 text-left w-1/4 md:w-1/6">Marks</th>
                  <th className="p-2 text-left w-1/6 md:w-1/6">Weight</th>
                  <th className="p-2 text-left w-1/12 whitespace-nowrap">Bonus</th>
                </tr>
              </thead>
              <tbody>
                {grades.assessments.map((assessment, index) => (
                  <tr key={index} className=""> 
                    <td className="p-0.5 ">
                      <input 
                        className="w-full bg-skin-back rounded-md shadow-inner p-1 hover:drop-shadow-md " 
                        value={assessment.name}
                        onChange={(e) => handleTextChange(index, e.target.value)}
                      />
                    </td>
                    <td className="p-0.5">
                      <div className="flex items-center">
                        <input 
                          className="w-full bg-skin-back rounded-md shadow-inner p-1 hover:drop-shadow-md" 
                          value={assessment.marks}
                          min={0}
                          onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9.]/g, ""), "marks")}
                        />/
                        <input 
                          className="w-full bg-skin-back rounded-md shadow-inner p-1 hover:drop-shadow-md" 
                          value={assessment.outOf}
                          min={0}
                          onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9.]/g, ""), "outOf")}
                        />
                      </div>
                    </td>
                    <td className="p-0.5">
                      <input 
                        className="w-full bg-skin-back rounded-md shadow-inner p-1 hover:drop-shadow-md" 
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
                    <IconTrash className="text-skin-sub hover:text-skin-main mt-1" onClick={() => handleRemoveAssessment(index)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div 
              className="bg-skin-back p-1 m-1 rounded-lg text-center drop-shadow-lg hover:drop-shadow-none hover:shadow-inner active:bg-skin-highlight"
              onClick={() => handleAddAssessment()}
            >+ assessment</div>
          </div>
        </div>
        {/* Course Selector */}
        <div className="mt-14 ml-4 hidden md:block">
        <ul className="flex flex-col text-md">
          {allGrades.map((course, index) => (
            <li
              key={index}
              onClick={() => handleCourseClick(index)}
              className={`p-2 rounded-xl flex items-center justify-between group hover:shadow-lg mb-1 active:shadow-inner cursor-pointer ${
                index === gradesIndex ? "bg-skin-highlight text-skin-main" : "hover:bg-skin-highlight"
              }`}
            >
              <span className="text-left truncate max-w-[128px] whitespace-nowrap">
                {course?.courseName}
              </span>
            </li>
          ))}
          <li
            className="p-2 hover:bg-skin-highlight hover:pl-4 rounded-xl text-sm flex text-center hover:shadow-lg cursor-pointer"
            onClick={() => handleAddCourse()}
          >
            + course
          </li>
        </ul>

        </div>

      </div>
    </div>
    <div className="w-1/12 md:w-1/4"></div>
  </div>
  );
}
