# Punctuation

## Colons

- Use a colon to introduce closely related information, such as a list. The text before the colon must stand alone as a complete sentence.
  - ✅ Recommended: The fields are defined as follows:
  - ❌ Not recommended: The fields are:
- Lowercase the first word after a colon within a sentence (capitalization guidance covers the exceptions).
  - ✅ Recommended: Tone: concise, conversational, friendly, respectful
  - ✅ Recommended: ...remember to take these steps: review the style guide, use checklists, ...

## Commas

- Use the serial (Oxford) comma before the final *and* or *or* in a series of three or more items.
  - ✅ Recommended: Locations are divided into zones, regions, and multi-regions.
  - ❌ Not recommended: Locations are divided into zones, regions and multi-regions.
- Put a comma after an introductory word or phrase.
  - ✅ Recommended: Finally, only groups that contain parameters appear in this list.
- Put a comma before a coordinating conjunction (*and, but, or, nor, for, so, yet*) that joins two independent clauses, unless both clauses are very short.
  - ✅ Recommended: The libraries make feed creation easier, and they ensure that only valid feeds are produced.
  - ✅ Recommended: Type your ID and click **OK**. (both clauses very short — no comma)
- When a coordinating conjunction joins an independent clause and a dependent clause, add a comma only if the sentence could be misread without one.
  - ✅ Recommended: Direct-access flags are plain variables and can be read directly.
  - ✅ Recommended: The manager acknowledged the last team member who entered the room, and started the meeting.
- Put a comma before *which* at the start of a nonrestrictive clause.
  - ✅ Recommended: Name of the group, which has a maximum length of 200 characters.
- Put a semicolon, period, or dash before a conjunctive adverb (*otherwise, however, therefore*), and a comma after it.
  - ✅ Recommended: The variable must have a value; otherwise, the server returns an error.
- Don't put a comma before *because* unless it starts a nonrestrictive clause.
  - ✅ Recommended: You can use the same key name in multiple backend services and backend buckets, because each set of keys is independent of the others.

## Dashes

- Use an em dash (—) to indicate a break or interruption in a sentence. Don't put spaces before or after it.
- Don't use an en dash or a hyphen in place of an em dash.
- Don't use en dashes at all. Use a hyphen or the word *to* instead (for example, in number ranges).
- Don't use a dash (em, en, or spaced hyphen) to separate an item from its description. Use a colon or a period instead; for a series of items, use an HTML description list (`<dl>`).
  - ✅ Recommended: Example: This is an example.
  - ❌ Not recommended: Example - This is an example.
  - ✅ Recommended: Appendix A: My first appendix
  - ❌ Not recommended: Appendix A—My first appendix

## Ellipses

- Don't use ellipses in documentation; omit unnecessary information and include all necessary information instead.
- Don't use ellipses as suspension points to indicate hesitation.
  - ❌ Not recommended: The answer is ... wait for it ... that you shouldn't do this.
- When a UI label contains an ellipsis, omit the ellipsis when documenting it unless that would cause confusion: a button labeled **Save ...** is documented as *click **Save***.
- In quoted text, ellipses may replace omitted material mid-quote, but never at the beginning or end of the quote.
- When the omitted material spans a sentence boundary, use four dots (the fourth is the period).
  - ✅ Recommended: "All the world's a stage, .... And one man in his time plays many parts."
- Form an ellipsis as three periods in a row (not the ellipsis character), kept together, with a space before and after — but no space after when a punctuation mark immediately follows.
  - ✅ Recommended: ...Python code in there ... we'll explain it all in class.
  - ✅ Recommended: ...Python code in there ...; we'll explain it all in class.
  - ❌ Not recommended: ...Python code in there...we'll explain it all in class.

## Hyphens

- Use a hyphen when needed for clarity — to prevent misreading or to bind words that read as a unit. When unsure, check (in order): the existing convention in the documentation set, the style word list, then Merriam-Webster.

