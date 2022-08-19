import { IMove } from "./shared/moveFunction.interface";
import { IPaginaHTML } from "./shared/pagina.interface";

class Index implements IPaginaHTML {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private x: number;
  private y: number;
  private lengthX: number;
  private lengthY: number;
  private keyPressed: string;
  private velocity: number;
  private obstacleX: number;
  private obstacleY: number;

  constructor() {
    this.configurarElementos();

    this.x = 0;
    this.y = 0;
    this.lengthX = 50;
    this.lengthY = 50;
    this.velocity = 10;
    this.updatePositionObstacle();

    this.updateCtx();
  }

  private updatePositionObstacle() {
    while(this.obstacleX % this.lengthX !== 0){
      this.obstacleX = this.randomObstaclePosition(
        this.canvas.width - this.lengthX
      );
    }
    while(this.obstacleY %this.lengthY !== 0) {
      this.obstacleY = this.randomObstaclePosition(
        this.canvas.height - this.lengthY
      );
    }
  }

  detectCollision() {
    if (this.x + this.lengthX === this.obstacleX) {
      this.updatePositionObstacle();
    }
    
  }

  randomObstaclePosition(limit: number) {
    let number = Math.round(Math.random() * limit);
    return number;
  }

  configurarElementos(): void {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.canvas.style.border = "2px solid red";
    this.ctx = this.canvas.getContext("2d");
    this.canvas.focus();
    document.addEventListener("keydown", (event) => {
      this.keyPressed = event.key;
      this.movePlayer();
    });
  }
  movePlayer() {
    switch (this.keyPressed) {
      case "ArrowUp":
        this.ArrowUp();
        break;
      case "ArrowDown":
        this.ArrowDown();
        break;
      case "ArrowLeft":
        this.ArrowLeft();
        break;
      case "ArrowRight":
        this.ArrowRight();
        break;
    }
    console.log("x: " + this.x);
    console.log("y: " + this.y);
    console.log("obstacle x: " + this.obstacleX);
    console.log("obstacle y: " + this.obstacleY);
    // const acceptedMoves: any = {
    //   ArrowUp() {
    //     console.log("pra cima");
    //   },
    //   ArrowDown() {
    //     console.log("pra baixo");
    //   },
    //   ArrowLeft() {
    //     console.log("pra esquerda");
    //   },
    //   ArrowRight() {
    //     console.log("pra direita");
    //   },
    // };
    // const movement = acceptedMoves[this.keyPressed];
    // if (movement) {
    //   this.moveFunction(movement);
    //   console.log(this.x);
    //   console.log(this.y);
    //   this.updateCtx();
    // }
    this.detectCollision();
    this.updateCtx();
  }

  moveFunction(direction: any) {
    let method: IMove;
    method = direction;
    method(direction);
  }

  ArrowUp() {
    if (this.y > 0) {
      this.y -= this.velocity;
    }
  }

  ArrowDown() {
    if (this.y + this.lengthY < this.canvas.height) {
      this.y += this.velocity;
    }
  }
  ArrowLeft() {
    if (this.x > 0) {
      this.x -= this.velocity;
    }
  }
  ArrowRight() {
    if (this.x + this.lengthX < this.canvas.width - 1) {
      this.x += this.velocity;
    }
  }

  drawBackgroundCanvas() {
    if (this.ctx) {
      this.ctx.fillStyle = "#7159c1";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  drawPlayer() {
    if (this.ctx) {
      this.ctx.fillStyle = "#7ccccc";
      this.ctx.fillRect(this.x, this.y, this.lengthX, this.lengthY);
      // let radius = 20;
      // this.ctx.arc(this.x, this.y, radius, this.x+radius, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  drawObstacle() {
    if (this.ctx) {
      this.ctx.fillStyle = "#7597cc";
      this.ctx.fillRect(
        this.obstacleX,
        this.obstacleY,
        this.lengthX,
        this.lengthY
      );
      // let radius = 20;
      // this.ctx.arc(this.x, this.y, radius, this.x+radius, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  updateCtx() {
    if (this.ctx) {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackgroundCanvas();
      this.drawPlayer();
      this.drawObstacle();
    }
  }
}

new Index();
