"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const DropdownMenu = ({ options, label = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(options[0]);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    const params = new URLSearchParams(searchParams);
    if (option === "All films") {
      params.delete("film");
    } else {
      params.set("film", option);
    }

    params.delete("page");
    replace(`${pathname}?${params.toString()}`);

    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={"relative bg-[#333] w-[250px]"} ref={dropdownRef}>
      {label && (
        <div className={"bg-transparent text-center mb-[4px]"}>{label}</div>
      )}
      <button
        className={"px-3 py-3 cursor-pointer w-full "}
        onClick={toggleDropdown}
      >
        {selectedOption}
      </button>
      {isOpen && (
        <ul className={"w-full absolute bg-[#333] z-50"}>
          {options.map((option) => (
            <li
              key={option}
              className={
                "p-[10px] px-[12px] cursor-pointer hover:bg-white hover:text-gray-800 hover:border-gray-400"
              }
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
