import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  // Получаем тему из localStorage при инициализации, если она есть.
  // Если темы нет, то используем 'light' как тему по умолчанию.
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });

  // Функция для применения темы
  const applyTheme = (themeName) => {
    if (themeName === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  };

  // При монтировании компонента применяем тему из localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme ? storedTheme : "light";
    applyTheme(initialTheme);
  }, []);

  // useEffect для сохранения темы в localStorage и обновления классов body
  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  // Функция для переключения темы
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("Ошибка применения темы");
  }
  return context;
}