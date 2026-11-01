# Procedures, UI Elements, Prescriptive Writing, and Images

## Procedures

### Introductory sentences
- Introduce a procedure with a sentence that adds context beyond the heading; skip the intro if it would just repeat the heading.
- End the intro with a colon if it immediately precedes the steps, a period if other material (like a note) comes between.
- Don't introduce a procedure with a partial sentence completed by the steps.
  - ✅ Recommended: "To customize the buttons, follow these steps:" / "Customize the buttons:" / "To customize the buttons, do the following:"
  - ❌ Not recommended: "To customize the buttons:"

### Single-step procedures
- Write a one-step procedure as one sentence formatted as a single bulleted list item — not as a numbered list, and not with a "follow this step" lead-in.
  - ✅ Recommended: "- To clear (flush) the entire log, click **Clear logcat**."
  - ❌ Not recommended: "To clear the log, follow this step: 1. Click **Clear logcat**."

### Sub-steps
- Label sub-steps with lowercase letters and sub-sub-steps with lowercase Roman numerals.
- Treat a step that has sub-steps like an introductory sentence: end it with a colon or period as appropriate.

### Order of components in a complex step
Document a complex step in this order:
1. Describe the action to take.
2. List the command, if any.
3. Explain any placeholders in the command.
4. Explain the command in more detail, if necessary.
5. List the command's output, if necessary.
6. In a separate paragraph, explain the result of the action or the output, if necessary.

### Multi-action steps
- Use one step per action, but combine sequential menu selections into one step with angle brackets.
  - ✅ Recommended: "Click **Next > Finish**." / "Click **File > New > Document**."
- Split steps that feel too long into multiple steps.

### Multiple procedures for the same task
- Document one procedure that's accessible to all readers; if all methods are accessible, pick the shortest and simplest.
- If you must document multiple methods, separate them into different pages, headings, or tabs.
- Prefer a procedure that can be completed with only a keyboard, the shortest procedure, and one using a programming language most of the audience knows.
- When there's more than one way to do something, give only the best way — alternates confuse readers.

### Repetitive procedures
- Don't repeat procedures; reference and link to them instead ("Create a user as you did in the previous step.").

### Optional steps
- Start an optional step with "Optional:" — not "(Optional)".
  - ✅ Recommended: "Optional: Type an arbitrary string..."
  - ❌ Not recommended: "(Optional) Type an arbitrary string..."

### Location, goal, action — in that order
- State where the reader completes the action before the action itself.
  - ✅ Recommended: "In Google Docs, click **File > New > Document**."
  - ❌ Not recommended: "Click **File > New > Document** in Google Docs."
- When procedures span multiple headings, restate the context (tool, console, environment) in the first step of each procedure, even if it's unchanged.
- State a step's goal before the action.
  - ✅ Recommended: "To start a new document, click **File > New > Document**."
  - ❌ Not recommended: "Click **File > New > Document** to start a new document."
- If the "To ..." form could imply the step is optional, use the colon form instead: "Sort the data by date: click ...". Use "To ..." when the context makes requiredness obvious.

### Results and justifications
- State the action first, the result second, in the same paragraph: "Click **Run**. The query results appear after the query runs."
- To avoid repetition and over-bolding, fold the result into the next step instead of stating it separately.
  - ✅ Recommended: "1. Click **Enter**. 2. In the **New file** dialog that appears, click **Next**."
  - ❌ Not recommended: "1. Click **Enter**. The **New file** dialog appears. 2. In the **New file** dialog, click **Next**."
- State a justification after the action: "Store the private key in a secure location. You need it later."

