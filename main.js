import './style.css';
import * as THREE from 'three';

const hexColords = [0xE6C229, 0xF17105, 0xD11149, 0x6610F2, 0x1A8FE3];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const torusGeometry = new THREE.Mesh(
  new THREE.TorusGeometry(5, 1.5, 10, 50),
  new THREE.MeshStandardMaterial({
    color: hexColords[Math.floor(Math.random() * 5)],
  })
);
torusGeometry.position.set(0, -10, -100);

const boxGeometry = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshStandardMaterial({
    color: hexColords[Math.floor(Math.random() * 5)],
  })
)
boxGeometry.position.set(8, -5, -10);

const octahedronGeometry = new THREE.Mesh(
  new THREE.OctahedronGeometry(5, 0),
  new THREE.MeshStandardMaterial({
    color: hexColords[Math.floor(Math.random() * 5)],
  })
)
octahedronGeometry.position.set(-30, -5, -30);

const sphereGeometry = new THREE.Mesh(
  new THREE.SphereGeometry(5, 24, 24),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./assets/earth.jpeg')
  })
);
sphereGeometry.position.set(7, 5, -30);
sphereGeometry.rotation.x = -0.2
sphereGeometry.rotation.z = 0.7

scene.add(boxGeometry);
scene.add(octahedronGeometry);
scene.add(torusGeometry);
scene.add(sphereGeometry);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(-10, 10, 20);

scene.add(pointLight)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial();
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * 0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * 0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torusGeometry.rotation.x += 0.008;
  torusGeometry.rotation.y += 0.005;

  boxGeometry.rotation.x += 0.002;
  boxGeometry.rotation.y += 0.003;

  octahedronGeometry.rotation.x += 0.005;
  octahedronGeometry.rotation.y += 0.001;

  sphereGeometry.rotation.y += 0.002;

  renderer.render(scene, camera)
}

animate();