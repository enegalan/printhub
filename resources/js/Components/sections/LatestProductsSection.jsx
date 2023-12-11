
import piece from '../../../../public/images/imagen1.png';

import CardPieces from "../CardPieces.jsx";
export default function LatestProductsSection(){
    // TODO: It would be a good implementation to create an element to redirect the user to the market
    // TODO: Also, it is necessary to create an slider to be adapted to several cards, so it would need a pagination or similars.
    const cardPices = [
        {
            image: piece,
            title: "Reviving Retro PCs",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, voluptates?",
            hashtag: ['image','love'],
        },
        {
            image: piece,
            title: "Another Title",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, voluptates?",
            hashtag: ['image','love','The best','image','love','The best'],
        },
        {
            image: piece,
            title: "One More Title",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, voluptates?",
            hashtag: ['image','love'],
        },
        {
            image: piece,
            title: "One More Title",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, voluptates?",
            hashtag: ['image','love'],
        },
    ];
    return(
        <section id="partsSectionIndex" className="relative z-10 bg-[var(--light-grey)] pt-20">
            <div className="mx-2 flex flex-col items-center">
                <h1 className="text-3xl text-blue-800">GET THE HIGHEST QUALITY FOR YOUR 3D PARTS</h1>
                <h1 className="text-4xl font-bold text-blue-800">WITH THE BEST SERVICE</h1>
            </div>
            <div className="mt-10 pb-10 grid justify-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-4 md:mx-20 mx-3">
                {cardPices.map((item, index) => (
                    <CardPieces
                        key={index}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        hashtag={item.hashtag}
                    />
                ))}
            </div>
        </section>
    )
}