### General step-writing rules
- Start the first sentence of each step with an imperative verb. ✅ "Clone the repository that contains the sample data." ❌ "You need the project ID later. Retrieve the project ID."
- Use complete sentences.
- Use parallel structure and consistent verb forms across steps.
- Don't use directional language (*above*, *below*, *right-hand side*); use "preceding"/"following" for references, and screenshots for hard-to-find UI. ✅ "Click menu **Menu**." ❌ "Click the button with three lines."
- Don't use *please*. ✅ "To open a document, click **File > Open**." ❌ "...please click **File > Open**."
- Don't introduce code with "run the following command"; say what the command does. ✅ "In Cloud Shell, deploy the load generator:" ❌ "Run the following command:"
- If the reader must press Enter, include that in the same step. ✅ "Click the search box, type `custom function`, and then press **Enter**."
- Don't include keyboard shortcuts as instructions. ✅ "Copy the command, and then paste it..." ❌ "Press Ctrl+C, and then press Ctrl+V..."
- Give readers required information (hardware, software, prerequisites) before the task starts.
- Include as few steps as possible; limit interruptions in the path.
- Focus on one reader decision at a time — make each instruction its own list item.

## UI elements and interaction

### Focus on the task
- When practical, state instructions in terms of what the reader accomplishes, not widgets and gestures ("Refresh the page." rather than "Click **Refresh**."). This future-proofs procedures.
- Match detail to the audience: if the UI isn't obvious or the point is to tour the UI, name elements and gestures explicitly.

### Formatting UI element names
- Bold the name of any UI element (button, menu, dialog, window, list item, field label). Don't use code font unless the element also meets code-font requirements — then use both.
- Don't bold official feature or product names, except when the name directly labels an on-page element (window title, button name).
  - ✅ Recommended: "In the **New project** window, select the **New activity** checkbox, and then click **Next**."
  - ❌ Not recommended: "In the New Project window, select \"New Activity\", and then click the \"Next\" button."
- Outside a procedure, give context for an element: "...in the **Current jobs** section of the service console", not just "in the **Current jobs** section".

### Capitalization
- Follow the label's on-page capitalization, but use sentence case when the label is all-uppercase or labels are inconsistently cased.
  - ✅ "Click **Refresh**." ❌ "Click **REFRESH**."
  - ✅ "Click **New project**, and then click **New activity**." ❌ "Click **NEW PROJECT**, and then click **New Activity**."

### Don't use UI labels as verbs or nouns
- ✅ "In the **Name** field, enter an account name." ❌ "**Name** the account."
- ✅ "To save the settings, click **Save**." ❌ "**Save** the settings."
- ✅ "For **Service account ID**, enter a name." ❌ "Specify a **Service account ID**."

### Element terminology
- Don't use slang terms for UI elements (*hamburger icon*, *zippy*).
- **Window** — the entire application window, or a modular openable/closable app element. Don't call a window a page.
- **Page** — a web page in general, and a subpage of a console in particular. Don't call a console page a window.
- **Dialog** — a smaller window detached from and in front of the main window. Don't say "pop-up window".
- **Pane / panel** — a distinct rectangular region within a larger window, often tightly coupled to surrounding UI. Don't call it a window, section, area, or column.
- **Section** — a labeled grouping of options and controls within a window, pane, or panel. Don't call it an area or column.
- **Menu / menu bar** — a menu bar is the set of menus at the top of a window or screen; menus contain *commands*. Use *command*, not *choice*, *menu item*, or *option* (exception: *menu item* is fine when documenting how to build an interface). Use the form "the **File** menu"; locate a command with "In the **File** menu, select **Open**." Don't use *drop-down* as a synonym for *menu*.
- **Navigation menu** — a control listing items that navigate to pages. Don't say *navigation bar*, *navigation pane*, *navigation panel*, or *navigation window*.
- **Toolbar** — a set of buttons for common actions; a toolbar button with a menu is a *menu button*. Name the toolbar when it helps the user find a button.
- **Tab** — use the form "the **Edit** tab".
- **Text box** — use *box*: "In the **Owner** box, enter your name." Format user-typed text in code font. In Google Cloud and Google Workspace docs, use *field* instead of *box*.
- **List box** — "the **Item** list" or "the **Item** box", whichever is clearer: "In the **Item** list, select **Desktop**."
- **Combo box** — "the **Font** box"; use the verbs *type or select* or *enter*.
- **Spin box** — "the **Font Size** box"; use the verb *enter*.
- **Checkbox** — "the **Bookmarks** checkbox". Use *select* and *clear*, not *check* and *uncheck*; describe state as *selected* / *not selected*.
- **Radio button** — refer to it by its label ("Select **Do not remember passwords**.") or to the group by its label ("For **Startup mode**, select an option.").
- **Expander arrow** — the element that expands or collapses a section. Avoid referring to it explicitly; when you must, say *expander arrow* and *expandable section*, never *expando* or *zippy*.
- **Toggle** — the on/off switch element. Don't use *toggle* as a verb; describe the action: "To turn on the setting, click the **Wi-Fi** toggle." If the starting state is unknown, name the target position: "click the **Magic mode** toggle to the on position."

