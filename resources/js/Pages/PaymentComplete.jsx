import NavBar from "@/Components/NavBar";
import { Footer } from "@/Components/Footer";
import { useState, useEffect } from "react";

function PaymentComplete({ auth, env }) {
  const [nozzleTemp, setNozzleTemp] = useState("--");
  const [bedTemp, setBedTemp] = useState("--");
  const [printerStatus, setPrinterStatus] = useState("--");
  const [printProgress, setPrintProgress] = useState("--");
  const apiUrl = env.host;
  const apiKey = env.apiKey;
  useEffect(() => {
    updatePrinterStatus();

    const intervalId = setInterval(updatePrinterStatus, 1000);

    uploadFile();

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

  const uploadFile = () => {
    const filePath = "/gcode/dragon.gcode";

    // Fetch the file from the public folder
    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        // Create FormData and append the file
        const formData = new FormData();
        formData.append("file", blob, "dragon.gcode");
        formData.append("command", "start");
        formData.append("print", true);

        // Send the file and 'start' command to OctoPrint
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
              //alert("File sent and printing started successfully");
            } else {
              //alert("Error sending file or starting printing");
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
      <div className="overflow-hidden bg-[var(--light-grey)]">
        <NavBar
          user={auth.user}
          sectionsBg={{ about: "--dark" }}
          sectionsText={{ about: "white" }}
        />

        <header
          id="about"
          className="relative overflow-hidden py-48 text-center bg-green-200"
        >
          <h1 className="relative z-10 text-green-400 font-bold text-4xl">
            Payment Successful!
          </h1>
        </header>

        <main className="my-12 mx-5 md:mx-24 mb-36 relative z-10">
          {/* What is PrintHub */}
          <section className="my-6 flex flex-col gap-3">
          <p className="ml-5 text-gray-700">Thank you for your purchase.</p>
      <h2 className="text-2xl font-bold mb-2">Printer Status</h2>
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
        </main>

        <Footer />
      </div>
    </>
  );
}

export default PaymentComplete;
