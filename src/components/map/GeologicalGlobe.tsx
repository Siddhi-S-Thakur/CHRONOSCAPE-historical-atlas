import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { Eye, Info, Play, Pause, ChevronRight, Layers, Compass } from 'lucide-react';

interface GeologicalStage {
  id: string;
  mya: number;
  label: string;
  subtitle: string;
  speed: string;
  description: string;
  evidence: string;
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
}

const GEOLOGICAL_STAGES: GeologicalStage[] = [
  {
    id: 'stage-71',
    mya: 71,
    label: '71 Ma',
    subtitle: 'Gondwana Breakup & Oceanic Sprint',
    speed: '~18–20 cm/year (Fastest known continental drift)',
    description:
      'Following detachment from Madagascar and the Seychelles microcontinent, the isolated Indian cratonic plate drifted rapidly northward across the Neo-Tethys Ocean, propelled by super-plume upwelling.',
    evidence: 'Paleomagnetic pole tracking from deep-sea sediment cores; Carlsberg Ridge magnetic anomaly stripes.',
    cameraPos: [1.2, -0.6, 2.5],
    targetPos: [0.15, -0.1, 0.4],
  },
  {
    id: 'stage-66',
    mya: 66,
    label: '66 Ma',
    subtitle: 'Deccan Traps Flood Basalts & K-Pg Boundary',
    speed: '~16 cm/year across the Réunion Mantle Plume',
    description:
      'As India drifted over the Réunion hotspot, massive mantle fissures erupted >1,000,000 km³ of flood basalts across western India within ~500,000 years, coinciding with the Cretaceous-Paleogene extinction event.',
    evidence: 'Deccan Traps stratigraphy (Western Ghats step cliffs), iridium-enriched intertrappean paleosols.',
    cameraPos: [1.0, 0.2, 2.4],
    targetPos: [0.2, 0.1, 0.4],
  },
  {
    id: 'stage-55',
    mya: 55,
    label: '55 Ma',
    subtitle: 'First Continental Contact with Eurasia',
    speed: 'Deceleration to ~10 cm/year on initial crustal resistance',
    description:
      'The leading northern margin of the greater Indian plate made its initial subduction contact with the southern Eurasian active margin (Lhasa block / Gangdese arc), initiating the annihilation of the Tethyan seaway.',
    evidence: 'Marine-to-continental facies transition in the Indus-Yarlung Suture Zone; radiolarian extinction horizons.',
    cameraPos: [0.6, 0.8, 2.3],
    targetPos: [0.25, 0.35, 0.4],
  },
  {
    id: 'stage-38',
    mya: 38,
    label: '38 Ma',
    subtitle: 'Tethys Closure & Proto-Himalayan Buckling',
    speed: '~6–8 cm/year with severe crustal shortening',
    description:
      'The oceanic seaway completely closed. Massive crystalline slabs began thrusting southward along the Main Central Thrust (MCT), doubling the continental crust thickness to create the proto-Tibetan Plateau.',
    evidence: 'Metamorphic kyanite-sillimanite assemblages of the Higher Himalayan Crystalline; Zanskar suture exposures.',
    cameraPos: [0.4, 0.9, 2.2],
    targetPos: [0.28, 0.4, 0.4],
  },
  {
    id: 'stage-present',
    mya: 0,
    label: 'Present Day',
    subtitle: 'Continuous Orogeny & Subcontinental Unity',
    speed: '~4–5 cm/year continuing northward push',
    description:
      'India continues underthrusting beneath Eurasia along the Main Himalayan Thrust (MHT), causing active seismic deformation and elevating Mount Everest and the Karakoram range by ~5 mm annually.',
    evidence: 'Modern continuous GPS geodetic vectors (Wadia Institute / Survey of India); seismic focal mechanisms.',
    cameraPos: [0.2, 0.9, 2.4],
    targetPos: [0.3, 0.38, 0.4],
  },
];

