import clsx from "clsx";

export interface IBoxProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  border?: boolean;
  children?: React.ReactNode;
}

export default function Box({ style, className, children }: IBoxProps) {
  return (
    <div
      className={clsx(
        "border border-[#CD4D5B] p-1 md:p-3 md:border-2",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
