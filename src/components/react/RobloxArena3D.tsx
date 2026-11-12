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

interface RobloxArena3DProps {
  phase: string;
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
  { index: 0, x: -6, z: -6, color: 0xef4444, hex: '#ef4444', shape: '▲', label: 'Merah' },
  { index: 1, x: 6, z: -6, color: 0x3b82f6, hex: '#3b82f6', shape: '◆', label: 'Biru' },
  { index: 2, x: -6, z: 6, color: 0xf59e0b, hex: '#f59e0b', shape: '●', label: 'Kuning' },
  { index: 3, x: 6, z: 6, color: 0x10b981, hex: '#10b981', shape: '■', label: 'Hijau' },
];

const TORSO_COLORS = [
  0xec4899, 0x8b5cf6, 0x06b6d4, 0xf97316, 0x14b8a6,
  0xa855f7, 0x3b82f6, 0x10b981, 0xf43f5e, 0x6366f1
];

export default function RobloxArena3D({
  phase,
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
  const localPosRef = useRef<{ x: number; z: number; y: number; vy: number; jumping: boolean }>({
    x: 0,
    z: 0,
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
      localPosRef.current.x = q.x + (Math.random() - 0.5) * 2;
      localPosRef.current.z = q.z + (Math.random() - 0.5) * 2;
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

    // 1. Scene & Camera Setup
    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // dark midnight blue
    scene.fog = new THREE.FogExp2(0x0f172a, 0.015);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 500);
    camera.position.set(0, 20, 23);
    camera.lookAt(0, -0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
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

    // Lava glow light from bottom
    const lavaLight = new THREE.PointLight(0xff3b00, 2.5, 60);
    lavaLight.position.set(0, -3.5, 0);
    scene.add(lavaLight);

    // 3. Ocean of Lava
    const lavaGeo = new THREE.PlaneGeometry(120, 120, 16, 16);
    const lavaMat = new THREE.MeshStandardMaterial({
      color: 0xff3300,
      emissive: 0xff2200,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.1,
    });
    const lavaMesh = new THREE.Mesh(lavaGeo, lavaMat);
    lavaMesh.rotation.x = -Math.PI / 2;
    lavaMesh.position.y = -4.5;
    scene.add(lavaMesh);

    // 4. Center Neutral Spawn Pad
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
      cctx.fillText('AstroQuiz 3D', 128, 165);
    }
    const centerTex = new THREE.CanvasTexture(centerCanvas);
    const centerTopMat = new THREE.MeshBasicMaterial({ map: centerTex });
    const centerMaterials = [
      centerPadMat, centerPadMat, centerTopMat, centerPadMat, centerPadMat, centerPadMat
    ];
    centerPad.material = centerMaterials;

    // 5. 4 Color Tiles (Quadrants)
    const quadrantMeshes: THREE.Mesh[] = [];
    const canvasTextures: THREE.CanvasTexture[] = [];

    const createQuadrantTexture = (shape: string, label: string, hexColor: string, optionText: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Tile Background
        ctx.fillStyle = hexColor;
        ctx.fillRect(0, 0, 512, 512);

        // Grid border
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 14;
        ctx.strokeRect(20, 20, 472, 472);

        // Inner shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(30, 30, 452, 452);

        // Big Shape Symbol
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 150px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(shape, 256, 200);

        // Zone Name (e.g. A. MERAH)
        ctx.font = 'black 48px Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, 256, 320);

        // Option text snippet
        if (optionText) {
          ctx.font = 'bold 30px Arial, sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.95)';
          const textPreview = optionText.length > 24 ? optionText.slice(0, 24) + '...' : optionText;
          ctx.fillText(textPreview, 256, 390);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      canvasTextures.push(tex);
      return tex;
    };

    QUADRANT_CONFIGS.forEach((q, idx) => {
      const tileGeo = new THREE.BoxGeometry(11, 0.8, 11);
      const sideMat = new THREE.MeshStandardMaterial({
        color: q.color,
        roughness: 0.4,
        metalness: 0.2,
      });

      const optText = optionsRef.current[idx] || '';
      const topTex = createQuadrantTexture(q.shape, `${['A', 'B', 'C', 'D'][idx]}. ${q.label}`, q.hex, optText);
      const topMat = new THREE.MeshStandardMaterial({
        map: topTex,
        roughness: 0.3,
        metalness: 0.1,
      });

      const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
      const mesh = new THREE.Mesh(tileGeo, materials);
      mesh.position.set(q.x, 0, q.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      quadrantMeshes.push(mesh);
    });

    // 6. Roblox Blocky Character Builder
    const characterGroups = new Map<string, THREE.Group>();

    const createRobloxCharacter = (name: string, avatar: string, torsoColor: number) => {
      const group = new THREE.Group();

      // Head
      const headGeo = new THREE.BoxGeometry(0.72, 0.72, 0.72);
      const headMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 }); // Yellow Lego Head
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.35;
      head.castShadow = true;
      group.add(head);

      // Torso
      const torsoGeo = new THREE.BoxGeometry(0.9, 1.0, 0.52);
      const torsoMat = new THREE.MeshStandardMaterial({ color: torsoColor, roughness: 0.4 });
      const torso = new THREE.Mesh(torsoGeo, torsoMat);
      torso.position.y = 0.55;
      torso.castShadow = true;
      group.add(torso);

      // Left & Right Arms
      const armGeo = new THREE.BoxGeometry(0.35, 0.95, 0.35);
      const armMat = new THREE.MeshStandardMaterial({ color: torsoColor, roughness: 0.4 });

      const leftArm = new THREE.Mesh(armGeo, armMat);
      leftArm.position.set(-0.65, 0.55, 0);
      leftArm.castShadow = true;
      group.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, armMat);
      rightArm.position.set(0.65, 0.55, 0);
      rightArm.castShadow = true;
      group.add(rightArm);

      // Left & Right Legs
      const legGeo = new THREE.BoxGeometry(0.38, 0.9, 0.45);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 }); // Dark pants

      const leftLeg = new THREE.Mesh(legGeo, legMat);
      leftLeg.position.set(-0.25, -0.4, 0);
      leftLeg.castShadow = true;
      group.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, legMat);
      rightLeg.position.set(0.25, -0.4, 0);
      rightLeg.castShadow = true;
      group.add(rightLeg);

      // Nametag Sprite above head
      const nameCanvas = document.createElement('canvas');
      nameCanvas.width = 320;
      nameCanvas.height = 80;
      const nctx = nameCanvas.getContext('2d');
      if (nctx) {
        nctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        nctx.roundRect(10, 10, 300, 60, 20);
        nctx.fill();
        nctx.strokeStyle = '#a855f7';
        nctx.lineWidth = 3;
        nctx.roundRect(10, 10, 300, 60, 20);
        nctx.stroke();

        nctx.font = 'bold 30px Arial, sans-serif';
        nctx.fillStyle = '#ffffff';
        nctx.textAlign = 'center';
        nctx.textBaseline = 'middle';
        nctx.fillText(`${avatar} ${name.slice(0, 10)}`, 160, 42);
      }
      const nameTexture = new THREE.CanvasTexture(nameCanvas);
      const spriteMat = new THREE.SpriteMaterial({ map: nameTexture, depthTest: false });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(0, 2.3, 0);
      sprite.scale.set(2.4, 0.6, 1);
      group.add(sprite);

      // Store limb references on group for walk animation
      (group as any).userData = { leftArm, rightArm, leftLeg, rightLeg };

      return group;
    };

    // 7. Keyboard Input Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keysRef.current.w = true;
      if (k === 'a' || k === 'arrowleft') keysRef.current.a = true;
      if (k === 's' || k === 'arrowdown') keysRef.current.s = true;
      if (k === 'd' || k === 'arrowright') keysRef.current.d = true;
      if (k === ' ' || e.code === 'Space') {
        e.preventDefault();
        triggerJump();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keysRef.current.w = false;
      if (k === 'a' || k === 'arrowleft') keysRef.current.a = false;
      if (k === 's' || k === 'arrowdown') keysRef.current.s = false;
      if (k === 'd' || k === 'arrowright') keysRef.current.d = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 8. Animation & Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let lastNetworkSend = 0;
    let lastZoneDetected: number | null = null;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Animate Lava bubbling
      lavaMesh.position.y = -4.5 + Math.sin(time * 2.5) * 0.2;

      // Local player physics & movement
      const speed = 8.5 * delta;
      let moved = false;
      let dx = 0;
      let dz = 0;

      if (keysRef.current.w) { dz -= speed; moved = true; }
      if (keysRef.current.s) { dz += speed; moved = true; }
      if (keysRef.current.a) { dx -= speed; moved = true; }
      if (keysRef.current.d) { dx += speed; moved = true; }

      localPosRef.current.x = Math.max(-10.8, Math.min(10.8, localPosRef.current.x + dx));
      localPosRef.current.z = Math.max(-10.8, Math.min(10.8, localPosRef.current.z + dz));

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

      if (lx < -1.8 && lz < -1.8) detectedZone = 0; // ▲ Merah
      else if (lx > 1.8 && lz < -1.8) detectedZone = 1; // ◆ Biru
      else if (lx < -1.8 && lz > 1.8) detectedZone = 2; // ● Kuning
      else if (lx > 1.8 && lz > 1.8) detectedZone = 3; // ■ Hijau

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
        let targetZ = isLocal ? localPosRef.current.z : (typeof p.z === 'number' ? p.z : 0);
        let targetY = isLocal ? localPosRef.current.y : (p.jumping ? 1.1 : 0.5);

        // Handle "Answer or Fall" in REVIEW phase
        if (phaseRef.current === 'REVIEW' && typeof correctIndexRef.current === 'number') {
          const correctIdx = correctIndexRef.current;
          // Determine if player is on the winning tile
          const playerZone = isLocal ? detectedZone : p.currentAnswer;
          const isWinner = playerZone === correctIdx;

          if (isWinner) {
            // Victorious jumping on solid platform!
            targetY = 0.55 + Math.abs(Math.sin(time * 10)) * 0.75;
          } else {
            // Sunk into lava!
            targetY = Math.max(-5.0, char.position.y - 4.5 * delta);
            char.rotation.x += 1.5 * delta;
            char.rotation.z += 1.2 * delta;
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

      // "Answer or Fall" Quadrant Animation
      if (phaseRef.current === 'REVIEW' && typeof correctIndexRef.current === 'number') {
        const correct = correctIndexRef.current;
        quadrantMeshes.forEach((mesh, qIdx) => {
          if (qIdx !== correct) {
            // Shake and drop into lava!
            mesh.position.y = Math.max(-10.0, mesh.position.y - 9.0 * delta);
            mesh.rotation.x += 0.02;
            mesh.rotation.z += 0.02;
          } else {
            // Stay solid and elevated
            mesh.position.y = 0.25;
            mesh.rotation.x = 0;
            mesh.rotation.z = 0;
          }
        });
      } else {
        // Reset quadrants to solid flat ground
        quadrantMeshes.forEach((mesh, qIdx) => {
          mesh.position.y += (0 - mesh.position.y) * 0.2;
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
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-slate-950 select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-[400px] sm:h-[480px] md:h-[540px] cursor-grab active:cursor-grabbing" />

      {/* Top HUD Overlay (Question info & timer) */}
      {questionText && (
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="bg-slate-900/90 border border-purple-500/30 px-3.5 py-1.5 rounded-2xl shadow-lg backdrop-blur max-w-xl">
            <span className="text-xs sm:text-sm font-extrabold text-white truncate block">
              {questionText}
            </span>
          </div>

          {typeof timeLeft === 'number' && (
            <div className={`px-3 py-1 rounded-xl font-mono font-black text-sm shadow-lg backdrop-blur ${
              timeLeft <= 5 ? 'bg-red-600/90 text-white animate-pulse' : 'bg-slate-900/90 text-yellow-300 border border-yellow-500/30'
            }`}>
              ⏱️ {timeLeft}s
            </div>
          )}
        </div>
      )}

      {/* Current Standing Zone Indicator */}
      <div className="absolute top-14 left-3 pointer-events-none">
        {currentStandingZone !== null && QUADRANT_CONFIGS[currentStandingZone] ? (
          <div className="bg-slate-900/90 border border-emerald-500/50 px-3 py-1 rounded-xl text-xs font-bold text-emerald-300 shadow-md backdrop-blur flex items-center gap-1.5 animate-bounce-short">
            <span>📍 Berdiri di:</span>
            <span className="text-white bg-black/40 px-2 py-0.5 rounded">
              {QUADRANT_CONFIGS[currentStandingZone].shape} {QUADRANT_CONFIGS[currentStandingZone].label}
            </span>
            <span className="text-[11px] text-gray-300">(Masih bisa pindah!)</span>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-xl text-[11px] font-bold text-gray-400 shadow-md backdrop-blur">
            📍 Zona Netral (Tengah)
          </div>
        )}
      </div>

      {/* Keyboard movement hint */}
      <div className="absolute top-3 right-3 hidden md:flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-lg text-[10px] text-gray-300 border border-white/10 pointer-events-none">
        <span>Gunakan</span>
        <kbd className="bg-slate-800 px-1 rounded font-mono font-bold text-white">W</kbd>
        <kbd className="bg-slate-800 px-1 rounded font-mono font-bold text-white">A</kbd>
        <kbd className="bg-slate-800 px-1 rounded font-mono font-bold text-white">S</kbd>
        <kbd className="bg-slate-800 px-1 rounded font-mono font-bold text-white">D</kbd>
        <span>/ Arrow & Space</span>
      </div>

      {/* Bottom Interactive Quick-Move Dock */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
        {/* 4 Quadrant Quick-Run Buttons */}
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
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-90 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xl border border-purple-400/40 flex items-center gap-1 cursor-pointer transition-all shrink-0"
        >
          <span>🦘</span>
          <span>Lompat</span>
        </button>
      </div>
    </div>
  );
}
