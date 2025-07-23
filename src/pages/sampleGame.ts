import {
  EndNodeActor,
  FunctionNodeActor,
  IfNodeActor,
  StartNodeActor,
  TreeNode,
  TreeNodeType,
} from "../lib/tree/type";

export const sampleGame: TreeNode[] = [
  {
    id: "start",
    type: TreeNodeType.start,
    next: "pick_a_number",
    act: StartNodeActor,
  },
  {
    id: "pick_a_number",
    type: TreeNodeType.function,
    function: async (node, state) => {
      state.data.set("score", Math.random() * 100);
      return node.next;
    },
    next: "number_type",
    act: FunctionNodeActor,
  },
  {
    id: "number_type",
    type: TreeNodeType.if,
    condition: (state) => (state.data.get("score") as number) > 50,
    nextTrue: "number_is_bigger_than_50",
    nextFalse: "end",
    act: IfNodeActor,
  },
  {
    id: "number_is_bigger_than_50",
    type: TreeNodeType.function,
    function: async (node, state) => {
      console.log("number is bigger than 50!!!");
      return node.next;
    },
    next: "end",
    act: FunctionNodeActor,
  },
  {
    id: "end",
    type: TreeNodeType.end,
    act: EndNodeActor,
  },
];
