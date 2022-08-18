import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as shapes from '../assets/animations/H2O';

@Injectable()
export class InitService {
  public shapes: any[] = [];

  constructor(private http: HttpClient) {}

  public async getShapeArray(shapes: any[]) {
    await this.constructShapeArray(shapes);
    return this.shapes;
  }

  public async constructShapeArray(
    shapes: any[],
    coordinates?: { x: number; y: number },
    animations?: any[]
  ) {
    for (let shape of shapes) {
      if (shape.info.name == 'composite') {
        let children = await this.getShape(shape.info.file);
        await this.constructShapeArray(
          children,
          shape.info.coordinates,
          shape.animations
        );
      }

      if (coordinates) {
        shape.info.coordinates.x += coordinates.x;
        shape.info.coordinates.y += coordinates.y;
      }

      if (animations) {
        if (!shape.animations) {
          shape.animations = [];
        }
        animations.map((an) => {
          shape.animations.push(an);
        });
      }

      // Only push the animations the shapes that are not composite.
      if (shape.info.name != 'composite') {
        this.shapes.push(shape);
      }
    }
  }

  getShape(fileName): Promise<any[]> {
    // TODO: IMPLEMENT REJECT AND THROW AN ERROR.
    return new Promise((resolve, reject) => {
      this.getDataHttp(`assets/animations/${fileName}`).subscribe(
        (data: any[]) => {
          resolve(data);
        }
      );
    });
  }

  getDataHttp(url: string) {
    return this.http.get(url);
  }
}
