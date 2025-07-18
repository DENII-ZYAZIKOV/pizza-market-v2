import { CartItem } from "../redux/slices/cartSlice";

function calcTotalPrice(items: CartItem[]) {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}

export default calcTotalPrice;
