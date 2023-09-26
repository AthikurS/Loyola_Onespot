import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { departmentFilters } from '@/constant';

type DropDownProps = {
  cities: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  citySelection: Function;
};

const Dropdown: React.FC<DropDownProps> = ({
  cities,
  citySelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null); // Initialize with null

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleTags = (item: string) => {
    router.push(`${pathName}?category=${item}`);
  };

  const onClickHandler = (city: string): void => {
    if (city === selectedCity) {
      // If the clicked city is the same as the selected city, clear the filter
      citySelection("");
      setSelectedCity(null); // Set to null to indicate no selection
    } else {
      citySelection(city);
      setSelectedCity(city);
      handleTags(city);
    }
  };
  const categories = category == null ? departmentFilters : [category];


  return (
    <div className='absolute z-10 h-60 w-3/12 overflow-auto bg-white shadow-lg rounded-lg'>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {cities.map(
          (city: string, index: number): JSX.Element => {
            return (
              <p
                className={`${category === city
                  ? "bg-purple-100 font-medium"
                  : "font-normal"
                  } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}

                key={index}
                onClick={(): void => onClickHandler(city)}
              >
                {city}
              </p>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Dropdown;
