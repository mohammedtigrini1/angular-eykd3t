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
    } else if (shape.name == 'text') {
      this.drawTextInCanvas(shape);
    } else if (shape.name == 'circle') {
      this.drawCircleInCanvas(shape);
    }
  }

  drawRectangleInCanvas(info) {
    if (info.style.name == 'fill') {
      this._context.fillStyle = info.style.color;
      this._context.fillRect(
        info.coordinates.x,
        info.coordinates.y,
        info.height,
        info.width
      );
    } else if (info.style.name == 'stroke') {
      this._context.lineWidth = info.style.lineWidth;
      this._context.strokeRect(
        info.coordinates.x,
        info.coordinates.y,
        info.height,
        info.width
      );
    }
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
    this._context.fillStyle = info.color;
    this._context.font = info.font;
    this._context.fillText(info.text, info.coordinates.x, info.coordinates.y);
  }

  drawCircleInCanvas(info) {
    this._context.beginPath();
    this._context.arc(
      info.coordinates.x,
      info.coordinates.y,
      info.radius,
      0,
      2 * Math.PI
    );

    if (info.style.name == 'fill') {
      this._context.fillStyle = info.style.color;
      this._context.fill();
    } else if (info.style.name == 'stroke') {
      this._context.stroke();
    }
  }
}
