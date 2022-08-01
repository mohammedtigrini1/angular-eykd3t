import { Injectable } from '@angular/core';

@Injectable()
export class ShapesService {
  public shapeList: [] = [];

  constructor() {}

  public addShape(shape, info) {}

  public changeShapePosition(shapeIndex, info) {}

  public deleteShape(shapeIndex) {}
}
