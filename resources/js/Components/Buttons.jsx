import { useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import gsap from 'gsap';
import chroma from 'chroma-js';
import '../../css/ButtonGlow.css';

const GlowButton = (props) => {
    var { value, href, backgroundColor, textColor, image, imageClass, icon } = props;
    backgroundColor = backgroundColor ? backgroundColor : "#09041e";
    textColor = textColor ? textColor : "white";
    value = value ? value : "";
    href = href ? href : "#";
    image = image ? image : "";
    icon = icon ? icon : "";
    const buttonRef = useRef(null);
    const gradientRef = useRef(null);
    useEffect(() => {
        const button = buttonRef.current;
        const gradientElem = gradientRef.current;

        if (!gradientElem) {
            throw new Error('Gradient element not found');
        }

        const handlePointerMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(button, {
                '--pointer-x': `${x}px`,
                '--pointer-y': `${y}px`,
                duration: 0.6,
            });

            gsap.to(button, {
                '--button-glow': chroma
                    .mix(
                        getComputedStyle(button)
                            .getPropertyValue('--button-glow-start')
                            .trim(),
                        getComputedStyle(button).getPropertyValue('--button-glow-end').trim(),
                        x / rect.width
                    )
                    .hex(),
                duration: 0.2,
            });
        };

        if (button && gradientElem) {
            button.addEventListener('pointermove', handlePointerMove);

            return () => {
                button.removeEventListener('pointermove', handlePointerMove);
            };
        }
    }, [buttonRef, gradientRef]);

    return (
        <div className='mx-1 flex z-10 w-[inherit]'>
            <a ref={buttonRef} href={href} className="glow-button text-center">
                <span className={`flex bg-[${backgroundColor}] text-[${textColor}]`}>
                    {image ? <img src={`${image}`} className={`${imageClass}`} /> : ""}
                    {icon ? <i className={icon}></i> : ""}
                    {value}
                </span>
                <div ref={gradientRef} className="gradient"></div>
            </a>
        </div>
    );
};
GlowButton.propTypes = {
    value: PropTypes.string,
    href: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    image: PropTypes.string,
    imageClass: PropTypes.string,
    icon: PropTypes.string,
};

const GlowSubmitButton = (props) => {
    var { value, backgroundColor, textColor } = props;
    backgroundColor = backgroundColor ? backgroundColor : "#09041e";
    textColor = textColor ? textColor : "white";
    value = value ? value : "";

    const buttonRef = useRef(null);
    const gradientRef = useRef(null);
    useEffect(() => {
        const button = buttonRef.current;
        const gradientElem = gradientRef.current;

        if (!gradientElem) {
            throw new Error('Gradient element not found');
        }

        const handlePointerMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(button, {
                '--pointer-x': `${x}px`,
                '--pointer-y': `${y}px`,
                duration: 0.6,
            });

            gsap.to(button, {
                '--button-glow': chroma
                    .mix(
                        getComputedStyle(button)
                            .getPropertyValue('--button-glow-start')
                            .trim(),
                        getComputedStyle(button).getPropertyValue('--button-glow-end').trim(),
                        x / rect.width
                    )
                    .hex(),
                duration: 0.2,
            });
        };

        if (button && gradientElem) {
            button.addEventListener('pointermove', handlePointerMove);

            return () => {
                button.removeEventListener('pointermove', handlePointerMove);
            };
        }
    }, [buttonRef, gradientRef]);

    return (
        <div className='flex z-10'>
            <button type="submit" ref={buttonRef} className="glow-button text-center">
                <span className={`bg-[${backgroundColor}] text-[${textColor}]`}>{value}</span>
                <div ref={gradientRef} className="gradient"></div>
            </button>
        </div>
    );
};
GlowSubmitButton.propTypes = {
    value: PropTypes.string,
    href: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    image: PropTypes.string,
    imageClass: PropTypes.string,
    icon: PropTypes.string,
};

const BouncingButton = () => {
    return (
        
        <div className="animate-bounce mb-[50px] lg:mt-[100px] bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 self-center ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
            <a href="#thanks">
                <svg className="w-6 h-6 text-violet-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </a>
        </div>
    )
}

export { GlowButton, GlowSubmitButton, BouncingButton };