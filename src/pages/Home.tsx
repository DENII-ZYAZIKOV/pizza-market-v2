import React from "react";
import { useSelector } from "react-redux";
import { setCategoryid, setSort } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, totalCount } = useSelector(
    (state: RootState) => state.pizzaSlice
  );
  const { categoryid, sort } = useSelector(
    (state: RootState) => state.filterSlice
  );
  const { searchValue } = useSelector((state: RootState) => state.searchSlice);

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    console.log("Home useEffect - searchValue:", searchValue);
    dispatch(
      fetchPizzas({
        categoryid,
        sortProperty: sort.sortProperty,
        page,
        limit: 8,
        search: searchValue,
      })
    );
  }, [categoryid, sort, searchValue, page, dispatch]);

  const onChangeCategory = React.useCallback(
    (i: number) => {
      dispatch(setCategoryid(i));
      setPage(1);
    },
    [dispatch]
  );

  const onChangeSort = React.useCallback(
    (sort: any) => {
      dispatch(setSort(sort));
    },
    [dispatch]
  );

  const onChangePage = React.useCallback((p: number) => {
    setPage(p);
  }, []);

  return (
    <div className="content">
      <div className="content__top">
        <Categories value={categoryid} setValue={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading"
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="pizza-block pizza-block--skeleton" />
            ))
          : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(totalCount / 8)}
        onPageChange={onChangePage}
      />
    </div>
  );
};

export default Home;
