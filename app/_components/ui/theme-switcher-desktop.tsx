'use client';

// import * as React from 'react';
import styles from '@/_assets/modeToggle.module.css';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ToggleModeDesktop() {
  const [themeValue, setThemeValue] = useState<string | null>('light');
  useEffect(() => {
    const themeValue = localStorage.getItem('theme');
    setThemeValue(themeValue);
  }, []);
  const getTheme = () => {
    if (themeValue && themeValue == 'dark') {
      return true;
    } else {
      return false;
    }
  };
  const { setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(getTheme());
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
    <div className="hidden md:flex">
      <input
        className={styles.input}
        checked={isChecked}
        onChange={handleChange}
        type="checkbox"
        id="darkmode-toggle-desktop"
      />
      <label className={styles.label} htmlFor="darkmode-toggle-desktop">
        <Sun
          className={`sun absolute left-[3px] top-[50%] z-30 h-4 translate-y-[-50%] ${
            isChecked ? 'text-[#7e7e7e]' : 'text-[#fff]'
          }`}
        />
        <Moon
          className={`moon absolute right-[3px] top-[50%] z-30 h-4 translate-y-[-50%] text-[#7e7e7e] ${
            isChecked && 'text-[#fff]'
          }`}
        />
      </label>
    </div>
  );
}
