---
name: gemini-cli
description: |
  Use the `gemini-api` CLI (google-gemini/gemini-api-cli) to call Gemini models and managed agents from the shell.
  Use when the task needs something Gemini does well or Claude can't do natively: generating or editing images,
  speech (TTS), music, or video; analyzing PDFs, images, audio, video, or YouTube URLs; transcribing recordings
  to text/SRT; getting a second opinion from a Gemini model; or delegating long-running research to a Gemini
  managed agent (Deep Research, Antigravity). Triggers include "use Gemini", "ask Gemini", "nano banana",
  "generate an image/logo/mascot/hero", "make a voiceover", "text to speech", "generate music", "generate a video",
  "transcribe this", "captions/SRT", "what's in this video/YouTube link", "deep research", and explicit `/gemini-cli`.
---

# gemini

`gemini-api` is a stateless Go binary over the Gemini Interactions API. Every call is independent: you pick the
model, supply the context, and keep whatever IDs (interaction IDs, `files/<id>`, `voice_<id>`) you want to reuse.
Media commands write a file and print only its path on stdout, so capture stdout and keep building.

## Setup check

Run `gemini-api whoami` first if a call fails with exit code 3. Credentials resolve from `--api-key`,
`GEMINI_API_KEY`, the OS keychain, then `~/.config/gemini-api/config.yaml`. Never echo or paste the key; if none
is configured, ask the user to run `! gemini-api configure --interactive`. Install if missing:
`curl -fsSL https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.sh | bash`.

## Rules

1. **Discover from the binary, not memory.** Models and flags change between releases. `gemini-api <cmd> --help`
   for flags, `gemini-api models` for the curated offline catalog, `gemini-api <cmd> --schema` before writing
   any `--body` JSON, `gemini-api --usage` for the full KDL command tree.
2. **Pass `--no-interactive`** (or set `GEMINI_CLI_AGENT_MODE=1` / `--agent-mode`) so nothing blocks on a prompt.
   Agent mode also emits structured JSON errors on stderr and defaults stdout to TOON; add `-o json` when you
   want JSON.
3. **`--dry-run` is free.** It validates flags and prints the resolved HTTP request with no network or keychain
   access. Use it before expensive calls (video, music, 4K images, Deep Research) or when building `--body`.
4. **Streaming commands need `--stream=false` for JSON/`--jq`.** `generate`, `agent run`, and
   `agent status --stream` stream by default; `agent run --background` already returns one object.
5. **Write media into the project deliberately.** Always pass `--out <path-or-dir>`; defaults land in cwd with
   timestamped names. TTS always writes WAV regardless of the extension you give.
6. **Files over ~14 MB** (20 MB base64) must go through `gemini-api files upload <path> --wait` first; pass the
   returned `files/<id>` to `-i`. Uploads expire after 48 hours.
7. **Exit codes:** `0` ok, `1` runtime/API failure, `2` bad usage/validation (fix the flags, don't retry),
   `3` auth.

## Pick a command

| Need | Command |
|---|---|
| Text answer / second opinion | `gemini-api generate "…" [-m MODEL] [--system "…"] [-i file]` |
| Question about a PDF, image, audio, video, CSV, YouTube URL | `gemini-api analyze -i FILE [-i FILE2] "question"` |
| Transcript or captions | `gemini-api transcribe -i FILE --format md\|text\|json\|srt --out PATH` |
| Image (new or edit) | `gemini-api image "…" [-i ref.png] [--aspect-ratio 16:9] [--image-size 2K] --out PATH` |
| Voiceover | `gemini-api tts "…" [--voice Kore] [--style "…"] [--multi-speaker "A=Kore,B=Puck"] --out PATH.wav` |
| Music | `gemini-api music "…" --out DIR/` |
| Video | `gemini-api video "…" [--aspect-ratio 9:16] [--resolution 1080p] --out PATH.mp4` |
| Long research / managed agent | `gemini-api agent run "…" --agent deep-research-preview-04-2026 --background --jq .id` |
| Full request control (tools, structured output, multi-turn) | `gemini-api agent run --body @req.json` (see `--schema`) |

## Core patterns

```bash
# Plain text out, nothing else on stdout
gemini-api generate "Critique this API design: …" --no-interactive

# One complete JSON interaction; extract just the model text
gemini-api generate "…" --stream=false -o json \
  --jq '[.steps[] | select(.type=="model_output") | .content[] | select(.type=="text") | .text] | join("")'

# Pipe a file or diff in as prompt text
git diff | gemini-api generate --stdin "Review this diff for bugs" -m gemini-4-carbon

# Image, then edit it in place via -i
P=$(gemini-api image "Flat vector mascot, transparent-friendly, no text" --out ./assets/mascot.png)
gemini-api image "Same mascot waving" -i "$P" --out ./assets/mascot-wave.png

# Big media: upload once, reuse the files/<id>
F=$(gemini-api files upload talk.mp4 --wait)
gemini-api analyze -i "$F" "List action items with timestamps"
gemini-api transcribe -i "$F" --format srt --out talk.srt

# Background Deep Research, then fetch the result later
ID=$(gemini-api agent run "Survey X with citations" --agent deep-research-preview-04-2026 --background --jq .id)
gemini-api agent status "$ID" -o json --jq .status          # in_progress | completed | failed | …
```

Long jobs (video, Deep Research) can take minutes: run them with `run_in_background` or `--async`/`--background`
and poll, rather than holding a foreground shell open.

## References

Read these only when the task needs the detail:

- `references/commands.md` — every Create/Understand command's flags, defaults, and gotchas.
- `references/models.md` — the model catalog and which model to pick for which job.
- `references/agents-and-body.md` — managed agents, background runs, multi-turn via `previous_interaction_id`,
  `--schema`→`--body`, structured output, plus environments/credentials/triggers/webhooks.
- `references/output.md` — output formats, response JSON shape, jq recipes, agent mode, errors.