**Prefixes**
- Don't hyphenate a prefix and its noun: *infrastructure, megabyte, metadata, preprocessing, pseudocode, semiconductor*.
- Do hyphenate after a prefix when:
  - the prefix is *self* or *cross*: *self-managing, cross-region*
  - the noun is capitalized or a number: *non-Google, post-2000*
  - it avoids confusion or misreading: *de-energize, intra-index, re-mark, re-sign*
  - the base term already has hyphens or spaces: *un-Google-like, non-twentieth-century*
  - consistency within a document requires it: *pre-processing, post-processing*
- The *non* prefix follows the same rules but is often hyphenated because it forms hard-to-parse words; use judgment and stay consistent (*noncurrent, nonempty* vs *non-existence, non-integer*). Always hyphenate *non* before an already-hyphenated compound: *non-KSA-based, non-self-sustaining*.

**Compound nouns**
- Write compound nouns closed (one word) by default: *webpage, hostname, tradeoff, workaround*. The word list holds exceptions like *multi-region* and *style sheet*.
- Hyphenate units of measurement that multiply each other: *5 vCPU-hours, 40 person-hours*.

**Compound modifiers before a noun**
- Hyphenate compound modifiers before a noun when needed for clarity: *a well-designed app, Android-specific techniques*. It's almost never wrong to hyphenate for clarity.
- Hyphenate after *more* or *most* when needed to clarify what they modify: *edge locations with more-reliable internet links*.
- Avoid compound modifiers of more than two words; move words after the noun instead. If unavoidable, hyphenate each word as needed.
  - ✅ Recommended: test cases that are specific to the 2023 edition; cross-data-center replication
  - ❌ Not recommended: edition-2023-specific test cases
- Hyphenate a number plus a spelled-out unit modifying a noun: *a 64-bit system, 100,000-byte files, a five-minute wait*.
- Don't hyphenate a number plus an abbreviated unit; use a nonbreaking space instead: *200&nbsp;GB disk, 50&nbsp;Mbps connection*.
- Don't hyphenate *-ly* adverbs except when needed for clarity.
  - ✅ Recommended: publicly available implementations
  - ❌ Not recommended: publicly-available implementations
- Don't hyphenate compounds that are conventionally open: *a managed instance group, a machine learning model*.

**Compounds after a verb**
- Don't hyphenate a compound that follows a verb: *the app is well designed; the logs are written in real time; techniques that are Android specific; use the utility as is*.
- Exception — some terms are always hyphenated, even after a verb: *on-premises, add-on, cloud-based, customer-facing, user-friendly, game-like*. Check the word list, then Merriam-Webster.

**Ranges and spacing**
- Use a hyphen, not an en dash, for a number range: *8-20 files, 5-10 minutes*. If ambiguous, use words instead — *from 8 to 20 files* — and never mix hyphens with words (not *from 8-20 files*).
- Never put a space on either side of a hyphen, except after (never before) a suspended hyphen.
- Suspended hyphens: when compound modifiers share a base, keep the hyphens and drop the base until the last modifier: *one- or two-hour intervals; one-, two-, or three-hour intervals*.

## Parentheses

- Don't put important information in parentheses — some readers skip parenthetical text.
- Before using parentheses, consider whether commas, dashes, semicolons, or periods work as well without them.
- Keep mid-sentence parentheticals short; otherwise split into two sentences.
  - ✅ Recommended: Enter a name for the instance—for example, `my-instance-99`.
  - ✅ Recommended: Enter a six-digit hex number (for example, `228B22`), and then click **OK**.
  - ❌ Not recommended: Enter a six-digit hex number (for example, if you want the color forest green, enter `228B22`), and then click **OK**.
- Don't use parentheses to indicate optional plurals.

## Periods and end punctuation

