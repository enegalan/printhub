import React from "react";

function OrderBy ({ options = {}, onChange = () => {} }) {
    return(
        <div id="order_by" className="inline-flex flex-wrap">
            <select className="block w-full py-1.5 text-gray-700 bg-white border border-gray-200 rounded-lg" name="order_by" onChange={(e) => onChange(e.target.value)}>
                <option key="-1" value="-1" className="text-sm font-medium">Order by</option>
                {Object.entries(options).map(([key, value], i) => (
                    <option key={i} value={key} className="text-sm font-medium">{value}</option>
                ))}
            </select>
        </div>
    );
}

export default OrderBy;