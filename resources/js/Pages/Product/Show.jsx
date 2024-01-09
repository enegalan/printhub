import TextInput from '@/Components/TextInput';
export default function Show({ product,colors,materials }) {

  const categories = product.categories;
  //const productCombs = product.product_comb;
  console.log(colors);

  return (
    <main>
      <header className="bg-blue-400 w-full">
        <h1 className="text-4xl">PRINTHUB</h1>
      </header>
      <section className="flex justify-center">
        <div className="w-[1200px] mt-8 mx-4">
        <div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap">
          <div className="w-full md:w-1/3 lg:w-1/2 max-w-full relative bg-gray-200 flex justify-center items-center rounded-xl">
            <img src="/images/imagen1.png" alt="product image" />
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2 lg:flex-1 max-w-full py-4 px-6 flex flex-col gap-2">
            <h1 className="text-xl ">{product.name}</h1>
            <h1 className="text-red-600">{product.price} €</h1>
            <p className="text-gray-500">{product.description}</p>
            <div className="px-6 pt-4 pb-2">
              {categories.map((category) => (
                <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  # {category.name}
                </div>
              ))}
            </div>
            <h1 className="text-xl">Material & Color</h1>
            <div>
            <select className="">
                {colors.map((color) => (
                    <option className={`gb-${color.name}-500`} key={color.id}>
                        {color.name}
                    </option>
                ))}
            </select>
            </div>
            <div>
            <select className="">
                {materials.map((material) => (
                    <option key={material.id}>
                        {material.name}
                    </option>
                ))}
            </select>
            </div>
            <button className="bg-blue-950 font-semibold text-lg text-white py-4 w-full rounded-full mt-4 hover:bg-blue-800 "> Buy now </button>
            <button className="py-4 w-full font-semibold text-lg text-blue-950 border border-gray-400 rounded-full hover:border-black">
                Add to Bag
            </button>

          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
