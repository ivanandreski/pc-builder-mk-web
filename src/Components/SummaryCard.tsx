import React, { FC } from "react";
import DividerTitle from "./DividerTitle";
import CompatibleIcon from "./CompatibleIcon";

interface SummaryCardProps {
  totalPrice: number;
  compatible: boolean;
}

const SummaryCard: FC<SummaryCardProps> = ({ totalPrice, compatible }) => {
  return (
    <>
      <DividerTitle title="Summary" />
      <div className="ml-5 p-2">
        <p className="text-gray-500 font-semibold">Total price: {totalPrice} MKD</p>
        <p className="text-gray-500 font-semibold">
          Compatible: <CompatibleIcon compatible={compatible} />
        </p>
      </div>
    </>
  );
};

export default SummaryCard;
