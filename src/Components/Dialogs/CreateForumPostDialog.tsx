import { FC, useEffect, useState } from "react";
import { PcBuild } from "../../Models/PcBuild";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import RouteNames from "../../Config/RouteNames";

interface PcBuildDialogProps {
    setShowDialog: (value: boolean) => void;
    pcBuild: PcBuild;
}

const CreateForumPostDialog: FC<PcBuildDialogProps> = ({
    setShowDialog,
    pcBuild,
}) => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("Thoughts about this build?");
    const [text, setText] = useState("");

    useEffect(() => {
        setText(pcBuild.toText());
    }, [pcBuild]);

    const handlePostClick = async () => {
        try {
            // @ts-ignore
            const token = (JSON.parse(localStorage.getItem("user")) as User)
                .token;

            const { data } = await axios.post(
                "forum/posts",
                {
                    title: title,
                    text: text,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            
            navigate(RouteNames.Forum)
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 opacity-75 z-40"></div>

            <div
                id="popup-modal"
                className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <button
                            onClick={() => setShowDialog(false)}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                        >
                            <svg
                                className="w-3 h-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6">
                            <div className="w-full">
                                <div className="mb-6">
                                    <label className="block mb-2 text-xl font-medium text-gray-900">
                                        Title
                                    </label>
                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-xlfont-medium text-gray-900">
                                        Text
                                    </label>
                                    <textarea
                                        rows={10}
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    ></textarea>
                                </div>

                                <div className="mb-6 flex justify-start">
                                    <button
                                        onClick={() => handlePostClick()}
                                        className="ml-2 w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateForumPostDialog;
