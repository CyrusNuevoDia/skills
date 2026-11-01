# Code and Markup

Rules from the Google developer documentation style guide on code in text, code samples, command-line syntax, placeholders, API reference comments, semantic tagging, HTML formatting, and Markdown vs. HTML.

## Code in text

Use code font (backticks in Markdown, `code` element in HTML) for text that refers to a code entity — it signals verbatim entry, shows the boundaries of what to type, and separates the entity from surrounding prose.

**Put in code font:**

- Attribute names and values — "The `imageURL` attribute contains the path for the image file"
- Class names — "The `SnapshotDiskOperator` class includes the `generate_snapshot_name` method"
- Command output
- Command-line utility names — `gcloud`, `kubectl`, `bq`
- Data types — "Nested data is represented as a `STRUCT` type"
- Database elements (row and column names)
- Defined (constant) values — "The constant `city` has the value `"San Francisco"`"
- DNS record types — "Create a DNS `AAAA` record"
- Element names (HTML and XML) — don't put angle brackets (`<>`) around the element name
- Enum (enumerator) names
- Environment variable names
- Filenames, filename extensions, and paths — "Open the `pg_hba.conf` file in the `/etc/postgresql/13/main` directory"
- Folders and directories
- HTTP content-type values — `application/fhir+json`
- HTTP status codes — "the HTTP `500 Internal Server Error` status code"
- HTTP verbs — "use a `POST` request"
- IAM role names — `roles/cloudfunctions.invoker`
- IP addresses — `10.10.10.10`
- Language keywords — "after the `FROM` keyword"
- Method and function names — "call the `get_job_status` method"
- Namespace aliases
- Placeholder variables — "Replace `SUBNETWORK_NAME` with..."
- Package names — "distributed as the `beautifulsoup4` package"
- Port numbers — "listening on TCP port `50000`"
- Query parameter names and values — "use the `recursive=true` query parameter"
- Strings (URLs, domain names) used in commands and code — "the `logID` field includes the domain `corpaudits.example.com`"
- Text input — "In the **Key name** field, enter `config-management`"
- UI elements rendered from previously entered text — use bold plus code font

Don't put quotation marks around code unless the quotation marks are part of the code.

**Put in ordinary (non-code) font** (unless referring to them as computer input/output or a code entity):

- Domain names — "standard application offerings from example.com"
- Names of products, services, and organizations — "Google products such as Google Docs"
- URLs the reader follows in a browser — prefer a link with descriptive link text over exposing the URL

**Code in UI elements:** if a UI element meets the requirements for code font, use both code font and bold. ✅ Recommended: In the **Network** list, select **`my-net-2`**.

**Sometimes code font:**

- Boolean values: format the value as code when referring to the data type value (`true`, `false`, `1`, `0`); use non-code font when referring to the evaluation of a condition as true or false. ✅ "If the update succeeds, returns `true`." ✅ "`enableCertificateValidation`: If true, validates the SSL certificate before proceeding."
- Command-line utility names vs. product names: code font for the command, ordinary font for the project or product. ✅ "Invoke the GCC 8.3 compiler using `gcc` for C programs." ✅ "The options for the `curl` command are explained on the curl project website."
- Email addresses: code font when used as computer input or output ("enter `alex`, not `alex@example.com`"); non-code font and a mailto link when it's a way to contact someone.

**Method names:** omit the class name except where including it prevents ambiguity. ✅ Recommended: "call its `get` method." ❌ Not recommended: "call its `animal.get` method."

**HTTP status codes:** call it a *status code*, not a *response code* or *error code*. Put the number and name in code font: "an HTTP `400 Bad Request` status code". Drop "HTTP" only when implicit from context. For ranges, use `Nxx` with a specific digit ("an HTTP `2xx` or `400` status code") or an exact range ("an HTTP status code in the `200`-`299` range") — numbers stay in code font even without the name.

**Grammatical treatment:** don't use code elements as English verbs or nouns, and don't inflect them (plural, possessive); add a noun after the code element and inflect that noun instead.

