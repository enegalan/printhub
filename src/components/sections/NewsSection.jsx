import news from '../../assets/imagen1.png'

export const NewsSection = () => {
    return (
        <section className="pb-16 pt-[50px] lg:pt-[100px] md:pt-[100px] relative z-10 bg-[var(--light-grey)]">
            <div className="container mx-auto">
                <h2 className="relative z-10 text-4xl lg:text-5xl font-bold mb-10 text-center text-blue-800">Latest News</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-white p-6 rounded-md shadow-md transition transform hover:scale-105 hover:shadow-xl">
                        <h3 className="text-2xl text-[--blue-1] font-bold mb-4">PrintHub Launches New 3D Printing Service</h3>
                        <p className="text-gray-500 mb-2">November 17, 2023</p>
                        <img className="mx-auto mb-4 rounded-md" src={news} alt="PrintHub 3D Printing Service"></img>
                        <p className="text-gray-700">PrintHub has recently unveiled its latest 3D printing service, bringing cutting-edge technology to users for a seamless printing experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>


                    <div className="bg-white p-6 rounded-md shadow-md transition transform hover:scale-105 hover:shadow-xl">
                        <h3 className="text-2xl text-[--blue-1] font-bold mb-4">3D Printing Technology Advancements</h3>
                        <p className="text-gray-500 mb-2">November 15, 2023</p>
                        <img className="mx-auto mb-4 rounded-md" src={news} alt="3D Printing Technology Advancements"></img>
                        <p className="text-gray-700">Exciting breakthroughs in 3D printing technology have been announced, promising to revolutionize the industry. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                    </div>

                    <div className="bg-white p-6 rounded-md shadow-md transition transform hover:scale-105 hover:shadow-xl">
                        <h3 className="text-2xl text-[--blue-1] font-bold mb-4">New Features Added to PrintHub Platform</h3>
                        <p className="text-gray-500 mb-2">November 12, 2023</p>
                        <img className="mx-auto mb-4 rounded-md" src={news} alt="New Features Added to PrintHub Platform"></img>
                        <p className="text-gray-700">PrintHub&apos;s platform receives a major update with new features designed to enhance user experience. Sed auctor odio et felis aliquet, vel interdum libero feugiat. Ut ut nisl sit amet turpis fermentum eleifend.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}