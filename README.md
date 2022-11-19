# OBJECTIVE

Make animations while building the software and make those animations retrocompatible.
Work on features as needed.
Goal is to be able to create animations to resume knowledge really fast.

# BACKLOG

### Shapes

- Draw one with a pen
  - Implement rotation for these shapes
  - Implement scaling for these shapes

### Features

- Publish shapes inside to a database.
  - Capacity to reuse animations
- Invoke shapes with a command an be able to edit them
  - Capacity to reuse shapes

### Voice

- For Voice -> Use a voice over software on the created videos.

### Tooling

- Little tooling to be able to create shapes not through the json file but through
  the software so to speak.
  - Would necessit to be able to persist the shapes first.

# DONE

- Compute the total duration of the animation by reading the json files
- Play an animation by pressing 'p'
- Make the animation into a video by pressing 'v'
- Export logic to load animation faster.

ANIMATIONS TO DO :

- Explanation of how Oauth works
- Explanation of how feature flags work
  - Segmenting features
  - Resume this video : https://www.youtube.com/watch?v=AJa2B-twtG4

TODO:

- Do some refactoring
- Rotate animation
- How to override the coordinates of the animation?
- Export logic for creating video.
- Add rotate to the coordinates.
- Add scaling logic

- ROTATE AN OBJECT :

  - Input manually the center of gravity

- SHAPE
  - draw one (with a pen)

INFO
3 STEPS TO ROTATE AN OBJECT
ctx.translate(centerX, centerY);
ctx.rotate(angle _ Math.PI / 180);
ctx.fillRect(-width/2, -height/2, width, height);
ctx.rotate(-angle _ Math.PI / 180);
ctx.translate(-centerX, -centerY);

// FOR COMPOSITE SHAPES : Most important thing would be that they all rotate
// relative to a single point in space (in order to conserve the disposition of the object.)
// - Single point of failure

3 STEPS TO SCALE AN OBJECT
ctx.scale(2, -2);
ctx.font = '48px serif';
ctx.fillText('Hello world!', 100, -90);
ctx.setTransform(1, 0, 0, 1, 0, 0);
