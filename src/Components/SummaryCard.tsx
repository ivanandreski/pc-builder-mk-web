import { FC, useState } from "react";
import DividerTitle from "./DividerTitle";
import CompatibleIcon from "./CompatibleIcon";

import CreateForumPostDialog from "../Components/Dialogs/CreateForumPostDialog";
import { PcBuild } from "../Models/PcBuild";
import useGetUser from "../Hooks/useGetUser";

interface SummaryCardProps {
    totalPrice: number;
    compatible: boolean;
    messages: string[];
    pcBuild: PcBuild;
}

const SummaryCard: FC<SummaryCardProps> = ({
    totalPrice,
    compatible,
    messages,
    pcBuild,
}) => {
    const user = useGetUser();

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <DividerTitle title="Summary" />
            <div className="ml-5 p-2">
                <div className="flex">
                    <div className="w-5/6">
                        <p className="text-gray-500 font-semibold">
                            Total price: {totalPrice} MKD
                        </p>
                        <p className="text-gray-500 font-semibold">
                            Compatible:{" "}
                            <CompatibleIcon compatible={compatible} />
                        </p>
                    </div>
                    <div>
                        {user && (
                            <button
                                onClick={() => setShowDialog(true)}
                                className="ml-2 w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Ask a question
                            </button>
                        )}
                    </div>
                </div>
                {messages.length > 0 && (
                    <ul className="my-1">
                        {messages.map((m, i) => (
                            <li
                                key={i}
                                className="text-purple-500 font-semibold"
                            >
                                {m}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {showDialog && (
                <CreateForumPostDialog
                    setShowDialog={setShowDialog}
                    pcBuild={pcBuild}
                />
            )}
        </>
    );
};

export default SummaryCard;
