---
name: explain
description: Explain a concept, mechanism, codebase, or idea bottom-up in plain simple English, so the reader gets it in one read and comes away thinking "wow, I really get it this time." Use when the user types /explain, or asks to explain something, help them understand it, ELI5 it, says "I don't get X", "what's actually going on with X", "walk me through X", or "make this click".
---

# Explain

Write everything so the person reading it thinks: "wow, this was so simple, I can feel deeply what it means."

Explain extremely bottom-up, in plain simple English, in a way that is easy to read once and then you get it. The reader should finish with a strong feeling of "wow, I really get it this time."

## How

1. **Find the floor.** Start from something the reader already knows for certain, a plain fact or everyday experience, and say it first. Never start from the jargon, the definition, or the conclusion.
2. **Build one step at a time.** Each step adds exactly one new idea on top of the last one, and each step should feel obvious given the one before it. If a step makes the reader stop and squint, it's too big: split it.
3. **Name things only after they exist.** Describe what a thing does in plain words first, then give it its real name ("...and that's what people call a *closure*"). The term becomes a label for something the reader already understands, never a wall they have to climb.
4. **Make it concrete.** Use one small, real example and carry it all the way through, with actual values, actual inputs, actual outputs. Pick a tiny example over a general one every time.
5. **Show why it has to be this way.** Explain the problem each piece solves, so the design feels inevitable instead of arbitrary. "Without this, X would break, so..." is how understanding sticks.
6. **Land it.** End by restating the whole idea in one or two plain sentences, now that every word in them means something. This is the "oh, *that's* all it is" moment.

## Rules

- Plain words. Short sentences that flow. No jargon the reader hasn't been handed yet, no acronyms without unpacking them.
- One idea per paragraph. White space is part of the explanation.
- Cut anything that doesn't move understanding forward: history, caveats, edge cases, "it's worth noting". Mention an edge case only if skipping it would leave the reader with a wrong picture.
- An analogy is fine when it maps cleanly onto the real mechanism; say where it stops being true. Never let an analogy replace the real thing.
- A tiny diagram, table, or code snippet beats a paragraph when the idea is a shape, a flow, or a before/after.
- Read it back as someone smart who has never seen this topic. If any sentence needs a second read, rewrite it.
