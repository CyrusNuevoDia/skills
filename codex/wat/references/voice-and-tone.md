# Voice and Tone

Distilled from the Google developer documentation style guide.

## Overall tone

- Write in a voice that's conversational, friendly, and respectful — casual, natural, and approachable, never pedantic or pushy. Sound like a knowledgeable friend who understands what the reader wants to do.
- Don't write exactly the way you speak; aim for a conversational tone rather than a formal one, but tighter than speech.
- Don't try to be super-entertaining, and don't aim for super-dry. Be human and let personality show, but remember the reader may be in a hurry and wants information first.
- Write simply and consistently for a global audience with varying English proficiency. Avoid culturally specific references and current pop-culture references.
- Even if the tone isn't perfect, communicate useful information clearly and directly — that's the most important part.
- Read passages aloud (or mouth them); rewrite sentences that sound awkward or confusing when spoken.
- Use transitions between sentences (*Though*, *This way*) to make paragraphs less stilted — but stiff transitions like *However* or *Nonetheless* can have the opposite effect.

### Avoid

- Buzzwords and technical jargon.
- Being cutesy; wackiness, zaniness, goofiness.
- Figurative language, including metaphors and ableist language.
- Placeholder phrases like *please note* and *at this time*.
- Choppy or long-winded sentences.
- Starting all sentences with the same phrase (such as *You can* or *To do*).
- Exclamation points, in general.
- Phrasing that denigrates or insults any group of people.
- Phrasing in terms of *let's* do something.
- *Simply*, *It's that simple*, *It's easy*, or *quickly* in a procedure.
- Internet slang and abbreviations such as *tl;dr* or *ymmv*.

### Don't use "please" in instructions

Politeness is good, but *please* in instructions overdoes it.

- ✅ Recommended: To view the document, click **View**.
- ❌ Not recommended: To view the document, please click **View**.
- ✅ Recommended: For more information, see [link].
- ❌ Not recommended: For more information, please see [link].

### Calibration examples

| Too informal | Just about right | Too formal |
| --- | --- | --- |
| Dude! This API is totally awesome! | This API lets you collect data about what your users like. | The API documented by this page may enable the acquisition of information pertaining to user preferences. |
| Then—BOOM—just garbage-collect, and you're golden. | To clean up, call the `collectGarbage` method. | Please note that completion of the task requires the following prerequisite: executing an automated memory management function. |

## Active voice

Use active voice; make clear who or what is performing the action. Passive voice hides the actor, so readers can't tell whether they, the server, or an end user is supposed to act.

- ✅ Recommended: Send a query to the service. The server sends an acknowledgment.
- ❌ Not recommended: The service is queried, and an acknowledgment is sent.

Even passive with *by* ("The service is queried by you") is worse than recasting with the doer as subject.

Passive is acceptable in these cases:

- To emphasize an object over an action: ✅ "The file is saved."
- To de-emphasize the actor: ✅ "Over 50 conflicts were found in the file." / ❌ "You created over 50 conflicts in the file."
- When readers don't need to know who's responsible: ✅ "The database was purged in January."

## Person

