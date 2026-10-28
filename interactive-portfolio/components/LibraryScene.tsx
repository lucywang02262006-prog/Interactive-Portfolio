"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Html,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";

type Position = [number, number, number];

const C = {
  wood: "#BE956A",
  woodLight: "#D7B48B",
  cream: "#FAF7F0",
  sage: "#A8BFA3",
  pink: "#E8C4C4",
  yellow: "#F3E5AB",
  lavender: "#D9D0E8",
  blue: "#AEC7CD",
  brown: "#594334",
  skin: "#EDC6A9",
};

const bookTitles = [
  ["About Lucy", "My Journey", "Resume"],
  ["Little Things", "Event Budget Manager", "Data & Insights"],
  ["The Product Lab", "Marketing Stories", "Creative Studio"],
  ["Work Diaries", "Leadership Notes"],
  ["My Toolbox", "Beyond the Screen"],
];

const bookColors = [
  C.sage,
  C.pink,
  C.yellow,
  C.lavender,
  C.blue,
];

function Box({
  position = [0, 0, 0],
  size,
  color,
  radius = 0.04,
}: {
  position?: Position;
  size: Position;
  color: string;
  radius?: number;
}) {
  return (
    <RoundedBox
      args={size}
      position={position}
      radius={radius}
      smoothness={3}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={color} roughness={0.92} />
    </RoundedBox>
  );
}

function Ball({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  radius = 0.1,
  color,
}: {
  position?: Position;
  scale?: Position;
  radius?: number;
  color: string;
}) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[radius, 16, 12]} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  );
}

function Book({
  title,
  position,
  color,
  index,
  onSelect,
}: {
  title: string;
  position: Position;
  color: string;
  index: number;
  onSelect: (title: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const height = 0.48 + (index % 3) * 0.055;

  return (
    <group
      position={position}
      rotation={[0, 0, index === 2 ? -0.07 : 0]}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(title);
      }}
    >
      <group position={[0, 0, hovered ? 0.12 : 0]}>
        <Box
          position={[0, height / 2, 0]}
          size={[0.16, height, 0.35]}
          color={color}
          radius={0.018}
        />

        {/* Spine details */}
        <Box
          position={[0, height - 0.07, 0.18]}
          size={[0.115, 0.012, 0.008]}
          color="#F9F1DC"
          radius={0.003}
        />
        <Box
          position={[0, 0.07, 0.18]}
          size={[0.115, 0.012, 0.008]}
          color="#F9F1DC"
          radius={0.003}
        />

        {hovered && (
          <Html
            position={[0, height + 0.12, 0.2]}
            center
            style={{ pointerEvents: "none" }}
          >
            <div
              style={{
                background: "#FAF7F0",
                color: "#4A403A",
                padding: "7px 11px",
                borderRadius: 8,
                whiteSpace: "nowrap",
                fontSize: 12,
                boxShadow: "0 4px 16px #4A403A20",
              }}
            >
              {title}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

function Plant({ position }: { position: Position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.085, 0.24, 12]} />
        <meshStandardMaterial color="#D2A68C" roughness={1} />
      </mesh>

      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.102, 0.102, 0.012, 12]} />
        <meshStandardMaterial color="#78604C" />
      </mesh>

      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;

        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[0.04, 0.36, 0]} rotation={[0, 0, -0.35]}>
              <cylinderGeometry args={[0.008, 0.008, 0.25, 6]} />
              <meshStandardMaterial color="#72866A" />
            </mesh>

            <Ball
              position={[0.1, 0.44, 0]}
              radius={0.1}
              scale={[0.65, 1.25, 0.35]}
              color={i % 2 ? "#8FA982" : C.sage}
            />
          </group>
        );
      })}
    </group>
  );
}

function Globe({ position }: { position: Position }) {
  return (
    <group position={position}>
      <Box size={[0.28, 0.05, 0.22]} position={[0, 0.025, 0]} color={C.wood} />
      <Box size={[0.035, 0.15, 0.035]} position={[0, 0.12, 0]} color={C.wood} />

      <group position={[0, 0.35, 0]} rotation={[0, 0, -0.2]}>
        <Ball radius={0.2} color={C.blue} />

        <Ball
          position={[-0.07, 0.07, 0.158]}
          radius={0.075}
          scale={[0.85, 1.2, 0.35]}
          color={C.sage}
        />
        <Ball
          position={[0.08, -0.065, 0.165]}
          radius={0.065}
          scale={[0.8, 1.3, 0.35]}
          color={C.sage}
        />

        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.225, 0.012, 6, 32]} />
          <meshStandardMaterial color={C.wood} roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

