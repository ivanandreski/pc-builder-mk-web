import { FC } from "react";

interface CompatibleIconProps {
  compatible: boolean;
}

const CompatibleIcon: FC<CompatibleIconProps> = ({ compatible }) => {
  return compatible ? (
    <span className="text-green-500 font-bold">✓</span>
  ) : (
    <span className="text-red-500 font-bold">✗</span>
  );
};

export default CompatibleIcon;
