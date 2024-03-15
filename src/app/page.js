"use client";
import Image from "next/image";
import Navbar from "./component/Navbar";
import { MdOutlineLocationOn } from "react-icons/md";
import OrderList from "./component/OrderList";
import { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import axios from "axios";
import { useStore } from "zustand";
import useProductStore from "@/store/ProductStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const { setProducts, setPaymentMethods, totalAmount, products } =
    useProductStore((state) => state);

  const handlePayment = () => {
    const isValidPhoneNumber = /^\d{10}$/g.test(phone);
    if (!isValidPhoneNumber) {
      return alert("Invalid phone number");
    }
    router.push("/payment");
  };
  const handlePhoneChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    setPhone(inputValue);
  };
  const fetchProductData = async () => {
    const res = await axios
      .get("https://groww-intern-assignment.vercel.app/v1/api/order-details")
      .then(({ data }) => {
        console.log(data);
        setProducts(data.products);
        setPaymentMethods(data.paymentMethods);
      });
    setLoading(false);
  };
  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <div className="flex  justify-between w-full min-h-screen flex-col md:rounded-md  bg-white">
      {" "}
      <div className=" w-full h-full  overflow-auto">
        <Navbar page="Checkout" />

        {/* Delivery Details */}
        {loading ? (
          <div>Hello</div>
        ) : (
          <div className="flex flex-col m-auto max-w-[1500px] lg:flex-row">
            <div className="w-full lg:w-3/4">
              {" "}
              <div className="px-8">
                <div className="font-bold text-black py-3">Delivery Detail</div>
                <div className="flex w-max items-center bg-gray-200 rounded p-2">
                  <div className="px-2 text-black">
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#374151"
                        d="M8,0 C11.3137,0 14,2.68629 14,6 C14,7.33918 13.5613,8.57588 12.8197,9.57422 L7.99994,16 L3.1803,9.57422 C2.43873,8.57588 2,7.33918 2,6 C2,2.68629 4.68629,0 8,0 Z M8,2 C5.79086,2 4,3.79086 4,6 C4,6.89363 4.29068,7.71358 4.78334,8.37826 L7.99996,12.6668 L11.2167,8.37817 C11.7093,7.71351 12,6.89359 12,6 C12,3.79086 10.2091,2 8,2 Z M8,4 C9.10457,4 10,4.89543 10,6 C10,7.10457 9.10457,8 8,8 C6.89543,8 6,7.10457 6,6 C6,4.89543 6.89543,4 8,4 Z"
                      />
                    </svg>{" "}
                  </div>
                  <div className="text-grey-700 text-md">
                    15, Yemen Road, Yemen
                  </div>
                </div>
              </div>
              {/* Phone number input */}
              <div className=" px-8 py-4">
                <div className="border-2 border-gray-300 rounded  flex ">
                  <div className="px-4 text-black p-2 flex items-center justify-center">
                    <FaPhone />
                  </div>
                  <div className=" w-full">
                    <input
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={handlePhoneChange}
                      type="text"
                      className="outline-none text-black w-full p-2 bg-transparent "
                    ></input>
                  </div>{" "}
                </div>
              </div>
              {/* Order List */}
              <div className="px-8 py-2">
                <p className="py-2 text-black text-md">Order List</p>
                <OrderList />
              </div>
            </div>

            {/* Promo Code */}

            <div className="lg:w-1/4 w-full">
              {products.length > 0 && (
                <div className="px-8 py-2">
                  <p className="py-2  text-black text-md">Promo Code</p>
                  <div className="border-2 border-gray-300 rounded  flex ">
                    <div className=" w-full">
                      <input
                        type="text"
                        placeholder="Coupon Here"
                        className="outline-none w-full font-bold p-2 px-4 bg-transparent "
                      ></input>
                    </div>
                    <div className="px-4 p-2 flex items-center justify-center">
                      <button className="text-sm text-violet-700  font-bold">
                        APPLY
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}

              {products.length > 0 && (
                <div className=" px-8 py-4">
                  <p className="font-bold text-black">Order Summary</p>

                  <div className="flex flex-col py-2">
                    <div className="flex py-1 text-black justify-between text-sm items-center">
                      <div>Order Amount</div>
                      <div className="text-black">{totalAmount}</div>
                    </div>
                    <div className="flex py-1 text-black justify-between text-sm items-center">
                      <div>Delivery Fee</div>
                      <div className="">0.000</div>
                    </div>
                    <div className="flex py-1 text-black justify-between text-sm items-center">
                      <div>Discount</div>
                      <div className="">0.000</div>
                    </div>
                  </div>
                </div>
              )}
              {products.length > 0 && (
                <div className="lg:flex hidden justify-between items-center py-5 px-8  drop-shadow-lg">
                  <div className="flex text-black flex-col gap-2">
                    <div>Total</div>
                    <div className="font-extrabold">{totalAmount}</div>
                  </div>
                  <div>
                    <button
                      onClick={handlePayment}
                      className="bg-violet-700 hover:bg-violet-900 text-black p-2 px-4 rounded-md font-bold"
                    >
                      Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {products.length > 0 && (
        <div className="lg:hidden flex justify-between items-center py-5 px-8  drop-shadow-lg">
          <div className="flex text-black flex-col gap-2">
            <div>Total</div>
            <div className="font-extrabold">{totalAmount}</div>
          </div>
          <div>
            <button
              onClick={handlePayment}
              className="bg-violet-700 hover:bg-violet-900 text-black p-2 px-4 rounded-md font-bold"
            >
              Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
