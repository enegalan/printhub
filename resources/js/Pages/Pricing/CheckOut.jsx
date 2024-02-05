import PayPalPayment from "@/Components/PayPal";
import { Link } from "@inertiajs/react";

export default function CheckOut({ user, price }) {
  return (
    <main className="flex flex-col md:flex-row h-screen divide-x-2 divide-neutral-300 bg-[url(/images/dark-blue-blur-background-vector.webp)] bg-cover bg-no-repeat">
      <div className="text-white flex-1 flex items-center justify-center w-full xl:px-32">
        <div className="p-10 flex flex-col gap-4 w-full h-full">
          <div>
            <Link
              href="/"
              className="text-4xl font-bold justify-start flex gap-8 items-center md:flex md:items-center"
            >
              <img src="/logoBlue.svg" alt="Logo" />
              PrintHub
            </Link>
          </div>
          <div className="flex flex-col gap-4 h-full justify-center text-xl">
            <h1 className="text-3xl font-semibold">Checkout information</h1>
            <div className="p-2 flex gap-2 bg-white/10 rounded-lg">
              <h1 className="font-bold">Name: </h1>
              <h1>{user.name}</h1>
            </div>
            <div className="p-2 flex gap-2 bg-white/10 rounded-lg">
              <h1 className="font-bold">Lastname: </h1>
              <h1>{user.lastname}</h1>
            </div>
            <div className="p-2 flex gap-2 bg-white/10 rounded-lg">
              <h1 className="font-bold">Email account: </h1>
              <h1>{user.email}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white text-black p-10 md:w-1/3 md:my-10 md:mr-10 md:rounded-3xl max-md:h-full">
        <div className="flex items-center justify-between md:pb-4 bg-gray-100 rounded-xl md:p-4 md:mb-4">
          <img
            src="/images/Vip.png"
            className="bg-white rounded w-16 h-16 border"
            alt=""
          />
          <p>Vip account upgrade for one user</p>
          <h1>{price}</h1>
        </div>
        <hr />
        <div className="pt-4 flex justify-between text-2xl">
          <h1>Price</h1>
          <h1 className="font-bold">$ 8.26</h1>
        </div>
        <div className="pt-4 flex justify-between text-2xl">
          <h1>IVA</h1>
          <h1 className="font-bold">21%</h1>
        </div>
        <div className="pt-4 flex justify-between text-2xl">
          <h1>Total</h1>
          <h1 className="text-red-500 font-bold">${price}</h1>
        </div>
        <div className="flex max-md:h-full items-center justify-center md:pt-4">
            <PayPalPayment
              buttonColor="blue"
              className="w-full"
              onSuccess={() => {
                const formData = new FormData();
                formData.append("user_id", user.id);

                fetch("/api/complete-payment/plan", {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => {
                    if (response.ok) {
                      return response.json();
                    }
                    throw new Error(
                      "Error " +
                        response.status +
                        " al llamar al API: " +
                        response.statusText
                    );
                  })
                  .then((data) => {
                    if (data.redirect) {
                      window.location.href = data.redirect;
                    } else {
                      console.log("Formularios enviados exitosamente:", data);
                    }
                  })
                  .catch((error) => {
                    console.error("Error al enviar formularios:", error);
                  });
              }}
              total={price}
            />
          </div>
      </div>
    </main>
  );
}
