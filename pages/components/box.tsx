import clsx from "clsx";

export interface IBoxProps {
  width?: number;
  height?: number;
  className?: string;
  border?: boolean;
}

export default function Box({
  width = 1,
  height = 1,
  border = true,
  className,
}: IBoxProps) {
  const base = 180;

  return (
    <div
      className={clsx("border border-black", className)}
      // style={{
      //   width: `${width * base}px`,
      //   height: `${height * base}px`,
      // }}
    ></div>
  );
}
