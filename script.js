// Scene setup
const scene = new THREE.Scene();

// Set up orthographic camera
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 17 * 16;  // 17 tiles, each 16px wide, so the total size is 272px
const camera = new THREE.OrthographicCamera(
  -frustumSize / 2,    // left
  frustumSize / 2,     // right
  frustumSize / 2 / aspect,  // top
  -frustumSize / 2 / aspect, // bottom
  0.1,                 // near
  1000                 // far
);

// Set camera position
camera.position.z = 10;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tile size and map dimensions
const tileSize = 16;
const mapSize = 17;  // 17x17 tilemap

// Create a material for the tiles
const tileMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Create tiles
const tiles = [];
for (let i = 0; i < mapSize; i++) {
  for (let j = 0; j < mapSize; j++) {
    const tileGeometry = new THREE.PlaneGeometry(tileSize, tileSize);
    const tile = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.position.set(i * tileSize - (mapSize * tileSize) / 2, j * tileSize - (mapSize * tileSize) / 2, 0); // Positioning tiles
    scene.add(tile);
    tiles.push(tile);
}

// Resize event handling to update camera and renderer
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -frustumSize / 2;
  camera.right = frustumSize / 2;
  camera.top = frustumSize / 2 / aspect;
  camera.bottom = -frustumSize / 2 / aspect;
  camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
