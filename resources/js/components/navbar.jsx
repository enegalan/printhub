import React from 'react'
import ReactDOM from 'react-dom/client'


const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href="#">Help</a></li>
                <li><a href="#">Favourites</a></li>
                <li><a href="#">Language</a></li>
                <li><a href="#">My account</a></li>
            </ul>
            <ul>
                <li><a href="#"><img src="" alt="printhub-logo" /></a></li>
                <li><a href="#">Market</a></li>
                <li><a href="#">Upload your piece</a></li>
                <li><a href="#">Contact us</a></li>
            </ul>
        </nav>
    )
}

export default Navbar

if(document.querySelector('#navbar')) {
    const root = ReactDOM.createRoot(document.querySelector('#navbar'));

    root.render(
        <React.StrictMode>
            <Navbar/>
        </React.StrictMode>
    )
}