import clsx from "clsx";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { useRef } from "react";
import { gsap } from "gsap";

export interface IBoxProps {
  className?: string;
  style?: React.CSSProperties;
  border?: boolean;
  children?: React.ReactNode;
}

export default function Radar({ style, className, children }: IBoxProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(mainRef.current, {
        scale: 1.5,
        repeat: -1,
        duration: 1,
        opacity: 0,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      data-scale
      className={clsx(
        "rounded-full w-[20px] h-[20px] border-2 border-black",
        className
      )}
      style={style}
    ></div>
  );
}
