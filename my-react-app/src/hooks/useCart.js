import { useSelector } from 'react-redux';

export function useCart() {
  const cartItems = useSelector((state) => state.cart.items);
  
  //общ суммa
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  //количество товаров
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return { 
    cartItems, 
    totalPrice, 
    totalItemsCount 
  };
}