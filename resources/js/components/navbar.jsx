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
import LoginDropdown from './loginDropdown';
import { DarkModeToggle } from './buttons';

const Nav = () => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            padding="1rem"
            bg="var(--main-blue)" // Change color
            color="var(--white)" // Change color
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
                <Link mr="20px" href="/contact">
                    Contact
                </Link>
            </Box>

            <DarkModeToggle></DarkModeToggle>

            <Box ml="10px">
                <LoginDropdown></LoginDropdown>
            </Box>
            
            <Box ml="10px" display={{ base: "block", md: "none"}}>
                <Menu>
                    <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" color="white" />
                    <MenuList>
                        <MenuItem _hover={{ bg: "var(--dark-blue)" }}>
                            <Link href="/index">Home</Link>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "var(--dark-blue)" }}>
                            <Link href="/market">Market</Link>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "var(--dark-blue)" }}>
                            <Link href="/upload">Upload your piece</Link>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "var(--dark-blue)" }}>
                            <Link href="/contact">Contact</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>

            <Box ml="10px" display={{ base: "none", md: "block" }}>
                <Avatar size="sm" name="Usuario" />
            </Box>
        </Flex>
    );
}

export default Nav;