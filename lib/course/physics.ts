import type { Module } from "../types";

export const physics: Module = {
  slug: "physics",
  number: "05",
  part: "two",
  title: "Collision and the game clock",
  summary:
    "How games check whether two shapes touch, why the game's clock must not depend on the monitor, where a level's solid surfaces come from, and what a checkpoint should restore.",
  minutes: 15,
  quizVersion: 2,
  termIds: ["aabb", "variable-timestep", "fixed-timestep", "delta-time", "tilemap", "procedural-geometry", "extracted-geometry", "checkpoint", "save-state"],
  objectives: [
    "Explain what an axis-aligned bounding box is and why games use it.",
    "Describe the difference between a variable timestep and a fixed timestep.",
    "Explain delta time and why game engines use separate loops for drawing and physics.",
    "Explain why a fixed timestep keeps game feel consistent across different monitors.",
    "Compare three ways of building a level's collision: tilemaps, procedural geometry, and extracted geometry.",
    "Tell the difference between a checkpoint and a save state.",
  ],
  blocks: [
    {
      type: "p",
      text: "The previous chapters described timing in frames and hits in terms of overlapping shapes. Both of those ideas depend on two things working correctly underneath: the shapes the game uses to check for collisions, and the clock that decides how long a frame lasts. If either one is unreliable, every number you carefully tuned in the earlier chapters can change without warning. This chapter covers those foundations.",
    },
    { type: "h", text: "Collision shapes: the axis-aligned bounding box" },
    {
      type: "p",
      text: "The simplest and most common collision shape is the **axis-aligned bounding box**, usually shortened to **AABB**. It is a rectangle whose sides always stay perfectly horizontal and vertical. It never rotates.",
    },
    {
      type: "term",
      term: "AABB (axis-aligned bounding box)",
      text: "A rectangle whose edges always line up with the horizontal and vertical axes. Because it never rotates, checking whether two AABBs overlap is very fast.",
    },
    {
      type: "p",
      text: "Checking whether two AABBs overlap is simple. If the two rectangles overlap horizontally and also overlap vertically, they are touching. This takes only a few comparisons and no complicated math, so a game can check thousands of them every frame.",
    },
    {
      type: "p",
      text: "The cost of this simplicity is that an AABB cannot rotate. For a diagonal sword swing, a game might use a rotated rectangle, a capsule shape, or several small AABBs placed along the blade. These are more expensive to check. For shapes that really are upright rectangles, such as a standing character, a doorway, or a brick block, an AABB is the right choice.",
    },
    {
      type: "example",
      title: "Example: Super Mario Bros.",
      text: "In classic 2D platformers like Super Mario Bros., Mario, Goombas, and brick blocks are all represented under the hood by simple axis-aligned bounding boxes (AABBs). Because Mario and the bricks stay upright and never rotate, checking whether Mario bumped his head on a block or stomped a Goomba is just a few quick coordinate comparisons.",
    },
    { type: "h", text: "The game's clock: variable and fixed timesteps" },
    {
      type: "p",
      text: "Every frame, the game moves its simulation forward by some amount of time. This amount is called the **timestep**. There are two main approaches.",
    },
    {
      type: "term",
      term: "Variable timestep",
      text: "Each update moves the game forward by however long the previous frame took to draw. The simulation speed depends on the computer and the monitor.",
    },
    {
      type: "term",
      term: "Fixed timestep",
      text: "Each update moves the game forward by the same small amount of time, often 1/60 of a second, no matter how fast the screen is refreshing.",
    },
    {
      type: "p",
      text: "A variable timestep seems reasonable, but it ties the game's rules to the player's hardware, and this causes several problems:",
    },
    {
      type: "ul",
      items: [
        "**Inconsistent physics.** If a jump adds a bit of upward speed every frame, a player on a 144 Hz monitor gets more frames per second than a player on a 60 Hz monitor, and therefore jumps higher.",
        "**Tunneling.** If one frame takes a long time, objects move a large distance in a single step. A fast-moving object can pass completely through a thin wall or hurtbox without the game ever detecting that they overlapped.",
        "**Unstable timing.** The coyote time, buffers, and attack timings from earlier chapters all become slightly different every time the frame rate changes.",
      ],
    },
    {
      type: "p",
      text: "A fixed timestep solves these problems. The game keeps track of how much real time has passed and runs the simulation in equal-sized steps to catch up. A 144 Hz monitor can still look smooth, because the drawing code can blend between the two most recent simulation steps. This blending is called **interpolation**. The rules of the game, however, always advance in the same steps. Glenn Fiedler's article “Fix Your Timestep” is the standard reference on this technique.",
    },
    {
      type: "term",
      term: "Delta time (dt)",
      text: "The amount of real time that passed since the last frame. Multiplying speeds by delta time keeps movement steady, but physics rules still need a fixed timestep.",
    },
    {
      type: "p",
      text: "In game engines such as Unity, Godot, or Unreal, you often see delta time written as deltaTime or dt. Multiplying movement by delta time (such as position += speed * dt) keeps a character moving at the same real-world speed on both fast and slow screens. However, collision checks and physics formulas still require a fixed timestep to prevent tunneling and glitches. Most engines solve this by offering two update loops: a regular update (such as Update in Unity or _process in Godot) that runs once per displayed frame for input and camera motion, and a fixed update (such as FixedUpdate in Unity or _physics_process in Godot) that runs on a strict clock for physics and collision.",
    },
    {
      type: "callout",
      tone: "rule",
      title: "Key rule",
      text: "The game's rules should advance in fixed steps. The picture on screen may blend between steps to look smooth. Choose your simulation rate early, because every timing value you tune depends on it.",
    },
    { type: "h", text: "Keeping a fixed timestep healthy" },
    {
      type: "p",
      text: "A fixed timestep needs two safeguards.",
    },
    {
      type: "p",
      text: "First, limit how many catch-up steps can run at once. If the computer falls behind and the game tries to run every missed step in a single frame, that frame takes even longer, so the game falls further behind. This runaway problem is called the **spiral of death**. The usual fix is to cap the number of catch-up steps per frame and simply drop the extra time.",
    },
    {
      type: "p",
      text: "Second, implement hit-stop (see [Chapter 2](/learn/frames/)) by pausing the simulation for the characters involved, not by slowing down the display. Keep counting the pause in real time so that it always ends when it should.",
    },
    { type: "h", text: "Where level collision comes from" },
    {
      type: "p",
      text: "A level needs solid surfaces for characters to stand on and bump into. There are three common ways to create them, and each one affects how the game can be designed.",
    },
    {
      type: "table",
      caption: "Three ways to build a level's collision.",
      headers: ["Method", "How it works", "Strengths and weaknesses"],
      rows: [
        ["Tilemap", "The level is built from a grid of hand-made squares (tiles).", "Ledges and jumps are easy to control and predict. It becomes awkward when the level is not naturally grid-shaped."],
        ["Procedural geometry", "A program generates the level's shapes from a set of rules.", "Every level can be different. The designer must make sure the generator never creates impossible jumps or unfair situations."],
        ["Extracted geometry", "The collision shapes are taken from content that already exists for another purpose.", "The level always matches the content. Because nobody hand-placed each ledge, forgiveness features become especially important."],
      ],
    },
    {
      type: "term",
      term: "Tilemap",
      text: "A level constructed from a grid of hand-drawn squares (tiles). Jumps and ledges are clean, predictable, and easy to design.",
    },
    {
      type: "term",
      term: "Procedural geometry",
      text: "Level surfaces created automatically by code following mathematical rules. Provides endless variety, but requires testing to ensure every generated room is fair.",
    },
    {
      type: "term",
      term: "Extracted geometry",
      text: "Collision surfaces taken from content that already exists for another reason, such as turning architectural blueprints, 3D laser scans, or document layouts directly into level collision.",
    },
    {
      type: "example",
      title: "Example: Super Mario Bros. and Spelunky",
      text: "Super Mario Bros. builds its levels from a tilemap of hand-drawn brick, pipe, and ground blocks, giving designers exact control over every platform gap. Games like Spelunky generate their cave layouts procedurally using code, creating endless variety while checking that paths remain beatable. By contrast, games that import real-world architectural scans or CAD files use extracted geometry: shapes made for a non-game purpose. Because no designer hand-groomed each ledge, forgiveness features like coyote time and corner correction (Chapter 3) become vital.",
    },
    { type: "h", text: "Checkpoints and save states" },
    {
      type: "p",
      text: "When a player fails or stops playing, the game has to decide what to bring back when they return. Two terms describe the main options.",
    },
    {
      type: "term",
      term: "Checkpoint",
      text: "A point the player can return to after failing. The designer decides which parts of the game are restored.",
    },
    {
      type: "term",
      term: "Save state",
      text: "A complete snapshot of everything in the game at one moment, including positions, speeds, timers, and enemy behavior.",
    },
    {
      type: "p",
      text: "The key question for a checkpoint is what it restores. Here are three possibilities, each with different effects on play:",
    },
    {
      type: "ol",
      items: [
        "**Position only.** The player returns to a place but everything else resets. They keep what they learned but lose their progress on that section.",
        "**Position plus completed goals.** The player returns to a place, and things they already finished stay finished. This works well for long levels, but can be a problem if completing those goals was the main challenge.",
        "**Everything.** The entire game is restored exactly. This is a save state. It is ideal for pausing and resuming later, but poor for retrying, because it also restores the player's mistakes, such as being halfway through a bad jump.",
      ],
    },
    {
      type: "p",
      text: "Name each feature according to what it actually does. If a button labeled “checkpoint” actually creates a full save state, it will cause confusing bugs. For example, a jump that was stored in the input buffer before saving might suddenly fire after loading.",
    },
  ],
  recap: [
    "An AABB is a rectangle that never rotates. Checking whether two AABBs overlap is fast and simple.",
    "A variable timestep ties the game's rules to the frame rate, which makes physics and timing inconsistent.",
    "A fixed timestep advances the game in equal steps. Interpolation keeps the picture smooth on fast monitors.",
    "Cap the number of catch-up steps per frame to avoid the spiral of death.",
    "Level collision can come from tilemaps, procedural generation, or existing content (extracted geometry).",
    "A checkpoint restores what the designer chooses. A save state restores everything.",
  ],
  quiz: [
    {
      id: "physics-1",
      review: "collision-shapes-the-axis-aligned-bounding-box",
      prompt: "What is an axis-aligned bounding box (AABB)?",
      choices: [
        { id: "a", text: "A rectangle whose edges always stay horizontal and vertical, checked by testing for overlap on each axis." },
        { id: "b", text: "A hitbox that rotates freely with the animation." },
        { id: "c", text: "A list of an attack's frame data." },
        { id: "d", text: "A checkpoint stored in the browser." },
      ],
      answer: "a",
      why: "AABBs never rotate, which is what makes them fast to check. Rotated shapes are a separate, more expensive option.",
    },
    {
      id: "physics-2",
      review: "the-games-clock-variable-and-fixed-timesteps",
      prompt: "A jump adds upward speed once per frame. Players with faster monitors jump much higher. What went wrong?",
      choices: [
        { id: "a", text: "The physics depends on the frame rate, because the game uses a variable timestep." },
        { id: "b", text: "Hitstun and blockstun were swapped." },
        { id: "c", text: "The aggro radius is too large." },
        { id: "d", text: "There is too much polish." },
      ],
      answer: "a",
      why: "More frames per second means more speed is added per second. A fixed timestep keeps the jump the same on every monitor.",
    },
    {
      id: "physics-3",
      review: "the-games-clock-variable-and-fixed-timesteps",
      prompt: "What is the main benefit of a fixed timestep?",
      choices: [
        { id: "a", text: "The game's rules advance in equal steps, so timing and collisions stay the same on every monitor, while the picture can still look smooth." },
        { id: "b", text: "The game no longer needs to check collisions." },
        { id: "c", text: "Coyote time is added automatically." },
        { id: "d", text: "The display and the simulation always update exactly once each, together." },
      ],
      answer: "a",
      why: "A fixed timestep separates the game's rules from the monitor's refresh rate. Interpolation keeps the picture smooth.",
    },
    {
      id: "physics-4",
      review: "where-level-collision-comes-from",
      prompt: "A game generates its dungeon platforms directly from architectural floor plans rather than hand-drawn tiles. What is this approach called?",
      choices: [
        { id: "a", text: "A tilemap." },
        { id: "b", text: "Procedural geometry." },
        { id: "c", text: "Extracted geometry: collision taken from content that already exists for another purpose." },
        { id: "d", text: "A save state." },
      ],
      answer: "c",
      why: "The floor plans were drawn for architecture, not for platforming. Using them as the level means forgiveness features must handle shapes that nobody tuned by hand.",
    },
    {
      id: "physics-5",
      review: "checkpoints-and-save-states",
      prompt: "A game saves when you reach a checkpoint marker or campfire. Before implementing this feature, what does the designer need to decide?",
      choices: [
        { id: "a", text: "Which parts of the game state it restores, such as position, defeated enemies, opened chests, and pending input buffers." },
        { id: "b", text: "Only which music track plays in the room." },
        { id: "c", text: "The player's real-world reaction time." },
        { id: "d", text: "Whether the collision shapes are rectangles." },
      ],
      answer: "a",
      why: "A checkpoint is defined by what it brings back. Restoring everything, including a half-finished jump, would make it a save state.",
    },
    {
      id: "physics-6",
      review: "keeping-a-fixed-timestep-healthy",
      prompt: "The game falls behind and tries to run every missed step in a single frame, which makes it fall even further behind. What is this called, and how is it usually prevented?",
      choices: [
        { id: "a", text: "The spiral of death. It is prevented by limiting the number of catch-up steps per frame." },
        { id: "b", text: "A meaty hit. It is prevented by hitting on the last active frame." },
        { id: "c", text: "Combo scaling. It is prevented by reducing damage." },
        { id: "d", text: "Corner correction. It is prevented by nudging the player." },
      ],
      answer: "a",
      why: "Trying to catch up all at once makes each frame slower. Capping the catch-up steps drops some time but keeps the game running.",
    },
  ],
};
