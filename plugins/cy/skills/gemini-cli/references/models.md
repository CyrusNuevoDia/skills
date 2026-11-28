# Models

Snapshot from `gemini-api models` on CLI 0.5.0 (Nov 2026). Re-run it before hard-coding a name; the catalog
moves fast and `models list --all` shows what this key can actually reach.

## Text and reasoning (generate, analyze, agent run)

| Model | Use it for |
|---|---|
| `gemini-4-hydrogen` (default) | Fast frontier-level general work; good default for analysis and second opinions |
| `gemini-4-carbon` | Hardest reasoning, long agentic coding, scientific/security analysis |
| `gemini-4-argon` | New frontier model for the hardest software and knowledge work |
| `gemini-4-neon` | Frontier intelligence with faster end-to-end completion |
| `gemini-3.8-flash` | Strongest Flash; long-horizon agentic work at Flash prices |
| `gemini-flash-lite-latest`, `gemini-3.5-flash-lite`, `gemini-3.1-flash-lite` | Cheap, high-volume, classification, translation, smoke tests |
| `gemini-pro-latest`, `gemini-flash-latest`, `gemini-flash-lite-latest` | Floating aliases; fine for ad-hoc use, pin a version in scripts |
| `gemma-4-31b-it`, `gemma-4-26b-a4b-it` | Open-weights Gemma |
| `gemini-robotics-er-2-preview` | Embodied/spatial reasoning |

Thinking depth is set in the body: `"generation_config": {"thinking_level": "minimal|low|medium|high|xhigh"}`.

## Media

| Kind | Default | Alternatives |
|---|---|---|
| Image | `gemini-nano-banana-2.1` | `gemini-3-pro-image`, `nano-banana-pro-preview` (quality), `gemini-3.1-flash-image`, `gemini-3.1-flash-lite-image`, `gemini-2.5-flash-image` (speed) |
| Speech | `gemini-3.8-flash-tts` | `gemini-3.8-flash-lite-tts` (fast/cheap, dubbing), `gemini-3.1-flash-tts-preview` |
| Transcription | `gemini-3.5-transcribe` | diarization, word timestamps, custom vocabulary |
| Music | `lyria-3.5` | `lyria-3-pro-preview` (structure), `lyria-3-clip-preview` (short clips) |
| Video | `gemini-omni-1.2-flash` | `gemini-omni-1.1-flash`, `gemini-omni-flash-preview` |

## Managed agents (`agent run --agent`)

`deep-research-preview-04-2026`, `deep-research-max-preview-04-2026`, `deep-research-pro-preview-12-2025`,
`antigravity-preview-05-2026` (and newer `antigravity-*`). `gemini-api agent run --help` lists the current set;
`agent list` shows only custom agent definitions you've created.
