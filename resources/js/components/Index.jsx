/*
    Import React & React-DOM/client
*/
import React from 'react'
import ReactDOM from 'react-dom/client'
/*
    Import ChakraProvider to load styles
*/
import { ChakraProvider } from "@chakra-ui/react"
/*
    Load all components that will be displayed
*/
import { DefaultButton, Button1 } from './buttons'
import Nav from './navbar'
/*
    This constant must be updated in order to indicate React where to display components.
    This names represents the id's on a element in the HTML. Example:
    <div id="index"></div>
*/
const display_dom = {
    'index': document.querySelector('#index'),
    'market': document.querySelector('#market'),
    'upload': document.querySelector('#upload'),
    'contact': document.querySelector('#contact'),
};
/*
    All Components must have the same semantic:
    <React.StrictMode>
        <ChakraProvider>
            *Add here the components*
        </ChakraProvider>
    </React.StrictMode>
*/

if(display_dom['index']) {
    const root = ReactDOM.createRoot(display_dom['index']);
    root.render(
        <React.StrictMode>
            <ChakraProvider>
                <Nav></Nav>
                <DefaultButton></DefaultButton>
                <Button1></Button1>
            </ChakraProvider>
        </React.StrictMode>
    )
}