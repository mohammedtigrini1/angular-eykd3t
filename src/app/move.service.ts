import { Injectable } from '@angular/core';

@Injectable()
export class MoveService {
  public originalCoordinates;

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

  moveTriangle(shape, animation, currentTime) {
    const dif = this.computeCoordinatesDifferential(animation, currentTime);
    // console.log(dif.xDifferential, dif.yDifferential);
    // console.log(this.originalCoordinates);

    return [
      {
        x: this.originalCoordinates[0].x + dif.xDifferential,
        y: this.originalCoordinates[0].y + dif.yDifferential,
      },
      {
        x: this.originalCoordinates[1].x + dif.xDifferential,
        y: this.originalCoordinates[1].y + dif.yDifferential,
      },
      {
        x: this.originalCoordinates[2].x + dif.xDifferential,
        y: this.originalCoordinates[2].y + dif.yDifferential,
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
