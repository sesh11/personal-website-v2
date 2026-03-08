---
title: "Applied Judgement"
date: "2026-01-31"
summary: ""
tags: ["engineering", "leadership", "ai"]
---

The ability to reason, perform complex analysis, and write code is now available on demand. The incremental cost of building software is tending to zero. We have said this for years but with Opus 4.5 and GPT 5.2, the models have crossed a threshold. The harnesses built around them have amplified what they can do. We are past the event horizon. These are not incremental improvements to existing workflows. They represent a structural change in what’s possible and what’s valuable.


If cognitive ability is abundant, the constraint shifts to applied judgement: knowing what to build, where to invest, what to leave alone. But applied judgement goes deeper than just prioritization. It is the capacity to rethink how things get built in the first place. We now can construct systems that improve through their own operation, to create leverage that compounds exponentially. However, accessing this potential requires developing the right intuitions, and those intuitions can only be formed through direct experience building with these tools.


Agency and grit matter now more than ever. The willingness to question assumptions, return to first principles, and push through genuine uncertainty. The leaders who will navigate this transition successfully are those cultivating these intuitions now.


## **The Developments of 2025**


To understand the current landscape, it is useful to survey what 2025 made real. The year saw rapid progress in large language models and agentic systems, with post-training reinforcement learning increasingly used to bolster reasoning and tool-use. The release of Opus 4.5 and GPT 5.2 represented not incremental improvements but genuine threshold crossings, with most practitioners agreeing that a qualitative jump in raw capability occurred.


The model improvements, however, represent only part of the story. What fundamentally altered the landscape was the maturity in infrastructure around these models. Protocols for connecting AI systems to external tools and data sources emerged and gained widespread adoption (re: MCP), with major providers converging on shared standards by the end of the year.


Perhaps the most consequential development of 2025 was the simplicity in design for coding agents. It lives in the terminal, it can read files, write files, run commands, observe results, and repeat until objective is achieved. I see this almost akin to the Unix Philosophy but for how agentic systems are built. Claude Code, Codex, Gemini CLI all converged on this architecture because this pattern is irreducibly minimal. The primitives built over the past year have fundamentally transformed how we think about agents: not as chatbots with tool access, but as systems capable of iterating on their own outputs. Once a coding agent can build software, it can build other products. The early proof of this is Claude Code using its own primitives to build Cowork. This is self-construction in practice.


This development carries significant implications for how enterprises should approach AI investment and organizational design.


## **The Self-Constructing Loop**


AI leaders need to rationalize fully what it means to be AI-native to deliver compounding results. This is a fundamental shift in mindset. This is not just another tool. At its core, being AI-native involves understanding how to create leverage through feedback loops that compound over time. This pattern, which can be termed the **self-constructing loop**, consists of five interconnected stages. When executed effectively, these stages enable systems to improve through their own operation. This represents the minimum viable architecture for self-construction.


The **first stage** involves solving a narrow problem with code: taking a specific, bounded challenge and building a working solution.


The **second stage** requires documenting not only the solution itself but the learnings that emerged along the way.


The **third stage**, and this is where most organizations fall short, involves curating those learnings into structured domain knowledge. This means transforming raw documentation into queryable, reusable intellectual capital.


The **fourth stage** feeds this curated knowledge to a coding agent, which uses the accumulated context to generalize the solution and begin productizing it.


The **fifth stage** deploys the result, monitors its performance, and feeds insights back into the loop, enabling continuous improvement.


In my own experience, this pattern has fundamentally transformed how insights are generated. Notebooks pull data from various sources, run inference on text-based data against language models, and produce findings. These processes are documented, and the documentation is continuously updated by AI based on new learnings. That documentation then feeds a coding agent that updates the underlying code and prompts based on emerging patterns, re-running analyses to surface additional insights. This pattern has enabled significant scaling of analytical capabilities while maintaining quality and consistency.


## **Knowledge Curation as a Strategic Asset**


I came across a post comparing OpenEvidence and Hippocratic AI. I don’t remember who wrote it, but it fundamentally changed how I think about building with AI. Consider the contrasting trajectories of these two healthcare AI companies pursuing fundamentally different strategies. OpenEvidence has focused on aggregating, synthesizing, and delivering medical evidence to clinicians supporting decisions at the point of care. The company has positioned itself as the operating system of medical knowledge. Hippocratic AI, by contrast, has emphasized patient-facing operational workflows, using generative AI voice agents for tasks like post-discharge check-ins and medication-related follow-ups.


Both approaches create genuine value. The market, however, has drawn a clear distinction between them. OpenEvidence reached a $6 billion valuation in October 2025, later valued at $12B as of January 21st, 2026. Hippocratic AI achieved a $3.5 billion valuation in November 2025. This represents not a marginal difference but a 1.7X gap in perceived value considering 2025.


The explanation lies in the compounding nature of knowledge curation. Curated knowledge serves as fuel for the self-constructing loop: every piece of structured domain knowledge makes subsequent automation more valuable, more accurate, and more generalizable. Automation without underlying knowledge curation represents a more limited value proposition. It addresses immediate operational needs but does not compound, does not generalize readily, and does not power ongoing improvement. It solves today’s problem without building capacity for tomorrows.


