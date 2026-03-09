---
title: "Building Agent Foundations: A Deep Dive into Advanced Integrations with ChatKit"
date: "2025-11-29"
summary: ""
tags: ["engineering", "openai", "llm", "chatkit"]
---

## **TL;DR**


I explored what the foundational architecture for Agentic systems could look like in a complex organization by building an Incident Management prototype using OpenAI’s [ChatKit advanced integration](https://platform.openai.com/docs/guides/custom-chatkit). The core idea: agent primitives and shared infrastructure form the building blocks for Enterprise AI systems; stable foundations that can be inherited across workflows and extended as models become more capable.


This post breaks down the architectural patterns required for scalable enterprise agents, including identity propagation, multi-layer RBAC, and data residency controls. I compare these patterns with the principles behind Claude Code, explore why ChatKit’s self-hosted model is a meaningful unlock for organizations, and walk through technical details of my implementation with a link to the [working prototype](https://github.com/sesh11/chatkit-incident-management).


Finally, I highlight opportunities; model gateways, enterprise identity plugins, HITL controls, deployment blueprints, and out of the box observability and why the future lies in ambient long-running agents.


## **Why Agent Foundations Matter**


To understand how the foundational layers for agents should operate inside a complex organization, I built a prototype of an Incident Management system using the self-hosted ‘[Advanced Integration](https://platform.openai.com/docs/guides/custom-chatkit)’ with OpenAI’s ChatKit. The goal was to design a system that could handle distinct workflows, from IT tasks to operational impact, finance approvals, and customer communications.


But this wasn’t intended purely as a technical exercise. We need the right foundation to architect and scale AI systems. We’re still in the early innings of Applied AI at enterprise, and the patterns that we adopt today will determine our agility tomorrow. We can’t view AI agents as isolated bots performing one-off tasks; we must forge systems that fit into the larger cohesive ecosystem optimized towards a given mission or objective. We must remain nimble and rapidly iterate as the technology and the surrounding eco-system matures. With this in mind, the systems that we build architect today must:

- Reduce the time to deploy agents
- Scale as models become more intelligent and accurate
- Require minimal effort ongoing to iterate and adapt
- Enable reuse of core pattens (identity, RBAC, orchestration) to reduce cost and maximize investments

## **Learnings from Claude Code**


Whether 2025 was the year of agents or not depends greatly on your own point of view, but there are some key developments that have shaped the course of what is to come. One of them, of course, is Claude Code. I see this as a revolution in how we think about agents. I would highly encourage listening to the creators of Claude Code talk about it on the [Latent Space](https://open.spotify.com/episode/6ffGB5ter845nffKHzOFqv?si=000494a783e54bb8) and [AI&I](https://open.spotify.com/episode/7yJ1kUxwE750WIc1lyZcaT?si=174e573c11ec46cb) Podcasts.


Its primitives are broadly applicable across many workflows. There are so many creative ways that people have been hacking away at this. My favorite is the example from Noah Brier and using Claude Code as a “[second brain](https://www.linkedin.com/posts/noahbrier_how-to-use-claude-code-as-a-second-brain-activity-7371598561584508928-1Fd5/)” to be a thought partner, execute work, write code, etc. It’s logical that the Claude Code SDK is just the Claude Agent SDK now. The “plan first”, “execute”, “human in the loop”, “approval/interruption” paradigms are a necessity for nearly every agent. To internalize this, I built a [general purpose agent framework](https://github.com/sesh11/agent-prime) on these principles. I consider the Claude Code paradigm as a core principle when architecting AI and Agentic systems. These primitives become exponentially more valuable when they can be reused across multiple workflows instead of being rebuilt for each agent.


## **The case for ChatKit’s Advanced Integration**


Another core principle of sustainable AI architectures is shared infrastructure; reusable, governable, and secure components that prevent teams from recreating identity, RBAC, logging, and storage patterns. In this context, the most critical component of OpenAI’s recent launch at DevDay 2025 was the ChatKit advanced integration. This introduces a self-hosted architectural pattern that solves data residency. The server-side abstractions can be leveraged to build agents where the execution, memory, and data can remain within compliant boundaries and utilizing OpenAI only for inference. This is a meaningful unlock for organizations.


## **Incident Management**


The reason I chose the Incident Management example to demonstrate this is because in practically any organization, managing production incidents requires airtight coordination across various departments and teams. Every department has a critical and interlinked responsibility.

- IT and engineering teams initiate the response by triage and diagnosis, focusing on the technical fix and stability
- Operations moves in parallel to assess true business impact, declaring severity level, and activating workarounds
- Finance needs to approve emergency funding and budgets
- Customer service is tasked with timely and transparent communications to all parties.

This list is by no means comprehensive but illustrative of the strategic imperative for a tightly coordinated response across the organization.


**The complete code is available on GitHub** [**here**](https://github.com/sesh11/chatkit-incident-management)**.**


## **High Level Architecture Overview**


**High-level architecture of the incident management system on Custom ChatKit**


![https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fefce9ddc-61ea-44ba-803c-5ccc77fdb6b5_1450x368.png](https://substackcdn.com/image/fetch/$s_!8Bvx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fefce9ddc-61ea-44ba-803c-5ccc77fdb6b5_1450x368.png)


This implementation architecture addresses three key architectural controls that are needed in enterprises, especially in regulated industries:

- Identity propagation through Agentic workflows
- Role-Based Access Controls at multiple systems layers
- Data sovereignty requirements

The ChatKitServer and Store interfaces from ChatKit are used to maintain complete control over authentication, authorization, agent orchestration and persistence. The UI rendering and streaming protocol management is delegated to ChatKit and only relies on openAI for inference.


Note that the ChatKit SDK relies on the users to fully implement the authentication (for example, integration with Okta) but provides the infrastructure to automatically propagate context through all components within ChatKit.


## **Implementation**


### **Custom Integration**


The ChatKitServer.respond() method defines the integration contract. This method is used for every user message and relies on the ThreadStreamObject. This method signature exposes three extensions:

- Thread parameter provides access to the conversation history which can be loaded from the Store implementation
- Input parameter contains the user’s message in a structured format
- Context parameter which contains the user context and controls the flow of identity.

The return type AsycIterator[ThreadStreamEvent] requires transformation of the agent execution to ChatKit’s streaming protocol.`


### **Identity Propagation**


**Frontend**


The useChatKit React hook accepts a CustomApiConfig object with a custom fetch function. This function intercepts every request before it leaves the browser allowing header injection. For the prototype, this adds plain text role and userid, but for production, this will be a JWT token or similar. This decouples identity management from ChatKit’s framework which is essential and allow the implementers to manage the identity and the integration with their existing identity management assets.


**Backend**Custom extract_user_context dependency function reads the authentication headers (in production this will be the function that unpacks the JWT tokens, validates signature, verifies expiry, and issuer) and maps the external identity provider roles to internal role enumerations. This is then constructed into an IncidentUserContext object containing the user’s role, permissions array, and necessary metadata. This context object propagates throughout the execution stack.


**Agents SDK**The agents SDK uses the Runner.run_streamed() method to accept a generic context parameter. The SDK guarantees that this context is passed to every tool invocation. Agent type is parameterized with Agent[IncidentUserContext] and every tool signature includes ctx: IncidentUserContext.


_I’ve additionally included a custom @requires_permission decorator that controls the permissions required for the execution of the tool. This is a 2nd layer of protection to protect against unauthorized access and execution of tools._


### **Store**


ChatKit defines an abstract Store interface with methods across thread management, thread item, attachment handling, and delete operations. Every method accepts a context parameter which allows for multi-tenant isolation at the storage layer.


The current implementation use in-memory python dictionaries for the prototype but can be swapped to sql queries and database access by retaining the same method and identical signatures.


### **Event Streaming**


ChatKit’s UI expects Server Sent Events (SSE) where the server maintains long lived connections and pushes them to the client. The ChatKitServer.respond() method’s return type AsyncIterator[ThreadStreamEvent] maps directly to SSE’s event stream model. The agents SDK emits its own event stream via result.stream_events(). The transform() method translates this to ChatKit event types.


### **Agent Execution**


The current implementation follows a stateless execution model for agents where the agent is instantiated within the respond() method and discarded. This pattern can enable horizontal scaling and eliminates memory management concerns.


While the agent execution is stateless, the threads contain the memory and the Store persists all the messages. The respond() method’s signature can be updated to load the thread history or be enhanced to carefully curate context before passing it to the agent before execution. At the time of writing this Anthropic just released another blog post titled “[Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)” which I believe will be another key ingredient to agent architecture at enterprises.


**I’m still not convinced the stateless execution model is the right fit.** [**Ambient**](https://blog.langchain.com/introducing-ambient-agents/) **long running agents (that don’t hallucinate) is likely the next frontier and I suspect we will see something around this in the upcoming months.**


### **Multi-Layer Authorization**


**Agent Layer**The create_incident_agent(role) returns the role specific agent configurations and the filtered set of tools that the agent can access. The generic Agent[IncidentUserContext] enforce the type checking and the SDK guarantees that every tool receives the IncidentUserContext as the first parameter making the identify information type-safe throughout the execution stack.


**Tool Layer**The first authorization occurs when creating the agent using the get_tools_for_role() function. The second layer is the decorator based permission checking using the @requires_permission. This extracts the context parameter and verifies if the require permission exists before executing the tool. This is a safeguard against hallucinations and prompt injections.


**Data Layer**The IncidentStore.get_incident_for_role() method calls the incident’s get_filtered_view() method, which returns role-appropriate fields. This is an example to show how data access security can be implemented ahead of the database. The agent will only receive the filtered view of results and the data that it is allowed to access.


## **Gaps, Opportunities, and What’s Missing**


### **Where the Ecosystem Still Falls Short**


While this is a great starting point to enable a shared agent ecosystem at large complex organizations, there are still certain friction points that could be addressed:

1. Decouple model dependency: A model gateway interface (with intelligent routing) would allow users to swap models and leverage best-in-class for various tasks.
2. Native enterprise identify and RBAC integration: This is the responsibility of the implementer. Providing a native plugin for OIDC, SAML, and Active Directory would reduce the time to implement. Additionally, introducing RBAC into the SDK can provide ease of implementation (similar to the @requires_permission decorator in the current implementation)
3. Claude Code type primitives: Introducing plan mode, HITL controls, etc. are critical especially at large enterprises where certain actions and decisions require additional levels of approval
4. Deployment blueprints: Docker containers, Kubernetes manifests, reference database (Postgres), and a Redis cache can reduce V0 setup time from weeks to days.
5. Observability: While the architecture provides the hooks necessary, there is no native OTel support

### **Enterprise Constraints You Must Plan For**


**HTTPS/TLS Requirements**Production deployments mandate HTTPS at all layers of the SSE streaming architecture. Enterprise API gateways require critical configurations such as disabling response buffering, extending connection timeouts for LLM streaming responses, and ensuring proper keepalive headers to prevent premature terminations. Enterprise teams should coordinate on certs, rotation, and HSTS policies to ensure security compliance while preserving SSE’s real-time streaming capabilities.


**Domain registration with OpenAI**Production deployments require domain verification with OpenAI to authorize custom domains for ChatKit Integration.


**ChatKit UI Distribution**The ChatKit Javascript library is distributed by OpenAI’s CDN. This creates a dependency on OpenAIs infrastructure for frontend availability. Organizations should evaluate 3rd party CDN usage with internal policies and consider SLA implications for availability.


## **Looking Ahead**


The future lies in long running “ambient” agents; systems that continuously execute, learn, optimize towards an objective. I’m fairly certain that the term “Ambient Agents” was first coined by Langchain in their article “[Introducing Ambient Agents](https://blog.langchain.com/introducing-ambient-agents/)” in early 2024. Achieving this will require significant advances in research as well as a fundamental shift in human-AI interaction.

- Interpretability
- Eliminating hallucinations
- Robust red-teaming and safety
- Behavioral consistency and controlled change over time
- Efficient memory architectures that support long running context

I invite you to explore the prototype and challenge the assumptions. My goal is to offer a practical blueprint that others can build from. It’s still early and this space is moving fast, I’m genuinely excited for the road ahead.
