# Google Developer Documentation Word List

Distilled from the Google developer documentation style guide word list. Default dictionary: Merriam-Webster; when multiple spellings exist, use the first listed (e.g. *canceled*, not *cancelled*). "Avoid" = use only if needed, define or replace where possible. "Don't use" = never use; if it appears in code, reference it only as a code item in code font.

## Modal verbs and requirements

- **can** — Use for permission, ability, optional actions, or possible outcomes ("You can access the server"; "The process can take 30 minutes").
- **could** — Avoid; use *can* instead.
- **may** — Reserve for official policy or legal considerations. For possibility use *can* or *might*; for permission use *can*.
- **might** — Use for possibility or an uncertain outcome ("You might be prompted to enter your credentials").
- **must** — Use for a required action or state ("You must have the Editor role"); *you need* also works.
- **should** — Generally avoid; it's ambiguous. Use precise wording for recommendations and requirements.
- **shall** — Avoid except under advice from a lawyer.
- **will, would** — Avoid; write in present tense, use *can* where possible.

## Timeless documentation

Avoid words that date the text or leak roadmap: **currently**, **as of this writing**, **presently / at present**, **now**, **soon**, **eventually**, **future / in the future**, **does not yet**, **new / newer**, **latest** (if you must use *latest* or *new*, anchor with a version number or release date), **old / older** (use *earlier* with a version number).
- ✅ Recommended: Windows isn't supported. ❌ Not recommended: Windows isn't currently supported.
- ✅ Recommended: This version of the SDK is deprecated. ❌ Not recommended: ... and eventually will be no longer supported.

## Versions, positions, and direction

- **later / earlier** — Use for version ranges, not *higher/lower*, *above/below*, *under*, or *2.2+* ("version 2.2 or later"). Exception: Android docs use *higher/lower*. Note the highest version number isn't always the latest release.
- **above / below / higher / lower / under** — Don't use for document position (use *earlier/preceding* and *later/following*) or UI position (avoid directional language for accessibility). OK non-directionally (hierarchy) and in set phrases (*below average*, *below zero*).
- **left-nav, right-nav** — Don't use; use *navigation menu* (or *content navigation menu* for docs navigation).
- **scroll** — OK as a verb, but prefer implementation-neutral phrasing ("go to the section"); never *scroll up/down*.
- **shift left** — Avoid figuratively; use *shift earlier* / *move to an earlier phase*. OK for binary bit shifts.

## UI interaction verbs

- **click** — For desktop mouse targets. Never *click on*. Hyphenate *right-click*, *left-click*, *double-click*. *Click in* is OK for regions needing focus. Android: use *tap*.
- **tap** — Use on touch devices and for on-screen/capacitive buttons; use instead of *touch*. *Touch & hold* (with ampersand) is OK; not *tap and hold* or *long press* (Android).
- **press** — For keyboard keys/combinations and mechanical buttons ("Press `Control+C` (or `Command+C` on macOS)").
- **hit** — Don't use for *click*, *press*, or *type*.
- **select** — Use for choosing among options, selecting text, or marking a checkbox. ✅ Select **Automatically check for updates**. ❌ Check ...
- **check / uncheck / deselect / unselect** — Don't use for checkboxes. Use *select* to mark and *clear* to unmark. *Deselect* is OK for non-checkbox UI elements.
- **choose** — Fine generically; for UI elements use *select*.
- **enter** vs **type** — Prefer *enter* (typing, pasting, and speech all count). Use *type* only when typing specifically matters; say explicitly if the user must not press `Enter`.
- **drag** — Not *click and drag* or *drag and drop*; *drag-and-drop* OK as an adjective.
- **hold the pointer over** — Use only when the user must wait for the UI to react (tooltip, submenu) or duration matters; otherwise use *point to*. Don't use *hover*.
- **turn on / enable** — Pick one term and use it consistently; match the UI element's label in procedures. For "makes it feasible," use *lets you*: ✅ The API lets you detect features. ❌ The API enables/allows you to detect features.
- **disable / disabled** — Don't use for something broken. Prefer *inactive*, *unavailable*, *deactivate*, *turn off*, or *deselect*, used consistently.
- **grayed-out** — Don't use; use *unavailable*.
- **copy and paste** — Avoid; say what to enter, not how. ✅ In the **Query** field, enter the output from the previous step.
- **fill in / fill out** — *Fill in* individual fields; *fill out* an entire form.
- **populate** — OK for processes populating tables; people *fill in* forms.