export const GeologicalGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [showEvidenceDrawer, setShowEvidenceDrawer] = useState(false);
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<'drift' | 'collision' | 'tectonics'>('collision');

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);

  const activeStage = GEOLOGICAL_STAGES[activeStageIndex];

  // ─── Set up Three.js Scene ────────────────────────────────────────────────
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0.6, 0.4, 2.8);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.3;
    controls.maxDistance = 5.5;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 0.6;
    controlsRef.current = controls;

    // ─── Starfield ───────────────────────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3000;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starCoords[i] = (Math.random() - 0.5) * 350;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.16,
      transparent: true,
      opacity: 0.75,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ─── Lighting ────────────────────────────────────────────────────────────
    const ambLight = new THREE.AmbientLight(0x24324a, 1.2);
    scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xfff6e8, 2.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x4080ff, 0.8);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // ─── Globe Group ─────────────────────────────────────────────────────────
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    // Globe Sphere
    const globeGeo = new THREE.SphereGeometry(1.0, 64, 64);

    // Procedural Earth canvas fallback & initial texture
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Ocean deep gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGrad.addColorStop(0, '#091522');
    oceanGrad.addColorStop(0.5, '#0c1f33');
    oceanGrad.addColorStop(1, '#091522');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Land silhouettes
    ctx.fillStyle = '#1c2822';
    // Eurasia
    ctx.beginPath();
    ctx.ellipse(1120, 270, 560, 180, 0.08, 0, Math.PI * 2);
    ctx.fill();
    // Africa
    ctx.beginPath();
    ctx.ellipse(880, 520, 140, 230, -0.05, 0, Math.PI * 2);
    ctx.fill();

    const canvasTexture = new THREE.CanvasTexture(canvas);
    const globeMat = new THREE.MeshPhongMaterial({
      map: canvasTexture,
      specular: new THREE.Color(0x19324a),
      shininess: 12,
    });

    // Load authentic NASA Blue Marble texture
    const texLoader = new THREE.TextureLoader();
    texLoader.load(
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg',
      (tex) => {
        globeMat.map = tex;
        globeMat.needsUpdate = true;
      }
    );

    const globe = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globe);

    // Atmosphere halo
    const atmosGeo = new THREE.SphereGeometry(1.045, 48, 48);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    globeGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

    // ─── Indian Plate 3D Highlight ──────────────────────────────────────────
    // Indian subcontinent region roughly: lng 68–92°E, lat 8–35°N
    const plateGeo = new THREE.SphereGeometry(
      1.012,
      32,
      32,
      (68 * Math.PI) / 180,
      (24 * Math.PI) / 180,
      ((90 - 35) * Math.PI) / 180,
      (27 * Math.PI) / 180
    );
    const plateMat = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    globeGroup.add(plateMesh);

    // ─── Tethys Suture Boundary (Crimson Line) ───────────────────────────────
    const suturePoints: THREE.Vector3[] = [];
    const r = 1.018;
    for (let lng = 62; lng <= 98; lng += 2) {
      const lat = 32 + Math.sin(((lng - 62) / 36) * Math.PI) * 4;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      suturePoints.push(
        new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        )
      );
    }
    const sutureGeo = new THREE.BufferGeometry().setFromPoints(suturePoints);
    const sutureMat = new THREE.LineBasicMaterial({
      color: 0xe63946,
      linewidth: 2,
    });
    const sutureLine = new THREE.Line(sutureGeo, sutureMat);
    globeGroup.add(sutureLine);

    // ─── Northward Drift Trajectory Arc ─────────────────────────────────────
    const trajectoryPoints: THREE.Vector3[] = [];
    // From near Madagascar (lat -15°, lng 60°) to modern position (lat 25°, lng 78°)
    for (let step = 0; step <= 24; step++) {
      const progress = step / 24;
      const lat = -20 + progress * 46;
      const lng = 58 + progress * 21;
      const arcR = 1.02 + Math.sin(progress * Math.PI) * 0.05; // slightly elevated arc
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      trajectoryPoints.push(
        new THREE.Vector3(
          -arcR * Math.sin(phi) * Math.cos(theta),
          arcR * Math.cos(phi),
          arcR * Math.sin(phi) * Math.sin(theta)
        )
      );
    }
    const trajectoryGeo = new THREE.BufferGeometry().setFromPoints(trajectoryPoints);
    const trajectoryMat = new THREE.LineDashedMaterial({
      color: 0xffd166,
      dashSize: 0.04,
      gapSize: 0.02,
      linewidth: 2,
    });
    const trajectoryLine = new THREE.Line(trajectoryGeo, trajectoryMat);
    trajectoryLine.computeLineDistances();
    globeGroup.add(trajectoryLine);

    // ─── Deccan Traps Hotspot Eruption Marker ────────────────────────────────
    const deccanPhi = (90 - 19) * (Math.PI / 180);
    const deccanTheta = (74 + 180) * (Math.PI / 180);
    const deccanPos = new THREE.Vector3(
      -1.02 * Math.sin(deccanPhi) * Math.cos(deccanTheta),
      1.02 * Math.cos(deccanPhi),
      1.02 * Math.sin(deccanPhi) * Math.sin(deccanTheta)
    );
    const deccanGeo = new THREE.RingGeometry(0.015, 0.035, 16);
    const deccanMat = new THREE.MeshBasicMaterial({
      color: 0xff4d4d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const deccanRing = new THREE.Mesh(deccanGeo, deccanMat);
    deccanRing.position.copy(deccanPos);
    deccanRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(deccanRing);

    // Initial cinematic GSAP zoom
    gsap.fromTo(camera.position, { z: 4.8 }, { z: 2.7, duration: 2.2, ease: 'power3.out' });

    // ─── Animation Loop ──────────────────────────────────────────────────────
    let frameId = 0;
    let pulseTime = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();

      // Deccan pulse
      pulseTime += 0.04;
      const pulseScale = 1 + Math.sin(pulseTime * 2) * 0.25;
      deccanRing.scale.set(pulseScale, pulseScale, 1);

      renderer.render(scene, camera);
    };
    animate();

    // ─── Resize ─────────────────────────────────────────────────────────────
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update auto-rotate in controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // ─── Switch Stage with GSAP Camera Transition ───────────────────────────
  const goToStage = useCallback((index: number) => {
    setActiveStageIndex(index);
    const stage = GEOLOGICAL_STAGES[index];
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) return;

    // Turn off auto-rotate temporarily during focused inspection
    setIsAutoRotating(false);

    gsap.to(camera.position, {
      x: stage.cameraPos[0],
      y: stage.cameraPos[1],
      z: stage.cameraPos[2],
      duration: 1.8,
      ease: 'power2.inOut',
    });

    gsap.to(controls.target, {
      x: stage.targetPos[0],
      y: stage.targetPos[1],
      z: stage.targetPos[2],
      duration: 1.8,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#050811] select-none">
      {/* 3D Three.js WebGL Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* ── Top Header Banner ────────────────────────────────────────────── */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121622]/80 border border-[#C5A059]/40 backdrop-blur-md mb-2">
          <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
          <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase">
            Deep-Time Paleogeographic Engine
          </span>
        </div>
        <h1 className="font-serif-title text-2xl md:text-3xl text-[#F3EFE6] tracking-[0.25em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
          THE CONTINENTAL SPRINT & COLLISION
        </h1>
        <p className="text-[#8E97AA] font-mono text-[11px] tracking-widest mt-1">
          GONDWANA RIFTING • RÉUNION HOTSPOT • TETHYAN SUBDUCTION • HIMALAYAN OROGENY
        </p>
      </div>

      {/* ── Top-Right Controls ───────────────────────────────────────────── */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E121A]/90 hover:bg-[#1A202C] border border-[#262D3D] text-[#CCD2E0] text-xs font-mono backdrop-blur-md transition-all shadow-lg"
          title="Toggle 3D Orbit Auto-Rotation"
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5 text-[#C5A059]" /> : <Play className="w-3.5 h-3.5 text-[#C5A059]" />}
          <span>{isAutoRotating ? 'PAUSE ROTATION' : 'AUTO ORBIT'}</span>
        </button>

        <button
          onClick={() => setShowEvidenceDrawer(!showEvidenceDrawer)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-mono backdrop-blur-md transition-all shadow-lg ${
            showEvidenceDrawer
              ? 'bg-[#C5A059] text-[#0A0D14] border-[#E8CF91] font-bold shadow-[0_0_15px_rgba(197,160,89,0.4)]'
              : 'bg-[#18120B]/90 hover:bg-[#2A1F10] border-[#C5A059]/50 text-[#E8CF91]'
          }`}
          title="Open authentic scientific diagrams & collision animations"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>SCIENTIFIC EVIDENCE</span>
        </button>
      </div>

      {/* ── 3D Visual Legend (Bottom-Left) ────────────────────────────────── */}
      <div className="absolute bottom-24 left-6 z-10 pointer-events-none hidden md:block">
        <div className="bg-[#0B0F19]/85 border border-[#1F2637] p-3.5 rounded-xl backdrop-blur-md space-y-2.5 shadow-2xl max-w-xs">
          <div className="text-[10px] font-mono tracking-widest text-[#78849A] uppercase border-b border-[#1F2637] pb-1">
            3D Geological Markers
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#E2E8F0]">
            <span className="w-3.5 h-3.5 rounded bg-[#C5A059]/70 border border-[#C5A059] shrink-0" />
            <span>Indian Craton Plate (Drifting North)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#E2E8F0]">
            <span className="w-4 h-1 bg-[#E63946] rounded-full shrink-0" />
            <span>Indus-Yarlung Suture Zone (Collision Front)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#E2E8F0]">
            <span className="w-4 h-0.5 border-t border-dashed border-[#FFD166] shrink-0" />
            <span>Northward Trajectory (~18–20 cm/yr)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#E2E8F0]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D4D] animate-ping shrink-0" />
            <span>Deccan Traps Mantle Plume (~66 Ma)</span>
          </div>
        </div>
      </div>

      {/* ── Interactive Stage Scrubber (Bottom Bar) ───────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl">
        <div className="bg-[#0A0D15]/95 border border-[#222A3A] rounded-2xl p-4 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          {/* Stage Buttons */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {GEOLOGICAL_STAGES.map((st, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={st.id}
                  onClick={() => goToStage(idx)}
                  className={`py-2 px-1 rounded-xl text-center transition-all duration-300 relative ${
                    isActive
                      ? 'bg-gradient-to-b from-[#2A2114] to-[#17130A] border border-[#C5A059] shadow-[0_0_18px_rgba(197,160,89,0.3)]'
                      : 'bg-[#101420]/70 hover:bg-[#181F30] border border-[#1E2536] text-[#8692A6]'
                  }`}
                >
                  <span
                    className={`block font-serif-title text-xs md:text-sm font-bold tracking-wider ${
                      isActive ? 'text-[#C5A059]' : 'text-[#8E97AA]'
                    }`}
                  >
                    {st.label}
                  </span>
                  <span className="hidden sm:block text-[9px] font-mono text-[#6A758D] truncate mt-0.5">
                    {st.subtitle.split(' ')[0]}...
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#C5A059] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Stage Narrative Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-[#1C2333]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif-title text-[#F3EFE6] text-sm md:text-base font-semibold">
                  {activeStage.subtitle}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#E6C687] border border-[#C5A059]/30">
                  {activeStage.speed}
                </span>
              </div>
              <p className="text-xs text-[#A0AABF] leading-relaxed max-w-2xl">
                {activeStage.description}
              </p>
            </div>

            <button
              onClick={() => {
                setShowEvidenceDrawer(true);
                setActiveEvidenceTab(activeStageIndex <= 1 ? 'drift' : activeStageIndex === 2 ? 'collision' : 'tectonics');
              }}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182030] hover:bg-[#222D44] border border-[#2D3850] text-[#CCD5E8] text-xs font-mono transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Inspect Evidence</span>
              <ChevronRight className="w-3 h-3 text-[#78849A]" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Authentic Scientific Evidence Drawer / Modal ─────────────────── */}
      {showEvidenceDrawer && (
        <div className="absolute inset-y-0 right-0 z-30 w-full sm:w-[460px] md:w-[520px] bg-[#090C14]/98 border-l border-[#222A3A] shadow-[-15px_0_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#1E2536] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div>
                <h3 className="font-serif-title text-[#F3EFE6] text-base font-bold tracking-wide">
                  Paleogeographic Reconstructions
                </h3>
                <span className="text-[10px] font-mono text-[#78849A]">
                  PRIMARY SCIENTIFIC DATA & SEISMIC PROFILES
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowEvidenceDrawer(false)}
              className="w-8 h-8 rounded-lg bg-[#141824] hover:bg-[#1E2436] text-[#8E97AA] hover:text-[#F3EFE6] flex items-center justify-center text-sm font-mono transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-3 p-3 gap-2 bg-[#0C101A] border-b border-[#1E2536]">
            {[
              { id: 'collision', label: 'Collision GIF' },
              { id: 'drift', label: '71 Ma Map' },
              { id: 'tectonics', label: 'Crustal Thrust' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveEvidenceTab(tab.id as any)}
                className={`py-2 px-2 text-xs font-mono rounded-lg transition-all ${
                  activeEvidenceTab === tab.id
                    ? 'bg-[#C5A059] text-[#0A0D14] font-bold shadow-md'
                    : 'text-[#8E97AA] hover:text-[#F3EFE6] hover:bg-[#161D2C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Media & Explanations Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeEvidenceTab === 'collision' && (
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-[#2A344A] bg-[#000] shadow-2xl relative">
                  <img
                    src="/images/geology/collision.gif"
                    alt="India-Eurasia Continental Collision Time-Lapse"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#000]/80 px-2 py-0.5 rounded text-[9px] font-mono text-[#8E97AA]">
                    71 Ma → 0 Ma Simulation
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif-title text-[#E6C687] text-sm font-bold">
                    Kinematic Annihilation of Neo-Tethys Ocean
                  </h4>
                  <p className="text-xs text-[#A0AABF] leading-relaxed">
                    This scientific reconstruction captures the 6,000+ kilometer northward migration of the Indian subcontinent. Notice the drastic deceleration when continental lithosphere made contact at ~55 Ma, transitioning from oceanic subduction to intense intra-continental shortening.
                  </p>
                  <div className="p-3 rounded-lg bg-[#121724] border border-[#1E273A] text-[11px] font-mono text-[#78849A]">
                    Source: Wikimedia Commons / USGS / Paleogeographic Mapping Project.
                  </div>
                </div>
              </div>
            )}

            {activeEvidenceTab === 'drift' && (
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-[#2A344A] bg-[#000] shadow-2xl relative">
                  <img
                    src="/images/geology/drift_71mya.jpg"
                    alt="Indian Plate Movement Towards Eurasia 71 Mya Onward"
                    className="w-full h-auto object-contain bg-[#111]"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#000]/80 px-2 py-0.5 rounded text-[9px] font-mono text-[#8E97AA]">
                    Paleomagnetic Trajectory
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif-title text-[#E6C687] text-sm font-bold">
                    Temporal Footprint from 71 Ma to Present
                  </h4>
                  <p className="text-xs text-[#A0AABF] leading-relaxed">
                    The diagram delineates the exact paleogeographic positions of India:
                    <br />• <strong>71 Ma:</strong> Lat -10°S (Southern Hemisphere)
                    <br />• <strong>55 Ma:</strong> Equator crossing at ~20 cm/year
                    <br />• <strong>38 Ma:</strong> Initial collision with Lhasa block
                    <br />• <strong>10 Ma:</strong> High Himalayan wedge extrusion
                  </p>
                  <div className="p-3 rounded-lg bg-[#121724] border border-[#1E273A] text-[11px] font-mono text-[#78849A]">
                    Citation: Scotese (PALEOMAP Project) & Molnar & Tapponnier (Science 1975).
                  </div>
                </div>
              </div>
            )}

            {activeEvidenceTab === 'tectonics' && (
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-[#2A344A] bg-[#000] shadow-2xl">
                  <img
                    src="/images/geology/tectonic_summary.png"
                    alt="Himalayan Tectonic Summary Cross-Section"
                    className="w-full h-auto object-contain bg-[#111]"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif-title text-[#E6C687] text-sm font-bold">
                    Crustal Shortening & Thrust Fault Architecture
                  </h4>
                  <p className="text-xs text-[#A0AABF] leading-relaxed">
                    The ongoing convergence produces a succession of southward-propagating thrust faults:
                    <br />1. <strong>MCT (Main Central Thrust):</strong> Active in Early Miocene (~20 Ma), juxtaposing High Himalayan crystalline gneisses over Lesser Himalayan metasediments.
                    <br />2. <strong>MBT (Main Boundary Thrust):</strong> Propagated in Late Miocene.
                    <br />3. <strong>HFT (Himalayan Frontal Thrust):</strong> Active today at the boundary of the Indo-Gangetic alluvium.
                  </p>
                  <div className="p-3 rounded-lg bg-[#121724] border border-[#1E273A] text-[11px] font-mono text-[#78849A]">
                    Geological Survey of India & Wadia Institute of Himalayan Geology.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
