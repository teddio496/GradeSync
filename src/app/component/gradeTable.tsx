import React from "react";
import { gradingSchemes } from "./types/type";


const GradingTable: React.FC<{ schoolName: string }> = ({ schoolName }) => {
  const gradingScheme = gradingSchemes.find(
    (scheme) => scheme.name.toLowerCase() === schoolName.toLowerCase()
  );

  if (!gradingScheme) {
    return <p>No grading scheme found for {schoolName}.</p>;
  }

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-skin-back rounded-lg">
        <thead>
          <tr className="">
            <th className="p-1 px-2">Letter Grade</th>
            <th className="p-1 px-2">GPA</th>
            <th className="p-1 px-2">Percentage Range</th>
          </tr>
        </thead>
        <tbody>
          {gradingScheme.gradingRanges.map((range, index) => (
            <tr key={index} className="border-t border-skin-sub">
              <td className=" text-center">{range.letter}</td>
              <td className=" text-center">{range.gpa.toFixed(1)}</td>
              <td className=" text-center">
                {range.minPercentage}% - {range.maxPercentage}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradingTable;
