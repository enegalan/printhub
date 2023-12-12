import { Button, SubmitButton } from "../Buttons"

export const PricingSection = () => {
    return (
        <section id="Pricing" className="bg-gradient-to-b my-24 from-blue-600 to-blue-900 rounded-lg mx-5 p-10 md:p-20 2xl:mx-72 xl:mx-52 lg:mx-10">
            <h1 className="relative z-10 mb-5 text-4xl md:text-5xl text-white font-bold">Plans & Pricing</h1>
            <div className="bg-gradient-to-b from-white to-blue-50 rounded-xl p-8 md:p-10 flex flex-col md:flex-row text-blue-950">
                <div className="mb-8 md:mb-0 md:mr-8 w-full md:w-1/2">
                    <h1 className="relative z-10 text-3xl md:text-4xl mb-4 font-bold">FREE</h1>
                    <p className="relative z-10 font-semibold">Free plan</p>
                    <p className="relative z-10 mt-4 md:mt-6">Take your printings to another level with us.</p>
                    <div className="mt-6 md:mt-10">
                        <SubmitButton value="Join us" hoverBackgroundColor="var(--main-blue)" hoverTextColor="var(--white)" textColor="var(--main-blue)" borderColor="var(--main-blue)"/>
                    </div>
                </div>
                <div className="relative md:-top-20 w-full md:w-1/2 px-8 md:px-10 bg-blue-800 text-white flex flex-col rounded-xl py-4">
                    <div className="text-blue-950 font-bold bg-white py-2 px-6 rounded-full self-end text-xs">MOST POPULAR</div>
                    <div className="">
                        <h1 className="text-3xl md:text-4xl font-bold mt-4">9,99€ <small className="text-2xl md:text-3xl font-light">/month</small></h1>
                        <h1 className="text-lg md:text-xl mt-2 md:mt-4 font-semibold">VIP plan</h1>
                        <p className="mt-2 md:mt-4">Join the VIP team and acquire the benefits that come with it.</p>
                        <div className="mt-2 md:mt-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex">
                                    <div className="flex justify-center items-center rounded-full bg-white w-3 h-3 md:w-5 md:h-5 mr-2"><i className="fas fa-check text-[#1d4ed8]"></i></div>
                                    <p className="font-semibold">High priority orders</p>
                                </div>
                                <div className="flex">
                                    <div className="flex justify-center items-center rounded-full bg-white w-3 h-3 md:w-5 md:h-5 mr-2"><i className="fas fa-check text-[#1d4ed8]"></i></div>
                                    <p className="font-semibold">Order discounts</p>
                                </div>
                                <div className="flex">
                                    <div className="flex justify-center items-center rounded-full bg-white w-3 h-3 md:w-5 md:h-5 mr-2"><i className="fas fa-check text-[#1d4ed8]"></i></div>
                                    <p className="font-semibold">No shipping cost</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 mt-6 md:mt-8">
                            <Button href="#" value="Join us" hoverBackgroundColor="var(--white)" hoverTextColor="var(--main-blue)" textColor="var(--white)" borderColor="var(--white)"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}