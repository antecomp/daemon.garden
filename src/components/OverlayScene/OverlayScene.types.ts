import { CSSProperties } from "react"

export interface OverlayTextCSS extends CSSProperties {
	'--fadeDuration'?: `${number}ms` | `${number}s`
}


export interface SceneData {
	text: string
	image?: string // still a string I think for the src import thingy.
	color?: string
	style?: OverlayTextCSS
	postEvent?: Function
}