## UI elements

- **button** — A link is not a button. *Press* mechanical buttons; *tap* on-screen/capacitive ones.
- **checkbox** — Not *check box*.
- **dialog** — For the UI element (dialog box); *dialogue* only for human conversation. Use *dialog* or *menu* instead of *pop-up/popup*.
- **drop-down** — Usually omit; just *list* or *menu*. Never a standalone noun.
- **expander arrow / expandable section** — Not *disclosure triangle*, *expando*, or *zippy*.
- **hamburger menu / kebab menu** — Don't use; use the icon's `aria-label` (e.g. **Menu**, **More**).
- **text box** — Don't use; use *box* (Google Cloud/Workspace docs: *field*).
- **navigation bar** — Don't use for a navigation menu.
- **address bar** — Use for the browser URL bar; not *omnibox*.
- **dashboard / portal** — Don't use for the Google Cloud console.
- **page** — Use for web pages and console sub-pages (not *tab*).
- **UI** — Don't use generically for a page or dashboard; use *page*, *console*, or *web interface*.

## Tone and filler

- **please** — Don't use in normal instructions; never *please note*. OK only when asking permission/forgiveness (e.g. "please contact your account representative").
- **easy, easily / simple, simply / quick, quickly** — Cut; what's easy for you may not be for the reader.
- **just** — Usually filler; delete. If needed, use *only*, *instead*, or *previously*. OK to convey the simpler of two approaches.
- **let's** — Don't use.
- **actionable** — Avoid; use *useful* or *that you can act on*.
- **and so on / etc.** — Avoid; use *such as* or *including* with examples. If forced, use *etc.* with the period.
- **aka** — Don't use; write *also known as*, or use parentheses or *or*.
- **e.g. / i.e.** — Don't use; write *for example*, *such as* / *that is*.
- **tl;dr** — Don't use; write *To summarize*.
- **RTFM / ymmv / voila** — Don't use.
- **desire, desired / wish** — Use *want* or *need* ("the size that you want").
- **leverage** — Use *use*, *build on*, or *take advantage of*.
- **utilize** — Don't use for *use*; OK for resource utilization quantities ("CPU utilization exceeds 75%").
- **performant** — Avoid; use a precise term ("an accurate model", "a low-latency service").
- **functionality** — Use with caution; often you mean *capabilities* or *features*.
- **key** (adjective) — Don't use to mean *crucial*; as a noun, specify which kind of key.
- **impact** — Noun only; use *affect* as the verb. ❌ This issue impacts user experience.
- **Create a new ...** — Just *Create a ...* unless distinguishing from a recent item.

## Inclusive and non-figurative language

