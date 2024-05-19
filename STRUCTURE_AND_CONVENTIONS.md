# directory structure
```
├── assets                      
│   ├── fonts                  
│   ├── audio                   - Small audio samples like UI beeps.                   
│   ├── music
│   ├── sprites                 
│   │   ├── characters          - Major character artwork (people, daemons)
│   │   │   ├── full            - Full artwork
│   │   │   └── profile         - Headshots for messages, notifications etc.
│   │   └── daemons             - Lesser daemon sprites (for battle screens)
│   └── ui
│       ├── common              - image elements used everywhere (ex: textures, button designs)
│       └── window              - image elements used for drawing the windows (ex: close button)
│           └── icons           - icons used for various windows (ex: chat.png for a 'chat' window)
├── components
│   ├── BattleCon
│   │   └── assets
│   ├── Dialogue
│   ├── NSTracer
│   │   └── assets
│   └── Util
│       ├── Modal
│       ├── Toast
│       ├── Tooltip
│       └── Window
├── data                       - STATIC game data and config stuff.
│   ├── battles                - battle data, should host the AI, triggers and sprite ref etc for different battles
│   ├── config                 - minor exported vars for us to tweak parts of the game.
│   ├── defaults               - starting values for dynamic game data (ex: picked familiar?)
│   ├── dialogues              - dialogue sequence data.
│   ├── documents              - the 'downloaded' documents, just simple TSX files?
│   └── scenes                 - overlayScene data (text/images to display)
├── hooks
├── placeholders               - will be deleted when the game is complete.
└── styles
    ├── BattleCon
    ├── Dialogue
    ├── NSTracer
    ├── OverlayScene
    └── Util
        ├── Toastify
        ├── Tooltip
        └── Window
```
### notes on directory structure.
`components` organized into folders based on their major "content," for example NSTracer is a major game piece, so NSTracer.tsx and it's associated lesser components (and assets) are all put into the NSTracer folder. Globally used components, like Tooltip should be placed in folders under `Util`.

`styles` should have identical directory structure and naming to `components` for consistency.

## conventions
Follow typical react convention for naming stuff. 

Try to keep imports with the alias'd @ unless working within component folders, then ./ is perfectly fine.

Please use JSDoc when adding complex hooks, components etc.

(Obv) Update this when there's major changes to the structure, convention etc.