- Address the reader as *you*/*your*, not *we*/*our*/*us*. Assume the reader is the one doing the tasks and making the decisions.
  - ✅ "The following sections describe how you can create a website." / ❌ "…how we can create a website."
  - ✅ "Consider adding a description to your table." / ❌ "Let's add a description to our table."
- Reserve *user* for the user of the software your reader is developing — don't call the reader "the user."
  - ✅ "This document shows you how to develop an app." / ❌ "This document shows the user how to develop an app."
- Use the imperative for instructions (the *you* is implied): ✅ "Click **Submit**." Imperative in running text is fine once the addressee is established, but consider whether step-by-step text should be formatted as a procedure instead.
- Use second person for what the reader does; use third person for what the software or an end user does. In API docs, state facts about programming elements in third person, but address the reader as *you* when telling them what to do.
- First-person plural (*we*, *our*, *us*) is OK only to refer to the authoring organization, with a clear antecedent: ✅ "Example Organization provides A and B, but we don't provide C and D."
- Identify who *you* is (a developer? a sysadmin?) and address that audience consistently — sometimes with an explicit audience sentence near the start of the document.

## Pronouns

- Make every pronoun's antecedent unambiguous.
  - ✅ "If you type text in the field, the text doesn't change." / ❌ "…it doesn't change."
- Follow demonstrative pronouns with a noun.
  - ✅ "Set this value to true." / ❌ "Set this to true."
  - ✅ "These approaches are your best options." / ❌ "These are your best options."
- Use singular *they* as the gender-neutral pronoun. Don't use *he*, *she*, *him*, *her* generically, and don't use *he/she* or *(s)he*.
- Keep optional pronouns like *that* and *which* for clarity.
  - ✅ "Right-click the link that you want to open." / ❌ "Right-click the link you want to open."
- Avoid first-person pronouns except in FAQ questions, authored commentary, or *we* for your organization after naming it.
- *That* introduces a restrictive clause, no comma: "The echidna that has a long snout is furry" (a particular echidna). *Which* introduces a nonrestrictive clause, preceded by a comma: "The echidna, which has a long snout, is furry" (all echidnas). Don't substitute one for the other.
- Use *who* (not *that*) when referring to a person; when unsure, *that* is generally OK. *Whose* works for people, animals, and things.
  - ✅ "Examine the variables whose values are set at compile time."

## Contractions

- Use common two-word contractions such as *you're*, *don't*, and *there's* — they fit the informal tone.
- Prefer negation contractions (*isn't*, *don't*, *can't*): readers scanning can miss *not*, but can't misread *don't* as *do*. If you need to emphasize the negative, use formatting ("is *not*"), though it's rarely needed.
- Don't invent nonstandard contractions (*guides're*, *browser's* meaning "browser is") and don't use three-word contractions (*mightn't've*).

## Anthropomorphism

Don't attribute human qualities to software or hardware — it's figurative language, less precise and harder to translate.

- ✅ Recommended: A Delimiter object specifies where to split a string.
- ❌ Not recommended: A Delimiter object tells the splitter where a string should be broken.
- ✅ Recommended: The PC detects a new device.
- ❌ Not recommended: The PC sees a new device.

## Excessive claims

Don't make claims about performance, cost, or security that the reader can't verify or that a future event could invalidate, and avoid statements that could read as subjective or disparaging — especially about third-party products. Judge claims against what might be true in the future, not just today.

- Avoid superlatives: *best*, *simplest*, *fastest*, *never*, *always*. Use *ensure* and *guarantee* only when something truly is ensured or guaranteed.
- Cite a source for any specific performance claim (speed, storage, and so on).
  - ✅ "Our product distributes datasets and computation in memory across a cluster, and therefore it can be faster for this scenario than ExampleCorp's product. For more information, see Performance comparison." / ❌ "Our product is faster than ExampleCorp's product."
- Say a feature "helps with security" or "is designed for security" rather than claiming a product is secure — the softer statement stays true even after an incident.
  - ✅ "Using our security product is part of an overall strategy that helps prevent account takeovers from phishing attacks." / ❌ "Our security product prevents account takeovers from phishing attacks."
- Statements about competitors can be wrong today (misunderstood behavior) or tomorrow (a new release). Write factually and objectively, limited to verifiable information that will stay true.

## Jargon

Jargon is specialized, often figurative group terminology (*camel case*, *swim lane*, *break-glass procedure*, *out-of-the-box*) and vague or overloaded terms (*solution*, *support*, *workload*). It hampers clarity, translation, and inclusivity. Before using it, ask:

- **Can you write around it?** Instead of "Hold a post-mortem," write "When the project is finished, review what processes worked or didn't work." Instead of "Create a back-of-the-envelope design," write "Use an informal design process."
- **Can you replace it with a more specific term?** *affected area* for *blast radius*, *import*/*load* for *ingest*, *ready-made*/*pre-built* for *off-the-shelf*. If a term is marked "Don't use," replace it or write around it.
- **Using it once?** Describe it in plain language with the term in parentheses, or link to a trusted definition: ✅ "You then move the task to an earlier part of the process (also known as *shifting left*)."
- **Using it throughout?** Briefly define it in parentheses on first reference or link to a trusted definition: ✅ "The application is in the same state as a *cold standby* (a backup or redundant system that's identical to a primary system)."
- **In a command or code sample?** Use the term only in direct reference to the code item, formatted as code, and make clear what you're referring to: ✅ "Add a user to the allowlist (`whitelist`) by entering: `whitelist adduser EMAIL_ADDRESS`." / ❌ "Add a user to the whitelist by entering…"

## Tense

- Use present tense for general behavior not tied to a particular time.
  - ✅ "Send a query to the service. The server sends an acknowledgment." / ❌ "The server will send an acknowledgment."
- Future tense (*will*) is fine for an action that genuinely happens later: ✅ "Add the filename to the backup list. The file will be archived the next time the backup process runs." Or for asynchronous behavior: ✅ "A message is sent that will notify any Pub/Sub subscribers."
- Don't use future tense to describe how a product will work after the next release.
- Avoid the hypothetical *would*.
  - ✅ "If you send an unsubscribe message, the server removes you from the mailing list." / ❌ "The server would then remove you from the mailing list."

## Future features

Don't document future features or products, even in innocuous ways. Don't pre-announce anything in documentation unless legal counsel has approved it.

## Timeless documentation

Document the current version of the product; avoid words that anchor the text to a point in time or assume knowledge of prior or future versions. Timeless docs need less maintenance and don't assume the reader knows earlier versions.

- ✅ "These subcommands let you interact with HTTP load balancing." / ❌ "These new subcommands…"
- ✅ "The following command-line options aren't supported:" / ❌ "…aren't currently supported:"
- ✅ "The emulator supports the following filters:" / ❌ "The emulator now supports…"

Time-based words are fine in time-stamped content (blog posts, release notes, press releases) and in procedural state changes ("The VM goes offline soon after you send the shutdown command") — just not when describing product capabilities in product or reference docs.

Avoid these when describing product or feature capabilities:

- **as of this writing / currently / presently, at present** — implied by the doc's existence; docs are assumed current unless a release version is specified.
- **does not yet / eventually / future, in the future / soon** — prematurely discloses plans or implies the product might change.
- **new, newer / now / latest** — becomes outdated quickly; assumes prior product knowledge. If you must use *new*, anchor it to a date or version: "The January 14, 2021 release of BigQuery includes a new resource panel."
- **existing / old, older** — assumes familiarity with earlier versions.
