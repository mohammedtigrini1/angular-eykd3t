import { Injectable } from '@angular/core';

@Injectable()
export class MoveService {
  public originalCoordinates = {};

  constructor() {}

  computeCoordinatesDifferential(animation, currentTime) {
    return {
      xDifferential: Math.floor(
        this.speed(animation.from, animation.to).xVelocity *
          (animation.from.t - currentTime)
      ),
      yDifferential: Math.floor(
        this.speed(animation.from, animation.to).yVelocity *
          (animation.from.t - currentTime)
      ),
    };
  }

  speed(from, to) {
    return {
      xVelocity: (from.x - to.x) / (to.t - from.t),
      yVelocity: (from.y - to.y) / (to.t - from.t),
    };
  }

  moveTriangle(shapeId, animation, currentTime) {
    const dif = this.computeCoordinatesDifferential(animation, currentTime);

    return [
      {
        x: this.originalCoordinates[shapeId][0].x + dif.xDifferential,
        y: this.originalCoordinates[shapeId][0].y + dif.yDifferential,
      },
      {
        x: this.originalCoordinates[shapeId][1].x + dif.xDifferential,
        y: this.originalCoordinates[shapeId][1].y + dif.yDifferential,
      },
      {
        x: this.originalCoordinates[shapeId][2].x + dif.xDifferential,
        y: this.originalCoordinates[shapeId][2].y + dif.yDifferential,
      },
    ];
  }

  // TODO: Finish
  moveRectangle(shape, animation, currentTime) {
    return {
      x:
        shape.x +
        this.computeCoordinatesDifferential(animation, currentTime)
          .xDifferential,
      y:
        shape.y +
        this.computeCoordinatesDifferential(animation, currentTime)
          .yDifferential,
    };
  }
}
