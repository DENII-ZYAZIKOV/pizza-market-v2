import calcTotalPrice from "./calcTotalPrice";

function getCartFromLS() {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice: totalPrice,
  };
}

export default getCartFromLS;
