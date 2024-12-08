import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useControls } from 'leva';

export function ParticlesField() {
  const count = 1000;
  const points = useRef<THREE.Points>(null);

  const { speed, size, spread } = useControls('Particles', {
    speed: { value: 0.3, min: 0.1, max: 1, step: 0.1 },
    size: { value: 0.1, min: 0.05, max: 0.5, step: 0.05 },
    spread: { value: 50, min: 20, max: 100, step: 5 },
  });

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
    }
    
    return positions;
  }, [count, spread]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * speed * 0.1;
    points.current.rotation.x = state.clock.getElapsedTime() * speed * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        transparent
        color="#8b5cf6"
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}