import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { FaAngleLeft } from "react-icons/fa6";
import useThemeStore from "@/store/ThemeStore";
import { useRouter } from "next/navigation";

const Navbar = ({ page }) => {
  const router = useRouter();
  const { theme, setTheme } = useThemeStore((state) => state);
  return (
    <div className="flex items-center p-8 justify-between ">
      <div
        onClick={() => router.push("/")}
        className="text-black cursor-pointer"
      >
        <img
          src="https://groww.in/groww-logo-270.png"
          width={40}
          height={40}
          alt=""
        />
      </div>
      <div className="font-bold text-md text-black">{page}</div>
      <div className="cursor-pointer">
        {theme === "light" ? (
          <FaMoon size={25} onClick={() => setTheme("dark")} />
        ) : (
          <FiSun color="#ffffff" size={30} onClick={() => setTheme("light")} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
