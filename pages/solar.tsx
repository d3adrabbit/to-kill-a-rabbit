import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Solar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current,
    });

    // camera
    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);

    const controls = new OrbitControls(camera, renderer.domElement);

    const helper = new THREE.CameraHelper(camera);
    scene.add(helper);

    camera.position.set(0, 0, 50);
    // camera.up.set(0, 0, 1);
    camera.lookAt(new THREE.Vector3(20, 6, 0));

    scene.add(camera);

    // light
    const light = new THREE.PointLight(0xffffff, 3);
    scene.add(light);

    const objects: THREE.Object3D[] = [];
    const sphereGeometry = new THREE.SphereGeometry(1, 6, 6);
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    objects.push(sunMesh);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.position.x = 10;

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    solarSystem.add(earthMesh);
    solarSystem.add(sunMesh);
    objects.push(earthMesh);

    const render = (time: number) => {
      time *= 0.001;
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      objects.forEach((obj) => {
        obj.rotation.y = time;
      });
      //   controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }, []);

  return <canvas className="w-screen h-screen" ref={canvasRef}></canvas>;
}
