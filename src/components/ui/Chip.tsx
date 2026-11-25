"use client";

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Chip({
  children,
  selected = false,
  onClick,
  className = ""
}: ChipProps) {
  const classes = `rounded-full border px-4 py-2 text-sm font-semibold transition ${
    selected
      ? "border-[#4ADE9F] bg-[#4ADE9F]/15 text-[#4ADE9F]"
      : "border-[#285441] text-[#91A99D] hover:border-[#4ADE9F] hover:text-white"
  } ${className}`;

  if (!onClick) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}