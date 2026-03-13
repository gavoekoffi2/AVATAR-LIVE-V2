export class LandmarkSmoother {
  private prevValues: Record<string, number> = {};
  private smoothingFactor: number;

  constructor(smoothingFactor = 0.5) {
    this.smoothingFactor = smoothingFactor;
  }

  smooth(key: string, value: number): number {
    if (!(key in this.prevValues)) {
      this.prevValues[key] = value;
      return value;
    }

    const smoothed =
      this.prevValues[key] +
      this.smoothingFactor * (value - this.prevValues[key]);
    this.prevValues[key] = smoothed;
    return smoothed;
  }

  smoothRotation(
    prefix: string,
    rotation: { x: number; y: number; z: number }
  ): { x: number; y: number; z: number } {
    return {
      x: this.smooth(`${prefix}_x`, rotation.x),
      y: this.smooth(`${prefix}_y`, rotation.y),
      z: this.smooth(`${prefix}_z`, rotation.z),
    };
  }

  smoothBlendshapes(
    blendshapes: Record<string, number>
  ): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [key, value] of Object.entries(blendshapes)) {
      result[key] = this.smooth(key, value);
    }
    return result;
  }

  reset(): void {
    this.prevValues = {};
  }
}
