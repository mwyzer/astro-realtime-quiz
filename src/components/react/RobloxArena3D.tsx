import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface Player3DData {
  id: string;
  name: string;
  avatar: string;
  x?: number;
  z?: number;
  jumping?: boolean;
  currentAnswer?: number | null;
}

export type Arena3DMode = 'glass_bridge' | 'lava_tiles';

interface RobloxArena3DProps {
  phase: string;
  arenaMode?: Arena3DMode;
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
  { index: 0, x: -6, z: -6, glassX: -7.2, color: 0xef4444, hex: '#ef4444', shape: '▲', label: 'Merah' },
  { index: 1, x: 6, z: -6, glassX: -2.4, color: 0x3b82f6, hex: '#3b82f6', shape: '◆', label: 'Biru' },
  { index: 2, x: -6, z: 6, glassX: 2.4, color: 0xf59e0b, hex: '#f59e0b', shape: '●', label: 'Kuning' },
  { index: 3, x: 6, z: 6, glassX: 7.2, color: 0x10b981, hex: '#10b981', shape: '■', label: 'Hijau' },
];

const TORSO_COLORS = [
  0xec4899, 0x8b5cf6, 0x06b6d4, 0xf97316, 0x14b8a6,
  0xa855f7, 0x3b82f6, 0x10b981, 0xf43f5e, 0x6366f1
];

