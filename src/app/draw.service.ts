import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { ShapesService } from './shapes.service';

// Everything related to drawing on the board.
@Injectable()
export class DrawService {
  private _canvas: ElementRef<HTMLCanvasElement>;
  private _context: CanvasRenderingContext2D;

  constructor(public shapeService: ShapesService) {}

  set canvas(canvas) {
    this._canvas = canvas;
    this._context = this._canvas.nativeElement.getContext('2d');
  }

  drawShapes() {
    this.eraseCanvas();
    for (let shape of this.shapeService.shapes) {
      this.drawShapeInCanvas(shape);
    }
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

  drawShapeInCanvas(shape) {
    if (shape.name == 'rectangle') {
      this.drawRectangleInCanvas(shape);
    } else if (shape.name == 'triangle') {
      this.drawTriangleInCanvas(shape);
    } else if (shape.name == 'test') {
      this.drawTextInCanvas(shape);
    }
    // this.drawTextInCanvas(null);
  }

  drawRectangleInCanvas(info) {
    this._context.fillStyle = '#FF0000';
    this._context.fillRect(info.x, info.y, info.height, info.width);
  }

  drawTriangleInCanvas(info) {
    this._context.fillStyle = '#000000';
    this._context.beginPath();
    this._context.moveTo(info.coordinates[0].x, info.coordinates[0].y);
    this._context.lineTo(info.coordinates[1].x, info.coordinates[1].y);
    this._context.lineTo(info.coordinates[2].x, info.coordinates[2].y);
    this._context.fill();
  }

  drawTextInCanvas(info) {
    this._context.fillStyle = '#000000';
    this._context.font = info.font;
    this._context.fillText(info.text, 100, 50);
  }
}
