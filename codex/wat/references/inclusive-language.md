# Inclusive, Accessible, and Global Writing

Distilled from the Google developer documentation style guide pages on inclusive documentation, accessibility, and writing for a global audience.

## Gendered language

- Avoid unnecessarily gendered language; use gender-neutral pronouns in narrative examples.
  - ✅ Recommended: "Equipment installation takes around 16 person-hours." — ❌ Not recommended: "…16 man-hours."
  - ✅ Recommended: "Build AI that benefits humanity." — ❌ Not recommended: "…benefits mankind."

## Figurative language

- Use simple, precise language; avoid idioms, figures of speech, and jargon that can be misunderstood or resist translation.
- Use terms that are established industry standards and widely understood by the target audience.
- Don't use metaphors, and don't use a term in a metaphorical sense — use words in their primary sense (e.g. avoid the "pets versus cattle" metaphor for stateful vs stateless systems).
- Watch word choice especially when aiming for a friendly, informal tone — that's when figurative language slips in.

### Ableist language

- Don't use ableist words such as *crazy*, *insane*, *blind to*, *cripple*, *dumb*, *sanity-check*, *dummy*. Choose a more accurate word for the context.
  - ✅ "give everything a final check for completeness and clarity" — ❌ "give everything a final sanity-check"
  - ✅ "some baffling outliers in the data" — ❌ "some crazy outliers"
  - ✅ "It slows down the service" — ❌ "It cripples the service"
  - ✅ "Replace the placeholder in this example" — ❌ "Replace the dummy variable"

### Graphic or metaphorical language

- Avoid unnecessarily graphic or violent terms when a more precise term exists. If an industry term like *STONITH* must appear, mention it once, de-emphasized in parentheses, on first explanation: "This approach might require you to fence failed nodes (sometimes referred to as *STONITH*)."
- Prefer the most precise, well-understood term; some established terms (e.g. *terminate*, *execute*) have specific technical meanings with no accurate synonym — keep those.
  - ✅ "If the connection doesn't respond, check for errors." — ❌ "If the connection hangs…"
  - ✅ "Point to **File**, and then click **New**." — ❌ "Hover over **File**, and hit **New**."

## Diverse and inclusive examples

- Use diverse names, genders, ages, and locations in examples; write for a global audience.
- Don't be culturally US-specific: avoid referring to specific holidays, cultural practices, sports, or figures of speech.
- For older adults, avoid *the elderly*, *the aged*, *seniors*, *senior citizens*, *"80 years young"*; use *older adults* or *aging population*, or mention relative age only when relevant.

## Features and users

- Don't refer to people in divisive ways (e.g. *native speakers* vs *non-native speakers* of English) — usually you can describe the feature in terms relevant to anyone.
- Avoid socially charged terms for technical concepts: *blacklist*, *native* feature, *first-class citizen*, even when widely used.

### Replacing established non-inclusive terms

- If replacing an established term could confuse readers, name the non-inclusive term once in parentheses on first use, then use the inclusive term throughout: "add them to an allowlist (sometimes called a *whitelist*)"; "a Jenkins controller (master) handles HTTP requests".
- Often, rewrite the sentence instead of swapping words.
  - ✅ "You can allow requests from a range of IP addresses by entering a CIDR block." — ❌ "You can allowlist a range of IP addresses…"

### Non-inclusive terms embedded in code

- When a non-inclusive term is a code name or keyword, minimize its use and never write it outside code font.
- On first reference, name the code item directly, in code font, in parentheses if possible: "create a parent node (which is named `master` in the file)"; "Start the replica by using the `START SLAVE` statement."
- In subsequent mentions, use the preferred term (*parent node*, *replica*); refer to the literal keyword only in code font.

## Disability and accessibility topics

- Don't describe people without disabilities as *normal* or *healthy*; use *nondisabled person*, *sighted person*, *hearing person*, *person without disabilities*, *neurotypical person*.
- Research and use the terms communities prefer. Generally avoid terms that remove personhood (*the disabled*, *a quadriplegic*); use *people with disabilities*, *a quadriplegic person*. But many communities (autistic, blind, Deaf) prefer identity-first language, and capitalization varies — follow the community's preference.
- Avoid terms that project judgment about disability: *victim of*, *suffering from*, *wheelchair-bound*. Use neutral terms: *experiencing*, *living with*, *uses a wheelchair*.
- Avoid euphemisms and patronizing terms: *physically challenged*, *special*, *differently abled*, *handi-capable*.
- Use *see* to refer to links and cross-references (not *view* or other visual-only substitutes).

