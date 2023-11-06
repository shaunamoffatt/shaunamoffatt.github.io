import {
  MeshBasicMaterial,
  PlaneGeometry,
  Mesh,
  DoubleSide,
  Texture,
} from "three";

var text;
var container = document.querySelector(".text");
let speed = 70;
let textLines = [
  "Hi! I'm Shauna." ,
  "I'm a Developer" ,
  "And a coool gal"
];

var characters = [];

function createDialogue() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.fillStyle = "black";
  context.textBaseline = "middle";
  context.font = "20px sans-serif";
  context.fillText(textLines[0], 20, 60);
  // canvas contents are used for a texture
  const texture = new Texture(canvas);
  texture.needsUpdate = true;

  var material = new MeshBasicMaterial({
    map: texture,
    side: DoubleSide,
  });
  material.transparent = true;
  var mesh = new Mesh(new PlaneGeometry(5, 5), material);
  mesh.position.set(1.65, 16.4, 1);

  return mesh;
}

export { createDialogue };
