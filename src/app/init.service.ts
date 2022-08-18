import { Injectable } from '@angular/core';

@Injectable()
export class InitService {
  public shapes: any[] = [];
  
  constructor() { }

  public constructShapeArray(shapes) {
    // 1. Add the initial coordinates of the shape to those of the other shapes.

    for(let shape of shapes) {
      if(shape.subshapes) {
        
      }
    }
  }
}