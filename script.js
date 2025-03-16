// Scene setup
const scene = new THREE.Scene();

// Set up orthographic camera
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 272;  // Total size of the tilemap (17 * 16 = 272px)
const camera = new THREE.OrthographicCamera(
  -frustumSize / 2,    // left
  frustumSize / 2,     // right
  frustumSize / 2 / aspect,  // top
  -frustumSize / 2 / aspect, // bottom
  0.1,                 // near
  1000                 // far
);

// Position the camera slightly further back to ensure visibility of the tilemap
camera.position.z = 10;
camera.position.y = 0; // Center vertically if needed

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tile size and map dimensions
const tileSize = 16;
const mapSize = 17;  // 17x17 tilemap

// Create a checkerboard pattern with black and white tiles
const createTile = (x, y) => {
  const tileGeometry = new THREE.PlaneGeometry(tileSize, tileSize);
  
  // Alternate between black and white colors based on the tile position
  const isBlack = (x + y) % 2 === 0;  // Checkerboard pattern
  const tileMaterial = new THREE.MeshBasicMaterial({ color: isBlack ? 0x000000 : 0xFFFFFF });
  
  const tile = new THREE.Mesh(tileGeometry, tileMaterial);
  
  // Position tiles to form a grid centered in the window
  tile.position.set(x * tileSize - (mapSize * tileSize) / 2, y * tileSize - (mapSize * tileSize) / 2, 0);
  scene.add(tile);
};

// Create the checkerboard tilemap
for (let i = 0; i < mapSize; i++) {
  for (let j = 0; j < mapSize; j++) {
    createTile(i, j);
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
