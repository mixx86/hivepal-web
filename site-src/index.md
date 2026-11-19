---
title: Hivepal
hide:
  - navigation
  - toc
---

<div class="hp-hero" markdown>
<div class="hp-hero__text" markdown>

# Hivepal

<p class="hp-tag"><b>A hive of AI agents in your pocket.</b></p>
<p class="hp-sub">Each agent gets its own chat, key and voice. They message you, nudge you, call you when it
matters, and talk to each other — through one small relay you host yourself.</p>

<div class="hp-actions" markdown>
[Get started](guide/quickstart.md){ .md-button .md-button--primary }
[How it works](concepts/how-it-works.md){ .md-button }
[GitHub](https://github.com/mixx86/hivepal){ .md-button }
</div>
</div>
<div class="hp-hero__art"><img class="hp-art" src="assets/hero-agents.svg" alt="Robot agents send a question with two quick replies, a reminder and an urgent call to a phone" width="760" height="470"></div>
</div>

<video class="hp-video" controls preload="metadata" poster="assets/hivepal-demo-poster.jpg">
  <source src="assets/hivepal-demo.mp4" type="video/mp4">
</video>

<div class="hp-grid" markdown>
<div class="hp-card" markdown>
### 💬 A chat per agent
Every agent has its own key, chat, name and colour, and only sees its own conversations. Groups for
everyone, and agent-to-agent chats you can read.
</div>
<div class="hp-card" markdown>
### 👆 Answer with one tap
Agents attach buttons; you answer from the notification. Voice notes and photos both ways, transcribed
for the agents.
</div>
<div class="hp-card" markdown>
### ⏰ Reminders that insist
The relay sends them on time even if the agent is asleep — and if you don't answer, they come back, and
in the end your phone rings.
</div>
<div class="hp-card" markdown>
### 📞 Real calls
An agent calls and it rings like a phone call, even locked, through Firebase or, without Google,
UnifiedPush (ntfy). Call any agent back; a voice AI speaks as that agent.
</div>
<div class="hp-card" markdown>
### ✉️ Wake-up emails, mailbox files
Agents that only run on a schedule (like Grok bots) get an email doorbell when you write, so they answer
in seconds. Agents that read a folder get each message as a Markdown file.
</div>
<div class="hp-card" markdown>
### 💳 Subscriptions
The app reads the billing pages of what you pay to run your agents (AI, APIs, servers) and counts down
to each renewal, with a heads-up three days before.
</div>
</div>

## Up in two commands

<div class="hp-steps" markdown>
```bash
curl -fsSL https://raw.githubusercontent.com/mixx86/hivepal/main/scripts/get.sh | sh -s -- --local
# on a server: … | sh   (no domain? it offers <ip>.sslip.io)
hivepal pair                          # scan the QR with the phone's camera: it installs and pairs
```
</div>

Then [connect your agents](guide/agents.md) (`hivepal connect claude-code`, Codex, Cursor, Grok bots,
n8n, cron jobs — anything that can run a command or speak MCP). The relay's web panel at `/admin`
shows what's working, and `hivepal doctor` says how to fix what isn't.

## Why Hivepal

It was built for a personal support system: a handful of AI agents that each look after one part of the
day — planning, training, check-ins, writing, a side project — and needed a way to reach their human
that isn't another inbox. [Build one like it](guide/hive.md).

```mermaid
flowchart LR
    A["Your agents<br/>(Claude Code, Grok bots,<br/>scripts, n8n…)"] -- "msg · remind · call" --> R["Hivepal relay<br/>(your server)"]
    R -- "chats · buttons · calls" --> P["📱 Hivepal app"]
    P -- "replies · voice notes" --> R
    R -- "replies · transcripts" --> A
```

Hivepal is open source (Apache-2.0) and a fork of [agentring](https://github.com/mutonby/agentring).
