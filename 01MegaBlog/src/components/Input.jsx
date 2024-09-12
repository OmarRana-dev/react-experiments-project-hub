import React, { useId, forwardRef } from "react";

function Input(
  {
    label,
    type = "text",
    placeholder = "",
    className = "",
    disabled = false,
    ...rest
  },
  ref
) {
  const id = useId();
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

      <input
        type={type}
        placeholder={placeholder}
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 ${className}`}
        disabled={disabled}
        id={id}
        ref={ref}
        {...rest}
      />
    </div>
  );
}

export default forwardRef(Input);
