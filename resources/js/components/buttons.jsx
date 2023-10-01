import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const DefaultButton = () => {
    return (
        <Button>I just consumed some ⚡️Chakra!</Button>
    )
}
const Button1 = () => {
    return (
        <Button colorScheme='blue'>This is button 1</Button>
    )
}

export { DefaultButton, Button1 };