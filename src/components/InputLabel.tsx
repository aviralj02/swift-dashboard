import { InputHTMLAttributes } from "react";

type Props = {
  label?: string | null;
} & InputHTMLAttributes<HTMLInputElement>;

const InputLabel = ({ label, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full text-primary text-sm">
      {label && (
        <label htmlFor={props.id} className="font-medium opacity-70">
          {label}
        </label>
      )}
      <input
        {...props}
        className="py-2 px-4 disabled:bg-gray-100 rounded-md font-medium outline-none"
      />
    </div>
  );
};

export default InputLabel;
