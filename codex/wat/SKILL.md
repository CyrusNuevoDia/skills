---
name: wat
description: Style guide only for prose intended for a human reader, distilled from the Google developer documentation style guide. Use before writing substantial human-facing deliverables — docs, README files, UI copy, error messages, release notes, and announcements — and when the dev's entire message is "wat" (optionally pointing at specific human-facing text), which means rewrite that text against these rules. Never use for agent-to-agent communication, including prompts, task assignments, handoffs, orchestration messages, or machine-consumed instructions. Skip ordinary conversational replies, status updates, commit messages, and code-only turns.
---

# wat

This skill governs communication with humans. Apply it only when the target prose is intended for a human to read. Do not apply it to communication with agents or other machines, even if that text is long, polished, or written in natural language. Agent prompts, delegated task descriptions, handoffs, orchestration messages, tool instructions, and machine-consumed specifications must optimize for precise execution rather than this human-facing style guide.

Two ways in:

- **Writing mode** — you're about to produce prose a human will read and keep (docs, copy, errors, release notes). Apply the rules below as you write.
- **Wat mode** — the dev said "wat" after human-facing prose that you or another agent wrote. The immediately preceding human-facing output is the target unless they point elsewhere. If they point to agent-facing or machine-consumed text, this skill does not apply. If the target text was written to a file, edit the file in place; otherwise reply with the rewritten text and nothing else — no lecture, and explain a rule only if asked. Rewrite prose only: leave code, identifiers, command output, and quoted strings byte-for-byte intact. If "wat" follows unexpected program behavior rather than prose, they're asking about the behavior — don't rewrite anything.

The style in one breath: talk to the reader as "you", in active voice and present tense, like a knowledgeable friend who respects their time — plain, direct, and free of filler, hype, cuteness, and drama. Say what the software does and what the reader does, in that order of concreteness, and let the sentence end when the information does. Most "wat"s are a violation of one of the twelve rules below; the references exist for the long tail.

## The rules that catch most "wat"s

Apply these first — they cover the vast majority of weird-sounding output:

- **Second person, active voice, present tense.** "You can configure X", not "The user is able to configure X" or "X will be configured".
- **No filler or hype.** Delete "please", "simply", "easily", "just", "note that", "in order to", "leverage", "utilize", exclamation points, and any "It's that easy!" energy.
- **No cutesy, figurative, or dramatic language.** No metaphors, pop-culture references, wackiness, or "let's dive in". Say the thing plainly.
- **No anthropomorphism.** Code doesn't "want", "think", "know", or "complain". Say what it does: "the parser rejects input longer than 4 KB".
- **Timeless docs.** No "currently", "soon", "new", "as of this writing", or promises about future features. (Release notes and other time-stamped content are exempt — see voice-and-tone.md.)
- **Condition before instruction.** "If the build fails, check the log", not "Check the log if the build fails".
- **Sentence case** for headings, titles, and labels. Serial (Oxford) commas. Straight quotes. Em dashes, never en dashes.
- **Never drop articles.** "Open the file", not "Open file".
- **Modal precision.** "must" for requirements, "can" for ability, "might" for possibility. Avoid "should"; prefer present tense over "will" except for actions that genuinely happen later (see voice-and-tone.md).
- **"Lets you", not "allows/enables you to".** And put a noun after "this"/"these" — "set this value", not "set this" — and don't say "we" or "let's" for the reader.
- **Code font** for filenames, commands, flags, HTTP codes, and identifiers — and never inflect a code term ("`Server` objects", not "`Servers`").
- **When a word is in doubt,** check `references/word-list.md` — it has the A-Z allowed/banned list.

## References

For anything the list above doesn't settle, open the matching file — don't read them all:

| File | Covers |
| --- | --- |
| [word-list.md](references/word-list.md) | The A-Z word list: banned fillers, inclusive replacements, spelling and hyphenation calls (backend, sign-in vs sign in), can/may/might/must. Check here for any specific term. |
| [voice-and-tone.md](references/voice-and-tone.md) | Full tone do/don't lists, pronouns and antecedents, contractions, jargon, unverifiable claims, timeless-docs details. |
| [punctuation.md](references/punctuation.md) | Per-mark rules: colons, commas, dashes, ellipses, hyphenation of prefixes and compound modifiers, parentheses, quotation marks, semicolons, slashes. |
| [grammar-and-usage.md](references/grammar-and-usage.md) | Articles, prepositions, possessives, pluralization (APIs, OSes, no "key(s)"), sentence and paragraph structure, reference-doc verb forms. |
| [capitalization-and-names.md](references/capitalization-and-names.md) | Sentence case, abbreviations/acronyms (no i.e./e.g.), product names and trademarks, filename and file-type conventions. |
| [text-formatting.md](references/text-formatting.md) | Bold vs italics vs code font, heading phrasing, Note/Caution/Warning notices, list parallelism, tables. |
| [code-and-markup.md](references/code-and-markup.md) | Code-in-text rules, code-sample formatting, command-line syntax, placeholder conventions (UPPER_SNAKE), API reference comment phrasing, semantic HTML, Markdown vs HTML. |
| [procedures-and-ui.md](references/procedures-and-ui.md) | Step-by-step procedures (location > goal > action, menu paths like **File > New**), UI element names and verbs, screenshots and alt text. |
| [numbers-dates-units.md](references/numbers-dates-units.md) | Spell-out vs numerals, ranges, currency, dates and times (no numeric dates, ISO 8601), units, example phone numbers, math notation. |
| [links-and-references.md](references/links-and-references.md) | Link text (no "click here" or raw URLs), "For more information, see…" phrasing, external-link flagging, third-party content. |
| [inclusive-language.md](references/inclusive-language.md) | Inclusive word replacements, disability language, accessibility mechanics (alt text, ARIA, color cues), writing for translation. |
| [examples-and-placeholders.md](references/examples-and-placeholders.md) | Approved fictitious values: example.com/altostrat.com, gender-neutral names, reserved phone numbers and IP ranges, no foo/bar. |
| [principles.md](references/principles.md) | Precedence (project style > this guide > Merriam-Webster/Chicago/Microsoft) and when to break a rule for clarity. |
