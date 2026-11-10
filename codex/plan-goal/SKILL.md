---
name: plan-goal
description: >-
  Turn a fuzzy task into a verifier-first goal. Instead of planning how to do X,
  first write a self-contained prompt that CHECKS whether X is actually done, make
  that verifier the standing goal, then run plan→do→verify cycles against it until
  it passes. Use this whenever starting a non-trivial, multi-step task where "done"
  is ambiguous or premature success is a risk — especially when the user says
  "plan-goal", "verify-first", "define done", "set the goal", "how will we know
  this worked", or asks you to plan something substantial. Prefer this over jumping
  straight into planning or coding when the cost of finishing the wrong thing is high.
---

# Plan-Goal

## The core move

Don't make the goal *"do X."* Make the goal *"a prompt that verifies X is done"* — written **before** any work — and then plan and do against it.

A plan is open-loop: a list of actions. You can execute every step and still not have achieved the goal, and nothing in the plan will tell you. A verifier is closed-loop: a prompt you *run* against the current state of the world, and it returns a verdict — is X actually true now, yes or no, and if no, what's still false.

So the sequence inverts. Normally: *goal → plan → do → (hope)*. Here: **write the verifier → set it as the goal → loop { plan → do → run the verifier }** until it passes. The verifier is the meta-prompt that sits above each plan/do cycle and never moves while the plans churn beneath it.

To be clear about ordering: *orientation* comes before the verifier, but the *goal work* comes after. You almost always need to look around first — read the code, skim the docs, see who's on the list — to know what's even checkable. That exploring is encouraged; you can't write a concrete verifier for a system you haven't seen. What waits for the verifier is the actual work of moving toward the goal.

## Why this works

- **It's falsifiable.** A good verifier can't be satisfied by vibes or by a confident summary. Premature "I think that's done" gets caught the moment you actually run it.
- **Intent stays still while plans are disposable.** The verifier is the durable artifact; any given plan is a cheap, regenerable guess at how to satisfy it. When a plan fails, you don't lose the goal — you replan against the same fixed target.
- **It forces clarity of done up front.** The act of writing the verifier surfaces every ambiguity in the goal *before* you've spent effort — the hidden requirements, the edge cases, the "wait, what does success even look like here."
- **It separates *what true looks like* from *how to get there*.** The verifier owns the first; the plan owns the second. Keeping them apart stops you from quietly redefining success to match whatever you happened to build.

## Step 1 — Find what "done" actually means

Take the task and push on it until you can name an **observable end-state**, not an activity. "Improve the onboarding" is an activity. "A new user reaches their first successful action in under 60 seconds, measured by X, with no dead-ends in the flow" is an end-state.

Ask: *If I were a skeptic who'd never trust my own report, what would I look at to be convinced this is genuinely done?* Outputs of commands, contents of files, behaviors I can trigger, tests that pass, numbers that cross a threshold. If the answer is "I'd just kind of look and feel like it's good," dig further or accept that this goal is subjective (see the bottom).

For anything non-trivial, surface the verifier to the user for a quick beat of confirmation before you commit to it — a wrong verifier wastes the whole loop, and it's cheap to catch now. This mirrors writing the test before the code: confirm the test captures the intent first.

## Step 2 — Write the verifier

Write a prompt that someone (you, next cycle, with no memory of this conversation) could run cold to decide whether X holds. Good verifiers share these properties:

- **Self-contained.** It names the concrete things to check — paths, commands, endpoints, conditions — so it works without the surrounding conversation. If it only makes sense to *you, right now*, it'll rot by the next cycle.
- **Checks end-state, not method.** It must verify the goal independent of how the goal was reached. A verifier that checks "did I run these steps" is just the plan wearing a disguise — still open-loop. Check the *result* the steps were supposed to produce.
- **Observable and concrete.** Prefer things you can witness over things you'd assert. `rg -i password logs/ returns nothing` beats "logs are clean."
- **Adversarial.** Write it as the skeptic trying to prove X is *not* done. That's what gives it teeth — it should be able to fail.
- **Separates necessary from nice-to-have.** Mark which conditions are required for "done" vs. which are bonus, so a partial pass is legible.
- **States its verdict format.** Per-condition pass/fail plus an overall verdict, so re-running it gives a clean read each time.