- **he, him, his / she, her** — No gendered pronouns except for a specific known individual; use singular *they/their* (takes plural verb). Never *he/she* or *(s)he*. Say *pronouns*, not *preferred pronouns*.
- **guys** — Use *everyone* or *folks*.
- **man hours / manpower / manned / manmade** — Use *person hours*, *staff/workforce*, *staffed/crewed*, *artificial/manufactured/synthetic*.
- **man-in-the-middle** — Use *on-path attacker* or *person-in-the-middle (PITM)*.
- **male/female adapter** — Use *plug* / *socket*.
- **blacklist / whitelist / graylist** (all spellings, all forms) — Don't use. Nouns: *denylist/blocklist*, *allowlist/trustlist*, *provisional list*. Verbs: rewrite around the action ("To deny requests from an IP address, add it to the `dos.yaml` file"). Reference literal code terms only in code font.
- **master / slave** — Never together. Replace *master* with *primary*, *main*, *parent*, *controller*, etc. (GKE control plane, Jenkins controller, root key, primary key); replace *slave* with *worker*, *replica*, *secondary*. Pairs: *primary/replica*, *controller/worker*, *leader/follower*, *publisher/subscriber*, *active/standby*.
- **grandfathered** — Use *legacy*, *exempt*, or *made an exception*.
- **blackhat / whitehat / grayhat** — Use *illegal*, *unethical*, *in violation of rules* / *legal*, *ethical*, *following the rules*.
- **black-box / white-box / gray-box** (monitoring, testing) — Use *synthetic monitoring* / *introspective monitoring*; *opaque-box* / *clear-box* / *translucent-box testing*.
- **white label** — Use *unbranded*, *unlabeled*, *blank label*. **white glove** — use *high-touch*, *premium*.
- **crazy, insane, bonkers, mad, loony** — Use *complicated*, *complex*, *baffling*, *strange*, *unexpected* (inanimate objects only).
- **sane / sanity check** — Use *valid*, *sensible* / *quick check*, *confidence check*, *preliminary check*.
- **dummy variable** — Use *placeholder*; in statistics, *indicator variable*, *one-hot encoding*, *binary variable*.
- **blind** — For people: *person who is blind*, *screen reader user*, *person who is low-vision*. Avoid *blind to/eye* (*ignore*, *unaware of*), *blind write* (*write without a read*), *blind change* (*change without first confirming the value*). Don't use *unsighted* or *visually challenged*.
- **cripple / lame / gimp / deficient / abnormal / deformed** — Never for people; use precise language for systems ("it slowed the server down"). *Abnormal/deficient/deformed* OK for computer-system conditions.
- **retarded** — Don't use; use *slowed*.
- **dumb down** — Use *simplify* or *remove technical jargon*.
- **hang, hung** — Use *stop responding* / *not responding*.
- **healthy / health check** — Use non-figurative terms like *responsive*; use *health check* only if it's the term in the interface.
- **ghetto** — Use *clumsy*, *workaround*, *inelegant*.
- **gypsy** — Use *Romani*, *Roma*, or *Traveller* for people; precise phrases otherwise.
- **guru / ninja / sherpa / wizard-figuratives** — Use *expert*, *teacher*, *guide*.
- **tribal knowledge** — Use a literal description of knowledge held by a group.
- **dojo** — Use *training* or *workshop*.
- **brown bag** — Use *learning session*, *lunch and learn*, *informal training*.
- **build cop / build sheriff** — Use *build monitor*.
- **war room** — Use *rapid response team*, *incident-management team*, *situation room*.
- **mom test / grandma test / girlfriend test** — Use *beginner user test* or *novice user test*.
- **monkey / monkey test** — Never for people; for tests, name the function (*automated, random tests*).
- **demilitarized zone (DMZ)** — Use *perimeter network*.
- **blast radius** — Use *affected area* or *spatial impact*.
- **blackhole (verb)** — Use *dropped without notification*.
- **break-glass** — Use *emergency access* or *manual fallback* / *preplanned procedure*.
- **STONITH / STOMITH** — Avoid; explain the feature (*fence failed nodes*).
- **nuke** — Use *remove* or *attack*.
- **kill / abort / terminate** — Avoid; use *stop*, *exit*, *cancel*, *end* (documented exceptions for Linux signals; *terminate* OK with its technical meanings in telephony/networking).
- **sexy** — Use *fast*, *powerful*, *elegant*.
- **chubby / fat** — Use precise modifiers: *unused*, *overextended*; *high-capacity network connection*, *full-featured client*. FAT the file system is fine.
- **first class / first-class citizen** — Describe the actual characteristics, or use *higher-order*, *anonymous*, *nested*.
- **pets versus cattle** — Use *persistent versus dynamic* or *manually configured versus automated*.
- **single pane of glass** — Use *single interface* or *unified interface*.
- **slice and dice** — Use *segment data for analysis* or *break information into smaller parts*.
- **voodoo** — Use *mysterious*, *complicated*, *nondeterministic*.
- **housekeeping** — Use *maintenance*, *cleanup*.
- **hands-off / hands-on** — Use *automated* / *customizable*, or describe the activity.
- **out of the box** — Avoid figuratively; OK literally. **off-the-shelf / COTS** — use *ready-made*, *prebuilt*, *standard*, *default*.
- **native** — Never for people. For software, prefer *built-in*; *cloud-native* is ambiguous — consider *modern cloud*, *cloud first*.
- **Black Friday / Cyber Monday** — Use *peak scale event* unless literally referring to the US event.
- **holiday, the holidays** — Refer to specific quarters or months.
- **America, American** — Only for the Americas/continent; for the country use *the US* / *the United States*.
- **target** (verb) — Avoid, especially about people; *attract*, *appeal to*. OK as adjective (*target audience*), or *intended for*.
- **legacy** — Use with a definition; no pejorative connotation. Prefer a more precise term.
- **jank, janky** — Only for graphics glitches from data loss or refresh-rate problems.
- **primitive** — Never in a disparaging sense.
- **exploit** — Only in the negative security sense; never to mean "use".
- **canary** — Not a verb; no *canarying*. Define *canary testing* on first use.
- **hot / cold / warm** (failover, standby, spare) — Jargon; define on first use and use consistently.
- **hotspot** — Noun only; define on first use; no *hotspotting*.

