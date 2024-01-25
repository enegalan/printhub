// import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/inertia-react";
import NavBar from "@/Components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "@/../css/backgroundWhite.css";
import ProductCardMini from "@/Components/ProductCardMini";
import SelectOptions from "@/Components/SelectOptions";
import InputError from "@/Components/InputError";

export default function Show({ product, colors, materials, randomProducts }) {
  const categories = product.categories;
  const { data, setData, post, processing, errors, reset } = useForm({
    color: "",
    material: "",
  });

  const submit = (e) => {
    e.preventDefault();
    if (!data.color || !data.material) {
      setData("color", data.color);
      setData("material", data.material);
      errors.color = !data.email ? "Email is required" : null;
      errors.material = !data.password ? "Password is required" : null;
    } else {
      post(route('nombre'));
      console.log(data);
    }
  };
  return (
    <main className="bg-white">
      <NavBar
        defaultBackgroundColor="var(--main-blue)"
        dynamicBackground={false}
      ></NavBar>
      <section className="flex justify-center mt-16">
        <div className="w-[1200px] mt-8 mx-4 pb-4">
          <div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap">
            <div className="w-full md:w-1/3 lg:w-1/2 max-w-full relative flex justify-center items-center bg-gray-200 rounded-xl">
              {/* This need to be remobed on deply to if image != null */}
              <img
                src={
                  product.image.includes("/tmp/")
                    ? "/images/imagen1.png"
                    : `/storage/products/${product.image}`
                }
                alt="product image"
              />
            </div>
            <div className="w-full md:w-2/3 lg:w-1/2 lg:flex-1 max-w-full py-4 px-6 flex flex-col gap-2 ">
              <h1 className="text-xl ">{product.name}</h1>
              <h1 className="text-red-600  text-2xl font-bold">
                {product.price} €
              </h1>
              <p className="text-gray-500">{product.description}</p>
              <div className="pt-4 pb-2">
                {categories.map((category) => (
                  <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
                    # {category.name}
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <div className="space-y-2">
                  <h1 className="text-xl">Color</h1>
                  <SelectOptions
                    
                    options={colors}
                    usingObject={true}
                    name="color"
                    onChangeOption={(o) => setData('color',o)}
                  />
                  <InputError message={errors.color} className="mt-2" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-xl">Material</h1>
                  <SelectOptions
                    
                    options={materials}
                    usingObject={true}
                    name="material"
                    onChangeOption={(o) => setData('material',o)}
                  />
                  <InputError message={errors.color} className="mt-2" />
                </div>
              </div>
              <div className="flex flex-col gap-2 h-full justify-end">
                <Link
                  href="/payment"
                  className="bg-blue-950 font-semibold text-lg text-white py-4 w-full rounded-full mt-4 hover:bg-blue-800 text-center"
                >
                  Buy now
                </Link>
                <button
                  className="py-4 w-full font-semibold text-lg text-blue-950 border border-gray-400 rounded-full hover:border-black"
                  onClick={submit}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="w-[1200px] m-auto rounded border-2 bg-gray-200" />
      <section className="max-w-[1200px] xl:p-0 px-4 m-auto">
        <h1 className="text-xl py-10 font-bold">Related products</h1>
        <Swiper
          slidesPerView={3}
          spaceBetween={0}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="py-2"
        >
          {randomProducts.map((prod) => (
            <SwiperSlide>
              <ProductCardMini product={prod}></ProductCardMini>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}
