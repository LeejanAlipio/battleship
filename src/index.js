import './styles/styles.css';
import Gameboard from './gameboard/gameboard.js';
import Ship from './ship/ship.js';

const BOARD_SIZE = 10;
const FLEET = [
  { name: 'Carrier', size: 5 },
  { name: 'Battleship', size: 4 },
  { name: 'Cruiser', size: 3 },
  { name: 'Submarine', size: 3 },
  { name: 'Destroyer', size: 2 },
];

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="game">
    <header class="game-header">
      <h1>Battleship</h1>
      <p class="intro">Command your fleet. Find the CPU's ships before it finds yours.</p>
    </header>
    <p class="game-status" id="game-status" role="status" aria-live="polite"></p>
    <div class="boards">
      <section class="board-panel" aria-labelledby="player-title">
        <div class="board-heading">
          <div>
            <p class="eyebrow">Your Waters</p>
            <h2 id="player-title">Your fleet</h2>
          </div>
          <span class="board-caption">Ships shown</span>
        </div>
        <div class="board" id="player-board" aria-label="Your fleet board"></div>
      </section>
      <section class="board-panel enemy-panel" aria-labelledby="cpu-title">
        <div class="board-heading">
          <div>
            <p class="eyebrow">Opponent</p>
            <h2 id="cpu-title">CPU fleet</h2>
          </div>
          <span class="board-caption">Select a cell to fire</span>
        </div>
        <div class="board" id="cpu-board" aria-label="CPU fleet board"></div>
      </section>
    </div>
    <footer class="game-footer">
      <div class="legend" aria-label="Board legend">
        <span><i class="legend-swatch ship-swatch"></i>Your ship</span>
        <span><i class="legend-swatch hit-swatch"></i>Hit</span>
        <span><i class="legend-swatch miss-swatch"></i>Miss</span>
      </div>
      <button class="restart-button" id="restart-button" type="button">New game</button>
    </footer>
  </main>
