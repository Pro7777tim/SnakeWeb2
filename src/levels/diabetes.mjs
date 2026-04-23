import { DefeatWindow, WinWindow } from "../global/API/endLevel.mjs"
import { ClassicControl } from "../global/API/mobileControl.mjs";
export class diabetes extends Phaser.Scene {
  constructor() {
    super({ key: "level" });
  }

  init(data) {
    this.blockSize = 40;
    this.widthInBlocks = Math.floor(this.scale.gameSize.width / this.blockSize);
    this.heightInBlocks = Math.floor(
      this.scale.gameSize.height / this.blockSize,
    );
    this.diabetesLevel = 0;
    data.initLevel(this, {
      shTime: true,
      shScore: true,
      nextY: 35
    });
  }

  preload() {
    this.load.image('candy', 'src/img/levels/candy.png');
  }

  create() {
    this.snake = [
      new Phaser.Geom.Point(7, 5),
      new Phaser.Geom.Point(6, 5),
      new Phaser.Geom.Point(5, 5),
    ];
    this.prevSnake = this.snake.map((p) => new Phaser.Geom.Point(p.x, p.y));
    this.offset = this.blockSize * 0.2;
    this.direction = "right";
    this.nextDirection = "right";
    this.occupied = new Set();

    this.apple = this.getEmptyRandomBlock();
    this.candy = this.getEmptyRandomBlock();

    this.snakeSprites = [];
    this.appleSprite = null;
    this.candySprite = null;

    this.moveEvent = this.time.addEvent({
      delay: 150,
      callback: this.moveSnake,
      callbackScope: this,
      loop: true,
    });

    this.add.text(0, 0, "Diabetes level:", {
      fontFamily: 'Pixelify Sans',
      fontSize: '42px',
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0);
    this.diabetesLevelObj = this.add.text(305, 0, "0%", {
      fontFamily: 'Pixelify Sans',
      fontSize: '42px',
      color: '#b4e051',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0);

    this.input.keyboard.on("keydown", this.handleKey, this);
    this.control = new ClassicControl(this, 1770, 990, {
      up: () => {
        this.handleKey({ code: "ArrowUp" });
      },
      down: () => {
        this.handleKey({ code: "ArrowDown" });
      },
      left: () => {
        this.handleKey({ code: "ArrowLeft" });
      },
      right: () => {
        this.handleKey({ code: "ArrowRight" });
      },
    });

    this.eatSn = this.sound.add("eatSn", {
      volume: 0.3,
    });
    this.collisionSn = this.sound.add("collisionSn", {
      volume: 0.3,
    });
  }

  update() {
    this.redraw();
  }

  handleKey(event) {
    const code = event.code;
    if (
      (code === "ArrowLeft" || code === "KeyA") &&
      this.direction !== "right"
    ) {
      this.nextDirection = "left";
    } else if (
      (code === "ArrowRight" || code === "KeyD") &&
      this.direction !== "left"
    ) {
      this.nextDirection = "right";
    } else if (
      (code === "ArrowUp" || code === "KeyW") &&
      this.direction !== "down"
    ) {
      this.nextDirection = "up";
    } else if (
      (code === "ArrowDown" || code === "KeyS") &&
      this.direction !== "up"
    ) {
      this.nextDirection = "down";
    }
  }

  moveSnake() {
    let key;
    for (let i = 0; i < this.snake.length; i++) {
      key = i === 0 ? "head" : "body";
      if (!this.prevSnake[i]) {
        this.prevSnake[i] = { x: this.snake[i].x, y: this.snake[i].y };
      } else {
        this.prevSnake[i].x = this.snake[i].x;
        this.prevSnake[i].y = this.snake[i].y;
      }
      if (i == 0) {
        if (this.snakeSprites[0].scale !== 2.1) {
          this.snakeSprites[0].setScale(2.1);
        }
      } else {
        if (this.snakeSprites[i].scale !== 1.9) {
          this.snakeSprites[i].setScale(1.9);
        }
      }
      if (this.snakeSprites[i].texture.key !== key) {
        this.snakeSprites[i].setTexture("classic", key);
      }
    }
    this.direction = this.nextDirection;
    const head = this.snake[0];
    let newHead = { x: head.x, y: head.y };

    if (this.direction === "right") newHead.x += 1;
    else if (this.direction === "left") newHead.x -= 1;
    else if (this.direction === "down") newHead.y += 1;
    else if (this.direction === "up") newHead.y -= 1;

    if (this.checkCollision(newHead)) {
      this.gameOver();
      return;
    }

    this.snake.unshift(newHead);

    this.occupied.clear();

    for (let s of this.snake) {
      this.occupied.add(s.x + "," + s.y);
    }

    if (this.apple) {
      this.occupied.add(this.apple.x + "," + this.apple.y);
    }

    if (this.candy) {
      this.occupied.add(this.candy.x + "," + this.candy.y);
    }

    if (Phaser.Geom.Point.Equals(newHead, this.apple)) {
      const score = this.registry.get("score") + 1;
      this.registry.set("score", score);
      if (settings.sound) {
        this.eatSn.play();
      }

      if (score >= 50) {
        this.moveEvent.remove(false);

        new WinWindow(
          this,
          {
            textWin: "You win!",
            subText: "The snake is full",
          },
          {
            shTime: true,
            shScore: true,
          },
        );

        return;
      }

      this.apple = this.getEmptyRandomBlock();
      this.occupied.add(this.apple.x + "," + this.apple.y);
    } else if (Phaser.Geom.Point.Equals(newHead, this.candy)) {
      const score = this.registry.get("score") + 5;
      this.registry.set("score", score);
      this.diabetesLevel = this.diabetesLevel + Math.floor(Math.random() * 25) + 1;
      this.diabetesLevelObj.setText(this.diabetesLevel + "%");
      if (this.diabetesLevel < 30) {
        this.diabetesLevelObj.setColor("#b4e051");
      } else if (this.diabetesLevel < 70) {
        this.diabetesLevelObj.setColor("#ffe561");
      } else if (this.diabetesLevel < 100) {
        this.diabetesLevelObj.setColor("#dd4141");
      } else if (this.diabetesLevel >= 100) {
        this.moveEvent.remove(false);
        new DefeatWindow(
          this,
          {
            textDefeat: "You lost!",
            subText: "The snake died of diabetes",
            width: 950
          },
          {
            shTime: true,
            shScore: true,
          },
        );
      }

      if (settings.sound) {
        this.eatSn.play();
      }

      if (score >= 50 && this.diabetesLevel < 100) {
        this.moveEvent.remove(false);

        new WinWindow(
          this,
          {
            textWin: "You win!",
            subText: "The snake is full",
          },
          {
            shTime: true,
            shScore: true,
          },
        );

        return;
      }

      this.candy = this.getEmptyRandomBlock();
      this.occupied.add(this.candy.x + "," + this.candy.y);
    } else {
      this.snake.pop();
    }

    const appleX = this.apple.x * this.blockSize + this.blockSize / 2;
    const appleY = this.apple.y * this.blockSize + this.blockSize / 2;
    const candyX = this.candy.x * this.blockSize + this.blockSize / 2;
    const candyY = this.candy.y * this.blockSize + this.blockSize / 2;

    if (!this.appleSprite) {
      this.appleSprite = this.add
        .image(appleX, appleY, "classic", "apple")
        .setDisplaySize(this.blockSize, this.blockSize)
        .setOrigin(0.5)
        .setScale(3)
        .setDepth(2);
    } else {
      if (this.appleSprite.x !== appleX || this.appleSprite.y !== appleY) {
        if (!this.tweens.isTweening(this.appleSprite)) {
          this.tweens.add({
            targets: this.appleSprite,
            x: appleX,
            y: appleY,
            duration: this.moveEvent.delay,
            ease: "Linear",
          });
        }
      }
    }

    if (!this.candySprite) {
      this.candySprite = this.add
        .image(candyX, candyY, "candy")
        .setDisplaySize(this.blockSize, this.blockSize)
        .setOrigin(0.5)
        .setScale(3)
        .setDepth(2);
    } else {
      if (this.candySprite.x !== candyX || this.candySprite.y !== candyY) {
        if (!this.tweens.isTweening(this.candySprite)) {
          this.tweens.add({
            targets: this.candySprite,
            x: candyX,
            y: candyY,
            duration: this.moveEvent.delay,
            ease: "Linear",
          });
        }
      }
    }
  }

  checkCollision(point) {
    if (
      point.x < 0 ||
      point.y < 0 ||
      point.x >= this.widthInBlocks ||
      point.y >= this.heightInBlocks
    ) {
      return true;
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
    } while (this.occupied.has(p.x + "," + p.y));

    return p;
  }

  redraw() {
    if (!this.snakeSprites) this.snakeSprites = [];

    const t = Phaser.Math.Clamp(this.moveEvent.getProgress(), 0, 1);
    const half = this.blockSize / 2;

    for (let i = 0; i < this.snake.length; i++) {
      let offsetX = 0;
      let offsetY = 0;

      let sprite = this.snakeSprites[i];

      const key = i === 0 ? "head" : "body";

      if (!sprite) {
        sprite = this.add.image(0, 0, 'classic', key).setOrigin(0.5).setDepth(3);

        this.snakeSprites[i] = sprite;
      } else {
        sprite.setVisible(true);
      }

      if (i === 0) {
        if (this.direction === "right") {
          sprite.setAngle(90);
          offsetX = this.offset;
        } else if (this.direction === "left") {
          sprite.setAngle(270);
          offsetX = -this.offset;
        } else if (this.direction === "up") {
          sprite.setAngle(0);
          offsetY = -this.offset;
        } else if (this.direction === "down") {
          sprite.setAngle(180);
          offsetY = this.offset;
        }
      }

      const prev = this.prevSnake[i] ?? this.snake[i];
      const curr = this.snake[i];

      const prevX = prev.x * this.blockSize + half;
      const prevY = prev.y * this.blockSize + half;

      const currX = curr.x * this.blockSize + half;
      const currY = curr.y * this.blockSize + half;

      sprite.x = Phaser.Math.Linear(prevX, currX, t) + offsetX;
      sprite.y = Phaser.Math.Linear(prevY, currY, t) + offsetY;
    }

    for (let i = this.snake.length; i < this.snakeSprites.length; i++) {
      this.snakeSprites[i]?.setVisible(false);
      this.snakeSprites[i] = null;
    }
    this.snakeSprites.length = this.snake.length;
  }

  gameOver() {
    if (settings.sound) {
      this.collisionSn.play();
    }

    this.moveEvent.remove(false);

    new DefeatWindow(
      this,
      {
        textDefeat: "You lost!",
        subText: "The snake crashed",
      },
      {
        shTime: true,
        shScore: true,
      },
    );

    return;
  }
}