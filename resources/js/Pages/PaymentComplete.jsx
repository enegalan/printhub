import NavBar from "@/Components/NavBar";
import { Footer } from "@/Components/Footer";
import { useState, useEffect } from "react";
import { Link } from '@inertiajs/react';
import { FaCartShopping } from "react-icons/fa6";

function PaymentComplete({ auth, env, order, files = [] }) {
  const [nozzleTemp, setNozzleTemp] = useState("--");
  const [bedTemp, setBedTemp] = useState("--");
  const [printerStatus, setPrinterStatus] = useState("--");
  const [printProgress, setPrintProgress] = useState("--");
  const apiUrl = env.host;
  const apiKey = env.apiKey;
  useEffect(() => {
      updatePrinterStatus();
      var intervalId = setInterval(updatePrinterStatus, 1000);
      uploadFilesSequentially(files);
    return () => clearInterval(intervalId);
  }, []);
  const updatePrinterStatus = () => {
    fetch(`${apiUrl}/job`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPrintProgress(data.progress.completion + " %");
      })
      .catch((error) => {
        console.error("Error fetching job information:", error);
      });

    fetch(`${apiUrl}/printer`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNozzleTemp(data.temperature.tool0.actual + " °C");
        setBedTemp(data.temperature.bed.actual + " °C");
        setPrinterStatus(data.state.text);
      })
      .catch((error) => {
        console.error("Error fetching temperature information:", error);
      });
  };

  const uploadFilesSequentially = (files, index = 0) => {
    if (index >= files.length) {
      return;
    }

    const file = files[index];
    //const filePath = `/gcode/${file}.gcode`;
    const filePath = '/gcode/dragon.gcode'

    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        // Crea FormData y agrega el archivo
        const formData = new FormData();
        formData.append("file", blob, `${file}.gcode`);
        formData.append("command", "start");
        formData.append("print", true);

        // Envía el archivo y el comando 'start' a OctoPrint
        fetch(`${apiUrl}/files/local`, {
          method: "POST",
          headers: {
            "X-Api-Key": apiKey,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.done) {
              // Si se envió correctamente, pasar al siguiente archivo
              uploadFilesSequentially(files, index + 1);
            } else {
              // Si hubo un error, mostrar un mensaje de error y detener el proceso
              console.error("Error sending file or starting printing:", data);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching file:", error);
      });
  };

  return (
    <>
      <div className='overflow-hidden bg-green-200'>
        <NavBar user={auth.user} dynamicBackground={false} className="backdrop-blur-md bg-gray-900/50 border-b border-blue-950/50" />
        <main id="payment-complete" className='relative flex justify-center flex-col mx-12 rounded-lg my-48 py-12 text-center bg-white'>
          <Link href={route('market')} className="bg-[lightgrey] w-[40px] ml-16 p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]">
            <FaCartShopping />
          </Link>
          <div className='bg-white rounded-full p-3 self-center absolute top-[-100px]'>
            <div className='bg-green-600 rounded-full p-3'>
              <div className='bg-green-800 rounded-full p-8'>
                <img className='w-24 invert' src="/images/invoice.png" alt="Invoice" />
              </div>
            </div>
          </div>
          <h1 className='mt-16 relative z-10 text-green-400 font-bold text-4xl'>Payment Successful!</h1>
          <h1 className='mt-6 relative z-10 text-green-400 font-bold text-3xl'>Order #{order.id}</h1>
          <div className='my-6 mx-5 md:mx-24 mb-6 relative z-10'>
            <section className='my-6 flex flex-col gap-3'>
              <p className='ml-5 text-gray-700'>
                Thank you for your purchase. Please check the order status in the <Link className='text-[var(--blue-1)] hover:underline' href={route('profile.orders')}>Orders</Link> section in your profile.
              </p>
              <h2 className="text-2xl font-bold my-2">Printer Status</h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4">Nozzle Temperature</th>
                    <th className="py-2 px-4">Bed Temperature</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Print Progress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">{nozzleTemp}</td>
                    <td className="py-2 px-4">{bedTemp}</td>
                    <td className="py-2 px-4">{printerStatus}</td>
                    <td className="py-2 px-4">{printProgress}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </main>



        <Footer />
      </div>
    </>
  );
}

export default PaymentComplete;
