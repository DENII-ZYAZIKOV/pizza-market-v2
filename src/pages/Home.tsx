import Sort, { list } from "../components/Sort";
import Categories from "../components/Categories";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { useSearchParams } from "react-router-dom";
import React from "react";
import Pizzablock from "../components/PizzaBlock";
import { RootState, useAppDispatch } from "../redux/store";
import { setCategoryid, setFilters } from "../redux/slices/filterSlice";

const Home: React.FC = () => {
  const categoryid = useSelector(
    (state: RootState) => state.filterSlice.categoryid
  );
  const sortProperty = useSelector(
    (state: RootState) => state.filterSlice.sort.sortProperty
  );
  const item = useSelector((state: RootState) => state.pizzaSlice.items);
  const dispatch = useAppDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.SearchSlice.searchValue
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef(false);
  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        categoryid,
        sortProperty,
      })
    );
  };
  const OnChangeCategory = useCallback(
    (i: number) => dispatch(setCategoryid(i)),
    []
  );
  useEffect(() => {
    if (isMounted.current && (categoryid !== 0 || sortProperty !== "rating")) {
      const queryString = { sortProperty, categoryid };
      setSearchParams(queryString);
    }
    isMounted.current = true;
  }, [categoryid, sortProperty]);
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    if (Object.keys(params).length) {
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, []);
  useEffect(() => {
    getPizzas();
  }, [categoryid, sortProperty]);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryid} setValue={OnChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {item
          .filter((obj: any) =>
            obj.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((obj: any) => (
            <Pizzablock key={obj.id} {...obj} />
          ))}
      </div>
    </>
  );
};

export default Home;
