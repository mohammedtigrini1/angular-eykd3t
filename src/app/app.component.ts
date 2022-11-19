import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { DrawService } from './draw.service';
import { MoveService } from './move.service';
import SHAPES from '../assets/animations/pythagorian_theorem';
import { ShapesService } from './shapes.service';
import { InitService } from './init.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  // its important myCanvas matches the variable name in the template
  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;

  public totalTime = 6000;
  public step = 10;
  public shapes;
  public totalDuration;
  public isAnimationPlaying = false;

  constructor(
    public drawService: DrawService,
    public shapeService: ShapesService,
    public moveService: MoveService,
    public initService: InitService
  ) {}

  async ngAfterViewInit() {
    this.drawService.canvas = this.myCanvas;
    this.shapes = await this.initService.getShapeArray(
      JSON.parse(JSON.stringify(SHAPES))
    );
    this.totalDuration = await this.initService.getTotalDuration(
      JSON.parse(JSON.stringify(SHAPES))
    );
  }

  async playAnimation() {
    await new Promise(async (resolve, reject) => {
      this.isAnimationPlaying = true;

      this.shapeService.shapes = [];
      this.initService.shapes = [];
      let shapesCopy = JSON.parse(JSON.stringify(this.shapes));

      let currentTime = 0;
      const interval = setInterval(() => {
        if (currentTime > this.totalDuration + 1000) {
          this.shapeService.shapes = [];
          this.initService.shapes = [];
          this.isAnimationPlaying = false;
          console.log('end');
          resolve(null);
          clearInterval(interval);
        }

        try {
          for (let shape of shapesCopy) {
            this.executeAnimation(shape, currentTime);
          }

          this.drawService.drawShapes();
        } catch (err) {
          console.error(err);
        }

        currentTime += this.step;
      }, this.step);
    });
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
        // Add the center of gravity of the thing in the coordinates in the loading script.
      } else if (animation.name == 'resize') {
        // TODO
      } else if (animation.name == 'changeColor') {
        // TODO
      }
    }
  }
  // if person taps on space bar, stop loop.
  @HostListener('window:keydown', ['$event'])
  async keyEvent(event: any) {
    if (event.code == 'KeyP') {
      // TODO: Logic to play the animation.
      if (!this.isAnimationPlaying) {
        await this.playAnimation();
      } else {
        console.log('Animation already playing.');
      }
    } else if (event.code == 'KeyV') {
      // TODO: Logic to create the video.
      if (!this.isAnimationPlaying) {
        var chunks = [];
        var canvas_stream = this.myCanvas.nativeElement.captureStream(30); // fps
        // Create media recorder from canvas stream
        const media_recorder = new MediaRecorder(canvas_stream, {
          videoBitsPerSecond: 2500000,
          mimeType: 'video/webm',
        });
        // // Record data in chunks array when data is available
        media_recorder.ondataavailable = (evt) => {
          chunks.push(evt.data);
        };
        // Provide recorded data when recording stopsv
        media_recorder.onstop = () => {
          this.on_media_recorder_stop(chunks);
        };
        // // Start recording using a 1s timeslice [ie data is made available every 1s)
        media_recorder.start(0);
        await this.playAnimation();
        media_recorder.stop();
      } else {
        console.log('Animation already playing.');
      }
    }
  }

  on_media_recorder_stop(chunks) {
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
