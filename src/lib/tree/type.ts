export enum TreeNodeType {
  start = "start",
  end = "end",
  if = "if",
  question = "question",
  function = "function",
}

export type GameState = {
  data: Map<string, unknown>;
  hops: number;
  currentNodeId: TreeId;
};

export type TreeId = string;

export type StartNode = {
  type: TreeNodeType.start;
  next: TreeId;
};

export type EndNode = {
  type: TreeNodeType.end;
};

export type IfNode = {
  type: TreeNodeType.if;
  condition: (state: GameState) => boolean;
  nextTrue: TreeId;
  nextFalse: TreeId;
};

export type QuestionNode = {
  type: TreeNodeType.question;
  question: string;
  answerCode: string;
  next: TreeId;
};

export type FunctionNode = {
  type: TreeNodeType.function;
  function: (node: FunctionNode, state: GameState) => Promise<TreeId | null>;
  next: TreeId;
};

export type NodeActor = (
  node: TreeNode,
  state: GameState
) => Promise<TreeId | null>;

export type TreeNode = {
  id: TreeId;
  act: NodeActor;
} & (StartNode | EndNode | IfNode | QuestionNode | FunctionNode);

export const StartNodeActor: NodeActor = async (node, _) => {
  console.log("let the game begin!");
  return (node as StartNode).next;
};

export const EndNodeActor: NodeActor = async (_, state) => {
  console.log("the game has ended, your score: ", state.data.get("score"));
  return null;
};

export const FunctionNodeActor: NodeActor = async (node, state) => {
  if (!isFunctionNode(node)) {
    throw new Error("Node is not a function node");
  }

  await node.function(node, state);
  return node.next;
};

export const IfNodeActor: NodeActor = async (node, state) => {
  if (!isIfNode(node)) {
    throw new Error("Node is not an if node");
  }

  return node.condition(state) ? node.nextTrue : node.nextFalse;
};

export const isStartNode = (node: TreeNode): node is TreeNode & StartNode => {
  return node.type === TreeNodeType.start;
};

export const isEndNode = (node: TreeNode): node is TreeNode & EndNode => {
  return node.type === TreeNodeType.end;
};

export const isIfNode = (node: TreeNode): node is TreeNode & IfNode => {
  return node.type === TreeNodeType.if;
};

export const isQuestionNode = (
  node: TreeNode
): node is TreeNode & QuestionNode => {
  return node.type === TreeNodeType.question;
};

export const isFunctionNode = (
  node: TreeNode
): node is TreeNode & FunctionNode => {
  return node.type === TreeNodeType.function;
};
