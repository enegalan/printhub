import React from 'react'
import {
    Box,
    Flex,
    Spacer,
    Link,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Nav = () => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            padding="1rem"
            bg="gray.900" // Change color
            color="white" // Change color
        >
            <Link href="/" fontSize="2xl" fontWeight="bold">
                PrintHub
            </Link>

            <Spacer />

            <Box display={{ base: "none", md: "block" }}>
                <Link mr="4" href="/index">
                    Home
                </Link>
                <Link mr="4" href="/market">
                    Market
                </Link>
                <Link mr="4" href="/upload">
                    Upload your piece
                </Link>
                <Link href="/contact">
                    Contact
                </Link>
            </Box>

            <Box display={{ base: "block", md: "none"}}>
                <Menu>
                    <MenuButton as={IconButton} icon={<Avatar size="sm" name="Usuario" />} variant="outline" color="white" />
                    <MenuList bg="red.100">
                        <MenuItem background="red.400" _hover={{ bg: "gray.800" }}>
                            <Link href="/inicio">Home</Link>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "gray.800" }}>
                            <Link href="/productos">Market</Link>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "gray.800" }}>
                            <Link href="/servicios">Upload your piece</Link>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "gray.800" }}>
                            <Link href="/contacto">Contact</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            
            <Box ml="10px" display={{ base: "block", md: "none"}}>
                <Menu>
                    <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" color="white" />
                    <MenuList bg="red.100">
                        <MenuItem background="red.400" _hover={{ bg: "gray.800" }}>
                            <Link href="/inicio">Home</Link>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "gray.800" }}>
                            <Link href="/productos">Market</Link>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "gray.800" }}>
                            <Link href="/servicios">Upload your piece</Link>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "gray.800" }}>
                            <Link href="/contacto">Contact</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>

            <Button ml="6" mr="2" colorScheme="teal" size="sm" display={{ base: "none", md: "block" }}>
                Log in
            </Button>

            <Box display={{ base: "none", md: "block" }}>
                <Avatar size="sm" name="Usuario" />
            </Box>
        </Flex>
    );
}

export default Nav;