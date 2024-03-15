"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import PaymentMethodList from "../component/PaymentMethodList";
import useProductStore from "@/store/ProductStore";
import { useRouter } from "next/navigation";
import CheckoutModal from "../component/CheckoutModal";

const page = () => {
  const { totalAmount, products } = useProductStore((state) => state);
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState({ status: "", message: "" });

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
  useEffect(() => {
    if (products.length === 0) {
      router.push("/");
    }
  }, []);
  return (
    <div className="bg-violet-800 w-full h-screen flex items-center justify-center">
      <div className="flex max-h-[750px]  max-w-[450px]  justify-between w-full h-full flex-col md:rounded-md  bg-white">
        {" "}
        <div className=" w-full h-full  overflow-auto">
          <Navbar page="Payment" />

          {/* Choose payment method */}
          <div className="px-8">
            <p className="font-bold py-2 text-black">Choose Payment Method</p>
            <PaymentMethodList selected={selected} setSelected={setSelected} />
          </div>

          {/* Footer */}
        </div>
        <div className="px-8 flex flex-col justify-between items-center shadow-inner py-5 p-4 text-black drop-shadow-lg gap-6">
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
              className="bg-violet-800 w-full text-black p-2 px-4 rounded-md font-bold"
            >
              Payment
            </button>
          </div>
        </div>
      </div>
      {openModal && <CheckoutModal selected={selected} status={status} />}
    </div>
  );
};

export default page;
