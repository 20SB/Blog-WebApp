import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AuthState } from "../context/AuthContext";
import useGlobalToast from "../GlobalFunctions/toast";
import axios from "axios";

export const PostBlog = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    // Form data state
    const [formData, setFormData] = useState({
        title: null,
        content: null,
    });

    const { user, serverUrl } = AuthState();
    const toast = useGlobalToast();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files : value,
        }));
    };
    // Form submission handler
    const submitHandler = async () => {
        // check if all fields are filled or not
        if (!formData.title || !formData.content) {
            toast.warning("Please Fill important Fileds");
            return;
        }

        // Check if passwords match before submitting
        if (formData.password !== formData.confirmPassword) {
            toast.warning("Warning", "Please Fill all the Fileds");
            return;
        }

        // Create form data to send to the backend
        let formDatas = new FormData();
        formDatas.append("title", formData.title);
        formDatas.append("content", formData.content);
        formDatas.append("image", image);

        // set loader true
        setLoading(true);

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        // Make a POST request to the backend API
        axios
            .post(`${serverUrl}/blog`, formDatas, config)
            .then(({ data }) => {
                toast.success(data.message, "");

                console.log("data", data);
                // setUser(res.data.data);
            })
            .catch((error) => {
                console.log("error", error);
                toast.error("Error", error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div style={{ width: "100%" }}>
            <Box
                display="flex"
                justifyContent="space-between"
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
                    <Flex
                        w={{ base: "100%", lg: "50%" }}
                        p={{
                            base: "1",
                            md: "10px",
                        }}
                        border={"1px solid gray"}
                        borderRadius={"lg"}
                        m={2}
                        justifyContent={"center"}
                    >
                        <VStack w={"100%"} p={4}>
                            <FormControl id="title" isRequired>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    name="title"
                                    placeholder="Your blog title..."
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl id="content" isRequired>
                                <FormLabel>Content</FormLabel>
                                <Textarea
                                    name="content"
                                    onChange={handleChange}
                                    placeholder="Write your thoughts..."
                                    size="md"
                                    borderRadius={"md"}
                                />
                            </FormControl>

                            <FormControl id="image" isRequired>
                                <FormLabel>
                                    Upload supporting Picture
                                </FormLabel>
                                <Input
                                    name="image"
                                    type={"file"}
                                    p={"1.5"}
                                    pb={"35px"}
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />
                            </FormControl>

                            <Button
                                colorScheme="blue"
                                width={"100%"}
                                mt={"15"}
                                onClick={submitHandler}
                                isLoading={loading}
                            >
                                Post
                            </Button>
                        </VStack>
                    </Flex>
                </Box>
            </Box>
        </div>
    );
};
