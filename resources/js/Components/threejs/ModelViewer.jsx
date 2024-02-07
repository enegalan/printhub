import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { StlViewer } from 'react-stl-viewer';
import SelectOptions from '../SelectOptions';
import InputLabel from '../InputLabel';
import { SubmitButton } from '../Buttons';
import TextInput from '../TextInput';
import { router } from '@inertiajs/react';

export default function ModelViewer({ fileUrl = null, colors, materials, dimensions }) {
    const width = dimensions['width'].toFixed(2);
    const height = dimensions['height'].toFixed(2);
    const length = dimensions['length'].toFixed(2);

    const { data, setData, post } = useForm();
    const [modelWidth, setModelWith] = useState(width);
    const [modelHeight, setModelHeight] = useState(height);
    const [modelLengh, setModelLength] = useState(length);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(getEstimatedPrice(width, height, length, quantity, colors[0], materials[0]));
    const [colorHex, setColorHex] = useState(colors[0].hex);
    const [color, setColor] = useState(colors[0]);
    const [material, setMaterial] = useState(materials[0]);
    const colorNames = colors.map((color) => color.name);
    const materialNames = materials.map((material) => material.name);

    let formData = {
        file_url: fileUrl,
        color: colorNames[0],
        material: materialNames[0],
    };

    function getEstimatedPrice(width, height, length, quantity, color, material) {
        const basePrice = 1;
        const dimensionFactor = 0.00025;
        const quantityFactor = 1.001;
        // Calculate price based on dimensions and quantity
        var price = basePrice + (width * height * length * dimensionFactor * quantity * quantityFactor * color.factor * material.factor);
        return price.toFixed(2);
    }

    useEffect(() => {
        setPrice(getEstimatedPrice(width, height, length, quantity, color, material));
    }, [colorHex, data.material, quantity]);

    const onSubmit = (e) => {
        e.preventDefault();
        formData = {
            ...formData,
            color: data.color || colorNames[0],
            material: data.material || materialNames[0],
            price: price,
            quantity: quantity,
            width: width,
            height: height,
            length: length,
        };
        router.post('/model/add', formData);
    };

    useEffect(() => {
        setData('color', formData.color);
        setData('material', formData.material);
    }, []);

    return (
        <div className='flex flex-col lg:flex-row bg-white rounded p-16 mb-12 shadow-lg gap-5 overflow-hidden w-full lg:w-[70%]'>
            <div className='bg-gray-100 w-full lg:w-[80%] rounded-lg border'>
                <StlViewer modelProps={{ color: colorHex }} style={{ top: 0, left: 0, width: '100%', height: '70vh', }} orbitControls shadows url={fileUrl} />
                <InputLabel className='text-gray-500 p-2'>Model dimensions: {modelWidth}x{modelHeight}x{modelLengh} cm</InputLabel>
            </div>
            <form onSubmit={onSubmit} className='flex flex-col items-center content-start flex-wrap justify-center gap-5 mb-5 flex-1'>
                <input type="hidden" name="file_url" value={fileUrl} />

                <h3 className='font-bold text-2xl'>3D Printing - Budget</h3>
                <InputLabel className='text-gray-900 text-xl self-start'>{price}$</InputLabel>

                <div className='flex flex-col gap-2 w-full'>
                    <InputLabel className='text-gray-900'>Color:</InputLabel>
                    <SelectOptions
                        name='color'
                        onChangeOption={(color) => {
                            setData('color', color);
                            const selectedColor = colors.find(c => c.name === color);
                            setColor(selectedColor);
                            setColorHex(selectedColor ? selectedColor.hex : 'white'); 
                        }}
                        defaultOption={false}
                        options={colorNames}
                        usingObject={false}
                    />
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <InputLabel className='text-gray-900'>Material:</InputLabel>
                    <SelectOptions
                        name='material'
                        onChangeOption={(material) => {
                            const selectedMaterial = materials.find(m => m.name === material);
                            setMaterial(selectedMaterial);
                            setData('material', material);
                        }}
                        defaultOption={false}
                        options={materialNames}
                        usingObject={false}
                    />
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <InputLabel className='text-gray-900'>Quantity:</InputLabel>
                    <TextInput
                        id="price"
                        type="number"
                        step="1"
                        min="1"
                        name="price"
                        value={quantity}
                        className="mt-1 w-full"
                        autoComplete="price"
                        isFocused={true}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <SubmitButton value='Add to cart' backgroundColor='var(--main-blue)' hoverBackgroundColor='var(--blue-1)' />
            </form>
        </div>
    );
}