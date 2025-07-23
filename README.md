Task:

Create a quest game where a user is asked questions a based on the answers the decision is made.

Be mindful of:

1. how to store the graph: nodes + adjacency list
2. the engine is a state machine
3. graph pre-validation:
   1. cycles
   2. unreachable islands
   3. dead ends
   4. repeated step codes
   5. missing data for nodes
4. runtime guard rails: max traversal depth (max hops) and/or runtime cycle detection (makes sense when the tree is dynamic)
