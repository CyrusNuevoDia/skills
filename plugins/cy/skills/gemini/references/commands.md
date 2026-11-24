# Commands (gemini-api 0.5.0)

Ground truth is always `gemini-api <cmd> --help`. Every command accepts the globals in `output.md`.
`-i/--input` everywhere takes a local path, a `files/<id>`, or a YouTube URL, and is repeatable.

## generate — text and multimodal generation

Default model `gemini-4-hydrogen`. Streams text deltas to stdout by default.

- `-m MODEL`, `--system "…"`, `-i FILE` (repeatable), `--stdin` (prompt text from stdin, sent before the positional prompt)
- `--stream=false` returns one complete interaction; required for `-o json` / `--jq` on the result
- `--previous-interaction-id ID` continues a server-side conversation (needs the earlier call to have been stored, which is the default)
- `--body JSON|@file|@-` merges with flags but rejects duplicate keys
- Thinking models emit deltas in a burst after thinking; `gemini-flash-lite-latest` streams visibly

## analyze — ask about files

Default model `gemini-4-hydrogen`, default question "Describe this file in detail." Requires `-i`.
Prints only the answer. Not stored server-side, so there's no interaction ID to continue from.

- Accepts images, audio, video, PDFs, CSV/text, YouTube URLs; several `-i` in one call for comparisons
- `--stdin` appends piped text after the media and before the question
- Local inputs go inline and must fit in 20 MB base64 (~14 MB raw); larger → `files upload --wait`

## transcribe — audio/video to text

Default model `gemini-3.5-transcribe` (video inputs use `gemini-4-hydrogen`). Prints one absolute artifact
path per line, not the transcript itself, so `cat` the path if you need the text.

- `--format md` (default) `| text | json | srt` (alias `captions`)
- `--no-speakers`, `--no-timestamps` (ignored for srt)
- Multiple `-i` → `--out` must be a directory; existing files are replaced

## image — generate or edit images

Default model `gemini-nano-banana-2.1`. Writes the image and prints its path.

- `--aspect-ratio 1:1|2:3|3:2|3:4|4:3|9:16|16:9|…`, `--image-size 512|1K|2K|4K`, `--output-mime-type image/png`
- Edit an existing image with `-i ref.png "instruction"` (multiple refs allowed for composition/style transfer)
- Conversational edits: get the turn's ID with `--out f.jpg -o json --jq .response_id` (or `--raw-response --jq .id`),
  then `--previous-interaction-id ID "make the sky stormy"`
- The extension of the written file follows the returned MIME type when `--out` is a directory
- Models: `gemini-3-pro-image` / `nano-banana-pro-preview` for highest fidelity and text rendering,
  `gemini-3.1-flash-image` / `gemini-3.1-flash-lite-image` for speed and cost

## tts — text to speech

Default model `gemini-3.8-flash-tts`, voice `Kore`. Always writes 24 kHz mono WAV (`--out x.mp3` becomes `x.wav`).

- Text is spoken verbatim, so put direction in `--style "whispered urgently"`, never in the text
- `-f script.txt` or `--stdin` for long scripts; `--language en-US` as a hint
- `--multi-speaker "Alice=Kore,Bob=Puck"` for two speakers; each turn starts `Alice:` or `Alice [excited]:`
- `--voice-prompt "warm gravelly radio host"` designs and **stores** a new `voice_<id>` (counts toward quota,
  lives 1 year); reuse it with `--voice voice_<id>`. Prefer prebuilt voices unless the user wants a custom one.
- `gemini-api voices list --all` shows prebuilt + custom voices; `voices create` also supports replicated
  voices from reference + consent audio
- Convert if needed: `ffmpeg -i out.wav out.mp3`

## music — music generation

Default model `lyria-3.5` (full songs). `lyria-3-clip-preview` for short low-latency clips,
`lyria-3-pro-preview` for structural control. `-f prompt.txt`, `--stdin`, `--out FILE|DIR/`.

## video — generate and edit video

Default model `gemini-omni-1.2-flash`. Polls until done, then writes the file and prints the path.

- `--aspect-ratio 16:9|9:16`, `--resolution 360p|720p (default)|1080p|4k`, `-i` for image/video references
- `--async` returns the interaction ID immediately; resume with `gemini-api video --resume ID --out clip.mp4`
- `--poll-interval 2s`, `--poll-timeout 15m` to tune waiting
- Conversational edits/extensions via `--previous-interaction-id ID "now pan left"`
- Slow and expensive: `--dry-run` first, then run in the background

## files — Files API (48 h retention)

- `files upload PATH [--wait] [--display-name …] [--mime-type …]` prints `files/<id>`; limits 2 GB per file,
  50 MB per PDF, 20 GB per project. Use `--wait` for video/audio so processing finishes before use.
- `files list`, `files get files/<id>`, `files delete files/<id>`, `files register` (GCS objects, no copy),
  `files generated-files-list`

## models

- `gemini-api models` — curated offline catalog, no network (see `models.md`)
- `gemini-api models list --all` — live list for this key; `models get NAME` — token limits, methods
