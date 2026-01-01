import { DefeatWindow, WinWindow } from "../../global/API/endLevel.mjs"
export class classic extends Phaser.Scene {
    constructor() {
      super({ key: 'level' });
    }

    init(data) {
      this.blockSize = 20;
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

      this.apple = this.getRandomBlock();

      this.stones = [
        this.getRandomBlock(),
        this.getRandomBlock(),
        this.getRandomBlock()
      ];

      this.moveEvent = this.time.addEvent({
        delay: 125,
        callback: this.moveSnake,
        callbackScope: this,
        loop: true
      });

      this.input.keyboard.on('keydown', this.handleKey, this);
    }

    update() {}

    handleKey(event) {
      const key = event.key;
      if (key === "ArrowLeft" && this.direction !== "right") this.nextDirection = "left";
      else if (key === "ArrowRight" && this.direction !== "left") this.nextDirection = "right";
      else if (key === "ArrowUp" && this.direction !== "down") this.nextDirection = "up";
      else if (key === "ArrowDown" && this.direction !== "up") this.nextDirection = "down";
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

        if (score >= 1) {
          this.moveEvent.remove(false);

          const winWindow = new WinWindow(this, {
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
      if (point.x < 1 || point.y < 1 ||
          point.x >= this.widthInBlocks - 1 ||
          point.y >= this.heightInBlocks - 1) {
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
      const col = Phaser.Math.Between(1, this.widthInBlocks - 2);
      const row = Phaser.Math.Between(1, this.heightInBlocks - 2);
      return new Phaser.Geom.Point(col, row);
    }

    getEmptyRandomBlock() {
      let p;
      do {
        p = this.getRandomBlock();
      } while (
        this.snake.some(s => Phaser.Geom.Point.Equals(s, p)) ||
        this.stones.some(s => Phaser.Geom.Point.Equals(s, p))
      );
      return p;
    }

    redraw() {
      this.clearGraphics?.destroy();
      this.clearGraphics = this.add.graphics();
      for (let i = 0; i < this.snake.length; i++) {
        const b = this.snake[i];
        const x = b.x * this.blockSize;
        const y = b.y * this.blockSize;
        if (i === 0) {
          this.clearGraphics.fillStyle(0x00ff00);
        } else if (i % 2 === 0) {
          this.clearGraphics.fillStyle(0xFFD700);
        } else {
          this.clearGraphics.fillStyle(0x0000FF);
        }
        this.clearGraphics.fillRect(x, y, this.blockSize, this.blockSize);
      }

      this.clearGraphics.fillStyle(0x32CD32);
      this.clearGraphics.fillCircle(
        this.apple.x * this.blockSize + this.blockSize / 2,
        this.apple.y * this.blockSize + this.blockSize / 2,
        this.blockSize / 2
      );

      this.clearGraphics.fillStyle(0x2F4F4F);
      for (let stone of this.stones) {
        this.clearGraphics.fillRect(
          stone.x * this.blockSize,
          stone.y * this.blockSize,
          this.blockSize, this.blockSize
        );
      }
    }

    gameOver() {
      this.moveEvent.remove(false);

      const defeatWindow = new DefeatWindow(this, {
        textDefeat: "You lost!",
        subText: "The snake crashed"
      }, {
        shTime: true,
        shScore: true
      });

      return;
    }
}