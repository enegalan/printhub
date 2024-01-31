import { Link } from "@inertiajs/react";
import { FaCheckCircle } from "react-icons/fa";

export default function PricingCard({plan, price, description, advantagesArray, popular, href}) {
  function isFloat(n){
    if (Number.isInteger(n)) {
      return true
    }
    return Number(n) === n && n % 1 !== 0;
  }
  return (
    <div className="bg-white/10 rounded-3xl py-4 px-8 flex flex-col backdrop-blur-sm bg-cover text-white xl:max-w-sm w-full border-y-2 border-white/20 transition-color ease-in-out duration-700 delay-50 hover:bg-white/20">
      <div>
        <h1 className="text-4xl font-bold mb-5 flex justify-between items-center">{plan}
        {popular && <h3 className="border border-white rounded-full px-3 py-1 text-sm">Popular</h3>}
        </h1>
            {isFloat(price)? <h2 className="text-gray-300 mb-4"><strong className="text-white text-3xl">${price}</strong> per month</h2>:<h2 className="text-gray-300 mb-4">Custom pricing</h2>}
        <p>
          {description}
        </p>
      </div>
      <div className="divide-y space-y-4 py-4">
        {advantagesArray.map((adv, index)=>(
            <div key={index} className="flex gap-2 items-center">
                <FaCheckCircle />
                <p>
                    {adv}
                </p>
            </div>
        ))}
      </div>
      <div className="flex items-end h-full">
        <Link href={href} className="bg-white text-black rounded-full px-8 py-2 hover:bg-neutral-300 transition-colors ease-in-out duration-300">
          Get Started
        </Link>
      </div>
    </div>
  );
}
