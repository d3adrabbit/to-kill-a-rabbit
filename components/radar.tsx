import clsx from "clsx";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { useRef } from "react";
import { gsap } from "gsap";
import useMediaQuery from "@/hooks/use-match-mediea";

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
      gsap.to("[data-scale]", {
        keyframes: [
          {
            opacity: 0,
          },
          {
            opacity: 0.8,
            scale: 1.5,
          },
          {
            opacity: 0,
            scale: 2,
          },
        ],

        duration: 2.5,
        stagger: {
          each: 0.5,
          repeat: -1,
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex justify-center items-center">
      {Array(6)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              data-scale
              className={clsx(
                "rounded-full border border-[#E27881] absolute opacity-0",
                "w-[80px] h-[80px]",
                "md:w-[100px] md:h-[100px]",
                "lg:w-[160px] lg:h-[160px]",
                className
              )}
            ></div>
          );
        })}
    </div>
  );
}
