import { DefeatWindow, WinWindow } from "../global/API/endLevel.mjs"
import { ClassicControl } from "../global/API/mobileControl.mjs";
export class classic_walls extends Phaser.Scene {
    constructor() {
      super({ key: 'level' });
    }

    init(data) {
      this.blockSize = 40;
      this.widthInBlocks = Math.floor(this.scale.gameSize.width / this.blockSize);
      this.heightInBlocks = Math.floor(this.scale.gameSize.height / this.blockSize);
      data.initLevel(this, {
        shTime: true,
        shScore: true
      });
    }

    create() {
      this.snake = [
        new Phaser.Geom.Point(7, 5),
        new Phaser.Geom.Point(6, 5),
        new Phaser.Geom.Point(5, 5)
      ];
      this.direction = 'right';
      this.nextDirection = 'right';

      this.stones = [];

      this.apple = this.getEmptyRandomBlock();

      this.stones = [
        this.getEmptyRandomBlock(),
        this.getEmptyRandomBlock(),
        this.getEmptyRandomBlock()
      ];

      this.snakeSprites = [];
      this.stoneSprites = [];
      this.appleSprite = null;

      this.moveEvent = this.time.addEvent({
        delay: 150,
        callback: this.moveSnake,
        callbackScope: this,
        loop: true
      });

      this.input.keyboard.on('keydown', this.handleKey, this);
      this.control = new ClassicControl(this, 1770, 990, {
        up: () => {this.handleKey({code: "ArrowUp"})},
        down: () => {this.handleKey({code: "ArrowDown"})},
        left: () => {this.handleKey({code: "ArrowLeft"})},
        right: () => {this.handleKey({code: "ArrowRight"})}
      });

      this.eatSn = this.sound.add("eatSn", {
        volume: 0.3
      });
      this.collisionSn = this.sound.add("collisionSn", {
        volume: 0.3
      });
    }

    handleKey(event) {
      const code = event.code;
      if ((code === "ArrowLeft" || code === "KeyA") && this.direction !== "right") {
          this.nextDirection = "left";
      }
      else if ((code === "ArrowRight" || code === "KeyD") && this.direction !== "left") {
          this.nextDirection = "right";
      }
      else if ((code === "ArrowUp" || code === "KeyW") && this.direction !== "down") {
          this.nextDirection = "up";
      }
      else if ((code === "ArrowDown" || code === "KeyS") && this.direction !== "up") {
          this.nextDirection = "down";
      }
  }

    moveSnake() {
      this.direction = this.nextDirection;
      const head = this.snake[0];
      let newHead = new Phaser.Geom.Point(head.x, head.y);

      if (this.direction === 'right') newHead.x += 1;
      else if (this.direction === 'left') newHead.x -= 1;
      else if (this.direction === 'down') newHead.y += 1;
      else if (this.direction === 'up') newHead.y -= 1;

      if (this.checkCollision(newHead)) {
        this.gameOver();
        return;
      }

      this.snake.unshift(newHead);

      if (Phaser.Geom.Point.Equals(newHead, this.apple)) {
        const score = this.registry.get('score') + 1;
        this.registry.set('score', score);
        if (settings.sound) { 
          this.eatSn.play();
        }

        if (score >= 20) {
          this.moveEvent.remove(false);

          new WinWindow(this, {
            textWin: "You win!",
            subText: "The snake is full"
          }, {
            shTime: true,
            shScore: true
          });

          return;
        }

        this.apple = this.getEmptyRandomBlock();
        this.stones = this.stones.map(() => this.getEmptyRandomBlock());
      } else {
        this.snake.pop();
      }

      this.redraw();
    }

    checkCollision(point) {
      if (point.x < 0 || point.y < 0 ||
          point.x >= this.widthInBlocks ||
          point.y >= this.heightInBlocks) {
        return true;
      }

      for (let stone of this.stones) {
        if (Phaser.Geom.Point.Equals(point, stone)) {
          return true;
        }
      }

      for (let i = 0; i < this.snake.length; i++) {
        if (Phaser.Geom.Point.Equals(point, this.snake[i])) {
          return true;
        }
      }

      return false;
    }

