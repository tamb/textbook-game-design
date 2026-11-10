import type { Module } from "../types";

export const frames: Module = {
  slug: "frames",
  number: "02",
  part: "one",
  title: "Timing an attack",
  summary:
    "How games measure time in frames, the three phases of every attack, and how to work out which player gets to act first after a hit.",
  minutes: 18,
  quizVersion: 2,
  termIds: ["frame", "frame-data", "startup", "active-frames", "recovery", "hitstun", "blockstun", "frame-advantage", "meaty", "i-frames", "hit-stop"],
  objectives: [
    "Explain what a frame is and convert between frames and milliseconds.",
    "Name the three phases of an attack: startup, active, and recovery.",
    "Explain hitstun and blockstun.",
    "Calculate frame advantage and explain what a positive or negative number means.",
    "Explain invulnerability frames (i-frames) and why games use them during dodges.",
    "Describe how hit-stop makes a hit feel heavier without changing who acts first.",
  ],
  blocks: [
    {
      type: "p",
      text: "Chapter 1 explained that a slow response makes a game feel bad. To fix that, you need a way to measure exactly how slow something is. Games measure time in units called frames. This chapter shows how designers use frames to describe and balance attacks. The ideas come from fighting games, but they apply just as well to a punch in a platformer or an action game.",
    },
    { type: "h", text: "Frames: the unit of game time" },
    {
      type: "p",
      text: "A game does not run continuously. Instead, it updates in small steps, many times per second. Each step is called a **frame**. During each frame, the game reads the controller, moves characters, checks for collisions, and draws a new picture.",
    },
    {
      type: "term",
      term: "Frame",
      text: "One update of the game. Most games aim for 60 frames per second, which means each frame lasts about 16.7 milliseconds (a millisecond is one thousandth of a second).",
    },
    {
      type: "p",
      text: "To convert frames into milliseconds, divide 1,000 by the frame rate to get the length of one frame, then multiply by the number of frames. At 60 frames per second, one frame is 1000 ÷ 60 ≈ 16.7 milliseconds. So 6 frames is about 100 milliseconds, and 60 frames is exactly one second.",
    },
    {
      type: "table",
      caption: "Common frame counts at 60 frames per second.",
      headers: ["Frames", "Milliseconds", "Roughly"],
      rows: [
        ["1", "17", "The shortest possible moment"],
        ["3", "50", "A very fast punch"],
        ["6", "100", "A blink of an eye"],
        ["12", "200", "A typical human reaction to something seen on screen"],
        ["60", "1,000", "One second"],
      ],
    },
    { type: "h", text: "The three phases of an attack" },
    {
      type: "p",
      text: "Every attack in a game can be split into three phases that happen in order. Together, the number of frames in each phase is called the attack's **frame data**.",
    },
    {
      type: "ol",
      items: [
        "**Startup.** The windup. The player has pressed the button, but the attack cannot hit anything yet. An alert opponent can react during this time.",
        "**Active.** The frames during which the attack can actually hit. In code, the attack has an invisible shape called a **hitbox**, and the hitbox only exists during these frames. ([Chapter 4](/learn/combat/) explains hitboxes in detail.)",
        "**Recovery.** The cool-down. The attack is over, but the character cannot act yet. If the attack missed, the opponent can use this time to strike back.",
      ],
    },
    {
      type: "term",
      term: "Startup",
      text: "The windup frames after the button is pressed and before the attack's hitbox exists. The player is committed, but the attack cannot hit yet.",
    },
    {
      type: "term",
      term: "Active frames",
      text: "The frames during which an attack's hitbox is alive and can deal damage. Any leftover active frames after a hit still keep the attacker busy.",
    },
    {
      type: "term",
      term: "Recovery",
      text: "The cool-down frames after the active phase ends, during which the character cannot act or block. Missing an attack leaves the character exposed throughout recovery.",
    },
    {
      type: "frames",
      caption: "A quick jab, shown frame by frame.",
      startup: 3,
      active: 1,
      recovery: 7,
      note: "This jab takes 3 frames of startup, is active for 1 frame, and needs 7 frames to recover. That is 11 frames in total, or about 183 milliseconds at 60 frames per second.",
    },
    {
      type: "p",
      text: "Notice that the active phase is often the shortest. Most of an attack's time is spent winding up and recovering. This is deliberate. Startup and recovery are the cost of using the attack. A powerful attack usually has a longer startup or recovery, which gives the opponent a chance to respond.",
    },
    {
      type: "term",
      term: "Frame data",
      text: "The number of frames in each phase of an attack: startup, active, and recovery. Frame data also usually includes how long the attack stuns the opponent.",
    },
    { type: "h", text: "Stun: what happens to the defender" },
    {
      type: "p",
      text: "When an attack connects, the character who was struck (the defender) is frozen in place for a few frames and cannot act. This is called stun. There are two kinds.",
    },
    {
      type: "ul",
      items: [
        "**Hitstun** is how long the defender is stuck after being hit cleanly. Hitstun is what makes combos possible: if the attacker can strike again before hitstun ends, the defender cannot escape.",
        "**Blockstun** is how long the defender is stuck after blocking the attack. Blockstun is usually shorter than hitstun, because blocking should be rewarded.",
      ],
    },
    {
      type: "term",
      term: "Hitstun",
      text: "How many frames a character is frozen and unable to act after being struck cleanly by an attack.",
    },
    {
      type: "term",
      term: "Blockstun",
      text: "How many frames a character is frozen after successfully blocking an attack. Usually shorter than hitstun.",
    },
    { type: "h", text: "Frame advantage: who moves first" },
    {
      type: "p",
      text: "After an attack connects, both characters are busy for a while. The defender is stuck in stun, and the attacker is finishing the attack. Whoever becomes free first gets to act first. **Frame advantage** is the number that tells you who that will be, and by how many frames.",
    },
    {
      type: "term",
      term: "Frame advantage",
      text: "The difference between how long the defender is stunned and how long the attacker is still busy. A positive number means the attacker can act first. A negative number means the defender can act first. Zero means both can act at the same time.",
    },
    {
      type: "p",
      text: "To calculate it, you need to know how long the attacker is still busy after the hit lands. If the attack hits on its first active frame, the attacker still has to finish any remaining active frames and then all of the recovery frames. The formula has two steps:",
    },
    {
      type: "ol",
      items: [
        "Attacker's busy time = (active frames − 1) + recovery frames",
        "Frame advantage = defender's stun − attacker's busy time",
      ],
    },
    {
      type: "p",
      text: "Here is a worked example using the jab from earlier. It has 1 active frame, 7 recovery frames, and causes 8 frames of blockstun. The attacker's busy time is (1 − 1) + 7 = 7 frames. The defender is stuck for 8 frames. So the frame advantage is 8 − 7 = +1. After the jab is blocked, the attacker can act one frame before the defender.",
    },
    {
      type: "table",
      caption: "Frame advantage when each attack is blocked on its first active frame.",
      headers: ["Attack", "Active", "Recovery", "Blockstun", "Attacker busy", "Advantage"],
      rows: [
        ["Jab", "1", "7", "8", "7", "+1"],
        ["Body blow", "2", "12", "14", "13", "+1"],
        ["Sweep", "3", "16", "10", "18", "−8"],
        ["Fireball", "1", "20", "8", "20", "−12"],
      ],
    },
    {
      type: "p",
      text: "These numbers describe how each attack should be used. The jab is safe: even when blocked, the attacker gets to move first. The sweep is risky: if it is blocked, the defender gets an 8-frame head start, which is enough time to land a counterattack. The fireball can hit from across the screen, and the price for that long range is being far behind if the opponent blocks it up close.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "Common mistake",
      text: "Many people calculate frame advantage as just stun minus recovery. That only works when the attack has a single active frame. If an attack has several active frames, the leftover active frames also keep the attacker busy. Forgetting them makes an attack look safer than it really is. In the table above, the sweep would look like −6 instead of the correct −8.",
    },
    {
      type: "p",
      text: "You can try these calculations yourself on the [Practice Tools](/tools/) page.",
    },
    {
      type: "example",
      title: "Example: Street Fighter",
      text: "In Street Fighter, Ryu has a standing light jab for close-range defense and a Hadoken (fireball) for controlling distance. The jab starts up in just 3 or 4 frames, while the fireball takes much longer to throw. If both started at the same speed, the fireball would simply be a better jab, because it would protect Ryu up close while also reaching across the entire screen. Startup is part of an attack's price.",
    },
    { type: "h", text: "Hitting late in the active window" },
    {
      type: "p",
      text: "The formula above assumes the attack hits on its first active frame. Sometimes an attack hits on a later active frame instead, for example when the opponent walks into an attack that is already active. When that happens, some active frames have already passed, so the attacker has less busy time left. That makes the attack safer. Fighting game players call this a **meaty** hit.",
    },
    {
      type: "term",
      term: "Meaty",
      text: "An attack that connects on one of its later active frames. Because part of the attack is already over, the attacker recovers sooner and has better frame advantage.",
    },
    {
      type: "p",
      text: "For example, the sweep has 3 active frames. If it hits on the first one, the attacker is busy for (3 − 1) + 16 = 18 frames, giving −8. If it hits on the third and last active frame, the attacker is busy for only 16 frames, giving 10 − 16 = −6. The attack is still unsafe, but less so.",
    },
    { type: "h", text: "Missing an attack" },
    {
      type: "p",
      text: "When an attack misses entirely, the defender is not stunned at all. The attacker, however, still has to sit through the full recovery. This is often called a **whiff**. A defender who strikes during that recovery is performing a **whiff punish**.",
    },
    {
      type: "p",
      text: "Long recovery is fair when players can clearly see how far an attack reaches, because missing is then the attacker's own mistake. Long recovery on an attack whose reach is hard to judge feels unfair, because players cannot tell whether they made a mistake.",
    },
    { type: "h", text: "Invulnerability frames: dodging through danger" },
    {
      type: "p",
      text: "In many games, characters have actions that let them pass through attacks unharmed. When a character rolls, dashes, or stands up after being knocked down, the game often disables their hurtbox for a few frames. These are called **invulnerability frames**, or **i-frames**.",
    },
    {
      type: "term",
      term: "Invulnerability frames (i-frames)",
      text: "Frames during which a character cannot be hit by attacks, commonly used during dodge rolls or immediately after taking damage so the player cannot be hit multiple times in a single second.",
    },
    {
      type: "p",
      text: "I-frames turn a dodge into an active counter-measure: instead of running away from an attack, a skilled player can roll right through it. They also prevent unfair situations, such as being hit repeatedly by the same enemy before getting a chance to stand up.",
    },
    { type: "h", text: "Hit-stop: a pause that adds weight" },
    {
      type: "p",
      text: "When a strong hit lands in many action games, both characters freeze for a split second. This short pause is called **hit-stop** (also called hit pause). Our brains interpret the pause as resistance, as if two solid objects collided. Without hit-stop, attacks can feel like they pass through their target.",
    },
    {
      type: "term",
      term: "Hit-stop",
      text: "A brief freeze on both characters when a hit lands. It makes the hit feel heavy and solid. Light hits use a short freeze, and heavy hits use a longer one.",
    },
    {
      type: "p",
      text: "Hit-stop needs to be short. If the freeze lasts long enough that players think the game has stuttered, it stops feeling like weight and starts feeling like lag. A third of a second is already a long freeze. Follow these guidelines when adding hit-stop:",
    },
    {
      type: "ul",
      items: [
        "Freeze the characters and their animations completely. If the characters keep sliding, the impact will not read clearly.",
        "Let sparks, flashes, and usually the sound keep playing. If everything stops, the freeze looks like the game froze.",
        "Freeze both characters for the same length of time. If only the defender freezes, the attacker gains extra frame advantage without anyone noticing.",
        "Keep accepting button presses during the freeze. The player's hands do not stop moving just because the screen did. ([Chapter 3](/learn/forgiveness/) explains how.)",
      ],
    },
    {
      type: "example",
      title: "Example: Super Smash Bros.",
      text: "In Super Smash Bros., landing a powerful smash attack triggers an unmistakable hit-stop pause. Both characters freeze in place for roughly 10 to 14 frames while impact sparks flare and sound effects boom. The freeze sells the sheer physical weight of the impact. However, no amount of hit-stop can fix an attack whose startup is sluggish. Startup and hit-stop solve different feel problems.",
    },
  ],
  recap: [
    "Games update in steps called frames. At 60 frames per second, one frame lasts about 16.7 milliseconds.",
    "Every attack has three phases: startup (windup), active (can hit), and recovery (cool-down).",
    "Hitstun and blockstun are how long the defender is stuck after being hit or after blocking.",
    "Frame advantage = defender's stun − attacker's remaining busy time. Positive means the attacker acts first.",
    "When an attack has several active frames, the leftover active frames count as busy time too.",
    "Invulnerability frames (i-frames) temporarily disable damage detection during dodges or recoveries.",
    "Hit-stop is a short freeze that makes a hit feel heavy. Freezing both characters equally keeps frame advantage unchanged.",
  ],
  quiz: [
    {
      id: "frames-1",
      review: "the-three-phases-of-an-attack",
      prompt: "In what order do the three phases of an attack happen?",
      choices: [
        { id: "a", text: "Active, then startup, then recovery." },
        { id: "b", text: "Recovery, then active, then startup." },
        { id: "c", text: "Startup, then active, then recovery." },
        { id: "d", text: "Hit-stop, then startup, then recovery." },
      ],
      answer: "c",
      why: "Startup is the windup before the attack can hit. Active is when it can hit. Recovery is the cool-down afterward.",
    },
    {
      id: "frames-2",
      review: "frame-advantage-who-moves-first",
      prompt: "A jab is active for 1 frame, recovers for 7 frames, and causes 8 frames of blockstun. It is blocked on its only active frame. What is the attacker's frame advantage?",
      choices: [
        { id: "a", text: "−1" },
        { id: "b", text: "+1" },
        { id: "c", text: "+8" },
        { id: "d", text: "+15" },
      ],
      answer: "b",
      why: "The attacker's busy time is (1 − 1) + 7 = 7 frames. The defender is stuck for 8 frames. 8 − 7 = +1, so the attacker acts one frame first.",
    },
    {
      id: "frames-3",
      review: "frame-advantage-who-moves-first",
      prompt: "A sweep is active for 3 frames and recovers for 16. Blockstun is 10. It is blocked on its first active frame. What is the frame advantage?",
      choices: [
        { id: "a", text: "+6, because 16 − 10 = 6." },
        { id: "b", text: "−6, because 10 − 16 = −6." },
        { id: "c", text: "−8, because the attacker is busy for (3 − 1) + 16 = 18 frames, and 10 − 18 = −8." },
        { id: "d", text: "0, because active frames never matter." },
      ],
      answer: "c",
      why: "The two remaining active frames still keep the attacker busy. Ignoring them would make the sweep look two frames safer than it really is.",
    },
    {
      id: "frames-4",
      review: "hitting-late-in-the-active-window",
      prompt: "The same sweep connects on its last active frame instead of its first. What happens to the frame advantage?",
      choices: [
        { id: "a", text: "It improves for the attacker, because part of the attack is already over." },
        { id: "b", text: "It gets worse, because late hits add recovery." },
        { id: "c", text: "It can no longer be calculated." },
        { id: "d", text: "The blockstun is ignored." },
      ],
      answer: "a",
      why: "This is a meaty hit. Hitting on the last active frame leaves only the 16 recovery frames, so the advantage is 10 − 16 = −6 instead of −8.",
    },
    {
      id: "frames-5",
      review: "hit-stop-a-pause-that-adds-weight",
      prompt: "Which way of adding hit-stop will make hits feel heavy?",
      choices: [
        { id: "a", text: "Briefly freeze both characters, let the sparks keep moving, and keep accepting button presses during the freeze." },
        { id: "b", text: "Freeze the entire game, including menus and effects, for a full second." },
        { id: "c", text: "Keep the attack animation moving during the pause so the attack stays fast." },
        { id: "d", text: "Ignore any button presses made during the freeze." },
      ],
      answer: "a",
      why: "The characters must hold still for the impact to read. Effects should keep moving so the pause does not look like a glitch. Button presses during the pause should still count.",
    },
    {
      id: "frames-6",
      review: "frame-advantage-who-moves-first",
      prompt: "In a fighting game like Street Fighter, why does a close-range jab have a much shorter startup than a ranged fireball?",
      choices: [
        { id: "a", text: "So the jab is the best answer up close, while the fireball trades speed for reach across the screen." },
        { id: "b", text: "So the fireball can be safe up close with no downside." },
        { id: "c", text: "Because startup is another name for hitstun." },
        { id: "d", text: "Because a short startup makes enemies notice you from farther away." },
      ],
      answer: "a",
      why: "Startup is part of an attack's cost. If the long-range attack starts as quickly as the short-range one, the short-range attack has no reason to exist.",
    },
  ],
};
