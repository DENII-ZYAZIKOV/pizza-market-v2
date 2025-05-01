import { useWhyDidYouUpdate } from "ahooks";
import React, { memo } from "react";

type CategoriesProps = {
  value: number;
  setValue: (i: number) => void;
};
const categoties: string[] = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const Categories: React.FC<CategoriesProps> = memo(({ value, setValue }) => {
  useWhyDidYouUpdate("Categories", { value, setValue });
  return (
    <div className="categories">
      <ul>
        {categoties.map((el, i) => (
          <li
            className={value == i ? "active" : ""}
            onClick={() => setValue(i)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
