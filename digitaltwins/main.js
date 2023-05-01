// problems rn:
// - fix markdown line breaks

import { marked } from 'marked';
import './style.css'

import * as THREE from 'three'

marked.setOptions({
  breaks:true
})

// loading markdown into html
let file = "./markdown/project methodology.md"
fetch(file)
.then(x => x.text())
.then(y => document.getElementById("bodytext").innerHTML = marked.parse(y));


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, screen.width/screen.height, 1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( screen.width, screen.height );
// addEventListener("resize", (event) => {
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix;
//   camera.updateMatrix;
// });



const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshBasicMaterial( {color: 0x00FF00, wireframe: true });
const torus = new THREE.Mesh( geometry, material );

torus.position.setX(15);
torus.position.setY(15);
torus.position.setZ(-50);

// torus.position = '(15,15,-50)'

scene.add(torus);

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  renderer.render( scene, camera);
}

animate()