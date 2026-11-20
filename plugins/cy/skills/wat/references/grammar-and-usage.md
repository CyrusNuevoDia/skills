# Grammar and Usage

## Articles (a, an, the)

- Include definite and indefinite articles (*a*, *an*, *the*) everywhere, including headings and titles — don't drop them for brevity. They aid comprehension and translation.
  - ✅ Recommended: Create a VM instance
  - ❌ Not recommended: Create VM instance
- Choose *a* vs *an* by pronunciation, not spelling: *a* before consonant sounds, *an* before vowel sounds. For abbreviations, base the choice on how the abbreviation is pronounced (as a word or spelled out) — *a SQL* but *an FAQ*.

## Prepositions

- Place a preposition wherever the sentence reads most naturally — ending a sentence with one is fine.
  - ✅ Recommended: …see the client library documentation for the language you're interacting with.
  - ❌ Not recommended: …the client library documentation for the language with which you're interacting.
- Include prepositions that increase clarity, omit unnecessary ones, and don't stack so many that the sentence gets cluttered.

## Possessives

- Form the possessive of a singular noun (even one ending in *s*) with *'s*: "each vector's record", "the storage class's quota".
- Form the possessive of a plural noun ending in *s* with an apostrophe only.
  - ✅ Recommended: Extend the models' capabilities.
  - ❌ Not recommended: Extend the models's capabilities.
- Form the possessive of a plural noun not ending in *s* with *'s*.
- Rewrite to omit a possessive that reads awkwardly.
  - ✅ Recommended: Analyze the business data. / The rule that the Federal Trade Commission (FTC) issued.
  - ❌ Not recommended: Analyze the businesses' data. / The Federal Trade Commission's (FTC's) rule.
- Never use *'s* to form a plural (see Pluralization).
- Don't form a possessive from a product, feature, or trademark name when describing function or performance — use the name as a modifier or rewrite with *of*.
  - ✅ Recommended: monitor Google Search performance / monitor the performance of Google Search
  - ❌ Not recommended: monitor Google Search's performance
- A company name may take *'s* ("Google's new office is nearby"), but not when the name is used as a trademark.
- Don't form the possessive of a code item — attach the possessive to the noun that follows it, or rewrite.
  - ✅ Recommended: the `wordCount` method's return value / the value returned by the `wordCount` method
  - ❌ Not recommended: `wordCount`'s return value

## Pluralization

- Use standard US English plural forms; never use *'s* to form a plural (it confuses plurals with possessives and contractions).
- Match verb number to the true subject in long or complex sentences.
  - ✅ Recommended: Confirm that the number of entries listed in the directory is accurate.
  - ❌ Not recommended: The efficiency of algorithms that process data sets depend on memory allocation.
- With compound subjects joined by *and* or *or*, choose singular/plural agreement correctly.
  - ✅ Recommended: The request payload and header information are logged. / Either the API keys or service account wasn't authenticated.
  - ❌ Not recommended: User authentication and authorization is processed by the security module.
- Use a plural after *one or more* ("If one or more tests fail…"); reword to "If any one test fails…" when clearer.
- Use a singular after *more than one*: "You can create more than one instance at a time."

### Plural abbreviations

- Pluralize acronyms and abbreviations like regular words, without an apostrophe.
  - ✅ Recommended: APIs, SKEs, IDEs — ❌ Not recommended: API's, SKE's, IDE's
- Add *es* when the abbreviation ends in *s*, *sh*, *ch*, or *x*: OSes, DISHes, DCCHes, BMXes.
- Keep the spelled-out term and its abbreviation matched in number: "virtual machines (VMs)", not "virtual machines (VM)".
- With units of measure, spell out the singular unit only for the number 1; use the plural for everything else, including 0 and decimals: 0 degrees, 0.5 degrees, 1 degree, 15 degrees.
- Don't pluralize a unit abbreviation used with a number: 64 GB, not 64 GBs. Put a (preferably nonbreaking) space between number and unit.

### Plural product, feature, and class names

- Don't form a plural or possessive of a trademarked product, feature, or company name.
- Don't pluralize class names — add a plural noun after them instead.
  - ✅ Recommended: `Intent` objects and `Activity` instances
  - ❌ Not recommended: `Intent`s / `Intents` / `Activities`

### Plurals in parentheses

- Don't write optional plurals like "key(s)" or "child(ren)". Pick singular or plural and stay consistent; if you must express both, write *one or more*.
  - ✅ Recommended: To find your API key, visit the **Credentials** page. / …a physical linecard, which can contain one or more ports.
  - ❌ Not recommended: To find your API key(s)… / …can contain port(s).

## Sentence structure

- State the circumstance, condition, or goal before the instruction, so readers can skip instructions that don't apply.
  - ✅ Recommended: For more information, see [document]. — ❌ Not recommended: See [document] for more information.
  - ✅ Recommended: To delete the entire document, click **Delete**. — ❌ Not recommended: Click **Delete** if you want to delete the entire document.
  - ✅ Recommended: If your app is in one of the following regions, custom domains might add latency: — ❌ Not recommended: Custom domains might add latency if your app is in one of the following regions:

## Paragraph structure

- Keep each paragraph to a single idea, expressed in the fewest words and sentences possible; break up walls of text for scannability.
- Use shorter sentences and shorter paragraphs — don't lengthen sentences to reduce sentence count.
- Treat a paragraph longer than 5–6 sentences as a signal it carries too much: split it or cut content. But don't split a paragraph that's genuinely one idea; a one-sentence paragraph is fine, and a longer one is fine if it stays on one idea.
- Put the most important information first in the paragraph (and in the sentence). Don't bury the key point at the end — readers don't read every word.
- Left-align text; don't center, right-align, or full-justify.
- Don't force line breaks (hard returns) inside sentences or paragraphs — they break at different widths and text sizes.

## Verb forms in reference documentation

- Phrase a method's main description as what the method does (third person: *gets*, *lists*, *creates*, *searches*), not as an imperative for the developer.
  - ✅ Recommended: tasks.insert: Creates a new task on the specified task list.
  - ❌ Not recommended: tasks.insert: Create a new task on the specified task list.
