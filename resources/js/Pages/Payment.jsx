import React, { useState } from "react";
import PaymentStepper from "@/Components/PaymentStepper";
import NavBar from "@/Components/NavBar";
import { Footer } from "@/Components/Footer";
import PayPalPayment from "@/Components/PayPal";

function Payment({ auth, countries, regions }) {
  const [activeStep, setActiveStep] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedFactCountry, setSelectedFactCountry] = useState("");

  const [filteredRegions, setFilteredRegions] = useState([]);
  const [filteredFactRegions, setFilteredFactRegions] = useState([]);

  const handleCountryChange = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
    const filteredRegions = regions.filter(
      (region) => region.country_id === parseInt(selectedCountry)
    );
    setFilteredRegions(filteredRegions);
  };

  const handleFactCountryChange = (selectedCountry) => {
    setSelectedFactCountry(selectedCountry);
    const filteredRegions = regions.filter(
      (region) => region.country_id === parseInt(selectedCountry)
    );
    setFilteredFactRegions(filteredRegions);
  };

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    surname: "",
    email: "",
    user: auth.user.id,
  });

  const [shippingAddress, setShippingAddress] = useState({
    shipName: "",
    shipAddress: "",
    shipCountry: "",
    shipRegion: "",
    shipZip: "",
  });

  const [facturationAddress, setFacturationAddress] = useState({
    factName: "",
    factAddress: "",
    factCountry: "",
    factRegion: "",
    factZip: "",
  });

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleShippingAddressChange = (field, value) => {
    setShippingAddress({ ...shippingAddress, [field]: value });
  };

  const handleFacturationAddressChange = (field, value) => {
    setFacturationAddress({ ...facturationAddress, [field]: value });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  return (
    <>
      <NavBar
        defaultBackgroundColor="var(--main-blue)"
        defaultTextColor="var(--white)"
        dynamicBackground={false}
        user={auth.user}
      />

      <PaymentStepper activeStep={activeStep} />
      <div className="mx-auto mb-36 px-10 py-5 bg-white w-[800px] rounded-xl">
        {activeStep === 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <form className="flex flex-col">
              <label htmlFor="name">Name: </label>
              <input
                className="mb-3"
                type="text"
                id="name"
                name="name"
                value={personalInfo.name}
                onChange={(e) =>
                  handlePersonalInfoChange("name", e.target.value)
                }
              />

              <label htmlFor="surname">Surname: </label>
              <input
                className="mb-3"
                type="text"
                id="surname"
                name="surname"
                value={personalInfo.surname}
                onChange={(e) =>
                  handlePersonalInfoChange("surname", e.target.value)
                }
              />

              <label htmlFor="email">Email: </label>
              <input
                type="text"
                id="email"
                name="email"
                value={personalInfo.email}
                onChange={(e) =>
                  handlePersonalInfoChange("email", e.target.value)
                }
              />

              <input
                type="hidden"
                id="user"
                name="user"
                value={personalInfo.user}
                onChange={(e) =>
                  handlePersonalInfoChange("user", e.target.value)
                }
              ></input>
            </form>
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
            <form className="flex flex-col">
              <label htmlFor="shipName">Name: </label>
              <input
                className="mb-3"
                type="text"
                id="shipName"
                name="shipName"
                value={shippingAddress.shipName}
                onChange={(e) =>
                  handleShippingAddressChange("shipName", e.target.value)
                }
              />

              <label htmlFor="shipAddress">Address: </label>
              <input
                className="mb-3"
                type="text"
                id="shipAddress"
                name="shipAddress"
                value={shippingAddress.shipAddress}
                onChange={(e) =>
                  handleShippingAddressChange("shipAddress", e.target.value)
                }
              />

              <label htmlFor="shipCountry">Country: </label>
              <select
                className="mb-3"
                name="shipCountry"
                id="shipCountry"
                value={shippingAddress.shipCountry}
                onChange={(e) => {
                  handleShippingAddressChange("shipCountry", e.target.value);
                  handleCountryChange(e.target.value);
                }}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>

              <label htmlFor="shipRegion">Region: </label>
              <select
                className="mb-3"
                name="shipRegion"
                id="shipRegion"
                value={shippingAddress.shipRegion}
                onChange={(e) =>
                  handleShippingAddressChange("shipRegion", e.target.value)
                }
              >
                <option value="">Select a region</option>
                {filteredRegions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>

              <label htmlFor="shipZip">Zip: </label>
              <input
                type="text"
                id="shipZip"
                name="shipZip"
                value={shippingAddress.shipZip}
                onChange={(e) =>
                  handleShippingAddressChange("shipZip", e.target.value)
                }
              />
            </form>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Facturation Address</h2>
            <form className="flex flex-col">
              <label htmlFor="factName">Name: </label>
              <input
                className="mb-3"
                type="text"
                id="factName"
                name="factName"
                value={facturationAddress.factName}
                onChange={(e) =>
                  handleFacturationAddressChange("factName", e.target.value)
                }
              />

              <label htmlFor="factAddress">Address: </label>
              <input
                className="mb-3"
                type="text"
                id="factAddress"
                name="factAddress"
                value={facturationAddress.factAddress}
                onChange={(e) => {
                  handleFacturationAddressChange("factAddress", e.target.value);
                }}
              />

              <label htmlFor="factCountry">Country: </label>
              <select
                className="mb-3"
                name="factCountry"
                id="factCountry"
                value={facturationAddress.factCountry}
                onChange={(e) => {
                  handleFactCountryChange(e.target.value);
                  handleFacturationAddressChange("factCountry", e.target.value);
                }}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>

              <label htmlFor="factRegion">Region: </label>
              <select
                className="mb-3"
                name="factRegion"
                id="factRegion"
                value={facturationAddress.factRegion}
                onChange={(e) =>
                  handleFacturationAddressChange("factRegion", e.target.value)
                }
              >
                <option value="">Select a region</option>
                {filteredFactRegions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>

              <label htmlFor="factZip">Zip: </label>
              <input
                type="text"
                id="factZip"
                name="factZip"
                value={facturationAddress.factZip}
                onChange={(e) =>
                  handleFacturationAddressChange("factZip", e.target.value)
                }
              />
            </form>
          </div>
        )}

        {activeStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <PayPalPayment
              onSuccess={() => {
                const allFormData = {
                  personalInfo,
                  shippingAddress,
                  facturationAddress,
                };

                fetch("/api/complete-payment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(allFormData),
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
            />
          </div>
        )}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className={`bg-gray-500 text-white px-4 py-2 rounded ${
              activeStep === 0 && "cursor-not-allowed opacity-50"
            }`}
            disabled={activeStep === 0}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              activeStep === 3 && "hidden"
            }`}
            disabled={activeStep === 4}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
