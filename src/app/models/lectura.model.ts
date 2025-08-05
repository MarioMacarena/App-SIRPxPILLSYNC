export interface SensorData {
  temperature: number;
  humidity: number;
  gas_level: number;
  motion_detected: boolean;
  lights?: boolean;
  alarm?: boolean;
  device_id?: string;
}

export interface ControlState {
  temperature?: number | null;
  humidity?: number | null;
  gas?: number | null;
  motion?: boolean | null;
  lights: boolean;
  alarm: boolean;
  simulation_mode?: boolean;
}

export interface ApiStatus {
  system: string;
  uptime: string;
  version: string;
  [key: string]: any;
}
