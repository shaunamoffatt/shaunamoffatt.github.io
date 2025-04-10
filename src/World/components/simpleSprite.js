import {
  TextureLoader,
  SpriteMaterial,
  Sprite,
  NearestFilter,
  Vector2,
  RepeatWrapping,
} from "three";
import { CAMERA_POSITIONS } from "../Constants";
import { currentStage } from "../systems/Stages";

class simpleSprite {
  constructor(name, posx, posy, posz, url, scalex, scaley) {
    this.name = name;
    this.visible = true;
    //Load Texture
    const loader = new TextureLoader();
    this.texture = loader.load(url);
    this.texture.magFilter = NearestFilter;
    // set wrapping to support flipping sprite
    this.texture.wrapS = RepeatWrapping;
    // Set texture needs update flag
    this.texture.needsUpdate = true;

    //Create Material
    var material = new SpriteMaterial({ map: this.texture });
    //CreateSprite
    this.sprite = new Sprite(material);
    this.sprite.scale.set(scalex, scaley, 0);
    this.sprite.position.set(posx, posy, posz);
  }

  setPosition(position) {
    this.sprite.position.set(position.x, position.y, position.z);
  }

  setScale(scale) {
    this.sprite.scale.set(scale.x, scale.y, 1);
    //Flip the texture dependin on scale being a plus or minus
    if (scale.x < 0) {
      this.texture.repeat.x = -1;
      this.texture.needsUpdate = true;
    } else {
      this.texture.repeat.x = 1;
      this.texture.needsUpdate = true;
    }

    if (scale.y < 0) {
      this.texture.flipY = false;
      //this.texture.repeat.y = -1;
      this.texture.needsUpdate = true;
    } else {
      this.texture.flipY = true;
      this.texture.needsUpdate = true;
    }
  }

  move(amountx, amounty, amountz, delta, speed) {
    this.sprite.position.x += amountx * delta * speed;
    this.sprite.position.y += amounty * delta * speed;
    this.sprite.position.z += amountz * delta * speed;
    this.sprite.syn;
    console.log("moving sprite");
  }

  update() {}
}

export { simpleSprite };
