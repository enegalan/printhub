import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const data = {
    rows: [
        {
            title: "How does our 3D printing company stay competitive in the market?",
            content: `Our company stays competitive by continually innovating our 3D printing technologies,
                    offering custom solutions, and providing excellent customer support. 
                    We also keep a close eye on market trends and adapt our strategies accordingly.`,
        },
        {
            title: "What are the key factors influencing the demand for 3D printing products?",
            content: `Factors influencing demand include technological advancements, cost-effectiveness, 
                    customization options, increasing applications across various industries, and growing awareness of the benefits of 3D printing.`,
        },
        {
            title: "How do we ensure timely and efficient shipping of our products?",
            content: `We partner with reliable shipping carriers and implement robust logistics management systems to ensure timely delivery of our products.
                    Additionally, we track shipments closely and provide customers with updates throughout the shipping process to ensure transparency and peace of mind.`,
        },
        {
            title: "What steps do we take to maintain product quality during the shipping process?",
            content: `We carefully package our products using high-quality materials to prevent damage during transit. 
                    Additionally, we conduct thorough quality checks before shipping to ensure that only products meeting our stringent standards are sent out to customers.`,
        },
        {
            title: "What sets our 3D printing company apart from competitors?",
            content: `Our company stands out due to our commitment to innovation, exceptional product quality, personalized customer service, and competitive pricing. 
                    We also offer a wide range of materials and printing options to cater to diverse customer needs.`,
        },
    ],
};

const styles = {
    bgColor: 'transparent',
    rowTitleColor: "var(--main-blue)",
    rowContentPaddingLeft: '30px',
    rowContentPaddingRight: '30px',
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export const Faqs = () => {
    return (
        <Faq
            data={data}
            styles={styles}
            config={config}
        />
    );
}