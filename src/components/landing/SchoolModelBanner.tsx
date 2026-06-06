'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, Html, useGLTF } from '@react-three/drei';
import { Menu } from 'lucide-react';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';

const MODEL_URL = '/models/school.glb';
const VERTICAL_ROTATION_LIMIT = Math.PI / 3;

type RotationTarget = {
  x: number;
  y: number;
};

function SchoolModel({
  rotationTarget,
}: {
  rotationTarget: MutableRefObject<RotationTarget>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  const model = useMemo(() => {
    const cloned = scene.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 6.2 / maxAxis;

    cloned.position.set(-center.x, -center.y, -center.z);

    return { object: cloned, scale };
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      rotationTarget.current.x,
      7,
      delta,
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      rotationTarget.current.y,
      7,
      delta,
    );
  });

  return (
    <group ref={groupRef} scale={model.scale}>
      <Center>
        <primitive object={model.object} />
      </Center>
    </group>
  );
}

function ModelLoader() {
  return (
    <Html center>
      <div className="h-9 w-9 rounded-full border-2 border-white/20 border-t-[#EED165] animate-spin" />
    </Html>
  );
}

export default function SchoolModelBanner() {
  const [modelReady, setModelReady] = useState(false);
  const rotationTarget = useRef<RotationTarget>({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    let active = true;

    fetch(MODEL_URL, { method: 'HEAD' })
      .then((response) => {
        if (active) setModelReady(response.ok);
      })
      .catch(() => {
        if (active) setModelReady(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const startDrag = (clientX: number, clientY: number) => {
    dragging.current = true;
    lastX.current = clientX;
    lastY.current = clientY;
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragging.current) return;
    const deltaX = clientX - lastX.current;
    const deltaY = clientY - lastY.current;

    lastX.current = clientX;
    lastY.current = clientY;

    rotationTarget.current.y += deltaX * 0.015;
    rotationTarget.current.x = THREE.MathUtils.clamp(
      rotationTarget.current.x + deltaY * 0.01,
      -VERTICAL_ROTATION_LIMIT,
      VERTICAL_ROTATION_LIMIT,
    );
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto flex flex-col items-center mt-10 sm:mt-14"
      onPointerMove={(event) => moveDrag(event.clientX, event.clientY)}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onPointerLeave={stopDrag}
    >
      <div className="relative w-full h-[430px] sm:h-[560px] md:h-[660px] lg:h-[740px] overflow-visible">
        <img
          src="/claud_clean.png?v=3"
          alt=""
          className="school-cloud pointer-events-none absolute left-[12%] top-[-30%] z-30 w-[60%] max-w-[600px] animate-[school-cloud-drift_5.5s_ease-in-out_infinite_alternate] opacity-80 sm:left-[16%] sm:top-[-26%] md:left-[20%] md:top-[-22%] lg:w-[50%]"
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-12 top-0 z-0">
          {modelReady ? (
            <Canvas
              camera={{ position: [0, 2.1, 5.4], fov: 38 }}
              gl={{ antialias: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.75} />
              <directionalLight position={[5, 8, 6]} intensity={1.4} />
              <pointLight position={[-4, 3, 4]} intensity={0.8} color="#5BC0EB" />
              <Suspense fallback={<ModelLoader />}>
                <SchoolModel rotationTarget={rotationTarget} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          ) : (
            <div className="h-full w-full" />
          )}
        </div>

        <div className="absolute inset-x-0 bottom-10 flex items-center justify-center pointer-events-none px-4 sm:px-10">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="w-full h-28 opacity-30"
            aria-hidden
          >
            <path
              d="M0,50 Q500,65 1000,50 Q500,55 0,50 Z"
              fill="none"
              stroke="white"
              strokeWidth={1.5}
            />
          </svg>
        </div>
      </div>

      <button
        type="button"
        className="drag-handle mt-6 z-10 mx-auto w-12 h-12 bg-[#e2e8f0] rounded-full flex items-center justify-center cursor-ew-resize shadow-md touch-none"
        aria-label="Rotate school model"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          startDrag(event.clientX, event.clientY);
        }}
        onPointerMove={(event) => moveDrag(event.clientX, event.clientY)}
        onPointerUp={(event) => {
          event.currentTarget.releasePointerCapture(event.pointerId);
          stopDrag();
        }}
      >
        <Menu className="text-gray-500" size={24} strokeWidth={2.5} />
      </button>

      <p className="drag-text text-white text-xs sm:text-sm mt-6 font-bold tracking-wide">
        &lt; Drag To View &gt;
      </p>
    </div>
  );
}
