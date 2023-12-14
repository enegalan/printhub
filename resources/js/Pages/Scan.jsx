import '@/App.css';

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

import { DragAndDropBox } from '@/Components/Inputs';

function Scan ({auth}) {
    return (
        <>
            <NavBar defaultBackgroundColor="var(--main-blue)" defaultTextColor="var(--white)" dynamicBackground={false} user={auth.user} />
            <main id="scan" className='mt-32'>
                <h1 className='font-bold text-4xl text-center'>Upload your 3D model here</h1>
                <div className='my-16 flex items-center justify-center'>
                    <DragAndDropBox />
                </div>
                {/* How it works */}
                <div className='flex flex-col gap-5 justify-center items-center mb-36'>
                    <h1 className='font-bold text-4xl text-[var(--main-blue)] mb-5'>How it works</h1>
                    <div className='flex flex-col divide-y max-w-[1000px]'>
                        {/* Upload 3D model */}
                        <div className='px-24 flex items-center gap-20 bg-[var(--blue-1)] text-[var(--white)] p-5 rounded-t-md shadow-lg'>
                            <div className='w-1/2'>
                                <img src="/images/upload-3d-model.png" alt="Upload your 3D model" />
                            </div>
                            <div className='flex flex-col items-center gap-7 w-1/2'>
                                <h3 className='font-bold text-2xl text-center'>UPLOAD YOUR 3D MODEL</h3>
                                <p className='max-w-[350px]'>
                                    To start, you need to upload a <b>.glb</b> or a <b>video</b> file of the object that you want to scan. 
                                    Then our AI will process your request and will give you a piece(s) preview
                                </p>
                            </div>
                        </div>
                        {/* Choose size, material and color */}
                        <div className='px-24 flex items-center gap-20 bg-[var(--blue-1)] text-[var(--white)] p-5 shadow-lg'>
                            <div className='flex flex-col items-center gap-7'>
                                <h3 className='font-bold text-2xl text-center'>CHOOSE SIZE, MATERIAL AND COLOR</h3>
                                <p className='max-w-[350px]'>
                                    The next step is to select the <b>dimensions, materials and colors</b> of each piece.
                                </p>
                            </div>
                            <img src="/images/choose-material.png" alt="Choose size, material and color" />
                        </div>
                        {/* Instant 3D printing */}
                        <div className='px-24 flex items-center gap-20 bg-[var(--blue-1)] text-[var(--white)] p-5 shadow-lg'>
                            <img src="/images/instant-3d-printing.png" alt="Instant 3D printing" />
                            <div className='flex flex-col items-center gap-7'>
                                <h3 className='font-bold text-2xl text-center'>INSTANT 3D PRINTING</h3>
                                <p className='max-w-[350px]'>
                                    Once your order is made, the system will send the request to print your parts to a <b>3D printer</b> that is available and capable of completely printing your order.
                                </p>
                            </div>
                        </div>
                        {/* Receive order */}
                        <div className='px-24 flex items-center gap-20 bg-[var(--blue-1)] text-[var(--white)] p-5 rounded-b-md shadow-lg'>
                            <div className='flex flex-col items-center gap-7'>
                                <h3 className='font-bold text-2xl text-center'>RECEIVE YOUR PRINTED PRODUCT</h3>
                                <p className='max-w-[350px]'>
                                    As soon as the order is correctly completed, it will be transferred to <b>delivery department</b> so that you can receive your order as soon as possible.
                                </p>
                            </div>
                            <img src="/images/receive-order.png" alt="Receive your order" />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Scan;