import React from "react";

import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider
} from "@chakra-ui/react";

function LoginDropdown() {
    return (
        <Menu>
            <MenuButton as={Button} colorScheme="blue">
                Log in
            </MenuButton>
            <MenuList>
                <MenuGroup title='Profile'>
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Help'>
                    <MenuItem>Contact us</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
}


export default LoginDropdown;
