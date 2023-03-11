import { FC } from "react";

interface IUnstyledButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string;
}

const UnstyledButton: FC<IUnstyledButtonProps> = ({
  children,
  type = "button",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`p-2 inline-block active:scale-95 transition-transform rounded bg-transparent ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default UnstyledButton;
