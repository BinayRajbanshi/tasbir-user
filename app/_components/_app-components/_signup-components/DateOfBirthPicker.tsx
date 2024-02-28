'use client';

import React, { useState } from 'react';

interface DatePickerProps {
  onDateChange: (year: string, month: string, day: string) => void;
}

const DateOfBirthPicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);
  const [validationError, setValidationError] = useState<string | undefined>(undefined);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    updateDate(event.target.value, selectedMonth, selectedDay);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    updateDate(selectedYear, event.target.value, selectedDay);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
    updateDate(selectedYear, selectedMonth, event.target.value);
  };

  const updateDate = (year: string | undefined, month: string | undefined, day: string | undefined) => {
    if (year && month && day) {
      onDateChange(year, month, day);
      setValidationError(undefined);
    } else {
      setValidationError('Date of birth should be selected');
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => (currentYear - i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  return (
    <div>
      <div className="flex items-center ">
        <select
          name="year"
          onChange={handleYearChange}
          value={selectedYear || ''}
          className="border text-xs p-2 rounded-lg w-full"
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          name="month"
          onChange={handleMonthChange}
          value={selectedMonth || ''}
          className="border text-xs p-2 rounded-lg w-full"
        >
          <option value="">Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="day"
          onChange={handleDayChange}
          value={selectedDay || ''}
          className="border text-xs p-2 rounded-lg w-full"
        >
          <option value="">Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      {validationError && <span className="text-red-500">{validationError}</span>}
    </div>
  );
};

export default DateOfBirthPicker;
