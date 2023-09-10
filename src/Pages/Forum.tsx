// @ts-ignore

import ProductCard from "../Components/ProductCard";
import Spinner from "../Components/Spinner";
import ProductFilter from "../Components/ProductFilter";
import axios from "../axios/axios";
import { FunctionComponent, useEffect, useState, createRef } from "react";
import { Link } from "react-router-dom";

const Forum: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("forum/posts");
            setPosts(response.data);

            setIsLoading(false);
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="w-full">
                {posts.map((post, index) => {
                    return (
                        <Link to={`/forum/post/${post.id}`} key={index} className="block w-full px-2 py-4 mb-3 rounded-lg border-2 border-purple-300 bg-purple-700 hover:bg-purple-800">
                            <div className="text-white text-xl font-semibold">
                                {post.title}
                            </div>
                            <div className="text-white text-lg font-semibold">
                                {post.username}
                            </div>
                            <hr />
                            <div className="text-white text-md font-semibold">
                                {post.postedOn.split("T")[0]}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Forum;
