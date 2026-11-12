import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { WorldTheme } from '../../types/quiz';

export interface Player3DData {
  id: string;
  name: string;
  avatar: string;
  x?: number;
  z?: number;
  jumping?: boolean;
  currentAnswer?: number | null;
  exploded?: boolean;
}

export type Arena3DMode = 'bomb_tag' | 'glass_bridge' | 'lava_tiles';

interface RobloxArena3DProps {
  phase: string;
  arenaMode?: Arena3DMode;
  worldTheme?: WorldTheme;
  bombHolderId?: string | null;
  explodedPlayerId?: string | null;
  isHost?: boolean;
  localPlayerId?: string | null;
  players: Player3DData[];
  correctIndex?: number | null;
  options?: string[];
  questionText?: string;
  timeLeft?: number;
  onMove?: (x: number, z: number, jumping: boolean, zoneIndex: number | null) => void;
  onSelectZone?: (zoneIndex: number) => void;
  selectedZone?: number | null;
}

const QUADRANT_CONFIGS = [
  { index: 0, x: -6, z: -6, glassX: -7.2, bombX: -7.5, bombZ: -7.5, color: 0xef4444, hex: '#ef4444', shape: '▲', label: 'Merah' },
  { index: 1, x: 6, z: -6, glassX: -2.4, bombX: 7.5, bombZ: -7.5, color: 0x3b82f6, hex: '#3b82f6', shape: '◆', label: 'Biru' },
  { index: 2, x: -6, z: 6, glassX: 2.4, bombX: -7.5, bombZ: 7.5, color: 0xf59e0b, hex: '#f59e0b', shape: '●', label: 'Kuning' },
  { index: 3, x: 6, z: 6, glassX: 7.2, bombX: 7.5, bombZ: 7.5, color: 0x10b981, hex: '#10b981', shape: '■', label: 'Hijau' },
];

const TORSO_COLORS = [
  0xec4899, 0x8b5cf6, 0x06b6d4, 0xf97316, 0x14b8a6,
  0xa855f7, 0x3b82f6, 0x10b981, 0xf43f5e, 0x6366f1
];

