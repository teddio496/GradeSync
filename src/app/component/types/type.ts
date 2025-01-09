export interface assessment {
    name: string;
    marks: string;
    outOf: string;
    weight: string;
    isBonus: Boolean;
}

export interface grade {
    courseName: string;
    school: string;
    assessments: assessment[];
    finalGrade: number | undefined;
    totalWeight: number| undefined;
}

export type GradeRange = {
    letter: string;
    gpa: number;
    minPercentage: number;
    maxPercentage: number;
};
  
export interface SchoolGradingScheme {
    name: string;
    gradingRanges: GradeRange[];
  }
  
export const gradingSchemes: SchoolGradingScheme[] = [
    {
      name: "UofT",
      gradingRanges: [
        { letter: "A+", gpa: 4.0, minPercentage: 90, maxPercentage: 100 },
        { letter: "A", gpa: 4.0, minPercentage: 85, maxPercentage: 89 },
        { letter: "A-", gpa: 3.7, minPercentage: 80, maxPercentage: 84 },
        { letter: "B+", gpa: 3.3, minPercentage: 77, maxPercentage: 79 },
        { letter: "B", gpa: 3.0, minPercentage: 73, maxPercentage: 76 },
        { letter: "B-", gpa: 2.7, minPercentage: 70, maxPercentage: 72 },
        { letter: "C+", gpa: 2.3, minPercentage: 67, maxPercentage: 69 },
        { letter: "C", gpa: 2.0, minPercentage: 63, maxPercentage: 66 },
        { letter: "C-", gpa: 1.7, minPercentage: 60, maxPercentage: 62 },
        { letter: "D+", gpa: 1.3, minPercentage: 57, maxPercentage: 59 },
        { letter: "D", gpa: 1.0, minPercentage: 53, maxPercentage: 56 },
        { letter: "D-", gpa: 0.7, minPercentage: 50, maxPercentage: 52 },
        { letter: "F", gpa: 0.0, minPercentage: 0, maxPercentage: 49 },
      ]
    }
  ];
  
export const calculateGradeForSchool = (percentage: number, schoolName: string): { letterGrade: string, gpa: number } | null => {
    const school = gradingSchemes.find(s => s.name === schoolName);
    const rounded = Math.round(percentage)
    if (!school) {
        console.error(`Grading scheme for ${schoolName} not found.`);
        return null;
    }
    if (rounded > 100) {
        const bestGrade = school.gradingRanges.find(range => range.maxPercentage === 100);
        if (bestGrade) {
            return { letterGrade: bestGrade.letter, gpa: bestGrade.gpa };
        }
    }

    const grade = school.gradingRanges.find((range) => {
        return rounded >= range.minPercentage && rounded <= range.maxPercentage;
    });

    if (!grade) {
        return null;
    }

    return { letterGrade: grade.letter, gpa: grade.gpa };
};


export const getGradeForSchool = (schoolName: string ) => {
    const school = gradingSchemes.find(s => s.name === schoolName);
    if (!school) {
        console.error(`Grading scheme for ${schoolName} not found.`);
        return []
    }
    return school.gradingRanges;
}