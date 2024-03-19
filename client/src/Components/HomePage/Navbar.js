import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { FaPenNib } from "react-icons/fa6";
import { AuthState } from "../../context/AuthContext";
import { ProfileModal } from "../misc/ProfileModal";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { user } = AuthState();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bg={"white"}
                w={"100%"}
                p={"5px 10px 5px 10px"}
                borderWidth={"3px"}
                boxSizing="border-box"
            >
                <Flex
                    fontSize={"xl"}
                    fontFamily={"Podkova, serif"}
                    textAlign={"center"}
                    fontWeight={"bolder"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                >
                    <FaPenNib size={15} />
                    Inkly
                </Flex>
                <Flex gap={2} id="navigator">
                    <NavLink
                        to={"/home"}
                        style={{ padding: "2px 5px" }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/post"}
                        style={{ padding: "2px 5px" }}
                    >
                        Post
                    </NavLink>
                </Flex>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                as={Button}
                                rightIcon={
                                    isOpen ? (
                                        <ChevronUpIcon />
                                    ) : (
                                        <ChevronDownIcon />
                                    )
                                }
                                paddingX={{
                                    base: "2",
                                    md: "4",
                                }}
                                isActive={true}
                            >
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                >
                                    <Text
                                        display={{
                                            base: "none",
                                            md: "flex",
                                        }}
                                    >
                                        {user.user.name}
                                    </Text>

                                    <Avatar
                                        size="sm"
                                        cursor="pointer"
                                        name={user.user.name}
                                        src={user.user.dp}
                                        ml={{
                                            base: "0",
                                            md: "2",
                                        }}
                                    />
                                </Box>
                            </MenuButton>
                            <MenuList>
                                <ProfileModal
                                    selectedUser={user.user}
                                >
                                    <MenuItem>My Profile</MenuItem>
                                </ProfileModal>
                                <MenuDivider />
                                <MenuItem onClick={logoutHandler}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Box>
        </>
    );
};
