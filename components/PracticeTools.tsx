"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { attackerBusy, commitment, frameAdvantage, framesFromMs, msFromFrames } from "@/lib/designMath";
import { signed } from "@/lib/format";

type Preset = {
  name: string;
  startup: number;
  active: number;
  recovery: number;
  blockstun: number;
  hitstun: number;
  hitstop: number;
};

const presets: Preset[] = [
  { name: "Jab", startup: 3, active: 1, recovery: 7, blockstun: 8, hitstun: 12, hitstop: 4 },
  { name: "Body blow", startup: 6, active: 2, recovery: 12, blockstun: 14, hitstun: 18, hitstop: 6 },
  { name: "Sweep", startup: 8, active: 3, recovery: 16, blockstun: 10, hitstun: 22, hitstop: 8 },
  { name: "Fireball", startup: 14, active: 1, recovery: 20, blockstun: 8, hitstun: 14, hitstop: 3 },
];

function NumberField({
  label,
  help,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  help: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const [text, setText] = useState(String(value));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setText(String(value));
  }, [value]);

  return (
    <label>
      <span className="field-label">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={text}
        onFocus={() => {
          focused.current = true;
        }}
        onBlur={() => {
          focused.current = false;
          const next = clamp(Number(text), min, max);
          setText(String(next));
          onChange(next);
        }}
        onChange={(event) => {
          const raw = event.target.value;
          setText(raw);
          const next = Number(raw);
          if (raw.trim() !== "" && !Number.isNaN(next) && next >= min && next <= max) onChange(next);
        }}
      />
      <small className="field-help">{help}</small>
    </label>
  );
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function PracticeTools() {
  const [fps, setFps] = useState(60);
  const [move, setMove] = useState(presets[0]);
  const [hitOn, setHitOn] = useState(1);
  const [coyoteMs, setCoyoteMs] = useState(100);
  const [bufferMs, setBufferMs] = useState(100);
  const [feel, setFeel] = useState({
    response: true,
    buffer: true,
    coyote: true,
    hitstop: true,
    shake: false,
    particles: true,
    metaphor: true,
  });

  const safeFps = clamp(fps, 20, 360);
  const active = Math.max(1, move.active);
  const connection = clamp(hitOn, 1, active);
  const busy = attackerBusy(active, move.recovery, connection);
  const onBlock = frameAdvantage(move.blockstun, active, move.recovery, connection);
  const onHit = frameAdvantage(move.hitstun, active, move.recovery, connection);
  const total = commitment(move.startup, active, move.recovery);

  const coyoteFrames = framesFromMs(coyoteMs, safeFps);
  const bufferFrames = framesFromMs(bufferMs, safeFps);

  const feelReadout = useMemo(() => readFeel(feel), [feel]);

  function applyPreset(preset: Preset) {
    setMove(preset);
    setHitOn(1);
  }

  function patchMove(partial: Partial<Preset>) {
    setMove((current) => ({ ...current, ...partial, name: "Custom" }));
  }

  return (
    <div className="tools">
      <section className="panel" id="frame-advantage">
        <p className="kicker">Tool 1 · Goes with Chapter 2</p>
        <h2>Frame advantage calculator</h2>
        <p>
          This tool works out which character can act first after an attack is blocked or lands. Choose an example
          attack, or type in your own numbers. If any of the terms are unfamiliar, read{" "}
          <Link href="/learn/frames/">Chapter 2: Timing an attack</Link> first.
        </p>
        <p className="field-label">Start from an example attack:</p>
        <div className="preset-row">
          {presets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              className={`button ${move.name === preset.name ? "" : "ghost"}`}
              aria-pressed={move.name === preset.name}
              onClick={() => applyPreset(preset)}
            >
              {preset.name}
            </button>
          ))}
        </div>
        <div className="fields">
          <NumberField label="Frames per second" help="How many times per second the game updates. 60 is typical." value={fps} min={20} max={360} onChange={setFps} />
          <NumberField label="Startup frames" help="The windup before the attack can hit." value={move.startup} min={0} max={60} onChange={(startup) => patchMove({ startup })} />
          <NumberField
            label="Active frames"
            help="How many frames the attack can hit for."
            value={move.active}
            min={1}
            max={20}
            onChange={(value) => {
              patchMove({ active: value });
              setHitOn((current) => Math.min(current, Math.max(1, value)));
            }}
          />
          <NumberField label="Recovery frames" help="The cool-down after the attack." value={move.recovery} min={0} max={60} onChange={(recovery) => patchMove({ recovery })} />
          <NumberField label="Blockstun frames" help="How long the defender is stuck after blocking." value={move.blockstun} min={0} max={60} onChange={(blockstun) => patchMove({ blockstun })} />
          <NumberField label="Hitstun frames" help="How long the defender is stuck after being hit." value={move.hitstun} min={0} max={80} onChange={(hitstun) => patchMove({ hitstun })} />
          <NumberField label="Hit-stop frames" help="How long both characters freeze on impact." value={move.hitstop} min={0} max={30} onChange={(hitstop) => patchMove({ hitstop })} />
          <NumberField label="Hits on active frame number" help="1 means the first active frame. Higher numbers are “meaty” hits." value={connection} min={1} max={active} onChange={setHitOn} />
        </div>
        <h3>Results</h3>
        <dl className="readout">
          <div>
            <dt>Total length of the attack</dt>
            <dd>
              {total} frames ({msFromFrames(total, safeFps).toFixed(0)} ms)
            </dd>
          </div>
          <div>
            <dt>Attacker still busy after the hit</dt>
            <dd>{busy} frames</dd>
          </div>
          <div>
            <dt>Advantage if blocked</dt>
            <dd>{signed(onBlock)}</dd>
          </div>
          <div>
            <dt>Advantage if it hits</dt>
            <dd>{signed(onHit)}</dd>
          </div>
          <div>
            <dt>Hit-stop length</dt>
            <dd>{msFromFrames(move.hitstop, safeFps).toFixed(0)} ms</dd>
          </div>
        </dl>
        <p className="readout-note">{advantageSentence(onBlock)}</p>
        <p className="readout-note">
          How this is calculated: the attacker is still busy for ({active} − {connection}) + {move.recovery} = {busy}{" "}
          frames. The advantage if blocked is {move.blockstun} − {busy} = {signed(onBlock)}. Hit-stop is not included,
          because both characters freeze for the same amount of time.
        </p>
        {move.hitstop > 0 && msFromFrames(move.hitstop, safeFps) > 300 ? (
          <p className="readout-note warn">
            This freeze is longer than about a third of a second. Players may think the game has stuttered instead of
            feeling the weight of the hit.
          </p>
        ) : null}
      </section>

      <section className="panel" id="forgiveness">
        <p className="kicker">Tool 2 · Goes with Chapter 3</p>
        <h2>Forgiveness window converter</h2>
        <p>
          This tool converts coyote time and input buffer lengths from milliseconds into frames, and compares them with a
          typical human reaction time of about 200 milliseconds. It uses the frames-per-second value from Tool 1. See{" "}
          <Link href="/learn/forgiveness/">Chapter 3: Making controls forgiving</Link> for an explanation.
        </p>
        <div className="fields">
          <NumberField label="Coyote time (milliseconds)" help="How long the player can still jump after leaving a ledge." value={coyoteMs} min={0} max={400} onChange={setCoyoteMs} />
          <NumberField label="Input buffer (milliseconds)" help="How long an early button press is remembered." value={bufferMs} min={0} max={400} onChange={setBufferMs} />
        </div>
        <h3>Results</h3>
        <dl className="readout">
          <div>
            <dt>Coyote time</dt>
            <dd>
              {coyoteFrames.toFixed(1)} frames at {safeFps} fps
            </dd>
          </div>
          <div>
            <dt>Input buffer</dt>
            <dd>
              {bufferFrames.toFixed(1)} frames at {safeFps} fps
            </dd>
          </div>
        </dl>
        <ul className="notes">
          {forgivenessNotes(coyoteMs, bufferMs).map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="panel feel-panel" id="game-feel">
        <p className="kicker">Tool 3 · Goes with Chapter 1</p>
        <h2>Game feel checklist</h2>
        <p>
          Each checkbox below represents one ingredient of game feel. Turn ingredients off to see what players would
          likely say about a game that is missing them. See <Link href="/learn/feel/">Chapter 1: Game feel</Link> for
          background.
        </p>
        <div className="toggles">
          {(
            [
              ["response", "The action starts quickly after the button press"],
              ["buffer", "Input buffering (early presses are remembered)"],
              ["coyote", "Coyote time (late ledge jumps still work)"],
              ["hitstop", "Hit-stop (a brief freeze on impact)"],
              ["shake", "Screen shake"],
              ["particles", "Particles"],
              ["metaphor", "The character's look matches how it moves and hits"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={feel[key]}
                onChange={() => setFeel((current) => ({ ...current, [key]: !current[key] }))}
              />
              {label}
            </label>
          ))}
        </div>
        <h3>What players would likely say</h3>
        <ul className="notes">
          {feelReadout.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function advantageSentence(onBlock: number): string {
  if (onBlock > 0)
    return `If this attack is blocked, the attacker can act ${onBlock} ${onBlock === 1 ? "frame" : "frames"} before the defender. The attack is safe to use.`;
  if (onBlock === 0) return "If this attack is blocked, both characters can act on the same frame. Neither side has an advantage.";
  if (onBlock > -5)
    return `If this attack is blocked, the defender can act ${-onBlock} ${onBlock === -1 ? "frame" : "frames"} first. That is a small disadvantage, and only a very fast counterattack could punish it.`;
  return `If this attack is blocked, the defender can act ${-onBlock} frames first. That is a large disadvantage, and the defender has time to counterattack.`;
}

function forgivenessNotes(coyoteMs: number, bufferMs: number): string[] {
  const notes = [
    `Coyote time covers about ${Math.round((coyoteMs / 200) * 100)}% of a typical 200 millisecond reaction time.`,
    `The input buffer covers about ${Math.round((bufferMs / 200) * 100)}% of the same reaction time.`,
  ];
  if (coyoteMs < 50) notes.push("Coyote time this short will still make players miss ledge jumps they feel they pressed in time.");
  if (coyoteMs > 180) notes.push("Above about 180 milliseconds, players start to notice that they can jump after clearly leaving the ledge.");
  if (bufferMs < 50) notes.push("A buffer this short still requires nearly perfect timing for jumps on landing and for counterattacks.");
  if (bufferMs > 200) notes.push("A buffer this long may perform a jump the player has already decided against.");
  if (coyoteMs >= 80 && coyoteMs <= 120 && bufferMs >= 80 && bufferMs <= 150) {
    notes.push("Both values are within the range that usually feels fair to players.");
  }
  return notes;
}

function readFeel(feel: {
  response: boolean;
  buffer: boolean;
  coyote: boolean;
  hitstop: boolean;
  shake: boolean;
  particles: boolean;
  metaphor: boolean;
}): string[] {
  const lines: string[] = [];
  if (!feel.response) lines.push("“The controls feel laggy.” Particles and screen shake cannot make a slow action start sooner.");
  if (!feel.buffer) lines.push("“The game ignores my button presses.” Presses made slightly early are lost.");
  if (!feel.coyote) lines.push("“I definitely pressed jump in time!” Ledge jumps fail when the press comes just after the edge.");
  if (!feel.hitstop && feel.response) lines.push("“The hits feel weightless.” The action is fast, but impacts do not feel solid.");
  if ((feel.particles || feel.shake) && !feel.response)
    lines.push("“Everything feels sluggish.” The effects are attached to a slow action, so players connect the effects with the delay.");
  if (!feel.metaphor && feel.hitstop)
    lines.push("“Something feels off about the hits.” The freeze suggests a heavy impact, but the character's appearance suggests something lighter.");
  if (feel.response && feel.buffer && feel.coyote && feel.hitstop && feel.metaphor) {
    lines.push("“This feels great.” Responsiveness, forgiveness, weight, and appearance all agree. Shake and particles are now a matter of taste.");
  }
  if (!feel.particles && !feel.shake && feel.response && feel.hitstop) {
    lines.push("“It plays well, but it feels a bit plain.” This is a good time for a polish pass, now that the timing is right.");
  }
  if (lines.length === 0) lines.push("Turn some ingredients off to see what players would say.");
  return lines;
}
