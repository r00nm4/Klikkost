
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary: "bg-[#4ADE9F] text-[#0A241B] hover:bg-[#86EFAC]",
    secondary: "bg-[#143D2F] text-white hover:bg-[#285441]",
    outline: "border border-[#285441] text-white hover:bg-[#143D2F]"
  };

  return (
    <button
      className={`rounded-full px-5 py-3 text-sm font-bold transition-all disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
