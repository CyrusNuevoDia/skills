# Capitalization, abbreviations, and names

## General capitalization

- Follow standard American English capitalization rules; don't capitalize unnecessarily. Before capitalizing a word, ask why (and whether) it should be capitalized.
- Don't rely on a capitalization difference to convey meaning (e.g., *Pod* the Kubernetes unit vs. *pod*); casual readers miss the distinction.
- Don't use all-uppercase except in official names, abbreviations that are always all-caps, or when referring to code that uses all-caps.
- Don't use camel case except in official names or when referring to code that uses it.

## Titles and headings

- Use sentence case in titles and headings: capitalize only the first word, the first word after a colon in a subheading, and proper nouns or terms that are always capitalized.
- Don't end a title or heading with a period.
- When referencing a title or heading from a document that follows this guide, use sentence case even if the original uses title case. When referencing a source that doesn't follow this guide, keep its original capitalization.

## Colons

Begin the first word after a colon in lowercase, unless it's a proper noun, a heading, a quotation ("Arthurian wit: 'Bring me yon sworde'"), or text following a label like *Caution* or *Note*.

## Figures, glossaries, lists, tables

- Use sentence case for captions and for labels, callouts, and other text in images and diagrams.
- Use lowercase for glossary and index terms unless a term is a proper noun; use sentence case for glossary definitions.
- Use sentence case for items in all types of lists.
- Use sentence case for all table elements: contents, headings, labels, captions.

## Hyphenated words

When a hyphenated word starts a sentence or heading, capitalize only the first element, unless a later element is a proper noun or proper adjective.

## Casing style names

Don't use casing style names like *camel case* or *snake case* — they don't localize and aren't standardized. State the requirement and give an example.
✅ Recommended: Enter the value in the format where there are no spaces between words and the first letter of each word is capitalized — for example, `AssertionAccount`.

## Abbreviations

Abbreviations include acronyms (pronounced as words: *NATO*, *scuba*), initialisms (pronounced letter by letter: *CIA*, *FYI*), and shortened words (*Dr.*, *etc.*, *min*, *CA*). The acronym/initialism distinction rarely matters; "acronym" covers both.

- Short versions of words (*app*, *demo*, *sync*) are not abbreviations — no period after them. If unsure, use the speaking test: if you say the short version as a word, treat it as a word.
- Use standard acronyms and initialisms that save the reader time; if the reader has to think about an abbreviation, it slows comprehension.
- Don't abbreviate terms unrelated to the document's main topic.
  ✅ Recommended: The internet of things (IoT) service can even be used for connecting to sensors in low Earth orbit.
  ❌ Not recommended: The IoT (internet of things) service can even be used for connecting to sensors in LEO (low Earth orbit).
- Be wary of specialized abbreviations readers might not understand (see the guidance on jargon).

### Spelling out terms

- Spell out an unfamiliar abbreviation on first mention with the abbreviation in parentheses: *Border Gateway Protocol (BGP)*. Use the abbreviation alone afterward.
- If a term appears only once, include the abbreviation only if it's as common as the spelled-out form.
- If the first mention is in a heading or title, you may use the abbreviation there and spell it out in the first paragraph after.
- Consider the audience: spell out when the doc will be translated or read by non-experts; don't spell out terms the audience already knows (e.g., API for developers). Don't spell out when the expansion doesn't help (e.g., *portable document format* for PDF).
- Rarely need spelling out: AI, API, DVD, file formats (PDF, XML), HTML, PC, RAM, REST, byte units (MB, MiB, GB, GiB), URL, USB.

### Formatting introductions

- Italicize both the spelled-out term and the abbreviation.
  ✅ Recommended: Establish *Border Gateway Protocol* (*BGP*) sessions.
  ❌ Not recommended: Establish *Border Gateway Protocol* (BGP) sessions.
- Capitalize the spelled-out version only if it's a proper noun or conventionally capitalized — not just because the abbreviation is capitalized.
  ✅ Recommended: data manipulation language (DML)
  ❌ Not recommended: Data Manipulation Language (DML)
- Include the abbreviation in link text when linking.

### Abbreviations not to use

- Don't use *i.e.* or *e.g.*; write *that is* or *for example*.
- *etc.* is okay in some circumstances, but usually rephrase.
- Don't use internet slang (*tl;dr*, *ymmv*, *RTFM*); write out what you mean plainly.
- Use the most common form: if the spelled-out word is common, don't abbreviate (*approximately*, not *approx.*).
- Spell out shortened words and symbol substitutions.
  ✅ Recommended: made throughput 10 times faster. ❌ Not recommended: made throughput 10x faster.

