import { TextureLoader, SpriteMaterial, Sprite, NearestFilter } from "three";

class simpleSprite {
  constructor(name, posx, posy, posz, url, scalex, scaley) {
    this.name = name;
    this.visible = true;
    //Load Texture
    const loader = new TextureLoader();
    var texture = loader.load(url);
    texture.magFilter = NearestFilter;

    //Create Material
    var material = new SpriteMaterial({ map: texture });
    //CreateSprite
    this.sprite = new Sprite(material);
    this.sprite.scale.set(scalex, scaley, 0);
    this.sprite.position.set(posx, posy, posz);
  }

  setPosition(position) {
    this.sprite.position = position;
  }

  setScale(scale) {
    this.sprite.scale = scale;
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