    getRandomBlock() {
      const col = Phaser.Math.Between(0, this.widthInBlocks - 1);
      const row = Phaser.Math.Between(0, this.heightInBlocks - 1);
      return new Phaser.Geom.Point(col, row);
    }

    getEmptyRandomBlock() {
      let p;
      do {
        p = this.getRandomBlock();
      } while (
        this.snake.some(s => Phaser.Geom.Point.Equals(s, p)) ||
        this.stones.some(s => Phaser.Geom.Point.Equals(s, p)) ||
        (this.apple && Phaser.Geom.Point.Equals(this.apple, p))
      );
      return p;
    }

    redraw() {
      if (!this.snakeSprites) this.snakeSprites = [];
      if (!this.stoneSprites) this.stoneSprites = [];

      for (let i = 0; i < this.snake.length; i++) {
        const b = this.snake[i];

        const x = b.x * this.blockSize + this.blockSize / 2;
        const y = b.y * this.blockSize + this.blockSize / 2;
        const offset = this.blockSize * 0.2;
        let offsetX = 0;
        let offsetY = 0;

        const key = (i === 0) ? 'head' : 'body';

        let sprite = this.snakeSprites[i];

        if (!sprite || !sprite.scene) {
          sprite = this.add.image(x, y, key)
            .setOrigin(0.5)
            .setDepth(3);

          this.snakeSprites[i] = sprite;
        } else {
          if (sprite.texture.key !== key) {
            sprite.setTexture(key);
          }
        }

        if (i === 0) {
          if (this.direction === 'right') {sprite.setAngle(90); offsetX = offset;}
          else if (this.direction === 'left') {sprite.setAngle(270); offsetX = -offset;}
          else if (this.direction === 'up') {sprite.setAngle(0); offsetY = -offset;}
          else if (this.direction === 'down') {sprite.setAngle(180); offsetY = offset;}
          if (sprite.scale !== 2.1) {
            sprite.setScale(2.1);
          }
        } else {
          if (sprite.scale !== 1.9) {
            sprite.setScale(1.9);
          }
        }

        this.tweens.add({
          targets: sprite,
          x: x + offsetX,
          y: y + offsetY,
          duration: this.moveEvent.delay,
          ease: 'Linear'
        });
      }

      for (let i = this.snake.length; i < this.snakeSprites.length; i++) {
        this.snakeSprites[i]?.destroy();
        this.snakeSprites[i] = null;
      }
      this.snakeSprites.length = this.snake.length;

      const appleX = this.apple.x * this.blockSize + this.blockSize / 2;
      const appleY = this.apple.y * this.blockSize + this.blockSize / 2;

      if (!this.appleSprite) {
        this.appleSprite = this.add.image(
          appleX,
          appleY,
          'apple'
        )
        .setDisplaySize(this.blockSize, this.blockSize)
        .setOrigin(0.5)
        .setScale(3)
        .setDepth(2);
      } else {
        if (this.appleSprite.x !== appleX || this.appleSprite.y !== appleY) {
          this.tweens.killTweensOf(this.appleSprite);

          this.tweens.add({
            targets: this.appleSprite,
            x: appleX,
            y: appleY,
            duration: this.moveEvent.delay,
            ease: 'Linear'
          });
        }
      }

      for (let i = 0; i < this.stones.length; i++) {
        const stone = this.stones[i];

        const x = stone.x * this.blockSize;
        const y = stone.y * this.blockSize;

        let s = this.stoneSprites[i];

        if (!s) {
          s = this.add.image(
            x,
            y,
            'rock'
          )
          .setDisplaySize(this.blockSize, this.blockSize)
          .setOrigin(0.15, 0.15)
          .setScale(3)
          .setDepth(2);

          this.stoneSprites[i] = s;
        } else {
          if (s.x !== x || s.y !== y) {
            this.tweens.killTweensOf(s);

            this.tweens.add({
              targets: s,
              x: x,
              y: y,
              duration: this.moveEvent.delay,
              ease: 'Linear'
            });
          }
        }
      }
    }

    gameOver() {
      if (settings.sound) { 
          this.collisionSn.play();
      }

      this.moveEvent.remove(false);

      new DefeatWindow(this, {
        textDefeat: "You lost!",
        subText: "The snake crashed"
      }, {
        shTime: true,
        shScore: true
      });

      return;
    }
}