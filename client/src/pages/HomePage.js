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
    const [loading, setLoading] = useState(false); // State to track loading status
    const [page, setPage] = useState(1); // State to track current page number
    const [hasMore, setHasMore] = useState(true);

    const { user, serverUrl } = AuthState();
    const toast = useGlobalToast();
    const navigate = useNavigate();

    const [items, setItems] = useState(Array.from({ length: 20 }));
    const fetchMoreData = () => {
        if (items.length >= 500) {
            setHasMore(false);
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
            setItems((prevItems) =>
                prevItems.concat(Array.from({ length: 20 }))
            );
        }, 5000);
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
                        dataLength={items.length}
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
                        {items.map((_, index) => (
                            <div style={style} key={index}>
                                div - #{index}
                            </div>
                        ))}
                    </InfiniteScroll>
                </Box>
            </Box>
        </div>
    );
};
