import React, { FC } from "react";
import DividerTitle from "./DividerTitle";
import CompatibleIcon from "./CompatibleIcon";

interface SummaryCardProps {
  totalPrice: number;
  compatible: boolean;
  messages: string[];
}

const SummaryCard: FC<SummaryCardProps> = ({
  totalPrice,
  compatible,
  messages,
}) => {
  return (
    <>
      <DividerTitle title="Summary" />
      <div className="ml-5 p-2">
        <p className="text-gray-500 font-semibold">
          Total price: {totalPrice} MKD
        </p>
        <p className="text-gray-500 font-semibold">
          Compatible: <CompatibleIcon compatible={compatible} />
        </p>
        {messages.length > 0 && (
          <ul className="my-1">
            {messages.map((m, i) => (
              <li key={i} className="text-purple-500 font-semibold">{m}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SummaryCard;
