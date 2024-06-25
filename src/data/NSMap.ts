import { Slide, toast } from "react-toastify";
import { NodeData } from "./NSMap.types";
import useNoemataStore from "@/stores/noemataStore";

export const root: NodeData = {
  id: "kestrel:home",
  dx: 5,
  dy: 2,
  postConnect: function () {
    console.log(
      "Welcome To Daemonveil. This is the postConnect automated test system."
    );
  },
  children: [
    {
      id: "kestrel:phone",
      dx: 2,
      dy: -1,
      actionProps: {
		actionType: "battle",
        filename: "anthousai",
      },
      postConnect: function () {
        toast("postConnect trigger test. You connected to kestrel:phone", {
          transition: Slide,
        });
      },
    },
    {
      id: "kestrel:friends",
      dx: 1,
      dy: 2,
      actionProps: { 
		actionType: "battle",
		filename: "automata" 
	},
      children: [
        {
          id: "novacene:home",
          dy: 0,
          dx: 2.2,
          actionProps: {
			actionType: "battle",
			filename: "anthousai" 
		},
        },
        {
          id: "divi:home",
          dy: 2.5,
          dx: 1.5,
        },
        {
          id: "jill:home",
          dy: 3,
          dx: 0,
		  actionProps: {
			actionType: "testpopup",
			text: "THERE IS A SCARY DAEMON HERE LOOK OUT!!!1!!",
			onConnectText: "The daemon dissolved and you connect to the node.",
			onRejectText: "You run away from the daemon, so you didn't connect to the node.",
			connectText: "Pour orange juice on the entity!",
			rejectText: "Run away!"
		  }
        },
      ],
    },
    {
      id: "omnidisplay:network",
      dx: -2,
      dy: 3,
      children: [
        {
          id: "slopzone:network",
          dx: 0,
          dy: 1,
          postConnect: () => {
            useNoemataStore.getState().addNoema("local", "wicked", {
              name: "wicked",
              location: "local/wicked",
            });
          },
          children: [
            {
              id: "the slop module",		  
              dy: -1,
              dx: -2,
            },
            {
              id: "the mori zone",
			  actionProps: {
				actionType: "dialogue",
				filename: "DialogueTest"
			  },
              dx: 1,
            },
          ],
        },
      ],
    },
  ],
};
