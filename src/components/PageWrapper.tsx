import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const PageWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={`w-full max-w-screen-2xl mx-auto md:px-28 px-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
