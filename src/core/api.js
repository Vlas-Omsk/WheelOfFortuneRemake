import { randomInteger, roundFloat } from "@/core/utils.js";

const betList = {
  gray: [
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
  ],
  red: [
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
  ],
  blue: [
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
  ],
  gold: [
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
    { bet: 2002.32, username: "Username" },
    { bet: 50033.99, username: "Wallhack" },
  ],
};
const username = "currentUser";
const onNewBetEventHandlers = [];

/**
 * @typedef {Object} NewBetEventArgs
 * @property {number} bet
 * @property {string} type
 * @property {string} username
 */

/**
 * @callback NewBetEventHandler
 * @param {NewBetEventArgs} e
 */

/**
 * ?????????????????????????? ???? ???????????????? ?????????? ????????????
 * @param {NewBetEventHandler} callback
 */
export function onNewBet(callback) {
  onNewBetEventHandlers.push(callback);
}

/**
 * @typedef {Object} BetType
 * @property {string} type
 * @property {string} color CSS color
 * @property {number} width ???????????? ?? ?????????????? ??????????????????
 * @property {number} coef ??????????????????????
 */

/**
 * ???????????????? ?????? ???????? ????????????
 * @returns {BetType[]}
 */
export function getBetTypes() {
  return [
    { type: "gray", color: "#555", width: 18, coef: 2 },
    { type: "red", color: "#c8354e", width: 22, coef: 3 },
    { type: "blue", color: "#45b5da", width: 28, coef: 4 },
    { type: "gold", color: "#ffc870", width: 36, coef: 8 },
  ];
}

/**
 * @typedef {Object} BetHistoryItem
 * @property {string} type
 */

/**
 * ???????????????? ?????????????? ?????????????????? ????????????
 * @returns {BetHistoryItem[]}
 */
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

/**
 * @typedef {Object} WheelState
 * @property {string} angle
 */

/**
 * ???????????????? ?????????????? ?????????????????? ????????????
 * @returns {WheelState}
 */
export function getState() {
  return { angle: 3657 };
}

/**
 * ???????????????? ???????? ?????? ???????????? ????????????
 * @returns {string[]}
 */
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

/**
 * @typedef {Object} NextSpin
 * @property {number} relativeAngle ?????????????????????????? ???????? ?????????????????? ???? ???????????????? ?????????????????? ????????????
 * @property {number} duration ???????????????????????? ??????????????????
 */

/**
 * ???????????????? ?????????????????? ?????????????????? ??????????????????
 * @returns {NextSpin}
 */
export function getNextSpin() {
  return { relativeAngle: randomInteger(0, 360) + 360 * 5, duration: 15000 };
}

/**
 * @typedef {Object} BetListItem
 * @property {number} bet
 * @property {string} username
 */

/**
 * ???????????????? ???????????? ???????????? ?????? ???????? ?????????? ????????????
 * @returns {Object<string, BetListItem[]>}
 */
export function getBetLists() {
  return JSON.parse(JSON.stringify(betList));
}

/**
 * ?????????????? ?????????? ????????????
 * @param {number} bet
 * @param {string} type
 */
export function newBet(bet, type) {
  bet = roundFloat(bet, 2);
  //betList[type].unshift({ bet, username });
  onNewBetEventHandlers.forEach((callback) =>
    callback(type, { bet, username })
  );
}
