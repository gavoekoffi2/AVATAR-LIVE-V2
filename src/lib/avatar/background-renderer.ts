import * as THREE from "three";

/**
 * BackgroundRenderer — Manages background rendering for the avatar scene
 *
 * Supports:
 * - Solid colors
 * - CSS gradients (parsed to closest color)
 * - Image textures
 * - Transparent background
 */
export class BackgroundRenderer {
  private scene: THREE.Scene;
  private backgroundMesh: THREE.Mesh | null = null;
  private textureLoader = new THREE.TextureLoader();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Set a solid color background
   */
  setColor(color: string): void {
    this.clearBackground();
    this.scene.background = new THREE.Color(color);
  }

  /**
   * Set background from a CSS gradient string
   * Extracts the first color for the scene background
   */
  setGradient(cssGradient: string): void {
    this.clearBackground();

    // Extract colors from the gradient
    const colors = cssGradient.match(/#[0-9a-fA-F]{6}/g);
    if (colors && colors.length >= 2) {
      // Create a gradient-like effect with a plane
      const geometry = new THREE.PlaneGeometry(10, 6);
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        colors.forEach((color, i) => {
          gradient.addColorStop(i / (colors.length - 1), color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        this.backgroundMesh = new THREE.Mesh(geometry, material);
        this.backgroundMesh.position.set(0, 1.2, -3);
        this.scene.add(this.backgroundMesh);
      }
    } else if (colors && colors.length === 1) {
      this.scene.background = new THREE.Color(colors[0]);
    }
  }

  /**
   * Set background from an image URL
   */
  setImage(imageUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.clearBackground();

      this.textureLoader.load(
        imageUrl,
        (texture) => {
          const aspect = texture.image.width / texture.image.height;
          const geometry = new THREE.PlaneGeometry(5 * aspect, 5);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
          });
          this.backgroundMesh = new THREE.Mesh(geometry, material);
          this.backgroundMesh.position.set(0, 1.2, -3);
          this.scene.add(this.backgroundMesh);
          resolve();
        },
        undefined,
        reject
      );
    });
  }

  /**
   * Set transparent background (alpha)
   */
  setTransparent(): void {
    this.clearBackground();
    this.scene.background = null;
  }

  /**
   * Clear current background
   */
  private clearBackground(): void {
    if (this.backgroundMesh) {
      this.scene.remove(this.backgroundMesh);
      if (this.backgroundMesh.material instanceof THREE.MeshBasicMaterial) {
        this.backgroundMesh.material.dispose();
        if (this.backgroundMesh.material.map) {
          this.backgroundMesh.material.map.dispose();
        }
      }
      this.backgroundMesh.geometry.dispose();
      this.backgroundMesh = null;
    }
    this.scene.background = null;
  }

  dispose(): void {
    this.clearBackground();
  }
}
