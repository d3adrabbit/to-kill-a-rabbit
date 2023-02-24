import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function Solar() {
  useEffect(() => {}, []);

  return (
    <div className="relative h-screen">
      <Canvas className="absolute top-0 left-0 w-screen h-screen">
        <mesh>
          <boxGeometry>
            <meshBasicMaterial color={0xf0f0f0}></meshBasicMaterial>
          </boxGeometry>
        </mesh>
      </Canvas>
    </div>
  );
}
