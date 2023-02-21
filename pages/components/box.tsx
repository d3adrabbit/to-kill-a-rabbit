import clsx from "clsx";

export interface IBoxProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  border?: boolean;
  children?: React.ReactNode;
}

export default function Box({
  width = 1,
  height = 1,
  border = true,
  style,
  className,
  children,
}: IBoxProps) {
  const base = 180;

  return (
    <div
      className={clsx("border border-black p-1 md:p-3", className)}
      style={style}
    >
      {children}
    </div>
  );
}
