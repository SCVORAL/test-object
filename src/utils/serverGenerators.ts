import type { Server } from "../store/types/serversTypes";
import {
  getRandomPositiveFloat,
  generateRandomId,
  generateRandomStatus,
  generateRandomRuntime,
  generateRandomState,
} from "./random";

let serverCounter = 0;

export const createNewServer = (dataServer: Partial<Server>): Server => {
  serverCounter += 1;

  const cpuTotal = Math.floor(Math.random() * 12) + 1;
  const memoryTotal = Math.floor(Math.random() * 50) + 1;

  const cpuUsed = getRandomPositiveFloat(Math.max(cpuTotal - 1, 1));
  const memoryUsed = getRandomPositiveFloat(Math.max(memoryTotal - 1, 1));

  return {
    id: generateRandomId(),
    name: dataServer.name || `New Server ${serverCounter}`,
    state: generateRandomStatus(),
    host: generateRandomId(),
    cpu: {
      used: cpuUsed,
      total: cpuTotal,
    },
    memory: {
      used: memoryUsed,
      total: memoryTotal,
    },
    uptime: generateRandomRuntime(),
    alert: generateRandomState(),
    traffic: [],
    virtualizedCPU: dataServer.virtualizedCPU || false,
  };
};