- ✅ "The `ADDRESS` constant's value is defined in the `settings.h` file." ❌ "`ADDRESS`'s value is defined in `settings.h`."
- ✅ "To add the data, send a `POST` request." ❌ "`POST` the data."
- ✅ "You can't call the `close` method for a file before you call `open`." ❌ "`Close`ing the file requires you to have `open`ed it first."
- ✅ "Takes an array of extended ASCII code points (an array of `INT64` values) and returns `BYTES` values." ❌ "(ARRAY of INT64) and returns BYTES."

**Linking API terms (generated reference docs):** link the first instance of each API element (class, method, constant, XML attribute) to its reference page, in code font; later uses in the same section stay in code font but unlinked. Very common classes (`Activity`, `Intent`) don't need linking every time. When using a term as a concept rather than a class (activity, service, fragment, view, intent, content provider, broadcast receiver, action bar, app widget, loader), use lowercase non-code font; when referring to an actual instance, use the formal class name in code font and link it. Link a class using the class name as link text; link a method using the method name as a fragment identifier (include the class name for static methods, and show the full signature to distinguish overloads, e.g. `onCreate(Bundle)`).

## Code samples

- Follow the indentation guidelines of the relevant code style guide — usually spaces, two per level (some contexts use four spaces or tabs).
- Wrap lines at 80 characters; consider fewer if readers may have narrow windows or print the doc.
- Mark code blocks as preformatted text: `pre` element in HTML, four-space indentation (or a code fence) in Markdown.
- Indicate omitted code with a comment in the language of the sample (`# Several lines of code are omitted here.`), never three dots or the ellipsis character (`…`). Don't make a block with an omission click-to-copy.
- Precede a code sample with an introductory sentence or paragraph. End it with a colon if it immediately precedes the sample; end with a period if other material intervenes or the final sentence isn't directly related to the sample. ✅ "The following code sample shows how to use the `get` method:" [sample]. ❌ "...For information about other methods, see [link]:" [sample].
- Follow the relevant coding style guide (Google's public style guides, or a project's own overriding guide) for language-specific conventions.

## Command-line syntax

**Best practices:**

- Provide an inline link to the command reference in the text that introduces the command.
- Use as few optional arguments as possible in non-reference content; rely on the command reference for the complete list.
- Provide click-to-copy examples the reader doesn't need to edit: only runnable code and placeholder variables. Avoid `[]`, `{}`, `|`, and `...` in click-to-copy examples — those characters break commands if not removed.

**Formatting a command:**

