import { ElementRef, Injectable, ViewChild } from '@angular/core';

// Everything related to drawing on the board.
@Injectable()
export class DrawService {
  private _canvas: ElementRef<HTMLCanvasElement>;
  private _context: CanvasRenderingContext2D;

  constructor() {}

  set canvas(canvas) {
    this._canvas = canvas;
    this._context = this._canvas.nativeElement.getContext('2d');
  }

  eraseCanvas() {
    this._context.fillStyle = '#FFFFFF';
    this._context.fillRect(
      0,
      0,
      this._canvas.nativeElement.width,
      this._canvas.nativeElement.height
    );
  }

  // TODO: Finish and make work.
  drawShapeInCanvas(shape, info) {
    if (shape == 'rectangle') {
      this.drawRectangleInCanvas(info);
    } else if (shape == 'rectangle') {
      this.drawTriangleInCanvas(info);
    }
  }

  drawRectangleInCanvas(info) {
    this._context.fillStyle = '#FF0000';
    this._context.fillRect(info.x, info.y, info.height, info.width);
  }

  drawTriangleInCanvas(info) {
    this._context.beginPath();
    this._context.moveTo(info[0].x, info[0].y);
    this._context.lineTo(info[1].x, info[1].y);
    this._context.lineTo(info[2].x, info[2].y);
    this._context.fill();
  }
}
