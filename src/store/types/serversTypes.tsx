export interface Alert {
  type: "important" | "critical" | "moderate" | "all good";
  count?: number;
}

export interface Server {
  id: string;
  name: string;
  state: "Running" | "Stopped";
  host: string;
  cpu: { used: number; total: number };
  memory: { used: number; total: number };
  uptime: string;
  alert: Alert;
  traffic: number[];
  virtualizedCPU: boolean;
}
