import type { Module } from "../types";

export const teaching: Module = {
  slug: "teaching",
  number: "07",
  part: "three",
  title: "Teaching the player",
  summary:
    "Players cannot use an action they do not know exists. This chapter explains how games show players what is possible without stopping to explain it, using affordances, signifiers, and signposting.",
  minutes: 13,
  quizVersion: 2,
  termIds: ["affordance", "signifier", "signposting", "metroidvania", "knowledge-gate", "sandbox", "objective-play"],
  objectives: [
    "Explain the difference between an affordance and a signifier.",
    "Describe signposting and explain how it differs from simply telling the player what to do.",
    "Explain how removing signposts over time can increase difficulty.",
    "Define a knowledge gate and compare it with an item gate in a metroidvania.",
    "Tell the difference between sandbox play and objective play.",
  ],
  blocks: [
    {
      type: "p",
      text: "A game can have a brilliant feature that nobody ever uses, simply because players never realize it exists. Teaching players what they can do is a core part of design. The best games teach through the world itself rather than by stopping the action to show a page of instructions. This chapter introduces the vocabulary designers use to discuss this kind of teaching.",
    },
    { type: "h", text: "Affordances and signifiers" },
    {
      type: "p",
      text: "Two closely related terms are essential here. They are often confused, so it is worth learning them carefully.",
    },
    {
      type: "term",
      term: "Affordance",
      text: "An action that is possible because of the relationship between a player and an object. A door that can be opened affords opening.",
    },
    {
      type: "term",
      term: "Signifier",
      text: "A visible or audible clue that tells the player an action is possible. A door handle is a signifier that the door can be opened.",
    },
    {
      type: "p",
      text: "The word “affordance” was introduced by the psychologist James J. Gibson. The designer Don Norman later brought it into product design in his book The Design of Everyday Things. Over time, people began using “affordance” to mean both the possible action and the clue that points to it. Norman later introduced the word “signifier” to separate the two ideas.",
    },
    {
      type: "p",
      text: "In Super Mario Bros., a green warp pipe affords entry (standing on it and pressing down takes Mario underground). The open rim of the pipe, its distinct vertical shape, and its vibrant color are signifiers that advertise it as something different from ordinary ground blocks. This distinction matters when something goes wrong. If playtesters walk past an interactive object, the problem could be with the affordance (the trigger is broken) or with the signifier (the object looks like flat background art, so players cannot tell it does anything). Those problems require completely different fixes.",
    },
    {
      type: "callout",
      tone: "rule",
      title: "Key rule",
      text: "If an action has no clear signifier, new players will act as if it does not exist. Discovering a feature by clicking randomly is not a satisfying secret. Most players will give up before they find it.",
    },
    {
      type: "example",
      title: "Example: Portal",
      text: "In Valve's Portal, your portal gun affords firing portals onto walls. However, portals only adhere to specific surfaces. The developers chose white porcelain tiles as the signifier for portal-receptive surfaces, and dark metallic panels as the signifier for non-receptive surfaces. Within minutes, players scan complex test chambers without reading a single word of instructions, guided entirely by the visual signifiers of the wall materials.",
    },
    { type: "h", text: "Signposting" },
    {
      type: "term",
      term: "Signposting",
      text: "Using the level itself to guide the player toward the next useful action, while still letting the player perform that action themselves.",
    },
    {
      type: "p",
      text: "Signposting points the way without doing the work for the player. Examples include a subtle beam of light illuminating a doorway in the direction of travel, a trail of coins in Mario that draws the eye upward, or a clearly visible ledge placed right where a leap of faith is required. In each case, the player still makes the decision and performs the action.",
    },
    {
      type: "p",
      text: "Compare that with an annoying companion character who shouts, “Look over there! Jump across that gap right now!” That is not signposting. It is giving the player the answer. This kind of direct instruction can help a player who is completely stuck, but if it becomes the main way the game teaches, it replaces the skill of figuring things out with simply following orders.",
    },
    { type: "h", text: "Adjusting signposts over time" },
    {
      type: "p",
      text: "Signposting does not have to stay the same for the whole game. Early on, every entrance might be bathed in bright light. Later, lights might only appear near safe areas, or main paths might be clearly lit while secret shortcuts remain shadowed.",
    },
    {
      type: "p",
      text: "Gradually reducing signposts is a way to increase difficulty. Players must now rely on what they have learned. However, timing matters. Removing a signpost after players understand what it points to is a fair challenge. Removing it before they understand it simply hides the feature.",
    },
    { type: "h", text: "Knowledge as a key" },
    {
      type: "term",
      term: "Metroidvania",
      text: "A type of game, named after the Metroid and Castlevania series, in which new areas open up as the player gains new abilities or items.",
    },
    {
      type: "p",
      text: "In a classic metroidvania, the player might see a ledge they cannot reach. Later, after finding a double-jump ability, they return and reach it. The ability acts as a key, and the ledge acts as a lock.",
    },
    {
      type: "term",
      term: "Knowledge gate",
      text: "A part of the game that the player can only get past once they understand something, rather than once they have collected an item.",
    },
    {
      type: "p",
      text: "A knowledge gate works the same way, except that the key is understanding. Nothing in the player's inventory changes. In Outer Wilds, you can technically fly to any planet or reach the ending within the first twenty minutes. The only lock is your own lack of understanding. Learning how sand shifts between the Hourglass Twins or how quantum objects move is the key. Nothing in your inventory changes, but the solar system opens up because of what you now know.",
    },
    {
      type: "p",
      text: "If a game's main appeal is learning and understanding, avoid adding item pickups that simply stand in for knowledge the game could have taught. A new ability is still a good idea when it adds a genuinely new action. This is also where fail-forward (see [Chapter 6](/learn/structure/)) fits well: losing a fight can cost the player health, but it should not make them forget what they learned.",
    },
    { type: "h", text: "Sandbox and objective play" },
    {
      type: "p",
      text: "The same set of actions can support very different kinds of play, depending on whether the game sets a goal.",
    },
    {
      type: "term",
      term: "Sandbox play",
      text: "Play with no required goal. The player chooses what to do with the available actions.",
    },
    {
      type: "term",
      term: "Objective play",
      text: "Play aimed at a specific goal, such as reaching a destination in six steps or surviving for a set amount of time.",
    },
    {
      type: "p",
      text: "Even when the verbs are identical, these two kinds of play have different core loops, because the goal is part of the loop. In Minecraft's Creative mode, success means exploring, experimenting, and building. In a Survival speedrun with the exact same controls, success means racing efficiently toward the Ender Dragon.",
    },
    {
      type: "p",
      text: "Make it clear which kind of play each mode offers. A mode that sometimes criticizes the player for wandering and sometimes for rushing will feel inconsistent. It is fine to offer both, for example an endless mode and a daily challenge, as long as they are separate. Each mode should have its own difficulty curve, its own failure rules, and its own signposting.",
    },
    {
      type: "callout",
      tone: "note",
      title: "Three ideas to remember",
      text: "Game feel decides whether people want to keep playing after the first minute. Affordances, made visible through signifiers, decide whether players discover what they can do. The core loop decides whether a play session holds together. Much of the rest of game design is about supporting these three ideas.",
    },
  ],
  recap: [
    "An affordance is an action that is possible. A signifier is the clue that tells the player it is possible.",
    "If an action has no signifier, new players will behave as if it does not exist.",
    "Signposting guides the player using the level itself. Telling the player the answer directly is not signposting.",
    "Gradually removing signposts increases difficulty, but only after players understand what the signposts pointed to.",
    "A knowledge gate is like a metroidvania lock, except the key is understanding instead of an item.",
    "Sandbox play has no required goal. Objective play has a specific goal. They have different core loops even with the same actions.",
  ],
  quiz: [
    {
      id: "teach-1",
      review: "affordances-and-signifiers",
      prompt: "In Super Mario Bros., a green pipe can be entered by pressing down. The pipe's open top rim and vibrant green color are:",
      choices: [
        { id: "a", text: "Signifiers. The ability to enter the pipe is the affordance." },
        { id: "b", text: "The collision shape. The color and collision are the same thing." },
        { id: "c", text: "The input buffer." },
        { id: "d", text: "The checkpoint." },
      ],
      answer: "a",
      why: "The affordance is the action that is possible: entering the pipe. The signifier is the perceivable clue that tells the player about it: the open rim and distinct color.",
    },
    {
      id: "teach-2",
      review: "affordances-and-signifiers",
      prompt: "New players repeatedly walk past a secret interactive object, but it works as intended whenever a designer tells them to try it. What is missing?",
      choices: [
        { id: "a", text: "A signifier. The action is possible, but players have no clue that it exists." },
        { id: "b", text: "Combo scaling." },
        { id: "c", text: "A variable timestep." },
        { id: "d", text: "Hitstun on the object." },
      ],
      answer: "a",
      why: "Since the object works when someone knows to try it, the affordance is fine. The game simply never advertised the possibility through a signifier.",
    },
    {
      id: "teach-3",
      review: "signposting",
      prompt: "Which of these is an example of environmental signposting?",
      choices: [
        { id: "a", text: "A pop-up modal dialog that names the exact path and tells you to click it." },
        { id: "b", text: "A trail of coins or soft lighting placed along the intended path, which the player still has to discover and navigate on their own." },
        { id: "c", text: "An intrusive companion character who shouts the exact solution." },
        { id: "d", text: "Disabling every route except the single correct one." },
      ],
      answer: "b",
      why: "Signposting points toward an action using the environment but leaves the decision and action to the player. The other options either give away the answer or remove player agency.",
    },
    {
      id: "teach-4",
      review: "knowledge-as-a-key",
      prompt: "In Outer Wilds, discovering how a quantum moon behaves lets you reach a new part of the solar system. No item or upgrade was added to your inventory. What kind of gate is this?",
      choices: [
        { id: "a", text: "A knowledge gate. The key is understanding rather than an inventory item." },
        { id: "b", text: "A traditional item gate." },
        { id: "c", text: "Level of detail (LOD)." },
        { id: "d", text: "An input buffer." },
      ],
      answer: "a",
      why: "The path opened because the player learned how a system works, not because an item was added to an inventory. That is the definition of a knowledge gate.",
    },
    {
      id: "teach-5",
      review: "sandbox-and-objective-play",
      prompt: "In Minecraft, playing in Creative mode (building freely with infinite blocks) and playing a Survival speedrun use the same controls. Why do they have different core loops?",
      choices: [
        { id: "a", text: "Because the goal is part of the loop. Building freely and racing toward a win condition repeat different cycles." },
        { id: "b", text: "They have the same core loop, because the controls are the same." },
        { id: "c", text: "Because Creative mode has no game feel." },
        { id: "d", text: "Because a target removes the need for signifiers." },
      ],
      answer: "a",
      why: "The controls are shared, but the purpose of using them is different. That makes the repeated cycle of play different too.",
    },
    {
      id: "teach-6",
      review: "adjusting-signposts-over-time",
      prompt: "Visual cues for interactive surfaces in Portal are made subtler in the final test chambers, after players have successfully solved dozens of puzzles. What has changed?",
      choices: [
        { id: "a", text: "The difficulty has increased, because a signifier was made subtler after players learned what it meant." },
        { id: "b", text: "The affordance was removed, so portals can no longer be placed." },
        { id: "c", text: "The game's timestep." },
        { id: "d", text: "The player's hitbox." },
      ],
      answer: "a",
      why: "Portals still adhere to white surfaces, so the affordance is unchanged. Quieting the visual cue after players understand the rules is a fair difficulty ramp. Doing so on the first puzzle would be an unfair wall.",
    },
  ],
};
