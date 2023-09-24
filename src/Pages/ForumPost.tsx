// @ts-nocheck

import ProductCard from "../Components/ProductCard";
import Spinner from "../Components/Spinner";
import ProductFilter from "../Components/ProductFilter";
import axios from "../axios/axios";
import { FunctionComponent, useEffect, useState, createRef } from "react";
import { useParams } from "react-router-dom";

import { Product } from "../Models/Product";
import useGetUser from "../Hooks/useGetUser";

const ForumPost: FunctionComponent = () => {
    const { postId } = useParams();
    const user = useGetUser();

    const [post, setPost] = useState({});
    const [refresh, setRefresh] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetchPost();
    }, [refresh]);

    const fetchPost = async () => {
        try {
            const token = (JSON.parse(localStorage.getItem("user")) as User)
                .token;

            const response = await axios.get(`forum/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPost(response.data);
        } catch (e: any) {
            console.log(e);
        }
    };

    const postComment = async () => {
        try {
            const token = (JSON.parse(localStorage.getItem("user")) as User)
                .token;

            const response = await axios.post(
                `forum/posts/${postId}/comments`,
                { text: comment },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setRefresh((r) => r + 1);
            setComment("");
        } catch (e: any) {
            console.log(e);
        }
    };

    const handleVoteClick = async (voteValue, comment) => {
        let newVoteValue = 0;
        if (comment.youVotedPositive == null) {
            newVoteValue = voteValue;
        } else if (comment.youVotedPositive == true && voteValue == 1) {
            newVoteValue = 0;
        } else if (comment.youVotedPositive == true && voteValue == -1) {
            newVoteValue = -1;
        } else if (comment.youVotedPositive == false && voteValue == 1) {
            newVoteValue = 1;
        } else if (comment.youVotedPositive == false && voteValue == -1) {
            newVoteValue = 0;
        }

        try {
            const token = (JSON.parse(localStorage.getItem("user")) as User)
                .token;

            const response = await axios.post(
                `forum/posts/${postId}/comments/${comment.id}/vote/${newVoteValue}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setRefresh((r) => r + 1);
            setComment("");
        } catch (e: any) {
            console.log(e);
        }
        // /posts/{postId}/comments/{commentId}/vote/{newVoteValue}
    };

    console.log(post);

    return (
        <>
            <div className="w-full px-2 py-4 mb-3 rounded-lg border-2 border-purple-300 bg-purple-700">
                <div className="text-white text-4xl mb-2 font-semibold">
                    {post?.title || ""}
                </div>
                <div className="text-white text-xl font-semibold">
                    {post?.username || ""}
                </div>
                <hr />
                <div className="text-white text-md font-semibold">
                    {post?.postedOn?.split("T")[0] || ""}
                </div>
            </div>

            <div className="w-full px-2 py-4 mb-3 rounded-lg border-2 border-purple-300 bg-purple-700">
                <div className="text-white text-2xl font-semibold">
                    <p className="whitespace-pre-wrap">{post?.text || ""}</p>
                </div>
            </div>

            <div className="w-full px-2 py-4 mb-3 rounded-lg border-2 border-purple-300 bg-purple-700">
                <textarea
                    className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Help this user by sharing your thoughts!"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                {comment.length > 0 && (
                    <button
                        onClick={() => postComment()}
                        className="w-full focus:outline-none text-purple-700 bg-gray-100 hover:bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Comment
                    </button>
                )}
            </div>

            {post?.comments?.map((comment, index) => {
                return (
                    <div
                        key={index}
                        className="w-full px-2 py-4 mb-3 rounded-lg border-2 border-purple-300 bg-purple-700"
                    >
                        <div className="text-white text-xl font-semibold flex mb-2">
                            <div className="w-1/6">
                                {user && (
                                    <>
                                        <div className="grid grid-cols-3 gap-3 w-full mt-4 px-2">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() =>
                                                        handleVoteClick(
                                                            1,
                                                            comment
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        className={`w-6 h-6 ${
                                                            comment.youVotedPositive !=
                                                                null &&
                                                            comment.youVotedPositive
                                                                ? "text-orange-400 hover:text-orange-300"
                                                                : "text-white hover:text-purple-300"
                                                        }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 18 18"
                                                    >
                                                        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-xl text-center">
                                                {comment.score}
                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() =>
                                                        handleVoteClick(
                                                            -1,
                                                            comment
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        className={`w-6 h-6 ${
                                                            comment.youVotedPositive !=
                                                                null &&
                                                            !comment.youVotedPositive
                                                                ? "text-orange-400 hover:text-orange-300"
                                                                : "text-white hover:text-purple-300"
                                                        }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 18 18"
                                                    >
                                                        <path d="M11.955 2.117h-.114C9.732 1.535 6.941.5 4.356.5c-1.4 0-1.592.526-1.879 1.316l-2.355 7A2 2 0 0 0 2 11.5h3.956L4.4 16a1.779 1.779 0 0 0 3.332 1.061 24.8 24.8 0 0 1 4.226-5.36l-.003-9.584ZM15 11h2a1 1 0 0 0 1-1V2a2 2 0 1 0-4 0v8a1 1 0 0 0 1 1Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="w-5/6 px-2">
                                {comment.text || ""}
                            </div>
                        </div>
                        <hr className="mb-2" />
                        <div className="text-lg text-white flex px-2">
                            <div className="w-3/6 text-start">
                                <span>{comment.username}</span>
                                {comment.userIsVerified && (
                                    <span className="ml-2">
                                        <svg
                                            className="w-4 h-4 text-white inline-block"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <div className="w-3/6 text-end">
                                {comment.postedOn.split("T")[0]}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ForumPost;
