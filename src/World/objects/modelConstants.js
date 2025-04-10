import { Vector3 } from "three";
const models = [
  {
    name: "shauna_Model",
    position: new Vector3(0, 0, 0),
    //urlModel: "././/static/models/me_test.glb",
    urlModel: "././/static/models/testme.glb",
    urlTexture: "././/static/textures/lambert1_Base_color.png",
    scale: 100,
    debug: "true"
  },
  {
    name: "room_Model",
    position: new Vector3(6, 0, 0),
    urlModel: "././/static/models/room1.glb",
    urlTexture: "././/static/textures/room.png",
    scale: 1,
  },
  {
    name: "pottedplant",
    position: new Vector3(-10.25, 0, -3.6),
    urlModel: "././/static/models/pottedplant.fbx",
    urlTexture: "././/static/textures/plant.png",
    scale: 1,
  },
  {
    name: "hall_table",
    position: new Vector3(0, 0, -4.85),
    urlModel: "././/static/models/hall_table.fbx",
    urlTexture: "././/static/textures/halltable.png",
    scale: 1,
  },
  {
    name: "irelandFrame",
    position: new Vector3(-5.26, 13.23, -8),
    urlModel: "././/static/models/irelandframe.fbx",
    urlTexture: "././/static/textures/ireland.png",
    scale: 1,
   
  },
{
  name: "austriaFrame",
  position: new Vector3(5.83, 13.5, -8),
  urlModel: "././/static/models/austriaframe.fbx",
  urlTexture: "././/static/textures/ireland.png",
  scale: 1,
 
},
   {
     name: "gardensprite",
     position: new Vector3(-15.5, 17, 0),
     urlModel: "././/static/models/garden_plane.fbx",
     urlTexture: "././/static/textures/garden.jpg",
     scale: 1.4,
    
   },
  {
    name: "curtain",
    position: new Vector3(5.83, 0, 0),
    urlModel: "././/static/models/curtain.fbx",
    urlTexture: "././/static/textures/curtain.png",
    scale: 1,
  },
  {
    name: "light",
    position: new Vector3(6.4, -6.10, -3.33),
    urlModel: "././/static/models/light.fbx",
    urlTexture: "././/static/textures/light.png",
    scale: 2,
    debug: "true"
  },
];
const sprites = [
  {
    name: "bubble_sprite",
    urlTexture: "././/static/textures/curtain.jpg",
  },
];
export { models, sprites };
