import style from "./Search.module.scss";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/searchSlice";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import React from "react";

const Search: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    console.log("Search input changed:", newValue);
    setValue(newValue);
    updateSearchValue(newValue);
  };

  return (
    <div className={style.root}>
      <svg
        className={style.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChangeInput(e)}
        className={style.input}
        placeholder="Поиск пиццы..."
      />
    </div>
  );
};

export default Search;
