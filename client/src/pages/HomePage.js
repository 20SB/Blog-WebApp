import React, { useState, useEffect } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { AuthState } from "../context/AuthContext";
import useGlobalToast from "../GlobalFunctions/toast";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll component
const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
};
export const HomePage = () => {
    const [posts, setPosts] = useState([]); // State to store posts
    const [page, setPage] = useState(1); // State to track current page number
    const [hasMore, setHasMore] = useState(true);

    const { user, serverUrl } = AuthState();
    const toast = useGlobalToast();
    console.log("user", user);
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };
    console.log("total posts array", posts);

    const fetchMoreData = () => {
        axios
            .get(`${serverUrl}/blog/all?page=${page}&limit=2`, config)
            .then(({ data }) => {
                console.log(`page-${page} posts`, data);
                let newPosts = data.blogs;

                // if newPosts array size is 0 then  there are no more posts left
                if (newPosts.length <= 0) {
                    setHasMore(false);
                } else {
                    setPosts((prevPosts) => [
                        ...prevPosts,
                        ...newPosts,
                    ]);
                    setPage((prevPage) => prevPage + 1);
                }
            })
            .catch((error) => {
                toast.error(
                    "Error",
                    error.response
                        ? error.response.data.message
                        : "Something Went Wrong"
                );
            });
    };
    useEffect(() => {
        axios
            .get(`${serverUrl}/blog/all?page=1&limit=2`, config)
            .then(({ data }) => {
                let newPosts = data.blogs;
                console.log("newPosts", newPosts);
                setPosts(newPosts);
                setPage(2);
            })
            .catch((error) => {
                toast.error(
                    "Error",
                    error.response
                        ? error.response.data.message
                        : "Something Went Wrong"
                );
            });
    }, []);
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
                >
                    {/* <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchMoreData}
                        hasMore={true}
                        loader={<p>Loading...</p>}
                        endMessage={<p>Yay! You have seen it all</p>}
                    >
                        {posts.map((post, index) => (
                            <Box
                                key={index}
                                width={"30%"}
                                bg={"cyan"}
                            >
                                <Avatar
                                    name={
                                        post.writer &&
                                        post.writer.name
                                    }
                                    src={
                                        post.writer && post.writer.dp
                                    }
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
                    </InfiniteScroll> */}
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        height={400}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {posts.map((post, index) => (
                            <div
                                key={index}
                                style={{ width: "100px" }}
                            >
                                <b>title</b> - {post.title}
                                <br />
                                <b>writer </b>- {post.title}
                                <br />
                                <b>title </b>- {post.content}
                                <br />
                                <b>title</b> - {post.createdAt}
                                <br />
                                <hr />
                            </div>
                        ))}
                    </InfiniteScroll>
                </Box>
            </Box>
        </div>
    );
};
