'use client';

import * as React from 'react';
import styles from '@/_assets/modeToggle.module.css';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ToggleMode() {
  // const themes = localStorage.getItem('theme');
  // const getTheme = () => {
  //   if (themes == 'dark') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const { setTheme } = useTheme();
  const [isChecked, setIsChecked] = React.useState(false);
  const handleChange = () => {
    if (isChecked) {
      setIsChecked(false);
      setTheme('light');
      localStorage.setItem('theme', 'light');
    } else {
      setIsChecked(true);
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  };
  return (
    <div className="flex md:hidden ">
      <input
        className={styles.input}
        checked={isChecked}
        onChange={handleChange}
        type="checkbox"
        id="darkmode-toggle"
      />
      <label className={styles.label} htmlFor="darkmode-toggle">
        <Sun
          className={`absolute z-30 h-4 sun top-[50%] translate-y-[-50%] left-[3px] ${
            isChecked ? 'text-[#7e7e7e]' : 'text-[#fff]'
          }`}
        />
        <Moon
          className={`absolute z-30 h-4 moon top-[50%] translate-y-[-50%] right-[3px] text-[#7e7e7e] ${
            isChecked && 'text-[#fff]'
          }`}
        />
      </label>
    </div>
  );
}
