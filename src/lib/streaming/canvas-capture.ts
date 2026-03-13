export interface CombinedStreamConfig {
  videoStream: MediaStream;
  audioStream?: MediaStream;
  videoBitrate?: number;
}

export class CanvasCapture {
  private combinedStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;

  static async getAudioStream(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
  }

  static async getCameraStream(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "user",
        frameRate: { ideal: 30, max: 30 },
      },
    });
  }

  createCombinedStream(config: CombinedStreamConfig): MediaStream {
    const tracks: MediaStreamTrack[] = [
      ...config.videoStream.getVideoTracks(),
    ];

    if (config.audioStream) {
      tracks.push(...config.audioStream.getAudioTracks());
    }

    this.combinedStream = new MediaStream(tracks);
    return this.combinedStream;
  }

  startRecording(
    stream: MediaStream,
    onDataAvailable: (data: Blob) => void,
    options?: { mimeType?: string; videoBitsPerSecond?: number }
  ): void {
    const mimeType =
      options?.mimeType ?? this.getSupportedMimeType();

    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: options?.videoBitsPerSecond ?? 2500000,
    });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        onDataAvailable(e.data);
      }
    };

    this.mediaRecorder.start(1000); // Chunk every second
  }

  stopRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
    }
  }

  private getSupportedMimeType(): string {
    const types = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) return type;
    }

    return "video/webm";
  }

  dispose(): void {
    this.stopRecording();
    if (this.combinedStream) {
      this.combinedStream.getTracks().forEach((t) => t.stop());
      this.combinedStream = null;
    }
  }
}
