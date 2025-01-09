import React, { FC, useState, ChangeEvent } from "react";

interface EditableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onCourseClick: (index: number) => void;
  onCourseAdd: () => void;
}

const EditableDropdown: FC<EditableDropdownProps> = ({ options, value, onChange, onCourseClick, onCourseAdd }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleOptionClick = (index: number) => {
    onCourseClick(index);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleCourseAdd = () => {
    onCourseAdd();
    setShowDropdown(false);

  }
  return (
    <div className="relative inline-block w-full text-skin-main"> 
      <div className="flex border-b-2 justify-between border-skin-main">
        <input
          className="max-w-[50%] bg-transparent hover:text-skin-main border-skin-sub hover:border-skin-main ring-0 focus:ring-0 flex-grow"
          value={value}
          onChange={handleInputChange}
        />
        <button
          onClick={toggleDropdown}
          className={`px-4 md:hidden  border-skin-sub focus:outline-none ${showDropdown ? 'text-skin-main' : 'text-skin-sub'} hover:text-skin-main`}
          aria-label="Toggle Dropdown"
        >
          ▼
        </button>
      </div>
      {showDropdown && (
        <ul className="absolute z-10 w-full border bg-skin-fore rounded-md shadow-md max-h-[80vh] overflow-y-auto mt-1 md:hidden">
            <li 
                className="px-4 py-2 cursor-pointer hover:bg-skin-back hover:text-skin-main  text-sm border-b "
                onClick={handleCourseAdd}
            >+ course</li>
          {options.map((option, index) => (
            <li
              key={option}
              onClick={() => handleOptionClick(index)}
              className="px-4 py-2 cursor-pointer hover:bg-skin-back hover:text-skin-main border-b text-sm"
            >
              {option}
            </li>
          ))}
          
        </ul>
      )}
    </div>
  );
};

export default EditableDropdown;