## Accessible documentation

### General

- Ensure every part of a document (tabs, buttons, interactive elements) is reachable with keyboard alone.
- Test documentation with a screen reader.
- Use semantic HTML tagging (e.g. `em` only for emphasis, not for italics); prefer native HTML elements over custom styles.
- Avoid unnecessary font formatting — screen readers announce text modifications.
- Explicitly document a product's specialized accessibility features.
- Don't force line breaks within sentences and paragraphs.
- Avoid camel case and all caps where possible — some screen readers read capitals letter by letter, and some languages are unicase.
- Don't rely on punctuation to carry meaning; avoid exclamation marks, question marks, and semicolons where possible.
- Don't use *&* instead of *and* in headings, text, navigation, or tables of contents (OK when a UI element uses it, in space-constrained table headings or diagram labels, and in code).

### Ease of reading

- Break up walls of text with paragraphs, headings, and lists.
- Use sentences under about 26 words.
- Define acronyms and abbreviations on first use and when used infrequently.
- Use parallel structures for similar things (e.g. start each list item the same way).
- Put the distinguishing, important information in a paragraph's first sentence.
- Avoid double negatives and exceptions to exceptions.
  - ✅ "You can continue without a path." — ❌ "A missing path won't prevent you from continuing."
- Left-align text; don't center or full-justify.

### Headings and titles

- Use descriptive, unique headings and titles.
- Use a heading hierarchy and don't skip levels (`h3` only after `h2`); use CSS, not a wrong heading level, for visual changes.
- No empty headings or headings with no content; tag headings with real heading elements (`h1`…/`#`…); use a level-1 heading for the page title.

### Links

- Use meaningful link text that makes sense out of context; never *click here* or *read this document*.
- Use *see* for links and cross-references.
- Explain unexpected link behavior (downloads a file, opens a new tab, jumps within the page).
- Avoid adjacent links; separate them with a character.

### Lists

- In procedures, make each instruction its own list item; use lists so steps are easy to follow.

### Images

- Give every image an alt attribute; alt text should summarize the image's intent; use empty alt text for purely decorative images.
- Don't present new information only in images — always provide an equivalent text explanation.
- Don't repeat images unless necessary.
- Don't use images of text, code, or terminal output — use actual text.
- Prefer SVG over PNG; SVGs stay sharp when zoomed.

### Videos, recordings, and GIFs

- Provide captions, transcripts, or descriptions of audio and video content; ensure captions can be translated.
- Don't use flickering or flashing elements — they can cause motion sickness or seizures.

### Buttons, UI navigation, and forms

- Use the native HTML `button` element for form-submission buttons.
- When documenting menu paths with `>`, add an `aria-label` so screen readers say "and then" rather than "greater than".
- Label every input field with a `label` element, placed outside the field.
- Form-validation errors should state what went wrong and how to fix it ("Name is a required field.").

### Tables

- Introduce a table in the preceding text — not all screen readers preannounce tables.
- Use `th` headings for the first row and first column only; with both row and column headings, mark heading cells with `scope`; with multiple heading rows, use `headers` with unique IDs.
- Avoid tables in the middle of numbered procedures.
- Don't merge cells (`colspan`/`rowspan`).
- Don't use tables unless they're the best way to present the information.
- Don't convey information in tables via images or symbols alone; give the image or symbol a descriptive alt attribute.

### Interactive elements

- Introduce an interactive element (like an expander) in the text before it: "To see a list of requirements, expand the **Requirements** section."

### Custom CSS and JavaScript

- Use standard site styles and scripts where possible.
- Meet accessible color-contrast ratios (4.5:1 for text).
- Don't use `visibility:hidden` or `display:none` — both hide content from screen readers.
- Avoid mouseover events; if used, add focus and blur events for keyboard users.
- Ensure style-driven ordering and positioning matches the DOM and reading order.

### Document rendering

- The document must convey its full meaning without sound, using only sound, without images, without color, using only a keyboard, with screen magnification, and without punctuation.
- Don't use color, size, location, or other visual cues as the primary carrier of information; if color, an icon, or outline conveys state, add a secondary cue such as a text-label change.
- Refer to buttons and elements by their label; for elements with no text, use the `aria-label`, don't describe the visual.
  - ✅ "Click **Save**." / "Click **Notifications**." — ❌ "Click the bell icon."
