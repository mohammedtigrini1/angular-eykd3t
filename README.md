# OBJECTIVE

Make animations while building the software and make those animations retrocompatible.
Work on features as needed.
Goal is to be able to create animations to resume knowledge really fast.

# TODO

- How to override the coordinates of the animation? TRY TO UNDERSTAND WHAT I MEANT WITH THAT
- Migrate from a file based animations to database based animation
- Handle the working and creation of multiple new animations
  - For example, I've finished creating this water molecule shape, I publish it (edit it). And now I
    want to start from scratch.

# BACKLOG

### Shapes

- Draw one with a pen or line tools
  - Implement rotation for these shapes
  - Implement scaling for these shapes

### Features

- Publish shapes inside to a database (IN ORDER TO REUSE THEMP)
  - Capacity to reuse animations
- Invoke shapes with a command and be able to edit them DETAIL THIS
  - Capacity to reuse shapes
- Rotate an object
  - Input manually the center of gravity of the object
- Scale an object

### Voice

- For Voice -> Use a voice over software on the created videos (for now until I get the idea on how to incorporate the voice in a smart way)

# DONE

- Compute the total duration of the animation by reading the json files
- Play an animation by pressing 'p'
- Make the animation into a video by pressing 'v'
- Export logic to load animation faster.

# ANIMATIONS TO DO

- Explanation of how Oauth works
- Explanation of how feature flags work
  - Segmenting features
  - Resume this video : https://www.youtube.com/watch?v=AJa2B-twtG4
- Explanation of how load balancers work as well as different algorithms for load balancing
- Explanation of how data structures work
  - Array, Linked list, stack, queue, binary tree, hash table, matrix, heap, graph

# TECHNICAL INFO

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
ctx.scale(2, -2); // scaling on the x and y axis
ctx.font = '48px serif';
ctx.fillText('Hello world!', 100, -90);
ctx.setTransform(1, 0, 0, 1, 0, 0);

# FUTURE IDEAS

### Tooling

- Little tooling to be able to create shapes not through the interface rather than the json files.

  - [PRE-REQ] Would necessit to be able to persist the shapes first.

### Maybe later

- Make the animations editable by the viewers
- Focus on making byte size learning like tiktok, people's attention span is really small.
  -> Break down complex concepts into byte size concepts that can be reviewable and disposed in a logical
  fashion by folks (like build your own personal course)
