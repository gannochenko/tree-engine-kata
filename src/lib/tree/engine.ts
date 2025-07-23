import { GameState, isStartNode, TreeNode } from "./type";

export class GameEngine {
  private state: GameState;

  constructor(private tree: TreeNode[]) {
    this.reset();
  }

  async start() {
    this.reset();

    while (await this.hop()) {}
  }

  private reset() {
    this.state = {
      data: new Map(),
      hops: 0,
      currentNodeId: this.tree.find(isStartNode)?.id ?? "",
    };

    if (!this.state.currentNodeId) {
      throw new Error("No start node found");
    }
  }

  private async hop(): Promise<boolean> {
    console.log("> hopping to", this.state.currentNodeId);

    const node = this.tree.find((node) => node.id === this.state.currentNodeId);

    if (!node) {
      throw new Error("Node not found");
    }

    this.state.hops++;
    if (this.state.hops > 100) {
      // todo: make this adjustable
      throw new Error("Max hops reached, something is wrong with the graph");
    }

    const nextNodeId = await node.act(node, this.state);
    if (!nextNodeId) {
      return false;
    }

    this.state.currentNodeId = nextNodeId;

    return true;
  }
}
