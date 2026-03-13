import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import type { VRM } from "@pixiv/three-vrm";

/**
 * VRMLoader — Convenience wrapper for loading VRM files
 *
 * Handles GLTFLoader setup with VRMLoaderPlugin, optimization,
 * and progress callbacks.
 */
export class VRMLoader {
  private loader: GLTFLoader;

  constructor() {
    this.loader = new GLTFLoader();
    this.loader.register((parser) => new VRMLoaderPlugin(parser));
  }

  /**
   * Load a VRM model from a URL
   */
  async load(
    url: string,
    onProgress?: (progress: number) => void
  ): Promise<VRM> {
    const gltf = await this.loader.loadAsync(url, (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(event.loaded / event.total);
      }
    });

    const vrm = gltf.userData.vrm as VRM;
    if (!vrm) {
      throw new Error("Failed to load VRM from file");
    }

    // Optimize the model
    VRMUtils.removeUnnecessaryJoints(vrm.scene);

    // VRM models face +Z by default, rotate to face camera
    vrm.scene.rotation.y = Math.PI;

    return vrm;
  }

  /**
   * Load and add a VRM model to a scene
   */
  async loadIntoScene(
    url: string,
    scene: THREE.Scene,
    onProgress?: (progress: number) => void
  ): Promise<VRM> {
    const vrm = await this.load(url, onProgress);
    scene.add(vrm.scene);
    return vrm;
  }

  /**
   * Remove a VRM model from a scene
   */
  removeFromScene(vrm: VRM, scene: THREE.Scene): void {
    scene.remove(vrm.scene);
  }
}

/**
 * Test VRM model URL for development
 */
export const TEST_VRM_URL =
  "https://github.com/pixiv/three-vrm/raw/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm";
