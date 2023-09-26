"use client"
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { departmentFilters } from "@/constant"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { constants } from "buffer";
const DropdownMenu: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectCity, setSelectCity] = useState<string>("");
  const cities = () => {
    return ["Hong Kong", "London", "New York City", "Paris"];
  };

  /**
   * Toggle the drop down menu
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  /**
   * Callback function to consume the
   * city name from the child component
   *
   * @param city  The selected city
   */
  const citySelection = (city: string): void => {
    setSelectCity(city);
  };


  return (
    <div className="grid w-full grid-cols-1 shadow-sm">
      <div className="grid w-3/12  bg-purple-100 rounded-md shadow-sm">
        <div className="grid-col-1">
          <button
            className={`w-full py-2 ${showDropDown ? "active" : undefined}`}
            onClick={(): void => toggleDropDown()}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
              dismissHandler(e)
            }
          >
            <div className="">{selectCity ? selectCity : "All Category"} </div>
            {showDropDown && (
              <Dropdown
                cities={departmentFilters}
                showDropDown={false}
                toggleDropDown={(): void => toggleDropDown()}
                citySelection={citySelection}
              />
            )}
          </button></div>
      </div></div>
  );
};

export default DropdownMenu;