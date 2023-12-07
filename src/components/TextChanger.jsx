import { useEffect, useRef } from 'react';
import PropTypes from "prop-types";

const TextChanger = ({ toRotate, period = 2000 }) => {
    const elRef = useRef(null);
    const toRotateArray = JSON.parse(toRotate);
    let loopNum = 0;
    let txt = '';
    let isDeleting = false;

    useEffect(() => {
        const tick = () => {
            let i = loopNum % toRotateArray.length;
            let fullTxt = toRotateArray[i];

            if (isDeleting) {
                txt = fullTxt.substring(0, txt.length - 1);
            } else {
                txt = fullTxt.substring(0, txt.length + 1);
            }

            setText('<span class="wrap">' + txt + '|</span>');

            let delta = 300 - Math.random() * 100;

            if (isDeleting) {
                delta /= 2;
            }

            if (!isDeleting && txt === fullTxt) {
                delta = period;
                isDeleting = true;
                standBy();
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                loopNum++;
                delta = 500;
            }

            function setText (text) {
                elRef.current.innerHTML = text;
            }

            function standBy() {
                if(txt === fullTxt) {
                    setTimeout(function() {
                        setText('<span class="wrap">' + txt + '&nbsp;</span>');
                        setTimeout(function() {
                            setText('<span class="wrap">' + txt + '|</span>');
                            standBy();
                        },500)
                    }, 500)
                }
            }

            setTimeout(tick, delta);
        };

        tick();
    }, [toRotateArray, period]);

    return <span className='bg-[#00000052] p-1 rounded min-w-[85px] block w-[110px] h-[35px]'><span ref={elRef}></span></span>;
};
TextChanger.propTypes = {
    toRotate: PropTypes.array.isRequired,
    period: PropTypes.string,
};

export default TextChanger;
