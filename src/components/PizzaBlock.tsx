import { useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { RootState } from "../redux/store";
import { addItem, CartItem } from "../redux/slices/cartSlice";

type PizzablockProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const Pizzablock: React.FC<PizzablockProps> = memo(
  ({ id, title, price, imageUrl, sizes, types }) => {
    const [pizzaCount, setPizzaCount] = useState(0);
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);
    const cartItem = useSelector((state: RootState) =>
      state.cartSlice.items.find((obj) => obj.id === id)
    );
    const typeNames = ["тонкое", "традиционное"];
    const addedCount = cartItem ? cartItem.count : 0;
    const dispatch = useDispatch();
    const [isJumping, setIsJumping] = useState(false);

    const onClickAdd = useCallback(() => {
      const item: CartItem = {
        id,
        title,
        price,
        imageUrl,
        type: typeNames[activeType],
        size: sizes[activeSize],
        count: 0,
      };
      dispatch(addItem(item));
    }, [id, title, price, imageUrl, activeType, activeSize, sizes, dispatch]);

    const handleTypeClick = useCallback((type: number) => {
      setActiveType(type);
    }, []);

    const handleSizeClick = useCallback((sizeIndex: number) => {
      setActiveSize(sizeIndex);
    }, []);

    const handleAddToCart = useCallback(() => {
      setPizzaCount((prev) => prev + 1);
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
      onClickAdd();
    }, [onClickAdd]);

    return (
      <div className="pizza-block">
        <img
          className={`pizza-block__image${
            isJumping ? " pizza-block__image--jump" : ""
          }`}
          src={imageUrl}
          alt={`Пицца ${title}`}
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => handleTypeClick(type)}
                className={activeType === type ? "active" : ""}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => handleSizeClick(i)}
                className={activeSize === i ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div
            className="button button--outline button--add"
            onClick={handleAddToCart}
          >
            <span>Добавить</span>
            {addedCount > 0 && (
              <i className="button__added-count">{addedCount}</i>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Pizzablock.displayName = "Pizzablock";

export default Pizzablock;
