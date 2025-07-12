import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setSort, setPage } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState } from "../redux/store";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { items, status, totalCount } = useSelector(
    (state: RootState) => state.pizzaSlice
  );
  const { categoryId, sort, page } = useSelector(
    (state: RootState) => state.filterSlice
  );
  const { searchValue } = useSelector((state: RootState) => state.searchSlice);

  React.useEffect(() => {
    dispatch(fetchPizzas({ categoryId, sort, searchValue, page }));
  }, [categoryId, sort, searchValue, page, dispatch]);

  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
      dispatch(setPage(1));
    },
    [dispatch]
  );

  const onChangeSort = React.useCallback(
    (sort: any) => {
      dispatch(setSort(sort));
    },
    [dispatch]
  );

  const onChangePage = React.useCallback(
    (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch]
  );

  return (
    <div className="content">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} onChangeSort={onChangeSort} />
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
