import { useState, useEffect } from 'react';
import { useGetBasketQuery, useUpdateBasketItemMutation, useRemoveFromBasketMutation, useClearBasketMutation } from '../../store/API';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const { data: basketItems = [], isLoading, isError } = useGetBasketQuery();
  const [updateBasketItem] = useUpdateBasketItemMutation();
  const [removeFromBasket] = useRemoveFromBasketMutation();
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [isPromoExpanded, setIsPromoExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState({});
  
  const isLoggedIn = localStorage.getItem('token');
  
  const cartItems = basketItems.length > 0 && basketItems[0].items ? basketItems[0].items : [];
  console.log('Cart Items:', cartItems);
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Please Login</h1>
            <p className="text-gray-600 mb-8">You need to be logged in to view your cart</p>
            <Link 
              to="/login" 
              className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Error loading cart</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors mr-4"
          >
            Retry
          </button>
          <Link to="/" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (item, newQuantity) => {

    const itemKey = `${item.product.id}-${item.color || 'default'}-${item.size || 'default'}`;
    setIsUpdating(prev => ({ ...prev, [itemKey]: true }));
    
    try {
      await updateBasketItem({
        productId: item.product.id,
        quantity: newQuantity,
        color: item.color || 'default',
        size: item.size || 'default',
      }).unwrap();
      
      toast.success('Quantity updated successfully!');
    } catch (error) {
      console.error('Failed to update quantity:', error);
      
      if (error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        navigate('/login', {
          state: {
            message: 'Your session has expired. Please sign in again.'
          }
        });
      } else {
        const errorMessage = error.data?.message || 'Failed to update quantity. Please try again.';
        toast.error(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      }
    } finally {
      setIsUpdating(prev => ({ ...prev, [itemKey]: false }));
    }
  };

  const handleRemoveItem = async (item) => {
    if (!window.confirm('Are you sure you want to remove this item from your cart?')) {
      return;
    }
    
    try {
      await removeFromBasket(item.id).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove item:', error);
      
      if (error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        const errorMessage = error.data?.message || 'Failed to remove item. Please try again.';
        toast.error(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      }
    }
  };



  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    if (promoCode.trim().toLowerCase() === "iman060") {
      setAppliedPromoCode("iman060");
      setPromoCode(""); 
      setIsPromoExpanded(false);
      toast.success('Promo code "iman" applied!');
    } else {
      toast.error("Invalid promo code");
    }
  };


  const handleRemovePromoCode = () => {
    setAppliedPromoCode('');
    toast.info('Promo code removed');
  };

  const getProductPrice = (item) => {
    const price = item.product?.price || 0;
    return isNaN(parseFloat(price)) ? 0 : parseFloat(price);
  };

  const getProductName = (item) => {
    return item.product?.name || 'Unknown Product';
  };

  const getProductImage = (item) => {
    const images = item.product?.images || [];
    return images.length > 0 ? images[0]?.url : '/placeholder-image.jpg';
  };

  const getProductSlug = (item) => {
    return item.product?.slug || '#';
  };

  const getItemQuantity = (item) => {
    return item.quantity || 1;
  };

  const calculateSubtotal = () => {
    if (!Array.isArray(cartItems)) return 0;
    
    return cartItems.reduce((total, item) => {
      const price = getProductPrice(item);
      const quantity = getItemQuantity(item); 
      return total + (price * quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    if (appliedPromoCode) {
      return calculateSubtotal() * 0.1; // 10% discount
    }
    return 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal - discount;
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price) || 0;
    return `$${numPrice.toFixed(2)}`;
  };

  const getTotalItemsCount = () => {
    return cartItems.reduce((total, item) => {
      return total + getItemQuantity(item);
    }, 0);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-8">
              <svg className="mx-auto w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9a1 1 0 011-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">MY SHOPPING CART (0)</h1>
            <p className="text-gray-600 mb-8">Your cart is empty. Start shopping to add items to your cart.</p>
            <Link 
              to="/" 
              className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">MY SHOPPING CART ({getTotalItemsCount()})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => {
              const itemKey = `${item.product?.id || index}-${item.color || 'default'}-${item.size || 'default'}`;
              const isItemUpdating = isUpdating[itemKey];
              const productPrice = getProductPrice(item);
              const productName = getProductName(item);
              const productImage = getProductImage(item);
              const productSlug = getProductSlug(item);
              const quantity = getItemQuantity(item); 
              
              return (
                <div key={itemKey} className="flex gap-4 p-4 border rounded-lg relative">
                  {isItemUpdating && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
                      <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full h-full object-contain border border-gray-200 rounded"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link 
                          to={`/details/${productSlug}`}
                          className="font-semibold text-lg hover:underline"
                        >
                          {productName}
                        </Link>
                        <p className="text-gray-600 text-sm capitalize">
                          {item.product?.category?.name || 'Category'}
                        </p>
                        <div className="mt-2 space-y-1">
                          {item.color && item.color !== 'default' && (
                            <p className="text-sm">
                              Color: <span className="font-medium capitalize">{item.color}</span>
                            </p>
                          )}
                          {item.size && item.size !== 'default' && (
                            <p className="text-sm">
                              Size: <span className="font-medium">{item.size}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{formatPrice(productPrice)}</p>
                        <p className="text-sm text-gray-600">
                          Total: {formatPrice(productPrice * quantity)}
                        </p>
                      </div>
                    </div>

                    {/* Stock */}
                    {(item.product?.stock || 0) > 0 ? (
                      <div className="inline-flex items-center mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-green-600">IN STOCK</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center mt-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-red-600">OUT OF STOCK</span>
                      </div>
                    )}

                    {/* Quantity */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <label className="text-sm font-medium mr-2">Qty:</label>
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => handleQuantityChange(item, -1)}
                            disabled={quantity <= 1 || isItemUpdating}
                            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x border-gray-300 min-w-[50px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item, 1)}
                            disabled={isItemUpdating || quantity >= 10}
                            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item)}
                        disabled={isItemUpdating}
                        className="text-gray-600 hover:text-red-600 disabled:opacity-50"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              {/* Free Shipping */}
              <div className="flex items-center space-x-2 text-green-600 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">YOU'VE EARNED FREE SHIPPING</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm">FREE RETURNS ON ALL QUALIFYING ORDERS.</span>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <button 
                  onClick={() => setIsPromoExpanded(!isPromoExpanded)}
                  className="w-full flex justify-between items-center text-left font-semibold py-2"
                >
                  <span>APPLY A PROMO CODE</span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${isPromoExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isPromoExpanded && (
                  <div className="mt-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter a promo code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyPromoCode()}
                      />
                      <button
                        onClick={handleApplyPromoCode}
                        disabled={!promoCode.trim()}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded transition-colors"
                      >
                        APPLY
                      </button>
                    </div>
                  </div>
                )}
                
                {appliedPromoCode && (
                  <div className="flex items-center justify-between text-green-600 text-sm mt-2 bg-green-50 p-2 rounded">
                    <span>Promo code "{appliedPromoCode}" applied!</span>
                    <button 
                      onClick={handleRemovePromoCode}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Order */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                
                {appliedPromoCode && calculateDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>DISCOUNT</span>
                    <span>-{formatPrice(calculateDiscount())}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>SHIPPING COSTS</span>
                  <span>FREE</span>
                </div>
                
                <div className="flex justify-between">
                  <span>ESTIMATED SALES TAX</span>
                  <span>—</span>
                </div>
                
                <hr className="border-gray-300" />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>ESTIMATED TOTAL</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600 mb-4">
                <p>Or 4 payments of {formatPrice(calculateTotal() / 4)} by</p>
                <div className="flex justify-center items-center space-x-2 mt-1">
                  <span className="font-bold">afterpay</span>
                  <span>or</span>
                  <span className="font-bold">klarna</span>
                </div>
              </div>

              {/* Checkout */}
              <Link 
                to="/checkout"
                className="block w-full bg-black text-white py-4 font-bold hover:bg-gray-800 transition-colors mb-4 text-center"
              >
                CHECKOUT
              </Link>

              {/* Alternative payment */}
              <div className="space-y-2">
                <button className="w-full border border-gray-300 py-3 px-4 rounded hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <span className="font-semibold text-blue-600">PayPal</span>
                </button>
                <button className="w-full border border-gray-300 py-3 px-4 rounded hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <span className="font-semibold">Google Pay</span>
                </button>
              </div>
              <div className="text-xs text-gray-600 mt-4 text-center">
                <p>
                  By continuing, I confirm that I have read and accept the{' '}
                  <Link to="/terms" className="underline hover:text-gray-800">
                    Terms and Conditions
                  </Link>{' '}
                  and the{' '}
                  <Link to="/privacy" className="underline hover:text-gray-800">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;