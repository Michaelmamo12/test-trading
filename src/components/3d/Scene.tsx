import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ParticlesField } from './ParticlesField';
import { Suspense } from 'react';

export function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <ParticlesField />
          <ambientLight intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}