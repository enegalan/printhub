import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import { StlViewer } from 'react-stl-viewer';
import SelectOptions from '../SelectOptions';
import InputLabel from '../InputLabel';
import { SubmitButton } from '../Buttons';
import { router } from '@inertiajs/react';

export default function ModelViewer({ fileUrl = null, colors, materials }) {
    const { data, setData, post } = useForm();

    const colorNames = colors.map((color) => color.name);
    const materialNames = materials.map((material) => material.name);

    let formData = {
        file_url: fileUrl || "test",
        color: colorNames[0],
        material: materialNames[0],
    };

    const onSubmit = (e) => {
        e.preventDefault();
        formData = {
            ...formData,
            color: data.color || colorNames[0],
            material: data.material || materialNames[0],
        };

        router.post('/model/add', formData);
    };

    useEffect(() => {
        setData('color', formData.color);
        setData('material', formData.material);
    }, []);

    return (
        <div className='flex bg-white rounded p-16 mb-12 shadow-lg gap-5 overflow-hidden w-full lg:w-[70%]'>
            <div className='bg-gray-100 w-[80%] rounded-lg border'>
                <StlViewer modelProps={{ color: data.color || colorNames[0] }} style={{top: 0,left: 0,width: '100%',height: '100vh',}} orbitControls shadows url={fileUrl} />
            </div>
            <form onSubmit={onSubmit} className='flex flex-col items-center content-start flex-wrap justify-center gap-5 mb-5 flex-1'>
                <input type="hidden" name="file_url" value={fileUrl} />

                <div className='flex flex-col gap-2 w-full'>
                    <InputLabel className='text-gray-900'>Color:</InputLabel>
                    <SelectOptions
                        name='color'
                        onChangeOption={(color) => setData('color', color)}
                        defaultOption={false}
                        options={colorNames}
                        usingObject={false}
                    />
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <InputLabel className='text-gray-900'>Material:</InputLabel>
                    <SelectOptions
                        name='material'
                        onChangeOption={(material) => setData('material', material)}
                        defaultOption={false}
                        options={materialNames}
                        usingObject={false}
                    />
                </div>

                <SubmitButton value='Add to cart' backgroundColor='var(--main-blue)' hoverBackgroundColor='var(--blue-1)' />
            </form>
        </div>
    );
}