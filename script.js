const PUZZLE_SIZE = 4;
const IMAGE_URL = 'https://picsum.photos/400'; // 你可以換成自己的圖片 URL

let tiles = [];
let container = document.getElementById('puzzle-container');
let message = document.getElementById('message');

// 建立拼圖
function createTiles() {
  container.innerHTML = '';
  tiles = [];

  for (let i = 0; i < PUZZLE_SIZE * PUZZLE_SIZE; i++) {
    let tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.backgroundImage = `url(${IMAGE_URL})`;
    let x = i % PUZZLE_SIZE;
    let y = Math.floor(i / PUZZLE_SIZE);
    tile.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
    tile.dataset.index = i;
    tiles.push(tile);
  }
}

// 打亂拼圖
function shuffleTiles() {
  message.textContent = '';
  let shuffled = tiles.slice();
  shuffled.sort(() => Math.random() - 0.5);

  shuffled.forEach((tile, index) => {
    tile.draggable = true;
    tile.addEventListener('dragstart', handleDragStart);
    tile.addEventListener('dragover', e => e.preventDefault());
    tile.addEventListener('drop', handleDrop);
    tile.dataset.position = index;
    container.appendChild(tile);
  });
}

// 拖曳事件
let draggedTile = null;

function handleDragStart(e) {
  draggedTile = e.target;
}

function handleDrop(e) {
  if (e.target === draggedTile) return;

  let fromIndex = Array.from(container.children).indexOf(draggedTile);
  let toIndex = Array.from(container.children).indexOf(e.target);

  container.insertBefore(draggedTile, container.children[toIndex]);
  container.insertBefore(e.target, container.children[fromIndex]);

  checkWin();
}

// 判斷是否完成
function checkWin() {
  let current = Array.from(container.children).map(t => t.dataset.index);
  let correct = [...Array(PUZZLE_SIZE * PUZZLE_SIZE).keys()].map(i => i.toString());

  if (JSON.stringify(current) === JSON.stringify(correct)) {
    message.textContent = '🎉 你完成了拼圖！';
  }
}

// 初始化
document.getElementById('shuffle-button').addEventListener('click', () => {
  createTiles();
  shuffleTiles();
});

// 初次載入
createTiles();
shuffleTiles();
