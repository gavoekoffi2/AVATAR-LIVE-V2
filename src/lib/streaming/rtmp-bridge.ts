export class RTMPBridge {
  private ws: WebSocket | null = null;
  private isConnected = false;

  connect(wsUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnected = true;
        resolve();
      };

      this.ws.onerror = (err) => {
        reject(err);
      };

      this.ws.onclose = () => {
        this.isConnected = false;
      };
    });
  }

  sendConfig(config: { rtmpUrl: string; streamKey: string }): void {
    if (!this.ws || !this.isConnected) return;
    this.ws.send(JSON.stringify({ type: "config", ...config }));
  }

  sendData(data: Blob): void {
    if (!this.ws || !this.isConnected) return;
    this.ws.send(data);
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }

  getIsConnected(): boolean {
    return this.isConnected;
  }
}
