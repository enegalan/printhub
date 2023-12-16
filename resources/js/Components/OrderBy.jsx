import React from "react";

function OrderBy ({options = []}) {
    return(
        <div id="order_by" className="inline-flex flex-wrap">
            <select className="rounded border-[var(--light-grey)]" name="order_by">
                <option key="-1" value="-1" className="text-sm font-medium">Order by</option>
                {options.map((option, i) =>
                    <option key={i} value={option} className="text-sm font-medium">{option}</option>
                )}
            </select>
        </div>
    );
}

export default OrderBy;