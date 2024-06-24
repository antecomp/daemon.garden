export interface BattleProps {
	filename: string
	victoryCB: (victory: boolean) => void
}

export interface PlayerBattleData {
    runeMap:      RuneData[];
    maxNumRunes:  number;
    runesPerMove: number;
}

export interface RuneData {
    symbol: string;
    name:   string;
    desc:   string;
}