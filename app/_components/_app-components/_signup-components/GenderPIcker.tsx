import React from 'react';

interface GenderPickerProps {
  name: string;
  onGenderChange: (gender: string) => void;
  defaultValue?: string;
  required: boolean;
}

const GenderPicker: React.FC<GenderPickerProps> = ({ name, onGenderChange, defaultValue, required }) => {
  // Define a handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGender = e.target.value;
    onGenderChange(selectedGender);
  };

  const genders = ['Male', 'Female', 'Other'];

  return (
    <div className="flex items-center space-x-2">
      <select
        name={name}
        onChange={handleChange}
        value={defaultValue}
        required={required}
        className="border text-xs p-2 rounded-lg w-full"
      >
        <option value="Select Gender">Select Gender</option>
        {genders.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenderPicker;
