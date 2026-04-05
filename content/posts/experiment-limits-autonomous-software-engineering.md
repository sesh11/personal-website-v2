---
title: "Experiment: Limits of Autonomous Software Engineering"
date: "2026-03-19"
summary: ""
tags: ["engineering", "ai", "experiment"]
---

A question I've been spending time on is what does it take to run long-running software engineering tasks autonomously. I'm not talking about building individual features. I'm talking about autonomous execution across complex projects like legacy migration, large-scale refactoring, and platform modernization. The kind of work that defines engineering at large enterprises.


Building internal coding engines with real methodology is absolutely worth exploring. I say coding engine with intention because it's coding agents + the context assembly, feedback loops, custom evals, and self evolution. This needs to be highly specific to the ecosystem.


To build intuition for what this should look like, I ported the original 1993 DOOM source code to modern macOS using Claude Code. The point is not the port. DOOM is one of the most well-studied and well-documented codebases in existence. The source has been public since 1997. I ran it through a 7-phase reverse engineering approach (diagram in the comments), the same way I would approach a legacy codebase, compounding on each step to methodically analyze the codebase and the intricacies of the port. And even then, Claude Code only explicitly predicted 64% of the required changes. Now, Claude Code was able to brute force to completion but in an enterprise context this can cascade with significant implications downstream. Predictability is what makes the work safe and tractable.


If that is the ceiling for an extremely well-studied codebase that is widely available on the internet, what does it look like for proprietary systems that are far less studied? The gap could be significant and this raises the question about what needs to be true before you can trust AI to autonomously execute long-running tasks. Technical write-up to follow.


All the artifacts, documentation, and ledger entries are on Github (linked in the comments)


Original source code released by id Software in 1997 under GPL.


![image.png](/images/posts/experiment-limits-autonomous-software-engineering/9ee1f29d7f79.png)
