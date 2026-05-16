---
title: "Where the agent stack is settling"
date: "2026-05-16"
summary: ""
tags: ["ai", "leadership"]
---

Enterprise AI has moved past the pilot purgatory. Agents in production are doing real work but the value delivered is only incremental. The exponential that the early narrative promised has not arrived. There is no singularity in sight. What has arrived though is a steady measurable utility, useful but not transformative. At least, not yet.

The capability continues to move faster than deployment. Every quarter models get better, runtime tooling extends, and there is an ever-growing gap between what could be deployed versus what is actually deployed. It somehow feels like the gap is widening every day and the pace of progress and the demand for AI is on the up and up.

This gap is also where operators in the enterprise "operate". It is critical to get to an understanding of what to invest in, what capabilities need to be owned, and where build versus buy makes sense. This requires a working map of where the AI technology stack is today and the ability to apply this working map to determine what is experimental versus what can actually be shipped and the time, effort, resources, and talent structure that it takes to execute.

## The arc that got us here

Enterprise AI deployment has moved through a clear sequence. RAG chatbots, LLM powered workflows, and now scoped agents. The agents are scoped to very tight permission boundaries with humans in the loop. Remember that production systems in enterprise don't tolerate experiments given that they were originally built for consistency and precision. The agents have moved past point-solution thinking and have proved that they deliver outcomes not possible with LLMs alone.

The natural transition from here is general-purpose agents, agents that take on more work, reason across multiple systems, and run over long horizons. The deeper shift is constructing systems of work where AI can operate end-to-end, not just to reason and act, but to introspect, learn, and self-evolve. Two things that are making this possible:

- November 2025 saw significant jumps in the models from both OpenAI and Anthropic. This jump is primarily felt with software engineering but also across other domains.
- There is a certain maturity in the run-time patterns: Sandbox VMs, persistent workspaces, and what I believe will be the most important term as we look back at 2026, harness engineering. Agents are no longer chat sessions, they are processes running inside workspaces.

## Where scaling breaks

The hard part to scale continues to be context. Especially knowledge work at scale runs into a wall of tacit knowledge that nobody has unblocked. Agents are unable to self-organize and maintain context in the general realm of knowledge work where there is so much domain and organizational specificity.

Until now, nothing in enterprise was built with agents in mind. The knowledge that is needed to hydrate the context and memory lives inside people's heads, or in chat messages, emails, SharePoint sites, and documents scattered on everyone's computer.

The market has clearly realized this. The explosion of forward deployed engineering tells you that there is a huge gap between model capability and the last mile engineering that is needed to make AI work. There is also significant pressure to realize value to justify the investments and the spend towards AI. There is a tremendous opportunity for services-as-a-product roll-ups for this very reason. AI is not scaling in enterprise on its own. It requires humans to do the integration work and the last mile work of "making AI work" which fundamentally boils down to making knowledge work verifiable in the context of the domain or organization.

For AI leaders, the right question is where the agent stack is actually settling and how to read the architecture so that the ownership decisions hold up. The space looks chaotic from all directions. Every vendor ships a different abstraction, every framework pushes a different primitive, new libraries arrive each week, but the noise is hiding a quiet convergence across the stack.

I do want to point out an asymmetry while reading this. Software engineering has been the first frontier with AI, with knowledge work always trailing it. This is primarily because software engineering is a verifiable domain. Knowledge work doesn't have this. There is no way to verify if a memo is good or bad, whether a strategy document is correct, or whether a customer escalation was handled well.

The patterns settling in software engineering give you a preview of where enterprise agents are headed. They don't necessarily transfer one-to-one, but they do serve as a reasonable litmus test with some caveats. The rest of this piece is a leading indicator.

## What's settled: the integration pattern

Most enterprises deploying agents today have converged on the same operating model: centralized runtime with shared observability and guardrails, and individual domains owning context and how agents are integrated into their respective ecosystems. Centralization buys you safety, and decentralization keeps the work close to the people who actually understand the domain and the data.

Frameworks like LangGraph, Google's ADK, AWS Strands, and others are all in good shape. They are mature enough that you can build a domain agent on top of them, and they give you the flexibility to pick the runtime (Bedrock, Vertex AI, or self-host). The agents that these frameworks produce are not magical; they augment an existing workflow or a business process.

## What has converged