export default function RobloxArena3D({
  phase,
  arenaMode = 'glass_bridge',
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

  // Latest props stored in refs for the 60fps render loop
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const arenaModeRef = useRef(arenaMode);
  arenaModeRef.current = arenaMode;

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

    if (isBridge) {
      scene.background = new THREE.Color(0x090d16); // deep cyber abyss
      scene.fog = new THREE.FogExp2(0x090d16, 0.016);
    } else {
      scene.background = new THREE.Color(0x0f172a); // dark midnight blue
      scene.fog = new THREE.FogExp2(0x0f172a, 0.015);
    }

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 500);
    if (isBridge) {
      camera.position.set(0, 15.5, 17.5);
      camera.lookAt(0, -0.6, -0.5);
    } else {
      camera.position.set(0, 20, 23);
      camera.lookAt(0, -0.5, 0);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isBridge ? 0.95 : 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, isBridge ? 1.4 : 1.2);
    dirLight.position.set(16, 28, 16);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.left = -18;
    dirLight.shadow.camera.right = 18;
    dirLight.shadow.camera.top = 18;
    dirLight.shadow.camera.bottom = -18;
    scene.add(dirLight);

    // Dynamic light underneath
    const underLight = new THREE.PointLight(isBridge ? 0x6366f1 : 0xff3b00, isBridge ? 2.5 : 2.5, 60);
    underLight.position.set(0, -3.5, 0);
    scene.add(underLight);

    // Meshes references for animations
    const interactiveMeshes: THREE.Mesh[] = [];
    const canvasTextures: THREE.CanvasTexture[] = [];
    let trophyGroup: THREE.Group | null = null;
    let lavaMesh: THREE.Mesh | null = null;

    // Helper: Texture generator for Answer Panels
    const createPanelTexture = (shape: string, label: string, hexColor: string, optionText: string, isGlass: boolean) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (isGlass) {
          // Semi-translucent glass pattern with neon gradient
          ctx.fillStyle = hexColor;
          ctx.fillRect(0, 0, 512, 512);

          // Glass shine highlight
          const grad = ctx.createLinearGradient(0, 0, 512, 512);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
          grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
          grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 512, 512);

          // Neon Border
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 16;
          ctx.strokeRect(16, 16, 480, 480);
        } else {
          // Solid tile
          ctx.fillStyle = hexColor;
          ctx.fillRect(0, 0, 512, 512);
          ctx.strokeStyle = 'rgba(255,255,255,0.4)';
          ctx.lineWidth = 14;
          ctx.strokeRect(20, 20, 472, 472);
          ctx.fillStyle = 'rgba(0,0,0,0.15)';
          ctx.fillRect(30, 30, 452, 452);
        }

        // Big Shape Symbol
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 140px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 12;
        ctx.fillText(shape, 256, 170);

        // Label
        ctx.font = 'bold 44px Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.fillText(label, 256, 265);

        // Option text if available
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

    if (isBridge) {
      // -------------------------------------------------------------
      // 3A. GLASS BRIDGE GEOMETRY (Squid Game / Bridge Trivia Mode)
      // -------------------------------------------------------------

      // Deep Abyss Plane + Cyber Neon Grid
      const abyssGeo = new THREE.PlaneGeometry(120, 120);
      const abyssMat = new THREE.MeshBasicMaterial({ color: 0x050811 });
      const abyssMesh = new THREE.Mesh(abyssGeo, abyssMat);
      abyssMesh.rotation.x = -Math.PI / 2;
      abyssMesh.position.y = -8.5;
      scene.add(abyssMesh);

      const gridHelper = new THREE.GridHelper(120, 36, 0x6366f1, 0x1e1b4b);
      gridHelper.position.y = -8.2;
      scene.add(gridHelper);

      // Start Platform (Tebing Awal di z = 7.2)
      const startPlatformGeo = new THREE.BoxGeometry(20, 0.8, 4.5);
      const startPlatformMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.4,
        metalness: 0.3,
      });
      const startPlatform = new THREE.Mesh(startPlatformGeo, startPlatformMat);
      startPlatform.position.set(0, 0, 7.2);
      startPlatform.receiveShadow = true;
      scene.add(startPlatform);

      // Start Neon Edge line
      const startNeonGeo = new THREE.BoxGeometry(20.1, 0.08, 0.15);
      const startNeonMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
      const startNeon = new THREE.Mesh(startNeonGeo, startNeonMat);
      startNeon.position.set(0, 0.42, 5.0);
      scene.add(startNeon);

      // Goal Platform (Tebing Finish di z = -8.2)
      const goalPlatformGeo = new THREE.BoxGeometry(20, 0.8, 4.5);
      const goalPlatformMat = new THREE.MeshStandardMaterial({
        color: 0x064e3b, // emerald dark
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

      // 3D Gold Trophy at Goal Platform (z = -8.2)
      trophyGroup = new THREE.Group();
      trophyGroup.position.set(0, 1.4, -8.2);

      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0xca8a04,
        emissiveIntensity: 0.35,
        roughness: 0.15,
        metalness: 0.85,
      });

      // Trophy Base
      const tBase = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 0.35, 16), goldMat);
      tBase.position.y = -0.55;
      trophyGroup.add(tBase);

      // Trophy Stem
      const tStem = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 0.5, 16), goldMat);
      tStem.position.y = -0.15;
      trophyGroup.add(tStem);

      // Trophy Cup
      const tCup = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.4, 0.9, 16), goldMat);
      tCup.position.y = 0.45;
      trophyGroup.add(tCup);

      // Trophy Handles (Toruses)
      const handleGeo = new THREE.TorusGeometry(0.35, 0.07, 10, 16, Math.PI);
      const tHandleL = new THREE.Mesh(handleGeo, goldMat);
      tHandleL.position.set(-0.7, 0.45, 0);
      tHandleL.rotation.z = Math.PI / 2;
      trophyGroup.add(tHandleL);

      const tHandleR = new THREE.Mesh(handleGeo, goldMat);
      tHandleR.position.set(0.7, 0.45, 0);
      tHandleR.rotation.z = -Math.PI / 2;
      trophyGroup.add(tHandleR);

      // Trophy Point Light
      const trophyLight = new THREE.PointLight(0xfef08a, 1.8, 8);
      trophyLight.position.set(0, 1.0, 0);
      trophyGroup.add(trophyLight);

      scene.add(trophyGroup);

      // Neon Rails (Left & Right Suspension Cables)
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

      // 4 Main Interactive Glass Panels at z = 0
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

        // Multi-material for box [right, left, top, bottom, front, back]
        const materials = [
          glassMat, glassMat, topMat, glassMat, glassMat, glassMat
        ];

        const panelMesh = new THREE.Mesh(panelGeo, materials);
        panelMesh.position.set(q.glassX, 0.05, 0);
        panelMesh.castShadow = true;
        panelMesh.receiveShadow = true;
        scene.add(panelMesh);
        interactiveMeshes.push(panelMesh);

        // Metallic Frame beneath the glass
        const frameGeo = new THREE.BoxGeometry(4.35, 0.12, 6.15);
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
        const frameMesh = new THREE.Mesh(frameGeo, frameMat);
        frameMesh.position.set(0, -0.22, 0);
        panelMesh.add(frameMesh);
      });

      // 4 Decorative Extension Glass Panels at z = -4.6 (bridging to Goal Platform)
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
      // 3B. LAVA TILES ARENA (Classic Answer or Fall Mode)
      // -------------------------------------------------------------

      // Ocean of Lava
      const lavaGeo = new THREE.PlaneGeometry(120, 120, 16, 16);
      const lavaMat = new THREE.MeshStandardMaterial({
        color: 0xff3300,
        emissive: 0xff2200,
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.1,
      });
      lavaMesh = new THREE.Mesh(lavaGeo, lavaMat);
      lavaMesh.rotation.x = -Math.PI / 2;
      lavaMesh.position.y = -4.5;
      scene.add(lavaMesh);

      // Center Neutral Spawn Pad
      const centerPadGeo = new THREE.BoxGeometry(3.6, 0.9, 3.6);
      const centerPadMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.5,
        metalness: 0.4,
      });
      const centerPad = new THREE.Mesh(centerPadGeo, centerPadMat);
      centerPad.position.set(0, 0.05, 0);
      centerPad.receiveShadow = true;
      scene.add(centerPad);

      // Center icon canvas texture
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
        cctx.fillText('Lava Arena', 128, 165);
      }
      const centerTex = new THREE.CanvasTexture(centerCanvas);
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
        // 2 round eyes
        fctx.beginPath();
        fctx.arc(40, 50, 8, 0, Math.PI * 2);
        fctx.arc(88, 50, 8, 0, Math.PI * 2);
        fctx.fill();
        // smiling mouth
        fctx.beginPath();
        fctx.arc(64, 75, 20, 0, Math.PI);
        fctx.lineWidth = 5;
        fctx.stroke();
      }
      const faceTex = new THREE.CanvasTexture(faceCanvas);
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
          detectedZone = null; // Start Platform (z > 4.2) or Goal Platform (z < -3.5)
        }
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

        // Animate limbs if moving
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

        // Handle "Answer or Fall / Glass Shatter" in REVIEW phase
        if (phaseRef.current === 'REVIEW' && typeof correctIndexRef.current === 'number') {
          const correctIdx = correctIndexRef.current;
          const playerZone = isLocal ? detectedZone : p.currentAnswer;
          const isWinner = playerZone === correctIdx;

          if (isWinner) {
            // Victorious jumping on solid platform!
            targetY = 0.55 + Math.abs(Math.sin(time * 10)) * 0.75;
          } else {
            // Sunk into abyss or lava!
            const dropLimit = isBridge ? -8.0 : -5.0;
            targetY = Math.max(dropLimit, char.position.y - 5.5 * delta);
            char.rotation.x += 1.8 * delta;
            char.rotation.z += 1.4 * delta;
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

      // "Answer or Fall / Glass Shatter" Animation on Answer Panels
      if (phaseRef.current === 'REVIEW' && typeof correctIndexRef.current === 'number') {
        const correct = correctIndexRef.current;
        interactiveMeshes.forEach((mesh, qIdx) => {
          if (qIdx !== correct) {
            // Shatter and drop down!
            const dropLimit = isBridge ? -14.0 : -10.0;
            const dropSpeed = isBridge ? 12.0 : 9.0;
            mesh.position.y = Math.max(dropLimit, mesh.position.y - dropSpeed * delta);
            mesh.rotation.x += isBridge ? 0.04 : 0.02;
            mesh.rotation.z += isBridge ? 0.03 : 0.02;
          } else {
            // Winner panel stays solid and elevates slightly
            mesh.position.y = isBridge ? 0.15 : 0.25;
            mesh.rotation.x = 0;
            mesh.rotation.z = 0;
          }
        });
      } else {
        // Reset panels to solid ground
        interactiveMeshes.forEach((mesh) => {
          mesh.position.y += ((isBridge ? 0.05 : 0) - mesh.position.y) * 0.2;
          mesh.rotation.x += (0 - mesh.rotation.x) * 0.2;
          mesh.rotation.z += (0 - mesh.rotation.z) * 0.2;
        });
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
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
  }, [arenaMode]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-slate-950 select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-[400px] sm:h-[480px] md:h-[540px] cursor-grab active:cursor-grabbing" />

      {/* Mode Indicator Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-10">
        <span className="bg-slate-900/90 border border-purple-500/40 px-3 py-1 rounded-xl text-xs font-black text-purple-200 shadow-lg backdrop-blur flex items-center gap-1.5">
          {arenaMode === 'glass_bridge' ? '🌉 Jembatan Kaca 3D' : '🌋 Lantai Lava 3D'}
        </span>
      </div>

      {/* Top HUD Overlay (Question info & timer) */}
      {questionText && (
        <div className="absolute top-3 left-28 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
          <div className="bg-slate-900/90 border border-purple-500/30 px-3.5 py-1.5 rounded-2xl shadow-lg backdrop-blur max-w-lg truncate">
            <span className="text-xs sm:text-sm font-extrabold text-white truncate block">
              {questionText}
            </span>
          </div>

          {typeof timeLeft === 'number' && (
            <div className={`px-3 py-1 rounded-xl font-mono font-black text-sm shadow-lg backdrop-blur shrink-0 ${
              timeLeft <= 5 ? 'bg-red-600/90 text-white animate-pulse' : 'bg-slate-900/90 text-yellow-300 border border-yellow-500/30'
            }`}>
              ⏱️ {timeLeft}s
            </div>
          )}
        </div>
      )}

      {/* Current Standing Zone Indicator */}
      <div className="absolute top-14 left-3 pointer-events-none z-10">
        {currentStandingZone !== null && QUADRANT_CONFIGS[currentStandingZone] ? (
          <div className="bg-slate-900/90 border border-emerald-500/50 px-3 py-1 rounded-xl text-xs font-bold text-emerald-300 shadow-md backdrop-blur flex items-center gap-1.5 animate-bounce-short">
            <span>📍 Jalur Dipilih:</span>
            <span className="text-white bg-black/40 px-2 py-0.5 rounded">
              {QUADRANT_CONFIGS[currentStandingZone].shape} {QUADRANT_CONFIGS[currentStandingZone].label}
            </span>
            <span className="text-[11px] text-gray-300">(Bisa pindah sebelum waktu habis!)</span>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-xl text-[11px] font-bold text-gray-400 shadow-md backdrop-blur">
            {arenaMode === 'glass_bridge' ? '📍 Tebing Awal (Zona Netral)' : '📍 Zona Netral (Tengah)'}
          </div>
        )}
      </div>

      {/* Keyboard movement hint */}
      <div className="absolute top-14 right-3 hidden md:flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-lg text-[10px] text-gray-300 border border-white/10 pointer-events-none z-10">
        <span>Gunakan</span>
        <kbd className="bg-slate-800 px-1 rounded font-mono font-bold text-white">W</kbd>
        <kbd className="bg-slate-800 px-1 rounded font-mono font-bold text-white">A</kbd>
        <kbd className="bg-slate-800 px-1 rounded font-mono font-bold text-white">S</kbd>
        <kbd className="bg-slate-800 px-1 rounded font-mono font-bold text-white">D</kbd>
        <span>/ Arrow & Space</span>
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
                className={`py-2 px-1 sm:px-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer transform active:scale-90 ${
                  idx === 0 ? 'bg-red-600 hover:bg-red-500' :
                  idx === 1 ? 'bg-blue-600 hover:bg-blue-500' :
                  idx === 2 ? 'bg-amber-600 hover:bg-amber-500' :
                  'bg-emerald-600 hover:bg-emerald-500'
                } ${isSelected ? 'ring-4 ring-white scale-105 shadow-2xl' : 'opacity-90'}`}
                title={`Lari ke jalur ${q.label}`}
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
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-90 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xl border border-purple-400/40 flex items-center gap-1 cursor-pointer transition-all shrink-0"
        >
          <span>🦘</span>
          <span>Lompat</span>
        </button>
      </div>
    </div>
  );
}
