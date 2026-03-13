import type { VRM } from "@pixiv/three-vrm";
import { VRMExpressionPresetName } from "@pixiv/three-vrm";
import { LandmarkSmoother } from "@/lib/tracking/landmark-smoother";

/**
 * FaceSolver — Converts raw MediaPipe blendshapes into VRM expressions
 *
 * Maps ARKit-compatible blendshapes from MediaPipe Face Landmarker
 * to VRM expression presets and bone rotations.
 */
export class FaceSolver {
  private smoother = new LandmarkSmoother(0.4);

  /**
   * Apply MediaPipe blendshapes to a VRM model
   */
  applyToVRM(
    vrm: VRM,
    blendshapes: Record<string, number>,
    headRotation?: { x: number; y: number; z: number }
  ): void {
    if (!vrm.expressionManager) return;

    // Eye blink
    const blinkL = this.smoother.smooth(
      "blinkL",
      blendshapes["eyeBlinkLeft"] ?? 0
    );
    const blinkR = this.smoother.smooth(
      "blinkR",
      blendshapes["eyeBlinkRight"] ?? 0
    );
    vrm.expressionManager.setValue(
      VRMExpressionPresetName.BlinkLeft,
      blinkL
    );
    vrm.expressionManager.setValue(
      VRMExpressionPresetName.BlinkRight,
      blinkR
    );

    // Mouth / Jaw
    const jawOpen = this.smoother.smooth(
      "jaw",
      blendshapes["jawOpen"] ?? 0
    );
    vrm.expressionManager.setValue(VRMExpressionPresetName.Aa, jawOpen);

    const mouthFunnel = this.smoother.smooth(
      "funnel",
      blendshapes["mouthFunnel"] ?? 0
    );
    vrm.expressionManager.setValue(VRMExpressionPresetName.Oh, mouthFunnel);

    const mouthPucker = this.smoother.smooth(
      "pucker",
      blendshapes["mouthPucker"] ?? 0
    );
    vrm.expressionManager.setValue(VRMExpressionPresetName.Ou, mouthPucker);

    // Smile
    const smileL = blendshapes["mouthSmileLeft"] ?? 0;
    const smileR = blendshapes["mouthSmileRight"] ?? 0;
    const smile = this.smoother.smooth("smile", (smileL + smileR) / 2);
    vrm.expressionManager.setValue(VRMExpressionPresetName.Happy, smile);

    // Eyebrows
    const browInnerUp = this.smoother.smooth(
      "browUp",
      blendshapes["browInnerUp"] ?? 0
    );
    vrm.expressionManager.setValue(
      VRMExpressionPresetName.Surprised,
      browInnerUp * 0.5
    );

    const browDownL = blendshapes["browDownLeft"] ?? 0;
    const browDownR = blendshapes["browDownRight"] ?? 0;
    const browDown = this.smoother.smooth(
      "browDown",
      (browDownL + browDownR) / 2
    );
    vrm.expressionManager.setValue(
      VRMExpressionPresetName.Angry,
      browDown * 0.5
    );

    // Head rotation
    if (headRotation) {
      const head = vrm.humanoid?.getNormalizedBoneNode("head");
      if (head) {
        const smoothedRot = this.smoother.smoothRotation("head", headRotation);
        head.rotation.x = smoothedRot.x;
        head.rotation.y = smoothedRot.y;
        head.rotation.z = smoothedRot.z;
      }
    }
  }

  reset(): void {
    this.smoother.reset();
  }
}
