import useProductStore from "@/store/ProductStore";
import Link from "next/link";
import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdErrorOutline } from "react-icons/md";
import { MdPending } from "react-icons/md";

const CheckoutModal = ({ selected, status }) => {
  const { totalAmount } = useProductStore((state) => state);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50"></div>
      <div className="bg-white w-2/3 flex gap-5 items-center justify-center flex-col p-6 rounded-lg shadow-lg z-10 relative">
        <div className="text-black flex flex-col items-center justify-center gap-2">
          {status.status === "SUCCESS" ? (
            <div className="text-green-500">
              <GiCheckMark size={40} />
            </div>
          ) : status.status === "FAILED" ? (
            <div className="text-red-600">
              <MdErrorOutline size={60} />
            </div>
          ) : (
            <div className="text-red-300">
              <MdPending size={20} />
            </div>
          )}

          <div
            className={`${
              status.status === "SUCCESS"
                ? "text-green-500"
                : status.status === "FAILED"
                ? "text-red-600"
                : "text-red-400"
            } font-bold`}
          >
            {status.status}
          </div>
          <div className="">{status.message}</div>
        </div>
        <div className=" w-full flex flex-col items-center justify-center">
          <div className="flex w-full justify-between items-center text-black">
            <div>Amount:</div>
            <div>{totalAmount}</div>
          </div>
          <div className="flex w-full justify-between items-center text-black">
            <div>Mode:</div>
            <div>{selected}</div>
          </div>
        </div>
        <div>
          <Link
            href="/"
            className="text-black bg-violet-700 hover:bg-violet-900 px-4 p-2 rounded-md shadow-md"
          >
            Go to hompage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