## Grammar and word choice

- **a / an** — Choose by the next word's sound, not its letter (*an SAP system*, *a SQL* pronounced "sequel", *a FHIR* pronounced "fire").
- **about vs on** — Cross-references use *about* ("For more information about indexes, see ...").
- **as / since** — If you mean *because*, write *because*; *as* and *since* are ambiguous (time vs causation).
- **once** — If you mean *after*, write *after*.
- **while** — Not for contrast; use *although*. OK for time.
- **between vs among** — *Between* for two or more distinct things; *among* for members of a group or non-distinct things ("shared among multiple apps").
- **each** — Means items taken individually, not *all* ("a list of all the items", not "a list of each item").
- **either** — Use parallel syntax ("Do either option 1 or option 2"); prefer it for two-way choices.
- **neither** — *Neither A nor B*, never *neither A or B*.
- **if ... then** — Include *then* in technical documentation. For *if* vs *whether*, use *whether* for alternatives.
- **this, that** — Put a noun after *this*/*that* where possible; if you can't name the noun, rephrase.
- **data** — Singular mass noun: *the data is*, *less data*.
- **appendix** — Plural *appendixes*. **index** — *indexes* (unless mathematical/financial). **matrix** — *matrixes* (unless mathematical).
- **emoji** — Same form singular and plural.
- **comprise** — Don't use; use *consist of*, *contain*, *include*.
- **and/or** — Don't use unless space is limited (tables).
- **& (ampersand)** — Don't use for *and* in headings, text, navigation, or TOCs; OK in UI-element names, space-constrained tables/diagrams, and code.
- **\+ with numbers** — OK in informal text (*300+ attributes*), not formal contexts, and not for versions (use *later*).
- **per** — For rates only (*requests per day*); not *per the style guide* or *a policy per Pod* (use *according to*, *for each*).
- **vs.** — Write out *versus*.
- **via** — Don't use.
- **vice versa** — Write the relationship out, or use *conversely*.
- **with** — Not for ownership ("a handset that has 2 GB of RAM") or use ("debug by using the tool").
- **using** — When ambiguous, write *by using* ("filter for data ... by using custom filters").
- **in order to** — Usually just *to*; keep *in order to* only when needed for clarity.
- **like / such as** — Both OK for examples; *such as*, *like*, and *include* imply non-exhaustive lists, so never add *etc.* after them.
- **for example** — Follow with a comma; set examples off with dashes, commas, or parentheses. Don't use *for instance* (collides with the noun *instance*).
- **for instance** — Don't use; see above.
- **possible / impossible** — Not for *you can* / *you can't*.
- **typically** — For what's usual under normal circumstances; don't open a sentence with it.
- **whether** — Add *or not* only when needed; distinguish from *if*.
- **execute** — Prefer *run* when the meaning is the same.
- **display** — Transitive only: "The area appears" or "The area is displayed", never "The area displays."
- **persist** — Not a transitive verb; prefer "make the token persistent."
- **surface** (verb) — Use *make available* or *expose*.
- **interface** (verb) — Don't; use *interact*, *communicate*.
- **review** — Means read critically; if you mean "read for the first time," say *read*.
- **scale** — Don't use alone for size; specify magnitude and direction (*scales up/down, out/in*, "at a larger scale").
- **ingest** — Only for movement plus significant processing; otherwise *import*, *load*, *copy*.
- **extract** — Use instead of *unarchive*, *uncompress*, *untar*, *unzip*.
- **deprecate** — Means recommend against use; never a synonym for *removed* or *shut down*.
- **roll out** — Not for a sudden launch; prefer *gradual*, *in stages*, *phased*.
- **spin up** — Use *create* or *start* (disks excepted).
- **rehost** — Pair with *lift and shift* on first mention ("rehost (lift and shift)"); no *forklift approach*.
- **learnings** — Use *knowledge* or *things that you learned*.
- **pros / cons** — Use *advantages* / *disadvantages*.
- **final solution** — Use *solution*, or *definitive/optimal/best solution*.
- **happiness vs satisfaction** (SRE) — *Happiness* is perceived reliability; *satisfaction* is meeting a need. Not interchangeable.
- **traditional** — Prefer *conventional* or a precise description ("an on-premises data warehouse", not "a traditional data warehouse").
- **redline** — Not a verb; refer to *tracking changes* or *priority lining*.
- **retriable / retryable** — Write around it ("you can try it again") unless a code item uses the spelling.

## Addressing the reader

- **you** — Address the reader as *you* in second person.
- **user** — Only for users of the software your reader is developing.
- **we, our, us** — Not for the reader performing tasks; OK for the authoring organization if the antecedent is clear.
- **allows you to / enables you to** — Use *lets you*.

## Abbreviations and acronyms

- **AI** — OK unexpanded for most audiences. **generative AI** — spell out *generative*; never *gen AI*; don't hyphenate as adjective.
- **API** — For a web or language API; never for a single method or class.
- **API key** — Not *developer key* or *dev key*.
- **authN / authZ** — Don't use; write *authentication* / *authorization*.
- **CLI** — Don't use generically; name the specific CLI (e.g. Google Cloud CLI).
- **CPU** — All caps, no expansion needed.
- **DDoS** — *distributed denial-of-service (DDoS)* on first use, hyphenated as shown.
- **DevOps** — No expansion needed for most audiences.
- **DNSSEC / IDN / IKE / LOA-CFA** — Spell out and capitalize each word on first use; abbreviation OK after.
- **IaaS / PaaS / SaaS** — Spell out on first mention: *infrastructure/platform/software as a service (XaaS)*.
- **IAM** — Spell out on first use; lowercase for the general practice, product capitalization for the Google Cloud product.
- **ID** — Not *Id* or *id* (except string literals/enums); sometimes better spelled out as *identifier*.
- **I/O** — Not *I-O* or *IO*.
- **IoT** — OK for *Internet of Things*; lowercase *o*.
- **IPsec** — Not *IPSec*; no expansion needed.
- **GBps/Gbps, KBps/Kbps, MBps/Mbps** — Bytes vs bits per second; never *GB/s* forms.
- **k8s** — Don't use; write *Kubernetes*.
- **LRO** — *long-running operation* first, then *LRO*.
- **MIG** — *managed instance group* first, then *MIG*. Don't abbreviate *instance group* to *IG*.
- **N/A** — Not *NA*; spell out *not available* / *not applicable* on first reference.
- **OS** — OK for *operating system*.
- **PII** — *personally identifiable information*.
- **PoP** — *point of presence (PoP)*, not *(POP)*.
- **REST** — Don't expand to *Representational State Transfer*; the expansion helps no one.
- **RFC** — Space between RFC and number: *RFC 2318*.
- **SHA-1** — Not *SHA1* (except literals and hyphenated phrases).
- **SLA / SLI / SLO** — Lowercase spelled-out forms (*service level agreement/indicator/objective*); abbreviation OK after first use.
- **TTL** — *time to live* (no hyphens), then *TTL*.
- **US** — OK; not *U.S.* or *U.S.A.*
- **UTF** — Hyphenate encodings: *UTF-8*, *UTF-16*.
- **v** — Lowercase when abbreviating *version*.
- **regex** — Don't use; write *regular expression*. **repo** — write *repository*. **config** — spell out *configuration* except for verbatim code items. **admin** — write *administrator* unless it's a UI label (Android docs: use *admin*).

## Spelling and hyphenation

One word (closed): **autohealing, autopopulate, autoscaling, autotagging, backend, frontend, codebase, codelab, colocate, datastore, ecommerce, endpoint, filename, hostname, hardcode(d), healthcare, intercluster, inline, lifecycle, livestream, metafeed, metageneration, microservices, namespace, prebuilt, precapture, preemptible, prerecorded, presubmit, runbook, screenshot, subtree, subzone, timeframe, timestamp, toolkit, touchscreen, transpile, walkthrough, whitepaper, whitespace, wildcard, autoupdate→write "automatically update"**.

Two words (open): **data center, data cleaning** (not cleansing)**, data source, data type, file system, name server, resource record set, single most, table name, user base, web server, home screen / lock screen** (Android)**, key ring** (Cloud KMS).

Hyphenated: **big-endian, little-endian** (lowercase), **blue-green, error-prone, pre-existing, pre-shared key, read-only** (always), **sub-command, multi-cluster, multi-region, multi-service, multi-tenancy, non-key, on-premises** (never *on prem* / *on-premise*), **parent-child**.

Noun/verb splits: **fail over** (verb) / **failover** (noun, adj); **log in** / **login**; **set up** / **setup**; **sign in** / **sign-in** (not *log in*; *sign in to*, never *sign into*); **sign out** / **sign-out**; **start up** / **startup**; **time out** / **timeout**; **click through** / **clickthrough**; **plug in** (verb) / **plugin** (noun) / **plug-in** (adj); **third party** (noun) / **third-party** (adj, never *3rd party*); **time zone** / **time-zone** (adj); **wake lock** / **wake-lock** (adj); **high availability** / **high-availability** (adj, *HA* OK after first use); **load balancing** / **load-balancing** (adj).

- **data flow vs dataflow** — Two words if replaceable by "flow of data"; one word for stream processing/reactive programming.
- **runtime vs run time** — *Runtime* = execution environment; *run time* = the time during execution.
- **plain text vs plaintext** — *Plain text* generally; *plaintext* in cryptography.
- **style sheet / stylesheet** — Either, but be consistent per document.
- **deep linking** — Not *deep-linking*; prefer just *linking* when possible.
- **kebab case** — Don't use; say *dash-case*.

## Capitalization

- Lowercase except at sentence/heading/list start: **access token, bare metal** (hyphenate as modifier: *bare-metal server*), **base64** (code font only when a literal), **client ID, client secret, cross-site request forgery, domain name registrar, internet, egress, ingress** (capitalize *Ingress* for the GKE API), **persistent disk, status bar, trojan** (malware), **web, web application firewall, alpha, beta** (capitalize only in product names: *PRODUCT Beta*), **high performance computing (HPC)** (no hyphen).
- **A/B testing** — Capitalize with slash. **AM/PM** — all caps, no periods, space before: *9:00 AM*.
- **boolean** — Code font with exact language spelling for the type; lowercase for the abstract type; uppercase for *Boolean logic/mathematics*.
- **Markdown, Material Design, Search Console, Unicode** (not UNICODE), **Unix-like, Unix epoch time** (not *Unix time* / *epoch time*), **WebAssembly/Wasm** per spec, **NoSQL, OAuth 2.0** (not OAuth2), **HTTPS** (not HTTPs), **DNSKEY**, **curl** (not cURL), **lint** and **gsutil** lowercase code font, **PostgreSQL** (match *Postgres* only if the UI uses it).
- **2-step verification** — Initial caps for Google's product; lowercase generically.

## Terminology precision

- **agnostic** — Use *platform-independent*.
- **cell phone / cellular data / cellular network / smartphone** — Use *mobile phone*, *mobile data*, *mobile network*, *mobile device*; *phone* alone OK when clear. **mobile** — never a standalone noun.
- **chapter** — Not for non-book docs; use *document*, *page*, *section*.
- **client** — In API docs, short for *client app*; never short for *client library* (use *library*).
- **console** — Always name it (*the Google Cloud console*); *the console* only after first mention when unambiguous; sub-pages are *pages*, not *tabs*; use *the* before console names. Don't use *API Console*, *Developers Console*, *dev console*.
- **content type / media type** — Prefer *media type*; *content type* OK for the `Content-Type` header; never *MIME type* (if needed: *media (MIME) type*).
- **Control+S** — Format keyboard shortcuts as `Control`+CHARACTER (uppercase); mention macOS `Command` variants: `Control+S` (`Command+S` on macOS). Not *Ctl-S* or *Cmd-S*.
- **dash** — A dash (—) is not a hyphen (-); don't call a hyphen a dash.
- **dead-letter queue** — Define on first use.
- **directory vs folder** — Match the tool's term; otherwise *directory* for command line, *folder* for GUI; default *directory*.
- **documentation / document** — Say *this document*, not *this article/topic/doc/page* (*this tutorial/quickstart/codelab* OK for those types). Spell out *documentation*; *documentation set*, not *docset*.
- **downscope** — Define on first use, or use *reduce scope*; never *down-scope*.
- **element vs tag** — In HTML/XML a tag marks an element's start or end; don't call an element a *tag*.
- **email** — Not *e-mail*; not a verb — write *send email*.
- **foo, bar, baz** — Avoid; use meaningful placeholder names.
- **ad tech / fintech** — Spell out on first mention: *advertising technology (ad tech)*, *financial technology (fintech)*.
- **firewalls** — In Compute Engine/networking docs, use *firewall rules*.
- **Google** — Not a verb; use *search with Google*.
- **image** — Add context: *disk image*, *container image*.
- **key pair vs key-value pair** — A key pair is cryptographic keys; a key-value pair sets a value (never *key/value pair*).
- **limits / quota** — Specify the kind (*usage limit*, *service limit*); *quota* OK where it's the standard term (Google Cloud).
- **method** — Where it means a class member, don't also use it to mean "approach."
- **nonce** — Only in specific technical contexts, defined on first use; otherwise *a number that will be used only once*.
- **NoOps** — Use *fully managed*. A do-nothing instruction is a *no-op*.
- **on-premises** — For customer-managed facilities; a **peer gateway/network** may be on-premises *or* another cloud — don't conflate.
- **parameter** — In API docs usually a query parameter; clarify in other contexts.
- **path** — Prefer *path* over *filepath*, *file path*, *pathname*.
- **POJO** — For non-Java audiences use *simple object* ("a simple object, similar to a POJO in Java").
- **port** — *Listen on*, not *listen to*.
- **postmortem** — Use *retrospective* (DR/DevOps: *blameless postmortem*).
- **practitioner** — Only with supporting role definitions ("architects, developers, administrators, and other cloud practitioners").
- **RDP / ssh** — Not verbs: *connect using RDP*, "use the `ssh` command"; no *ssh'ing*.
- **screenshot** — Not a verb; *take a screenshot*.
- **service** — OK for Google products unless ambiguous.
- **subnet** — OK for *subnetwork*; be consistent.
- **tablet / device** — *Tablet* OK; unknown form factor → *device*.
- **tarball** — Use *tar file*.
- **compliant / compliance** — Use with caution; a compliance claim is a strong statement.
- **confidential vs sensitive** — *Confidential* data is protected from unauthorized access; *sensitive* data is data whose release could be harmful.
- **whitepaper** — One word; prefer a more precise descriptive term.
- **workload** — Ambiguous; prefer precision or define on first use.
- **World Wide Web** — Use *web*.
- **-aware** — Avoid as a compound modifier (*healthcare-aware*); OK in product names.
- **following** — A noun after *following* is optional unless needed for clarity ("in the following table", "do the following:").