- End every complete sentence with a period, unless it's a question. Lists and headings have their own rules.
- Don't put a URL at the end of a sentence — rewrite the sentence, or put the URL on its own line with no final period, so the period can't be mistaken for part of the URL. When a period does follow a URL, leave no space before it.
- Put the period inside quotation marks at the end of a sentence, even if it isn't part of the quoted material (see the quotation-marks exception for literal strings). If the quoted material ends with a question mark or exclamation point, drop the period: Children always ask "Why?"
- Parentheses: if the parenthetical ends a larger sentence, the period goes after the closing parenthesis; if the parentheses contain a complete standalone sentence, the period goes inside.
- Don't end headings with periods.
- Use a period as the decimal point (US convention), not a comma.
- Put a period after a shortened word; don't put periods between the letters of an acronym or initialism.
- Leave only one space between sentences.

**Exclamation points**
- Avoid exclamation points in general — never in concept and reference docs, avoid in procedures (use periods for completion steps: "The VM is created."), acceptable sparingly in blog posts.
- They're fine when syntax or literals require them (the `!=` operator, exact error messages) and sparingly for major milestones in tutorials ("Congratulations! You've completed the setup.").

## Quotation marks

- Use straight double quotation marks and straight apostrophes, never curly ones — code requires straight marks, auto-converters and humans make mistakes with curly ones, and straight marks are easier to proofread.
- Technical writing rarely needs quotation marks outside code. Use them for:
  - titles of shorter works (articles, episodes) unless they're link text; full-length works get italics
  - a section of a larger document when you can't link to it directly: the section "Deploying containers"
  - the title of a parent document when you're already linking to a section within it
  - direct quotes, slogans, and mottos: Martin Fowler has said, "We are still learning..."
  - a term used metaphorically, only when it's not established usage in the domain: this configuration forms an "island" within the network
- Put commas and periods inside quotation marks.
  - ✅ Recommended: See the section titled "Care and feeding of the emu."
  - ❌ Not recommended: See the section titled "Care and feeding of the emu".
- Exception — keywords and literal strings: when quotation marks mark an exact literal string, put other punctuation outside so nothing extraneous appears inside. Prefer code font over quotation marks for such items, and don't quote an item already in code font unless the marks are part of it.
  - ✅ Recommended: If you enter `escape`, the program crashes.
  - Acceptable: If you enter "escape", the program crashes.
  - ❌ Not recommended: If you enter "escape," the program crashes.
- Use single quotation marks only in code examples (where the language uses them) and for a quotation nested inside another quotation (double outside, single inside).
  - ✅ Recommended: She said, "I heard him shout 'Help,' and saw him floundering in the water."

## Semicolons

- Avoid semicolons where possible. They're preferred in three cases:
  - Joining two closely related independent clauses when a period or comma is less effective: *You can easily test compatibility by computing the centroid; if it is on the opposite side of the planet, reverse the order of your vertices.*
  - Before a conjunctive adverb (*therefore*) or joining phrase (*that is*) that links two independent clauses: *...below the Main Camera; therefore, only the stereo cameras are affected...*
  - Separating series items that are long, complex, or contain their own punctuation: *what matters most to your users; what is most important to fix; and what is easy or feasible to fix in the available time.*

## Slashes

- Avoid slashes except in code, file paths, and URLs.
- Don't use slash-based date formats.
- Don't use slashes to separate alternatives — use *or* or *and*.
  - ✅ Recommended: ...even if it has been developed or is hosted by a commercial entity.
  - ❌ Not recommended: ...even if it has been developed/hosted by a commercial entity.
  - ✅ Recommended: Call this method five or six times. ❌ Not recommended: Call this method 5/6 times.
- Avoid *and/or* — *and* usually implies *or*. If you must cover both, spell it out (*raw events, processed events, or both*); *and/or* is acceptable only where space is tight, such as tables.
- Use forward slashes in file paths and URLs (backslashes in Windows paths). Break a long URL immediately after a slash; never insert a hyphen to break a URL.
- Don't use slashes in fractions — 3/4 is ambiguous. Write ¾, 0.75, or 75%.
- Don't use slash abbreviations like *c/o* or *w/* — spell out *care of*, *with*.

## Footnotes

- Avoid footnotes — they aren't accessible and complicate localization. Use a cross-reference, a note, or a short parenthetical instead.
- If a footnote is truly the only option, mark it with a superscript number (`<sup>1</sup>`) and put the note at the bottom of the page.
