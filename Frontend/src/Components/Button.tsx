interface ButtonProps {
  variant: "primary" | "secondary" | "logout";
  text: string;
  startIcon?: any;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-[#4071f4] text-white",
  secondary: "bg-gray-200 text-gray-800",
  logout:"text-white bg-red-900"
};

const defaultStyles =
  "h-10 px-4 rounded-md font-medium flex items-center justify-center text-lg cursor-pointer";

export function Button({ variant, text, startIcon, onClick,fullWidth }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full" : ""}`}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
    </button>
  );
}