export default function RobloxArena3D({
  phase,
  arenaMode = 'bomb_tag',
  worldTheme = 'arcade',
  bombHolderId = null,
  explodedPlayerId = null,
  isHost = false,
  localPlayerId,
  players,
  correctIndex,
  options = [],
  questionText,
  timeLeft,
  onMove,
  onSelectZone,
  selectedZone = null,
}: RobloxArena3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Local movement state
  const isGlassBridge = arenaMode === 'glass_bridge';
  const isBombTag = arenaMode === 'bomb_tag';

  const localPosRef = useRef<{ x: number; z: number; y: number; vy: number; jumping: boolean }>({
    x: 0,
    z: isGlassBridge ? 7.2 : 0,
    y: 0.5,
    vy: 0,
    jumping: false,
  });

  const keysRef = useRef<{ w: boolean; a: boolean; s: boolean; d: boolean; space: boolean }>({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
  });

  const [currentStandingZone, setCurrentStandingZone] = useState<number | null>(selectedZone);
  const [isIsometric, setIsIsometric] = useState(true);
  const isIsometricRef = useRef(true);
  isIsometricRef.current = isIsometric;

  // Latest props stored in refs for the 60fps render loop
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const arenaModeRef = useRef(arenaMode);
  arenaModeRef.current = arenaMode;

  const bombHolderIdRef = useRef(bombHolderId);
  bombHolderIdRef.current = bombHolderId;

  const explodedPlayerIdRef = useRef(explodedPlayerId);
  explodedPlayerIdRef.current = explodedPlayerId;

  const correctIndexRef = useRef(correctIndex);
  correctIndexRef.current = correctIndex;

  const playersRef = useRef(players);
  playersRef.current = players;

  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Touch button quick jump/run
  const moveToZone = (zoneIdx: number) => {
    const q = QUADRANT_CONFIGS[zoneIdx];
    if (q) {
      if (arenaMode === 'glass_bridge') {
        localPosRef.current.x = q.glassX + (Math.random() - 0.5) * 0.6;
        localPosRef.current.z = 0 + (Math.random() - 0.5) * 0.8;
      } else if (arenaMode === 'bomb_tag') {
        localPosRef.current.x = q.bombX + (Math.random() - 0.5) * 1.5;
        localPosRef.current.z = q.bombZ + (Math.random() - 0.5) * 1.5;
      } else {
        localPosRef.current.x = q.x + (Math.random() - 0.5) * 2;
        localPosRef.current.z = q.z + (Math.random() - 0.5) * 2;
      }
      localPosRef.current.vy = 0.25; // small hop
      localPosRef.current.jumping = true;
      setCurrentStandingZone(zoneIdx);
      if (onSelectZone) onSelectZone(zoneIdx);
      if (onMove) onMove(localPosRef.current.x, localPosRef.current.z, true, zoneIdx);
    }
  };

  const triggerJump = () => {
    if (localPosRef.current.y <= 0.55) {
      localPosRef.current.vy = 0.28;
      localPosRef.current.jumping = true;
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    // Reset local position when mode changes
    localPosRef.current.x = (Math.random() - 0.5) * 2;
    localPosRef.current.z = arenaMode === 'glass_bridge' ? 7.2 : 0;
    localPosRef.current.y = 0.5;
    localPosRef.current.vy = 0;
    localPosRef.current.jumping = false;

    // 1. Scene & Camera Setup
    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const isBridge = arenaMode === 'glass_bridge';
    const isBomb = arenaMode === 'bomb_tag';

    const isPirate = worldTheme === 'pirate';
    const isSpace = worldTheme === 'space';
    const isCastle = worldTheme === 'castle';

    if (isSpace) {
      scene.background = new THREE.Color(0x030712); // cosmic void
      scene.fog = new THREE.FogExp2(0x030712, 0.008);
    } else if (isPirate) {
      scene.background = new THREE.Color(0x082f49); // ocean twilight sky
      scene.fog = new THREE.FogExp2(0x082f49, 0.012);
    } else if (isCastle) {
      scene.background = new THREE.Color(0x111827); // medieval fortress night
      scene.fog = new THREE.FogExp2(0x111827, 0.014);
    } else {
      if (isBridge) {
        scene.background = new THREE.Color(0x090d16); // deep cyber abyss
        scene.fog = new THREE.FogExp2(0x090d16, 0.016);
      } else if (isBomb) {
        scene.background = new THREE.Color(0x09090b); // dark industrial arena
        scene.fog = new THREE.FogExp2(0x09090b, 0.015);
      } else {
        scene.background = new THREE.Color(0x0b0f19); // arcade dark slate
        scene.fog = new THREE.FogExp2(0x0b0f19, 0.015);
      }
    }

    // Adaptive Frustum Size for Isometric Orthographic Camera
    const frustumSize = isBomb ? 20 : (isBridge ? 24 : 22);
    const aspect = width / height;

    const orthoCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      -100,
      200
    );

    if (isBridge) {
      orthoCamera.position.set(22, 20, 18);
      orthoCamera.lookAt(0, 0, -3);
    } else {
      orthoCamera.position.set(20, 20, 20);
      orthoCamera.lookAt(0, 0, 0);
    }

    const perspCamera = new THREE.PerspectiveCamera(48, width / height, 0.1, 500);
    if (isBridge) {
      perspCamera.position.set(0, 15.5, 17.5);
      perspCamera.lookAt(0, -0.6, -0.5);
    } else if (isBomb) {
      perspCamera.position.set(0, 20.5, 22.5);
      perspCamera.lookAt(0, -0.5, 0);
    } else {
      perspCamera.position.set(0, 20, 23);
      perspCamera.lookAt(0, -0.5, 0);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting with Isometric accentuation
    const ambientLight = new THREE.AmbientLight(0xffffff, isBridge ? 0.95 : (isBomb ? 1.05 : 0.85));
    scene.add(ambientLight);

    // Primary directional light placed along the isometric diagonal to highlight top and side faces distinctly
    const dirLight = new THREE.DirectionalLight(0xffffff, isBridge ? 1.4 : (isBomb ? 1.5 : 1.2));
    dirLight.position.set(24, 36, 24);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 120;
    dirLight.shadow.camera.left = -22;
    dirLight.shadow.camera.right = 22;
    dirLight.shadow.camera.top = 22;
    dirLight.shadow.camera.bottom = -22;
    scene.add(dirLight);

    // Secondary fill light for soft isometric block edges
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 0.4);
    fillLight.position.set(-20, 15, -20);
    scene.add(fillLight);

    // Dynamic light underneath themed
    const underLightColor = isSpace ? 0x06b6d4 : (isPirate ? 0x0284c7 : (isCastle ? 0x064e3b : (isBridge ? 0x6366f1 : (isBomb ? 0xf59e0b : 0xff3b00))));
    const underLight = new THREE.PointLight(
      underLightColor,
      isBridge ? 2.5 : (isBomb ? 2.0 : 2.5),
      70
    );
    underLight.position.set(0, -3.5, 0);
    scene.add(underLight);

    // Meshes references for animations
    const interactiveMeshes: THREE.Mesh[] = [];
    const canvasTextures: THREE.CanvasTexture[] = [];
    let trophyGroup: THREE.Group | null = null;
    let lavaMesh: THREE.Mesh | null = null;

    // Theme Specific References
    const sharkFins: THREE.Mesh[] = [];
    let starField: THREE.Points | null = null;
    let orbitalRing: THREE.Mesh | null = null;
    const torchLights: THREE.PointLight[] = [];
    const torchFlames: THREE.Mesh[] = [];

    // Bomb Tag Specific References
    let bombGroup: THREE.Group | null = null;
    let bombCoreMesh: THREE.Mesh | null = null;
    let bombLight: THREE.PointLight | null = null;
    let bombFloorRing: THREE.Mesh | null = null;
    let explosionFireball: THREE.Mesh | null = null;

    // Helper: Texture generator for Answer Panels
    const createPanelTexture = (shape: string, label: string, hexColor: string, optionText: string, isGlass: boolean) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (isGlass) {
          ctx.fillStyle = hexColor;
          ctx.fillRect(0, 0, 512, 512);

          const grad = ctx.createLinearGradient(0, 0, 512, 512);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
          grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
          grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 512, 512);

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 16;
          ctx.strokeRect(16, 16, 480, 480);
        } else {
          ctx.fillStyle = hexColor;
          ctx.fillRect(0, 0, 512, 512);
          ctx.strokeStyle = 'rgba(255,255,255,0.45)';
          ctx.lineWidth = 14;
          ctx.strokeRect(20, 20, 472, 472);
          ctx.fillStyle = 'rgba(0,0,0,0.15)';
          ctx.fillRect(30, 30, 452, 452);
        }

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 140px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 12;
        ctx.fillText(shape, 256, 170);

        ctx.font = 'bold 44px Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.fillText(label, 256, 265);

        if (optionText) {
          ctx.font = 'bold 28px Arial, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 6;
          const words = optionText.split(' ');
          let line1 = '';
          let line2 = '';
          for (const w of words) {
            if ((line1 + ' ' + w).length <= 22) line1 += (line1 ? ' ' : '') + w;
            else if ((line2 + ' ' + w).length <= 24) line2 += (line2 ? ' ' : '') + w;
          }
          ctx.fillText(line1, 256, 345);
          if (line2) ctx.fillText(line2, 256, 385);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      canvasTextures.push(tex);
      return tex;
    };

    if (isBomb) {
      // -------------------------------------------------------------
      // 3A. BOMB TAG ARENA (Hot Potato Trivia Mode)
      // -------------------------------------------------------------
      // Main Ground Platform: 24x24 arena with World Theme styling
      const floorColor = isPirate ? 0x78350f : (isSpace ? 0x1e293b : (isCastle ? 0x334155 : 0x18181b));
      const floorGeo = new THREE.BoxGeometry(24, 0.8, 24);
      const floorMat = new THREE.MeshStandardMaterial({
        color: floorColor,
        roughness: isSpace ? 0.3 : 0.6,
        metalness: isSpace ? 0.6 : 0.2,
      });
      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.position.set(0, -0.4, 0);
      floorMesh.receiveShadow = true;
      scene.add(floorMesh);

      // Hazard / Accent Perimeter Bars
      const hazardColor = isPirate ? 0xf59e0b : (isSpace ? 0x06b6d4 : (isCastle ? 0xb45309 : 0xeab308));
      const borderThickness = 0.35;
      const borderHeight = 0.45;
      const borderMat = new THREE.MeshStandardMaterial({ color: hazardColor, roughness: 0.4, metalness: 0.4 });

      // North & South borders
      [-12, 12].forEach(bz => {
        const bGeo = new THREE.BoxGeometry(24.4, borderHeight, borderThickness);
        const bMesh = new THREE.Mesh(bGeo, borderMat);
        bMesh.position.set(0, borderHeight / 2, bz);
        scene.add(bMesh);
      });
      // East & West borders
      [-12, 12].forEach(bx => {
        const bGeo = new THREE.BoxGeometry(borderThickness, borderHeight, 24.4);
        const bMesh = new THREE.Mesh(bGeo, borderMat);
        bMesh.position.set(bx, borderHeight / 2, 0);
        scene.add(bMesh);
      });

      // Central estafet area grid circle / ring
      const ringHelper = new THREE.GridHelper(10, 10, 0xf59e0b, 0x3f3f46);
      ringHelper.position.y = 0.02;
      scene.add(ringHelper);

      // Center decorative warning emblem
      const emblemCanvas = document.createElement('canvas');
      emblemCanvas.width = 256;
      emblemCanvas.height = 256;
      const ectx = emblemCanvas.getContext('2d');
      if (ectx) {
        ectx.fillStyle = '#18181b';
        ectx.fillRect(0, 0, 256, 256);
        ectx.strokeStyle = '#eab308';
        ectx.lineWidth = 10;
        ectx.strokeRect(15, 15, 226, 226);
        ectx.font = 'bold 54px Arial, sans-serif';
        ectx.fillStyle = '#ef4444';
        ectx.textAlign = 'center';
        ectx.fillText('💣', 128, 110);
        ectx.font = 'bold 24px Arial, sans-serif';
        ectx.fillStyle = '#facc15';
        ectx.fillText('BOMB TAG', 128, 165);
        ectx.font = 'bold 16px Arial, sans-serif';
        ectx.fillStyle = '#94a3b8';
        ectx.fillText('ESTAFET ZONE', 128, 200);
      }
      const emblemTex = new THREE.CanvasTexture(emblemCanvas);
      canvasTextures.push(emblemTex);
      const emblemGeo = new THREE.PlaneGeometry(4.2, 4.2);
      const emblemMat = new THREE.MeshBasicMaterial({ map: emblemTex, transparent: true, opacity: 0.85 });
      const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
      emblemMesh.rotation.x = -Math.PI / 2;
      emblemMesh.position.set(0, 0.03, 0);
      scene.add(emblemMesh);

      // 4 Elevated Corner Answer Pads
      QUADRANT_CONFIGS.forEach((q, idx) => {
        const padGeo = new THREE.BoxGeometry(6.6, 0.45, 6.6);
        const currentOpt = options[idx] || '';
        const padTex = createPanelTexture(q.shape, q.label, q.hex, currentOpt, false);

        const padBaseMat = new THREE.MeshStandardMaterial({
          color: q.color,
          roughness: 0.4,
          metalness: 0.3,
        });

        const padTopMat = new THREE.MeshBasicMaterial({
          map: padTex,
        });

        const materials = [
          padBaseMat, padBaseMat, padTopMat, padBaseMat, padBaseMat, padBaseMat
        ];

        const padMesh = new THREE.Mesh(padGeo, materials);
        padMesh.position.set(q.bombX, 0.12, q.bombZ);
        padMesh.castShadow = true;
        padMesh.receiveShadow = true;
        scene.add(padMesh);
        interactiveMeshes.push(padMesh);

        // Corner beacon light
        const padLight = new THREE.PointLight(q.color, 1.2, 8);
        padLight.position.set(q.bombX, 1.2, q.bombZ);
        scene.add(padLight);
      });

      // 3D Cartoon Bomb Group
      bombGroup = new THREE.Group();
      bombGroup.visible = false;

      // Metallic black sphere
      const bombMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.25,
        metalness: 0.85,
      });
      bombCoreMesh = new THREE.Mesh(new THREE.SphereGeometry(0.46, 20, 20), bombMat);
      bombCoreMesh.castShadow = true;
      bombGroup.add(bombCoreMesh);

      // Fuse cylinder
      const fuseGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.26, 8);
      const fuseMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
      const fuseMesh = new THREE.Mesh(fuseGeo, fuseMat);
      fuseMesh.position.set(0, 0.52, 0);
      bombGroup.add(fuseMesh);

      // Spark sphere (emissive flame)
      const sparkGeo = new THREE.SphereGeometry(0.12, 10, 10);
      const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffdd00 });
      const sparkMesh = new THREE.Mesh(sparkGeo, sparkMat);
      sparkMesh.position.set(0, 0.68, 0);
      bombGroup.add(sparkMesh);

      // Bomb Red Flashing PointLight
      bombLight = new THREE.PointLight(0xef4444, 2.5, 6);
      bombLight.position.set(0, 0.6, 0);
      bombGroup.add(bombLight);

      scene.add(bombGroup);

      // Bomb Floor Danger Ring (Under the feet of the bomb holder)
      const ringGeo = new THREE.RingGeometry(0.85, 1.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      bombFloorRing = new THREE.Mesh(ringGeo, ringMat);
      bombFloorRing.rotation.x = -Math.PI / 2;
      bombFloorRing.position.set(0, 0.04, 0);
      bombFloorRing.visible = false;
      scene.add(bombFloorRing);

      // Explosion Fireball (Hidden until REVIEW phase explosion)
      const fireGeo = new THREE.SphereGeometry(2.4, 24, 24);
      const fireMat = new THREE.MeshStandardMaterial({
        color: 0xff3b00,
        emissive: 0xff2200,
        emissiveIntensity: 1.6,
        roughness: 0.2,
        transparent: true,
        opacity: 0.92,
      });
      explosionFireball = new THREE.Mesh(fireGeo, fireMat);
      explosionFireball.position.set(0, 1.5, 0);
      explosionFireball.scale.set(0.01, 0.01, 0.01);
      explosionFireball.visible = false;
      scene.add(explosionFireball);

    } else if (isBridge) {
      // -------------------------------------------------------------
      // 3B. GLASS BRIDGE GEOMETRY (Squid Game / Bridge Trivia Mode)
      // -------------------------------------------------------------
      const abyssColor = isPirate ? 0x0284c7 : (isSpace ? 0x030712 : (isCastle ? 0x134e4a : 0x050811));
      const abyssGeo = new THREE.PlaneGeometry(160, 160);
      const abyssMat = new THREE.MeshBasicMaterial({ color: abyssColor });
      const abyssMesh = new THREE.Mesh(abyssGeo, abyssMat);
      abyssMesh.rotation.x = -Math.PI / 2;
      abyssMesh.position.y = -8.5;
      scene.add(abyssMesh);

      const gridHelper = new THREE.GridHelper(120, 36, isSpace ? 0x06b6d4 : (isPirate ? 0x38bdf8 : 0x6366f1), 0x1e1b4b);
      gridHelper.position.y = -8.2;
      scene.add(gridHelper);

      // Start Platform with Theme styling
      const startColor = isPirate ? 0x78350f : (isSpace ? 0x1e293b : (isCastle ? 0x334155 : 0x1e293b));
      const startPlatformGeo = new THREE.BoxGeometry(20, 0.8, 4.5);
      const startPlatformMat = new THREE.MeshStandardMaterial({
        color: startColor,
        roughness: 0.4,
        metalness: isSpace ? 0.6 : 0.3,
      });
      const startPlatform = new THREE.Mesh(startPlatformGeo, startPlatformMat);
      startPlatform.position.set(0, 0, 7.2);
      startPlatform.receiveShadow = true;
      scene.add(startPlatform);

      // Start Neon Edge line
      const neonColor = isPirate ? 0xf59e0b : (isSpace ? 0x06b6d4 : (isCastle ? 0xb45309 : 0xa855f7));
      const startNeonGeo = new THREE.BoxGeometry(20.1, 0.08, 0.15);
      const startNeonMat = new THREE.MeshBasicMaterial({ color: neonColor });
      const startNeon = new THREE.Mesh(startNeonGeo, startNeonMat);
      startNeon.position.set(0, 0.42, 5.0);
      scene.add(startNeon);

      // Goal Platform
      const goalPlatformGeo = new THREE.BoxGeometry(20, 0.8, 4.5);
      const goalPlatformMat = new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        roughness: 0.35,
        metalness: 0.4,
      });
      const goalPlatform = new THREE.Mesh(goalPlatformGeo, goalPlatformMat);
      goalPlatform.position.set(0, 0, -8.2);
      goalPlatform.receiveShadow = true;
      scene.add(goalPlatform);

      // Goal Neon Edge line
      const goalNeonGeo = new THREE.BoxGeometry(20.1, 0.08, 0.15);
      const goalNeonMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const goalNeon = new THREE.Mesh(goalNeonGeo, goalNeonMat);
      goalNeon.position.set(0, 0.42, -6.0);
      scene.add(goalNeon);

      // 3D Gold Trophy
      trophyGroup = new THREE.Group();
      trophyGroup.position.set(0, 1.4, -8.2);
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0xca8a04,
        emissiveIntensity: 0.35,
        roughness: 0.15,
        metalness: 0.85,
      });

      const tBase = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 0.35, 16), goldMat);
      tBase.position.y = -0.55;
      trophyGroup.add(tBase);

      const tStem = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 0.5, 16), goldMat);
      tStem.position.y = -0.15;
      trophyGroup.add(tStem);

      const tCup = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.4, 0.9, 16), goldMat);
      tCup.position.y = 0.45;
      trophyGroup.add(tCup);

      const handleGeo = new THREE.TorusGeometry(0.35, 0.07, 10, 16, Math.PI);
      const tHandleL = new THREE.Mesh(handleGeo, goldMat);
      tHandleL.position.set(-0.7, 0.45, 0);
      tHandleL.rotation.z = Math.PI / 2;
      trophyGroup.add(tHandleL);

      const tHandleR = new THREE.Mesh(handleGeo, goldMat);
      tHandleR.position.set(0.7, 0.45, 0);
      tHandleR.rotation.z = -Math.PI / 2;
      trophyGroup.add(tHandleR);

      scene.add(trophyGroup);

      // Neon Rails
      const railGeo = new THREE.BoxGeometry(0.3, 0.3, 19.5);
      const railMatL = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      const railMeshL = new THREE.Mesh(railGeo, railMatL);
      railMeshL.position.set(-10.2, 1.2, -0.5);
      scene.add(railMeshL);

      const railMatR = new THREE.MeshBasicMaterial({ color: 0xec4899 });
      const railMeshR = new THREE.Mesh(railGeo, railMatR);
      railMeshR.position.set(10.2, 1.2, -0.5);
      scene.add(railMeshR);

      // Vertical Rail Posts
      [-8.2, -4.6, 0, 5.0, 7.2].forEach(pz => {
        const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.0, 8);
        const postMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6 });
        const postL = new THREE.Mesh(postGeo, postMat);
        postL.position.set(-10.2, 0.4, pz);
        scene.add(postL);

        const postR = new THREE.Mesh(postGeo, postMat);
        postR.position.set(10.2, 0.4, pz);
        scene.add(postR);
      });

      // 4 Main Interactive Glass Panels
      QUADRANT_CONFIGS.forEach((q, idx) => {
        const panelGeo = new THREE.BoxGeometry(4.2, 0.32, 6.0);
        const currentOpt = options[idx] || '';
        const panelTex = createPanelTexture(q.shape, q.label, q.hex, currentOpt, true);

        const glassMat = new THREE.MeshStandardMaterial({
          color: q.color,
          roughness: 0.1,
          metalness: 0.2,
          transparent: true,
          opacity: 0.82,
        });

        const topMat = new THREE.MeshBasicMaterial({
          map: panelTex,
          transparent: true,
          opacity: 0.94,
        });

        const materials = [
          glassMat, glassMat, topMat, glassMat, glassMat, glassMat
        ];

        const panelMesh = new THREE.Mesh(panelGeo, materials);
        panelMesh.position.set(q.glassX, 0.05, 0);
        panelMesh.castShadow = true;
        panelMesh.receiveShadow = true;
        scene.add(panelMesh);
        interactiveMeshes.push(panelMesh);

        const frameGeo = new THREE.BoxGeometry(4.35, 0.12, 6.15);
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
        const frameMesh = new THREE.Mesh(frameGeo, frameMat);
        frameMesh.position.set(0, -0.22, 0);
        panelMesh.add(frameMesh);
      });

      // 4 Decorative Extension Glass Panels
      QUADRANT_CONFIGS.forEach((q) => {
        const extGeo = new THREE.BoxGeometry(4.2, 0.25, 2.8);
        const extMat = new THREE.MeshStandardMaterial({
          color: q.color,
          roughness: 0.15,
          metalness: 0.2,
          transparent: true,
          opacity: 0.65,
        });
        const extMesh = new THREE.Mesh(extGeo, extMat);
        extMesh.position.set(q.glassX, 0.02, -4.6);
        scene.add(extMesh);
      });

    } else {
      // -------------------------------------------------------------
      // 3C. LAVA TILES ARENA (Classic Answer or Fall Mode)
      // -------------------------------------------------------------
      const lavaGeo = new THREE.PlaneGeometry(120, 120, 16, 16);
      const lavaColor = isPirate ? 0x0284c7 : (isSpace ? 0x030712 : (isCastle ? 0x134e4a : 0xff3300));
      const emissiveColor = isPirate ? 0x0369a1 : (isSpace ? 0x020617 : (isCastle ? 0x064e3b : 0xff2200));
      const lavaMat = new THREE.MeshStandardMaterial({
        color: lavaColor,
        emissive: emissiveColor,
        emissiveIntensity: isSpace ? 0.2 : (isPirate ? 0.45 : 0.8),
        roughness: isPirate ? 0.15 : 0.3,
        metalness: isPirate ? 0.4 : 0.1,
      });
      lavaMesh = new THREE.Mesh(lavaGeo, lavaMat);
      lavaMesh.rotation.x = -Math.PI / 2;
      lavaMesh.position.y = -4.5;
      scene.add(lavaMesh);

      // Center Neutral Spawn Pad
      const centerPadColor = isPirate ? 0x78350f : (isSpace ? 0x1e293b : (isCastle ? 0x334155 : 0x1e293b));
      const centerPadGeo = new THREE.BoxGeometry(3.6, 0.9, 3.6);
      const centerPadMat = new THREE.MeshStandardMaterial({
        color: centerPadColor,
        roughness: 0.5,
        metalness: isSpace ? 0.6 : 0.4,
      });
      const centerPad = new THREE.Mesh(centerPadGeo, centerPadMat);
      centerPad.position.set(0, 0.05, 0);
      centerPad.receiveShadow = true;
      scene.add(centerPad);

      const centerCanvas = document.createElement('canvas');
      centerCanvas.width = 256;
      centerCanvas.height = 256;
      const cctx = centerCanvas.getContext('2d');
      if (cctx) {
        cctx.fillStyle = '#1e293b';
        cctx.fillRect(0, 0, 256, 256);
        cctx.strokeStyle = '#a855f7';
        cctx.lineWidth = 10;
        cctx.strokeRect(15, 15, 226, 226);
        cctx.font = 'bold 36px Arial, sans-serif';
        cctx.fillStyle = '#ffffff';
        cctx.textAlign = 'center';
        cctx.fillText('SPAWN', 128, 120);
        cctx.font = 'bold 22px Arial, sans-serif';
        cctx.fillStyle = '#c084fc';
        cctx.fillText('Arena Pad', 128, 165);
      }
      const centerTex = new THREE.CanvasTexture(centerCanvas);
      canvasTextures.push(centerTex);
      const centerTopMat = new THREE.MeshBasicMaterial({ map: centerTex });
      centerPad.material = [
        centerPadMat, centerPadMat, centerTopMat, centerPadMat, centerPadMat, centerPadMat
      ];

      // 4 Color Quadrants
      QUADRANT_CONFIGS.forEach((q, idx) => {
        const tileGeo = new THREE.BoxGeometry(11, 0.8, 11);
        const currentOpt = options[idx] || '';
        const tileTex = createPanelTexture(q.shape, q.label, q.hex, currentOpt, false);

        const tileBaseMat = new THREE.MeshStandardMaterial({
          color: q.color,
          roughness: 0.5,
          metalness: 0.2,
        });

        const tileTopMat = new THREE.MeshBasicMaterial({
          map: tileTex,
        });

        const materials = [
          tileBaseMat, tileBaseMat, tileTopMat, tileBaseMat, tileBaseMat, tileBaseMat
        ];

        const tileMesh = new THREE.Mesh(tileGeo, materials);
        tileMesh.position.set(q.x, 0, q.z);
        tileMesh.castShadow = true;
        tileMesh.receiveShadow = true;
        scene.add(tileMesh);
        interactiveMeshes.push(tileMesh);
      });
    }

    // -------------------------------------------------------------
    // 3D. WORLD THEME DECORATIVE ENVIRONMENT ELEMENTS
    // -------------------------------------------------------------
    // 1. Pirate Theme: 3 Animated Shark Fins swimming in the waters
    if (isPirate) {
      const finMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35, metalness: 0.2 });
      for (let i = 0; i < 3; i++) {
        const finGeo = new THREE.ConeGeometry(0.5, 1.25, 4);
        finGeo.rotateX(0.28);
        const fin = new THREE.Mesh(finGeo, finMat);
        fin.castShadow = true;
        scene.add(fin);
        sharkFins.push(fin);
      }
    }

    // 2. Space Theme: Cosmic Starfield Points & Rotating Orbital Ring
    if (isSpace) {
      const starGeo = new THREE.BufferGeometry();
      const starCount = 350;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i += 3) {
        starPos[i] = (Math.random() - 0.5) * 160;
        starPos[i + 1] = Math.random() * 80 - 15;
        starPos[i + 2] = (Math.random() - 0.5) * 160;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({ color: 0x67e8f9, size: 1.1, transparent: true, opacity: 0.85 });
      starField = new THREE.Points(starGeo, starMat);
      scene.add(starField);

      const ringGeo = new THREE.TorusGeometry(19, 0.22, 8, 48);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0891b2,
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.8
      });
      orbitalRing = new THREE.Mesh(ringGeo, ringMat);
      orbitalRing.rotation.x = Math.PI / 3.2;
      scene.add(orbitalRing);
    }

    // 3. Castle Theme: 4 Flaming Torch Pillars at the Stage Corners
    if (isCastle) {
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7, metalness: 0.2 });
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
      const torchCoords = [
        { x: -11.5, z: -11.5 },
        { x: 11.5, z: -11.5 },
        { x: -11.5, z: 11.5 },
        { x: 11.5, z: 11.5 }
      ];
      torchCoords.forEach(c => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 2.4, 8), stoneMat);
        pillar.position.set(c.x, 0.8, c.z);
        pillar.castShadow = true;
        scene.add(pillar);

        const flame = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 1), flameMat);
        flame.position.set(c.x, 2.2, c.z);
        scene.add(flame);
        torchFlames.push(flame);

        const tLight = new THREE.PointLight(0xf97316, 2.0, 16);
        tLight.position.set(c.x, 2.4, c.z);
        scene.add(tLight);
        torchLights.push(tLight);
      });
    }

    // 6. Character Factory (Roblox Blocky Character with Limbs & Nametag Sprite)
    const characterGroups = new Map<string, THREE.Group>();

    const createRobloxCharacter = (nameText: string, avatarEmoji: string, torsoHex: number) => {
      const group = new THREE.Group();

      // Torso
      const torsoMat = new THREE.MeshStandardMaterial({ color: torsoHex, roughness: 0.4 });
      const torso = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.2, 0.6), torsoMat);
      torso.position.y = 1.0;
      torso.castShadow = true;
      group.add(torso);

      // Yellow Roblox Head
      const headMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), headMat);
      head.position.y = 1.95;
      head.castShadow = true;
      group.add(head);

      // Face feature
      const faceCanvas = document.createElement('canvas');
      faceCanvas.width = 128;
      faceCanvas.height = 128;
      const fctx = faceCanvas.getContext('2d');
      if (fctx) {
        fctx.fillStyle = '#facc15';
        fctx.fillRect(0, 0, 128, 128);
        fctx.fillStyle = '#1e1b4b';
        fctx.beginPath();
        fctx.arc(40, 50, 8, 0, Math.PI * 2);
        fctx.arc(88, 50, 8, 0, Math.PI * 2);
        fctx.fill();
        fctx.beginPath();
        fctx.arc(64, 75, 20, 0, Math.PI);
        fctx.lineWidth = 5;
        fctx.stroke();
      }
      const faceTex = new THREE.CanvasTexture(faceCanvas);
      canvasTextures.push(faceTex);
      const faceMat = new THREE.MeshBasicMaterial({ map: faceTex });
      const faceMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.68, 0.68), faceMat);
      faceMesh.position.set(0, 1.95, 0.355);
      group.add(faceMesh);

      // Arms
      const armMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
      const armGeo = new THREE.BoxGeometry(0.38, 1.0, 0.4);

      const leftArm = new THREE.Mesh(armGeo, armMat);
      leftArm.position.set(-0.75, 1.0, 0);
      leftArm.castShadow = true;
      group.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, armMat);
      rightArm.position.set(0.75, 1.0, 0);
      rightArm.castShadow = true;
      group.add(rightArm);

      // Legs
      const legMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 });
      const legGeo = new THREE.BoxGeometry(0.42, 1.0, 0.45);

      const leftLeg = new THREE.Mesh(legGeo, legMat);
      leftLeg.position.set(-0.25, 0.4, 0);
      leftLeg.castShadow = true;
      group.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, legMat);
      rightLeg.position.set(0.25, 0.4, 0);
      rightLeg.castShadow = true;
      group.add(rightLeg);

      // Floating Nametag Sprite ({avatar} {name})
      const tagCanvas = document.createElement('canvas');
      tagCanvas.width = 384;
      tagCanvas.height = 96;
      const tctx = tagCanvas.getContext('2d');
      if (tctx) {
        tctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        tctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        tctx.lineWidth = 4;
        tctx.beginPath();
        tctx.roundRect(8, 8, 368, 80, 24);
        tctx.fill();
        tctx.stroke();

        tctx.font = 'bold 36px Arial, sans-serif';
        tctx.fillStyle = '#ffffff';
        tctx.textAlign = 'center';
        tctx.textBaseline = 'middle';
        tctx.fillText(`${avatarEmoji} ${nameText}`, 192, 48);
      }
      const tagTex = new THREE.CanvasTexture(tagCanvas);
      canvasTextures.push(tagTex);
      const tagMat = new THREE.SpriteMaterial({ map: tagTex, depthTest: false });
      const tagSprite = new THREE.Sprite(tagMat);
      tagSprite.position.set(0, 2.8, 0);
      tagSprite.scale.set(2.8, 0.7, 1);
      group.add(tagSprite);

      group.userData = {
        leftArm,
        rightArm,
        leftLeg,
        rightLeg,
        avatarEmoji,
        nameText,
      };

      return group;
    };

    // If Bomb Tag mode: add RoboTarget bot character to scene
    let botGroup: THREE.Group | null = null;
    if (isBomb) {
      botGroup = createRobloxCharacter('RoboTarget', '🤖', 0x06b6d4);
      scene.add(botGroup);
    }

    // 7. Input Event Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') keysRef.current.w = true;
      if (key === 's' || key === 'arrowdown') keysRef.current.s = true;
      if (key === 'a' || key === 'arrowleft') keysRef.current.a = true;
      if (key === 'd' || key === 'arrowright') keysRef.current.d = true;
      if (key === ' ' || key === 'spacebar') {
        keysRef.current.space = true;
        triggerJump();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') keysRef.current.w = false;
      if (key === 's' || key === 'arrowdown') keysRef.current.s = false;
      if (key === 'a' || key === 'arrowleft') keysRef.current.a = false;
      if (key === 'd' || key === 'arrowright') keysRef.current.d = false;
      if (key === ' ' || key === 'spacebar') keysRef.current.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 8. 60 FPS Animation Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let lastNetworkSend = 0;
    let lastZoneDetected: number | null = null;

    const animate = (timeNow: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((timeNow - lastTime) / 1000, 0.1);
      lastTime = timeNow;
      const time = timeNow * 0.001;

      // Rotate Trophy if in Glass Bridge
      if (trophyGroup) {
        trophyGroup.rotation.y += 0.025;
      }

      // Animate Lava if in Lava Tiles
      if (lavaMesh) {
        lavaMesh.position.y = -4.5 + Math.sin(time * 2.5) * 0.18;
      }

      // Local player physics & movement
      const speed = 8.5 * delta;
      let moved = false;
      let dx = 0;
      let dz = 0;

      if (keysRef.current.w) { dz -= speed; moved = true; }
      if (keysRef.current.s) { dz += speed; moved = true; }
      if (keysRef.current.a) { dx -= speed; moved = true; }
      if (keysRef.current.d) { dx += speed; moved = true; }

      // Boundaries depending on mode
      if (isBridge) {
        localPosRef.current.x = Math.max(-9.6, Math.min(9.6, localPosRef.current.x + dx));
        localPosRef.current.z = Math.max(-8.5, Math.min(8.5, localPosRef.current.z + dz));
      } else if (isBomb) {
        localPosRef.current.x = Math.max(-11.2, Math.min(11.2, localPosRef.current.x + dx));
        localPosRef.current.z = Math.max(-11.2, Math.min(11.2, localPosRef.current.z + dz));
      } else {
        localPosRef.current.x = Math.max(-10.8, Math.min(10.8, localPosRef.current.x + dx));
        localPosRef.current.z = Math.max(-10.8, Math.min(10.8, localPosRef.current.z + dz));
      }

      // Gravity & Jump Physics
      localPosRef.current.vy -= 9.8 * delta * 0.08;
      localPosRef.current.y += localPosRef.current.vy;
      if (localPosRef.current.y <= 0.5) {
        localPosRef.current.y = 0.5;
        localPosRef.current.vy = 0;
        localPosRef.current.jumping = false;
      }

      // Zone detection logic
      const lx = localPosRef.current.x;
      const lz = localPosRef.current.z;
      let detectedZone: number | null = null;

      if (isBridge) {
        // Glass Bridge: 4 vertical lanes along z = 0
        if (lz <= 4.2 && lz >= -3.5) {
          if (lx < -4.8) detectedZone = 0; // ▲ Merah
          else if (lx < 0) detectedZone = 1; // ◆ Biru
          else if (lx < 4.8) detectedZone = 2; // ● Kuning
          else detectedZone = 3; // ■ Hijau
        } else {
          detectedZone = null;
        }
      } else if (isBomb) {
        // Bomb Tag: 4 corner elevated pads
        if (lx < -4.0 && lz < -4.0) detectedZone = 0; // ▲ Merah
        else if (lx > 4.0 && lz < -4.0) detectedZone = 1; // ◆ Biru
        else if (lx < -4.0 && lz > 4.0) detectedZone = 2; // ● Kuning
        else if (lx > 4.0 && lz > 4.0) detectedZone = 3; // ■ Hijau
        else detectedZone = null; // Central estafet area
      } else {
        // Lava Tiles: 4 quadrants
        if (lx < -1.8 && lz < -1.8) detectedZone = 0; // ▲ Merah
        else if (lx > 1.8 && lz < -1.8) detectedZone = 1; // ◆ Biru
        else if (lx < -1.8 && lz > 1.8) detectedZone = 2; // ● Kuning
        else if (lx > 1.8 && lz > 1.8) detectedZone = 3; // ■ Hijau
      }

      if (detectedZone !== lastZoneDetected) {
        lastZoneDetected = detectedZone;
        setCurrentStandingZone(detectedZone);
        if (detectedZone !== null && onSelectZone && phaseRef.current === 'QUESTION') {
          onSelectZone(detectedZone);
        }
      }

      // Throttle network movement broadcast (~50ms)
      const now = Date.now();
      if (now - lastNetworkSend >= 50 && (moved || localPosRef.current.jumping)) {
        lastNetworkSend = now;
        if (onMove) {
          onMove(localPosRef.current.x, localPosRef.current.z, localPosRef.current.jumping, detectedZone);
        }
      }

      // Update RoboTarget Bot in Bomb Tag
      let botX = 0;
      let botZ = 0;
      if (isBomb && botGroup) {
        botX = Math.sin(time * 1.5) * 3.5;
        botZ = Math.cos(time * 1.5) * 3.5;
        botGroup.position.set(botX, 0.5, botZ);

        // Animate Bot Limbs
        const { leftArm, rightArm, leftLeg, rightLeg } = botGroup.userData;
        const botSwing = Math.sin(time * 10) * 0.6;
        leftArm.rotation.x = botSwing;
        rightArm.rotation.x = -botSwing;
        leftLeg.rotation.x = -botSwing;
        rightLeg.rotation.x = botSwing;
      }

      // Sync Roblox character objects
      const currentPlayers = playersRef.current;
      const activeIds = new Set<string>();

      // Ensure local preview character exists if host or no players
      const isSoloPreview = isHost || currentPlayers.length === 0;
      if (isSoloPreview) {
        const previewId = 'preview_host';
        activeIds.add(previewId);
        if (!characterGroups.has(previewId)) {
          const char = createRobloxCharacter(isHost ? 'Host 👑' : 'Pemain 🎮', '🦊', 0x9333ea);
          characterGroups.set(previewId, char);
          scene.add(char);
        }
        const hostChar = characterGroups.get(previewId)!;
        hostChar.position.set(localPosRef.current.x, localPosRef.current.y, localPosRef.current.z);

        const { leftArm, rightArm, leftLeg, rightLeg } = hostChar.userData;
        if (moved) {
          const swing = Math.sin(time * 14) * 0.7;
          leftArm.rotation.x = swing;
          rightArm.rotation.x = -swing;
          leftLeg.rotation.x = -swing;
          rightLeg.rotation.x = swing;
        } else {
          leftArm.rotation.x = 0;
          rightArm.rotation.x = 0;
          leftLeg.rotation.x = 0;
          rightLeg.rotation.x = 0;
        }
      }

      // Update actual room players
      currentPlayers.forEach((p, idx) => {
        activeIds.add(p.id);
        if (!characterGroups.has(p.id)) {
          const color = TORSO_COLORS[idx % TORSO_COLORS.length];
          const char = createRobloxCharacter(p.name, p.avatar, color);
          characterGroups.set(p.id, char);
          scene.add(char);
        }

        const char = characterGroups.get(p.id)!;
        const isLocal = p.id === localPlayerId;

        let targetX = isLocal ? localPosRef.current.x : (typeof p.x === 'number' ? p.x : 0);
        let targetZ = isLocal ? localPosRef.current.z : (typeof p.z === 'number' ? p.z : (isBridge ? 7.2 : 0));
        let targetY = isLocal ? localPosRef.current.y : (p.jumping ? 1.1 : 0.5);

        // Handle "Review Phase Animations"
        if (phaseRef.current === 'REVIEW') {
          if (isBomb) {
            // Bomb Tag Review: exploded bomb holder flies up
            const isExploded = (explodedPlayerIdRef.current && p.id === explodedPlayerIdRef.current) || p.exploded;
            if (isExploded) {
              targetY = Math.min(18.0, char.position.y + 16.0 * delta);
              char.rotation.x += 16 * delta;
              char.rotation.y += 14 * delta;
            } else {
              // Survivor celebration bounce!
              targetY = 0.55 + Math.abs(Math.sin(time * 10)) * 0.75;
              char.rotation.x = 0;
              char.rotation.y = 0;
            }
          } else if (typeof correctIndexRef.current === 'number') {
            // Glass Bridge or Lava Tiles Review
            const correctIdx = correctIndexRef.current;
            const playerZone = isLocal ? detectedZone : p.currentAnswer;
            const isWinner = playerZone === correctIdx;

            if (isWinner) {
              targetY = 0.55 + Math.abs(Math.sin(time * 10)) * 0.75;
            } else {
              const dropLimit = isBridge ? -8.0 : -5.0;
              targetY = Math.max(dropLimit, char.position.y - 5.5 * delta);
              char.rotation.x += 1.8 * delta;
              char.rotation.z += 1.4 * delta;
            }
          }
        } else {
          char.rotation.x = 0;
          char.rotation.z = 0;
        }

        // Smooth position lerp
        char.position.x += (targetX - char.position.x) * 0.25;
        char.position.z += (targetZ - char.position.z) * 0.25;
        char.position.y += (targetY - char.position.y) * 0.35;

        // Limbs swing for network players
        const { leftArm, rightArm, leftLeg, rightLeg } = char.userData;
        const dist = Math.hypot(targetX - char.position.x, targetZ - char.position.z);
        if (dist > 0.05 || (isLocal && moved)) {
          const swing = Math.sin(time * 14) * 0.65;
          leftArm.rotation.x = swing;
          rightArm.rotation.x = -swing;
          leftLeg.rotation.x = -swing;
          rightLeg.rotation.x = swing;
        } else {
          leftArm.rotation.x = 0;
          rightArm.rotation.x = 0;
          leftLeg.rotation.x = 0;
          rightLeg.rotation.x = 0;
        }
      });

      // Cleanup disconnected players
      for (const [id, grp] of characterGroups.entries()) {
        if (!activeIds.has(id)) {
          scene.remove(grp);
          characterGroups.delete(id);
        }
      }

      // Update Bomb & Explosion in Bomb Tag Mode
      if (isBomb && bombGroup && bombCoreMesh && bombLight && bombFloorRing) {
        const curHolder = bombHolderIdRef.current;
        if (curHolder && phaseRef.current !== 'LOBBY') {
          bombGroup.visible = true;
          bombFloorRing.visible = true;

          let holderX = 0;
          let holderY = 0.5;
          let holderZ = 0;

          if (curHolder === 'bot_target') {
            holderX = botX;
            holderZ = botZ;
          } else if (curHolder === localPlayerId || (isSoloPreview && curHolder.startsWith('p_'))) {
            holderX = localPosRef.current.x;
            holderY = localPosRef.current.y;
            holderZ = localPosRef.current.z;
          } else {
            const holderChar = characterGroups.get(curHolder);
            if (holderChar) {
              holderX = holderChar.position.x;
              holderY = holderChar.position.y;
              holderZ = holderChar.position.z;
            }
          }

          // Float bomb above holder's head with pulsing rhythm
          const pulse = 1.0 + Math.sin(time * 18) * 0.22;
          bombCoreMesh.scale.set(pulse, pulse, pulse);
          bombLight.intensity = 2.0 + Math.sin(time * 18) * 1.5;

          bombGroup.position.set(holderX, holderY + 2.7 + Math.sin(time * 6) * 0.15, holderZ);
          bombGroup.rotation.y += 0.04;

          // Danger ring under feet
          bombFloorRing.position.set(holderX, 0.05, holderZ);
          bombFloorRing.rotation.z += delta * 2;

          // Review explosion fireball
          if (explosionFireball) {
            if (phaseRef.current === 'REVIEW') {
              explosionFireball.visible = true;
              explosionFireball.position.set(holderX, 1.6, holderZ);
              if (explosionFireball.scale.x < 3.2) {
                explosionFireball.scale.addScalar(delta * 12);
              }
            } else {
              explosionFireball.visible = false;
              explosionFireball.scale.set(0.01, 0.01, 0.01);
            }
          }
        } else {
          bombGroup.visible = false;
          bombFloorRing.visible = false;
          if (explosionFireball) explosionFireball.visible = false;
        }
      }

      // "Answer or Fall / Glass Shatter" Animation on Answer Panels in non-bomb modes
      if (!isBomb && phaseRef.current === 'REVIEW' && typeof correctIndexRef.current === 'number') {
        const correct = correctIndexRef.current;
        interactiveMeshes.forEach((mesh, qIdx) => {
          if (qIdx !== correct) {
            const dropLimit = isBridge ? -14.0 : -10.0;
            const dropSpeed = isBridge ? 12.0 : 9.0;
            mesh.position.y = Math.max(dropLimit, mesh.position.y - dropSpeed * delta);
            mesh.rotation.x += isBridge ? 0.04 : 0.02;
            mesh.rotation.z += isBridge ? 0.03 : 0.02;
          } else {
            mesh.position.y = isBridge ? 0.15 : 0.25;
            mesh.rotation.x = 0;
            mesh.rotation.z = 0;
          }
        });
      } else if (!isBomb) {
        interactiveMeshes.forEach((mesh) => {
          mesh.position.y += ((isBridge ? 0.05 : 0) - mesh.position.y) * 0.2;
          mesh.rotation.x += (0 - mesh.rotation.x) * 0.2;
          mesh.rotation.z += (0 - mesh.rotation.z) * 0.2;
        });
      }

      // Theme-specific environment animations
      if (sharkFins.length > 0) {
        const sharkY = isBridge ? -7.8 : -3.9;
        sharkFins.forEach((fin, idx) => {
          const angle = time * 0.75 + (idx * Math.PI * 2) / 3;
          const r = 16.5 + Math.sin(time * 1.5 + idx) * 1.5;
          fin.position.set(Math.sin(angle) * r, sharkY + Math.sin(time * 3 + idx) * 0.1, Math.cos(angle) * r);
          fin.rotation.y = angle + Math.PI / 2;
        });
      }

      if (orbitalRing) {
        orbitalRing.rotation.z = time * 0.12;
      }

      if (torchLights.length > 0) {
        torchLights.forEach((tLight, idx) => {
          tLight.intensity = 1.8 + Math.sin(time * 12 + idx * 2) * 0.4;
        });
        torchFlames.forEach((flame, idx) => {
          const scale = 1.0 + Math.sin(time * 14 + idx * 2) * 0.15;
          flame.scale.set(scale, scale * 1.25, scale);
        });
      }

      if (isIsometricRef.current) {
        if (isBridge) {
          orthoCamera.position.set(22, 20, 18);
          orthoCamera.lookAt(0, 0, -3);
        } else {
          // Smooth subtle framing offset follow
          const offsetX = localPosRef.current.x * 0.15;
          const offsetZ = localPosRef.current.z * 0.15;
          orthoCamera.position.set(20 + offsetX, 20, 20 + offsetZ);
          orthoCamera.lookAt(offsetX, 0, offsetZ);
        }
      }

      const activeCamera = isIsometricRef.current ? orthoCamera : perspCamera;
      renderer.render(scene, activeCamera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const asp = w / h;

      perspCamera.aspect = asp;
      perspCamera.updateProjectionMatrix();

      orthoCamera.left = (-frustumSize * asp) / 2;
      orthoCamera.right = (frustumSize * asp) / 2;
      orthoCamera.top = frustumSize / 2;
      orthoCamera.bottom = -frustumSize / 2;
      orthoCamera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      canvasTextures.forEach(t => t.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [arenaMode, worldTheme]);

  const isLocalHoldingBomb = isBombTag && (
    bombHolderId === localPlayerId ||
    (isHost && (!players.length || bombHolderId === 'preview_host')) ||
    (!localPlayerId && bombHolderId && !players.find(p => p.id === bombHolderId))
  );

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_#000] bg-[#0b0f19] select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-[400px] sm:h-[480px] md:h-[540px] cursor-grab active:cursor-grabbing" />

      {/* Mode Indicator Badge, World Theme Badge & Camera Toggle */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 sm:gap-2 z-20">
        <span className="bg-[#0b0f19] border-2 border-black px-2.5 sm:px-3 py-1 rounded-xl text-xs font-mono font-bold text-amber-400 shadow-[2px_2px_0px_#000] flex items-center gap-1.5 uppercase tracking-wider">
          {arenaMode === 'bomb_tag' ? '💣 Estafet Bom 3D' : arenaMode === 'glass_bridge' ? '🌉 Jembatan Kaca 3D' : '🌋 Lantai Lava 3D'}
        </span>

        <span className="bg-[#0b0f19] border-2 border-black px-2 sm:px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-white shadow-[2px_2px_0px_#000] flex items-center gap-1 uppercase tracking-wider">
          {worldTheme === 'pirate' ? '🏝️ Samudra Hiu' : worldTheme === 'space' ? '🚀 Antariksa' : worldTheme === 'castle' ? '🏰 Kastil Kuno' : '🕹️ Arcade'}
        </span>

        <button
          type="button"
          onClick={() => setIsIsometric(prev => !prev)}
          className="bg-[#0b0f19] hover:bg-slate-800 text-amber-400 border-2 border-black px-2.5 sm:px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-[2px_2px_0px_#000] flex items-center gap-1.5 cursor-pointer iso-btn active:translate-x-[1px] active:translate-y-[1px]"
          title="Ganti Sudut Pandang Kamera (Isometrik / Perspektif)"
        >
          <span>{isIsometric ? '📐 Isometrik' : '🎥 Perspektif'}</span>
        </button>
      </div>

      {/* Top HUD Overlay (Question info & timer) */}
      {questionText && (
        <div className="absolute top-3 left-3 right-3 sm:left-auto sm:right-3 flex items-center justify-end gap-2 pointer-events-none z-10">
          <div className="bg-[#0b0f19] border-2 border-black px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_#000] max-w-sm sm:max-w-md md:max-w-lg truncate hidden sm:block">
            <span className="text-xs sm:text-sm font-bold text-white truncate block font-['Space_Grotesk']">
              {questionText}
            </span>
          </div>

          {typeof timeLeft === 'number' && (
            <div className={`px-3 py-1 rounded-xl font-mono font-black text-sm border-2 border-black shadow-[3px_3px_0px_#000] shrink-0 ${
              timeLeft <= 5 ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-400 text-slate-950'
            }`}>
              ⏱️ {timeLeft}s
            </div>
          )}
        </div>
      )}

      {/* Bomb Tag Dynamic Banner Alert */}
      {isBombTag && phase === 'QUESTION' && (
        <div className="absolute top-14 left-3 right-3 flex justify-center pointer-events-none z-20">
          {isLocalHoldingBomb ? (
            <div className="bg-red-600 border-2 border-black text-white px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm shadow-[4px_4px_0px_#000] animate-bounce flex items-center gap-2">
              <span className="text-lg">💣🔥</span>
              <span>KAMU MEMEGANG BOM! Tabrak pemain lain atau jawab benar untuk mengoper!</span>
            </div>
          ) : (
            <div className="bg-[#151c2c] border-2 border-black text-emerald-400 px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-[3px_3px_0px_#000] flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <span>STATUS: AMAN! Jaga jarak dari pemegang bom & pilih petak jawaban!</span>
            </div>
          )}
        </div>
      )}

      {/* Current Standing Zone Indicator */}
      <div className={`absolute left-3 pointer-events-none z-10 ${isBombTag && phase === 'QUESTION' ? 'top-24 sm:top-24' : 'top-14'}`}>
        {currentStandingZone !== null && QUADRANT_CONFIGS[currentStandingZone] ? (
          <div className="bg-[#151c2c] border-2 border-black px-3 py-1 rounded-xl text-xs font-bold text-white shadow-[2px_2px_0px_#000] flex items-center gap-1.5 animate-bounce-short">
            <span>📍 Petak Dipilih:</span>
            <span className="text-amber-400 bg-[#0b0f19] border border-black px-2 py-0.5 rounded font-mono font-black">
              {QUADRANT_CONFIGS[currentStandingZone].shape} {QUADRANT_CONFIGS[currentStandingZone].label}
            </span>
            <span className="text-[11px] text-slate-300">(Bisa pindah sebelum waktu habis)</span>
          </div>
        ) : (
          <div className="bg-[#151c2c] border-2 border-black px-3 py-1 rounded-xl text-[11px] font-bold text-slate-400 shadow-[2px_2px_0px_#000]">
            {arenaMode === 'glass_bridge'
              ? '📍 Tebing Awal (Zona Netral)'
              : arenaMode === 'bomb_tag'
              ? '📍 Arena Tengah (Zona Estafet Bom)'
              : '📍 Zona Netral (Tengah)'}
          </div>
        )}
      </div>

      {/* Keyboard movement hint */}
      <div className={`absolute right-3 hidden md:flex items-center gap-1 bg-[#0b0f19] px-2.5 py-1 rounded-xl text-[11px] text-slate-300 border-2 border-black shadow-[2px_2px_0px_#000] pointer-events-none z-10 ${isBombTag && phase === 'QUESTION' ? 'top-24' : 'top-14'}`}>
        <span>Gunakan</span>
        <kbd className="bg-[#1e293b] border border-black px-1.5 py-0.5 rounded font-mono font-bold text-amber-400 shadow-[1px_1px_0px_#000]">W</kbd>
        <kbd className="bg-[#1e293b] border border-black px-1.5 py-0.5 rounded font-mono font-bold text-amber-400 shadow-[1px_1px_0px_#000]">A</kbd>
        <kbd className="bg-[#1e293b] border border-black px-1.5 py-0.5 rounded font-mono font-bold text-amber-400 shadow-[1px_1px_0px_#000]">S</kbd>
        <kbd className="bg-[#1e293b] border border-black px-1.5 py-0.5 rounded font-mono font-bold text-amber-400 shadow-[1px_1px_0px_#000]">D</kbd>
        <span>/ Panah & Spasi</span>
      </div>

      {/* Bottom Interactive Quick-Move Dock */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10">
        {/* 4 Quadrant / Glass Lanes Quick-Run Buttons */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 flex-1 max-w-lg">
          {QUADRANT_CONFIGS.map((q, idx) => {
            const isSelected = currentStandingZone === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => moveToZone(idx)}
                className={`iso-tile py-2 px-1 sm:px-2.5 rounded-xl font-black text-xs sm:text-sm text-white border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  idx === 0 ? 'bg-red-600 hover:bg-red-500' :
                  idx === 1 ? 'bg-blue-600 hover:bg-blue-500' :
                  idx === 2 ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black' :
                  'bg-emerald-600 hover:bg-emerald-500'
                } ${isSelected ? 'ring-2 ring-white scale-105 shadow-[4px_4px_0px_#000]' : 'opacity-90'}`}
                title={`Lari ke petak ${q.label}`}
              >
                <span>{q.shape}</span>
                <span className="hidden sm:inline text-xs">{q.label}</span>
              </button>
            );
          })}
        </div>

        {/* Jump Button */}
        <button
          type="button"
          onClick={triggerJump}
          className="iso-btn bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
        >
          <span>🦘</span>
          <span>Lompat</span>
        </button>
      </div>
    </div>
  );
}
