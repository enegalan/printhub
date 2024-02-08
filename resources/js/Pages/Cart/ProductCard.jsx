import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { StlViewer } from 'react-stl-viewer';

export default function ProductCard({ image, file, name, price, allcolors, allmaterials, stockItem, color_name, color_id, material_name, material_id, handleDelete, quantity, onUpdateProduct, width, heigth, length }) {
  const [selectedColor, setSelectedColor] = useState(color_name);
  const [selectedColorHex, setSelectedColorHex] = useState(allcolors.find(c => c.name === selectedColor).hex);
  const [selectedMaterial, setSelectedMaterial] = useState(material_name);
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  const handleIncrement = () => {
    setSelectedQuantity(selectedQuantity + 1);
    onUpdateProduct({ quantity: selectedQuantity + 1 });
  };
  function getEstimatedPrice(width, height, length, quantity, color, material) {
    const basePrice = 1;
    const dimensionFactor = 0.00025;
    const quantityFactor = 1.001;
    // Calculate price based on dimensions and quantity
    var price = basePrice + (width * height * length * dimensionFactor * quantity * quantityFactor * color.factor * material.factor);
    return price.toFixed(2);
  }
  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
      onUpdateProduct({ quantity: selectedQuantity - 1 });
    }
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);

    // Use find method with a callback to get the color
    const selectedColorObj = allcolors.find((color) => color.name === newColor);

    // Check if the color is found before accessing its properties
    const colorHex = selectedColorObj ? selectedColorObj.hex : "#000000";

    setSelectedColorHex(colorHex);
    onUpdateProduct({ color_hex: colorHex });
  };

  const handleMaterialChange = (newMaterial) => {
    setSelectedMaterial(newMaterial);
    onUpdateProduct({ material_name: newMaterial });
  };

  return (
    <div className="border relative max-w-[17rem] 2xl:max-w-sm rounded-lg shadow-lg bg-gray-100 flex flex-col">
      <button
        className="absolute top-[-10px] right-[-10px] px-4 py-2 z-[100] text-white cursor-pointer bg-red-500 rounded-lg p-1 transition ease-in delay-400 hover:scale-105"
        onClick={() => handleDelete(stockItem.stock_cart_id)}
      >
        X
      </button>
      <div className="overflow-hidden flex justify-center">
        <StlViewer modelProps={{ color: selectedColorHex }} style={{ top: 0, left: 0, width: '60%', height: '30vh', }} shadows url={file} />
      </div>
      <div className="px-6 pt-4">
        <div className="flex justify-between font-bold text-xl mb-2 gap-2">
          <span>{name}</span>
          <div className="text-red-500 font-bold text-xl mb-2">{price}$</div>
        </div>
        <hr />
      </div>
      <div className="px-6 mt-3 pb-4 pt-2 flex justify-between">
        <div className="text-black text-xl mb-2">Color:
        </div>
        <select className="ms-2 text-black" onChange={(e) => handleColorChange(e.target[e.target.selectedIndex].text)}>
          {allcolors.map((colorr) =>
            <option key={colorr.id} name={colorr.hex} value={colorr.id} selected={colorr.name === selectedColor}>{colorr.name}</option>
          )}
        </select>
      </div>
      <div className="px-6 pb-4 pt-2 flex justify-between">
        <div className="text-black text-xl mb-2">Material:
        </div>
        <select className="ms-2" onChange={(e) => handleMaterialChange(e.target[e.target.selectedIndex].text)}>
          {allmaterials.map((materiall) =>
            <option key={materiall.id} name={material_name} value={materiall.id} selected={materiall.name === selectedMaterial}>{materiall.name}</option>
          )}
        </select>
      </div>
      <div className="px-6 pb-4 pt-2">
        <div className="flex items-center justify-center">
          <button className="bg-blue-950 p-3 px-5 text-white rounded" onClick={handleDecrement}>
            -
          </button>
          <input type="text" className="text-black text-xl mx-2 w-1/5 text-center" value={selectedQuantity} readOnly />
          <button className="bg-blue-950 p-3 px-5 text-white rounded" onClick={handleIncrement}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}