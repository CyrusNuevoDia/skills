# Text formatting, headings, lists, tables, and notices

Distilled from the Google developer documentation style guide.

## Highlights (core principles)

### Tone and content
- Be conversational and friendly without being frivolous.
- Don't pre-announce features or releases in documentation.
- Use descriptive link text, not "click here" or bare URLs.
- Write accessibly and for a global audience.

### Language and grammar
- Use second person: "you" rather than "we."
- Use active voice; make clear who's performing the action.
- Use standard American spelling and punctuation.
- Put conditions before instructions, not after.

### Formatting and organization
- Use sentence case for document titles and section headings.
- Use numbered lists for sequences, bulleted lists for most other lists, description lists for pairs of related data.
- Use serial commas.
- Put code-related text in code font; put UI elements in bold.
- Use unambiguous date formatting.
- Provide alt text for images; use high-resolution or vector images when practical.

## Bold

- Use bold (`<b>` or `**`) only for UI elements and run-in headings, including the label at the start of a notice ("**Note:**").
- In Markdown, use `**`, not `__` — double underscores are hard to distinguish in an editor.
- Don't use bold for emphasis, new terms, or words-as-words — use italics.

## Italics

- Use italics sparingly.
- Italicize a new term on first mention when you define it immediately. Don't use bold or quotation marks.
  - ✅ Recommended: A *Clos network* is a kind of multistage circuit switching network.
- Italicize words as words (referring to a word, phrase, or letter itself). Don't use bold or quotation marks.
  - ✅ Recommended: Don't use *&* (ampersand) as a conjunction. Use the word *and* instead.
  - ✅ Recommended: To form a possessive of a singular noun, add *'s* to the end of the word.
- For emphasis, use italics, not bold or underline — but usually your words can carry the emphasis without it. In HTML use `em` (semantic emphasis); in Markdown use underscores.
- In Markdown, prefer `_` over `*` for italics so humans can distinguish italics from bold in source.
- Italicize titles of books, movies, web series, and other full-length works, unless they're part of a link.
- Italicize mathematical variables (*x* + *y* = 3) but not operators like the plus sign.
- Italicize version variables — for example, version 1.4.*x*.

## Underline

- Reserve underlining for link text. Never underline for emphasis.

## Code font

- Use `<code>` in HTML or backticks in Markdown for inline code and user input; use code blocks (`<pre>` or fenced blocks) for code samples.
- Put in code font: filenames, class names, method names, HTTP status codes, console output, and placeholders.
- Don't override or modify font styles inline; don't override global font type, size, or color. Use semantic HTML or Markdown, not manual monospace styling.

## Capitalization and quotation marks

- Use American English style for general capitalization.
- Use sentence case in all headings, titles, and navigation.
- Use all-capitals for placeholders (`PROJECT_ID`).
- Punctuate quotations American English style.
- Put titles of shorter works (articles, episodes) in quotation marks, unless they're part of a link.

## Other punctuation

- Don't use *&* as a conjunction or shorthand for *and* — including in headings and navigation. Exception: when a UI element or menu name itself uses *&*.
- Put quotation marks and end punctuation outside of link text.

## Headings and titles

### Phrasing
- Use sentence case for all headings and titles.
- Make headings descriptive and unique so readers can navigate between pages and sections.
- Task-based heading: start with a bare infinitive (base-form verb). ✅ "Create an instance" ❌ "Creating an instance"
- Conceptual heading: use a noun phrase that doesn't start with an *-ing* verb. ✅ "Migration to Google Cloud" ❌ "Migrating to Google Cloud"
- If a section isn't required for all users, prefix the heading with *Optional:*. ✅ "Optional: Customize your alias" ❌ "Customize your alias (optional)"
- Title the document by its primary purpose; a tutorial with a conceptual intro still gets a task-based title. Mixing task-based and conceptual heading styles in one document is fine — phrase each section for its content.
- Avoid *-ing* verb forms as the first word of any heading or title — they translate inconsistently and add length. ✅ "Transfer data sets" ❌ "Transferring data sets". Gerunds with no better alternative (Billing, Pricing) are OK, as are *-ing* forms later in a heading ("Introduction to BigQuery monitoring").
- Use one unique h1 per page; don't repeat the exact page title in a section heading (page "Create and start VM instances", sections "Create a VM" and "Start a VM").

### Format
- Keep punctuation simple — punctuation in a heading is a sign it's too complicated; rewrite.
- Limit abbreviations: use one in a title only if it's the better-known form, and define it in the first paragraph after the heading.
- Don't use numbers in headings to indicate sequence; rely on hierarchy and order.
- Avoid code items in headings; if you must, add a descriptive noun to the code-font item.
- Don't put links in headings.

### Hierarchy
- Use heading tags (`#`/`##`/`###`) to structure content, never to change visual formatting.
- Don't skip heading levels (an h3 goes only under an h2).
- Don't use empty headings — follow every heading with content before the next subheading.
- When introducing a group of subsections, use the phrase *the following sections*, not *this section* or *these sections*.

## Heading link targets (anchors)

- Add a custom anchor when you want a shorter anchor, when content is frequently linked, or when revising a heading whose auto-generated anchor would change and break links.
- Anchor text: lowercase letters, hyphens between words, descriptive but concise.
- HTML: `<section id="...">` wrapping the heading, or `<h2 id="...">`. Markdown: `## Heading {: #anchor-id }`.
- When revising a heading with an auto-generated anchor, add a custom anchor that keeps the old ID string so inbound links keep working. Don't change an existing custom anchor unless it contains a term you must remove; if you do change it, update all links that use the old anchor.

