/*
    Import React & React-DOM/client
*/
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

/*
    Load UI library
*/

/*
    Load all components that will be displayed
*/


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
            return (
                <React.StrictMode>
                        <Nav></Nav>
                        *Add here the components*
                </React.StrictMode>
            );
        }
    }
*/
var App = null;
var root = null;

if (display_dom['index']) {
    root = ReactDOM.createRoot(display_dom['index']);
    App = () => {
        return (
            <React.StrictMode>
                Welcome to PrintHub!
            </React.StrictMode>
        );
    }
}

/*
    When App is loaded of components render it to root
*/
root.render(
    <App></App>
)