- Use a `pre` element (HTML) or code fence (Markdown) for command blocks.
- Break lines over 80 characters before characters like a single hyphen, double hyphen, underscore, or quotation marks; indent continuation lines by four spaces.
- End every line except the last with the command-continuation character: ` \` (Linux/Cloud Shell) or ` ^` (Windows). Without it the command doesn't work.
- Follow the command with a descriptive list of its placeholders.
- When documenting an option or argument, use end punctuation for complete sentences; don't for single words or noun phrases, unless the list mixes both.
- For `bash`/`sh` commands, follow the shell style guide's quotation-mark style.

**Command prompt:**

- With multiple lines of input in one block, start each input line with the prompt symbol (`$`); consider disabling text selection on the symbol so it isn't copied.
- Don't show the current directory path before the prompt. If the context changes (local to remote machine), add an appropriate additional prompt indicator.
- For a one-line command, the prompt is optional — but if a document mixes multi-line and one-line commands, use the prompt everywhere for consistency.
- Put input and output in separate code blocks.

**Argument syntax:**

- Optional arguments: square brackets, each optional item in its own set — `gcloud dns GROUP [GLOBAL_FLAG] [FILENAME]`.
- Mutually exclusive arguments: curly braces with pipes between choices — `{FILE_1|FILE_2}`.
- Repeatable arguments: three dots, no spaces — `[GLOBAL_FLAG ...]`.
- Keep all of these out of click-to-copy examples. Instead: remove the optional arguments and link the reference; or provide separate click-to-copy blocks per option; or document options as separate tasks; or, if you must include the special characters, say so when introducing the command.

**Output from commands:**

- Show output only when it adds value (the reader copies or verifies a value).
- Introduce output with "The output is similar to the following:" or "The output is the following:" (customize when calling out something specific).
- Indicate omitted output lines with three dots (`...`) on their own line, never the ellipsis character (`…`).

**Terminology:**

- Don't map `gcloud` CLI nomenclature onto Linux commands. For complicated Linux commands, describe what the whole command does rather than naming each element; ask whether the reader needs the element's name at all.
- In `gcloud` docs, refer to commands and command groups generally as commands; a *flag* is any element other than the command or group name; a command or flag may take an *argument*. *Option* works as a catchall when you don't want specialized nomenclature.
- Linux commands use *options*, *parameters*, *arguments*; the hyphen (called a *dash* in this context) is part of the option. Metacharacters (`*`, `?`, `^`) are used for globbing; `|`, `>`, `<`, `<<`, `>>` are redirection symbols.

**Linux signals** — use these terms only in the context of process control, and don't substitute:

- **`SIGKILL`** — *kill* a process; cannot be caught, blocked, or ignored. Don't substitute cancel, end, exit, quit, stop, or terminate.
- **`SIGTERM`** — request to *terminate* a process; lets it clean up child processes. Don't substitute cancel, end, exit, quit, or stop.
- **`SIGQUIT`** — *quit* a process from a keyboard; can be caught, blocked, or ignored. Don't substitute cancel, end, exit, or stop.
- **`SIGINT`** — *interrupt* a process immediately (e.g. `Control+C`); default action terminates gracefully. Don't substitute suspend, end, exit, pause, or terminate.
- **`SIGPAUSE`** — tells a process to *pause* or *sleep* until a terminating or signal-catching signal arrives. Don't substitute cancel or interrupt.
- **`SIGSUSPEND`** — temporarily *suspend* execution during a critical code section. Don't substitute pause or exit.
- **`SIGSTOP`** — *stop* execution for later continuation via `SIGCONT`; cannot be caught, blocked, or ignored. Don't substitute cancel, end, exit, interrupt, quit, or terminate.

## Placeholders

Placeholders represent values the reader must replace (or, in output, values that vary). Give each a descriptive name.

- Don't use a single *x* or a series of *x*'s as a placeholder; use an informative name. Exception: where a series of x's is the standard (HTTP status codes like `4xx`), it's fine.
- **Formatting inline:** HTML — `<code><var>PLACEHOLDER_NAME</var></code>` for code/command placeholders, bare `<var>` for non-code placeholders. Markdown — backticks with asterisks outside: `` *`PLACEHOLDER_NAME`* ``.
- **Formatting in code blocks:** HTML — `pre` with `var` tags. Markdown — a code fence; formatting like bold or italic can't apply inside a fence, so the placeholder appears as plain `PLACEHOLDER_NAME`.
- **Placeholder text:** uppercase with underscore delimiters. ✅ `API_NAME`, `METHOD_NAME`. ❌ `API-name`, `api_name`, `apiName`, `API name`. If that convention is a bad fit for the context, use something else but be internally consistent.
- Don't include possessive adjectives. ❌ `MY_API_NAME`, `YOUR_API_NAME`.

**Explaining placeholders:**

- Explain each placeholder the first time you use it; repeat only when it helps (long document, many placeholders in a long procedure, or a document not read start to finish).
- Single placeholder: "Replace `PLACEHOLDER` with a description of what it represents." ✅ "Replace `BUILD_ID` with the ID of the `WORKING` build that you copied in the preceding step."
- Two or more placeholders: follow the command with a list introduced by "Replace the following:", in the order they appear in the command, explaining every placeholder even if it seems intuitive. Format each item as the placeholder, a colon, then a description starting with a lowercase letter (`` `INSTANCE_NAME`: description ``). Introduce an example within a description with an em dash or "such as".
- Placeholders in output: mark them with `var`, follow the example with a list introduced by "This output includes the following values:", in order of appearance, same item format as above.

## API reference comments

**Basics:**

- Provide a description for every class, interface, struct, and similar member; every constant, field, enum, and typedef; and every method, including each parameter, the return value, and any exceptions thrown.
- Include a short code sample (~5-20 lines) at the top of each unique page.
- Put all API names, classes, methods, constants, and parameters in code font, and link each to its reference page.
- Put string literals in code font in double quotation marks — `"wrap_content"`, `"true"`.
- Match the class name's spelling in code exactly (capitals, no spaces: `ActionBar`). Don't pluralize class names (`Intents`); add a plural noun instead (`Intent` objects, `Activity` instances). A class whose name is a common term can be referred to by the English word in lowercase, non-code font (activities, action bar).
- Use present tense for all descriptions — "Adds a new bird to the ornithology list." "Returns a bird."

**Classes, interfaces, structs:**

- Open with one brief sentence stating the class's purpose, adding information not deducible from the name and signature; elaborate afterward on usage, invocation/instantiation, key features, best practices, and pitfalls.
- Make the first sentence unique, descriptive, and short — tools extract it for class lists.
- Don't repeat the class name in the first sentence, don't say "this class will/does ...", and don't use a period before the sentence's end (some generators cut the short description at the first period — write "for example", not "e.g.").

**Members:** keep constant and field descriptions as brief as possible, and link to the relevant methods that use them.

**Method descriptions:**

- First sentence states the action; subsequent sentences explain why and how to use it, prerequisites, exceptions, and related APIs. Document dependencies (such as required permissions) and what happens when they're missing ("the method throws a `SecurityException`", "the method returns null").
- Operation that returns data: start with the verb — "Adds a new bird to the ornithology list and returns the ID of the new entry."
- Getter returning a boolean: "Checks whether ...."
- Getter returning anything else: "Gets the ...."
- No return value: "Sets the ....", "Updates the ....", "Deletes the ....", "Registers ....". For a callback (methods named `on...`): "Called by ... when ....", then "Subclasses implement this method to ....".
- Convenience constructor method: "Creates a ....".

**Parameters:**

- Capitalize the first word and end with a period.
- Begin non-boolean parameter descriptions with "The" or "A" — "The ID of the bird you want to get."
- Boolean parameters that tell the API to do something: state the behavior for true and for false — "If true, validates the SSL certificate before proceeding. If false, trusts the certificate without validating it."
- Boolean parameters describing established state: "True if ...; false otherwise."
- In this context, don't put "true" and "false" in code font or quotation marks.
- For defaults, explain the behavior for each value or range, then state the default using the format "Default:".

**Return values:** be brief; detail belongs in the class description. Non-boolean: start with "The ..." — "The bird specified by the given ID." Boolean: "True if ...; false otherwise."

**Exceptions:** where the generator inserts "Throws", begin with "If ..." ("If no key is assigned."); otherwise begin with "Thrown when ...".

**Deprecations:** tell the reader what to use as a replacement, and mention the version it was first deprecated in if you track versions. Put the most important information in the first sentence (only it appears in summaries and indexes); later sentences can explain why. For a deprecated method, tell the reader what to do to make their code work.

## Semantic tagging

Use HTML elements for their designed purposes; when no semantically relevant element exists, use CSS or the few elements that convey visual style without semantics.

- Mark titles of standalone works (books, movies) with the `cite` element.
- Don't use frames or tables for layout; use CSS.
- Don't use heading elements (`h1`, `h2`) to visually style text; use them only for hierarchically structured headings, and CSS for visual style.
- `em` means emphasis, not italics — use `i` for non-emphasis italics.
- `strong` means strong importance, not bold — use `b` for bold without importance.
- `br` is only for line breaks that are part of the content (poems, addresses) — use `p` and CSS for spacing, never `br`.

## HTML formatting

Follow the HTML/CSS style guide, with one exception: don't leave out optional elements. These basics also apply to other source files (YAML, Markdown):

- Don't use tabs to indent; use spaces only (editors interpret tabs differently, and some Markdown features expect spaces).
- Indent by two spaces per level.
- Use all-lowercase for elements and attributes.
- Don't leave trailing spaces (except as needed for Markdown).

**Line length:** break lines at 80 characters, except: `meta` element content must stay on one line; a URL can't contain a line break, so put a long URL on its own line with the `href` attribute. Break code snippets in `pre` blocks at 80 characters too — but match an older file's existing consistent line length when making small changes, and never let a line break change the code's meaning.

## Markdown versus HTML

Use either HTML or Markdown. Markdown is easier to write and read; HTML is more expressive (especially for semantic tagging) and can achieve effects Markdown can't — for example, you might need the HTML `code` element for special characters like nonbreaking spaces in code. The choice is personal preference, but if your team or template already uses one, use that.
