"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    let animationId: number;
    let cleanup = false;

    async function initAvatar() {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import(
          "three/examples/jsm/loaders/GLTFLoader.js"
        );
        const { VRMLoaderPlugin, VRMUtils, VRMExpressionPresetName } =
          await import("@pixiv/three-vrm");

        if (cleanup || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 20);
        camera.position.set(0, 1.35, 1.5);
        camera.lookAt(0, 1.35, 0);

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Lights
        const ambient = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(1, 2, 3);
        scene.add(dirLight);

        const rimLight = new THREE.DirectionalLight(0x6c5ce7, 0.4);
        rimLight.position.set(-2, 1, -1);
        scene.add(rimLight);

        // Load VRM
        const loader = new GLTFLoader();
        loader.register((parser) => new VRMLoaderPlugin(parser));

        const gltf = await loader.loadAsync(
          "https://github.com/pixiv/three-vrm/raw/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm"
        );
        const vrm = gltf.userData.vrm;
        if (!vrm || cleanup) return;

        VRMUtils.removeUnnecessaryJoints(vrm.scene);
        scene.add(vrm.scene);

        // Center the model
        vrm.scene.rotation.y = Math.PI;

        const clock = new THREE.Clock();
        let lastBlink = 0;
        let blinkState = 0;
        let nextBlinkTime = 3 + Math.random() * 3;

        setIsLoaded(true);

        function animate() {
          if (cleanup) return;
          animationId = requestAnimationFrame(animate);

          const time = clock.getElapsedTime();
          const delta = clock.getDelta();

          if (!vrm) return;

          // Head idle motion
          const head = vrm.humanoid?.getNormalizedBoneNode("head");
          if (head) {
            head.rotation.y = Math.sin(time * 0.5) * 0.08;
            head.rotation.x = Math.sin(time * 0.3) * 0.05;
            head.rotation.z = Math.sin(time * 0.4) * 0.02;
          }

          // Blink
          if (time - lastBlink > nextBlinkTime) {
            blinkState = 1;
            lastBlink = time;
            nextBlinkTime = 3 + Math.random() * 3;
          }
          if (blinkState > 0) {
            blinkState -= delta * 8;
            if (blinkState < 0) blinkState = 0;
          }
          vrm.expressionManager?.setValue(
            VRMExpressionPresetName.Blink,
            blinkState > 0.5 ? 1 : 0
          );

          // Lip sync simulation (talking effect)
          const lipA = Math.max(0, Math.sin(time * 8) * 0.4 + Math.sin(time * 12.5) * 0.2);
          const lipO = Math.max(0, Math.sin(time * 6.3 + 1) * 0.3);
          vrm.expressionManager?.setValue(VRMExpressionPresetName.Aa, lipA);
          vrm.expressionManager?.setValue(VRMExpressionPresetName.Oh, lipO);

          // Subtle smile
          vrm.expressionManager?.setValue(
            VRMExpressionPresetName.Happy,
            Math.sin(time * 0.2) * 0.1 + 0.15
          );

          // Breathing (spine)
          const spine = vrm.humanoid?.getNormalizedBoneNode("spine");
          if (spine) {
            spine.rotation.x = Math.sin(time * 1.5) * 0.008;
          }

          vrm.update(delta);
          renderer.render(scene, camera);
        }

        animate();
      } catch (err) {
        console.warn("Hero avatar failed to load, showing fallback:", err);
      }
    }

    initAvatar();

    return () => {
      cleanup = true;
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-md mx-auto">
      {/* Glow background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl" />

      {/* Canvas container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50 glass">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: isLoaded ? "block" : "none" }}
        />

        {/* Loading / Fallback */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <span className="text-4xl">🎭</span>
            </div>
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* LIVE badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-accent/90 px-3 py-1 rounded-full live-badge">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-xs font-bold tracking-wider">
            LIVE
          </span>
        </div>

        {/* Viewer count */}
        <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full">
          <span className="text-xs text-foreground/80">
            1.2K spectateurs
          </span>
        </div>
      </div>
    </div>
  );
}
