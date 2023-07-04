import React, { FC } from "react";

interface DividerTitleProps {
  title: string;
}

const DividerTitle: FC<DividerTitleProps> = ({ title }) => {
  return (
    <div className="flex">
      <div className="w-2/6">
        <span className="text-gray-500 text-lg font-semibold">{title}</span>
      </div>
      <div className="w-4/6 flex items-center">
        <hr className="w-full border-2 border-gray-500" />
      </div>
    </div>
  );
};

export default DividerTitle;
