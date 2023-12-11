import imagen1 from '../../../../public/images/icon-1.avif'
import imagen2 from '../../../../public/images/icon-2.avif'
import imagen3 from '../../../../public/images/icon-3.avif'


export const InfoSection = () => {
    return (
        <div className="z-10 flex flex-col items-center container mx-auto text-center mt-2">
            <div className="flex flex-wrap container mx-auto mt-2 divide-x divide-y">
                <div className="bg-[--white] rounded z-10 w-full md:w-1/3 px-6 mb-4 shadow py-6">
                    <img src={imagen1} className='z-10 mx-auto mb-3'></img>
                    <div className="">
                        <h3 className="z-10 text-xl lg:text-3xl font-semibold">Reduce Assembly Time</h3>
                        <p className="text-slate-800 text-lg text-justify mt-2">Don&apos;t waste time putting products together! Rely on 3D printing to make complex geometries that can be printed as one piece—or consolidated in one build.</p>
                    </div>
                </div>

                <div className="bg-[--white] rounded z-10 w-full md:w-1/3 px-6 mb-4 shadow py-6">
                    <img src={imagen2} className='z-10 mx-auto mb-3'></img>
                    <div className="">
                        <h3 className="z-10 text-2xl lg:text-3xl font-semibold">Fast Turnaround</h3>
                        <p className="text-slate-800 text-lg text-justify mt-2" >Working on a project for a customer that has to be just right? Get models back fast, and 3D print new iterations, if needed, for final feedback and production.</p>
                    </div>
                </div>

                <div className="bg-[--white] rounded z-10 w-full md:w-1/3 px-6 mb-4 shadow py-6">
                    <img src={imagen3} className='z-10 mx-auto mb-3'></img>
                    <div className="">
                        <h3 className="z-10 text-2xl lg:text-3xl font-semibold">Reliable Quality</h3>
                        <p className="text-slate-800 text-lg text-justify mt-2">Proprietary processes, expert 3D printing operators, and inspections are our secrets to delivering exceptional, quality products every time.</p>
                    </div>
                </div>
            </div>
        </div>

    )
}