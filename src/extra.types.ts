export interface coordinatePair {
    x1: number,
    x2: number,
    y1: number,
    y2: number
}

export interface Point {
    x: number,
    y: number
}

export interface AssArray<T> { // Associative Array / Dictionary. I have the humour of a child.
    [key: string]: T
}

export type VLID = `${string}:${string}` // I wish I could make this more robust but whatever