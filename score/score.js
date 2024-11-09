let scene, camera, renderer;
let player, bullets = [],
    enemies = [];
let score = 0,
    health = 100,
    lives = 3;
let gameOver = false;

function init() {
    // Create Scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Player (Camera Position)
    camera.position.z = 5;

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    // Create environment and enemies
    createEnvironment();

    // Add event listeners for movement and shooting
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('click', shootBullet);

    // Start the game loop
    animate();
}

function createEnvironment() {
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);

    // Spawn enemies
    spawnEnemies();
}

function spawnEnemies() {
    for (let i = 0; i < 5; i++) {
        let enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
        let enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        let enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);

        enemy.position.x = Math.random() * 20 - 10;
        enemy.position.z = Math.random() * -30 - 10;
        enemies.push(enemy);
        scene.add(enemy);
    }
}

// Player movement variables
let moveLeft = false,
    moveRight = false,
    moveForward = false,
    moveBackward = false;
const playerSpeed = 0.1;

// Bullet speed
const bulletSpeed = 0.5;

// Player movement controls
function onKeyDown(event) {
    switch (event.key) {
        case 'ArrowLeft':
        case 'a':
            moveLeft = true;
            break;
        case 'ArrowRight':
        case 'd':
            moveRight = true;
            break;
        case 'ArrowUp':
        case 'w':
            moveForward = true;
            break;
        case 'ArrowDown':
        case 's':
            moveBackward = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.key) {
        case 'ArrowLeft':
        case 'a':
            moveLeft = false;
            break;
        case 'ArrowRight':
        case 'd':
            moveRight = false;
            break;
        case 'ArrowUp':
        case 'w':
            moveForward = false;
            break;
        case 'ArrowDown':
        case 's':
            moveBackward = false;
            break;
    }
}

function movePlayer() {
    if (moveLeft) camera.position.x -= playerSpeed;
    if (moveRight) camera.position.x += playerSpeed;
    if (moveForward) camera.position.z -= playerSpeed;
    if (moveBackward) camera.position.z += playerSpeed;
}

// Shooting bullets
function shootBullet() {
    if (gameOver) return;

    let bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    let bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    let bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

    bullet.position.set(camera.position.x, camera.position.y, camera.position.z);
    bullets.push(bullet);
    scene.add(bullet);
}

// Moving bullets and checking for collisions
function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.position.z -= bulletSpeed;

        if (bullet.position.z < -50) {
            scene.remove(bullet);
            bullets.splice(index, 1);
        }

        // Collision detection with enemies
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.position.distanceTo(enemy.position) < 1) {
                // Destroy enemy and bullet
                scene.remove(enemy);
                enemies.splice(enemyIndex, 1);

                scene.remove(bullet);
                bullets.splice(index, 1);

                // Update score
                score += 10;
                document.getElementById('score').textContent = `Score: ${score}`;

                // Respawn enemy
                spawnEnemies();
            }
        });
    });
}

// Enemy AI (move toward player)
function moveEnemies() {
    enemies.forEach((enemy) => {
        enemy.position.z += 0.05; // Move towards the player

        // Reduce player health if enemies get too close
        if (enemy.position.distanceTo(camera.position) < 1) {
            health -= 5;
            document.getElementById('health').textContent = `Health: ${health}%`;

            if (health <= 0) {
                gameOver = true;
                document.getElementById('game-over').style.display = 'block';
            }
        }
    });
}

// Animate and render the scene
function animate() {
    if (gameOver) return;

    requestAnimationFrame(animate);
    movePlayer();
    moveBullets();
    moveEnemies();
    renderer.render(scene, camera);
}

init();