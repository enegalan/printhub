import React, { useState } from "react";
import PaymentStepper from "@/Components/PaymentStepper";
import NavBar from "@/Components/NavBar";
import { Footer } from "@/Components/Footer";
import PayPalPayment from "@/Components/PayPal";
import TextInput from "@/Components/TextInput";

function Payment({ auth, countries, regions, total }) {
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
      case 0:
        return !Object.values(personalInfo.errors).some((error) => error) && personalInfo.name.trim() !== '';
      case 1:
        return !Object.values(shippingAddress.errors).some((error) => error) && shippingAddress.shipName.trim() !== '' && shippingAddress.shipAddress.trim() !== '' && shippingAddress.shipCountry.trim() !== '' && shippingAddress.shipRegion.trim() !== '' && shippingAddress.shipZip.trim() !== '';
      case 2:
        return !Object.values(facturationAddress.errors).some((error) => error) && facturationAddress.factName.trim() !== '' && facturationAddress.factAddress.trim() !== '' && facturationAddress.factCountry.trim() !== '' && facturationAddress.factRegion.trim() !== '' && facturationAddress.factZip.trim() !== '';
      default:
        return true;
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
    } else {
      // Mostrar mensajes de error al hacer clic en "Next" si hay errores
      switch (activeStep) {
        case 0:
        setPersonalInfo((prevInfo) => {
          const emailFormatError =
            prevInfo.email.trim() !== "" && !isValidEmail(prevInfo.email)
              ? "Invalid email format"
              : "";

          return {
            ...prevInfo,
            errors: {
              name: prevInfo.name.trim() === "" ? "Name is required" : "",
              surname: prevInfo.surname.trim() === "" ? "Surname is required" : "",
              email: prevInfo.email.trim() === "" ? "Email is required" : emailFormatError,
            },
          };
        });
        break;
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
          break;
        default:
          break;
      }
    }
  };

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
                  className={`${personalInfo.errors.name && "border-red-500"}`}
                  type="text"
                  id="name"
                  name="name"
                  value={personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                />
                <span className="mb-3 text-red-500">{personalInfo.errors.name && "Name is required"}</span>

                <label htmlFor="surname">Surname: </label>
                <TextInput
                  className={`${personalInfo.errors.surname && "border-red-500"}`}
                  type="text"
                  id="surname"
                  name="surname"
                  value={personalInfo.surname}
                  onChange={(e) => handlePersonalInfoChange("surname", e.target.value)}
                />
                <span className="mb-3 text-red-500">{personalInfo.errors.surname && "Surname is required"}</span>

                <label htmlFor="email">Email: </label>
                <TextInput
                  className={`${personalInfo.errors.email && "border-red-500"}`}
                  type="text"
                  id="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                />
                <span className="mb-3 text-red-500">
  {personalInfo.errors.email === "Email is required" && "Email is required"}
  {personalInfo.errors.email === "Invalid email format" && "Invalid email format"}
</span>

                <TextInput
                  type="hidden"
                  id="user"
                  name="user"
                  value={personalInfo.user}
                  onChange={(e) => handlePersonalInfoChange("user", e.target.value)}
                ></TextInput>
              </form>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
              <form className="flex flex-col">
                <label htmlFor="shipName">Name: </label>
                <TextInput
                  className={`${shippingAddress.errors.shipName && "border-red-500"}`}
                  type="text"
                  id="shipName"
                  name="shipName"
                  value={shippingAddress.shipName}
                  onChange={(e) => handleShippingAddressChange("shipName", e.target.value)}
                />
                <span className="mb-3 text-red-500">{shippingAddress.errors.shipName && "Name is required"}</span>

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
                <label htmlFor="factName">Name: </label>
                <TextInput
                  className={`${facturationAddress.errors.factName && "border-red-500"}`}
                  type="text"
                  id="factName"
                  name="factName"
                  value={facturationAddress.factName}
                  onChange={(e) => handleFacturationAddressChange("factName", e.target.value)}
                />
                <span className="mb-3 text-red-500">{facturationAddress.errors.factName && "Name is required"}</span>

                <label htmlFor="factAddress">Address: </label>
                <TextInput
                  className={`${facturationAddress.errors.factAddress && "border-red-500"}`}
                  type="text"
                  id="factAddress"
                  name="factAddress"
                  value={facturationAddress.factAddress}
                  onChange={(e) => handleFacturationAddressChange("factAddress", e.target.value)}
                />
                <span className="mb-3 text-red-500">{facturationAddress.errors.factAddress && "Address is required"}</span>

                <label htmlFor="factCountry">Country: </label>
                <select
                  className={`rounded border-gray-300 ${facturationAddress.errors.factCountry && "border-red-500"}`}
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
                <span className="mb-3 text-red-500">{facturationAddress.errors.factCountry && "Country is required"}</span>

                <label htmlFor="factRegion">Region: </label>
                <select
                  className={`rounded border-gray-300 ${facturationAddress.errors.factRegion && "border-red-500"}`}
                  name="factRegion"
                  id="factRegion"
                  value={facturationAddress.factRegion}
                  onChange={(e) => handleFacturationAddressChange("factRegion", e.target.value)}
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
                  className={`${facturationAddress.errors.factZip && "border-red-500"}`}
                  type="text"
                  id="factZip"
                  name="factZip"
                  value={facturationAddress.factZip}
                  onChange={(e) => handleFacturationAddressChange("factZip", e.target.value)}
                />
                <span className="mb-3 text-red-500">{facturationAddress.errors.factZip && "Zip is required"}</span>
              </form>
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
                      } else {
                        console.log("Formularios enviados exitosamente:", data);
                      }
                    })
                    .catch((error) => {
                      console.error("Error al enviar formularios:", error);
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
