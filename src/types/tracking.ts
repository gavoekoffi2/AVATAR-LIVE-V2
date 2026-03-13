export type TrackingQuality = "good" | "fair" | "poor" | "lost";

export interface FaceTrackingResult {
  landmarks: Array<{ x: number; y: number; z: number }>;
  blendshapes: Record<string, number>;
  headRotation: { x: number; y: number; z: number };
  quality: TrackingQuality;
}

export interface TrackingConfig {
  maxFaces: number;
  delegate: "GPU" | "CPU";
  targetFps: number;
}