While these frameworks help you build agents, they still don't tell you what to feed it, or how to give it the surface area to operate over long horizons. These questions sit upstream of frameworks, in the context, memory, harness, and long-running execution. The frontier labs, model labs, hyperscalers, and niche startups are working on the hardest problems surrounding this space and are starting to converge on a small set of primitives across all of them. You can see this across Anthropic Managed Agents, LangChain's Deep Agents and OpenSWE, Letta agents, OpenClaw, and Hermes Agent. You can also see this at companies like Stripe and Ramp that are investing to build their own harnesses on top of existing open source harnesses.

The convergence is centered primarily around harness engineering. Langchain has the best definition that I've seen thus far for what a harness is. "If you are not the model, then you are the harness". The harness runs the model in a loop, manages context, calls tools, persists state, and enforces safety. The model does the thinking while the harness does everything else. The convergence is happening at the harness.

The convergence boils down to four key primitives.

**Mount text into session.** Filesystem and markdown constitute the same pattern. You mount a directory, a memory store, or any text artifact into the agent's session and let it read it through standard file tools. The agent uses the surface that it knows well. The reason is straightforward: models were trained on shell-shaped data, bash commands, README files, and directory listings. There are two patterns on top of this: subdirectory-scoped instruction loading, where the harness attaches the relevant skill automatically as the agent traverses a directory; and skills as parameterized procedures, where the arguments allow leveraging the same skill to achieve different outcomes based on the input.

**Sandbox VMs as the runtime.** Long running agents don't live on your laptop. But the emergent pattern is that the agent lives in a cloud VM that is generated per task with a filesystem inside it. It may or may not have network access depending on how the systems are constructed. The CLI, Slack channels, browser extensions, and similar surfaces are becoming cockpits from where you can launch agents (or rather, sessions) that could run in parallel to complete a broader objective. The pattern is no longer babysitting one agent but dispatching a fleet of agents that can execute the task provided.

**MCP as the tool fabric.** As scale increases, serious agent systems need MCP for tool access, especially when the number of tools is in the hundreds. The issue with this is that it can get extremely expensive to run a system given the context bloat with MCP. A fleet of agents carrying a hundred tool definitions in the context window burns through a fair amount of tokens before any real work is actually performed. There is an element of curation needed so that the models don't drown in tool-related context.

Stripe's Toolshed is the best public proof point that I've seen that demonstrates this. Nearly 500 tools shared across their internal agents, with an element of deterministically running relevant MCP tools to better hydrate the context.

**Memory APIs at the surface.** The convergence on memory is only the CRUD surface: list, read, write, version, export, delete. The semantics underneath are still a long way away.

All of these patterns are active in production today. Stripe runs this pattern against a codebase that is hundreds of millions of lines at 1,300+ PRs per week. Ramp's Inspect reached roughly 30% of front and backend PRs within two months of launch. Cursor's Background Agents operate on the same shape. Giving an agent an ephemeral computer with a real filesystem, snapshotted between sessions, scoped to a task, dispatched in parallel from Slack, is the architecture in production today.

## What has not converged?

**Backend behind the filesystem.** This ranges between plain filesystem, vector databases with a virtual filesystem, graph databases, or content-addressed event store. The backend appears to be a free variable and is chosen by workload.

**Where memory logic lives.** Memory is arguably the most contested layer in the AI stack. I'll hit on three positions.

1. Anthropic's approach is to let the model decide and organize how to manage memory. The directory is mounted and the model decides read and write based on the standard file tools available. I read this as aligned with the bitter lessons, although I don’t think Anthropic frames this explicitly.
2. OpenAI's Codex takes a slightly different position where the artifact is proprietary. On compaction, the model creates an encrypted version and the model is post-trained on its own compaction format. While you can set up a hook to extract the raw transcript before compaction, using it means you won't get near the same level of performance that Codex will give you out of the box.
3. Letta pushes memory into explicit, inspectable primitives. Developers can create, edit, attach memory blocks while the agents use the memory tools to update allowed blocks. This gives the operator control over the schema and governance, which fits the bill for regulated industries.

When talking about memory, it's also important to talk about schema ownership and server-side opacity. There is a fundamental difference between harnesses that require you to store your context (and memory) server-side versus on your own infrastructure. This is where things get really interesting. With AI, the fundamental strategy needs to be revisited.

