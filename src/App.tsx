import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./component/firebaseConfig.ts";
import { writeGrades, readGrades } from "./component/database.ts";
import { signInWithPopup, signOut } from "firebase/auth";

const example = {
  courseName: "Course Name",
  assessments: [
    { name: "Assignment 1", marks: 100, outOf: 100, weight: 10, isBonus: false },
    { name: "Lab 2", marks: 100, outOf: 100, weight: 10, isBonus: false },
    { name: "Final Exam ", marks: 100, outOf: 100, weight: 10, isBonus: false },
  ]
}


export default function Home() {
  const [theme, setTheme] = useState("theme-autumn");
  const [allGrades, setAllGrades] = useState([example]);
  const [grades, setGrades] = useState(allGrades[0]);
  const [gradesIndex, setGradesIndex] = useState(0);
  const [calculated, setCalculated] = useState(0);
  const [user, setUser] = useState(null);
  const [totalWeight, setTotalWeight] = useState(0);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); 
    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (auth.currentUser) {
        const user_grades = await readGrades();
        if (user_grades) {
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

  const calculateGrade = (assessments) => {

    let weight = 0;
    assessments.forEach((assessment) => weight += parseFloat(assessment.isBonus ? 0 : assessment.weight))
    setTotalWeight(weight); 
    console.log(weight)
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
  
  const handleTextChange = (index, value, field) => {
    const newAssessments = [...grades.assessments];
    newAssessments[index][field] = value; 
    setGrades({ ...grades, assessments: newAssessments });
    calculateGrade(newAssessments)
  };

  const handleChange = (index, value, field) => {
    const newAssessments = [...grades.assessments];
    newAssessments[index][field] = value; 
    setGrades({ ...grades, assessments: newAssessments });
  
    const numericAssessments = newAssessments.map(assessment => ({
      ...assessment,
      [field]: assessment[field] === "" ? 0 : Number(assessment[field])
    }));
    calculateGrade(numericAssessments);
  };
  
  const handleAddAssessment = () => {
    const newAssessments = [...grades.assessments];
    newAssessments.push({name: "", marks:0, outOf: 100, weight: 0})
    setGrades({ ...grades, assessments: newAssessments});
  }

  const handleBonusChange = (index, value) => {
    const newAssessments = [...grades.assessments];
    newAssessments[index].isBonus = value;
    setGrades({ ...grades, assessments: newAssessments});
  }

  const handleCourseClick = (index) => {
    if (JSON.stringify(allGrades[gradesIndex]) !== JSON.stringify(grades)){
      window.confirm("Any changes you have made will not be saved, are you sure you want to proceed?");
      return;
    }
    setGrades(JSON.parse(JSON.stringify(allGrades[index])));
    setGradesIndex(index)
  }

 const handleThemeChange = () => {
    const allTheme = [
      "theme-autumn", "theme-monochrome", "theme-forest",
      "theme-beige", "theme-ocean", "theme-pastel",
      "theme-light", "theme-dark"
    ];
    const theme_index = allTheme.indexOf(theme) + 1;
    const newTheme = theme_index === allTheme.length ? "theme-autumn" : allTheme[theme_index];
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const removeCourse = async () => {
    const course = grades.courseName;
    const isConfirmed = window.confirm(`Are you sure you want to delete the course "${course}"?`);
  
    if (isConfirmed) {
      const allGradeCopy = [...allGrades];
      const index = gradesIndex;

      if (index !== -1) {
        allGradeCopy.splice(index, 1);
        setAllGrades(allGradeCopy);
        await writeGrades(allGradeCopy);
        localStorage.setItem("allGrades", JSON.stringify(allGradeCopy))

        if (index === 0 && allGrades.length > 1) {
          setGrades(JSON.parse(JSON.stringify(allGrades[1])));
          setGradesIndex(1);
        } else if (allGrades.length > 0) {
          setGrades(JSON.parse(JSON.stringify(allGrades[0])));
          setGradesIndex(0);
        } else {
          setGrades(null); 
        }
      }
    }
  };
  
  const handleAddCourse = () => { 
    if (JSON.stringify(allGrades[gradesIndex]) !== JSON.stringify(grades)){
      window.confirm("Any changes you have made will not be saved, are you sure you want to proceed?");
      return;
    }

    setAllGrades([...allGrades, example]);
    handleCourseClick(allGrades.length - 1);
  }

  const handleCourseNameChange = (changed) => {
    const grades_copy = JSON.parse(JSON.stringify(grades))
    grades_copy.courseName = changed;
    setGrades(grades_copy)
  }

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
    <div className={`${theme} flex flex-col lg:flex-row min-h-screen`} style={{ backgroundColor: "var(--back  ground-color)" }}>
      {/* sidebar */}
      <div className="w-full lg:w-60 p-4 flex justify-between lg:flex-col lg:justify-between lg:justify-center" style={{ backgroundColor: "var(--sidebar-bg-color)" }}>
        {/* courses */}
        <div>
        <h1 className="text-lg font-semibold mb-2" style={{ color: "var(--header-color)" }}>{user && (user?.displayName+ "'s")} Courses</h1>
        <ul className="flex flex-row overflow-x-auto lg:space-y-2 lg:overflow-y-auto lg:flex-col">
          {allGrades.map((course, index) => (
            <li key={index} onClick={() => handleCourseClick(index)}>
              <span
                className="p-1 mx-1 block hover:bg-sky-700 rounded text-center cursor-pointer"
                style={{
                  backgroundColor: "var(--course-bg-color)",
                  color: "var(--text-color)"
                }}
              >
                {course?.courseName}
              </span>
            </li>
          ))}
          <li>        <button onClick={handleAddCourse} className="text-center" > 	&#x002B; Add Course</button></li>
        </ul>
        </div>
        {/* login/theme */}
        <div>
        <div className="flex flex-col">
        <div className="flex justify-around ">
          {user ? (
            <button onClick={logout} className="w-1/2  p-1 rounded mx-1 bg-[var(--course-bg-color)] text-[var(--text-color)]">Log out </button>
            ) : (
              <>
                <button onClick={signInWithGoogle} className="w-1/2  p-1 rounded mx-1 bg-[var(--course-bg-color)] text-[var(--text-color)]">Login</button>
                <button onClick={signInWithGoogle} className="w-1/2 p-1 rounded mx-1 bg-[var(--course-bg-color)] text-[var(--text-color)]">Signup</button>
              </>
            )
          }
          </div>
          <button
            onClick={handleThemeChange}
            style={{
              backgroundColor: "var(--button-bg-color)",
              color: "var(--text-color)"
            }}
            className="py-1 rounded hover:bg-[var(--button-hover-color)] mt-3 mx-1"
          >
            Toggle Theme
          </button>

        </div>
    </div>

      </div>

      <div className="w-full lg:w-5/6 p-4" style={{ color: "var(--text-color)" }}>
        <h1 className="text-2xl font-bold mb-4">Grade Calculator</h1>
        <span className="flex w-[480px] justify-between items-center">
          <h2 className="text-xl mb-4" style={{ color: "var(--header-color)" }}>
            <input  value={grades.courseName} onChange={(e) => handleCourseNameChange(e.target.value)}></input>
          </h2>
          <button onClick={() => removeCourse()} className="text-red-500 hover:underline">  
              &#10060; Remove 
          </button>
        </span>

        <div className="overflow-x-auto">
          <table className="w-500 border" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--table-bg-color)" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--table-bg-color)", borderColor: "var(--border-color)" }}>
                <th className="p-2 text-left" style={{ color: "var(--header-color)" }}>Name</th>
                <th className="p-2 text-left" style={{ color: "var(--header-color)" }}>Marks</th>
                <th className="p-2 text-left" style={{ color: "var(--header-color)" }}>Weight</th>
                <th className="p-2 text-left" style={{ color: "var(--header-color)" }}>Bonus</th>
              </tr>
            </thead>
            <tbody>
              {grades.assessments.map((assessment, index) => (
                <tr key={index} className="border-b" style={{ borderColor: "var(--border-color)" }}>
                  <td className="p-2">
                    <input
                      value={assessment.name}
                      type="text"
                      className="w-full border px-1"
                      onChange={(e) => handleTextChange(index, e.target.value, "name")}
                      style={{
                        backgroundColor: "var(--table-bg-color)",
                        color: "var(--text-color)",
                        borderColor: "var(--border-color)"
                      }}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      value={assessment.marks}
                      type="text"
                      min={0}
                      onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9.]/g, ""), "marks")}
                      className="w-14 border px-1"
                      style={{
                        backgroundColor: "var(--table-bg-color)",
                        color: "var(--text-color)",
                        borderColor: "var(--border-color)"
                      }}
                    />
                    /
                    <input
                      value={assessment.outOf}
                      type="number"
                      min={0}
                      onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9.]/g, ""), "outOf")}
                      className="w-14 border px-1"
                      style={{
                        backgroundColor: "var(--table-bg-color)",
                        color: "var(--text-color)",
                        borderColor: "var(--border-color)"
                      }}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      value={assessment.weight}
                      type="number"
                      min={0}
                      onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9.]/g, ""), "weight")}
                      className="w-14 border px-1"
                      style={{
                        backgroundColor: "var(--table-bg-color)",
                        color: "var(--text-color)",
                        borderColor: "var(--border-color)"
                      }}
                    />
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={assessment.isBonus}
                      onChange={(e) => handleBonusChange(index, e.target.value)}
                      style={{
                        accentColor: "var(--button-bg-color)"
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex w-[480px] justify-between items-center">
          <button
          onClick={() => handleAddAssessment()}
          className="mt-4 py-1 px-4 rounded"
          style={{
            backgroundColor: "var(--button-bg-color)",
            color: "var(--text-color)"
          }}
        >
          Add assessment
        </button>
        <button onClick={handleGradeSave}> &#128190; Save </button>
          </div>
          
        </div>

        
        <div className="mt-4 text-lg font-medium flex items-center">
          Calculated Grade: {calculated}
          {totalWeight !== 100 && (
            <div className="ml-2 relative group">
              <span className="text-red-500 font-bold">!</span>
              <div className="absolute left-0 mt-2 w-48 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Note: The weight does not sum to 100, so a different algorithm is being used.
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
