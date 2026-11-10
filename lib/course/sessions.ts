import type { Module } from "../types";

export const sessions: Module = {
  slug: "sessions",
  number: "08",
  part: "three",
  title: "Play sessions and why players return",
  summary:
    "How long a play session should be, what gives players a healthy reason to come back, and two manipulative techniques, the Skinner box and fear of missing out, that you should learn to recognize and avoid.",
  minutes: 13,
  quizVersion: 2,
  termIds: ["session-length", "retention-loop", "skinner-box", "variable-ratio", "fomo"],
  objectives: [
    "Explain why session length should be decided early in the design.",
    "Define a retention loop and compare it with the core loop and meta loop.",
    "Describe what a Skinner box and a variable-ratio schedule are.",
    "Explain the difference between an enjoyable surprise and a compulsion loop.",
    "Recognize when a daily feature becomes a fear-of-missing-out trap.",
  ],
  blocks: [
    {
      type: "p",
      text: "A game can be fun for a single sitting and still never be played again. This final chapter looks at the design of play sessions and at what makes people return. It also describes two techniques that some games use to keep players coming back through pressure rather than enjoyment. The goal is to help you recognize these techniques so that you can choose not to use them.",
    },
    { type: "h", text: "Session length" },
    {
      type: "term",
      term: "Session length",
      text: "The amount of time a single sitting of play is designed to last.",
    },
    {
      type: "p",
      text: "Decide early how long a typical session should be, because it shapes everything else. A daily challenge meant to be played during a short commute is a very different design from an endless mode that lasts until the player decides to stop. If a “quick daily challenge” actually takes ninety minutes to complete well, it is not a quick challenge, regardless of what the menu calls it.",
    },
    {
      type: "p",
      text: "Once you know the target length, design the loop so that a reasonably skilled player can complete a meaningful attempt in that time. Remember to include the time players will spend failing and retrying.",
    },
    {
      type: "p",
      text: "The game designer Raph Koster offers a useful way to think about why sessions end. In A Theory of Fun for Game Design, he argues that games are enjoyable because they let us learn patterns. We feel delight when we master a pattern, and we feel bored once there is nothing left to learn. A healthy reason to return gives the player a new pattern to learn, such as harder pages, a new combination of verbs, or a new layout to explore.",
    },
    { type: "h", text: "Retention loops: a reason to return" },
    {
      type: "term",
      term: "Retention loop",
      text: "The design elements that give a player a reason to start another play session on a later day.",
    },
    {
      type: "p",
      text: "Examples of healthy retention loops include beating a personal best score in Tetris, attempting a new route in Slay the Spire, or competing in the daily puzzle in Spelunky or Wordle. Spelunky's Daily Challenge gives every player worldwide the exact same randomized cave layout once per day, inviting players back tomorrow without altering the core movement rules.",
    },
    {
      type: "p",
      text: "It helps to see how the three kinds of loops in this book fit together:",
    },
    {
      type: "table",
      caption: "Three kinds of loops.",
      headers: ["Loop", "Time scale", "Purpose"],
      rows: [
        ["Core loop (Chapter 6)", "Seconds to minutes", "The main activity the player repeats."],
        ["Meta loop (Chapter 6)", "Across one session", "Gives the core loop direction, for example by building up knowledge of a route."],
        ["Retention loop", "Across many sessions", "Gives the player a reason to come back another day. It should support the core loop, not contradict it."],
      ],
    },
    { type: "h", text: "The Skinner box" },
    {
      type: "p",
      text: "The psychologist B. F. Skinner studied how rewards shape behavior. In his experiments, an animal in a box could press a lever and sometimes receive food. This setup is now known as a **Skinner box**.",
    },
    {
      type: "term",
      term: "Skinner box",
      text: "A setup in which behavior is maintained by delivering rewards on a schedule. In games, the term describes features designed to keep players repeating an action mainly to get the next reward.",
    },
    {
      type: "p",
      text: "Skinner found that the timing of rewards mattered a great deal. The schedule that produced the most persistent behavior was a **variable-ratio schedule**, in which a reward arrives after an unpredictable number of actions. Because any press might be the one that pays off, the animal keeps pressing. Slot machines use this same schedule.",
    },
    {
      type: "term",
      term: "Variable-ratio schedule",
      text: "A reward schedule in which rewards arrive after an unpredictable number of actions. It produces very persistent, repetitive behavior.",
    },
    {
      type: "p",
      text: "Not every surprise in a game is a Skinner box. Discovering an unexpected room, meeting a new kind of enemy, or finding a page you love are surprises that players can remember and talk about later. A compulsion loop is different. Its main purpose is to keep the player repeating an action by hiding when the next reward will come.",
    },
    {
      type: "callout",
      tone: "rule",
      title: "A simple test",
      text: "Imagine posting exactly when every reward will appear. If the feature would still be enjoyable, it is probably good design. If the feature would stop working once players could predict it, then the unpredictability was the whole point, and it is a compulsion loop.",
    },
    { type: "h", text: "Fear of missing out" },
    {
      type: "term",
      term: "FOMO (fear of missing out)",
      text: "A design technique in which missing a limited-time event or reward is used as a punishment, pressuring players to show up out of worry rather than enjoyment.",
    },
    {
      type: "p",
      text: "Daily features can easily turn into FOMO traps. A daily challenge becomes one when missing a day permanently destroys progress that the player can never recover, and that loss is intended to pressure them. A daily challenge stays healthy when past challenges remain playable, or when a streak is just a small bonus that players can lose without losing their skills, knowledge, or collection.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "A practical test",
      text: "Write down what a player loses by coming back tomorrow instead of today. If the answer is small, such as a streak bonus or a chance at today's leaderboard, you have a healthy retention loop. If the answer is a reward that will never be offered again, or the loss of progress they earned, you are using fear of missing out. Avoid it.",
    },
    {
      type: "example",
      title: "Example: Spelunky and Wordle",
      text: "Spelunky's Daily Challenge and Wordle invite players back every day without holding their progress hostage. In Spelunky, everyone gets one shot at today's shared seed; missing a day does not delete your unlocked shortcuts, wipe your high scores, or charge real money to protect a streak. Contrast that with games that threaten to erase months of earned rewards if you fail to log in every 24 hours. When absence is punished with permanent loss, the game has stopped testing player skill and started testing attendance.",
    },
    { type: "h", text: "Bringing it all together" },
    {
      type: "p",
      text: "This book has covered a lot of vocabulary. Here is how the main ideas connect.",
    },
    {
      type: "ul",
      items: [
        "**Game feel** (Chapter 1) decides whether a player enjoys controlling the game. If players never play a second minute, look here first.",
        "**Frames, forgiveness, collision, and the game clock** (Chapters 2 through 5) keep each moment of play precise and fair.",
        "**The core loop** (Chapter 6) is the activity players repeat. Every feature should support it.",
        "**Affordances and signifiers** (Chapter 7) decide whether players discover what they can do.",
        "**Retention** (this chapter) should invite players back. It should never punish them for being away.",
      ],
    },
  ],
  recap: [
    "Decide the target session length early, and make sure a meaningful attempt fits inside it, including failures.",
    "A retention loop gives players a reason to come back another day. It should support the core loop.",
    "A Skinner box keeps behavior going with a reward schedule. A variable-ratio schedule, with unpredictable rewards, is the most persistent.",
    "An enjoyable surprise still works when players understand it. A compulsion loop stops working once rewards become predictable.",
    "Fear of missing out uses permanent loss as pressure. Healthy daily features keep past content available and make streaks optional.",
  ],
  quiz: [
    {
      id: "sessions-1",
      review: "session-length",
      prompt: "You are designing a daily challenge mode intended for a short morning commute, but an average attempt currently takes ninety minutes. What is the design problem?",
      choices: [
        { id: "a", text: "The intended session length and the actual session length required by the mode do not match." },
        { id: "b", text: "Nothing. Ninety minutes is the standard length for a daily challenge." },
        { id: "c", text: "Commute modes should use a variable timestep." },
        { id: "d", text: "The fix is to add a limited-time reward so players spend the ninety minutes anyway." },
      ],
      answer: "a",
      why: "Decide the session length first, then design the mode so a meaningful attempt fits inside it. Calling it a short challenge does not make it short.",
    },
    {
      id: "sessions-2",
      review: "retention-loops-a-reason-to-return",
      prompt: "Which of these is a retention loop, rather than a change to the core loop?",
      choices: [
        { id: "a", text: "A daily challenge that brings players back tomorrow to try a new route using the same actions." },
        { id: "b", text: "Fixing the punch so it has a working hitbox." },
        { id: "c", text: "Adding coyote time so ledge jumps work." },
        { id: "d", text: "Giving the kick a different angle so it can reach new pipes." },
      ],
      answer: "a",
      why: "The daily challenge gives players a reason to return on another day. The other changes improve the core loop itself, which is valuable, but they are not retention loops.",
    },
    {
      id: "sessions-3",
      review: "the-skinner-box",
      prompt: "Why does a variable-ratio schedule produce such persistent behavior?",
      choices: [
        { id: "a", text: "Because rewards come after an unpredictable number of actions, so any action might be the one that pays off." },
        { id: "b", text: "Because the player always knows exactly which action will be rewarded." },
        { id: "c", text: "Because rewards are removed entirely." },
        { id: "d", text: "Because it is another name for coyote time." },
      ],
      answer: "a",
      why: "Unpredictable rewards encourage people to keep trying. Recognizing this pattern helps you avoid building a game around it.",
    },
    {
      id: "sessions-4",
      review: "the-skinner-box",
      prompt: "Which feature would still be enjoyable even if players knew exactly when it would happen?",
      choices: [
        { id: "a", text: "A pipe that always leads to a spectacular page the designer placed there, which players can learn about and still enjoy." },
        { id: "b", text: "A reward that stops being interesting as soon as players can predict it." },
        { id: "c", text: "A lever whose only purpose is to hide when the next reward will arrive." },
        { id: "d", text: "A counter that resets if the player waits too long between clicks." },
      ],
      answer: "a",
      why: "A designed surprise still works after players understand it. A feature that only works while rewards are unpredictable is a compulsion loop.",
    },
    {
      id: "sessions-5",
      review: "fear-of-missing-out",
      prompt: "Which daily challenge has become a fear-of-missing-out trap?",
      choices: [
        { id: "a", text: "Missing a day deletes the player's map and permanently removes that day's page, on purpose." },
        { id: "b", text: "Yesterday's challenge is still playable, and a streak only adds a small glow." },
        { id: "c", text: "The daily challenge uses a shorter difficulty ramp so it fits the session length." },
        { id: "d", text: "The game publishes each day's layout so friends can compare routes." },
      ],
      answer: "a",
      why: "Permanently taking away earned progress or content as punishment for missing a day is what makes it a fear-of-missing-out trap.",
    },
    {
      id: "sessions-6",
      review: "bringing-it-all-together",
      prompt: "A player enjoys one minute of the game but never plays a second. The pipes are easy to find, and the goal is clear. Where should you look first?",
      choices: [
        { id: "a", text: "Game feel: the controls, the space, and the polish that should make each minute enjoyable." },
        { id: "b", text: "Adding a stronger variable-ratio reward schedule." },
        { id: "c", text: "Removing signifiers so the player has to concentrate harder." },
        { id: "d", text: "Locking tomorrow's challenge unless today's is completed perfectly." },
      ],
      answer: "a",
      why: "Game feel decides whether players want to continue after the first minute. Signifiers and the core loop are already working in this case, and pressure tactics would not make the game more enjoyable to control.",
    },
  ],
};
