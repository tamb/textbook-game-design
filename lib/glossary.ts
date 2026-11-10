import type { Term } from "./types";

export const glossary: Term[] = [
  {
    id: "game-feel",
    name: "Game feel",
    module: "feel",
    anchor: "what-is-game-feel",
    short: "The sensation of controlling something in a game moment to moment.",
    detail:
      "Steve Swink defines it as real-time control of virtual objects in a simulated space, emphasized by polish. Players experience these parts as one sensation, but designers separate them to find the cause of a problem.",
  },
  {
    id: "real-time-control",
    name: "Real-time control",
    module: "feel",
    anchor: "the-three-parts-of-game-feel",
    short: "Continuous control in which the game responds immediately to the player.",
    detail:
      "The player decides, presses a button, sees the result, and adjusts, many times per second. If the game's response is late, the whole experience feels late.",
  },
  {
    id: "simulated-space",
    name: "Simulated space",
    module: "feel",
    anchor: "the-three-parts-of-game-feel",
    short: "The surroundings that give movement a sense of scale.",
    detail:
      "Floors, walls, nearby objects, and scrolling backgrounds tell the player how fast they are moving. On an empty screen, even a fast character does not feel fast.",
  },
  {
    id: "polish",
    name: "Polish",
    module: "feel",
    anchor: "the-three-parts-of-game-feel",
    short: "Visual and audio effects that make actions feel more forceful.",
    detail:
      "Examples include particles, camera shake, squash-and-stretch animation, and impact sounds. Polish can change what an object seems to be made of, but it cannot make a slow action faster.",
  },
  {
    id: "juice",
    name: "Juice",
    module: "feel",
    anchor: "polish-and-juice",
    short: "Exaggerated, immediate feedback on an action.",
    detail:
      "Popularized by the 2012 talk “Juice It or Lose It” by Martin Jonasson and Petri Purho. Screen shake, flashes, and hit-stop are common examples. Juice improves a game that already responds well but cannot fix slow controls.",
  },
  {
    id: "metaphor",
    name: "Metaphor",
    module: "feel",
    anchor: "metaphor-what-players-expect",
    short: "The real-world thing a character or action represents, which shapes what players expect.",
    detail:
      "Players expect a car, a runner, and a fist to behave differently. Changing how something looks can change how it feels, even when the code stays the same.",
  },
  {
    id: "snappiness",
    name: "Snappiness",
    module: "feel",
    anchor: "snappiness-and-weight",
    short: "The feeling that an action responds instantly.",
    detail:
      "An action feels snappy when it starts quickly and its feedback appears at the exact moment of impact. Heavy actions can take longer to start, as long as the windup is clearly visible.",
  },
  {
    id: "frame",
    name: "Frame",
    module: "frames",
    anchor: "frames-the-unit-of-game-time",
    short: "One update of the game.",
    detail:
      "Most games aim for 60 frames per second, so one frame lasts about 16.7 milliseconds. Six frames is about 100 milliseconds, and 60 frames is one second.",
  },
  {
    id: "frame-data",
    name: "Frame data",
    module: "frames",
    anchor: "the-three-phases-of-an-attack",
    short: "The number of frames in each phase of an attack.",
    detail:
      "Frame data lists an attack's startup, active, and recovery frames, and usually how long it stuns the opponent. It applies to any game with timed attacks, not just fighting games.",
  },
  {
    id: "startup",
    name: "Startup",
    module: "frames",
    anchor: "the-three-phases-of-an-attack",
    short: "The windup frames before an attack can hit.",
    detail:
      "Startup begins when the button is pressed and ends when the hitbox appears. Attacks meant for close range need a short startup. Long-range attacks can have a longer one, because their range is part of what the player is paying for.",
  },
  {
    id: "active-frames",
    name: "Active frames",
    module: "frames",
    anchor: "the-three-phases-of-an-attack",
    short: "The frames during which an attack can hit.",
    detail:
      "The attack's hitbox exists only during these frames. Overlaps before or after them do not count. If an attack has several active frames, the ones left after a hit still keep the attacker busy.",
  },
  {
    id: "recovery",
    name: "Recovery",
    module: "frames",
    anchor: "the-three-phases-of-an-attack",
    short: "The cool-down frames after an attack, before the character can act again.",
    detail:
      "If the attack misses, the opponent can strike during recovery. Cancels let the player skip part of the recovery by going directly into another action.",
  },
  {
    id: "hitstun",
    name: "Hitstun",
    module: "frames",
    anchor: "stun-what-happens-to-the-defender",
    short: "How long a character cannot act after being hit.",
    detail:
      "Hitstun is what makes combos possible. If the attacker can hit again before hitstun ends, the defender cannot escape.",
  },
  {
    id: "blockstun",
    name: "Blockstun",
    module: "frames",
    anchor: "stun-what-happens-to-the-defender",
    short: "How long a character cannot act after blocking an attack.",
    detail:
      "Blockstun is usually shorter than hitstun, so that blocking is rewarded. It is used to calculate an attack's frame advantage when blocked.",
  },
  {
    id: "frame-advantage",
    name: "Frame advantage",
    module: "frames",
    anchor: "frame-advantage-who-moves-first",
    short: "How many frames sooner one character can act than the other after a hit.",
    detail:
      "Frame advantage = defender's stun − attacker's remaining busy time. For a hit on the first active frame, busy time is (active − 1) + recovery. A positive number means the attacker acts first, and a negative number means the defender does.",
  },
  {
    id: "meaty",
    name: "Meaty",
    module: "frames",
    anchor: "hitting-late-in-the-active-window",
    short: "An attack that connects on one of its later active frames.",
    detail:
      "Because part of the attack has already passed, the attacker recovers sooner, which improves frame advantage.",
  },
  {
    id: "i-frames",
    name: "Invulnerability frames (i-frames)",
    module: "frames",
    anchor: "invulnerability-frames-dodging-through-danger",
    short: "Frames during which a character cannot be hit by attacks.",
    detail:
      "Commonly used during dodge rolls or immediately after taking damage. Disabling the hurtbox for a few frames lets skilled players pass through attacks and prevents them from being hit multiple times in a single second.",
  },
  {
    id: "hit-stop",
    name: "Hit-stop",
    module: "frames",
    anchor: "hit-stop-a-pause-that-adds-weight",
    short: "A brief freeze when a hit lands, which makes the hit feel heavy.",
    detail:
      "Also called hit pause. Freeze both characters for the same length of time, let effects keep moving, and keep accepting button presses during the freeze. If only the defender freezes, the attacker gains frame advantage.",
  },
  {
    id: "forgiveness-window",
    name: "Forgiveness window",
    module: "forgiveness",
    anchor: "why-games-need-to-forgive",
    short: "A short grace period that accepts inputs that are slightly early or late.",
    detail:
      "People react to what they see in about 200 milliseconds, which is slower than a game's frames. Forgiveness windows such as coyote time and input buffering make the game respond to what the player meant to do.",
  },
  {
    id: "coyote-time",
    name: "Coyote time",
    module: "forgiveness",
    anchor: "coyote-time",
    short: "A short period after leaving a ledge during which the player can still jump.",
    detail:
      "Named after the cartoon coyote who hangs in the air after running off a cliff. It forgives pressing jump slightly too late. About 80 to 120 milliseconds is a common starting length.",
  },
  {
    id: "input-buffering",
    name: "Input buffering",
    module: "forgiveness",
    anchor: "input-buffering",
    short: "Remembering an early button press and performing the action as soon as it is allowed.",
    detail:
      "For example, a jump pressed just before landing happens on the frame the character lands. It forgives pressing a button slightly too early. Without buffering, games feel unresponsive.",
  },
  {
    id: "variable-jump",
    name: "Variable jump height",
    module: "forgiveness",
    anchor: "two-more-helpers-variable-jump-height-and-corner-correction",
    short: "A jump that goes higher the longer the button is held.",
    detail:
      "Releasing the button while rising reduces the character's upward speed. This lets one button produce both small hops and full jumps.",
  },
  {
    id: "corner-correction",
    name: "Corner correction",
    module: "forgiveness",
    anchor: "two-more-helpers-variable-jump-height-and-corner-correction",
    short: "Nudging a character past an edge it would otherwise clip by a few pixels.",
    detail:
      "If a jump would bump the corner of a platform by a tiny amount, the game slides the character so it lands cleanly. The nudge must stay small enough that players do not notice it.",
  },
  {
    id: "hitbox",
    name: "Hitbox",
    module: "combat",
    anchor: "hitboxes-hurtboxes-and-pushboxes",
    short: "The invisible shape of an attack that can cause damage.",
    detail:
      "A hitbox only exists during an attack's active frames, and it does not have to match the drawing exactly. A hit happens when a hitbox overlaps a hurtbox.",
  },
  {
    id: "hurtbox",
    name: "Hurtbox",
    module: "combat",
    anchor: "hitboxes-hurtboxes-and-pushboxes",
    short: "The invisible shape of a character or object that can receive damage.",
    detail:
      "A hurtbox should change with the character's pose. For example, a crouching character should have a smaller hurtbox than a standing one.",
  },
  {
    id: "pushbox",
    name: "Pushbox",
    module: "combat",
    anchor: "hitboxes-hurtboxes-and-pushboxes",
    short: "The solid invisible box around a character's body that prevents other characters from walking into the exact same space.",
    detail:
      "While hitboxes and hurtboxes decide when an attack deals damage, the pushbox is what keeps two characters standing next to each other rather than walking straight through each other.",
  },
  {
    id: "reach",
    name: "Reach",
    module: "combat",
    anchor: "reach-and-attack-arcs",
    short: "How far an attack's hitbox extends from the attacker.",
    detail:
      "Reach is separate from timing and angle. An attack can reach far but still be hard to use if its hitbox only appears briefly at the end of a long windup.",
  },
  {
    id: "attack-arc",
    name: "Attack arc",
    module: "combat",
    anchor: "reach-and-attack-arcs",
    short: "The path an attack's hitbox travels, including its angle.",
    detail:
      "A wide horizontal swing might catch an enemy who is backing away but miss one who is crouching. Problems with angle need different fixes than problems with distance.",
  },
  {
    id: "cancel",
    name: "Cancel",
    module: "combat",
    anchor: "cancels-ending-an-attack-early",
    short: "Ending an attack early by going straight into another action.",
    detail:
      "Cancels are only allowed during windows the designer chooses, such as when an attack hits or is blocked. They let actions chain together, and they can make risky attacks safer.",
  },
  {
    id: "combo-scaling",
    name: "Combo scaling",
    module: "combat",
    anchor: "combo-scaling",
    short: "Reducing the damage of each later hit in a combo.",
    detail:
      "Also called proration. It keeps the first hit of a combo important and prevents the longest possible combo from being the only good strategy.",
  },
  {
    id: "crowd-control",
    name: "Crowd control",
    module: "combat",
    anchor: "crowd-control",
    short: "Effects that control where a group of enemies can move or when they can act.",
    detail:
      "Examples include knockback, stuns, and attacks that block a path. Crowd control attacks may deal damage, but their main purpose is managing enemy positions.",
  },
  {
    id: "aggro-radius",
    name: "Aggro radius",
    module: "combat",
    anchor: "when-enemies-notice-you-aggro-radius-and-leash",
    short: "The distance at which an enemy notices the player and decides to engage.",
    detail:
      "“Aggro” is short for aggression. Games often use a wider distance for noticing the player and a closer one for attacking. It is usually paired with a leash.",
  },
  {
    id: "leash",
    name: "Leash",
    module: "combat",
    anchor: "when-enemies-notice-you-aggro-radius-and-leash",
    short: "The distance or time after which an enemy stops chasing the player.",
    detail:
      "Without a leash, an enemy that notices the player once will follow them forever. With one, players can choose to escape a fight.",
  },
  {
    id: "level-of-detail",
    name: "Level of detail (LOD)",
    module: "combat",
    anchor: "when-enemies-notice-you-aggro-radius-and-leash",
    short: "A graphics technique that draws simpler versions of objects when they are far away.",
    detail:
      "LOD is a rendering term, not an enemy behavior term. Avoid using it to name settings such as the aggro radius, because it will confuse other programmers.",
  },
  {
    id: "aabb",
    name: "AABB (axis-aligned bounding box)",
    module: "physics",
    anchor: "collision-shapes-the-axis-aligned-bounding-box",
    short: "A rectangle whose edges always stay horizontal and vertical.",
    detail:
      "Two AABBs overlap if they overlap both horizontally and vertically. This check is very fast. AABBs cannot rotate, so diagonal shapes need a different approach.",
  },
  {
    id: "variable-timestep",
    name: "Variable timestep",
    module: "physics",
    anchor: "the-games-clock-variable-and-fixed-timesteps",
    short: "Moving the game forward by however long the last frame took.",
    detail:
      "This ties the game's rules to the player's hardware. Jumps can reach different heights on different monitors, and fast objects can pass through thin walls during a slow frame.",
  },
  {
    id: "fixed-timestep",
    name: "Fixed timestep",
    module: "physics",
    anchor: "the-games-clock-variable-and-fixed-timesteps",
    short: "Moving the game forward in equal steps, regardless of the monitor's refresh rate.",
    detail:
      "A common step is 1/60 of a second. The picture can blend between steps (interpolation) to look smooth. Limit catch-up steps per frame to avoid the spiral of death.",
  },
  {
    id: "delta-time",
    name: "Delta time (dt)",
    module: "physics",
    anchor: "the-games-clock-variable-and-fixed-timesteps",
    short: "The amount of real time that passed since the last frame.",
    detail:
      "Multiplying movement speeds by delta time (such as position += speed * dt) keeps movement steady across different frame rates. However, physics formulas and collision checks still require a fixed timestep.",
  },
  {
    id: "tilemap",
    name: "Tilemap",
    module: "physics",
    anchor: "where-level-collision-comes-from",
    short: "A level built from a grid of hand-made squares.",
    detail:
      "Tilemaps make ledges and jumps easy to control. They become awkward when the level is not naturally shaped like a grid.",
  },
  {
    id: "procedural-geometry",
    name: "Procedural geometry",
    module: "physics",
    anchor: "where-level-collision-comes-from",
    short: "Level shapes created by a program following a set of rules.",
    detail:
      "Each level can be different. The designer must make sure the generator never produces impossible jumps or unfair situations.",
  },
  {
    id: "extracted-geometry",
    name: "Extracted geometry",
    module: "physics",
    anchor: "where-level-collision-comes-from",
    short: "Collision shapes taken from content that already exists for another purpose.",
    detail:
      "Collision shapes derived from content made for another purpose, such as turning imported architectural blueprints or terrain heightmaps directly into level platforms. Because ledges were not hand-crafted for jumping, forgiveness features are vital.",
  },
  {
    id: "checkpoint",
    name: "Checkpoint",
    module: "physics",
    anchor: "checkpoints-and-save-states",
    short: "A point the player can return to, where the designer chooses what is restored.",
    detail:
      "A checkpoint might restore only the player's position, or the position plus completed goals. Deciding what it restores is a design choice.",
  },
  {
    id: "save-state",
    name: "Save state",
    module: "physics",
    anchor: "checkpoints-and-save-states",
    short: "A complete snapshot of everything in the game at one moment.",
    detail:
      "It includes positions, speeds, timers, and stored button presses. It is ideal for pausing and resuming, but poor for retrying, because it also restores the player's mistakes.",
  },
  {
    id: "core-loop",
    name: "Core loop",
    module: "structure",
    anchor: "the-core-loop",
    short: "The smallest cycle of actions the player repeats throughout the game.",
    detail:
      "In Tetris, the core loop is: a piece appears, you orient it, drop it, and clear lines. In Super Mario Bros., it is: run right, jump over hazards, and reach the flagpole. Features that never affect this cycle are extras, not part of the main activity.",
  },
  {
    id: "meta-loop",
    name: "Meta loop",
    module: "structure",
    anchor: "the-meta-loop",
    short: "A larger cycle around the core loop that gives it direction.",
    detail:
      "Examples include building up knowledge of a route, unlocking areas, or improving a record within a session. The retention loop is a related idea that spans multiple sessions.",
  },
  {
    id: "verb",
    name: "Verb",
    module: "structure",
    anchor: "verbs-the-actions-a-player-can-take",
    short: "An action the player can take, such as jump or attack.",
    detail:
      "Verbs are interesting when each one is the best choice in different situations. Two verbs that always lead to the same decision are effectively one verb.",
  },
  {
    id: "mda",
    name: "MDA framework",
    module: "structure",
    anchor: "the-mda-framework",
    short: "A way of describing games in three layers: mechanics, dynamics, and aesthetics.",
    detail:
      "Published by Hunicke, LeBlanc, and Zubek in 2004. Mechanics are the rules, dynamics are the behavior that emerges from play, and aesthetics are the emotions the player feels. Designers work from the emotions down, while players experience the emotions first.",
  },
  {
    id: "dynamics",
    name: "Dynamics",
    module: "structure",
    anchor: "the-mda-framework",
    short: "The patterns of behavior that emerge when players interact with the rules.",
    detail:
      "Examples include strategies players discover, favorite routes, and shortcuts. Designers cannot write dynamics directly; they create rules and observe what happens in playtesting.",
  },
  {
    id: "aesthetics-mda",
    name: "Aesthetics (in MDA)",
    module: "structure",
    anchor: "the-mda-framework",
    short: "The emotions a game aims to create in the player.",
    detail:
      "Marc LeBlanc listed eight: sensation, fantasy, narrative, challenge, fellowship, discovery, expression, and submission. Most games focus on two or three. This is different from the meaning of aesthetics in Schell's elemental tetrad.",
  },
  {
    id: "elemental-tetrad",
    name: "Elemental tetrad",
    module: "structure",
    anchor: "two-meanings-of-aesthetics",
    short: "Jesse Schell's division of a game into mechanics, aesthetics, story, and technology.",
    detail:
      "In this framework, aesthetics means the look, sound, and presentation of the game. When someone uses the word aesthetics, ask whether they mean this or the MDA meaning.",
  },
  {
    id: "difficulty-curve",
    name: "Difficulty curve",
    module: "structure",
    anchor: "difficulty-curves",
    short: "The way a game's challenge changes over time.",
    detail:
      "A ramp is a gradual increase, a spike is a sudden jump the player was not prepared for, and a valley is a deliberate easier section. Difficulty can come from unfamiliar content, not only from tougher enemies.",
  },
  {
    id: "skill-floor",
    name: "Skill floor",
    module: "structure",
    anchor: "skill-floor-skill-ceiling-and-skill-expression",
    short: "How much ability a new player needs before the game becomes playable.",
    detail:
      "Forgiveness features and clear signifiers lower the floor. Removing every decision also lowers the floor, but it lowers the ceiling too.",
  },
  {
    id: "skill-ceiling",
    name: "Skill ceiling",
    module: "structure",
    anchor: "skill-floor-skill-ceiling-and-skill-expression",
    short: "How much room there is for players to keep improving.",
    detail:
      "A high ceiling means expert players can still get better results through planning, timing, and clever use of the verbs.",
  },
  {
    id: "skill-expression",
    name: "Skill expression",
    module: "structure",
    anchor: "skill-floor-skill-ceiling-and-skill-expression",
    short: "A moment where a better decision or better execution produces a better result.",
    detail:
      "Choosing a risky route because you recognize a shortcut is skill expression. A level with only one obvious path offers none, because there is no decision to make.",
  },
  {
    id: "failure-state",
    name: "Failure state",
    module: "structure",
    anchor: "failure-states-and-failing-forward",
    short: "A point where the player's attempt ends and something is lost.",
    detail:
      "Losing a fight or restarting a level are examples. Failure states give risk a real cost. They can be combined with fail-forward, so the player loses one thing but keeps another.",
  },
  {
    id: "fail-forward",
    name: "Fail-forward",
    module: "structure",
    anchor: "failure-states-and-failing-forward",
    short: "A design where failing still moves the player ahead in some way.",
    detail:
      "The player might keep what they learned or continue the story after failing. This is common in games about discovery, where knowledge is the real reward.",
  },
  {
    id: "risk-reward",
    name: "Risk and reward",
    module: "structure",
    anchor: "risk-and-reward",
    short: "A choice where each option has its own advantage and its own cost.",
    detail:
      "If one option is better in every way, the other becomes pointless and there is no real choice. In Dark Souls, drinking an Estus flask mid-fight risks taking a blow during the drinking animation in exchange for restored health.",
  },
  {
    id: "positive-feedback",
    name: "Positive feedback loop",
    module: "structure",
    anchor: "feedback-loops-snowballing-and-rubber-banding",
    short: "A system where success leads to even more success (snowballing).",
    detail:
      "Winning gives more resources or power, making future wins easier. Positive feedback loops drive a game toward a decisive finish, but can make trailing players feel that victory is out of reach.",
  },
  {
    id: "negative-feedback",
    name: "Negative feedback loop",
    module: "structure",
    anchor: "feedback-loops-snowballing-and-rubber-banding",
    short: "A system that stabilizes the game by helping trailing players or hindering the leader (rubber-banding).",
    detail:
      "In Mario Kart, trailing racers receive stronger items like the blue shell. Negative feedback loops keep games close and dramatic, but can feel unfair to a skilled leader if overdone.",
  },
  {
    id: "affordance",
    name: "Affordance",
    module: "teaching",
    anchor: "affordances-and-signifiers",
    short: "An action that is possible because of the relationship between a player and an object.",
    detail:
      "A pipe the player can enter affords entry. The term comes from psychologist James J. Gibson and was brought into design by Don Norman. It is often confused with signifier.",
  },
  {
    id: "signifier",
    name: "Signifier",
    module: "teaching",
    anchor: "affordances-and-signifiers",
    short: "A visible or audible clue that tells the player an action is possible.",
    detail:
      "A glow, a shape, a movement, or a sound can all be signifiers. Without a signifier, new players will act as if the action does not exist.",
  },
  {
    id: "signposting",
    name: "Signposting",
    module: "teaching",
    anchor: "signposting",
    short: "Using the level itself to guide the player toward the next useful action.",
    detail:
      "The player still makes the decision and performs the action. Telling the player the answer directly is not signposting. Signposts can be reduced over time to increase difficulty.",
  },
  {
    id: "metroidvania",
    name: "Metroidvania",
    module: "teaching",
    anchor: "knowledge-as-a-key",
    short: "A type of game in which new areas open up as the player gains new abilities or items.",
    detail:
      "Named after the Metroid and Castlevania series. The ability acts as a key and the blocked area acts as a lock.",
  },
  {
    id: "knowledge-gate",
    name: "Knowledge gate",
    module: "teaching",
    anchor: "knowledge-as-a-key",
    short: "A part of the game the player can only get past once they understand something.",
    detail:
      "Like a metroidvania lock, except the key is knowledge rather than an item. The game Outer Wilds is built almost entirely around knowledge gates.",
  },
  {
    id: "sandbox",
    name: "Sandbox play",
    module: "teaching",
    anchor: "sandbox-and-objective-play",
    short: "Play with no required goal.",
    detail:
      "The player chooses what to do with the available actions. Success means staying interested and exploring. It has a different core loop from objective play, even when the actions are the same.",
  },
  {
    id: "objective-play",
    name: "Objective play",
    module: "teaching",
    anchor: "sandbox-and-objective-play",
    short: "Play aimed at a specific goal.",
    detail:
      "Examples include reaching a page in six steps or surviving for a set time. Offer it as a separate mode from sandbox play, with its own difficulty and failure rules.",
  },
  {
    id: "session-length",
    name: "Session length",
    module: "sessions",
    anchor: "session-length",
    short: "The amount of time a single sitting of play is designed to last.",
    detail:
      "Decide it early. A meaningful attempt, including time spent failing, should fit inside the intended session.",
  },
  {
    id: "retention-loop",
    name: "Retention loop",
    module: "sessions",
    anchor: "retention-loops-a-reason-to-return",
    short: "The design elements that give players a reason to return on another day.",
    detail:
      "Examples include a record to beat, a new shortcut to try, or a fresh daily challenge. A healthy retention loop invites players back without punishing them for being away.",
  },
  {
    id: "skinner-box",
    name: "Skinner box",
    module: "sessions",
    anchor: "the-skinner-box",
    short: "A setup in which behavior is kept going by delivering rewards on a schedule.",
    detail:
      "Named after psychologist B. F. Skinner. In games, the term describes features built mainly to keep players repeating an action for the next reward. This book explains it so you can recognize and avoid it.",
  },
  {
    id: "variable-ratio",
    name: "Variable-ratio schedule",
    module: "sessions",
    anchor: "the-skinner-box",
    short: "A reward schedule in which rewards come after an unpredictable number of actions.",
    detail:
      "Because any action might be rewarded, people keep repeating it. Slot machines use this schedule. A designed surprise is different, because it is still enjoyable once players understand it.",
  },
  {
    id: "fomo",
    name: "FOMO (fear of missing out)",
    module: "sessions",
    anchor: "fear-of-missing-out",
    short: "Using the threat of permanent loss to pressure players into showing up.",
    detail:
      "A daily challenge becomes a FOMO trap when missing a day permanently removes content or progress. Keeping past challenges playable and making streaks optional avoids this.",
  },
];

export function termsForModule(slug: string): Term[] {
  return glossary.filter((term) => term.module === slug);
}

export function getTerm(id: string): Term | undefined {
  return glossary.find((term) => term.id === id);
}
