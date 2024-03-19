import { Box } from "@chakra-ui/react";
import React from "react";

export const PostBlog = () => {
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
                PostBlog
            </Box>
        </div>
    );
};
