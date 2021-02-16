# Assignment 2

In this assignment, you will have to secure your JavaScript blockchain by adding a Merkle tree. You will define a function `createMerkleTree` and use it to generate the Merkle Root of your blockchain.

## Merkle Tree
A Merkle Tree is based on repeatedly applying a hashing function to a list of inputs to generate a tree with a root. This root is known as the Merkle root, and the tree is known as a Merkle tree.

```
               h(h(h(h(a)+h(b))+h(h(c)+h(d)))+h(e)) --------> Merkle Root
                      /                  \
           h(h(h(a)+h(b))+h(h(c)+h(d))) h(e)
          /               \              |
     h(h(a)+h(b))      h(h(c)+h(d))     h(e)
     /    |            |    \            |
    h(a)  h(b)        h(c)  h(d)        h(e)
     |    |           |     |            |
     a    b           c     d            e

```

In the above example, your input list are the transactions `a,b,c,d,e`. We can see how the Merkle root is generated from them by repeated hashing. Notice there is a `+` operator at each intermediate parent. This represents string concatenation. Also notice that the way odd numbers of transactions are handled could lead to different results (one of which is the example above).

## Assignment guidelines
For this assignment, you need to modify a block to contain the merkle root within it. You will also need to replace the block hash function to take just the merkle root instead of all transactions that are within it. This way, when you calculate proof of work you will need to pass in just the merkle root as well. Finally, make sure you modify the `chainIsValid` function to calculate the merkle root appropriately and verify the integrity of all block data.

## Bonus
- Implement a recursive construction of the Merkle tree
- Increase transaction security using PKI (more details will follow).
