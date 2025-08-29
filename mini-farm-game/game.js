const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// ---- Game State ----
const state = {
  gold: 0,
  tiles: [],      // ข้อมูลแต่ละช่องบนแผนที่
  buildings: [],  // เก็บอาคาร
};

// สร้างแผนที่พื้นฐาน 20x15
for (let y = 0; y < 15; y++) {
  for (let x = 0; x < 20; x++) {
    state.tiles.push({ x, y, type: 'grass' });
  }
}

// ---- Game Loop ----
function update() {
  // ตัวอย่าง: เพิ่มทองอัตโนมัติ
  state.gold += 0.01;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  state.tiles.forEach(tile => {
    if (tile.type === 'grass') ctx.fillStyle = '#6c9';
    else if (tile.type === 'farm') ctx.fillStyle = '#cc9';
    ctx.fillRect(tile.x * 32, tile.y * 32, 32, 32);
  });
  state.buildings.forEach(b => {
    ctx.fillStyle = '#a52a2a';
    ctx.fillRect(b.x * 32, b.y * 32, 32, 32);
  });
  document.getElementById('gold').innerText = Math.floor(state.gold);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();

// ---- UI: สร้างฟาร์ม ----
document.getElementById('buildFarm').onclick = () => {
  const tile = state.tiles.find(t => t.type === 'grass');
  if (!tile) return alert('ไม่มีช่องว่าง');
  tile.type = 'farm';
  state.buildings.push({ x: tile.x, y: tile.y, type: 'farm' });
};
