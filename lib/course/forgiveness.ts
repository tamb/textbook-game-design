import type { Module } from "../types";

export const forgiveness: Module = {
  slug: "forgiveness",
  number: "03",
  part: "one",
  title: "Making controls forgiving",
  summary:
    "Human reactions are slower than a game's frames. This chapter covers the small, hidden allowances, such as coyote time and input buffering, that make a game accept what the player meant to do.",
  minutes: 15,
  quizVersion: 2,
  termIds: ["forgiveness-window", "coyote-time", "input-buffering", "variable-jump", "corner-correction"],
  objectives: [
    "Explain why games need to forgive slightly early or late inputs.",
    "Define coyote time and input buffering, and tell them apart.",
    "Describe variable jump height and corner correction.",
    "Explain why forgiveness windows should be measured in milliseconds rather than frames.",
    "Choose a reasonable starting length for a forgiveness window.",
  ],
  blocks: [
    {
      type: "p",
      text: "Have you ever been certain you pressed jump at the edge of a ledge, only to watch your character fall? Often the game was technically correct: you pressed the button a fraction of a second too late. Good games quietly allow for this kind of small mistake. This chapter describes the most common ways they do it.",
    },
    { type: "h", text: "Why games need to forgive" },
    {
      type: "p",
      text: "People react to what they see in roughly 200 milliseconds. As [Chapter 2](/learn/frames/) showed, that is about 12 frames at 60 frames per second. By the time a player sees the edge of a ledge and presses a button, the game has already moved on by several frames. A press that felt perfectly timed to the player can arrive too late for the game.",
    },
    {
      type: "p",
      text: "Designers close this gap with **forgiveness windows**. A forgiveness window is a short period of time during which the game accepts an input that was slightly early or slightly late. When these windows are tuned well, players do not notice them. They simply feel that the game is fair. When the windows are too long, players notice that the game is helping them, and it starts to feel as if the character is being pulled by a magnet.",
    },
    {
      type: "term",
      term: "Forgiveness window",
      text: "A short grace period in which the game accepts an input that was slightly too early or too late, so that it responds to what the player intended.",
    },
    { type: "h", text: "Coyote time" },
    {
      type: "p",
      text: "**Coyote time** lets the player jump for a brief moment after walking off a ledge. The name comes from the cartoon coyote who runs off a cliff and hangs in the air for a moment before he falls. Without coyote time, a player who presses jump a few frames after leaving the ledge falls instead of jumping, even though they feel they pressed it in time.",
    },
    {
      type: "term",
      term: "Coyote time",
      text: "A short period after leaving the ground during which the player is still allowed to jump.",
    },
    {
      type: "p",
      text: "The platformer Celeste made coyote time widely known. Its designer, Maddy Thorson, has written publicly about the forgiveness features in Celeste. The important lesson is not a particular number. It is the goal: make the window long enough to cover the delay between the player's eyes and thumb, but short enough that jumping from open air still fails.",
    },
    { type: "h", text: "Input buffering" },
    {
      type: "p",
      text: "**Input buffering** handles the opposite problem: pressing a button too early. Imagine a player who is falling toward a platform and presses jump just before landing. Without a buffer, the game ignores the press because the character was still in the air. With a buffer, the game remembers the press for a short time and performs the jump on the first frame that it becomes allowed, which in this case is the moment of landing.",
    },
    {
      type: "term",
      term: "Input buffering",
      text: "Storing a button press that arrives before an action is allowed, and then performing the action as soon as it becomes allowed.",
    },
    {
      type: "p",
      text: "Games without buffering often feel unresponsive, as if they are not listening. Players press buttons slightly early all the time, and every one of those presses disappears.",
    },
    { type: "h", text: "Comparing coyote time and buffering" },
    {
      type: "p",
      text: "Players describe both problems the same way: “the jump should have worked.” However, the two features solve different problems, and you need both.",
    },
    {
      type: "table",
      caption: "Coyote time and input buffering compared.",
      headers: ["", "Coyote time", "Input buffering"],
      rows: [
        ["Solves", "Pressing too late", "Pressing too early"],
        ["How it works", "Keeps the ability to jump for a moment after leaving the ground", "Remembers a press and performs it as soon as it is allowed"],
        ["Typical situation", "Walking off a ledge and jumping a moment later", "Pressing jump just before landing"],
        ["If it is missing", "Ledge jumps fail when players are sure they pressed in time", "The game ignores early presses and feels unresponsive"],
        ["If it is too long", "The character can jump from mid-air", "A jump fires long after the player changed their mind"],
      ],
    },
    {
      type: "example",
      title: "Example: Celeste",
      text: "In Celeste, Madeline runs toward the edge of a crumbling platform and presses jump a fraction of a second after stepping off into open air. Coyote time ensures that jump still succeeds. Separately, as Madeline falls toward a narrow ledge, a player presses jump several frames before touching down. Celeste's input buffer holds that press and launches Madeline the exact frame her feet hit the ground. Coyote time forgives late presses; input buffering forgives early presses.",
    },
    { type: "h", text: "Buffering in fighting games" },
    {
      type: "p",
      text: "Fighting games rely heavily on buffering. A player who is stuck in blockstun or recovery (see [Chapter 2](/learn/frames/)) will often press their next attack before they are allowed to act. The buffer stores that press and performs it on the first available frame. For example, the fighting game Tekken uses an 8-frame buffer during a round, which is about 133 milliseconds.",
    },
    {
      type: "p",
      text: "Buffering is what makes frame data meaningful for real people. Suppose the frame data says a blocked attack leaves the attacker 10 frames behind, and the defender has a 10-frame jab. On paper, the defender can always counterattack. In practice, no human can press the button on exactly the right frame. Without a buffer, the counterattack exists only on paper.",
    },
    {
      type: "p",
      text: "Buffering also matters during hit-stop. When both characters freeze on impact, the player's thumb keeps moving. Presses made during the freeze should be stored and used when the freeze ends. If they are thrown away, the hit-stop that was meant to add weight will instead make the game feel unresponsive.",
    },
    { type: "h", text: "Two more helpers: variable jump height and corner correction" },
    {
      type: "p",
      text: "Two other features are commonly paired with coyote time and buffering.",
    },
    {
      type: "term",
      term: "Variable jump height",
      text: "A jump that goes higher the longer the button is held. Releasing the button early cuts the jump short.",
    },
    {
      type: "p",
      text: "Variable jump height lets a single button produce many different jumps. While the character is rising, letting go of the button reduces its upward speed, so a quick tap gives a small hop and a long press gives a full jump. Players learn this within the first minute, and level designers can then build challenges that require both short and tall jumps.",
    },
    {
      type: "p",
      text: "A related secret of jump feel is **gravity scaling**: in classic platformers such as Mario and Celeste, gravity is often set higher when falling than when rising. The character rises smoothly, reaches the peak, and snaps back to the ground quickly. If upward and downward gravity are equal, jumps often feel “floaty,” as if the character were floating through water or jumping on the moon.",
    },
    {
      type: "term",
      term: "Corner correction",
      text: "Gently nudging the character past an edge it would otherwise bump into by just a few pixels.",
    },
    {
      type: "p",
      text: "Corner correction handles near-misses with level geometry. If a jump would clip the corner of a platform by only a few pixels, the game slides the character slightly so it lands on top or passes by cleanly. The collision was technically correct, but stopping the jump would feel broken. Keep the nudge small. If it is large enough for players to notice, the character will seem to be magnetically pulled onto platforms.",
    },
    { type: "h", text: "Measuring windows in milliseconds" },
    {
      type: "p",
      text: "It is tempting to set coyote time to a number of frames, such as “6 frames.” This causes a hidden problem. A frame is not a fixed amount of time. Its length depends on the frame rate.",
    },
    {
      type: "ul",
      items: [
        "At 60 frames per second, 6 frames lasts 100 milliseconds.",
        "At 144 frames per second, 6 frames lasts about 42 milliseconds, less than half as long.",
      ],
    },
    {
      type: "p",
      text: "Human reaction time does not change with the frame rate, so the window should not either. Set the window in milliseconds, then convert it to frames using the frame rate the game actually runs at. The [Practice Tools](/tools/) page includes a calculator for this.",
    },
    { type: "h", text: "How long should a window be?" },
    {
      type: "callout",
      tone: "rule",
      title: "Starting values",
      text: "A coyote time or input buffer of about 80 to 120 milliseconds is a good starting point. That is long enough to cover small timing mistakes, but short enough that players cannot deliberately jump from mid-air. Above about 180 to 200 milliseconds, players start to notice the help. These are starting points to test, not fixed rules.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "Forgiveness does not replace fast controls",
      text: "A buffer makes sure an early press is not lost. It does not make a slow action feel fast. If a jump takes 12 frames to leave the ground, buffering will not fix it. The action itself still needs to begin promptly.",
    },
  ],
  recap: [
    "People react in about 200 milliseconds, which is around 12 frames at 60 frames per second. Forgiveness windows cover that gap.",
    "Coyote time lets the player jump shortly after leaving a ledge. It forgives pressing too late.",
    "Input buffering remembers a press and performs it as soon as it is allowed. It forgives pressing too early.",
    "Variable jump height lets one button produce short and tall jumps. Corner correction nudges the character past small collisions.",
    "Set forgiveness windows in milliseconds, because the length of a frame changes with the frame rate.",
    "About 80 to 120 milliseconds is a good starting length for coyote time and buffering.",
  ],
  quiz: [
    {
      id: "forgive-1",
      review: "input-buffering",
      prompt: "A player presses jump four frames before landing, and the character jumps on the exact frame it lands. Which feature made that happen?",
      choices: [
        { id: "a", text: "Coyote time, because the press happened in the air." },
        { id: "b", text: "Input buffering, which stored the early press until jumping was allowed." },
        { id: "c", text: "Corner correction, because landing is a kind of corner." },
        { id: "d", text: "Combo scaling." },
      ],
      answer: "b",
      why: "The press came too early and was performed at the first allowed moment. That is buffering. Coyote time applies after walking off a ledge.",
    },
    {
      id: "forgive-2",
      review: "coyote-time",
      prompt: "A player walks off a ledge and presses jump a few frames later, while already in the air. The jump still works. What is this called?",
      choices: [
        { id: "a", text: "Coyote time: the ability to jump lasts briefly after leaving the ground." },
        { id: "b", text: "A meaty hit." },
        { id: "c", text: "Frame advantage." },
        { id: "d", text: "A variable timestep." },
      ],
      answer: "a",
      why: "Coyote time extends the ability to jump after the ground is gone. Storing an early press would be buffering instead.",
    },
    {
      id: "forgive-3",
      review: "measuring-windows-in-milliseconds",
      prompt: "Why should coyote time be set in milliseconds instead of frames?",
      choices: [
        { id: "a", text: "Because a frame lasts a different amount of time at different frame rates, but human reaction time does not change." },
        { id: "b", text: "Because frames cannot measure time." },
        { id: "c", text: "Because milliseconds make a fixed timestep unnecessary." },
        { id: "d", text: "Because a frame always lasts exactly 1 millisecond." },
      ],
      answer: "a",
      why: "Six frames is 100 milliseconds at 60 frames per second but only about 42 milliseconds at 144. Setting the window in milliseconds keeps it the same for every player.",
    },
    {
      id: "forgive-4",
      review: "measuring-windows-in-milliseconds",
      prompt: "At 60 frames per second, about how many frames is a 100 millisecond coyote time?",
      choices: [
        { id: "a", text: "100 frames." },
        { id: "b", text: "About 6 frames." },
        { id: "c", text: "Exactly 1 frame." },
        { id: "d", text: "About 60 frames." },
      ],
      answer: "b",
      why: "One frame at 60 frames per second is about 16.7 milliseconds, and 100 ÷ 16.7 ≈ 6. At 144 frames per second, the same 100 milliseconds would be about 14 frames.",
    },
    {
      id: "forgive-5",
      review: "buffering-in-fighting-games",
      prompt: "A fighting game's frame data says a certain jab should always counter a blocked sweep. Players keep failing and say the game ignored their button press. What is the most likely cause?",
      choices: [
        { id: "a", text: "The jab's hitbox is a rectangle." },
        { id: "b", text: "There is no input buffer, so players would need to press the button on one exact frame." },
        { id: "c", text: "Coyote time is too long." },
        { id: "d", text: "Combo scaling reduced the jab's damage to zero." },
      ],
      answer: "b",
      why: "Frame data describes what is possible. A buffer is what lets a real person do it, by storing a press made slightly early and performing it on the first available frame.",
    },
    {
      id: "forgive-6",
      review: "two-more-helpers-variable-jump-height-and-corner-correction",
      prompt: "What does variable jump height give the player?",
      choices: [
        { id: "a", text: "Many different jumps from one button: a quick tap gives a small hop, and holding gives a full jump." },
        { id: "b", text: "A second jump that only works after leaving a ledge." },
        { id: "c", text: "Protection from bumping into corners." },
        { id: "d", text: "A longer freeze when landing." },
      ],
      answer: "a",
      why: "Releasing the button early reduces the character's upward speed, so the player controls the height of the jump.",
    },
  ],
};
