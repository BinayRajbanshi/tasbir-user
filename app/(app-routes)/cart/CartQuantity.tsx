import { useState, useEffect } from 'react';
import { Button } from '@/_components/ui/button';
import { ConfirmDialog } from './ConfirmDialog';
import { useCartContext } from '@/contexts/cart-contexts';

const CartQuantity = ({ defaultValue, rowId, getCart, removeCart }) => {
  const [quantity, setQuantity] = useState(parseInt(defaultValue) || 1);
  const { cart, setCart } = useCartContext();
  const [loading, setLoading] = useState(false);

  const updateQuantity = async (newData: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/update-quantity`, {
        method: 'POST',
        body: JSON.stringify(newData),
      });
      const data = await res.json();
      if (data) {
        getCart();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = parseInt(defaultValue) + 1;
    updateQuantity({ rowId: rowId, quantity: newQuantity }); // Use the updated value
  };

  const decreaseQuantity = () => {
    if (defaultValue > 1) {
      const newQuantity = parseInt(defaultValue) - 1;
      updateQuantity({ rowId: rowId, quantity: newQuantity }); // Use the updated value
    } else {
      removeCart(rowId);
    }
  };

  useEffect(() => {
    setQuantity(parseInt(defaultValue));
  }, []);

  return (
    <div className="flex justify-start md:justify-center w-full md:w-1/5">
      {defaultValue > 1 ? (
        <Button disabled={loading} onClick={decreaseQuantity} variant="ghost">
          <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
          </svg>
        </Button>
      ) : (
        <ConfirmDialog>
          <a
            onClick={() => removeCart(rowId)}
            className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs"
          >
            Delete
          </a>
        </ConfirmDialog>
      )}
      <input className="mx-2 border text-center w-8" type="text" value={defaultValue} readOnly />
      <Button disabled={loading} variant="ghost" onClick={increaseQuantity}>
        <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
        </svg>
      </Button>
    </div>
  );
};

export default CartQuantity;
