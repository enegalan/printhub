import logo from '../../../public/logoBlue.svg';

import { ContactUsSection } from './sections/ContactUsSection';

export const Footer = () => {
    return (
        <footer className="relative z-10 bg-[--dark] text-white mt-16 pb-10">
            {/* Wave SVG */}
            <div className="transform -translate-y-full w-full">
                <svg className="rotate-180 w-[inherit] h-[100px] fill-[var(--dark)]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-5">
                <div className="w-full lg:w-2/3 text-center lg:text-left mb-6 lg:mb-0 relative z-10">
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                        <img src={logo} alt="PrintHub Logo" className="mr-2 w-[10%]" />
                        <span className="text-3xl ml-3 font-bold">PrintHub</span>
                    </div>

                    <p className="text-sm">
                        Welcome to PrintHub - Your One-Stop Printing Solution. Providing high-quality printing services since 2023.
                    </p>
                    {/* Social Media */}
                    <ul className="flex mt-4 justify-center lg:justify-start">
                        {/* TikTok */}
                        <li>
                            <a className="flex justify-center items-center text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="https://www.tiktok.com/@printhubeus" aria-label="TikTok">
                                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 512 512" id="icons"><path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" /></svg>
                            </a>
                        </li>
                        {/* Instagram */}
                        <li className="ml-2">
                            <a className="flex justify-center items-center text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="https://www.instagram.com/printhubeus/" aria-label="Instagram">
                                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" /></svg>
                            </a>
                        </li>
                        {/* Twitter X */}
                        <li className="ml-2">
                            <a className="flex justify-center items-center text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="https://twitter.com/PrintHubEUS" aria-label="Twitter">
                                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" /></svg>
                            </a>
                        </li>
                    </ul>
                    {/* Footer Links */}
                    <div className='flex w-full justify-around mt-5'>
                        <div className="flex flex-col">
                            <h6 className="text-left text-sm font-bold">Products</h6>
                            <ul className="flex flex-col items-start">
                                <li>
                                    <a className="text-sm text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/#pricing">Pricing &amp; Plans</a>
                                </li>
                                <li>
                                    <a className="text-sm text-slate-300 transition duration-150 ease-in-out hover:text-white" href={route('market')}>Market</a>
                                </li>
                                <li>
                                    <a className="text-sm text-slate-300 transition duration-150 ease-in-out hover:text-white" href={route('scan')}>Scan</a>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <h6 className="text-left text-sm font-bold">Company</h6>
                            <ul className="flex flex-col items-start">
                                <li>
                                    <a className="text-sm text-slate-300 transition duration-150 ease-in-out hover:text-white" href={route('about')}>About us</a>
                                </li>
                                <li>
                                    <a className="text-sm text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/about#team">Our Team</a>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <h6 className="text-left text-sm font-bold">Others</h6>
                            <ul className="flex flex-col items-start">
                                <li>
                                    <a className="text-sm text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/about#faqs">FAQ & Help</a>
                                </li>
                                <li>
                                    <a className="text-sm text-slate-300 transition duration-150 ease-in-out hover:text-white" href="#0">Terms of privacity</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Contact us Form Section */}
                <ContactUsSection/>
            </div>
        </footer>
    )
}