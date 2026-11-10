---
name: you-should-know
description: Review the current session and surface one consequential insight or overlooked decision. Use when the user asks what they should know about this session or requests a session learning review.
---

# You should know

Review the conversation for one insight that could change what the user does next. Look for a decision with a consequence that went unstated, a constraint the user will encounter again, or a result whose evidence supports less than it first appears to. Use the conversation as evidence and avoid taking actions on the user's behalf.

Pick the observation with the clearest consequence for this user. Skip routine status, points the user already understood, and issues that depend on guessing what happened. When nothing clears that bar, reply with `learn: none`.

Otherwise, use this format:

```text
learn: <one sentence connecting the observation to its consequence>
tag: <You should know or Heads up>
explain:
**<short title>**
<Explain the mechanism and why it matters in this session.>
```

Use `You should know` for a durable concept and `Heads up` for an overlooked consequence that matters now. Write the explanation in the user's language, leave out sensitive details, and distinguish evidence from inference.
