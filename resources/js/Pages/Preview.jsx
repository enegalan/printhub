import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';
import ModelViewer from '@/Components/threejs/ModelViewer';

export default function Preview({ user = null, fileUrl = null, dimensions = [], colors = [], materials = [] }) {
    return (
        <>
            <NavBar defaultBackgroundColor="var(--main-blue)" defaultTextColor="var(--white)" dynamicBackground={false} user={user} />
            <main id="scan" className='mt-32'>
                <h1 className='font-bold text-4xl text-center'>3D model preview</h1>
                <div className='my-16 flex items-center justify-center'>
                    <ModelViewer fileUrl={fileUrl} colors={colors} materials={materials} dimensions={dimensions}  />
                </div>
            </main>
            <Footer />
        </>
    );
}