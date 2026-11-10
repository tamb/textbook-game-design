import type { Module } from "../types";

export const feel: Module = {
  slug: "feel",
  number: "01",
  part: "one",
  title: "Game feel",
  summary:
    "Why some games feel good to control and others feel sluggish or floaty. This chapter breaks game feel into parts so you can tell which part is causing a problem.",
  minutes: 14,
  quizVersion: 2,
  termIds: ["game-feel", "real-time-control", "simulated-space", "polish", "juice", "metaphor", "snappiness"],
  objectives: [
    "Explain what designers mean by the phrase “game feel.”",
    "Name the three parts of game feel: real-time control, simulated space, and polish.",
    "Describe how the way a character looks changes what players expect from it.",
    "Explain the difference between polish and “juice,” and why juice cannot fix slow controls.",
    "Use a step-by-step order to work out why a game feels bad.",
  ],
  blocks: [
    {
      type: "p",
      text: "Most people can tell within a few seconds whether a game feels good to play. A character might feel responsive and precise, or it might feel heavy, slippery, or slow to react. Players usually cannot explain why. Game designers need to be able to explain it, because they have to fix it. This chapter gives you the vocabulary to do that.",
    },
    { type: "h", text: "What is game feel?" },
    {
      type: "p",
      text: "The designer Steve Swink wrote a book called Game Feel (2009) that gave the idea a clear definition. In his words, game feel is “real-time control of virtual objects in a simulated space, with interactions emphasized by polish.” Each part of that sentence matters, and the next section takes them one at a time.",
    },
    {
      type: "term",
      term: "Game feel",
      text: "The sensation of controlling something in a game moment to moment. It comes from three things working together: responsive controls, a world that gives movement a sense of scale, and visual and audio effects that make actions feel solid.",
    },
    {
      type: "p",
      text: "It helps to think of game feel as a loop. The player decides what they want to do. They press a button. The game updates. The screen and speakers show the result. The player sees that result and adjusts. This loop repeats many times every second. Playing an action game is closer to steering a bicycle than to choosing an option from a menu.",
    },
    {
      type: "p",
      text: "If any step in that loop is slow, the whole game feels slow. Players rarely describe the problem precisely. Instead, they say the game feels “heavy,” “floaty,” or “unfair.” Part of a designer's job is to translate those vague complaints into a specific cause.",
    },
    { type: "h", text: "The three parts of game feel" },
    {
      type: "p",
      text: "Swink's definition contains three parts. Players experience them all at once, but designers need to separate them in order to diagnose problems.",
    },
    {
      type: "ol",
      items: [
        "**Real-time control.** The player acts continuously, and the game responds immediately. There is no pause where the player waits for the computer to take its turn.",
        "**Simulated space.** The world around the character gives movement a sense of scale. Floors, walls, nearby objects, and scrolling backgrounds all tell the player how fast they are going. A character sliding across a blank white screen may be moving quickly according to the code, but the player cannot feel that speed because there is nothing to compare it to.",
        "**Polish.** Effects such as particles, camera shake, squash-and-stretch animation, and impact sounds make actions feel more forceful. Polish exaggerates what happened. It does not change what happened.",
      ],
    },
    {
      type: "term",
      term: "Real-time control",
      text: "A continuous loop of player intent, button press, game response, and player adjustment, with no waiting between turns.",
    },
    {
      type: "term",
      term: "Simulated space",
      text: "The surfaces, walls, and backgrounds that give movement a visible scale. Without nearby objects, speed is impossible to judge.",
    },
    {
      type: "term",
      term: "Polish",
      text: "Visual and sound effects that make actions feel solid, such as particles, camera shake, and impact audio. Polish emphasizes an action but cannot make a slow action faster.",
    },
    {
      type: "p",
      text: "These parts affect each other more than you might expect. Swink describes a student game called De Blob in which the player controls a ball. Adding a squash-and-stretch effect, without changing the physics at all, made the ball feel like it was made of soft paint instead of hard stone. Polish changed what the material seemed to be.",
    },
    {
      type: "p",
      text: "However, polish has a firm limit. It cannot make a slow action fast. If a jump starts late, adding more particles will not make it start sooner. The button press still happened when it happened.",
    },
    { type: "h", text: "A closer look: six building blocks" },
    {
      type: "p",
      text: "Some designers break game feel into six smaller pieces instead of three. This more detailed list is useful when you are trying to locate a specific problem.",
    },
    {
      type: "table",
      caption: "Six building blocks of game feel.",
      headers: ["Building block", "What it means"],
      rows: [
        ["Input", "The physical device the player holds. A keyboard and a controller feel different because the buttons travel different distances and give different feedback to the hand."],
        ["Response", "What the game does in the moments right after the player presses a button."],
        ["Context", "The surrounding world that makes motion readable, such as platforms, walls, and backgrounds."],
        ["Polish", "Effects that emphasize an action, such as sparks, shaking, and sound."],
        ["Metaphor", "What the player expects based on what the character looks like. A car, a person, and a ball each suggest different behavior."],
        ["Rules", "Limits that turn movement into a game, such as how many times you can jump or how long you must wait before attacking again."],
      ],
    },
    { type: "h", text: "Metaphor: what players expect" },
    {
      type: "p",
      text: "Players bring real-world expectations to every game. They know roughly how a car should handle, how a person should run, and how a punch should land. Designers call this the **metaphor** of a character or action.",
    },
    {
      type: "term",
      term: "Metaphor",
      text: "The real-world thing a character or action represents. It shapes what players expect. If the movement does not match those expectations, the game feels wrong even when the code is working correctly.",
    },
    {
      type: "p",
      text: "Imagine a racing game where you keep every number about speed, acceleration, and turning exactly the same, but replace the car with a person running. The code has not changed, but the game will feel completely different. Players expect a car to drift and grip the road. They expect a runner to tire and stumble. The same movement that felt right for a car may feel strange for a person.",
    },
    {
      type: "p",
      text: "This works in the other direction too. If you want an attack to feel heavy and powerful, draw it as something heavy, such as a fist or a hammer. If the attack is drawn as a small flash of light, players will expect it to be quick and light, and a heavy, slow impact will feel out of place.",
    },
    {
      type: "example",
      title: "Example: Super Mario 64",
      text: "In Super Mario 64, Steve Swink points out how the three parts of feel unite. Mario's character—a springy, acrobatic plumber—is the metaphor, so players naturally expect him to skid, lean into turns, and bounce. The puffs of smoke when he stops, the coin chime, and his joyful voice clips are polish. The castle grounds, grassy hills, and stone bridges provide the simulated space that makes his running speed easy to read.",
    },
    { type: "h", text: "Polish and juice" },
    {
      type: "p",
      text: "You will often hear designers use the word **juice**. The term became popular after a 2012 talk by Martin Jonasson and Petri Purho called “Juice It or Lose It.” In that talk, they took a plain brick-breaking game and added more and more effects: bouncing, shaking, flashing, and sound. The game stayed mechanically the same, but it became far more enjoyable to watch and play.",
    },
    {
      type: "term",
      term: "Juice",
      text: "Exaggerated, immediate feedback on an action, such as screen shake, flashes, particles, and a brief freeze when something is hit. Juice is the most noticeable kind of polish.",
    },
    {
      type: "p",
      text: "Juice is useful, but it is often misused. It works well as a final layer on a game that already responds well. It does not work as a fix for a game that responds poorly. An attack that misses is still a miss, no matter how many sparks it makes. A slow input is still slow.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "Common mistake",
      text: "When a game feels bad, it is tempting to add more effects. If the real problem is that the controls react too slowly, the effects make things worse. Players start to connect the flashy feedback with the delay, and the whole game feels laggy.",
    },
    { type: "h", text: "Snappiness and weight" },
    {
      type: "p",
      text: "Players often praise games for feeling “snappy.” Although this is an informal word, it describes something you can measure. An action feels snappy when two things are true. First, it begins quickly after the button is pressed. Second, the feedback (a change in pose, a sound, a flash) appears at the exact moment of impact rather than slightly afterward.",
    },
    {
      type: "term",
      term: "Snappiness",
      text: "The feeling that an action responds instantly. It comes from a short delay before the action begins and feedback that appears at the moment of impact.",
    },
    {
      type: "p",
      text: "Snappy is not the only good feel. Sometimes you want an action to feel heavy, like a slow, powerful hammer swing. A heavy action can take longer to start, as long as the player can clearly see the windup happening. What players call “sluggish” is usually a delay where nothing visible happens, followed by feedback that arrives late.",
    },
    {
      type: "p",
      text: "[Chapter 2](/learn/frames/) explains how to measure these delays precisely, using a unit called a frame.",
    },
    { type: "h", text: "Diagnosing a game that feels bad" },
    {
      type: "p",
      text: "When a game feels wrong, check its parts in a specific order. Start with the problems that effects cannot hide, and finish with the effects themselves.",
    },
    {
      type: "ol",
      items: [
        "**Response timing.** Does the action start quickly enough after the button press?",
        "**Forgiveness.** Does the game accept inputs that are slightly early or slightly late? ([Chapter 3](/learn/forgiveness/) covers this.)",
        "**Space.** Does the world around the character make its speed and position easy to read?",
        "**Metaphor.** Does the character's appearance match how it moves and hits?",
        "**Polish.** Only after the first four are right, ask whether the effects are strong enough.",
      ],
    },
    {
      type: "p",
      text: "The rest of this book builds on this chapter. Later chapters explain forgiveness, attack timing, collision, and finally the larger structure that makes a game worth playing again and again.",
    },
  ],
  recap: [
    "Game feel is the sensation of controlling something in real time. Steve Swink defines it as real-time control, in a simulated space, emphasized by polish.",
    "Simulated space gives movement a sense of scale. Without nearby objects, speed is hard to feel.",
    "Polish can change what something seems to be made of, but it cannot make a slow action fast.",
    "Metaphor is what players expect based on how something looks. Changing the art can change the feel even if the code stays the same.",
    "Juice is exaggerated feedback. It improves a game that already responds well, but it cannot fix one that responds slowly.",
    "When a game feels bad, check response timing first and visual effects last.",
  ],
  quiz: [
    {
      id: "feel-1",
      review: "the-three-parts-of-game-feel",
      prompt: "Which description matches Steve Swink's definition of game feel?",
      choices: [
        { id: "a", text: "The number of particles, shakes, and flashes attached to an action." },
        { id: "b", text: "Real-time control of virtual objects in a simulated space, emphasized by polish." },
        { id: "c", text: "The number of different actions a player can perform." },
        { id: "d", text: "How quickly the game becomes difficult." },
      ],
      answer: "b",
      why: "The other answers describe real topics, but not game feel. Swink's definition has three parts: real-time control, a simulated space, and polish on top.",
    },
    {
      id: "feel-2",
      review: "the-three-parts-of-game-feel",
      prompt: "In the game De Blob, a squash-and-stretch effect made the same physics feel like paint instead of stone. Which part of game feel changed?",
      choices: [
        { id: "a", text: "The physics code." },
        { id: "b", text: "The scoring rules." },
        { id: "c", text: "Polish. Players experience the physics and the visual effects as a single sensation." },
        { id: "d", text: "The weight of the controller." },
      ],
      answer: "c",
      why: "The physics stayed exactly the same. Only the visual effect changed, and that was enough to change what the ball seemed to be made of.",
    },
    {
      id: "feel-3",
      review: "metaphor-what-players-expect",
      prompt: "You keep a car's handling numbers exactly the same but replace the car with a running person. What should you expect?",
      choices: [
        { id: "a", text: "The game will feel different, because players expect a person to move differently from a car." },
        { id: "b", text: "Nothing will change, because appearance never affects control." },
        { id: "c", text: "The game will run more slowly." },
        { id: "d", text: "Every attack will become stronger." },
      ],
      answer: "a",
      why: "This is metaphor at work. The code did not change, but players bring different expectations to a runner than to a car, so the same movement feels different.",
    },
    {
      id: "feel-4",
      review: "polish-and-juice",
      prompt: "A punch in an action game starts a noticeable moment after the button is pressed, and then shows a huge burst of sparks, screen shake, and loud sound. Players say it feels laggy. What is the real problem?",
      choices: [
        { id: "a", text: "There is not enough juice. Add screen flash on top of the sparks." },
        { id: "b", text: "The sparks are drawn in the wrong color." },
        { id: "c", text: "The background needs more detailed scenery." },
        { id: "d", text: "The attack responds too slowly. Visual effects cannot make it start sooner." },
      ],
      answer: "d",
      why: "The visual feedback is intense, but the attack itself takes too long to begin. That is a response-timing problem. Adding more effects would only draw attention to the delay.",
    },
    {
      id: "feel-5",
      review: "snappiness-and-weight",
      prompt: "Which combination makes an action feel snappy?",
      choices: [
        { id: "a", text: "A long windup the player cannot see, with feedback that arrives after the impact." },
        { id: "b", text: "A quick start, with feedback that appears at the exact moment of impact." },
        { id: "c", text: "Many particles, with no change in timing." },
        { id: "d", text: "A game that becomes difficult very quickly." },
      ],
      answer: "b",
      why: "Snappiness comes from a short delay before the action starts and feedback that lands on the impact. Heavy actions can take longer to start, as long as the windup is visible.",
    },
    {
      id: "feel-6",
      review: "the-three-parts-of-game-feel",
      prompt: "A character slides across a completely blank white screen. Its speed is high in the code, but players say they cannot tell how fast it is going. Which part of game feel is missing?",
      choices: [
        { id: "a", text: "Simulated space. There is nothing nearby to give the movement a sense of scale." },
        { id: "b", text: "Combo scaling." },
        { id: "c", text: "A reward schedule." },
        { id: "d", text: "An enemy detection range." },
      ],
      answer: "a",
      why: "Without surfaces, backgrounds, or nearby objects, speed is just a number. The player needs something in the world to compare the movement against.",
    },
  ],
};