**Bad verifier:** "Check that login works."

**Good verifier:**
```
Run `npm test -- auth` — all tests pass.
Start the server. POST /login with valid creds → 200 + a JWT whose payload
  includes userId and exp. POST with invalid creds → 401, no token.
`rg -i password logs/` returns nothing (no plaintext creds leaked).
Required: all of the above. Nice-to-have: rate-limit kicks in after 5 failures.
Verdict: PASS only if every Required line holds.
```

This generalizes past code. A verifier for a non-technical goal — say, *"the casting list for the launch is done"*:
```
A ranked list of 15–25 names exists, grouped into outreach waves.
Every name has: relationship strength (warm/cold), the role they'd play,
  and the specific reason they're on the list (not "would be great").
Wave 1 is people we can reach this week through a warm intro — name the intro path for each.
No name appears whose "reason" is generic enough to apply to anyone.
Required: all of the above. Nice-to-have: a drafted opening line per Wave 1 name.
Verdict: PASS only if every Required line holds.
```
Same discipline: observable conditions, end-state not activity, able to fail.

Write the verifier down — into a scratch file (e.g. `GOAL.md`) or the top of your working notes — so each cycle re-reads the *actual text*, not a softened memory of it.

## Step 3 — Set it as the goal

From here, the verifier is the north star. Every plan exists only to make it pass; every "am I done?" is answered by running it, never by introspection.

## Step 4 — Run the loop

```
loop:
  plan   — given the current verifier failures, what's the smallest move toward passing?
  do     — execute that move
  verify — actually RUN the verifier against the new state, top to bottom
  if pass: done.
  if fail: read exactly which conditions are still false, replan, repeat.
```

The discipline that makes this work: **re-run the verifier literally each cycle.** Reading the text again and checking the world against it is the whole point — grading from memory or from your own optimism is the failure mode this skill exists to prevent.

## Anti-patterns

- **The verifier in disguise.** It enumerates the steps you planned to take instead of the state those steps should produce. Still open-loop. Check outcomes, not activity.
- **Too vague to fail.** If you can't imagine the verifier returning FAIL, it isn't verifying anything. Sharpen it until it has teeth.
- **Grading from memory.** Declaring pass without re-running. The verifier only protects you if you actually execute it.
- **Moving the goalposts.** Editing the verifier to match what you built, because passing it honestly is hard. This is cheating, and it's the cardinal sin here. The one legitimate reason to change a verifier mid-loop: you discover it *mis-encoded the real goal* (too strict, too loose, testing the wrong thing). When that happens, say so out loud, fix the *specification*, and ideally re-confirm — don't quietly soften it to get a green light.

## When not to use this

If the task is trivial enough that writing the verifier costs more than just doing the task — or if the goal is genuinely subjective (taste, voice, aesthetics) where no honest verifier exists — skip it. Forcing a fake verifier onto a subjective goal is worse than admitting it needs human judgment. This skill earns its keep when the task is multi-step and the cost of confidently finishing the *wrong* thing is real.

## Relation to the other planning skills

`build`, `make`, the `Plan` agent, harness plan mode — these answer *"what's the plan?"* Plan-goal is the inversion that sits underneath any of them: it answers *"what does done look like, and how would I know?"* first, and lets the plan be whatever it needs to be. If you do end up in plan mode, the verifier is exactly the kind of thing worth putting in the plan you submit — it's the success criterion the plan is judged against.

`shaping` is the closer relative — it's also working the "what does done look like?" side, collaboratively iterating on the problem definition and requirements with the user. Use it when the goal itself is still fuzzy and needs to be discovered together; plan-goal then crystallizes the shaped requirements into a single runnable verifier you check against each cycle. Shaping figures out what you want; plan-goal makes "got it" falsifiable.
