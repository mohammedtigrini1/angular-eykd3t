import { Component, HostListener } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { DrawService } from './draw.service';
import { MoveService } from './move.service';
import * as shapes from '../assets/animations/water';
import { ShapesService } from './shapes.service';
import { InitService } from './init.service';
// import * as animations from './test.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // its important myCanvas matches the variable name in the template
  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;

  public totalTime = 6000;
  public step = 10;
  public shapes;

  constructor(
    public drawService: DrawService,
    public shapeService: ShapesService,
    public moveService: MoveService,
    public initService: InitService
  ) {}

  async ngAfterViewInit() {
    this.drawService.canvas = this.myCanvas;
    this.shapes = shapes.default;
    // Giving an id to the shapes.
    // this.shapes = await this.initService.getShapeArray(this.shapes);
    // this.shapes.map((shape, index) => (shape.info.id = index));
    // var chunks = [];
    // var canvas_stream = this.myCanvas.nativeElement.captureStream(30); // fps
    // // Create media recorder from canvas stream
    // const media_recorder = new MediaRecorder(canvas_stream, {
    //   videoBitsPerSecond: 2500000,
    //   mimeType: 'video/webm',
    // });
    // // // Record data in chunks array when data is available
    // media_recorder.ondataavailable = (evt) => {
    //   chunks.push(evt.data);
    // };
    // // Provide recorded data when recording stops
    // media_recorder.onstop = () => {
    //   this.on_media_recorder_stop(chunks);
    // };
    // // // Start recording using a 1s timeslice [ie data is made available every 1s)
    // media_recorder.start(0);
    // console.log('FINISHED');
    // setTimeout(() => {
    //   media_recorder.stop();
    // }, 8000);
  }

  async animationLoop() {
    this.shapes = await this.initService.getShapeArray(shapes.default);
    this.shapes.map((shape, index) => (shape.info.id = index));
    this.shapeService.shapes = [];

    let currentTime = 0;
    const interval = setInterval(() => {
      if (currentTime > this.totalTime) {
        this.shapeService.shapes = [];
        console.log('end');
        clearInterval(interval);
      }

      try {
        for (let shape of this.shapes) {
          this.executeAnimation(shape, currentTime);
        }

        this.drawService.drawShapes();
      } catch (err) {
        console.error(err);
      }

      currentTime += this.step;
    }, this.step);
  }

  executeAnimation(shape, currentTime) {
    for (let animation of shape.animations) {
      if (animation.name == 'appear') {
        if (animation.t == currentTime) {
          this.shapeService.addShape(shape.info);
        }
      } else if (animation.name == 'disappear') {
        if (animation.t == currentTime) {
          this.shapeService.deleteShape(shape.info.id);
        }
      } else if (animation.name == 'move') {
        if (currentTime >= animation.from.t && currentTime <= animation.to.t) {
          if (currentTime == animation.from.t) {
            this.moveService.originalCoordinates[shape.info.id] =
              shape.info.coordinates;
          }

          shape.info.coordinates = this.moveService.moveShape(
            shape.info.id,
            animation,
            currentTime
          );

          this.shapeService.changeShape(shape.info);

          if (currentTime == animation.to.t) {
            delete this.moveService.originalCoordinates[shape.info.id];
          }
        }
      } else if (animation.name == 'rotate') {
        // TODO
      } else if (animation.name == 'resize') {
        // TODO
      } else if (animation.name == 'changeColor') {
        // TODO
      }
    }
  }

  findShapesRecursively(shapes) {
    for (let shape of shapes) {
      if (shape.isRecursive) {
        this.findShapesRecursively(shape.shapes);
      }

      return shape;
    }
  }

  // TODO: PLAY ANIMATION ON A LOOP.
  private isLooping = false;
  // if person taps on space bar, stop loop.
  @HostListener('window:keydown', ['$event'])
  async keyEvent(event: any) {
    console.log(event.code);
    if (event.code == 'KeyP') {
      await this.animationLoop();
      // TODO: Logic to play the animation.
    } else if (event.code == 'KeyV') {
      // TODO: Logic to create the video.
    } else if (event.code == 'Space') {
      this.isLooping = !this.isLooping;
    }
  }

  on_media_recorder_stop(chunks) {
    console.log('here', chunks);
    // this.media_recorder = null;

    // Gather chunks of video data into a blob and create an object URL
    var blob = new Blob(chunks, { type: 'video/webm' });
    const recording_url = URL.createObjectURL(blob);

    // Attach the object URL to an <a> element, setting the download file name
    let a = document.createElement('a');
    // a.style = "display: none;";
    a.href = recording_url;
    a.download = 'video.webm';
    document.body.appendChild(a);

    // Trigger the file download
    a.click();

    setTimeout(() => {
      // Clean up - see https://stackoverflow.com/a/48968694 for why it is in a timeout
      URL.revokeObjectURL(recording_url);
      document.body.removeChild(a);
    }, 0);
  }
}
