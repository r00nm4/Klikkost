
interface BadgeProps {
  children: React.ReactNode;
  type?: "Putra" | "Putri" | "Campur" | "Verified" | "Default";
}

export default function Badge({
  children,
  type = "Default"
}: BadgeProps) {
  const styles = {
    Putra: "bg-blue-500/15 text-blue-300",
    Putri: "bg-pink-500/15 text-pink-300",
    Campur: "bg-purple-500/15 text-purple-300",
    Verified: "bg-[#4ADE9F]/15 text-[#4ADE9F]",
    Default: "bg-white/10 text-gray-300"
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[type]}`}
    >
      {children}
    </span>
  );
}
