"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { AvatarInfo } from "@/types/avatar";

interface AvatarPreviewProps {
  avatar: AvatarInfo;
  onClose: () => void;
}

export default function AvatarPreview({ avatar, onClose }: AvatarPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = useTranslations("avatars");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    let cleanup = false;
    let animationId: number;

    async function init() {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import(
          "three/examples/jsm/loaders/GLTFLoader.js"
        );
        const { VRMLoaderPlugin, VRMUtils, VRMExpressionPresetName } =
          await import("@pixiv/three-vrm");

        if (cleanup || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e);

        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
        camera.position.set(0, 1.35, 1.8);
        camera.lookAt(0, 1.35, 0);

        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
        });
        renderer.setSize(400, 400);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(1, 2, 3);
        scene.add(dirLight);

        const loader = new GLTFLoader();
        loader.register((parser) => new VRMLoaderPlugin(parser));

        const gltf = await loader.loadAsync(avatar.vrmUrl);
        const vrm = gltf.userData.vrm;
        if (!vrm || cleanup) return;

        VRMUtils.removeUnnecessaryJoints(vrm.scene);
        vrm.scene.rotation.y = Math.PI;
        scene.add(vrm.scene);
        setIsLoaded(true);

        const clock = new THREE.Clock();

        function animate() {
          if (cleanup) return;
          animationId = requestAnimationFrame(animate);
          const time = clock.getElapsedTime();
          const delta = clock.getDelta();

          // Idle animations
          const head = vrm.humanoid?.getNormalizedBoneNode("head");
          if (head) {
            head.rotation.y = Math.sin(time * 0.5) * 0.1;
            head.rotation.x = Math.sin(time * 0.3) * 0.05;
          }

          // Blink
          const blink = Math.sin(time * 2) > 0.98 ? 1 : 0;
          vrm.expressionManager?.setValue(VRMExpressionPresetName.Blink, blink);

          vrm.update(delta);
          renderer.render(scene, camera);
        }
        animate();
      } catch {
        // Avatar file not found — show fallback
      }
    }

    init();

    return () => {
      cleanup = true;
      if (animationId!) cancelAnimationFrame(animationId);
    };
  }, [avatar.vrmUrl]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass rounded-2xl border border-border/50 p-6 max-w-md w-full">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          {t("preview")}
        </h3>

        <div className="w-full aspect-square rounded-xl overflow-hidden bg-surface2 mb-4">
          <canvas ref={canvasRef} className="w-full h-full" />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        <p className="text-sm text-foreground font-medium mb-1">
          {avatar.name}
        </p>
        <p className="text-xs text-muted mb-4">{avatar.description}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-surface transition-colors"
          >
            {t("select")}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-surface2 text-muted text-sm font-medium hover:text-foreground transition-colors"
          >
            {t("preview")}
          </button>
        </div>
      </div>
    </div>
  );
}
