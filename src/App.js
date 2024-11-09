import React, { useState } from "react";
import Auth from './component/auth.js'
import Popup from './component/Popup.js'

export default function Home() {
  const [theme, setTheme] = useState("theme-autumn");
  const [allGrades, setAllGrades] = useState([
    {
      courseName: "CSCB36",
      assessments: [
        { name: "Assignment 1", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 2", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 3", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 4", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 5", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 6", marks: 100, outOf: 100, weight: 10, isBonus: false },
      ]
    },
    {
      courseName: "CSCB07",
      assessments: [
        { name: "Assignment 1", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 2", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 3", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 4", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 5", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 6", marks: 100, outOf: 100, weight: 10, isBonus: false },
      ]
    },
    {
      courseName: "CSCB09",
      assessments: [
        { name: "Assignment 1", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 2", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 3", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 4", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 5", marks: 100, outOf: 100, weight: 10, isBonus: false },
        { name: "Assignment 6", marks: 100, outOf: 100, weight: 10, isBonus: false },
      ]
    }
  ]);

  const [grades, setGrades] = useState(allGrades[0]);
  const [totalGrade, setTotalGrade] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [calculated, setCalculated] = useState(0);

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

  const toggleLoginPopup = () => setShowLoginPopup(!showLoginPopup);
  const toggleSignUpPopup = () => setShowSignUpPopup(!showSignUpPopup);

  const calculateGrade = (assessments) => {
    let acc = 0;
    assessments.forEach(assessment => { acc += (assessment.marks / assessment.outOf) * assessment.weight; });
    setCalculated(acc);
  }
  
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
    setGrades(allGrades[index])
  }

  const handleThemeChange = () => {
    const allTheme = ['theme-autumn', 'theme-monochrome', 'theme-forest', 'theme-beige', 'theme-ocean', 'theme-pastel', 'theme-light', 'theme-dark']
    const theme_index = allTheme.indexOf(theme) + 1
    setTheme(theme_index == allTheme.length ? 'theme-autumn' : allTheme[theme_index]);
  };

  const removeCourse = () => {
    const course = grades.courseName;
    const isConfirmed = window.confirm(`Are you sure you want to delete the course "${course}"?`);
  
    if (isConfirmed) {
      const allGradeCopy = [...allGrades];
      const index = allGradeCopy.findIndex(item => item.courseName === course);
      if (index !== -1) {
        allGradeCopy.splice(index, 1);
        setAllGrades(allGradeCopy);
  
        if (index === 0 && allGrades.length > 1) {
          setGrades(allGrades[1]);
        } else if (allGrades.length > 0) {
          setGrades(allGrades[0]);
        } else {
          setGrades(null); 
        }
      }
    }
  };
  

return (
    <div className={`${theme} flex flex-col lg:flex-row min-h-screen`} style={{ backgroundColor: "var(--back  ground-color)" }}>
      {showLoginPopup && (
        <Popup onClose={toggleLoginPopup} title="Login">
          <form>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <button type="submit">Login</button>
          </form>
        </Popup>
      )}

      {showSignUpPopup && (
        <Popup onClose={toggleSignUpPopup} title="Sign Up">
          <form>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </Popup>
      )}

      {/* sidebar */}
      <div className="w-full lg:w-60 p-4 flex justify-between lg:flex-col lg:justify-between" style={{ backgroundColor: "var(--sidebar-bg-color)" }}>
        {/* courses */}
        <div>
        <h1 className="text-lg font-semibold mb-2" style={{ color: "var(--header-color)" }}>Courses</h1>
        <ul className="flex flex-row space-x-2 overflow-x-auto lg:space-y-2 lg:overflow-y-auto lg:flex-col">
          {allGrades.map((course, index) => (
            <li key={index} onClick={() => handleCourseClick(index)}>
              <span
                className="p-1 block hover:bg-sky-700 rounded text-center cursor-pointer"
                style={{
                  backgroundColor: "var(--course-bg-color)",
                  color: "var(--text-color)"
                }}
              >
                {course.courseName}
              </span>
            </li>
          ))}
        </ul>
        </div>
        {/* login/theme */}
          
      </div>

      <div className="w-full lg:w-5/6 p-4" style={{ color: "var(--text-color)" }}>
        <h1 className="text-2xl font-bold mb-4">Grade Calculator</h1>
        <span className="flex w-[480px] justify-between items-center">
          <h2 className="text-xl mb-4" style={{ color: "var(--header-color)" }}>
            {grades.courseName}
          </h2>
          <button onClick={() => removeCourse()} className="text-red-500 hover:underline">
            Remove Course
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
                      onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""), "marks")}
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
                      onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""), "outOf")}
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
                      onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""), "weight")}
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
        </div>

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

        <div className="mt-4 text-lg font-medium">Calculated Grade: {calculated}</div>
      </div>

    </div>
  );
}
