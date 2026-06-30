import { io, Socket } from "socket.io-client";

type RoomRejoinCallback = () => void;

class WebSocketService {
  private socket: Socket | null = null;
  private backendUrl: string;
  private rejoinCallbacks: Set<RoomRejoinCallback> = new Set();
  private wasEverConnected = false;

  constructor() {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!url && process.env.NODE_ENV !== "production") {
      console.warn("[WebSocket] NEXT_PUBLIC_SOCKET_URL is not set. Socket connection may fail.");
    }
    this.backendUrl = url ?? "";
  }

  public connect(): Socket {
    if (!this.backendUrl) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Connection aborted: backend url is not configured.");
      }
      return this.socket ?? ({} as Socket);
    }

    if (this.socket?.connected) {
      return this.socket;
    }

    if (this.socket) {
      this.socket.connect();
      return this.socket;
    }

    this.socket = io(this.backendUrl, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      autoConnect: true,
      withCredentials: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 30000,
    });

    this.socket.on("connect", () => {
      if (this.wasEverConnected) {
        this.rejoinCallbacks.forEach((cb) => cb());
      }
      this.wasEverConnected = true;
      if (process.env.NODE_ENV !== "production") {
        console.log("[WebSocket] Connected successfully.");
      }
    });

    this.socket.on("connect_error", (err) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Connection error:", err.message);
      }
    });

    this.socket.on("disconnect", (reason) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("[WebSocket] Disconnected:", reason);
      }
    });

    return this.socket;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.wasEverConnected = false;
    }
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public onReconnect(cb: RoomRejoinCallback): () => void {
    this.rejoinCallbacks.add(cb);
    return () => this.rejoinCallbacks.delete(cb);
  }
}

export const webSocketService = new WebSocketService();
