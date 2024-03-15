import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { FaAngleLeft } from "react-icons/fa6";
import useThemeStore from "@/store/ThemeStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = ({ page }) => {
  const router = useRouter();
  const { theme, setTheme } = useThemeStore((state) => state);
  return (
    <div className="">
      <div className="flex items-center  px-8 py-5 m-auto max-w-[1600px] justify-between ">
        <div
          onClick={() => router.push("/")}
          className="text-black cursor-pointer"
        >
          <Image
            src="https://groww.in/groww-logo-270.png"
            width={50}
            height={50}
            alt="logo"
          />
        </div>
        <div className="font-extrabold text-2xl text-black">{page}</div>
        <div className="cursor-pointer">
          {theme === "light" ? (
            <FaMoon
              color="#bbbbbb"
              size={25}
              onClick={() => setTheme("dark")}
            />
          ) : (
            <FiSun
              color="#ffffff"
              size={30}
              onClick={() => setTheme("light")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
