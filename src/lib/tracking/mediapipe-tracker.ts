import type { TrackingQuality } from "@/types/tracking";

export interface TrackerResult {
  landmarks: Array<{ x: number; y: number; z: number }>;
  blendshapes: Record<string, number>;
  transformationMatrix: number[] | null;
  quality: TrackingQuality;
}

export class MediaPipeTracker {
  private faceLandmarker: unknown = null;
  private isRunning = false;
  private lastTimestamp = -1;

  async initialize(): Promise<void> {
    const { FaceLandmarker, FilesetResolver } = await import(
      "@mediapipe/tasks-vision"
    );

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    this.faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numFaces: 1,
      outputFaceBlendshapes: true,
      outputFacialTransformationMatrixes: true,
    });
  }

  detectForVideo(
    videoElement: HTMLVideoElement,
    timestamp: number
  ): TrackerResult | null {
    if (!this.faceLandmarker || timestamp <= this.lastTimestamp) return null;
    this.lastTimestamp = timestamp;

    const fl = this.faceLandmarker as {
      detectForVideo: (
        video: HTMLVideoElement,
        timestamp: number
      ) => {
        faceLandmarks: Array<Array<{ x: number; y: number; z: number }>>;
        faceBlendshapes: Array<{
          categories: Array<{ categoryName: string; score: number }>;
        }>;
        facialTransformationMatrixes: Array<{ data: number[] }>;
      };
    };

    const results = fl.detectForVideo(videoElement, timestamp);

    if (
      !results.faceLandmarks ||
      results.faceLandmarks.length === 0
    ) {
      return {
        landmarks: [],
        blendshapes: {},
        transformationMatrix: null,
        quality: "lost",
      };
    }

    const landmarks = results.faceLandmarks[0];

    // Parse blendshapes
    const blendshapes: Record<string, number> = {};
    if (results.faceBlendshapes?.[0]) {
      for (const cat of results.faceBlendshapes[0].categories) {
        blendshapes[cat.categoryName] = cat.score;
      }
    }

    const matrix = results.facialTransformationMatrixes?.[0]?.data ?? null;

    // Determine quality based on number of detected landmarks
    let quality: TrackingQuality = "good";
    if (landmarks.length < 400) quality = "fair";
    if (landmarks.length < 200) quality = "poor";

    return { landmarks, blendshapes, transformationMatrix: matrix, quality };
  }

  start(): void {
    this.isRunning = true;
  }

  stop(): void {
    this.isRunning = false;
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }

  dispose(): void {
    this.stop();
    if (this.faceLandmarker) {
      const fl = this.faceLandmarker as { close: () => void };
      fl.close();
      this.faceLandmarker = null;
    }
  }
}
