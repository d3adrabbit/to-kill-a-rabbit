import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

import clsx from "clsx";
import { gsap } from "gsap";
import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { horizontalLoop } from "@/utils/loop";
import Box from "@/components/box";
import Radar from "@/components/radar";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Octahedron, OrthographicCamera } from "@react-three/drei";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";
import { BufferGeometry, Material, Mesh } from "three";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";

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
    <mesh scale={4} ref={cubeRef}>
      <Octahedron>
        <meshStandardMaterial wireframe />
        {/* <lineBasicMaterial color={0xfff} linewidth={1}></lineBasicMaterial> */}
      </Octahedron>
    </mesh>
  );
};

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      horizontalLoop("[data-loop-text]", {
        repeat: -1,
      });

      gsap.to("[data-rotate]", {
        rotate: -360,
        repeat: -1,
        duration: 5,
        ease: "none",
      });
    }, mainRef);

    return () => ctx.revert();
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
        className="flex justify-center items-center h-screen min-w-[320px] bg-[#49EB97] text-[#095E38] select-none"
        style={inter.style}
      >
        <div
          ref={mainRef}
          className="w-[320px] h-[640px]  md:w-[700px] md:h-[350px] lg:w-[980px] lg:h-[490px] xl:w-[1260px] xl:h-[630px] border md:border-2 relative border-[#095E38] flex flex-col md:flex-row"
        >
          <div className="flex-1 grid grid-flow-row grid-rows-4">
            <div className="grid-cols-4 row-span-3 grid grid-rows-6 grid-flow-col">
              <Box className="row-span-2 border-r-2 text-xl md:text-3xl lg:text-4xl xl:text-5xl text-[#49EB97] bg-[#095E38] font-bold flex flex-col justify-center items-center">
                <div>
                  <div>噪聲</div>
                  <div>時代</div>
                </div>
              </Box>
              <Box className="row-span-2 border-r-2 p-3">
                <div
                  className="h-full w-full bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: "url(/images/global.svg)",
                  }}
                ></div>
              </Box>
              <Box className="p-3 border-b-0 border-r-0 flex space-x-1">
                <div
                  className="h-full w-full bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: "url(/images/rects.svg)",
                  }}
                ></div>
              </Box>
              <Box className="col-span-4  border-t-0 ">
                <div className="flex  font-bold text-xl lg:text-4xl space-x-6 items-center h-full whitespace-nowrap overflow-hidden">
                  {new Array(6).fill(0).map((_, index) => {
                    return (
                      <div key={index} data-loop-text>
                        <div className="flex space-x-6">
                          <div>D3adR4bbit</div>
                          <div>戴 · 拉比特</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Box>
              <Box className="col-span-3 p-3 row-span-5 border-b-0 border-l-0 justify-center ">
                <div
                  className="h-full w-full bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: "url(/images/rabbit.svg)",
                  }}
                ></div>
              </Box>
            </div>
            <div className="row-span-1 grid">
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
          <div className="flex-1 grid grid-rows-4 grid-cols-4">
            <div className="row-span-2 col-span-2 grid grid-cols-2 grid-rows-2 relative">
              <Box className="row-span-2 bg-[#095E38]">
                <div
                  className="h-full w-full bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: "url(/images/stack.svg)",
                  }}
                ></div>
              </Box>
              <Box className="row-span-2"></Box>
            </div>
            <div className="row-span-2 col-span-2 grid grid-cols-2 grid-rows-2">
              <Box></Box>
              <Box
                style={{
                  padding: 0,
                }}
              >
                <Canvas>
                  <OrthographicCamera
                    makeDefault
                    position={[0, 0, 15]}
                    zoom={10}
                  />
                  <Suspense fallback={null}>
                    <Animation></Animation>
                  </Suspense>
                </Canvas>
              </Box>
              <Box className="col-span-2"></Box>
            </div>
            <div className="row-span-2 col-span-2 grid grid-cols-2 grid-rows-2">
              <Box className="text-xl md:text-3xl lg:text-4xl  xl:text-5xl text-[#095E38] font-bold flex flex-col justify-center items-center">
                <div>
                  <div>重塑</div>
                  <div>未来</div>
                </div>
              </Box>
              <Box>
                <div
                  className="h-full w-full bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage: "url(/images/circle.svg)",
                  }}
                ></div>
              </Box>
              <Box className="col-span-2 bg-[#095E38]">
                <div
                  className="h-full w-full bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: "url(/images/mission.svg)",
                  }}
                ></div>
              </Box>
            </div>
            <div className="row-span-2 col-span-2 grid">
              <Box className=" overflow-hidden">
                <div
                  className="h-full w-full bg-no-repeat bg-contain bg-center relative flex justify-center items-center"
                  style={{
                    backgroundImage: "url(/images/d3r4.png)",
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
          <div className="absolute right-0 -bottom-8 md:-bottom-12 leading-3 md:leading-5 text-xs md:text-sm text-right">
            <div>www.to-kill-a-rabbit.deadrabbit.online</div>
            <div>deadrabbbbit@gmail.com</div>
          </div>

          <div className="absolute">
            <div
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
            ></div>

            <div
              className={clsx(
                "absolute bg-no-repeat bg-contain bg-center flex justify-center items-center",
                "h-[120px] w-[120px] top-[340px] left-[100px] p-1",
                "md:h-[140px] md:w-[140px] md:top-[20px] md:left-[455px] md:p-2",
                "lg:h-[180px] lg:w-[180px] lg:top-[30px] lg:left-[645px] lg:p-3",
                "xl:h-[277px] xl:w-[277px] xl:top-[20px] xl:left-[805px]"
              )}
            >
              <div
                className="w-full h-full"
                style={{
                  background: "url(/images/rabbit-2.svg)",
                  backgroundSize: "100%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
