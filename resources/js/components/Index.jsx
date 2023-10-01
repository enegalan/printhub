import React from 'react'
import ReactDOM from 'react-dom/client'


const Index = () => {
    return (
        <div>
            This is PrintHub home!
        </div>
    )
}

export default Index

if(document.querySelector('#root')) {
    const root = ReactDOM.createRoot(document.querySelector('#root'));

    root.render(
        <React.StrictMode>
            <Index/>
        </React.StrictMode>
    )
}