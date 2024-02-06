import { useForm } from "@inertiajs/inertia-react";
import NavBar from "@/Components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "@/../css/backgroundWhite.css";
import ProductCardMini from "@/Components/ProductCardMini";
import SelectOptions from "@/Components/SelectOptions";
import InputError from "@/Components/InputError";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { StlViewer } from "react-stl-viewer";
import { Footer } from "@/Components/Footer";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "@inertiajs/react";

export default function Show({
  user,
  product,
  colors,
  materials,
  randomProducts,
}) {
  const categories = product.categories;
  const { data, setData, post, processing, errors, reset } = useForm({
    color: "",
    material: "",
    quantity: 1,
  });

  const [swiper, setSwiper] = useState(null);

  const goNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };
  const handleIncrement = () => {
    setData("quantity", data.quantity + 1);
  };
  const handleDecrement = () => {
    if (data.quantity > 1) {
      setData("quantity", data.quantity - 1);
    }
  };
  const onAdd = () => {
    if(user){
      const successMessage = 'Product added to the cart';
      localStorage.setItem('successMessageCart', successMessage);
    }
  }
  const submit = (e) => {
    e.preventDefault();

    if (!data.color || !data.material) {
      errors.color = !data.color ? "Color is required" : null;
      errors.material = !data.material ? "Material is required" : null;
    } else {
      try {
        post(route("cart.add", product.id), { preserveState: true });
        onAdd();
      } catch (error) {
        toast.error("Error: Can not add this produt to the cart");
      }
    }
  };
  var colorNames = colors.map((color) => { return color.name });
  return (
    <main className="bg-white">
      <Toaster></Toaster>
      <NavBar
        user={user}
        defaultBackgroundColor="var(--main-blue)"
        dynamicBackground={false}
      ></NavBar>
      <section className="flex justify-center mt-24">
        <div className="absolute flex justify-start w-full pb-4 ml-10">
        <Link href={route('market')} >
          <IoMdArrowRoundBack className="text-4xl bg-[lightgrey] hover:bg-[#bbbbbb] rounded"/>
        </Link>
        </div>
      
        <div className="max-w-[1200px] mt-16 mx-4 pb-4">
          <div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap">
            <div className="w-full md:w-1/3 lg:w-1/2 max-w-full flex justify-center items-center bg-gray-200 rounded-xl">
              {/* This need to be removed on deploy to if image != null */}
              {product.image ? (<img
                src={
                  product.image.includes("/tmp/")
                    ? "/images/imagen1.png"
                    : `/storage/products/${product.image}`
                }
                width="200px"
                height="200px"
                alt="product"
              />) : (<StlViewer modelProps={{ color: data.hex }} style={{ top: 0, left: 0, width: '100%', height: '50vh', }} orbitControls shadows url={product.file} />)}
            </div>
            <div className="w-full md:w-2/3 lg:w-1/2 lg:flex-1 max-w-full py-4 px-6 flex flex-col gap-2 ">
              <h1 className="text-xl ">{product.name}</h1>
              <h1 className="text-red-600  text-2xl font-bold">
                {product.price}$
              </h1>
              <p className="text-gray-500">{product.description}</p>
              <div className="pt-4 pb-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 "
                  >
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
                    onChangeOption={(o) => {setData("color", o)}}
                  />
                  <InputError message={errors.color} className="mt-2" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-xl">Material</h1>
                  <SelectOptions
                    options={materials}
                    usingObject={true}
                    name="material"
                    onChangeOption={(o) => setData("material", o)}
                  />
                  <InputError message={errors.material} className="mt-2" />
                </div>
                
              </div>
              <div className="flex">
                <button className="bg-blue-950 p-3 px-5 text-white rounded" onClick={handleDecrement}>
                    -
                </button>
                <input type="text" className="text-black text-xl mx-2 w-1/5 text-center" value={data.quantity} readOnly />
                <button className="bg-blue-950 p-3 px-5 text-white rounded" onClick={handleIncrement}>
                    +
                </button>
            </div>
              <div className="flex flex-col gap-2 h-full justify-end">
                <button
                  className="bg-blue-950 font-semibold text-lg text-white py-4 w-full rounded-full mt-4 hover:bg-blue-800 text-center disabled:text-slate-500 disabled:bg-slate-800"
                  onClick={submit}
                  disabled={processing}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="m-auto rounded border-2 bg-gray-200" />
      <section className="max-w-[1200px] xl:p-0 px-4 m-auto">
        <h1 className="text-2xl py-10 font-bold">Related products</h1>
        <div className="flex items-center gap-2">
          <div className="cursor-pointer">
            <FaArrowAltCircleLeft className="text-4xl" onClick={goPrev} />
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={0}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[FreeMode, Pagination]}
            onSwiper={(swiper) => setSwiper(swiper)}
            className="py-2"
          >
            {randomProducts.map((prod, index) => (
              <SwiperSlide key={index}>
                <ProductCardMini key={index} product={prod}></ProductCardMini>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="cursor-pointer" onClick={goNext}>
            <FaArrowAltCircleRight className="text-4xl" />
          </div>
        </div>
      </section>
      <Footer className="mt-32"/>
    </main>
    
  );
}
