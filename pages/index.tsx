import Head from "next/head";
import { Inter } from "@next/font/google";
import clsx from "clsx";
import { gsap } from "gsap";
import { ReactNode, Suspense, useRef } from "react";
import { horizontalLoop } from "@/utils/loop";
import Box from "@/components/box";
import Radar from "@/components/radar";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { Canvas, useFrame } from "@react-three/fiber";
import { Octahedron, OrthographicCamera } from "@react-three/drei";
import { Mesh } from "three";
import useMediaQuery from "@/hooks/use-match-mediea";
import Typed, { TypedOptions } from "typed.js";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

const Animation = () => {
  const cubeRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.x = t;
      cubeRef.current.rotation.y = t;
    }
  });
  return (
    <mesh ref={cubeRef}>
      <Octahedron>
        <meshBasicMaterial wireframe color={0xe27881} />
      </Octahedron>
    </mesh>
  );
};

const Circle = ({
  background,
  className,
  children,
}: {
  background?: string;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "absolute bg-no-repeat bg-contain bg-center",
        "h-[120px] w-[120px] top-[340px] left-[100px] p-1",
        "md:h-[140px] md:w-[140px] md:top-[20px] md:left-[455px]",
        "lg:h-[180px] lg:w-[180px] lg:top-[30px] lg:left-[645px]",
        "xl:h-[277px] xl:w-[277px] xl:top-[20px] xl:left-[805px]",
        className
      )}
      style={{
        background: `url(${background})`,
        backgroundSize: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 960px)");

  const cubeSize = isDesktop ? 40 : isTablet ? 30 : 20;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      horizontalLoop("[data-loop-text]", {
        repeat: -1,
      });

      gsap.to(".rotate", {
        rotate: -360,
        repeat: -1,
        duration: 5,
        ease: "none",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const typedEl = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed>();

  useIsomorphicLayoutEffect(() => {
    const options: TypedOptions = {
      strings: [
        `
        $ My program data bank boots up...<br>
        $ ■■■■■■■■■ 100%<br>
        $ It tells me what to do...<br>
        $ I'm <strong>D3-R4</strong>.<br>
        $ Now, how can I help you?<br>  
        $ Waiting...<br>
       `,
      ],
      typeSpeed: 30,
      showCursor: true,
      loop: false,
    };

    if (typedEl.current) {
      typed.current = new Typed(typedEl.current, options);
    }

    return () => {
      typed.current?.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>To Kill A Rabbit</title>
        <meta name="description" content="TO kill a rabbit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex justify-center items-center h-screen min-w-[320px] bg-[#F1E4A5] text-[#E27881] select-none"
        style={inter.style}
      >
        <div
          ref={mainRef}
          className="w-[320px] h-[640px]  md:w-[700px] md:h-[350px] lg:w-[980px] lg:h-[490px] xl:w-[1260px] xl:h-[630px] border md:border-2 relative border-[#E27881] flex flex-col md:flex-row"
        >
          <div className="grid flex-1 grid-flow-row grid-rows-4">
            <div className="grid grid-flow-col grid-cols-4 grid-rows-6 row-span-3">
              <Box className="row-span-2 border-r-2 text-xl md:text-3xl lg:text-4xl xl:text-5xl text-[#F1E4A5] bg-[#E27881] font-bold flex flex-col justify-center items-center">
                <div>
                  <div>噪聲</div>
                  <div>時代</div>
                </div>
              </Box>
              <Box className="row-span-2 p-3 border-r-2">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: "url(/images/global.svg)",
                  }}
                ></div>
              </Box>
              <Box className="flex p-3 space-x-1 border-b-0 border-r-0">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: "url(/images/rects.svg)",
                  }}
                ></div>
              </Box>
              <Box className="col-span-4 border-t-0 ">
                <div className="flex items-center h-full space-x-6 overflow-hidden text-xl font-bold lg:text-4xl whitespace-nowrap">
                  {new Array(6).fill(0).map((_, index) => {
                    return (
                      <div key={index} data-loop-text>
                        <div className="flex space-x-6">
                          <div>D3ADR4BBIT</div>
                          <div>戴拉比特</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Box>
              <Box className="justify-center col-span-3 row-span-5 p-3 border-b-0 border-l-0 ">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: "url(/images/rabbit.svg)",
                  }}
                >
                  <span
                    className="text-xs md:text-sm opacity-60"
                    ref={typedEl}
                  ></span>
                </div>
              </Box>
            </div>
            <div className="grid row-span-1">
              <Box className="flex">
                <div
                  className="h-full w-full bg-no-repeat bg-contain flex-[3]"
                  style={{
                    backgroundImage: "url(/images/label.svg)",
                  }}
                ></div>

                <div
                  className="h-full w-full bg-no-repeat bg-contain flex-[1]"
                  style={{
                    backgroundImage: "url(/images/circles.svg)",
                  }}
                ></div>
              </Box>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-4 grid-rows-4">
            <div className="relative grid grid-cols-2 col-span-2 grid-rows-2 row-span-2">
              <Box className="row-span-2 bg-[#E27881]">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: "url(/images/stack.svg)",
                  }}
                ></div>
              </Box>
              <Box className="row-span-2"></Box>
            </div>
            <div className="grid grid-cols-2 col-span-2 grid-rows-2 row-span-2">
              <Box></Box>
              <Box
                className="h-[80px] md:h-full"
                style={{
                  padding: 0,
                }}
              >
                <Canvas className="">
                  <OrthographicCamera
                    makeDefault
                    position={[0, 0, 15]}
                    zoom={cubeSize}
                  />
                  <Suspense fallback={null}>
                    <Animation></Animation>
                  </Suspense>
                </Canvas>
              </Box>
              <Box className="col-span-2"></Box>
            </div>
            <div className="grid grid-cols-2 col-span-2 grid-rows-2 row-span-2">
              <Box className="text-xl md:text-3xl lg:text-4xl  xl:text-5xl text-[#E27881] font-bold flex flex-col justify-center items-center">
                <div>
                  <div>重塑</div>
                  <div>未来</div>
                </div>
              </Box>
              <Box>
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: "url(/images/circle.svg)",
                  }}
                ></div>
              </Box>
              <Box className="col-span-2 bg-[#E27881]">
                <div
                  className="w-full h-full bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: "url(/images/mission.svg)",
                  }}
                ></div>
              </Box>
            </div>
            <div className="grid col-span-2 row-span-2">
              <Box className="overflow-hidden">
                <div
                  className="relative flex items-center justify-center w-full h-full bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: "url(/images/d3r4.svg)",
                  }}
                >
                  <Radar></Radar>
                  <div
                    className="w-10 h-10 md:w-14 md:h-14 absolute -bottom-[6px] -left-2 md:-bottom-[13px] md:-left-4  bg-no-repeat bg-contain bg-center"
                    style={{
                      backgroundImage: "url(/images/triangle-1.svg)",
                    }}
                  ></div>
                </div>
              </Box>
            </div>
          </div>
          <div className="absolute right-0 text-xs leading-3 text-right -bottom-8 md:-bottom-12 md:leading-5 md:text-sm">
            <div>to-kill-a-rabbit.deadrabbit.online</div>
            <div>deadrabbbbit@gmail.com</div>
          </div>

          <div className="abresolute">
            {/* <div
              data-rotate
              className={clsx(
                "absolute bg-no-repeat bg-contain bg-center",
                "h-[120px] w-[120px] top-[340px] left-[100px] p-1",
                "md:h-[140px] md:w-[140px] md:top-[20px] md:left-[455px]",
                "lg:h-[180px] lg:w-[180px] lg:top-[30px] lg:left-[645px]",
                "xl:h-[277px] xl:w-[277px] xl:top-[20px] xl:left-[805px]"
              )}
              style={{
                background: "url(/images/round-text.svg)",
                backgroundSize: "100%",
              }}
            ></div> */}

            <Circle
              background="/images/round-text.svg"
              className="rotate"
            ></Circle>

            <Circle className="flex items-center justify-center md:p-2 lg:p-3">
              <div
                className="w-full h-full"
                style={{
                  background: "url(/images/rabbit-2.svg)",
                  backgroundSize: "100%",
                }}
              ></div>
            </Circle>
          </div>
        </div>
      </main>
    </>
  );
}
