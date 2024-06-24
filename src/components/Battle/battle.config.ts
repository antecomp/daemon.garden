// If the runes change over the duration of the game, this will be replaced with some more robust globalized (zustand?) thing.
export const DEFAULT_RUNEDATA = {
    player: {
        runeMap: [
            // maybe I should add unique ID's to the moves themselves for processing combininations?
            { symbol: "]", name: "DEFEND", desc: "reduce damage taken on pairing, completely negate damage from basic attacks" },
            { symbol: "&", name: "OBSERVE", desc: "predict part of opponents sigil on next turn. leaves vulnerable during pairng." },
            { symbol: "f", name: "ATTACK", desc: "utilize voidlink as weapon, cannot break defense" },
            { symbol: "6", name: "PREPARE", desc: "vulnerability during pairing, increases effectiveness of subsequent rune" },
            { symbol: "v", name: "PROLONG", desc: "repeat previous rune" },
            { symbol: "h", name: "EVADE", desc: "channce for total damage negation, increases damage taken on evasion fail" },
            { symbol: "T", name: "HEAL", desc: "recover lost health, leaves vulnerable during pairing" },
            { symbol: "'", name: "CALL FAMILIAR", desc: "summon familiar or use summoned familiars ability" }
        ],

        maxNumRunes: 8, // could be different from array length if I have some sort of equipt system, this is how many in your ring.
        runesPerMove: 6

    }
}

export const RUNEBUILDER_RADIUS = 90;