This insight reflects a lesson learned through direct experience. Significant investment in automation that did not incorporate knowledge curation failed to scale in anticipated ways. The automation was useful in isolation but did not create the expected flywheel effect. The knowledge and context that organizations curate is what powers ongoing improvement. The automation is an expression of the deeper asset, not the asset itself.


## **Three Approaches to System Design**


To make this framework concrete, consider a universally applicable example: call center and back-office operations. There are three distinct approaches to building systems in this space, each representing a different relationship with AI capabilities and yielding fundamentally different return profiles.


The first approach operates **without leverage**. This has been the standard methodology for many years: conducting requirements gathering and process mapping sessions, identifying categories of inquiries through interviews with front-line staff, augmenting findings with available data, and constructing workflows to drive automation. This approach requires months of effort, entails significant cost, and produces systems with limited adaptability to changing conditions.


The second approach operates **with some leverage**. Here, AI is employed to analyze large volumes of data and categorize incoming request types, supporting back-office tools are built, workflows are automated end-to-end, and tracking and monitoring systems are established. This represents a meaningful improvement, yet these remain projects that consume months of effort and often produce gaps when underlying conditions shift unexpectedly.


The third approach is genuinely **AI-native**. It involves building a system that captures the intent of incoming calls, captures what agents do to resolve them, creates a structured log of findings, feeds those logs to a coding agent that constructs new prompts or tools, and deploys improvements while continuously monitoring outcomes. This is a self-constructing system, one that improves through its own operation.


The distinction between these approaches goes beyond speed or efficiency. It represents a fundamental difference in the shape of returns. The first two approaches yield linear improvements: each unit of investment produces a roughly proportional unit of value. The third creates compounding returns, where each iteration enhances the value of subsequent iterations. Over time, this difference becomes decisive in terms of competitive positioning and operational capability.


## **Reassessing Build Versus Buy**


Given the leverage that the self-constructing loop creates, the traditional calculus around build versus buy decisions requires substantial revision.


Certain categories of tools should almost certainly be purchased rather than built. General-purpose AI assistants like ChatGPT, general productivity tools like Claude Cowork: it makes no economic sense to rebuild these capabilities at enterprise scale. The frontier labs will maintain their lead in general-purpose AI, and the cost of competing in this space is prohibitive for all but a handful of organizations.


Similarly, workflow automation as a category is frequently oversold. With thoughtful engineering and pattern-matching approaches, many automation use cases can be addressed without sophisticated language models. Organizations that invest in automation without simultaneously curating knowledge are likely constructing what will soon become commodity infrastructure, assets whose value will erode as the underlying technology matures and becomes more widely accessible.


The alternative argument is equally important: organizations should consider building everything that does not yet constitute established infrastructure, particularly if they can build it in an AI-native manner. For enterprises that are not product companies, those operating in insurance, retail, healthcare operations, and similar industries, competitive advantage does not derive from general-purpose tools. It derives from the domain knowledge they curate and the feedback loops they construct. These are assets that cannot be purchased; they can only be built.


## **Recognizing the Limitations**


Any honest assessment must acknowledge where the framework encounters its limits. The self-constructing loop is not universally applicable, and there are contexts in which simpler, more deterministic approaches remain superior.


In some environments, the feedback necessary to power the loop does not exist in sufficient quantity or quality. The underlying ecosystem may not support it: users may not engage in ways that produce useful signals, data may not flow through observable channels, or the problem space may be sufficiently stable that continuous learning adds limited value. In such cases, the cost of instrumenting feedback capture may exceed the value of the iterations it enables.


In other contexts, it may prove more effective to invest additional effort upfront in constructing deterministic systems with well-specified logic. Not every problem benefits from adaptivity; some are better solved definitively and maintained with minimal ongoing adjustment. The judgement lies in recognizing which problems fall into which category, and this recognition requires direct experience with both approaches.


## **The Path Forward**


The most fundamental requirement for navigating this landscape is developing the judgement to determine what to build and where to invest. This applied judgement is emerging as the critical differentiator for technology leaders. And it can only be developed through building. There is no better way to learn than to do and there has never been a better time to simply do things.


Product capabilities from frontier laboratories and cloud providers are forming rapidly. While the transformation remains in its early stages, predicting what will become commodity over the next twelve months has grown increasingly difficult. The risk of investing significant resources to build tools that will be freely available next year is substantial and growing. The only way to calibrate this risk is to develop an intuition for what the tools can and cannot do, and that intuition comes from direct experience.


Organizational change, up-skilling, and restructuring will follow. But these cannot be planned in the abstract. They must be shaped by what leaders learn through building. The sequence matters: build first, learn, then adapt. Teams that wait for organizational clarity before they start building will find themselves perpetually behind. The landscape is shifting faster than any planning cycle can accommodate.


Technology leaders who have not yet shipped something with a coding agent are forming opinions about capabilities they have not directly experienced. In a period of rapid change, that represents a significant strategic vulnerability. The barrier to entry has never been lower and the cost of waiting has never been higher.


---


_Written with assistance from Claude. The ideas are mine._
