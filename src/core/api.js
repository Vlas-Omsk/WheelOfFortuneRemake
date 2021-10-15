import { randomInteger } from "./utils.js";

export function getBetTypes() {
  return [
    { type: "gray", color: "#555", width: 18, coef: 2 },
    { type: "red", color: "#c8354e", width: 22, coef: 3 },
    { type: "blue", color: "#45b5da", width: 28, coef: 4 },
    { type: "gold", color: "#ffc870", width: 36, coef: 8 },
  ];
}

export function getBetHistory() {
  return [
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "red" },
    { type: "blue" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "red" },
    { type: "blue" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "red" },
    { type: "blue" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "red" },
    { type: "blue" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "red" },
    { type: "blue" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "red" },
    { type: "blue" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "red" },
    { type: "blue" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "gold" },
    { type: "gray" },
    { type: "red" },
    { type: "blue" },
    { type: "gray" },
    { type: "gold" },
  ];
}

export function getState() {
  return { angle: 3 };
}

export function getParts() {
  const parts = [];
  const partsCount = 54;
  const blueParts = [5, 7, 15, 17, 25, 27, 35, 37, 45, 47];

  for (let i = 0; i < partsCount; i++) {
    if (i == 26) parts.push("gold");
    else if (blueParts.indexOf(i) !== -1) parts.push("blue");
    else if (i % 2 !== 0) parts.push("red");
    else parts.push("gray");
  }

  return parts;
}

export function getNextSpin() {
  return { relativeAngle: randomInteger(0, 360) * 10 };
}
