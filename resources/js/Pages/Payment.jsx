import React, { useState } from "react";
import PaymentStepper from "@/Components/PaymentStepper";
import NavBar from "@/Components/NavBar";
import { Footer } from "@/Components/Footer";
import PayPalPayment from "@/Components/PayPal";
import TextInput from "@/Components/TextInput";
import { Link } from '@inertiajs/react';
import Divider from "@/Components/Divider";
import Checkbox from "@/Components/Checkbox";

function Payment({ auth, countries, regions, total }) {
  const [activeStep, setActiveStep] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedFactCountry, setSelectedFactCountry] = useState("");

  const [filteredRegions, setFilteredRegions] = useState([]);
  const [filteredFactRegions, setFilteredFactRegions] = useState([]);

  const [useShippingInfo, setUseShippingInfo] = useState(false);

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
    errors: {
      name: "",
      surname: "",
      email: "",
    },
  });

  const [shippingAddress, setShippingAddress] = useState({
    shipName: "",
    shipAddress: "",
    shipCountry: "",
    shipRegion: "",
    shipZip: "",
    errors: {
      shipName: "",
      shipAddress: "",
      shipCountry: "",
      shipRegion: "",
      shipZip: "",
    },
  });

  const [facturationAddress, setFacturationAddress] = useState({
    factName: "",
    factAddress: "",
    factCountry: "",
    factRegion: "",
    factZip: "",
    errors: {
      factName: "",
      factAddress: "",
      factCountry: "",
      factRegion: "",
      factZip: "",
    },
  });

  const handlePersonalInfoChange = (field, value) => {
    let emailFormatError = "";

    if (field === "email" && value.trim() !== "") {
      // Validar el formato del correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        emailFormatError = "Invalid email format";
      }
    }

    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
      errors: {
        ...prevInfo.errors,
        [field]: value.trim() === "" ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : emailFormatError,
      },
    }));
  };

  const handleShippingAddressChange = (field, value) => {
    setShippingAddress({
      ...shippingAddress,
      [field]: value,
      errors: {
        ...shippingAddress.errors,
        [field]: value.trim() === "" ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : "",
      },
    });
  };

  const handleFacturationAddressChange = (field, value) => {
    setFacturationAddress({
      ...facturationAddress,
      [field]: value,
      errors: {
        ...facturationAddress.errors,
        [field]: value.trim() === "" ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : "",
      },
    });
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 1:
        return !Object.values(shippingAddress.errors).some((error) => error) && shippingAddress.shipName.trim() !== '' && shippingAddress.shipAddress.trim() !== '' && shippingAddress.shipCountry.trim() !== '' && shippingAddress.shipRegion.trim() !== '' && shippingAddress.shipZip.trim() !== '';
      case 2:
        if (!useShippingInfo) {
          return !Object.values(facturationAddress.errors).some((error) => error) && facturationAddress.factName.trim() !== '' && facturationAddress.factAddress.trim() !== '' && facturationAddress.factCountry.trim() !== '' && facturationAddress.factRegion.trim() !== '' && facturationAddress.factZip.trim() !== '';
        }
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
    } else {
      // Mostrar mensajes de error al hacer clic en "Next" si hay errores
      switch (activeStep) {
        case 1:
          setShippingAddress((prevAddress) => ({
            ...prevAddress,
            errors: {
              shipName: shippingAddress.shipName.trim() === "" ? "Name is required" : "",
              shipAddress: shippingAddress.shipAddress.trim() === "" ? "Address is required" : "",
              shipCountry: shippingAddress.shipCountry.trim() === "" ? "Country is required" : "",
              shipRegion: shippingAddress.shipRegion.trim() === "" ? "Region is required" : "",
              shipZip: shippingAddress.shipZip.trim() === "" ? "Zip is required" : "",
            },
          }));
          break;
        case 2:
          if (!useShippingInfo) {
            setFacturationAddress((prevAddress) => ({
              ...prevAddress,
              errors: {
                factName: facturationAddress.factName.trim() === "" ? "Name is required" : "",
                factAddress: facturationAddress.factAddress.trim() === "" ? "Address is required" : "",
                factCountry: facturationAddress.factCountry.trim() === "" ? "Country is required" : "",
                factRegion: facturationAddress.factRegion.trim() === "" ? "Region is required" : "",
                factZip: facturationAddress.factZip.trim() === "" ? "Zip is required" : "",
              },
            }));
          }
          break;
        default:
          break;
      }
    }
  };

  function setFacturationAsShipping () {
    handleFacturationAddressChange('factAddress', shippingAddress.shipAddress);
    handleFacturationAddressChange('factCountry', shippingAddress.shipCountry);
    handleFactCountryChange(shippingAddress.shipCountry);
    handleFacturationAddressChange('factRegion', shippingAddress.shipRegion);
    handleFacturationAddressChange('factName', shippingAddress.shipName);
    handleFacturationAddressChange('factZip', shippingAddress.shipZip);
  }

  return (
    <>
      <NavBar
        defaultBackgroundColor="var(--main-blue)"
        defaultTextColor="var(--white)"
        dynamicBackground={false}
        user={auth.user}
      />

      <main className="md:mx-32 mx-4">
        <PaymentStepper activeStep={activeStep} />
        <div className="mx-auto mb-36 px-10 py-5 bg-white rounded-xl">
          {activeStep === 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
              <form className="flex flex-col">
                <label htmlFor="name">Name: </label>
                <TextInput
                  className={`bg-gray-100 text-gray-500 ${personalInfo.errors.name && "border-red-500"}`}
                  type="text"
                  id="name"
                  name="name"
                  value={auth.user?.name}
                  onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                  disabled
                />
                <label htmlFor="surname">Surname: </label>
                <TextInput
                  className={`bg-gray-100 text-gray-500 ${personalInfo.errors.surname && "border-red-500"}`}
                  type="text"
                  id="surname"
                  name="surname"
                  value={auth.user?.lastname}
                  onChange={(e) => handlePersonalInfoChange("surname", e.target.value)}
                  disabled
                />
                <label htmlFor="email">Email: </label>
                <TextInput
                  className={`bg-gray-100 text-gray-500 ${personalInfo.errors.email && "border-red-500"}`}
                  type="text"
                  id="email"
                  name="email"
                  value={auth.user?.email}
                  onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                  disabled
                />
              </form>
              <p className="my-3 text-md">Not correct information? Update it on your <Link className="text-[var(--blue)] transition hover:text-[var(--main-blue)]" href={route("profile.edit")}>profile</Link>.</p>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
              <form className="flex flex-col">
                <label htmlFor="shipName">Full name: </label>
                <TextInput
                  className={`${shippingAddress.errors.shipName && "border-red-500"}`}
                  type="text"
                  id="shipName"
                  name="shipName"
                  value={shippingAddress.shipName}
                  onChange={(e) => handleShippingAddressChange("shipName", e.target.value)}
                />

                <label htmlFor="shipAddress">Address: </label>
                <TextInput
                  className={`${shippingAddress.errors.shipAddress && "border-red-500"}`}
                  type="text"
                  id="shipAddress"
                  name="shipAddress"
                  value={shippingAddress.shipAddress}
                  onChange={(e) => handleShippingAddressChange("shipAddress", e.target.value)}
                />
                <span className="mb-3 text-red-500">{shippingAddress.errors.shipAddress && "Address is required"}</span>

                <label htmlFor="shipCountry">Country: </label>
                <select
                  className={`rounded border-gray-300 ${shippingAddress.errors.shipCountry && "border-red-500"}`}
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
                <span className="mb-3 text-red-500">{shippingAddress.errors.shipCountry && "Country is required"}</span>

                <label htmlFor="shipRegion">Region: </label>
                <select
                  className={`rounded border-gray-300 ${shippingAddress.errors.shipRegion && "border-red-500"}`}
                  name="shipRegion"
                  id="shipRegion"
                  value={shippingAddress.shipRegion}
                  onChange={(e) => handleShippingAddressChange("shipRegion", e.target.value)}
                >
                  <option value="">Select a region</option>
                  {filteredRegions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                <span className="mb-3 text-red-500">{shippingAddress.errors.shipRegion && "Region is required"}</span>

                <label htmlFor="shipZip">Zip: </label>
                <TextInput
                  className={`${shippingAddress.errors.shipZip && "border-red-500"}`}
                  type="text"
                  id="shipZip"
                  name="shipZip"
                  value={shippingAddress.shipZip}
                  onChange={(e) => handleShippingAddressChange("shipZip", e.target.value)}
                />
                <span className="mb-3 text-red-500">{shippingAddress.errors.shipZip && "Zip is required"}</span>
              </form>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Facturation Address</h2>
              <form className="flex flex-col">
                <label htmlFor="factName">Full name: </label>
                <TextInput
                  className={`${useShippingInfo && "text-gray-400 bg-gray-100"} ${facturationAddress?.errors?.factName && "border-red-500"}`}
                  type="text"
                  id="factName"
                  name="factName"
                  value={useShippingInfo ? shippingAddress.shipName : facturationAddress.factName}
                  onChange={(e) => handleFacturationAddressChange("factName", e.target.value)}
                  disabled={useShippingInfo}
                />
                <span className="mb-3 text-red-500">{facturationAddress?.errors?.factName && "Name is required"}</span>

                <label htmlFor="factAddress">Address: </label>
                <TextInput
                  className={`${useShippingInfo && "text-gray-400 bg-gray-100"} ${facturationAddress?.errors?.factAddress && "border-red-500"}`}
                  type="text"
                  id="factAddress"
                  name="factAddress"
                  value={useShippingInfo ? shippingAddress.shipAddress :  facturationAddress.factAddress}
                  onChange={(e) => handleFacturationAddressChange("factAddress", e.target.value)}
                  disabled={useShippingInfo}
                />
                <span className="mb-3 text-red-500">{facturationAddress.errors.factAddress && "Address is required"}</span>

                <label htmlFor="factCountry">Country: </label>
                <select
                  className={`${useShippingInfo && "text-gray-400 bg-gray-100"} rounded border-gray-300 ${facturationAddress.errors.factCountry && "border-red-500"}`}
                  name="factCountry"
                  id="factCountry"
                  value={useShippingInfo ? shippingAddress.shipCountry : facturationAddress.factCountry}
                  onChange={(e) => {
                    handleFactCountryChange(e.target.value);
                    handleFacturationAddressChange("factCountry", e.target.value);
                  }}
                  disabled={useShippingInfo}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <span className="mb-3 text-red-500">{facturationAddress.errors.factCountry && "Country is required"}</span>

                <label htmlFor="factRegion">Region: </label>
                <select
                  className={`${useShippingInfo && "text-gray-400 bg-gray-100"} rounded border-gray-300 ${facturationAddress.errors.factRegion && "border-red-500"}`}
                  name="factRegion"
                  id="factRegion"
                  value={useShippingInfo && shippingAddress.shipRegion ? shippingAddress.shipRegion : facturationAddress.factRegion}
                  onChange={(e) => handleFacturationAddressChange("factRegion", e.target.value)}
                  disabled={useShippingInfo}
                >
                  <option value="">Select a region</option>
                  {filteredFactRegions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                <span className="mb-3 text-red-500">{facturationAddress.errors.factRegion && "Region is required"}</span>

                <label htmlFor="factZip">Zip: </label>
                <TextInput
                  className={`${useShippingInfo && "text-gray-400 bg-gray-100"} ${facturationAddress.errors.factZip && "border-red-500"}`}
                  type="text"
                  id="factZip"
                  name="factZip"
                  value={useShippingInfo ? shippingAddress.shipZip : facturationAddress.factZip}
                  onChange={(e) => handleFacturationAddressChange("factZip", e.target.value)}
                  disabled={useShippingInfo}
                />
                <span className="mb-3 text-red-500">{facturationAddress.errors.factZip && "Zip is required"}</span>
              </form>
              <Divider value="Or" />
              <Checkbox
                  name="default"
                  checked={useShippingInfo}
                  onChange={(e) => {setUseShippingInfo(e.target.checked); setFacturationAsShipping();}}
              />
              <span className="ms-2 text-sm text-gray-600">Use shipping address information</span>
            </div>
          )}

          {activeStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Payment</h2>
              <PayPalPayment
                className="relative z-0"
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
                      }
                    })
                    .catch((error) => {
                      console.error("Error sending form:", error);
                    });
                }}
                total={total}
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
              disabled={activeStep === 3}
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Payment;
