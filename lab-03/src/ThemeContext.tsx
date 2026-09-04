import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: '#ffffff',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('#ffffff');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ backgroundColor: theme, minHeight: '100vh', transition: 'background-color 0.5s ease' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};