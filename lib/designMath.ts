/** Frames the attacker still owes after a hit on active frame `hitOn` (1-based). */
export function attackerBusy(active: number, recovery: number, hitOn: number): number {
  const k = Math.min(Math.max(1, hitOn), Math.max(1, active));
  return active - k + recovery;
}

/**
 * Frame advantage for the attacker.
 * Positive means the attacker may act sooner than the defender.
 * Equal hit-stop on both fighters cancels out and is not part of this number.
 * `stun` is hitstun or blockstun: frames the defender cannot act after impact.
 */
export function frameAdvantage(stun: number, active: number, recovery: number, hitOn = 1): number {
  return stun - attackerBusy(active, recovery, hitOn);
}

export function commitment(startup: number, active: number, recovery: number): number {
  return startup + active + recovery;
}

export function frameDurationMs(fps: number): number {
  return 1000 / fps;
}

export function msFromFrames(frames: number, fps: number): number {
  return frames * frameDurationMs(fps);
}

export function framesFromMs(ms: number, fps: number): number {
  return ms / frameDurationMs(fps);
}
