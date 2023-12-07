import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import '../css/Inputs.css';


// TODO: This input should be updated in order to allow to display the results in a "Result modal" for the navbar' search input
const SearchInput = ({ placeholder = "", onChange = "" }) => {
    return (
        <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>

            <input type="text" placeholder={placeholder} onChange={onChange} className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
    );
}
SearchInput.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.string,
};

const DragAndDropBox = () => {
    useEffect(() => {
        const dropzone = document.getElementById('dropzone');
        const fileInput = document.getElementById('fileInput');
        const fileList = document.getElementById('fileList');
    
        /* When the user is dragging a file over the box */
        const dragOver = (e) => {
            e.preventDefault();
            dropzone.classList.remove('border-gray-300', 'border-2');
            dropzone.classList.add('border-blue-500', 'border-2');
        }
        /* When the user leaves dragging a file over the box */
        const dragLeave = () => {
            dropzone.classList.remove('border-blue-500', 'border-2');
            dropzone.classList.add('border-gray-300', 'border-2');
        }
        
        const drop = (e) => {
            e.preventDefault();
            dropzone.classList.remove('border-blue-500', 'border-2');
            dropzone.classList.add('border-gray-300', 'border-2');
    
            const files = e.dataTransfer.files;
            handleFiles(files);
        }
        /* When the user try uploading file(s) */
        const change = (e) => {
            const files = e.target.files;
            handleFiles(files);
        }
    
        dropzone.addEventListener('dragover', dragOver);
        dropzone.addEventListener('dragleave', dragLeave);
        dropzone.addEventListener('drop', drop);
        fileInput.addEventListener('change', change);
    
        function handleFiles(files) {
            fileList.innerHTML = '';
            for (const file of files) {
                const listItem = document.createElement('div');
                listItem.textContent = `${file.name} (${formatBytes(file.size)})`;
                fileList.appendChild(listItem);
            }

            // TODO: Send the files to the server
        }
    
        function formatBytes(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    }, []);
    
    return(
        <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg">
            <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">File Drop and Upload</h1>
            <div className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out" id="dropzone">
                <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
                    <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span className="text-gray-600">Drag and drop your files here</span>
                    <span className="text-gray-500 text-sm">(or click to select)</span>
                </label>
                <input type="file" id="fileInput" className="hidden" multiple/>
            </div>
            <div className="mt-6 text-center" id="fileList"></div>
        </div>
    );
}

const TextInput = ({ name = "", placeholder = "", width = "full", type = "text", icon = "", image = "", value = "" }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const hasContentClass = inputValue ? 'has-content' : '';

    return (
        <div className="relative mt-2 z-20">
            <input name={name} className={`textInput ${width} ${hasContentClass}`} onChange={handleInputChange} type={type} placeholder="" value={inputValue}/>
            {icon && <div className="flex w-[35px] h-full items-center absolute top-0"><i className={`${icon}`}></i></div>}
            {image && <img className="w-[20px] h-[20px]" src={`${image}`} alt="icon" />}
            {(icon || image) && <label>{placeholder}</label>}
            <span className="textInput-focus-bg"></span>
        </div>
    );
}
TextInput.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string,
    image: PropTypes.string,
    value: PropTypes.string,
};



const TextAreaInput = ({ placeholder = "", rows = 20, cols = 20 }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    
    const hasContentClass = inputValue ? 'has-content' : '';

    return (
        <div className="relative mt-2 z-20">
            <textarea cols={cols} rows={rows} className={`textAreaInput ${hasContentClass}`} onChange={handleInputChange} placeholder={placeholder}/>
        </div>
    );
}
TextAreaInput.propTypes = {
    placeholder: PropTypes.string,
    rows: PropTypes.string||PropTypes.number,
    cols: PropTypes.string||PropTypes.number,
};

export { SearchInput, DragAndDropBox, TextInput, TextAreaInput };