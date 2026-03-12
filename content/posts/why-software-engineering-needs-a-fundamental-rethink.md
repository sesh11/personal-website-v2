---
title: "Why software engineering needs a fundamental rethink?"
date: "2026-03-09"
summary: ""
tags: ["engineering", "leadership", "ai"]
---

The way software gets built has not fundamentally changed. Requirements are gathered, code is written, tested, deployed, and issues are fixed as they surface. Software development, at its core, is a coordination system. It's performance depends on how effectively intent, context, and decisions move through the system. The coordination models hit rate limits as complexity increases and over time you are constrained by something more than technical complexity. This is what makes AI consequential.


The initial adoption of AI is primarily centered around automating high volume repetitive work and deploying copilots. While this is valuable, it is only incremental in nature. AI in this current iteration offers something more. It offers the opportunity to rethink the entire system end-to-end and drive exponential outcomes. With AI, you can create leverage through feedback loops that allows systems to improve through their own operation. This will require experimentation, rigor, and disciplined execution. The ability to evolve systems faster than the market shifts around you is a core competitive advantage regardless of industry.


The natural place to start is coding. Coding agents have made significant progress and the industry has doubled down on this front. Anthropic, OpenAI, Cursor, Cognition, and many others have invested heavily given that coding is fundamentally a highly verifiable domain. More importantly, we’ve been solving complex problems by writing code for decades. But coding agents alone are not enough to close the gap between what AI can do and what enterprises truly need. The opportunity is enormous.


In this essay, I will focus on enterprises whose software environments have evolved through layers of growth, integration, and accumulated change.


# **The Real Problem**


If you run engineering at enterprise, the hard part is not writing code. It never has been. The real difficulty is understanding how business intent maps to technical changes, navigating dependencies across fragmented systems, identifying where technology can create leverage, and moving fast to meet the demands of the business and a shifting market. 


You are never building from scratch. What you have is typically a byproduct of years of growth, acquisitions, vendor integrations, and accumulated technical debt. This means legacy mainframes, different stacks, custom products connected together with bespoke integrations, and automation layers. The landscape is one that no one person truly understands and that no documentation fully captures. This is where real engineering happens, messy, tangled, high-stakes systems that run the business.


Migrations are expensive, simple features or enhancements take months of impact assessments, dependency chains are not properly understood, and highest-value work sits at the bottom of the backlog because of the inherent risk and effort required. These problems have existed in the industry for years and they fundamentally determine how fast an enterprise can move to to adapt and deliver value. With the improvements in coding agents, solving this finally seems within reach.


# **Why coding agents can’t solve this alone?**


AI coding agents have made significant progress in the last year. You can one-shot a surprising amount of code and have it actually work on the first try. The recent experiment from Anthropic to rebuild the C compiler provides a meaningful view into what is possible with agents. At the same time, it also shows that models can’t get there without the right structure, harness, tests, CI pipelines, task decompositions, etc. Such problems also work because they are highly verifiable. This is not a luxury with enterprise codebases.


Think of an ecosystem that has hundreds of thousands if not millions of lines of code, tens or even hundreds of subsystems, implicit dependencies, undocumented business logic, years of accumulated technical decisions, and some bubble gum and duct-tape. It is difficult to push past a certain level of autonomy with coding agents even if you are running teams of agents. It is critical to approach AI problems from the vantage point of what the LLMs and agents see. They don’t know what they haven’t been told but they are excellent at doing the work if provided the right context, guardrails, and controls.


What's missing here isn't raw intelligence. The models and coding agents are intelligent enough. What's missing is the ability to deeply understand a system before changing it, to visualize how systems are connected, to access and reason over data, to track and correct what you've learned, and to ensure quality across every change.


Coding agents are powerful but fundamentally human-in-the-loop. It requires orchestration at every step, providing context along the way, making the judgment calls that the agent can't make on its own. That works for isolated tasks. It doesn't scale to the kind of engineering that complex enterprises need. The fundamental rethink is building systems where these primitives are integrated in a way that allows software to get built differently. Systems where understanding compounds, where context persists, where quality is enforced systematically, and where the full lifecycle of engineering is supported, not just the act of writing code.


# **What’s actually needed?**


It starts with deep, structured understanding of the systems you're working with. This needs to be real comprehension of how subsystems interact, the boundaries, and what the architecture constrains. This outcome needs to also include a blueprint or an index that both humans and agents can reference. This requires careful curation as time goes on. The information that we’ve learned about a codebase needs to be structured and queryable.The lessons that we’ve learned need to be documented along the way. An finding that resulted in an updated understanding needs to be updated upstream and downstream. Knowledge needs to compounds across projects. This is a hard problem to solve and sits at the intersection of knowledge graphs, structured documents, and versioning. This is the most foundational primitive because everything else depends on it, and it's the focus of this essay.


Coding agents need to operate in real environments i.e., hardened sandboxes with appropriate permissions where they can pull code, run builds, execute tests, interact with databases, and make changes. It's a computer that operates on code. OpenClaw and Perplexity Computer are proof points that there needs to be a fundamental shift in how we think about the operation of agents.  


Alongside this testing and verification become absolutely critical. The feedback loop between coding and testing has to be tight, fast, and as deterministic as possible. Testing and verification has to be highly automated. Speed must not become a liability and the quality needs to scale with it. Robust audit trails are needed especially for regulated industries. Much of this is not glamorous and is typically overlooked but core platforms should enable this and make this seamless.


The focus in 2026 will likely shift to better harnesses, long running tasks, memory architectures, and self improvement loops. 


Work in large complex enterprises rarely arrives as neatly scoped tasks. A fundamental aspect to velocity is the speed with which ambiguity can be untangled. Breaking effort into units of work ordered by dependency, and parallelized for efficiency is paramount. This is where coding agents and AI needs to be orchestrated for systematic engineering execution.


As AI start to take on more autonomous work, observability and cost controls become essential. An agent can't run indefinitely, burning through hundreds of thousands of dollars because it's exhausting every possible approach to a problem. There has to be robust monitoring, continuous evals, and logical exit points. When things start going off the rails, they're caught and course corrected before the damage compounds.


What ties this all in together will be that the work itself needs to compound. Every change, every code review, every production issue that is triaged, all of these patterns and lessons should feed forward. Concretely think of migrations that reveal dependency patterns, code reviews that catch a certain class of defects, these are things that need to be persisted, managed, and intelligently curated. This is in essence compound engineering. These systems fundamentally self-construct and become smarter and more reliable as time goes on. Some of these are platform primitives and some of these honestly are hard research problems.


I will explore each of these aspects in subsequent essays with concrete examples.
