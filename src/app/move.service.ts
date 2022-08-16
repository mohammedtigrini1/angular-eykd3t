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

  moveShape(shapeId, animation, currentTime) {
    // TODO: Name of the shape to move I guess? Does this really have to know
    // the name of the shape? It just deals with coordinates.

    if (Array.isArray(this.originalCoordinates[shapeId])) {
      return this.moveTriangle(shapeId, animation, currentTime);
    } else {
      return this.moveRectangle(shapeId, animation, currentTime);
    }
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

  // TODO: FINISH
  moveRectangle(shapeId, animation, currentTime) {
    const dif = this.computeCoordinatesDifferential(animation, currentTime);

    return {
      x:
        this.originalCoordinates[shapeId].x +
        this.computeCoordinatesDifferential(animation, currentTime)
          .xDifferential,
      y:
        this.originalCoordinates[shapeId].y +
        this.computeCoordinatesDifferential(animation, currentTime)
          .yDifferential,
    };
  }

  moveCircle(shapeId, animation, currentTime) {
    // TODO
  }

  moveText(shapeId, animation, currentime) {
    // TODO
  }
}
