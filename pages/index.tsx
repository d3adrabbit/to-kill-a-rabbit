import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Box from "./components/box";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="TO kill a rabbit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center h-screen min-w-[320px]">
        <div className="w-[320px] h-[640px] md:w-[700px] md:h-[400px] lg:w-[980px] lg:h-[560px] xl:w-[1260px] xl:h-[720px] border border-black grid grid-cols-1  md:grid-cols-2">
          <div className="grid grid-flow-row grid-rows-4">
            <div className="grid-cols-4 row-span-3 grid md:grid-cols-3 grid-rows-6 grid-flow-col">
              <Box className="row-span-2 border-r-2"></Box>
              <Box className="row-span-2 border-r-2"></Box>
              <Box className="border-b-0 border-r-0"></Box>
              <Box className="col-span-4 md:col-span-3 border-t-0"></Box>
              <Box className="col-span-3 md:col-span-2 row-span-5 border-b-0 border-l-0"></Box>
            </div>
            <div className="row-span-1 grid">
              <Box></Box>
            </div>
          </div>
          <div className="grid grid-rows-4 grid-cols-4">
            <div className="row-span-2 col-span-2 grid grid-cols-2 grid-rows-2">
              <Box className="row-span-2"></Box>
              <Box></Box>
              <Box></Box>
            </div>
            <div className="row-span-2 col-span-2 grid grid-cols-2 grid-rows-2">
              <Box></Box>
              <Box></Box>
              <Box className="col-span-2"></Box>
            </div>
            <div className="row-span-2 col-span-2 grid grid-cols-2 grid-rows-2">
              <Box></Box>
              <Box></Box>
              <Box className="col-span-2"></Box>
            </div>
            <div className="row-span-2 col-span-2 grid">
              <Box></Box>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
