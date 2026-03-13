export class LiveKitStreamClient {
  private room: unknown = null;

  async connect(url: string, token: string): Promise<void> {
    const { Room } = await import("livekit-client");
    const room = new Room();
    await room.connect(url, token);
    this.room = room;
  }

  async publishTracks(stream: MediaStream): Promise<void> {
    if (!this.room) throw new Error("Not connected to LiveKit room");

    const { LocalVideoTrack, LocalAudioTrack } = await import(
      "livekit-client"
    );
    const room = this.room as {
      localParticipant: {
        publishTrack: (track: unknown) => Promise<void>;
      };
    };

    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      const lvTrack = new LocalVideoTrack(videoTrack);
      await room.localParticipant.publishTrack(lvTrack);
    }

    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      const laTrack = new LocalAudioTrack(audioTrack);
      await room.localParticipant.publishTrack(laTrack);
    }
  }

  async disconnect(): Promise<void> {
    if (this.room) {
      const room = this.room as { disconnect: () => Promise<void> };
      await room.disconnect();
      this.room = null;
    }
  }
}
