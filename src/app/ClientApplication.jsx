"use client";
import useThemeStore from "@/store/ThemeStore";
import { useEffect, useState } from "react";
export default function ClientApplication({ children }) {
  const { theme, setTheme } = useThemeStore((state) => state);
  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem("theme")));
    sessionStorage.getItem("theme")
      ? setTheme(JSON.parse(sessionStorage.getItem("theme")).theme)
      : setTheme("light");
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return children;
}
