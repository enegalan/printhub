import React from 'react'
import { Button, ButtonGroup, MenuButton, Box } from '@chakra-ui/react'
import { useMenu, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const DarkModeToggle = () => {
    
    const { colorMode, toggleColorMode } = useColorMode();

    const iconStyles = {
        display: 'flex',
    };

    return (
        <Button onClick={toggleColorMode}>
            <Box style={iconStyles}>
                {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            </Box>
        </Button>
    )
}

const DefaultButton = () => {
    return (
        <Button>I just consumed some ⚡️Chakra!</Button>
    )
}
const Button1 = () => {
    return (
        <Button colorScheme='blue'>Button 1</Button>
    )
}

export { DefaultButton, Button1, DarkModeToggle };