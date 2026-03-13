import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils, VRMExpressionPresetName } from "@pixiv/three-vrm";
import type { VRM } from "@pixiv/three-vrm";

export interface AvatarEngineConfig {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  antialias?: boolean;
  pixelRatio?: number;
}

export class AvatarEngine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock: THREE.Clock;
  private vrm: VRM | null = null;
  private animationId: number | null = null;
  private backgroundMesh: THREE.Mesh | null = null;
  private textureLoader: THREE.TextureLoader;

  public canvas: HTMLCanvasElement;
  public isReady = false;

  constructor(config: AvatarEngineConfig) {
    this.canvas = config.canvas;
    this.clock = new THREE.Clock();
    this.textureLoader = new THREE.TextureLoader();

    // Scene
    this.scene = new THREE.Scene();

    // Camera — framing upper body
    this.camera = new THREE.PerspectiveCamera(
      30,
      config.width / config.height,
      0.1,
      20
    );
    this.camera.position.set(0, 1.35, 1.5);
    this.camera.lookAt(0, 1.35, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: config.canvas,
      alpha: true,
      antialias: config.antialias ?? false,
    });
    this.renderer.setSize(config.width, config.height);
    this.renderer.setPixelRatio(config.pixelRatio ?? 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = false;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(1, 2, 3);
    this.scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x6c5ce7, 0.3);
    rimLight.position.set(-2, 1, -1);
    this.scene.add(rimLight);
  }

  async loadVRM(url: string): Promise<void> {
    if (this.vrm) {
      this.scene.remove(this.vrm.scene);
      this.vrm = null;
    }

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    const gltf = await loader.loadAsync(url);
    const vrm = gltf.userData.vrm as VRM;

    VRMUtils.removeUnnecessaryJoints(vrm.scene);
    vrm.scene.rotation.y = Math.PI;
    this.scene.add(vrm.scene);

    this.vrm = vrm;
    this.isReady = true;
  }

  setBackground(imageUrl: string): void {
    if (this.backgroundMesh) {
      this.scene.remove(this.backgroundMesh);
    }

    this.textureLoader.load(imageUrl, (texture) => {
      const geometry = new THREE.PlaneGeometry(5, 3);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.backgroundMesh = new THREE.Mesh(geometry, material);
      this.backgroundMesh.position.set(0, 1.2, -2);
      this.scene.add(this.backgroundMesh);
    });
  }

  setBackgroundColor(cssGradient: string): void {
    if (this.backgroundMesh) {
      this.scene.remove(this.backgroundMesh);
      this.backgroundMesh = null;
    }

    // Parse first color from gradient for scene background
    const colorMatch = cssGradient.match(/#[0-9a-fA-F]{6}/);
    if (colorMatch) {
      this.scene.background = new THREE.Color(colorMatch[0]);
    } else {
      this.scene.background = new THREE.Color(0x0f0f23);
    }
  }

  applyFaceTracking(data: {
    headRotation?: { x: number; y: number; z: number };
    blendshapes?: Record<string, number>;
  }): void {
    if (!this.vrm) return;

    // Head rotation
    if (data.headRotation) {
      const head = this.vrm.humanoid?.getNormalizedBoneNode("head");
      if (head) {
        head.rotation.x = THREE.MathUtils.lerp(
          head.rotation.x,
          data.headRotation.x,
          0.5
        );
        head.rotation.y = THREE.MathUtils.lerp(
          head.rotation.y,
          data.headRotation.y,
          0.5
        );
        head.rotation.z = THREE.MathUtils.lerp(
          head.rotation.z,
          data.headRotation.z,
          0.3
        );
      }
    }

    // Blendshapes
    if (data.blendshapes && this.vrm.expressionManager) {
      for (const [name, value] of Object.entries(data.blendshapes)) {
        this.vrm.expressionManager.setValue(name, value);
      }
    }
  }

  startRenderLoop(): void {
    if (this.animationId !== null) return;

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      const delta = this.clock.getDelta();

      if (this.vrm) {
        this.vrm.update(delta);
      }

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  stopRenderLoop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  getMediaStream(fps = 30): MediaStream {
    return this.canvas.captureStream(fps);
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  dispose(): void {
    this.stopRenderLoop();
    if (this.vrm) {
      this.scene.remove(this.vrm.scene);
    }
    this.renderer.dispose();
  }

  getVRM(): VRM | null {
    return this.vrm;
  }

  getExpressionPresetName() {
    return VRMExpressionPresetName;
  }
}
