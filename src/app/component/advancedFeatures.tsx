import React, { useEffect, useState } from 'react';
import { grade } from './types/type';
import { motion } from "framer-motion";
import { getGradeForSchool, GradeRange } from './types/type';

interface AdvancedFeaturesProps {
    currentGrades: grade;
    setGrades: React.Dispatch<React.SetStateAction<grade>>;
    setAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
    school: string;
}

const AdvancedFeatures: React.FC<AdvancedFeaturesProps> = ({ currentGrades, setGrades, setAdvanced, school }) => {
    const [finalGrade, setFinalGrade] = useState<number | null>(currentGrades.finalGrade || 100);
    const [finalExamGrade, setFinalExamGrade] = useState<number | null>(null);
    const [totalWeight, setTotalWeight] = useState(currentGrades.totalWeight || 100);
    const [finalExamWeight, setFinalExamWeight] = useState(0);
    const [selectedFeature, setSelectedFeature] = useState<0 | 1>(0);
    const [currentCourse, setCurrentCourse] = useState(currentGrades.courseName);

    const [goalGrade, setGoalGrade] = useState<number | string>(100);
    const [goalGPA, setGoalGPA] = useState(4.0);
    const [goalLetter, setGoalLetter] = useState("A+");
    const [requiredGrade, setRequiredGrade] = useState(100);

    const gradingRanges = getGradeForSchool(school);



    const syncFields = (grade: number | string, gpa: number | string, letter: string) => {
        setGoalGrade(grade);
        setGoalGPA(Number(gpa));
        setGoalLetter(letter);
    };

    const findRangeByGrade = (grade: number) => {
        return gradingRanges.find(
            (r) => grade >= r.minPercentage && grade <= r.maxPercentage
        );
    };

    const findRangesByGPA = (gpa: number) => {
        return gradingRanges.filter((r) => r.gpa === gpa);
    };

    const updateFromGrade = (grade: number) => {
        const range = findRangeByGrade(grade);
        if (range) {
            syncFields(grade, range.gpa, range.letter);
        }
    };

    const updateFromGPA = (gpa: number) => {
        const ranges = findRangesByGPA(gpa);
        if (ranges.length > 0) {
            const letters = ranges.map((r) => r.letter).join("/");
            const minPercentage = ranges[ranges.length - 1].minPercentage;
            const maxPercentage = ranges[0].maxPercentage;
            syncFields(`${minPercentage}~${maxPercentage}`, gpa, letters);
        }
    };

    const updateFromLetter = (letter: string) => {
        const range = gradingRanges.find((r) => r.letter === letter);
        if (range) {
            syncFields(range.minPercentage, range.gpa, letter);
        }
    };


    useEffect(() => {
        const calculateFinalExamGrade = (currentGrades: grade, desiredFinalGrade: number | null) => {
            if (!currentGrades || desiredFinalGrade === null) {
                setFinalExamGrade(null); 
                setFinalExamWeight(0);
                return;
            }
        
            const totalCurrentWeight = currentGrades.assessments.reduce((acc, assessment) => {
                const weight = parseFloat(assessment.weight) || 0;
                return acc + weight;
            }, 0);
        
            const currentWeightedGrade = currentGrades.assessments.reduce((acc, assessment) => {
                const marks = parseFloat(assessment.marks) || 0;
                const outOf = parseFloat(assessment.outOf) || 1;
                const weight = parseFloat(assessment.weight) || 0;
                const isBonus = assessment.isBonus;
        
                const score = (marks / outOf) * weight;
                return acc + (isBonus ? 0 : score); 
            }, 0);
        
            const remainingWeight = totalWeight - totalCurrentWeight;
            if (remainingWeight <= 0) {
                setFinalExamGrade(null);
                setFinalExamWeight(0);
                return;
            }
        
            const requiredFinalExamGrade = ((desiredFinalGrade / 100) * totalWeight - currentWeightedGrade) / (remainingWeight / 100);
            const boundedFinalExamGrade = Math.max(0, Math.min(100, requiredFinalExamGrade));
            setFinalExamWeight(remainingWeight);
            setFinalExamGrade(boundedFinalExamGrade);
        };

        calculateFinalExamGrade(currentGrades, finalGrade);
    }, [currentGrades, finalGrade, totalWeight]);


    useEffect(() => {
        if (
            currentCourse === currentGrades.courseName &&
            (currentGrades.finalGrade !== finalGrade || currentGrades.totalWeight !== totalWeight)
        ) {
            setGrades({
                ...currentGrades,
                finalGrade: finalGrade ?? currentGrades.finalGrade,
                totalWeight: totalWeight ?? currentGrades.totalWeight,
            });
        } else if (currentCourse !== currentGrades.courseName) {
            setCurrentCourse(currentGrades.courseName);
            setFinalGrade(currentGrades.finalGrade || 100);
            setTotalWeight(currentGrades.totalWeight || 100);
        }
    }, [finalGrade, totalWeight, currentGrades, currentCourse, setGrades]);
    useEffect(() => {
        const calculateRequiredGrade = (goalGrade: number | string, totalWeight: number, currentGrades: grade) => {
            if (typeof goalGrade === 'string') {
                const [minGoalGrade] = goalGrade.split("~").map(Number);
                goalGrade = minGoalGrade;
            }

            const totalCurrentWeight = currentGrades.assessments.reduce((acc, assessment) => {
                const weight = parseFloat(assessment.weight) || 0;
                return acc + weight;
            }, 0);

            const currentWeightedGrade = currentGrades.assessments.reduce((acc, assessment) => {
                const marks = parseFloat(assessment.marks) || 0;
                const outOf = parseFloat(assessment.outOf) || 1;
                const weight = parseFloat(assessment.weight) || 0;
                const isBonus = assessment.isBonus;

                const score = (marks / outOf) * weight;
                return acc + (isBonus ? 0 : score);
            }, 0);

            const remainingWeight = totalWeight - totalCurrentWeight;
            if (remainingWeight <= 0) {
                setRequiredGrade(0);
                return;
            }

            const requiredGrade = ((Number(goalGrade) / 100) * totalWeight - currentWeightedGrade) / (remainingWeight / 100);
            setRequiredGrade(Math.max(0, Math.min(100, requiredGrade)));
        };

        calculateRequiredGrade(goalGrade, totalWeight, currentGrades);
    }, [goalGrade, totalWeight, currentGrades, currentCourse, setGrades]);
    

    const handleFinalGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setFinalGrade(value);
    };

    return (
        <div key={JSON.stringify(currentGrades)} className='mt-5'>
            <div className='flex justify-between w-full rounded-t-lg'>
                <div className='flex gap-3 '>
                    <div className={"text-md p-2 rounded-t-lg hover:bg-skin-fore" + (selectedFeature === 0 ? " bg-skin-fore" : "")} onClick={() => setSelectedFeature(0)}>Final Exam Grade</div>
                    <div className={"text-md p-2 rounded-t-lg hover:bg-skin-fore" + (selectedFeature === 1 ? " bg-skin-fore" : "")} onClick={() => setSelectedFeature(1)}>GPA/Letter Goal</div>
                </div>
                <div 
                    className='p-2  px-3 rounded-t-lg transition-transform duration-200 hover:scale-125 bg-skin-fore' 
                    onClick={() => setAdvanced(false)}
                >
                    ×
                </div>
            </div>

            {selectedFeature === 0 ? (
                <div className=' grid grid-cols-2 md:flex gap-3 flex-warp bg-skin-fore rounded-b-lg shadow-lg p-3 pt-2 overflow-y-auto overflow-x-hidden max-w-full'>
                <div key="finalGradeInput" className='md:w-1/4 flex flex-col'>
                    Final Grade
                    <input
                        type="number"
                        value={finalGrade ?? ''}
                        onChange={(e) => handleFinalGradeChange(e)}
                        placeholder="Final grade"
                        className='mt-1 h-full py-5 text-center bg-skin-back rounded-lg shadow-inner underline'
                    />
                </div>
                <div key="totalWeightInput" className='md:w-1/4 flex flex-col'>
                    Total Weight
                    <input
                        type="number"
                        value={totalWeight ?? ''}
                        onChange={(e) => setTotalWeight(Number(e.target.value))}
                        placeholder="Total weight of course"
                        className='mt-1 py-5 text-center bg-skin-back h-full rounded-lg shadow-inner underline'
                    />
                </div>   
                <div className='md:w-1/4 flex flex-col'>
                    Exam Weight
                    <div className="mt-1 h-full py-5 text-center bg-skin-back rounded-lg shadow-inner ">
                        {finalExamWeight}
                    </div>
                </div>
                <div className='md:w-1/4 flex flex-col'>
                    Exam Grade
                    <div className={"mt-1 py-5 h-full text-center rounded-lg shadow-inner whitespace-nowrap overflow-hidden relative " + (finalExamGrade === null ? "bg-red-700" : "bg-skin-back")}>
                    {finalExamGrade !== null ? 
                        String(finalExamGrade) : (

                        <motion.div
                            className="absolute whitespace-nowrap"
                            initial={{ x: "100%" }}
                            animate={{ x: "-100%" }}
                            transition={{
                            repeat: Infinity,
                            duration: 10,
                            ease: "linear",
                            }}
                        >
                            {finalExamGrade ?? "remove final exam from above"}
                        </motion.div>
                    )}
                    </div>
                </div>
                </div>
            ) : 
            (
                <div className=' grid grid-cols-2 md:flex gap-3 flex-warp bg-skin-fore rounded-b-lg shadow-lg p-3 pt-2 overflow-y-auto overflow-x-hidden max-w-full'>
                <div key="" className='md:w-[40%] flex flex-col '>
                    Goal
                    <div className='mt-1 h-full py-5 text-center bg-skin-back rounded-lg shadow-inner overflow-x-hidden flex justify-between'>
                        <input
                            type="text"
                            value={goalGrade}
                            className='bg-transparent w-1/3 text-right appearance-none'
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value)) {
                                    updateFromGrade(Number(value));
                                }
                            }}
                            onFocus={() => setGoalGrade(typeof goalGrade === 'string' ? goalGrade.split("~")[0] : goalGrade)}
                        />

                        <select
                            value={goalGPA}
                            className='bg-transparent w-1/4 text-center appearance-none border-x border-skin-main mx-3'
                            onChange={(e) => updateFromGPA(Number(e.target.value))}
                        >
                            {[...new Set(gradingRanges.map((range) => range.gpa))].map((gpa) => (
                                <option key={gpa} value={gpa}>
                                    {gpa}
                                </option>
                            ))}
                        </select>
                        <select
                            value={goalLetter}
                            className="bg-transparent w-1/4 text-left appearance-none"
                            onChange={(e) => updateFromLetter(e.target.value)}
                        >
                            {!gradingRanges.some((range) => range.letter === goalLetter) && (
                                <option value={goalLetter} hidden>
                                    {goalLetter}
                                </option>
                            )}
                            {gradingRanges.map((range) => (
                                <option key={range.letter} value={range.letter}>
                                    {range.letter}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div key="totalWeightInput" className='md:w-[20%] flex flex-col whitespace-nowrap'>
                    Total Weight
                    <input
                        type="number"
                        value={totalWeight ?? ''}
                        onChange={(e) => setTotalWeight(Number(e.target.value))}
                        placeholder="Total weight of course"
                        className='mt-1 py-5 text-center bg-skin-back h-full rounded-lg shadow-inner underline'
                    />
                </div>   
                <div className='md:w-[20%] flex flex-col whitespace-nowrap'>
                    Remaining Weight
                    <div className="mt-1 h-full py-5 text-center bg-skin-back rounded-lg shadow-inner whitespace-nowrap">
                        {finalExamWeight}
                    </div>
                </div>
                <div className='md:w-[20%] flex flex-col whitespace-nowrap'>
                    Required Grade
                    <div className={"mt-1 py-5 h-full text-center rounded-lg shadow-inner whitespace-nowrap overflow-hidden relative " + (requiredGrade === null ? "bg-red-700" : "bg-skin-back")}>
                    {requiredGrade !== null ? 
                        String(requiredGrade) : (

                        <motion.div
                            className="absolute whitespace-nowrap"
                            initial={{ x: "100%" }}
                            animate={{ x: "-100%" }}
                            transition={{
                            repeat: Infinity,
                            duration: 10,
                            ease: "linear",
                            }}
                        >
                            {requiredGrade ?? "remove final exam from above"}
                        </motion.div>
                    )}
                    </div>
                </div>
                </div>
            )}





        </div>
    );
};

export default AdvancedFeatures;
