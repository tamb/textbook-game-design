import type { Module } from "../types";

export const combat: Module = {
  slug: "combat",
  number: "04",
  part: "two",
  title: "Hitboxes and combat",
  summary:
    "How a game decides that an attack landed, how attacks chain together, and how enemies decide when to fight. The picture on screen is not what decides whether a hit counts.",
  minutes: 16,
  quizVersion: 2,
  termIds: ["hitbox", "hurtbox", "pushbox", "reach", "attack-arc", "cancel", "combo-scaling", "crowd-control", "aggro-radius", "leash", "level-of-detail"],
  objectives: [
    "Explain the difference between a hitbox, a hurtbox, and a pushbox.",
    "Tell the difference between an attack's reach and its arc.",
    "Describe what a cancel is and why it affects balance.",
    "Explain why games reduce the damage of long combos.",
    "Define crowd control, aggro radius, and leash.",
  ],
  blocks: [
    {
      type: "p",
      text: "When you watch a game, it looks as though a fist touches an enemy and the enemy takes damage. That is not quite what happens. Behind the drawings, the game tracks invisible shapes, and a hit only counts when the right shapes overlap at the right time. Sparks, sounds, and camera shake are simply the game reporting that the overlap happened. This chapter explains those invisible shapes and the systems built on top of them.",
    },
    { type: "h", text: "Hitboxes, hurtboxes, and pushboxes" },
    {
      type: "p",
      text: "Games use three kinds of invisible boxes to handle combat and character movement.",
    },
    {
      type: "term",
      term: "Hitbox",
      text: "The invisible shape of an attack that can cause damage. It only exists during the attack's active frames (see Chapter 2).",
    },
    {
      type: "term",
      term: "Hurtbox",
      text: "The invisible shape of a character or object that can receive damage.",
    },
    {
      type: "term",
      term: "Pushbox",
      text: "The solid invisible box around a character's body that prevents other characters from walking into the exact same space.",
    },
    {
      type: "p",
      text: "A hit happens when an attack's hitbox overlaps a target's hurtbox during one of the attack's active frames. Both conditions are required. If the shapes overlap during startup or recovery, nothing happens, because the hitbox does not exist yet or no longer exists. If the drawings overlap but the invisible shapes do not, the attack misses.",
    },
    {
      type: "p",
      text: "A common question is: if hurtboxes only detect incoming attacks, what keeps characters from walking straight through each other? That is the job of the **pushbox** (sometimes called a body collision box). It is solid against other characters' pushboxes, keeping fighters standing next to each other rather than inside each other.",
    },
    {
      type: "p",
      text: "These shapes do not have to match the drawings exactly, and often they should not. They also need to change as the character's pose changes. For example, when a character crouches, its hurtbox should shrink. If it keeps its standing hurtbox, it will be hit by attacks that clearly passed over its head. Players will rightly call that unfair, because the picture and the invisible shape disagreed.",
    },
    {
      type: "example",
      title: "Example: Street Fighter",
      text: "In Street Fighter and other 2D fighters, an attack's hitbox is an invisible rectangle placed around Ryu's fist or Chun-Li's kick for a few active frames. When the hit lands, fiery impact sparks flare across the screen. Those sparks are visual polish; they do not have collision boxes of their own. If the game tested collisions against flying spark effects, whether your next attack landed would depend on how large the previous explosion happened to be.",
    },
    { type: "h", text: "Reach and attack arcs" },
    {
      type: "p",
      text: "When players say an attack “has no range,” they could mean several different things. It helps to separate them.",
    },
    {
      type: "ul",
      items: [
        "**Reach** is how far from the attacker the hitbox extends.",
        "**Attack arc** is the path the hitbox travels, including its angle. A wide horizontal swing can catch an enemy who is backing away and still pass over an enemy who is crouching.",
        "**Timing** is how long the hitbox exists. An attack with long reach can still feel useless if its hitbox appears for only one frame at the end of a long windup.",
      ],
    },
    {
      type: "term",
      term: "Reach",
      text: "How far from the attacker the attack's hitbox extends.",
    },
    {
      type: "term",
      term: "Attack arc",
      text: "The path and angle that a hitbox travels as the attack swings.",
    },
    {
      type: "p",
      text: "Each of these problems has a different fix, so it is worth working out which one players actually mean.",
    },
    { type: "h", text: "Cancels: ending an attack early" },
    {
      type: "p",
      text: "Normally, a character has to finish an attack's recovery before doing anything else. A **cancel** is a rule that lets the player skip part of the recovery by going directly into another action, such as a special move, a jump, or a dash. Cancels are only allowed during specific windows that the designer chooses.",
    },
    {
      type: "term",
      term: "Cancel",
      text: "Ending an attack early by going straight into another action during a window the designer allows. Cancels let actions chain together smoothly.",
    },
    {
      type: "p",
      text: "Cancels are how games let actions flow into each other, but they also change balance. An attack that would normally leave the attacker exposed can become safe if it can be canceled into something else. Designers usually choose when cancels are allowed:",
    },
    {
      type: "ul",
      items: [
        "**Cancel on hit.** Allowed only when the attack connects. This rewards the player for landing the hit.",
        "**Cancel on block.** Allowed when the opponent blocks. This turns a risky attack into continued pressure. Leave it out when you want a blocked attack to give the defender a turn.",
        "**Cancel on miss.** Allowed even when the attack misses. This is very powerful, because it removes the recovery that would normally let the opponent punish a miss.",
      ],
    },
    {
      type: "p",
      text: "Make sure the cancel window starts after the hitbox has had a chance to hit. If the player can cancel before the active frames, the first attack never actually does anything. It just becomes a decorative windup for the second move.",
    },
    { type: "h", text: "Combo scaling" },
    {
      type: "p",
      text: "A **combo** is a series of hits that the defender cannot escape, usually because each hit lands before the hitstun from the previous one wears off. Long combos can be exciting, but they can also cause problems. If every hit deals full damage, the best strategy becomes finding the longest possible combo and repeating it.",
    },
    {
      type: "term",
      term: "Combo scaling",
      text: "Reducing the damage of each later hit in a combo. It is also called proration.",
    },
    {
      type: "p",
      text: "Combo scaling makes each additional hit in a combo deal a little less damage than the one before. This keeps the first hit important, because landing that first hit is the risky decision that started the combo. It also lets designers allow spectacular combos without letting them remove an entire health bar.",
    },
    {
      type: "p",
      text: "There is no single correct formula. Some games reduce damage by a fixed percentage for each hit. Others reduce damage more when the combo starts with a weak attack. Choose a formula that rewards the decisions you want players to think about, and then test it by trying to find the longest, most damaging combo you can.",
    },
    { type: "h", text: "Crowd control" },
    {
      type: "p",
      text: "Some attacks are designed less for damage and more for controlling where enemies can be. This is called **crowd control**. Knocking enemies back, stunning several at once, or firing a projectile that blocks a path are all forms of crowd control.",
    },
    {
      type: "term",
      term: "Crowd control",
      text: "Any effect whose main purpose is to control where a group of enemies can move or when they can act, such as knockback, stuns, or area attacks.",
    },
    {
      type: "p",
      text: "Crowd control attacks can still deal damage, but damage is not what defines them. In an action game like Hades or Diablo, a shockwave or shield bash might deal the same damage as a standard thrust to a single target. If it also shoves five surrounding skeletons backward across the room, it is a crowd control attack, because its primary job is managing where a group of enemies is allowed to stand.",
    },
    { type: "h", text: "When enemies notice you: aggro radius and leash" },
    {
      type: "p",
      text: "Enemies in a game need rules for when to start fighting and when to stop. Designers use two terms for this.",
    },
    {
      type: "term",
      term: "Aggro radius",
      text: "The distance at which an enemy notices the player and decides to engage. “Aggro” is short for aggression.",
    },
    {
      type: "term",
      term: "Leash",
      text: "The distance or amount of time after which an enemy gives up chasing the player and returns to where it started.",
    },
    {
      type: "p",
      text: "Many games split the aggro radius into two distances. At a wider distance, the enemy notices the player: it might turn to look or stand up. At a closer distance, the enemy actually attacks. The leash keeps a chase from lasting forever. Without one, an enemy that notices the player once will follow them indefinitely. With one, the player can choose to escape a fight.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "Do not confuse this with LOD",
      text: "In graphics programming, LOD stands for “level of detail.” It means drawing simpler versions of objects when they are far from the camera. It has nothing to do with enemy behavior. Naming an enemy detection setting something like “LOD of aggression” will confuse anyone who reads the code later. Use clear names such as aggro radius and leash.",
    },
    {
      type: "term",
      term: "Level of detail (LOD)",
      text: "A graphics rendering technique that draws simpler models and textures when an object is far from the camera. It is a visual performance tool, not an enemy behavior term.",
    },
    {
      type: "example",
      title: "Example: World of Warcraft and Elden Ring",
      text: "In games like World of Warcraft or Elden Ring, wandering monsters have carefully tuned detection ranges. An enemy sentry might notice you from thirty paces, turning to face you or growling. If you step within fifteen paces, it charges. If you turn and sprint away, the enemy reaches its leash distance, drops combat, and walks back to its patrol route. Without a leash, every monster in the dungeon would chase you endlessly.",
    },
  ],
  recap: [
    "A hitbox is where an attack deals damage. A hurtbox is where a body receives damage. A pushbox keeps characters from walking through each other.",
    "A hit counts only when a hitbox overlaps a hurtbox during the attack's active frames. Overlapping drawings are not enough.",
    "Reach is how far an attack extends. The arc is the path and angle it travels.",
    "A cancel ends an attack early by going straight into another action. Cancels make actions flow together, and they also affect balance.",
    "Combo scaling reduces the damage of later hits, which keeps the first hit important.",
    "Crowd control manages where enemies can be. The aggro radius is when enemies notice you, and the leash is when they give up.",
  ],
  quiz: [
    {
      id: "combat-1",
      review: "hitboxes-hurtboxes-and-pushboxes",
      prompt: "In combat design, which pairing correctly describes hitboxes and hurtboxes?",
      choices: [
        { id: "a", text: "The defender's body has an active hitbox, and the attacker's weapon has a hurtbox." },
        { id: "b", text: "The attack's volume has an active hitbox that deals damage, and the target's body has a hurtbox that receives damage." },
        { id: "c", text: "Both are called hitboxes, and “hurtbox” means the player's health bar." },
        { id: "d", text: "The particle sparks created on impact form the hurtbox." },
      ],
      answer: "b",
      why: "Hitboxes deal damage and hurtboxes receive it. The visual sparks or dust on impact are polish effects that appear after the collision is detected.",
    },
    {
      id: "combat-2",
      review: "hitboxes-hurtboxes-and-pushboxes",
      prompt: "An attack animation is drawn directly over an enemy's body, but the attack's active frames ended before the volumes overlapped. What happens?",
      choices: [
        { id: "a", text: "A hit, because the visual drawings overlapped." },
        { id: "b", text: "A miss, because the hitbox only exists during active frames, and the volumes never touched during that window." },
        { id: "c", text: "An automatic block." },
        { id: "d", text: "A cancel." },
      ],
      answer: "b",
      why: "The game checks invisible collision volumes during active frames, not the on-screen drawings. Once active frames expire, the hitbox no longer exists.",
    },
    {
      id: "combat-3",
      review: "cancels-ending-an-attack-early",
      prompt: "What is a cancel?",
      choices: [
        { id: "a", text: "Ending an attack early by going straight into another allowed action during a window the designer chose." },
        { id: "b", text: "Automatically reducing the damage of later hits." },
        { id: "c", text: "A brief freeze when a hit lands." },
        { id: "d", text: "The distance at which an enemy notices you." },
      ],
      answer: "a",
      why: "The other answers describe combo scaling, hit-stop, and the aggro radius. A cancel skips part of an attack's recovery by starting a new action.",
    },
    {
      id: "combat-4",
      review: "combo-scaling",
      prompt: "Why do games that allow long combos often use combo scaling?",
      choices: [
        { id: "a", text: "To keep the first hit important, and to stop the longest possible combo from being the only good strategy." },
        { id: "b", text: "To make each hitbox larger than the last." },
        { id: "c", text: "To remove recovery from the first attack." },
        { id: "d", text: "To make coyote time longer during combos." },
      ],
      answer: "a",
      why: "Without scaling, players would simply look for the longest combo. Scaling rewards the risky decision of landing the first hit.",
    },
    {
      id: "combat-5",
      review: "crowd-control",
      prompt: "A special area-attack and a single-target strike deal the exact same damage to one enemy, but the area-attack also pushes surrounding enemies backward. Why is the area-attack considered crowd control?",
      choices: [
        { id: "a", text: "Because it controls where a group of enemies can stand. Damage is not what defines crowd control." },
        { id: "b", text: "Because every projectile is a grab." },
        { id: "c", text: "Because it has no hitbox." },
        { id: "d", text: "Because it starts faster than the single-target strike." },
      ],
      answer: "a",
      why: "Crowd control is about managing the position and timing of multiple enemies. Dealing the same damage as a single-target strike does not change that.",
    },
    {
      id: "combat-6",
      review: "when-enemies-notice-you-aggro-radius-and-leash",
      prompt: "A teammate creates a setting called lodOfAggression for the distance at which enemies start attacking. What is wrong with this name?",
      choices: [
        { id: "a", text: "Nothing. LOD is the standard term for enemy behavior." },
        { id: "b", text: "LOD already means “level of detail” in graphics. This setting is an aggro radius, and the name will confuse other programmers." },
        { id: "c", text: "Distances must be measured in frames." },
        { id: "d", text: "Aggro radii only work in grid-based levels." },
      ],
      answer: "b",
      why: "Level of detail is about drawing simpler graphics at a distance. The distance at which enemies attack is an aggro radius, and the distance at which they give up is a leash.",
    },
  ],
};
