import React, { useState, useEffect } from "react";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { AuthState } from "../context/AuthContext";
import useGlobalToast from "../GlobalFunctions/toast";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll component
import convertTimestampToDuration from "../GlobalFunctions/timeDuration";
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
                    w={"100%"}
                    borderRadius={"lg"}
                    borderWidth={"1px"}
                    boxSizing="border-box"
                    overflowY={"auto"}
                >
                    <Box w={{ base: "100%", lg: "50%" }}>
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            height={"85vh"}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {posts.map((post, index) => (
                                <Box
                                    key={index}
                                    p={{
                                        base: "1",
                                        md: "10px",
                                    }}
                                    border={"1px solid gray"}
                                    borderRadius={"lg"}
                                    m={2}
                                >
                                    <Flex mb={2}>
                                        <Avatar
                                            size="md"
                                            name={post.writer.name}
                                            src={post.writer.dp}
                                        />
                                        <Flex
                                            direction="column"
                                            ml="2"
                                        >
                                            <Text>
                                                {post.writer.name}
                                            </Text>
                                            <Text>
                                                {convertTimestampToDuration(
                                                    post.createdAt
                                                )}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        w={"100%"}
                                        justifyContent={"center"}
                                        fontWeight={600}
                                        fontFamily={"-moz-initial"}
                                        fontSize={"xl"}
                                        textAlign={"center"}
                                    >
                                        {post.title}
                                    </Flex>
                                    {post.image && (
                                        <Box width={"100%"} p={2}>
                                            <Image
                                                src={post.image}
                                                borderRadius={"xl"}
                                            />
                                        </Box>
                                    )}
                                    <Box textAlign={"center"}>
                                        {post.content}
                                    </Box>
                                </Box>
                            ))}
                        </InfiniteScroll>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};
