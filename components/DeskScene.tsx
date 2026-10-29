"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Html, OrbitControls, RoundedBox, Text, useCursor } from "@react-three/drei";
import { Suspense, useState } from "react";
import * as THREE from "three";

type ItemKey = "notebook" | "laptop" | "camera" | "phone" | "cup" | "pen";
type Props = { onOpen: (key: ItemKey) => void };

function DeskItem({ kind, position, rotation = [0, 0, 0], onOpen, children }: {
  kind: ItemKey; position: [number, number, number]; rotation?: [number, number, number];
  onOpen: (key: ItemKey) => void; children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return <group position={position} rotation={rotation}>
    <Float speed={hovered ? 2.5 : 1.1} rotationIntensity={hovered ? .09 : .025} floatIntensity={hovered ? .18 : .06}>
      <group onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onOpen(kind); }} scale={hovered ? 1.045 : 1}>
        {children}
        {hovered && <mesh position={[0, .04, 0]}><boxGeometry args={[1.1, .015, .8]} /><meshBasicMaterial color="#b5ff65" transparent opacity={.11} /></mesh>}
      </group>
    </Float>
  </group>;
}

function Notebook({ onOpen }: Props) {
  return <DeskItem kind="notebook" position={[-1.15, .16, .15]} rotation={[-.03, -.14, -.06]} onOpen={onOpen}>
    <RoundedBox args={[1.48, .13, 1.95]} radius={.06} smoothness={4} castShadow>
      <meshStandardMaterial color="#20282a" roughness={.7} />
    </RoundedBox>
    <mesh position={[0, .075, 0]} castShadow><boxGeometry args={[1.39, .018, 1.85]} /><meshStandardMaterial color="#d6d0c4" roughness={.92} /></mesh>
    <mesh position={[-.05, .09, 0]}><boxGeometry args={[1.27, .008, 1.73]} /><meshStandardMaterial color="#f0eadf" roughness={1} /></mesh>
    <mesh position={[-.05, .098, -.52]}><boxGeometry args={[.9, .004, .006]} /><meshBasicMaterial color="#a7ad9f" /></mesh>
    <Text position={[-.05, .104, -.31]} fontSize={.105} color="#111713" anchorX="center" anchorY="middle" maxWidth={1.1}>FIELD NOTES</Text>
    <Text position={[-.05, .103, -.12]} fontSize={.065} color="#65705f" anchorX="center" anchorY="middle">SOLOMOUGH / 2026</Text>
    <mesh position={[-.05, .104, .37]}><boxGeometry args={[.8, .005, .004]} /><meshBasicMaterial color="#a7ad9f" /></mesh>
    <Text position={[-.05, .105, .55]} fontSize={.055} color="#65705f" anchorX="center" anchorY="middle">IDEAS → SYSTEMS → IMPACT</Text>
  </DeskItem>;
}

function Laptop({ onOpen }: Props) {
  return <DeskItem kind="laptop" position={[1.12, .12, -.55]} rotation={[-.02, .2, .03]} onOpen={onOpen}>
    <RoundedBox args={[1.65, .08, 1.05]} radius={.04} smoothness={4} castShadow><meshStandardMaterial color="#555b5c" metalness={.72} roughness={.3} /></RoundedBox>
    <mesh position={[0, .06, -.05]}><boxGeometry args={[1.47, .008, .84]} /><meshStandardMaterial color="#171a1d" roughness={.3} /></mesh>
    <mesh position={[0, .068, -.05]}><boxGeometry args={[1.37, .004, .74]} /><meshBasicMaterial color="#101916" /></mesh>
    <Text position={[-.42, .074, -.26]} fontSize={.08} color="#b5ff65" anchorX="left">~/solomough</Text>
    {Array.from({ length: 4 }).map((_, i) => <mesh key={i} position={[-.4, .075, -.12 + i * .11]}><boxGeometry args={[.42 + (i % 2) * .22, .003, .008]} /><meshBasicMaterial color={i === 1 ? "#83b7ff" : "#64736b"} /></mesh>)}
    <mesh position={[0, .072, .3]}><boxGeometry args={[.3, .006, .18]} /><meshStandardMaterial color="#7a8080" metalness={.5} roughness={.4} /></mesh>
  </DeskItem>;
}

function Camera({ onOpen }: Props) {
  return <DeskItem kind="camera" position={[2.18, .21, .92]} rotation={[0, -.32, 0]} onOpen={onOpen}>
    <RoundedBox args={[.76, .43, .48]} radius={.07} smoothness={4} castShadow><meshStandardMaterial color="#25282b" roughness={.5} metalness={.35} /></RoundedBox>
    <mesh position={[0, .245, -.04]}><boxGeometry args={[.25, .08, .24]} /><meshStandardMaterial color="#303437" roughness={.6} /></mesh>
    <mesh position={[0, .015, .26]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.2, .2, .22, 32]} /><meshStandardMaterial color="#101214" metalness={.55} roughness={.22} /></mesh>
    <mesh position={[0, .015, .385]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.13, .13, .012, 32]} /><meshStandardMaterial color="#18252b" metalness={.8} roughness={.16} /></mesh>
    <mesh position={[0, .015, .394]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[.085, 32]} /><meshBasicMaterial color="#8ca9a8" /></mesh>
  </DeskItem>;
}

