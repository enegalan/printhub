import React from 'react'
import { Box, Spinner } from "@chakra-ui/react"

const Loader = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Spinner speed="1s" size="xl" />
        </Box>
    )
}

export default Loader;