### Periods, plurals, verbs, articles

- No periods with acronyms or initialisms.
- Put a period after a shortened word, except date/time abbreviations and country/state names (US, CA, DC).
- No period after abbreviations spoken as words (*app*, *sync*).
- Treat abbreviations as regular words for pluralization (add *es* after s, sh, ch, x).
- Don't use abbreviations as verbs.
  ✅ Recommended: Use SSH to log in to your remote shell. ❌ Not recommended: Then ssh into your remote shell.
- Choose *a* or *an* by the pronunciation most common for your audience ("a SQL", "a FHIR", "an SAP").

## Product names

- Write Google-style product names in title case (every word capitalized except prepositions and articles), except when matching a UI label.
- Follow the official capitalization for names of brands, companies, software, products, services, features, and terms defined by their owners or communities (e.g., in a Kubernetes context: "A Job creates one or more Pods").
- If an official name starts lowercase (*macOS*), keep it lowercase even at sentence start — but prefer rewriting so it doesn't start the sentence.
  ✅ Recommended: You can use macOS to run the app. ❌ Not recommended: macOS can run the app.
- Feature names are generally lowercase; capitalize only if officially capitalized or matching a UI label. When unsure, follow the precedent set by existing docs.
- Use the full trademarked product name; don't abbreviate product names except to match a UI label, and then make clear which product you mean.
- Consider using a general term instead of repeating a product name (after establishing *Anthos Service Mesh*, discuss *a service mesh*).
- Don't use *the* before a product name unless the name modifies something else; do use *the* before tool and API names.
  ✅ Recommended: Using Cloud Datastore with Cloud Dataproc; The Cloud Datastore options page; The Transcoder API; The `gcloud` CLI.
  ❌ Not recommended: Using the Cloud Datastore with Cloud Dataproc.
- With indefinite articles, match the article to the actual first word: *an Anthos Service Mesh environment*, *a Service Mesh environment*.
- It's okay to call products services (*the Compute Engine service*), but use product names if "services" is ambiguous.
- Don't use product or feature names as verbs.

## Trademarks

- Follow the trademark owner's usage guidelines for marking and attribution.
- Use a trademark only as a modifier of a noun, never as a noun by itself or as a verb.
- Never form a possessive or plural from a trademark or alter it in any way.
  ✅ Recommended: Another option is to use a Chromebook notebook computer.
  ❌ Not recommended: Another option is to use a Chromebook. / Chromebook's features rely on an internet connection. / ... google "notebook computers".

## Filenames and file types

- Make file and directory names lowercase — case-sensitive filesystems treat `Impersonate-Service-Accounts.html` and `impersonate-service-accounts.html` as different files.
- Separate words with hyphens, not underscores; search engines read hyphens as spaces, underscores hurt SEO.
- Use only standard ASCII alphanumeric characters.
- Don't use generic names like `document1.html`.
- Consistency exception: if a directory already uses underscores (`lesson_1.jd` ...), it's okay to add `lesson_4.jd`; otherwise use hyphens.
  ✅ Recommended: `avoiding-cliches.jd` — ❌ Not recommended: `avoidingcliches.jd`, `avoidingCliches.jd`, `avoiding-clichés.jd`
- Tool-generated filenames that follow other conventions are acceptable exceptions.
- When referring to a specific file: use code font, add the word *file* after the name, keep the exact spelling even if it breaks naming guidelines, and introduce any included sample with a sentence naming the file ("In the following `build.sh` file, ...").
- Don't use file types as verbs. ✅ Recommended: Extract a zip file. ❌ Not recommended: Unzip a zip file.
- Refer to file types by their formal names, not extensions.
  ✅ Recommended: a PNG file, a Bash file. ❌ Not recommended: a `.png` file, an `.sh` file.

### File type names by extension

- **.adoc** — AsciiDoc file
- **.csv** — CSV file
- **.exe** — executable file
- **.gif** — GIF file
- **.img** — disk image file
- **.ipynb** — IPYNB file
- **.jar** — JAR file
- **.jpg/.jpeg** — JPEG file
- **.json** — JSON file
- **.md** — Markdown file
- **.pdf** — PDF file
- **.png** — PNG file
- **.ps** — PowerShell file
- **.py** — Python file
- **.sh** — Bash file
- **.sql** — SQL file
- **.svg** — SVG file
- **.tar** — tar file
- **.tf** — Terraform file
- **.tiff** — TIFF file
- **.txt** — text file
- **.wasm** — Wasm file
- **.yaml** — YAML file
- **.zip** — zip file