- Don't use directional language (*above*, *below*, *right-hand side*) — it fails for screen readers and for right-to-left locales. Use *earlier*, *preceding*, or *following*.
  - ✅ "In the preceding diagram…" — ❌ "In the diagram above…"
- If a UI element is hard to find, provide a screenshot rather than describing its position.
  - ✅ "Click menu **Menu**." — ❌ "In the left-side panel, click the button with three lines."

## Writing for a global audience

Write in US English with localization, translation, and internationalization in mind. Localization adapts a product for a country (currencies, units); translation converts language; internationalization designs the product to minimize localization effort.

### Simpler words, shorter sentences

- Use the simple word: *start* not *commence*, *so* not *consequently*, *use* not *utilize* or *leverage* (unless conveying a special sense, e.g. "utilizes up to 100% of available CPU").
- Use one word where a phrase says the same: *some* or *many*, not *a number of*.
- Write shorter sentences — translations run longer than the English, and long sentences impair understanding, break layouts, and raise translation cost.

### Phrasal verbs

- Avoid phrasal (compound) verbs when a simpler verb exists; exceptions include *set up*, *log in*, *sign in*.
  - ✅ "This document uses the following terms:" — ❌ "This document makes use of the following terms:"

### Modifiers

- Don't stack modifiers; don't use more than two nouns to modify another noun.
  - ✅ "A cloud-native DevSecOps pipeline in a hybrid environment" — ❌ "A hybrid cloud-native DevSecOps pipeline"
- Place modifiers like *only* immediately before what they modify; rephrase if still ambiguous.
  - ✅ "Request only one token." — ❌ "Only request one token."

### Voice and tense

- Use present tense and avoid complex or uncommon verb forms.
- Use active voice — passive voice hides who's supposed to act.

### Words in their primary sense

- Don't use one word to mean different things; in particular, don't use the same word as noun and verb nearby. Watch multi-sense words like *once*, *while*, *as*, *since*.
- Avoid directional language (*above*, *below*) in procedural documentation.

### Helper words and optional words

- Use qualifying nouns for technical keywords: "the `example.yaml` file", not bare "`example.yaml`".
- Repeat a word when the redundancy aids comprehension: "If the VM has started and if you're able to connect…"; "both IAM segmentation and network segmentation"; repeat "whose" for each clause in a list of conditions.
- Keep helper words (*then*, *that*, *of*) that conversational English drops: "If the attribute key is not found, then the default value is returned."; "assumes that you have"; "Identify all of the datasets."; "Start the profiler, and then run the app."
- Don't omit relative pronouns (*that*, *which*).
  - ✅ "update the rules that you previously defined" — ❌ "update the rules you previously defined"

### Abbreviations and pronouns

- Define abbreviations — spell terms out at least on first use; they don't translate well.
- Clarify pronoun antecedents; replace an ambiguous pronoun with the noun.
  - ✅ "…make sure that the ad is targeted." — ❌ "…make sure that it's targeted."

### Apostrophes

- Don't form plurals with *'s*, don't pluralize or use possessives with company, product, or feature trademarks, and don't use uncommon contractions.

### Address the reader

- Use *you*, not *the user* or *they* (unless referring to someone using the software the reader is building).
- Provide context — don't assume the reader already knows the topic.
- Avoid negative constructions; tell readers what they can do, not what they can't.

### Consistency

- Use the exact same term (and capitalization) for a concept everywhere — inconsistent terminology reads as different concepts and raises translation cost.
- Use standardized phrases for common tasks (introducing links, output, code samples).
- Use standard subject + verb + object word order; keep subject and verb near the sentence start.
- Put the conditional clause first: state the circumstance before the instruction.
- Make list items parallel in structure, capitalization, and punctuation.
- Use bold and italics consistently; don't switch mid-document between formats; keep capitalization consistent.

### Global inclusivity

- Write dates and times unambiguously.
- Don't refer to holidays, cultural practices, or sports unless certain they're known worldwide.
- Use a diverse set of example names.
- Avoid colloquialisms, idioms, and slang (*ballpark figure*, *back burner*, *hang in there*).
- Avoid humor — it's culturally specific and hard to translate.
- Avoid geographically specific references like seasons (August isn't summer in the southern hemisphere).

### Images and translation

- Use screenshots and text in figures sparingly — images don't get translated. Convey any new information in text, never only in a figure.
