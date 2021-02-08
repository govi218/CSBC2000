# Assignment 1

In this assignment, we'll explore consensus more in depth. We worked with a basic blockchain in Express.js in the first class. Your task is to modify this blockchain to have Proof-of-Work consensus.

## Proof-of-Work

Recall, PoW is a piece of data that is difficult to produce but easy to verify. A computationally difficult problem could involve using the SHA256 hash function. While we'll explore this function in depth next week, it suffices to view it as a function that takes any string and produces a unique string of fixed length. Even if the difference between both strings is trivial, the difference between their hashes is quite large. For example:

SHA256("The quick brown fox jumped over the lazy dogs.") = c9c85caa5a93aad2bfcc91b9a02d4185a0f0348aac049e650bd0f4dea10a7393
SHA256("The quick brown fox jumped over the lazy dog.") = 68b1282b91de2c054c36629cb8dd447f12f096d3e3c587978dc2248444633483

This is a pretty neat property. We can exploit this apparent randomness of SHA256 outputs to create a PoW algorithm. Say you have a base string to work with, "CSBC2000". We can create an arbitrarily hard problem by setting expectations about SHA256 outputs. Specifically, say we also have a random string generator function `nonce()` that returns a random string each time you use it. We can create a problem where we expect the output of `SHA256("CSBC2000" + nonce())` to have at least 5 continuous `a`s in the beginning. Now this is quite a difficult problem as a SHA256 hash has 32 bytes and we are expecting the first 5 bytes to all be the same. The only feasible way of finding a nonce value that fits this constraint is by continuously calling the SHA256 function as mentioned over and over again. On the flip side, it is very easy to verify the correctness of a solution as you just need to call SHALL56 with the provided nonce value to verify. Let's pretend `01a3efgt` is the correct nonce; the verifier would just need to call `SHA256("CSBC2000" + "01a3efgt")` and check if the output has 5 successive `a`s in the beginning.

## Assignment guidelines
Modify the `consensus` function to have PoW.

## Bonus
- Add difficulty
- Get average hash rate xyz
