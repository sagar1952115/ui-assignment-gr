import useProductStore from "@/store/ProductStore";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import NoData from "./NoData";
import Image from "next/image";

const OrderListCard = ({ data, increment, decrement }) => {
  return (
    <div className="p-3 justify-between items-center flex shadow-md">
      <div className="">
        <Image
          src={data.image}
          className="w-12 h-12"
          width={120}
          height={120}
          alt=""
        />
      </div>
      <div className="flex w-1/2 text-black flex-3 flex-col ">
        <div>{data.title}</div>
        <div>{data.price * data.quantity}</div>
      </div>
      <div className="flex items-center text-black justify-center ">
        <div
          onClick={() => decrement(data.id, data.quantity)}
          className="p-2 cursor-pointer flex items-center justify-center "
        >
          <FaMinus />
        </div>
        <div className="p-2 flex items-center justify-center ">
          {data.quantity}
        </div>

        <div
          onClick={() => increment(data.id, data.quantity)}
          className=" p-2  cursor-pointer flex items-center justify-center text-xl"
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );
};

const OrderList = () => {
  const { products } = useProductStore((state) => state);
  const { editQuantity, removeProduct } = useProductStore((state) => state);

  const increment = (id, quantity) => {
    editQuantity(id, quantity + 1);
  };
  const decrement = (id, quantity) => {
    if (quantity === 1) {
      removeProduct(id);
    } else {
      editQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col overflow-auto gap-4">
      {products.length > 0 ? (
        products.map((curr, i) => {
          return (
            <OrderListCard
              key={i}
              data={curr}
              increment={increment}
              decrement={decrement}
            />
          );
        })
      ) : (
        <NoData message="Refresh to add Products" />
      )}
    </div>
  );
};

export default OrderList;
