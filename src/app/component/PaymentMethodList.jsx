import useProductStore from "@/store/ProductStore";
import React from "react";
import { CiWallet } from "react-icons/ci";
import { PiCirclesFour } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { CiCreditCard1 } from "react-icons/ci";

const PaymentMethodCard = ({ data, selected, setSelected }) => {
  return (
    <div
      onClick={() => setSelected(data)}
      className={`border ${
        selected === data ? "border-purple-700 border-2" : ""
      } cursor-pointer text-black rounded hover:scale-105 transition transform flex items-center justify-between p-4`}
    >
      <div className="">
        {data === "UPI" ? (
          <GiReceiveMoney size={40} />
        ) : (
          <CiCreditCard1 size={40} />
        )}
      </div>
      <div className="flex w-4/6  flex-3 text-sm flex-col ">
        <div>{data}</div>
        {data === "Cash on delivery" && <div>Pay directly to the Driver</div>}
      </div>
      <div className="flex items-center justify-center ">
        <PiCirclesFour size={25} />
      </div>
    </div>
  );
};

const PaymentMethodList = ({ selected, setSelected }) => {
  const { paymentMethods } = useProductStore((state) => state);
  console.log(paymentMethods);
  return (
    <div className="py-2 flex flex-col gap-4">
      {paymentMethods.map((curr, i) => {
        return (
          <PaymentMethodCard
            key={i}
            data={curr}
            selected={selected}
            setSelected={setSelected}
          />
        );
      })}
    </div>
  );
};

export default PaymentMethodList;