Schema and structural memory will not converge horizontally anytime soon. This is because ownership matters. At critical mass, memory and context serve as a working representation of how a business operates, decisions that were made, constraints navigated, customer profiles, dependency maps, institutional knowledge, and so much more. This is the moat. It is what makes one organization different from its competition. It is the final missing piece that is needed to scale AI and the only thing that cannot be purchased or rented. Where this representation sits matters. Hard engineering is needed to make memory and context work, especially in the context of general purpose agents. Tightly coupling memory and context with vendor infrastructure means a new type of lock-in, where switching to a new model or harness can become an expensive ordeal with significant disruption to business continuity. Given that enterprises will use a combination of models from frontier labs as well as some open source models hosted on local infrastructure, memory and context is the hardest problem to solve. This is also what makes the best case for open harnesses, given that memory and context is such a core part of it. 

## What isn't solved?

**Structural and causal memory.** This is the type of memory that captures decision chains, allows you to answer why something happened and not just what happened, the type that you can actually compound against. Think about reasoning through a sequence of events to identify what decisions led to a given outcome. There isn't a single product in the market that handles this natively. This exponential promise of AI lives in the last mile and requires compounded continuous improvement. This is why you build a forward deployed engineering org. At least for now.

**Cross-vendor behavior portability.** We've talked about it already. You can export data from Anthropic's Managed Agents, but cannot replicate the behavior that it drives. There isn't a standard for portability and there may never be one. This is a whole new class of disaster recovery and business continuity problem that needs to be solved especially as enterprises start to migrate mission critical workloads to AI.

**Identity and policy for agents.** Agents deployed today operate with explicitly scoped permissions that are assigned ahead of time. This is intentional. The hard problem is delegated authority and the unintended consequences of allowing an agent to receive broader authority than what is scoped for at runtime. Hyperscalers are starting to formalize this layer by introducing distinct agent identities, inbound-outbound authentication, and OAuth based user delegation. Agent identity is starting to become a first class object with RBAC and explicit definitions for on-behalf-of workflows. However, there is no mature standard for the delegation chain. 

## Three paths

Now that we've established the map, this concretely translates into three possible options.

**Build it yourself.** Stripe's Minions and Ramp's Inspect are the best examples of this path. Both companies decided to own the harness and used open source harnesses that they could tailor to their needs. Stripe forked Goose and Ramp is built around OpenCode. The base agent loop is less differentiated, while the harness in both instances is far from trivial. This requires cloud execution environments that are provisioned per session, pre-warmed devboxes or sandboxes, repo-specific setup, internal tool access, context management, automated tests, and PR workflows. This path requires significant talent, sustained engineering, and developer infrastructure that the agents can integrate into.

**Buy a managed agent product.** A great example of this is Anthropic's Managed Agents. The vendor hosts the runtime, the memory store, the harness, and most of the policy layer. You bring the task and the data flowing in and out. Letta Cloud sits in the same category. OpenAI has the surface split across the Agent SDK, the Responses API, ChatKit, and Codex, which is closer to the building blocks needed rather than a single managed agent service. With harness engineering catching on, we're going to see an explosion in this space with incumbents and new startups offering either fully managed products or platform capabilities that allow for long running agents and harnesses that can be deployed autonomously to complete work.

**Hyperscaler primitives.** The cloud hyperscalers are quietly building this out. AWS is the clearest example. Bedrock, AgentCore, the Strands SDK, and the surrounding services let you compose your own harness on top of managed infrastructure. Google Cloud has Vertex AI Agent Builder, Azure has AI Foundry. These are not managed agent products but building blocks that allow you to build and assemble your harness, define the memory model, set the governance, and enforce the memory policies. You get to define your abstractions and leverage the primitives (the sandbox runtime, memory store APIs, model gateways, governance hooks, eval tooling, and so on). This is the middle ground in terms of effort, where there is still effort required but it is a speed-up compared to the build-it-yourself option.

## Operating the gap

Early signals suggest that core infrastructure will commoditize. The limiting factor stops being infrastructure and boils down to harness, memory, and context. It takes hard work to build a structured representation of your business — the institutional knowledge that needs to be documented in a format that it can be consumed by agents.

There are many open questions on this front.

1. What does structured representation actually look like?
2. Who owns this work right now? What skills does it require to perform this work?
3. Does curation get built incrementally or is this a stand-alone upfront investment?
4. What is the dependency between this work and the product, infrastructure, or core capability that enables this?