function Camera({ position }: { position: Position }) {
  return (
    <group position={position}>
      <Box size={[0.42, 0.25, 0.2]} position={[0, 0.125, 0]} color="#797C70" />
      <Box
        size={[0.16, 0.07, 0.15]}
        position={[-0.08, 0.28, 0]}
        color="#C8B79E"
      />

      <mesh position={[0.04, 0.13, 0.14]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.1, 16]} />
        <meshStandardMaterial color="#D9CBB5" roughness={0.8} />
      </mesh>

      <mesh position={[0.04, 0.13, 0.197]}>
        <circleGeometry args={[0.065, 16]} />
        <meshStandardMaterial color="#4F6266" roughness={0.45} />
      </mesh>
    </group>
  );
}

function Bunny({ position }: { position: Position }) {
  return (
    <group position={position}>
      <Ball position={[0, 0.15, 0]} radius={0.14} scale={[0.8, 1, 0.8]} color="#F0E6D8" />
      <Ball position={[0, 0.33, 0]} radius={0.12} color="#F0E6D8" />

      {[-1, 1].map((side) => (
        <group key={side}>
          <Ball
            position={[side * 0.055, 0.49, 0]}
            radius={0.1}
            scale={[0.34, 1.3, 0.4]}
            color="#F0E6D8"
          />
          <Ball
            position={[side * 0.055, 0.49, 0.035]}
            radius={0.08}
            scale={[0.2, 1.2, 0.14]}
            color={C.pink}
          />
          <Ball
            position={[side * 0.041, 0.35, 0.108]}
            radius={0.012}
            color={C.brown}
          />
        </group>
      ))}

      <Ball position={[0, 0.31, 0.12]} radius={0.016} color="#D7A6A3" />
    </group>
  );
}

function Clock({ position }: { position: Position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.1, 24]} />
        <meshStandardMaterial color={C.pink} roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.25, 0.056]}>
        <circleGeometry args={[0.18, 24]} />
        <meshStandardMaterial color={C.cream} />
      </mesh>

      <Box size={[0.014, 0.12, 0.01]} position={[0, 0.3, 0.07]} color={C.brown} />
      <Box size={[0.09, 0.014, 0.01]} position={[0.04, 0.25, 0.075]} color={C.brown} />

      {[-1, 1].map((side) => (
        <Box
          key={side}
          size={[0.05, 0.08, 0.08]}
          position={[side * 0.13, 0.04, 0]}
          color={C.wood}
        />
      ))}
    </group>
  );
}

function Bookshelf({ onSelect }: { onSelect: (title: string) => void }) {
  const levels = [0.18, 0.94, 1.7, 2.46, 3.22];

  return (
    <group position={[0.55, 0, 0]}>
      {/* Wooden frame */}
      <Box size={[0.15, 4.05, 0.7]} position={[-1.28, 2.05, 0]} color={C.wood} />
      <Box size={[0.15, 4.05, 0.7]} position={[1.28, 2.05, 0]} color={C.wood} />
      <Box size={[2.75, 0.16, 0.78]} position={[0, 4.03, 0]} color={C.woodLight} />
      <Box size={[2.46, 3.85, 0.07]} position={[0, 2.06, -0.32]} color="#D5B794" />

      {/* Five shelf boards */}
      {levels.map((y, row) => (
        <group key={row}>
          <Box
            size={[2.62, 0.1, 0.75]}
            position={[0, y, 0.015]}
            color={C.woodLight}
          />

          {bookTitles[row].map((title, index) => (
            <Book
              key={title}
              title={title}
              color={bookColors[(row + index) % bookColors.length]}
              index={row + index}
              position={[-0.99 + index * 0.2, y + 0.05, 0.08]}
              onSelect={onSelect}
            />
          ))}
        </group>
      ))}

      <Plant position={[0.68, levels[0] + 0.05, 0.06]} />
      <Camera position={[0.65, levels[1] + 0.05, 0.06]} />
      <Bunny position={[0.7, levels[2] + 0.05, 0.07]} />
      <Globe position={[0.7, levels[3] + 0.05, 0.03]} />
      <Clock position={[0.35, levels[4] + 0.05, 0.06]} />
      <Plant position={[0.94, levels[4] + 0.05, 0.03]} />

      <Box size={[0.19, 0.2, 0.45]} position={[-1.1, 0.05, 0]} color={C.wood} />
      <Box size={[0.19, 0.2, 0.45]} position={[1.1, 0.05, 0]} color={C.wood} />
    </group>
  );
}