## Notices (notes, cautions, warnings)

- Use notices sparingly — readers skip offset elements. If unsure, write the information as regular text first and then decide.
- Don't stack notices: two or more in a row lose visual distinctiveness; reorganize the content instead. Don't nest notices.
- Notice types:
  - **Note** — a useful but non-critical aside or tip.
  - **Caution** — proceed carefully ("We don't recommend using a broad 0.0.0.0/0 range").
  - **Warning** — stronger: "don't do this" or irreversible consequences (data loss, money, security breach).
  - **Success** — a successful action or error-free status; only in interactive or dynamic content, never static pages.
- Use a note only when all are true: the information is relevant but not necessary (readers who skip it still succeed), it doesn't derail the reader onto another path, and it isn't part of the flow of the surrounding text.
- Don't use notes for: cross-references; prerequisites or earlier steps (put those before the step); a full procedural step; information necessary to succeed; or content in flow with the preceding text (like expected results).
- Start the notice with a bold label ("**Note:**").

## Lists

### Choosing a list type
- Numbered list: sequence matters (ordered steps, phases, priorities). Nested sequential lists use lowercase letters or Roman numerals.
- Bulleted list: nonsequential items. Make clear whether every item is required.
- Description list (`dl`/`dt`/`dd`): term/description pairs, such as a glossary.
- Description list with bolded run-in headings: terms with explanations when you want to highlight concepts or save space ("**Emu**: the best kind of bird").
- Don't use a list for a single item; one item isn't a list.

### Introducing lists
- Introduce a list with a complete sentence, not a partial sentence completed by the list items.
  - ✅ Recommended: "Use the **Submit** button for any of the following purposes:" ❌ Not recommended: "Use the **Submit** button to:"
  - ✅ "To get the USB driver, follow these steps:" ❌ "To get the USB driver:"
  - ✅ "If you need to add an instance manually, do the following:" ❌ "If you need to add an instance manually:"
- End the intro with a colon if it immediately precedes the list, a period if material intervenes.
- If the heading right before the list gives enough context, an introductory sentence is optional — don't add a redundant one.

### Structure and punctuation
- Use parallel syntax and structure for all items in a list.
- Start each item with a capital letter, unless case itself is meaningful.
- End each item with a period (or other sentence-ending punctuation), except: single-word items, items with no verb, items entirely in code font, and items that are entirely link text or a document title.
- If punctuation comes out inconsistent, rewrite for parallel construction or punctuate every item.
- Multi-paragraph list items are fine; use `p` elements, not `br`.
- Avoid manually numbering items (`value` attribute) — renumbering breaks when items change. Use `reversed` on `ol` for reverse order.

### Description lists
- Don't add an explanatory phrase to only one item — convert the whole list to a description list.
- Capitalize each term; don't end the term with a period. End each description with a period.

### Run-in headings
- Start the run-in heading with a capital; end it with a period or a colon, consistently within the list.
- After a period, start the description with a capital and end with a period. After a colon, start lowercase; end with a period only if the description has a verb or is a standalone thought.
- Don't use a dash to set off the description — use a colon.

### Comma-separated lists in prose
- Use serial commas.
- Don't end with *etc.* or *and so on*; signal non-exhaustiveness in the intro instead.
  - ✅ Recommended: "The service processes data like event logs, clickstream data, and e-commerce transactions."
  - ❌ Not recommended: "The service processes event logs, clickstream data, e-commerce transactions, etc."

## Tables

### List or table?
- Single-unit items → numbered, lettered, or bulleted list.
- Pairs of related data → description list (or sometimes a table).
- Three or more pieces of related data per item (e.g., parameter name, type, description) → table.

### Where not to use tables
- Don't use tables for page layout, for code snippets, or in the middle of a numbered procedure.
- One row of material usually shouldn't be a table (reference-doc layout consistency is the exception); one column should be a list.
- Don't split a long one-dimensional list into multiple columns to save space — tables are for genuinely two-dimensional data.

### Introducing and placing tables
- Introduce a table with a complete sentence describing its purpose (screen readers don't all preannounce tables); colon if the table follows immediately, period if material intervenes. Refer to position: *the following table*, *the preceding table*.
- Don't put a table in the middle of a sentence.
- Avoid footnotes; if needed, place them immediately after the table.

### Captions
- One table in a document needs no caption; keep it adjacent to the text that refers to it.
- With multiple tables near each other, caption each with a `caption` element: "**Table 1.** Prehistoric birds" — sentence case, no ending period. Refer to tables by number ("as shown in table 2"); lowercase *table* mid-sentence.

### Formatting
- Don't style the table element; use `th` for header cells rather than visual styling.
- Don't merge cells — no `colspan` or `rowspan`.
- Sort rows logically, or alphabetically if there's no logical order.
- Split long or complicated tables (multiple header rows/columns) into multiple tables.
- Never convey new information through images or symbols alone; always provide descriptive alt text.
- Multi-paragraph cells use `p` elements, not `br`.

### Column heads
- Sentence case, concise, no end punctuation.
- Use headings only for the first column and first row, with `th` and the `scope` attribute for accessibility.

### Responsiveness and linking
- Use CSS that adapts to viewport sizes where possible.
- Avoid linking to tables; refer to them by number instead.
