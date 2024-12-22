import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  label: string;
  icon: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ label, icon, ...props }: Props) => {
  return (
    <button
      className="bg-white text-primary flex px-2 py-1 gap-2 items-center rounded-md cursor-pointer border hover:shadow-md transition-all"
      {...props}
    >
      <span className="text-xs font-medium">{label}</span>
      {icon}
    </button>
  );
};

export default Button;
