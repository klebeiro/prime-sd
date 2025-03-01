import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface FieldComponentProps {
  label?: string;
  type?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

interface SpecializedFieldProps extends Omit<FieldComponentProps, "type"> {}

export function FieldComponent({
  label = "",
  type = "text",
  id,
  name,
  value,
  onChange,
  error,
}: FieldComponentProps) {
  const uniqueId = useRef(id || (label ? label.toLowerCase().replace(/\s+/g, "-") : uuidv4())).current;

  return (
    <div className="mb-6">
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor={uniqueId}
      >
        {label}
      </label>
      <input
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-400 focus:border-red-500"
            : "border-black focus:border-black"
        }`}
        id={uniqueId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export const createFieldComponent = (defaultProps: Partial<FieldComponentProps>) => {
  return (props: SpecializedFieldProps) => <FieldComponent {...defaultProps} {...props} />;
};

export const EmailFieldComponent = createFieldComponent({
  label: "E-mail",
  type: "email",
  name: "email",
});

export const PasswordFieldComponent = createFieldComponent({
  label: "Senha",
  type: "password",
  name: "password",
});
