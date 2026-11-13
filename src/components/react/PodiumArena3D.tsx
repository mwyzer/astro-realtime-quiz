import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { PlayerSummary, WorldTheme } from '../../types/quiz';
import { sound } from './SoundPlayer';
import confetti from 'canvas-confetti';

interface PodiumArena3DProps {
  podium: PlayerSummary[];
  worldTheme?: WorldTheme;
}

const TORSO_COLORS = [0xf43f5e, 0x3b82f6, 0x10b981, 0xa855f7, 0xf97316];

export default function PodiumArena3D({ podium, worldTheme = 'arcade' }: PodiumArena3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef(true);
  autoRotateRef.current = autoRotate;

  const triggerCelebration = () => {
    sound.playFanfare();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();
    const bgHex =
      worldTheme === 'pirate'
        ? 0x0c4a6e
        : worldTheme === 'space'
        ? 0x030712
        : worldTheme === 'castle'
        ? 0x1c1917
        : 0x090d16;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.022);

    const w = container.clientWidth || 800;
    const h = container.clientHeight || 380;
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 120);
    camera.position.set(0, 7.2, 14.5);
    camera.lookAt(0, 2.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const canvasTextures: THREE.CanvasTexture[] = [];

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.78);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.35);
    dirLight.position.set(8, 16, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const spotGold = new THREE.PointLight(0xfacc15, 2.2, 22);
    spotGold.position.set(0, 8, 3);
    scene.add(spotGold);

    // Circular Grand Stage Platform
    const stageBase = new THREE.Mesh(
      new THREE.CylinderGeometry(8.5, 9.2, 0.8, 36),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.3 })
    );
    stageBase.position.y = -0.4;
    stageBase.receiveShadow = true;
    scene.add(stageBase);

    const ringGeo = new THREE.TorusGeometry(8.7, 0.14, 12, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const stageRing = new THREE.Mesh(ringGeo, ringMat);
    stageRing.rotation.x = Math.PI / 2;
    stageRing.position.y = 0.02;
    scene.add(stageRing);

    // Helper to create front plaque texture for podium steps
    const createPlaqueTexture = (rankText: string, subText: string, bgHexStr: string, accentHexStr: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgHexStr;
        ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 14;
        ctx.strokeRect(7, 7, 242, 242);

        ctx.fillStyle = accentHexStr;
        ctx.font = '900 96px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(rankText, 128, 105);

        ctx.font = 'bold 28px monospace';
        ctx.fillText(subText, 128, 190);
      }
      const tex = new THREE.CanvasTexture(canvas);
      canvasTextures.push(tex);
      return tex;
    };

    // Podium Steps Config: #1 Center, #2 Left, #3 Right
    const podiumSlots = [
      {
        rank: 1,
        player: podium[0] || { id: 'p1', name: 'Juara 1', avatar: '👑', score: 0, streak: 0 },
        x: 0,
        z: 0,
        height: 3.6,
        color: 0xfacc15,
        bgStr: '#facc15',
        fgStr: '#020617',
        label: 'JUARA 1',
      },
      {
        rank: 2,
        player: podium[1] || null,
        x: -3.4,
        z: 0.4,
        height: 2.5,
        color: 0xcbd5e1,
        bgStr: '#cbd5e1',
        fgStr: '#0f172a',
        label: 'JUARA 2',
      },
      {
        rank: 3,
        player: podium[2] || null,
        x: 3.4,
        z: 0.4,
        height: 1.8,
        color: 0xd97706,
        bgStr: '#d97706',
        fgStr: '#ffffff',
        label: 'JUARA 3',
      },
    ];

    const animatedCharacters: {
      group: THREE.Group;
      baseY: number;
      leftArm: THREE.Mesh;
      rightArm: THREE.Mesh;
      leftLeg: THREE.Mesh;
      rightLeg: THREE.Mesh;
      crown?: THREE.Group;
      phaseOffset: number;
    }[] = [];

    const createChampionCharacter = (player: PlayerSummary, rank: number, torsoHex: number) => {
      const group = new THREE.Group();

      // Torso
      const torso = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 1.2, 0.6),
        new THREE.MeshStandardMaterial({ color: torsoHex, roughness: 0.35 })
      );
      torso.position.y = 1.0;
      torso.castShadow = true;
      group.add(torso);

      // Head
      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.74, 0.74, 0.74),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 })
      );
      head.position.y = 1.98;
      head.castShadow = true;
      group.add(head);

      // Happy Victory Face
      const faceCanvas = document.createElement('canvas');
      faceCanvas.width = 128;
      faceCanvas.height = 128;
      const fctx = faceCanvas.getContext('2d');
      if (fctx) {
        fctx.fillStyle = '#facc15';
        fctx.fillRect(0, 0, 128, 128);
        fctx.fillStyle = '#0f172a';
        fctx.beginPath();
        fctx.arc(40, 48, 8, 0, Math.PI * 2);
        fctx.arc(88, 48, 8, 0, Math.PI * 2);
        fctx.fill();
        fctx.beginPath();
        fctx.arc(64, 70, 24, 0, Math.PI);
        fctx.lineWidth = 6;
        fctx.stroke();
      }
      const faceTex = new THREE.CanvasTexture(faceCanvas);
      canvasTextures.push(faceTex);
      const faceMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.7, 0.7),
        new THREE.MeshBasicMaterial({ map: faceTex })
      );
      faceMesh.position.set(0, 1.98, 0.375);
      group.add(faceMesh);

      // Arms
      const armGeo = new THREE.BoxGeometry(0.38, 1.0, 0.4);
      const armMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
      const leftArm = new THREE.Mesh(armGeo, armMat);
      leftArm.position.set(-0.74, 1.15, 0);
      group.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, armMat);
      rightArm.position.set(0.74, 1.15, 0);
      group.add(rightArm);

      // Legs
      const legGeo = new THREE.BoxGeometry(0.42, 1.0, 0.45);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 });
      const leftLeg = new THREE.Mesh(legGeo, legMat);
      leftLeg.position.set(-0.25, 0.4, 0);
      group.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, legMat);
      rightLeg.position.set(0.25, 0.4, 0);
      group.add(rightLeg);

      // 3D Golden Crown for 1st Place
      let crownGroup: THREE.Group | undefined;
      if (rank === 1) {
        crownGroup = new THREE.Group();
        const crownBase = new THREE.Mesh(
          new THREE.CylinderGeometry(0.48, 0.42, 0.32, 8),
          new THREE.MeshStandardMaterial({
            color: 0xfacc15,
            emissive: 0xd97706,
            emissiveIntensity: 0.4,
            metalness: 0.7,
            roughness: 0.2,
          })
        );
        crownGroup.add(crownBase);
        crownGroup.position.set(0, 2.62, 0);
        group.add(crownGroup);
      }

      // Floating Nametag + Score Sprite
      const tagCanvas = document.createElement('canvas');
      tagCanvas.width = 440;
      tagCanvas.height = 120;
      const tctx = tagCanvas.getContext('2d');
      if (tctx) {
        tctx.fillStyle = rank === 1 ? 'rgba(250, 204, 21, 0.96)' : 'rgba(15, 23, 42, 0.92)';
        tctx.strokeStyle = '#000000';
        tctx.lineWidth = 8;
        tctx.beginPath();
        tctx.roundRect(8, 8, 424, 104, 22);
        tctx.fill();
        tctx.stroke();

        tctx.font = '900 34px Arial, sans-serif';
        tctx.fillStyle = rank === 1 ? '#020617' : '#ffffff';
        tctx.textAlign = 'center';
        tctx.fillText(`#${rank} ${player.avatar} ${player.name}`, 220, 50);

        tctx.font = 'bold 26px monospace';
        tctx.fillStyle = rank === 1 ? '#1e293b' : '#facc15';
        tctx.fillText(`${player.score} PTS`, 220, 90);
      }
      const tagTex = new THREE.CanvasTexture(tagCanvas);
      canvasTextures.push(tagTex);
      const tagSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tagTex, depthTest: false }));
      tagSprite.position.set(0, rank === 1 ? 3.45 : 3.05, 0);
      tagSprite.scale.set(3.2, 0.88, 1);
      group.add(tagSprite);

      return { group, leftArm, rightArm, leftLeg, rightLeg, crown: crownGroup };
    };

    podiumSlots.forEach((slot, idx) => {
      // Create Podium Block
      const blockGeo = new THREE.BoxGeometry(2.8, slot.height, 2.8);
      const sideMat = new THREE.MeshStandardMaterial({
        color: slot.color,
        roughness: 0.35,
        metalness: 0.25,
      });
      const plaqueTex = createPlaqueTexture(
        `${slot.rank}`,
        slot.player ? `${slot.player.score} PTS` : slot.label,
        slot.bgStr,
        slot.fgStr
      );
      const frontMat = new THREE.MeshBasicMaterial({ map: plaqueTex });

      const blockMesh = new THREE.Mesh(blockGeo, [
        sideMat,
        sideMat,
        sideMat,
        sideMat,
        frontMat,
        sideMat,
      ]);
      blockMesh.position.set(slot.x, slot.height / 2, slot.z);
      blockMesh.castShadow = true;
      blockMesh.receiveShadow = true;
      scene.add(blockMesh);

      if (slot.player) {
        const charObj = createChampionCharacter(slot.player, slot.rank, TORSO_COLORS[idx % TORSO_COLORS.length]);
        charObj.group.position.set(slot.x, slot.height + 0.1, slot.z);
        scene.add(charObj.group);
        animatedCharacters.push({
          ...charObj,
          baseY: slot.height + 0.1,
          phaseOffset: idx * 1.3,
        });
      }
    });

    // 3D Falling Confetti Particles
    const confettiCount = 160;
    const confettiMeshes: { mesh: THREE.Mesh; speedY: number; rotSpeed: number; swayOffset: number }[] = [];
    const confettiColors = [0xfacc15, 0xef4444, 0x3b82f6, 0x10b981, 0xec4899, 0xa855f7];
    const confGeo = new THREE.PlaneGeometry(0.22, 0.34);

    for (let i = 0; i < confettiCount; i++) {
      const confMat = new THREE.MeshBasicMaterial({
        color: confettiColors[i % confettiColors.length],
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(confGeo, confMat);
      mesh.position.set(
        (Math.random() - 0.5) * 16,
        Math.random() * 12 + 1,
        (Math.random() - 0.5) * 12
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(mesh);
      confettiMeshes.push({
        mesh,
        speedY: 1.8 + Math.random() * 2.2,
        rotSpeed: 2 + Math.random() * 4,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    // Drag to orbit camera
    let isDragging = false;
    let prevX = 0;
    let orbitYaw = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      setAutoRotate(false);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      orbitYaw -= dx * 0.008;
      prevX = e.clientX;
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const t = now * 0.001;

      if (autoRotateRef.current && !isDragging) {
        orbitYaw = Math.sin(t * 0.55) * 0.42;
      }

      const camRadius = 14.2;
      camera.position.x = Math.sin(orbitYaw) * camRadius;
      camera.position.z = Math.cos(orbitYaw) * camRadius;
      camera.position.y = 6.8 + Math.sin(t * 1.2) * 0.25;
      camera.lookAt(0, 2.5, 0);

      // Animate Podium Champions jumping & cheering
      animatedCharacters.forEach((ch) => {
        const bounce = Math.abs(Math.sin(t * 4.8 + ch.phaseOffset)) * 0.48;
        ch.group.position.y = ch.baseY + bounce;
        ch.leftArm.rotation.x = Math.PI * 0.85 + Math.sin(t * 8 + ch.phaseOffset) * 0.35;
        ch.rightArm.rotation.x = Math.PI * 0.85 - Math.sin(t * 8 + ch.phaseOffset) * 0.35;
        ch.leftLeg.rotation.x = Math.sin(t * 4.8 + ch.phaseOffset) * 0.25;
        ch.rightLeg.rotation.x = -Math.sin(t * 4.8 + ch.phaseOffset) * 0.25;
        if (ch.crown) {
          ch.crown.rotation.y += delta * 2.2;
        }
      });

      // Animate 3D Confetti Rain
      confettiMeshes.forEach((c) => {
        c.mesh.position.y -= c.speedY * delta;
        c.mesh.position.x += Math.sin(t * 2.5 + c.swayOffset) * delta * 0.6;
        c.mesh.rotation.x += c.rotSpeed * delta;
        c.mesh.rotation.y += c.rotSpeed * 0.8 * delta;
        if (c.mesh.position.y < 0) {
          c.mesh.position.y = 12.5;
        }
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      canvasTextures.forEach((tex) => tex.dispose());
    };
  }, [podium, worldTheme]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_#000] bg-[#0b0f19] mb-8 select-none">
      <div ref={mountRef} className="w-full h-[320px] sm:h-[390px] cursor-grab active:cursor-grabbing" />

      {/* Top Left Stage Badge */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none z-10">
        <span className="bg-amber-400 text-slate-950 border-2 border-black px-3 py-1 rounded-xl text-xs font-mono font-black shadow-[2px_2px_0px_#000] uppercase">
          🏆 Panggung Podium 3D Juara
        </span>
        <span className="bg-[#0b0f19]/90 text-slate-300 border-2 border-black px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold hidden sm:inline-block">
          Geser layar untuk memutar kamera panggung
        </span>
      </div>

      {/* Top Right Celebration Controls */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <button
          type="button"
          onClick={() => setAutoRotate((prev) => !prev)}
          className="bg-[#151c2c] hover:bg-slate-800 text-white border-2 border-black px-2.5 py-1 rounded-xl text-xs font-mono font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
        >
          {autoRotate ? '🔄 Orbit Otomatis: ON' : '✋ Kamera Manual'}
        </button>
        <button
          type="button"
          onClick={triggerCelebration}
          className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 border-2 border-black px-3 py-1 rounded-xl text-xs font-mono font-black shadow-[2px_2px_0px_#000] cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
        >
          🎉 Selebrasi & Fanfare!
        </button>
      </div>
    </div>
  );
}
