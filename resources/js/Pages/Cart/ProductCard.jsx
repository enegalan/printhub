import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function ProductCard({image, name, price, allcolors, allmaterials, stockItem, color_name, color_id, material_name, material_id, handleDelete, quantity, onUpdateProduct}){
    const [selectedColor, setSelectedColor] = useState(color_name);
    const [selectedMaterial, setSelectedMaterial] = useState(material_name);
    const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  const handleIncrement = () => {
    setSelectedQuantity(selectedQuantity + 1);
    onUpdateProduct({ quantity: selectedQuantity + 1 });
  };

  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
      onUpdateProduct({ quantity: selectedQuantity - 1 });
    }
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
    onUpdateProduct({ color_name: newColor });
  };

  const handleMaterialChange = (newMaterial) => {
    setSelectedMaterial(newMaterial);
    onUpdateProduct({ material_name: newMaterial });
  };
    
    return (
        <div className="border relative z-10 max-w-sm rounded-lg shadow-lg bg-gray-100 flex flex-col">
            <button
        className="absolute top-[-10px] right-[-10px] px-4 py-2 z-100 text-white cursor-pointer bg-red-500 rounded-lg p-1 transition ease-in delay-400 hover:scale-105"
        onClick={() => handleDelete(stockItem.stock_cart_id)}
      >
        X
      </button>
            
            <img className="w-full" src={`/storage/products/${image}`} alt={name} />
            
            <div className="px-6 pt-4">
                <div className="flex justify-between font-bold text-xl mb-2 gap-2">
                    <span>{name}</span>
                    <div className="text-red-500 font-bold text-xl mb-2">{price}€</div>
                </div>
                <hr />
            </div>
            <div className="px-6 mt-3 pb-4 pt-2 flex justify-between">
                <div className="text-black text-xl mb-2">Color: 
                </div>
                <select className="ms-2 text-black" onChange={(e) => handleColorChange(e.target[e.target.selectedIndex].text)}>
                        {allcolors.map((colorr) => 
                            <option key={colorr.id} name={colorr.name} value={colorr.id} selected={colorr.name === selectedColor}>{colorr.name}</option>
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
ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    allcolors: PropTypes.array.isRequired,
    allmaterials: PropTypes.array.isRequired,
    href: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  };