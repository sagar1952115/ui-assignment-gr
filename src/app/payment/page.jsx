"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import PaymentMethodList from "../component/PaymentMethodList";
import useProductStore from "@/store/ProductStore";
import { useRouter } from "next/navigation";
import CheckoutModal from "../component/CheckoutModal";

const Payment = () => {
  const {
    totalAmount,
    products,
    discount,
    setDiscount,
    setProducts,
    setPaymentMethods,
  } = useProductStore((state) => state);
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState({ status: "", message: "" });

  console.log(
    totalAmount,
    products,
    discount,
    setDiscount,
    setProducts,
    setPaymentMethods
  );

  function getRandomStatus() {
    const statuses = {
      SUCCESS: "Order successful",
      PENDING: "Order pending, check after some time",
      FAILED: "Order failed, refund will be initiated",
    };

    const randomStatus =
      Object.keys(statuses)[
        Math.floor(Math.random() * Object.keys(statuses).length)
      ];
    setStatus({
      status: randomStatus,
      message: statuses[randomStatus],
    });
  }

  const handlePayment = () => {
    if (!selected) {
      return alert("Please select payment method");
    }
    getRandomStatus();
    setOpenModal(true);
  };
  // useEffect(() => {
  //   if (products.length === 0) {
  //     router.push("/");
  //   }
  // }, []);
  return (
    <>
      <div className="flex min-h-screen   justify-between w-full h-full flex-col md:rounded-md  bg-white">
        {" "}
        <div className=" w-full h-full  overflow-auto">
          <Navbar page="Payment" />

          {/* Choose payment method */}
          <div className="flex flex-col max-w-[1600px] m-auto lg:flex-row">
            <div className="px-8 lg:w-3/4">
              <p className="font-bold py-2 text-black">Choose Payment Method</p>
              <PaymentMethodList
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div className="lg:flex lg:w-1/4 px-8 hidden  flex-col justify-between items-center  py-5 p-4 text-black drop-shadow-lg gap-6">
              <div className="flex w-full text-sm justify-between">
                <div>Admin Fee</div>
                <div className="">0.000</div>
              </div>
              <div className="flex w-full justify-between">
                <div>TOTAL</div>
                <div className="font-extrabold">{totalAmount}</div>
              </div>
              <div className="w-full">
                <button
                  onClick={handlePayment}
                  className="bg-violet-700 hover:bg-violet-900 w-full text-black p-2 px-4 rounded-md font-bold"
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="lg:hidden px-8 flex flex-col justify-between items-center shadow-inner py-5 p-4 text-black drop-shadow-lg gap-6">
          <div className="flex w-full text-sm justify-between">
            <div>Admin Fee</div>
            <div className="">0.000</div>
          </div>
          <div className="flex w-full justify-between">
            <div>TOTAL</div>
            <div className="font-extrabold">{totalAmount}</div>
          </div>
          <div className="w-full">
            <button
              onClick={handlePayment}
              className="bg-violet-700 hover:bg-violet-900 w-full text-black p-2 px-4 rounded-md font-bold"
            >
              Payment
            </button>
          </div>
        </div>
      </div>
      {openModal && <CheckoutModal selected={selected} status={status} />}
    </>
  );
};

export default Payment;
