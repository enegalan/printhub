import Dashboard from '../Dashboard'
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import toast from 'react-hot-toast';
import { BackButton } from '@/Components/Buttons';

export default function Edit({ color }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: color.name,
        hex: color.hex,
        factor: color.factor,
    });

    const onAdd = () => {
        toast.success('Color updated successfully');
    }

    const onError = (e) => {
        toast.error('Error updating color');
    }

    const submit = (e) => {
        e.preventDefault();
        
        try {
            post(route("admin.update.color",color));
            onAdd();
        } catch (e) {
            onError(e);
        }
    };

    return (
        <Dashboard pageName='Colors' pageSubtitle="Manage product's colors">
            <BackButton href="admin.colors" />
            <h1 className="text-2xl mb-5 text-center">Edit color</h1>
            <div className="row-span-4 bg-white rounded-xl p-4 lg:mx-20">
                <form
                    className="px-10 py-5 flex flex-col gap-5"
                    onSubmit={submit}
                >
                    <div>
                        <InputLabel forInput="name" value="Name*" className="text-gray-900" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />

                        <InputLabel forInput="hex" value="Hex*" className="text-gray-900" />
                        <TextInput
                            id="hex"
                            name="hex"
                            type="color"
                            value={data.hex}
                            className="mt-1 block w-full"
                            autoComplete="hex"
                            isFocused={true}
                            onChange={(e) => setData("hex", e.target.value)}
                            required
                        />
                        <InputError message={errors.hex} className="mt-2" />

                        <InputLabel forInput="factor" value="Factor*" className="text-gray-900" />
                        <TextInput
                            id="factor"
                            name="factor"
                            type="number"
                            min="1"
                            step="0.01"
                            value={data.factor}
                            className="mt-1 block w-full"
                            autoComplete="factor"
                            isFocused={true}
                            onChange={(e) => setData("factor", e.target.value)}
                            required
                        />
                        <InputError message={errors.factor} className="mt-2" />
                    </div>
                    <div>
                        <button className="rounded bg-blue-500 text-white px-5 py-2 font-medium">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
}