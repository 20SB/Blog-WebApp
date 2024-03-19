import React, { useState, useEffect } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { AuthState } from "../context/AuthContext";
import useGlobalToast from "../GlobalFunctions/toast";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [posts, setPosts] = useState([]); // State to store posts
    const [loading, setLoading] = useState(false); // State to track loading status
    const [page, setPage] = useState(1); // State to track current page number

    const { user, serverUrl } = AuthState();
    const toast = useGlobalToast();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        // Function to fetch posts from the backend
        const fetchPosts = async () => {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            axios
                .get(
                    `${serverUrl}/blog/all?page=${page}&limit=2`,
                    config
                )
                .then(({ data }) => {
                    console.log("post", data);
                    let newPosts = data.blogs;
                    setPosts((prevPosts) => [
                        ...prevPosts,
                        ...newPosts,
                    ]); // Append new posts to existing posts
                    // setPage((prevPage) => prevPage + 1); // Increment page number for the next fetch
                })
                .catch((error) => {
                    toast.error(
                        "Error",
                        error.response
                            ? error.response.data.message
                            : "Something Went Wrong"
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        // Fetch posts when the component mounts
        fetchPosts();
    }, [page]); // Fetch posts whenever the page state changes

    // Function to handle scrolling
    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } =
            event.target; // Access the scroll properties of the scrollable box

        console.log("scrollTop", scrollTop);
        console.log("clientHeight", clientHeight);
        console.log("scrollHeight", scrollHeight);

        if (
            scrollTop + clientHeight >= scrollHeight - 5 &&
            !loading
        ) {
            console.log(
                "change page***************************************************************************"
            );
            // Load more posts if user scrolls to the bottom of the box and not already loading
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <Box
                display="flex"
                justifyContent="center"
                w="100%"
                h={`calc(100vh - 56px)`}
                p={{
                    base: "1",
                    md: "10px",
                }}
                boxSizing="border-box"
            >
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    flexDir={"column"}
                    p={{
                        base: "1",
                        lg: "3",
                    }}
                    bg={"white"}
                    w={{ base: "100%", lg: "100%" }}
                    borderRadius={"lg"}
                    borderWidth={"1px"}
                    boxSizing="border-box"
                    overflowY={"auto"}
                    onScroll={handleScroll}
                >
                    {/* Render posts */}
                    {posts.map((post) => (
                        <Box key={post.id} width={"30%"} bg={"cyan"}>
                            <Avatar
                                name={post.writer && post.writer.name}
                                src={post.writer && post.writer.dp}
                                size="md"
                            />
                            <Text>
                                {post.writer && post.writer.name}
                            </Text>
                            <Text>{post.createdAt}</Text>
                            <Text>{post.updatedAt}</Text>
                            <Text>{post.title}</Text>
                            <Text>{post.content}</Text>
                        </Box>
                    ))}
                    {/* Loading indicator */}
                    {loading && <p>Loading...</p>}
                </Box>
            </Box>
        </div>
    );
};
