export type Bezier = [number, number, number, number];

/** Sharp, cinematic in-out — used for curtains and doors. */
export const EASE_CINE: Bezier = [0.76, 0, 0.24, 1];

/** Soft, decelerating — used for reveals. */
export const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];
