export const AboutSection = () => {
    return (
        <div className={"z-10 relative parallax-container parallax bg-cover bg-center bg-[url('/src/assets/printer.mp4')]"}>
            <div className="relative overflow-hidden flex flex-col pb-20 md:flex-row lg:flex-row md:pt-[100px] lg:pt-[100px]">
                <div className="absolute -top-full bottom-0 -z-[1]">
                    <video autoPlay={true} muted={true} loop={true}  className="h-screen w-screen object-cover brightness-[0.30]" src="/src/assets/printer1.mp4"></video>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="p-6 text-white">
                        <h2 className="text-6xl font-bold">PrintHub:</h2>
                        <p className="text-4xl">A service that works for you.</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="p-6 text-white">
                        <ul className="list-none flex flex-col">
                            <li className="flex items-center mb-4 md:mr-4 lg:mr-4">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="12" fill="white"></circle>
                                        <path d="M13.6947 8.30762V16.0615H12.2547V9.515H10.6154V8.30762H13.6947Z" fill="#009EE0"></path>
                                    </svg>
                                </span>
                                <span className='text-xl ml-2'>Tons of different pieces with variety.</span>
                            </li>

                            <li className="flex items-center mb-4 md:mr-4 lg:mr-4">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                                        <ellipse cx="11.6638" cy="12" rx="11.6638" ry="12" fill="white"></ellipse>
                                        <path d="M14.3698 14.4923V15.7108H8.81426V14.7471L11.8074 11.8228C12.1447 11.4905 12.3708 11.2025 12.4857 10.9588C12.6077 10.7077 12.6687 10.4603 12.6687 10.2167C12.6687 9.85481 12.5503 9.57788 12.3134 9.38588C12.0765 9.19388 11.7284 9.09788 11.269 9.09788C10.501 9.09788 9.91245 9.36742 9.50332 9.9065L8.52356 9.13111C8.81785 8.72496 9.21262 8.41111 9.70788 8.18958C10.2103 7.96065 10.7702 7.84619 11.3875 7.84619C12.2057 7.84619 12.8589 8.04558 13.347 8.44435C13.8351 8.84311 14.0791 9.38588 14.0791 10.0727C14.0791 10.4936 13.993 10.8887 13.8207 11.2579C13.6485 11.6271 13.3183 12.048 12.8302 12.5207L10.8168 14.4923H14.3698Z" fill="#009EE0"></path>
                                    </svg>
                                </span>
                                <span className='text-xl ml-2'>Upload a video of an object and make it a 3D piece.</span>
                            </li>

                            <li className="flex items-center mb-4 md:mr-4 lg:mr-4">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 23 24" fill="none">
                                        <ellipse cx="11.3937" cy="12" rx="11.3937" ry="12" fill="white"></ellipse>
                                        <path d="M12.3507 11.0474C13.0308 11.136 13.5496 11.3797 13.9072 11.7785C14.2648 12.1773 14.4436 12.6757 14.4436 13.2739C14.4436 13.7243 14.3349 14.1342 14.1176 14.5034C13.9002 14.8727 13.5707 15.168 13.1289 15.3896C12.6942 15.6037 12.1614 15.7108 11.5303 15.7108C11.0045 15.7108 10.4961 15.6333 10.0053 15.4782C9.52152 15.3157 9.10785 15.0942 8.76428 14.8136L9.35325 13.6948C9.61968 13.9311 9.94221 14.1194 10.3208 14.2597C10.7065 14.3927 11.1026 14.4591 11.5093 14.4591C11.9931 14.4591 12.3717 14.3557 12.6451 14.149C12.9256 13.9348 13.0658 13.6468 13.0658 13.285C13.0658 12.9231 12.9326 12.6425 12.6662 12.4431C12.4068 12.2363 12.0071 12.133 11.4672 12.133H10.7941V11.1471L12.4664 9.05358H9.12187V7.84619H14.1386V8.80988L12.3507 11.0474Z" fill="#009EE0"></path>
                                    </svg>
                                </span>
                                <span className='text-xl ml-2'>Best prices in the market.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