function Phone({ onOpen }: Props) {
  return <DeskItem kind="phone" position={[-2.25, .12, -.85]} rotation={[0, .22, -.02]} onOpen={onOpen}>
    <RoundedBox args={[.48, .07, .86]} radius={.07} smoothness={5} castShadow><meshStandardMaterial color="#35393b" metalness={.55} roughness={.3} /></RoundedBox>
    <mesh position={[0, .04, 0]}><boxGeometry args={[.4, .008, .76]} /><meshStandardMaterial color="#111a1c" /></mesh>
    <Text position={[0, .047, -.18]} fontSize={.055} color="#b5ff65" anchorX="center">ARK / INBOX</Text>
    <mesh position={[0, .047, .01]}><boxGeometry args={[.3, .004, .008]} /><meshBasicMaterial color="#536a60" /></mesh>
    <mesh position={[0, .047, .1]}><boxGeometry args={[.23, .004, .008]} /><meshBasicMaterial color="#536a60" /></mesh>
    <mesh position={[0, .047, .2]}><boxGeometry args={[.28, .004, .008]} /><meshBasicMaterial color="#536a60" /></mesh>
  </DeskItem>;
}

function Cup({ onOpen }: Props) {
  return <DeskItem kind="cup" position={[2.4, .16, -.75]} rotation={[0, -.2, 0]} onOpen={onOpen}>
    <mesh castShadow><cylinderGeometry args={[.27, .22, .39, 32, 1, true]} /><meshStandardMaterial color="#e5e0d7" roughness={.32} side={THREE.DoubleSide} /></mesh>
    <mesh position={[0, .2, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.245, .035, 10, 32]} /><meshStandardMaterial color="#f1ede4" roughness={.25} /></mesh>
    <mesh position={[.29, .02, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.12, .035, 12, 32]} /><meshStandardMaterial color="#e5e0d7" roughness={.32} /></mesh>
    <mesh position={[0, .13, 0]}><cylinderGeometry args={[.225, .225, .008, 32]} /><meshStandardMaterial color="#39291f" roughness={.18} /></mesh>
  </DeskItem>;
}

function Pen({ onOpen }: Props) {
  return <DeskItem kind="pen" position={[-.18, .2, 1.18]} rotation={[0, 0, -.06]} onOpen={onOpen}>
    <mesh castShadow rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.035, .035, 1.45, 16]} /><meshStandardMaterial color="#9ea6a2" metalness={.82} roughness={.22} /></mesh>
    <mesh position={[.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[.035, .13, 16]} /><meshStandardMaterial color="#d8dcd7" metalness={.8} roughness={.2} /></mesh>
    <mesh position={[-.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.035, .035, .12, 16]} /><meshStandardMaterial color="#b5ff65" metalness={.6} roughness={.24} /></mesh>
  </DeskItem>;
}

function Scene({ onOpen }: Props) {
  return <>
    <color attach="background" args={["#0a0c0d"]} />
    <fog attach="fog" args={["#0a0c0d", 8, 17]} />
    <ambientLight intensity={1.25} />
    <spotLight position={[-3, 7, 3]} angle={.55} penumbra={.9} intensity={95} color="#f5ead5" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    <pointLight position={[3, 2, -2]} intensity={18} color="#b5ff65" distance={7} />
    <pointLight position={[-3, 1, -3]} intensity={12} color="#6a8cff" distance={6} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.09, 0]} receiveShadow>
      <planeGeometry args={[12, 8]} /><meshStandardMaterial color="#17191a" roughness={.84} metalness={.12} />
    </mesh>
    <gridHelper args={[12, 24, "#292d2d", "#222525"]} position={[0, -.075, 0]} />
    <Notebook onOpen={onOpen} /><Laptop onOpen={onOpen} /><Camera onOpen={onOpen} /><Phone onOpen={onOpen} /><Cup onOpen={onOpen} /><Pen onOpen={onOpen} />
    <ContactShadows position={[0, -.06, 0]} opacity={.48} scale={9} blur={2.8} far={3.5} />
    <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={.62} maxPolarAngle={1.18} minAzimuthAngle={-.2} maxAzimuthAngle={.2} target={[0, 0, 0]} />
  </>;
}

export default function DeskScene({ onOpen }: Props) {
  return <Canvas shadows dpr={[1, 1.7]} camera={{ position: [0, 5.8, 7.4], fov: 36 }} gl={{ antialias: true, alpha: false }}>
    <Suspense fallback={null}><Scene onOpen={onOpen} /></Suspense>
  </Canvas>;
}