function Limb({
  start,
  end,
  radius,
  color,
}: {
  start: Position;
  end: Position;
  radius: number;
  color: string;
}) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dz = end[2] - start[2];
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

  // Arms and legs in this illustration lie in the XY plane.
  const angle = Math.atan2(-dx, dy);

  return (
    <group
      position={[
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2,
      ]}
      rotation={[0, 0, angle]}
    >
      <mesh castShadow>
        <capsuleGeometry args={[radius, Math.max(0.01, length - radius * 2), 4, 8]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
    </group>
  );
}

function Lucy() {
  return (
    <group position={[-1.52, 0, 0.35]} rotation={[0, 0.12, -0.045]}>
      {/* Shoes */}
      <Box size={[0.22, 0.13, 0.4]} position={[-0.16, 0.08, 0.1]} color="#EDE3CF" />
      <Box size={[0.22, 0.13, 0.4]} position={[0.16, 0.08, 0.1]} color="#EDE3CF" />

      {/* Trousers */}
      <Limb start={[-0.15, 0.17, 0]} end={[-0.13, 1.11, 0]} radius={0.115} color="#91A28B" />
      <Limb start={[0.16, 0.17, 0]} end={[0.12, 1.11, 0]} radius={0.115} color="#91A28B" />
      <Box size={[0.5, 0.27, 0.33]} position={[0, 1.1, 0]} color="#91A28B" />

      {/* Sweater */}
      <Box size={[0.61, 0.7, 0.4]} position={[0, 1.57, 0]} color="#EFE5D2" radius={0.1} />

      {[1.36, 1.49, 1.62, 1.75].map((y) => (
        <Box
          key={y}
          size={[0.57, 0.035, 0.012]}
          position={[0, y, 0.205]}
          color={C.sage}
          radius={0.005}
        />
      ))}

      {/* Relaxed arms */}
      <Limb start={[-0.28, 1.8, 0]} end={[-0.43, 1.18, 0]} radius={0.1} color="#EFE5D2" />
      <Ball position={[-0.44, 1.12, 0]} radius={0.095} color={C.skin} />

      <Limb start={[0.28, 1.8, 0]} end={[0.52, 1.48, 0]} radius={0.1} color="#EFE5D2" />
      <Limb start={[0.52, 1.48, 0]} end={[0.76, 1.79, 0]} radius={0.085} color="#EFE5D2" />
      <Ball position={[0.79, 1.85, 0]} radius={0.09} color={C.skin} />

      {/* Neck, hair and face */}
      <Box size={[0.17, 0.22, 0.17]} position={[0, 1.97, 0]} color={C.skin} />
      <Ball position={[0, 2.3, -0.07]} radius={0.36} scale={[1, 1.18, 0.9]} color={C.brown} />
      <Ball position={[0, 2.28, 0.07]} radius={0.29} scale={[0.94, 1.12, 0.85]} color={C.skin} />

      {/* Fringe */}
      <Ball
        position={[-0.12, 2.52, 0.13]}
        radius={0.19}
        scale={[1.1, 0.65, 0.8]}
        color={C.brown}
      />
      <Ball
        position={[0.14, 2.5, 0.1]}
        radius={0.17}
        scale={[0.8, 0.8, 0.8]}
        color={C.brown}
      />

      {/* Eyes, nose and blush */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Ball position={[side * 0.09, 2.31, 0.302]} radius={0.018} color="#473D35" />
          <Ball
            position={[side * 0.145, 2.22, 0.275]}
            radius={0.035}
            scale={[1, 0.5, 0.25]}
            color="#E3A99D"
          />
        </group>
      ))}

      <Ball position={[0, 2.25, 0.325]} radius={0.027} color="#DBAD91" />

      <mesh position={[0, 2.18, 0.3]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.045, 0.008, 6, 12, Math.PI]} />
        <meshStandardMaterial color="#A16F60" />
      </mesh>
    </group>
  );
}

export default function LibraryScene({
  onSelect,
}: {
  onSelect: (title: string) => void;
}) {
  return (
    <div className="scene-canvas" aria-label="Lucy and her interactive 3D bookshelf">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [6.5, 4.2, 9], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        fallback={<p>Your browser does not support WebGL. Use the book buttons below.</p>}
      >
        <ambientLight intensity={1.5} />
        <hemisphereLight args={["#FFF5E4", "#B7BEAA", 1.3]} />

        <directionalLight
          position={[-3, 7, 6]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={6}
          shadow-camera-bottom={-2}
          shadow-normalBias={0.04}
        />

        <Suspense fallback={null}>
          <Bookshelf onSelect={onSelect} />
          <Lucy />

          <ContactShadows
            position={[0, -0.025, 0]}
            opacity={0.28}
            scale={10}
            blur={2.8}
            far={5}
            resolution={256}
            frames={1}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          target={[0, 2, 0]}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 5}
          maxAzimuthAngle={Math.PI / 5}
        />
      </Canvas>
    </div>
  );
}