`;

const statusElement = document.querySelector('#game-status');
const playerBoardElement = document.querySelector('#player-board');
const cpuBoardElement = document.querySelector('#cpu-board');
const restartButton = document.querySelector('#restart-button');

let player;
let cpu;
let playerAttacks;
let cpuAttacks;
let gameOver;
let cpuThinking;

function createFleet(gameboard) {
  return FLEET.map(({ name, size }) => {
    const ship = new Ship(size);
    const placements = [];
    const board = gameboard.getBoard();

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let column = 0; column < BOARD_SIZE; column++) {
        for (const isVertical of [false, true]) {
          const endRow = row + (isVertical ? size - 1 : 0);
          const endColumn = column + (isVertical ? 0 : size - 1);
          if (endRow >= BOARD_SIZE || endColumn >= BOARD_SIZE) continue;

          let isOpen = true;
          for (let index = 0; index < size; index++) {
            const currentRow = isVertical ? row + index : row;
            const currentColumn = isVertical ? column : column + index;
            if (board[currentRow][currentColumn] !== null) {
              isOpen = false;
              break;
            }
          }

          if (isOpen) placements.push({ row, column, isVertical });
        }
      }
    }

    if (placements.length === 0) {
      throw new Error(`Could not place the ${name.toLowerCase()}.`);
    }

    const placement = placements[Math.floor(Math.random() * placements.length)];
    const result = gameboard.placeShip(
      ship,
      { row: placement.row, column: placement.column },
      placement.isVertical
    );
    if (!result) {
      throw new Error(`Could not place the ${name.toLowerCase()}.`);
    }

    return { name, ship };
  });
}

function coordinateKey(row, column) {
  return `${row}, ${column}`;
}

function coordinateName(row, column) {
  return `${String.fromCharCode(65 + row)} ${column + 1}`;
}

function createBoard(board, attacks, revealShips, isInteractive) {
  const element = document.createElement('div');
  element.className = 'board-grid';
  element.setAttribute('role', 'grid');

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let column = 0; column < BOARD_SIZE; column++) {
      const cell = document.createElement('button');
      const key = coordinateKey(row, column);
      const ship = board[row][column];
      const wasAttacked = attacks.has(key);
      const label = coordinateName(row, column);

      cell.className = 'cell';
      cell.type = 'button';
      cell.setAttribute('role', 'gridcell');

      if (wasAttacked) {
        const hit = ship !== null;
        cell.classList.add(hit ? 'hit' : 'miss');
        cell.textContent = hit ? 'X' : '•';
        cell.setAttribute('aria-label', `${label}: ${hit ? 'hit' : 'miss'}`);
      } else {
        if (revealShips && ship) cell.classList.add('ship');
        cell.setAttribute(
          'aria-label',
          `${label}: ${revealShips && ship ? 'your ship' : 'unattacked'}`
        );
      }

      cell.disabled =
        !isInteractive || gameOver || cpuThinking || wasAttacked;

      if (isInteractive && !cell.disabled) {
        cell.addEventListener('click', () => takePlayerTurn(row, column));
      }

      element.append(cell);
    }
  }

  return element;
}

function allShipsSunk(fleet) {
  return fleet.every(({ ship }) => ship.isSunk());
}

function render() {
  statusElement.textContent = statusMessage;
  const boards = [
    {
      element: playerBoardElement,
      gameboard: player.gameboard,
      attacks: cpuAttacks,
      revealShips: true,
      isInteractive: false,
    },
    {
      element: cpuBoardElement,
      gameboard: cpu.gameboard,
      attacks: playerAttacks,
      revealShips: false,
      isInteractive: true,
    },
  ];

  for (const { element, gameboard, attacks, revealShips, isInteractive } of boards) {
    element.replaceChildren(
      createBoard(
        gameboard.getBoard(),
        attacks,
        revealShips,
        isInteractive
      )
    );
  }
}

let statusMessage = '';

function takePlayerTurn(row, column) {
  if (gameOver || cpuThinking) return;

  const key = coordinateKey(row, column);
  const hit = cpu.gameboard.getBoard()[row][column] !== null;
  if (!cpu.gameboard.receivedAttack({ row, column })) return;

  playerAttacks.add(key);
  if (allShipsSunk(cpu.fleet)) {
    gameOver = true;
    statusMessage = 'You win! The CPU fleet has been sunk.';
    render();
    return;
  }

  statusMessage = `Your shot at ${coordinateName(row, column)} was a ${hit ? 'hit' : 'miss'}. CPU is choosing a target...`;
  cpuThinking = true;
  render();
  window.setTimeout(takeCpuTurn, 450);
}

function takeCpuTurn() {
  const availableTargets = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let column = 0; column < BOARD_SIZE; column++) {
      if (!cpuAttacks.has(coordinateKey(row, column))) {
        availableTargets.push({ row, column });
      }
    }
  }

  const target =
    availableTargets[Math.floor(Math.random() * availableTargets.length)];
  const key = coordinateKey(target.row, target.column);
  const hit = player.gameboard.getBoard()[target.row][target.column] !== null;
  player.gameboard.receivedAttack(target);
  cpuAttacks.add(key);
  cpuThinking = false;

  if (allShipsSunk(player.fleet)) {
    gameOver = true;
    statusMessage = `CPU wins. Its shot at ${coordinateName(target.row, target.column)} sank your last ship.`;
  } else {
    statusMessage = `CPU fired at ${coordinateName(target.row, target.column)} — ${hit ? 'hit' : 'miss'}. Your turn.`;
  }

  render();
}

function startGame() {
  player = { gameboard: new Gameboard() };
  cpu = { gameboard: new Gameboard() };
  player.fleet = createFleet(player.gameboard);
  cpu.fleet = createFleet(cpu.gameboard);
  playerAttacks = new Set();
  cpuAttacks = new Set();
  gameOver = false;
  cpuThinking = false;
  statusMessage = 'Your turn. Choose a cell on the CPU board to fire.';
  render();
}

restartButton.addEventListener('click', startGame);
startGame();