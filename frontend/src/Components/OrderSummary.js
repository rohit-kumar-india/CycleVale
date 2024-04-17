import { useState } from "react";
import { useRouter } from 'next/router';

const OrderSummary = ({TotalPrice,DiscountPrice,itemNo})=>{
    console.log(TotalPrice,DiscountPrice,itemNo)
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);
    const totalPrice1 = 10000;
    const discountPrice = 580;

return(
<div id="summary" className='w-full md:w-1/4 px-8 py-10 transition-all duration-1000'>
          <div>
            {/* <div id="summary" className={`${height<250 ? "fixed transition-all duration-1000" : "relative transition-all duration-1000"} transition-all duration-1000`}> */}
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm">MRP ({itemNo} Items )</span>
              <span className="font-semibold text-sm">₹{TotalPrice.toFixed(2)}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - ₹10.00</option>
                {/* Additional shipping options here */}
              </select>
            </div>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm">Discounts</span>
              <span className="font-semibold text-sm text-green-500">-₹{DiscountPrice.toFixed(2)}</span>
            </div>
            {/* More pricing details like tax, discounts, etc., can be added here */}
            <div className="py-5">
              <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
              <div className='flex flex-row'>
                <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                <button className="bg-red-500 hover:bg-red-600 px-3 text-sm text-white uppercase rounded">Apply</button>
              </div>
            </div>

            <div className="border-t mt-2">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total Amount</span>
                <span>₹{(TotalPrice - DiscountPrice + 10).toFixed(2)}</span>
              </div>
              <button onClick={() => router.push('/checkout1')} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded">Checkout</button>
            </div>
          </div>
        </div>
)
}

export default OrderSummary;