### Buttons and icons
- Refer to a button by its label: ✅ "Click **OK**." ❌ "Click the \"OK\" button."
- For an icon button, write the button's name as shown in its tooltip and put the icon before the name (with a nonbreaking space if needed). ❌ Don't refer to an icon by appearance alone ("click the hammer icon").
- If unsure of an icon's name, inspect the element for `aria-label`, `aria-labelledby`, `aria-describedby`, `label`, `placeholder`, or `title`. If a button has no tooltip, file a bug to get one added.
- Leave out a trailing ellipsis in an element name: ✅ "Click **Browse**." ❌ "Click **Browse ...**."
- For hard-to-find elements, instead of directional language: use the icon plus its tooltip name, add context ("On the Cloud Run toolbar, click **Refresh**."), or provide a screenshot.

### Angle-bracket menu paths
- Put a nonbreaking space before each `>`.
- Bold the entire sequence as one unit, not each name separately.
- In HTML, wrap the bracket in `<span aria-label="and then">></span>` so screen readers say "and then" rather than "greater than".
- Use the notation only for menu items — never to chain different kinds of UI elements. ❌ "Select **MyApp** > **Preferences** > **Languages** > **+** > **CSS**."

### Keyboard keys
- Use the `kbd` element (monospace in non-HTML markup) for keys the user presses: "Press `Control+C`."
- Use uppercase for letter keys: ✅ `Control+S`, ❌ `Control+s`.
- Use the `code` element, not `kbd`, for a key typed as text input.
- Use the key's name, or "the `Esc` key" if ambiguous.
- Spell out modifier keys (Command, Control, Option, Shift); don't use symbols. Combination form: `MODIFIER+KEY`, Shift combos as `MODIFIER+Shift+KEY`.
- Give the macOS shortcut in parentheses after the Windows/Linux one: "press `Control+C` (or `Command+C` on macOS)". ❌ "`Ctrl+C` (`⌘+C`)".
- Spell out confusable characters in shortcuts (comma, hyphen, period, plus).
- Say *keyboard shortcut* or *key combination*; use *press* for causing an action, *enter* or *type* for text input.

### Prepositions
- Use **in** with dialogs, fields, lists, menus, panes, and windows: "In the **Name** field, enter `wsfc-1`."
- Use **on** with pages, tabs, and toolbars: "On the **Edit** tab, click **Save**."

### Verbs in procedures
- Use these verbs for on-page actions: click, choose, drag, enable, enter/type, go to, hold the pointer over, press, select, tap, turn on / turn off.

## Prescriptive documentation

- Write prescriptive (opinionated) documentation: recommend a path and tell the reader what to do rather than listing options. State a clear purpose, choose scenarios and procedures that match the most likely use cases, and give sample commands for the most common case.
- Generally avoid *should* — it's ambiguous about whether an action is required or optional.
- **If an action is required** — use *must*, or a clear imperative ("Do the following before you continue.").
- **If an action is recommended** — use "We recommend ..."; *should* is acceptable only for generally recognized recommendations ("You should use a strong password ...").
- **If an action is optional** — use *can*: "You can also use approach B."
- **If an outcome is expected** — state it plainly: "The process returns 10 items."
- **If an outcome is possible** — use *might* or *can*: "The process can take about 30 minutes."
- **If describing a state** — never "The value should be true"; say which you mean: "You must set the value to true." / "The server sets the value to true." / "If the value is false, follow these steps to change it."
  - ✅ Recommended: "Ensure that the button conforms to our size guidelines." ❌ "The button should conform to our size guidelines."
  - ✅ Recommended: "The column that the filter operates on." ❌ "The column that the filter should operate on."
  - ✅ Recommended: "...perform the following steps." ❌ "...here's what you should do."

