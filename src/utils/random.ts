const statesAlerts = ["important", "critical", "moderate", "all good"] as const;

export function generateRandomStatus(): "Running" | "Stopped" {
  return Math.random() < 0.7 ? "Running" : "Stopped";
}

export function generateRandomState() {
  const type = statesAlerts[Math.floor(Math.random() * statesAlerts.length)];
  if (type !== "all good") {
    return {
      type,
      count: Math.floor(Math.random() * 11),
    };
  }
  return { type };
}

export function generateRandomId() {
  const part1 = Math.floor(Math.random() * 100000)
    .toString(16)
    .toUpperCase()
    .padStart(5, "0");
  const part2 = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return `${part1}-${part2}`;
}

export function generateRandomRuntime() {
  const maxSecondsInMonth = 30 * 24 * 60 * 60;
  const totalSeconds = Math.floor(Math.random() * maxSecondsInMonth);

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return `${days}:${hours}:${minutes}:${seconds}`;
}

export function getRandomPositiveFloat(max: number) {
  const num = Math.random() * max;
  return parseFloat(num.toFixed(2)) || 0.01;
}

export const generateTrafficData = (days: number) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    data.push({
      date: `${month}-${day}`,
      TB: Math.floor(Math.random() * 300) + 50,
    });
  }

  return data;
};
