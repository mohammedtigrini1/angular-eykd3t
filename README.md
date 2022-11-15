# angular-eykd3t

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-eykd3t)

FEATURES

- MAKE DIFFERENT LEVEL OF ANIMATIONS. ONES FASTER AND THE OTHERS SLOWER.
  OR MAKE SOMETHING SO THAT IT GOES FASTER.

BACKLOG:

- Publish shapes inside to a database.
- Invoke shapes with a command an be able to edit them

TODO:

- Do some refactoring
- Rotate animation
- How to override the coordinates of the animation?
- Export logic for creating video.
- Add rotate to the coordinates.
- Add scaling logic

  - Add a function to publish to youtube by pressing 'y'

- ROTATE AN OBJECT :
  - Find the center of gravity of a composite object.
    - Maybe first input manually the center of gravity.

DONE

- Compute the total duration of the animation by reading the json files
- Play an animation by pressing 'p'
- Make the animation into a video by pressing 'v'
- Export logic to load animation faster.

INFO
3 STEPS TO ROTATE AN OBJECT
ctx.translate(centerX, centerY);
ctx.rotate(angle _ Math.PI / 180);
ctx.fillRect(-width/2, -height/2, width, height);
ctx.rotate(-angle _ Math.PI / 180);
ctx.translate(-centerX, -centerY);

// FOR COMPOSITE SHAPES : Most important thing would be that they all rotate
// relative to a single point in space (in order to conserve the disposition of the object.)

3 STEPS TO SCALE AN OBJECT
ctx.scale(2, -2);
ctx.font = '48px serif';
ctx.fillText('Hello world!', 100, -90);
ctx.setTransform(1, 0, 0, 1, 0, 0);

BACKLOG
Voice -> Use a voice over software on the created videos.