## Images

### When and how to create images
- Use images only when they explain something words can't easily; capture only UIs relevant to the discussion.
- Never use images of text, code samples, or terminal output — use actual text.
- For diagrams, prefer SVG (stays sharp when zoomed), otherwise PNG; never use a transparent background.
- For animations and video, use a resource-efficient format like MP4, not animated GIF.
- Be consistent within a doc set: same OS for all screenshots, same visual treatment (e.g. drop shadows).
- Crop screenshots to the relevant information — cropping focuses the reader and future-proofs against unrelated UI changes.
- Never include PII in screenshots; if the source has PII, cover it with a 100%-opacity solid overlay (blurs and mosaics can be reversed), and flatten layered formats (PDF, TIFF) on export.
- Don't use image maps; provide a list of text references after the image instead (accessibility, mobile scaling, and maintenance all suffer with maps).
- Use descriptive filenames.

### Introducing images
- Introduce most images with a complete sentence — colon if the image immediately follows, period if material intervenes. Screenshots that immediately follow procedural text describing the UI need no introduction.
- Introduce diagrams in the text, not in the alt text.

### Alt text
- Write concise, descriptive alt text (155 characters or less) as a full sentence or noun phrase, considering the image's context, not just its content; if the image carries more information than fits, summarize in `alt` and describe fully in surrounding text.
- Use empty alt (`alt=""`) for decorative images or images that only restate nearby text — but always include the `alt` attribute, or screen readers may read the filename.
- Don't write "Image of" or "Photo of"; include punctuation (screen readers pause on it); avoid all-caps; reuse identical alt text for repeated instances of the same icon or control.
- Don't use figure captions as a substitute for alt text.

### Figure captions and descriptions
- Captions and figure numbers are optional; if numbered, use the form "**Figure 1.** Description." with end punctuation, preferably a complete sentence.
- Refer to figures by number ("as shown in figure 1", lowercase *figure* mid-sentence), never spatially ("the image above"); if you can't use numbers, show the figure again.
- Don't include the caption text in a sentence that references the figure.
- Use a figure description (text conveying the same information as the figure) when the caption doesn't carry the figure's full meaning; never introduce new information only in an image.

### Text in figures
- Avoid embedding explanatory text in graphics — it hurts accessibility, searchability, and localization. If you must, provide the same information in text (e.g. a figure description).
- When text is embedded: keep it brief (avoid full sentences and punctuation), don't embed captions or descriptions in the image, don't invent abbreviations, use sentence case, use numbered callouts (not detailed annotations), and use full trademarked product names.

### High-resolution images
- Provide high-DPI variants with `srcset` (`1x`, `2x`, ...) alongside a required `src` that points to the standard-resolution image — older low-resolution browsers use `src`, so don't make them download the 2x file.
- The 2x image must be exactly double the 1x dimensions (± a pixel); name it `BASENAME_2x.EXT` for clarity.
- Never upscale a 1x image to fake a 2x; if you only have 1x, use it alone. Downscaling a high-resolution original to 1x and 2x is fine.
- Set `width` to the CSS pixel size; don't set `height` explicitly.
- Browsers that support `srcset` ignore `src`, so list every available resolution in `srcset`.

### Layout
- Don't position images manually with `style` attributes; use the site's standard CSS.
- Don't make images too small — full column width is fine — and don't use images wider than their column (resize oversized screenshots; ask designers for correctly sized pairs).
- Don't center images, don't put `img` inside `p`, and don't link to a figure from the same page unless the page is very long.
- Consider how the image will look when printed.
