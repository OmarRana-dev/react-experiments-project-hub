import React, { useId, forwardRef } from "react";

function Select({ options, label, className = "", ...rest }, ref) {
  const id = useId();

  // console.log(options);

  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <select
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 outline-none focus:bg-gray-50 duration-200 ${className}`}
        id={id}
        ref={ref}
        {...rest}
      >
        ;
        {options?.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default forwardRef(Select);