This is very un-sexy work that no one is willing to take on. 

It's also important to acknowledge that we're not done with the advancement of the models themselves. This is a working assumption, not a researcher’s claim. The volume of investment underway is a strong signal that scaling laws continue to hold. We are probably still early in the intelligence that models can reach. It's important that decisions are grounded in this reality, because with how fast things are moving at the frontier, technology stacks, design, or architecture decisions are outdated even before projects are greenlit.

What we do know for a fact is that with the right talent structure, you can move a lot faster than before. This is a fact. There are real tangible proof points from companies like Stripe and Ramp. They have each developed a system that allows them to build other systems at a rapid pace. This can be extrapolated to address every limiting factor that is required to not only enable and scale AI, but move fast to drive significant outcomes in your core business. Being able to move faster than your competition is in itself a structural advantage. And this also allows you to stay flexible, experiment, and move quickly with every advancement.

For enterprise leaders, the question is not if AI should be deployed; it is a question of which layers need to be owned, which layers need to be sourced, and the primitives that need to be invested in first.

## Final thoughts

The agent stack for 2026 is: 

**Sandbox VMs + filesystem + curated MCP tools + structured memory + policy boundaries + model**

This is the emerging convergence. But the important part is not the stack itself, but what it actually makes possible. We can delegate meaningful bodies of work to AI. This is showing up clearly in software engineering but the lessons are much broader. The frontier is not “deploy an agent system” or “automate workflows”. The framing of this is way too narrow. 

The real shift comes from designing systems of work where models can reason, act, inspect state, use tools, generate artifacts, receive feedback, and most importantly improve at the next iteration. The harness becomes the leverage point. This also means self-constructing and self-evolving loops in a very practical sense. Systems that can introspect on their own internals to iterate and evolve. 

For enterprises, the implication is simple. The advantage will not come from deploying yet another agent. It will come from building the right systems and doing the hard work to build structured representations of your business, building the right tools, investing the time to build an inventory of tests, investing in new testing environments that agents can safely operate in, and defining the architecture and control plane that fit the company’s size, scale, risk, and regulatory complexity. The companies that do this will build with leverage. 

## References

**On the harness**

- [The Anatomy of an Agent Harness](https://x.com/Vtrivedy10/status/2031408954517971368) — Viv Trivedi, LangChain
- [Harnessing Claude's Intelligence: 3 Key Patterns for Building Apps](https://claude.com/blog/harnessing-claudes-intelligence) — Anthropic
- [Thin Harness, Fat Skills](https://x.com/garrytan/status/2042925773300908103) — Garry Tan
- [Your Harness, Your Memory](https://x.com/hwchase17/status/2042978500567609738) — Harrison Chase, LangChain
- [Why Memory Isn't a Plugin (It's the Harness)](https://x.com/sarahwooders/status/2040121230473457921) — Sarah Wooders, Letta

**On memory and filesystem**

- [Using Agent Memory](https://platform.claude.com/docs/en/managed-agents/memory) — Anthropic Managed Agents documentation
- [Memory in Claude Managed Agents](https://x.com/RLanceMartin/status/2047720067107033525) — Lance Martin, LangChain
- [How we built a virtual filesystem for our Assistant](https://www.mintlify.com/blog/how-we-built-a-virtual-filesystem-for-our-assistant) — Dens Sumesh, Mintlify

**On building in-house at enterprise scale**

- [Minions: Stripe's one-shot, end-to-end coding agents (Part 1)](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents) — Stripe Engineering
- [Minions: Stripe's one-shot, end-to-end coding agents (Part 2)](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2) — Stripe Engineering
- [Why We Built Our Own Background Agent](https://builders.ramp.com/post/why-we-built-our-background-agent) — Zach Bruggeman, Jason Quense, Rahul Sengottuvelu, Ramp

**On lock-in, governance, and identity**

- [Anthropic sees the moat. Do you?](https://x.com/JayaGup10/status/2042401200109408681) — Jaya Gupta
- [The AI Lock-In Is Beginning!](https://x.com/JayaGup10/status/2043505841127760066) — Jaya Gupta
- [Microsoft Entra Security for AI Overview](https://learn.microsoft.com/en-us/entra/agent-id/security-for-ai-overview) — Microsoft Learn
