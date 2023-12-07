import { TextInput, TextAreaInput } from '../Inputs';
import { GlowButton } from '../Buttons';

export const ContactUsSection = () => {
    return (
        <div className="w-full lg:w-1/3">
            <form className="max-w-lg mx-auto relative z-10">
                <p className='text-3xl mb-5 font-bold'>Contact us</p>
                <div className="mb-4">
                    <TextInput name='email' icon="fas fa-envelope" type="email" placeholder="Enter your email" />
                </div>
                <div className="mb-4">
                    <TextInput name='subject' icon="fas fa-envelope-open-text" type="text" placeholder="Enter the subject" />
                </div>
                <div className="mb-4">
                    <TextAreaInput rows='5' placeholder='Enter the message' />
                </div>
                <div className="text-center flex justify-center">
                    <GlowButton backgroundColor="#1d4ed8" value="Submit" />
                </div>
            </form>
        </div>
    );
};