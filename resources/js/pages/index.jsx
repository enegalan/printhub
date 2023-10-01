/*
    Import React & React-DOM/client
*/
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
/*
    Import ChakraProvider, ColorModeScript and extendTheme to load styles
*/
import { ChakraProvider, ColorModeScript, extendTheme, Box, Spinner } from "@chakra-ui/react"
const theme = extendTheme({
    config: {
        initialColorMode: 'light',
    },
});
/*
    Load all components that will be displayed
*/
import { DefaultButton, Button1, DarkModeToggle } from '../components/buttons'
import Nav from '../components/navbar'
import Loader from '../components/loader';

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
    if(display_dom['dom_id']){
        root = ReactDOM.createRoot(display_dom['dom_id'])
        App = () => {
            const [loading, setLoading] = useState(true);
            useEffect(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });

            return (
                <ChakraProvider>
                    <ColorModeScript initialColorMode="light" />
                    {loading ? (
                        // Loader
                        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                            <Spinner speed="1s" size="xl" />
                        </Box>
                    ) : (
                        // When page is loaded:
                        <React.StrictMode>
                            <ChakraProvider theme={theme}>
                                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                                <Nav></Nav>
                                
                                <Box className='main'>
                                    *Add here the components*
                                </Box>
                            </ChakraProvider>
                        </React.StrictMode>
                    )}
                </ChakraProvider>
            );
        }
    }
*/

var App = null;
var root = null;

if (display_dom['index']) {
    root = ReactDOM.createRoot(display_dom['index']);

    App = () => {
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        });

        return (
            <ChakraProvider>
                <ColorModeScript initialColorMode="light" />
                {loading ? (
                    // Loader
                    <Loader></Loader>
                ) : (
                    // When page is loaded:
                    <React.StrictMode>
                        <ChakraProvider theme={theme}>
                            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                            <Nav></Nav>
                            
                            <Box className='main'>
                                <DefaultButton></DefaultButton>
                                <Button1></Button1>
                                
                            </Box>
                        </ChakraProvider>
                    </React.StrictMode>
                )}
            </ChakraProvider>
        );
    }

    
}

root.render(
        <App></App>
    )