import React, {createContext, useState} from 'react';
import {myColors} from '../styles/Colors';

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  colors: typeof myColors.light; // This now includes the error property
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  colors: myColors.light,
});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const colors = theme === 'light' ? myColors.light : myColors.dark;

  return (
    <ThemeContext.Provider value={{theme, setTheme, colors}}>
      {children}
    </ThemeContext.Provider>
  );
};
