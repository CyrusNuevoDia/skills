# Links, Cross-References, and Third-Party Content

## Choose links selectively

- Be selective about which links you include — each link adds cognitive load and is a chance for the reader to leave the page and lose their place.
- Provide help in context instead of linking when a little information suffices: define a term, briefly explain a concept, or give a couple of steps on the page rather than sending the reader elsewhere.
- For another product's software or standards, link to good documentation elsewhere rather than re-documenting it — but if a few sentences of basic information is all readers need, put that on the page instead.
- Don't provide duplicate links to the same destination within a page. Link once, where it's most useful. Exceptions: linking to a specific section of another page, a very long page where duplicates are far apart, or multiple entry points (e.g., a procedure section and a troubleshooting section each needing the link).
- Link to the most relevant page on a site, and to the most relevant heading on that page. Avoid multiple links that do the same job.

## Write descriptive link text

- Use short, unique, descriptive phrases that provide context for the destination. Effective link text aids accessibility (screen reader users jump link to link) and scannability. Rework the sentence if needed to create good link text.
- Use one of two forms: the exact page title/heading you're referencing, or a descriptive phrase capitalized as part of the sentence.
  - ✅ Recommended: For more information, see [Load balancing and scaling].
  - ✅ Recommended: You can use Cloud Scheduler and Cloud Functions to manage [task scheduling on Compute Engine].
  - ❌ Not recommended: See [this blog post].
- For descriptive phrases: put important words at the beginning, don't reuse the same link text for different targets in one document, and keep link text short — never a sentence or paragraph.
- Don't use vague link text that fails without surrounding context — no "this document", "this article", or "click here".
  - ✅ Recommended: For more information, see [Make headings into link targets].
  - ❌ Not recommended: Want more? [Click here!]
- Don't use a URL as link text; use the page title or a description instead. Exception: URLs as link text are OK in some legal documents (e.g., Terms of Service).
  - ✅ Recommended: For more information about protocols, see [HTTP/1.1 RFC].
  - ❌ Not recommended: See the HTTP/1.1 RFC at [http://www.w3.org/Protocols/...].
- If the text introduces an abbreviation in parentheses, include both the long form and the abbreviation inside the link text.
  - ✅ Recommended: [Google Kubernetes Engine (GKE)]
  - ❌ Not recommended: [Google Kubernetes Engine] (GKE)
- When linking a command, flag, or other code-font element, include the descriptor word in the link text — unless doing so is awkward or redundant.
  - ✅ Recommended: run the `gcloud instances create` command with the [`--hostname` flag].
  - ❌ Not recommended: ...with the [`--hostname`] flag.
  - ✅ Recommended (redundancy case): This service supports the [`GET`], [`HEAD`], and [`OPTIONS`] methods.
  - ❌ Not recommended: ...the [`GET` method], [`HEAD` method], and [`OPTIONS` method].

## Link introductions

- When a sentence exists solely for a cross-reference, use the consistent phrasing "For more information, see..." or "For more information about..., see...".
- Include the "about..." clause when the link text or context doesn't make clear why you're sending the reader there.
- Use "about", not "on".
  - ✅ Recommended: For more information about task scheduling, see [Reliable task scheduling on Google Compute Engine].
  - ❌ Not recommended: For more information on indexes, see [Manage indexes].
- Use "see" (not "refer to" etc.) for links and cross-references.

## Clarify the purpose of a link

- Make the surrounding context or link text indicate why you're referring the reader to the information. Be specific, but don't repeat the link text.
  - ✅ Recommended: For more information about authentication and authorization, see [Using OAuth 2.0 to access Google APIs].

## Explain unexpected link behavior

- If a link downloads a file or opens an email, say so in the link text and mention the file type.
  - ✅ Recommended: [download the security features PDF]
  - ✅ Recommended: `<a href="mailto:support@example.com">send email to Technical Support</a>`
- For links to a section on the same page, tell the reader: "see the [Write descriptive link text] section of this document."
- For links to a section on another page, use normal cross-reference wording and formatting. If the target section title duplicates a title on the source page, add context: "see [Install libraries] in \"Building new audiences...\"."
- Don't force links to open in a new tab or window — let the reader decide. In the rare case a link must open in a new tab, say so in the link text: `<a ... target="_blank">Accessible content (opens in a new tab)</a>`.
- Don't use an external link icon to mark links to other domains. If it matters that the reader is leaving the site, say it in the text ("see the Wikipedia page about [OS-level virtualization]") — never rely on an icon.

## Punctuation and formatting around links

- Put punctuation immediately before or after a link outside the link tags where possible.
  - ✅ Recommended: `see <a href="#Test">Test your code</a>.`
  - ❌ Not recommended: `see <a href="#Test">Test your code.</a>`
- Don't put linked cross-reference text in quotation marks.
  - ✅ Recommended: see [Meet Android Studio].
  - ❌ Not recommended: see ["Meet Android Studio"].
- For unlinked cross-references: use quotation marks for a document section, short work, or part of a series ('see "Describing system versions" in the following section'); use italics for the title of a full-length work (a book, movie, or web series — e.g., *The Chicago Manual of Style*).

## Navigation and site styling

- Don't link outside the documentation set from navigation controls such as a table of contents; put the link on a page inside the docs instead. If you must, make clear the reader is leaving the document set.
- Style link text sitewide: contrast link color against body text; underline links and nothing else (a horizontal line cuts across the vertical scan and helps readers spot links); make visited links change to a color-blind-friendly distinct color so readers can tell what they've already followed.
- Use site-root-relative URLs for internal links to pages on the same server.

## Third-party content

- Don't copy content from another source — it may violate copyright. Paraphrase and link instead. This applies to text, images, code, logos, and speech.
  - ✅ Recommended: A [recovery point objective (RPO)], which is the maximum acceptable length of time during which data might be lost from your app due to a major incident.
  - ❌ Not recommended: Recovery Point Objective (RPO): "RPO is the maximum targeted period in which..." (URL).
- Unless you're sure your company owns the assets, avoid copying from: third-party sources (docs, websites, books, blogs, videos, images, podcasts); reference sources (dictionaries, encyclopedias, Wikipedia); open source product documentation (OSS licenses vary — don't assume reuse is allowed); and GitHub content (each user may use a different license). When in doubt, don't use the content.
