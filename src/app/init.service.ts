import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InitService {
  public shapes: any[] = [];
  public totalDuration = 0;

  constructor(private http: HttpClient) {}

  public async getShapeArray(shapes: any[]) {
    this.shapes = [];
    await this.constructShapeArray(shapes);
    this.shapes = this.shapes.filter((shape) => shape.info.name != 'composite');
    this.shapes.map((shape, index) => (shape.info.id = index));
    return this.shapes;
  }

  public async constructShapeArray(
    shapes: any[],
    coordinates?: { x: number; y: number },
    animations?: any[]
  ) {
    for (let shape of shapes) {
      if (coordinates) {
        shape.info.coordinates.x += coordinates.x;
        shape.info.coordinates.y += coordinates.y;
      }

      if (animations) {
        if (!shape.animations) {
          shape.animations = [];
        }

        for (let animation of animations) {
          shape.animations.push(animation);
        }
      }

      if (shape.info.name == 'composite') {
        let children = await this.getShape(shape.info.file);
        await this.constructShapeArray(
          children,
          shape.info.coordinates,
          shape.animations
        );
      }

      this.shapes.push(shape);
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

  async getTotalDuration(shapes) {
    this.totalDuration = 0;
    await this.computeTotalDuration(shapes);
    return this.totalDuration;
  }

  async computeTotalDuration(shapes) {
    for (let shape of shapes) {
      if (shape.animations) {
        for (let animation of shape.animations) {
          let t = 0;
          // Modify this every time the animation parameter changes (to find proper t)
          if (animation.t) {
            t = animation.t;
          } else if (animation.to && animation.to.t) {
            t = animation.to.t;
          }
          if (t > this.totalDuration) {
            this.totalDuration = t;
          }
        }
      }

      if (shape.info.name == 'composite') {
        let children = await this.getShape(shape.info.file);
        await this.computeTotalDuration(children);
      }
    }
  }
}
