---
title: "Technical Report: An Experiment in Bounded Migration"
date: "2026-04-09"
summary: ""
tags: ["engineering", "ai", "leadership"]
---

In my previous essay, I talked about why software engineering needs a fundamental rethink. The argument being that coding agents alone are not enough to close the gap especially for large complex enterprises. What is missing is the ability to understand an ecosystem, the dependencies, the ability to track what you have learned, and to build systems where knowledge compounds with every work effort. 


To explore what that looks like, I ran a controlled experiment. I took the original 1993 DOOM source code and ported it to MacOS using SDL2 with Claude Code. I ran it through a 7 phase reverse engineering methodology very similar to how I would rip apart the internals of mainframe sub-systems. I used this to generate scored predictions about the changes this port would require. The goal was to instrument a bounded migration task to measure where structured understanding helps, where it breaks down, and what the failure modes would look like.  


DOOM is the best case scenario for AI-assisted migration. It has been open source since 1997, extensively documented, widely available in training data, and very clean architectural boundaries. **And crucially, an AI agent can brute-force this port to completion.** That is exactly what makes it a useful experiment. In enterprise systems, you can’t iterate your way to success through trial and error. The codebases are too large and the dependencies are complex. The cost of an incorrect change are extremely high. A key requirement when deploying AI agents for software engineering is precision. 


This experiment was intended to compare a structured artifact-heavy path against a lighter one-shot path, make the shape of the problem more legible, and study the gap between precise completion and brute-force and what fills it. 


This is the full technical report with the methodology, results, failures, and what they suggest about the shape of the problem. 


## The Methodology


The methodology is based on the premise that every step produces artifacts that feeds the next. The idea of a flywheel and self-construction that forms the foundations of what is means to be AI-native. This is heavily inspired by the philosophy of compound engineering pioneered by Dan Shipper, Kieran Klaassen, and the good people at Every. (h[ttps://every.to/guides/compound-engineering](https://every.to/guides/compound-engineering)) 


The methodology also includes an append-only ledger that tracks every discovery, correction, and the scoring on the backend. 


Note: Every phase and writing-up the key findings was done by Claude Code. My role here was to design the methodology, set the reading order, define the research vectors, and validate the outputs. 


![image.png](/images/posts/doom-port-autonomous-software-engineering/30cc5ce9c2c8.png)


### Phase 1: Context Seeding


Carmack’s architecture notes are a great starting point for DOOM. At enterprise, this could just be a recorded interview with the right people, at least the ones remaining to understand the constructs of the codebase. 


Key finding: the _`I_`_-prefixed files constitute the entire platform abstraction layer. _`info.c`_ (137K lines) and _`tables.c`_ (122K lines) are generated data whose generator tool is not included. Sound uses a separate-process model (_`sndserver`_ via pipe) because Linux threading was immature in 1995. No music support exists at all.


Outputs: _`initial-briefing.md`_, _`platform-target.md`_, first ledger entry.


### Phase 2: Per-Unit Deep Reading 


Every source file in every subsystem was read exhaustively in the order prioritized for the porting objective. Nine subsystems were documented capturing purpose, files, key data structures, key functions, global state, inter-subsystem dependencies, platform-specific code, and open questions.


Reading order and rationale below: 


![image.png](/images/posts/doom-port-autonomous-software-engineering/07d643b3fb5b.png)


Each subsystem read was informed by what previous reads had established. Reading the platform interface first meant that when the game loop analysis encountered _`I_StartTic()`_ → _`D_PostEvent()`_ → _`G_BuildTiccmd()`_, the complete input pipeline was already understood. 


Note that this is being done in the context of the objective which is porting this to MacOS. 


The Phase 2 subsystem docs are all in `compound-engineering/claude-md/`


### Phase 3: Architecture Mapping


Building on top of Phase 2, Phase 3 focuses on building three key synthesis documents.


**Dependency Map**


The architecture is a strict DAG. The game loop is the hub which depends on everything else. All sub-systems flow down through shared services (zone memory, WAD loading, trig tables) to the interface.


![image.png](/images/posts/doom-port-autonomous-software-engineering/8b766fd43e3d.png)


Call Chain


Four critical execution paths traced with exact file and line number references: startup (_`main()`_ → _`D_DoomMain()`_ → 375 lines of sequential init → _`D_DoomLoop()`_), one game tic (input → ticcmd → game state → render), rendering one frame (BSP walk → column drawers → _`I_FinishUpdate()`_), and level loading (WAD lump reads → geometry → BSP → thinker spawning).


Interface Contracts


For each of the 40 _`I_*`_ functions: inputs, outputs, side effects, behavioral guarantees, call frequency, and what a replacement implementation must provide. This was the single most valuable artifact in the project — when it came time to write _`i_video_sdl.c`_, the contract was a near-complete specification. Implementation became mechanical translation.


Outputs from this phase are in compound-engineering/architecture/


### Phase 4: Cataloging


Every platform-specific item tagged with file, line number, severity, and prescribed fix action. The catalog organized into five sections:


Section 1: System Headers


![image.png](/images/posts/doom-port-autonomous-software-engineering/599b1a237d6d.png)


Section 2: X11 API Calls (25+ functions in i_video.c)*


![image.png](/images/posts/doom-port-autonomous-software-engineering/d74492213d33.png)


Section 3: 64-bit Pointer/Integer Hazards (20+ locations across 8 files)


![image.png](/images/posts/doom-port-autonomous-software-engineering/75a610c9072d.png)


Section 4: Build System


![image.png](/images/posts/doom-port-autonomous-software-engineering/52a3ae07b79b.png)


Section 5: File Level Impact Summary


**Configuration Catalog:** 38 command-line arguments, 41 config file entries, 5 build-time symbols, all renderer/gameplay constants, and the complete _`defaults[]`_ table structure with its critical 64-bit bug documented.


![image.png](/images/posts/doom-port-autonomous-software-engineering/f6d34ccbf2cc.png)


**Data Tables Catalog:** Documentation of the three large data files: _`info.c`_ (3-layer entity data model: 170 sprites, 967 states, 137 entity types), _`tables.c`_ (3 trig LUTs: finetangent[4096], finesine[10240], tantoangle[2049]), and _`sounds.c`_ (68 music definitions, 109 sound effects). All three compile unchanged on macOS 


![image.png](/images/posts/doom-port-autonomous-software-engineering/d4d7da968dcb.png)


Outputs are in compound-engineering/catalogs/


### **Phase 5: Taxonomy**


A glossary of 24 domain concepts. Each entry includes definition, implementing files, why it matters, and port impact. 


Output in compound-engineering/catalogs/taxonomy.md


### Phase 6: Skill Extraction


This is probably the most important artifact that is intended to power the flywheel. Creating an objective-based reusable skill that can be handed to others to apply on their projects, objectives, and maintained to continuously incorporate best practices. This needs to be done community style and is the missing link in most organizations. The learnings need to carry forward and this needs to be treated like source code. 


_At the time of writing this, Karpathy dropped the concept of the “idea file” that can be shared with others (and their coding agents). It maybe interesting to think about this as an idea file and what it needs to incorporate. This is an active area of exploration._


### Phase 7: Port Planning and Build Orders


Five build orders, each referencing specific artifacts from Phases 1-6:


![image.png](/images/posts/doom-port-autonomous-software-engineering/28eb0320035c.png)


The concept of the build order is inspired by 8090’s [Software Factory](https://www.8090.ai/docs/modules/planner) and [Missions](https://factory.ai/news/missions) from Factory


## Results


After implementation, every code change was scored against the documentation. The retroactive scoring counted every distinct change individual across all the files. 


![image.png](/images/posts/doom-port-autonomous-software-engineering/5dd610f5bd69.png)


I earlier reported 64% as the accuracy based on the initial scoring pass that counted broad categories as single predictions ("10 chat macro casts" = 1 prediction, "7 Z_Malloc fixes" = 1 prediction). The retroactive granular scoring is provides a better representation. 


![image.png](/images/posts/doom-port-autonomous-software-engineering/50689a57c1b2.png)


**Unpredicted changes**


![image.png](/images/posts/doom-port-autonomous-software-engineering/2c3e6a1731f7.png)


**Failure Points**


**Failure 1: The WAD Struct Pointer Field**


In _`r_data.c`_, the engine reads texture data from the WAD file by casting raw binary data onto a C struct called _`maptexture_t`_. One field — _`columndirectory`_ — was declared as _`void **`_, a pointer type. On 32-bit: 4 bytes, matching the WAD format. On 64-bit: 8 bytes. Every struct field after _`columndirectory`_ reads from the wrong offset. 


The platform dependency catalog tracked "pointer-to-int casts" — code patterns where a pointer is cast to an integer. It did not track "pointer-typed fields in structs overlaid onto binary file data." These are fundamentally different hazards. The cast is a code pattern. The struct field is a data format assumption


**Failure 2: The Z_Malloc Prediction that was ignored**


_`p_setup.c`_ line 536: _`Z_Malloc(total*4, PU_LEVEL, 0)`_ allocates a buffer for an array of _`line_t*`_ pointers using hardcoded 4-byte pointer size. On 64-bit, each pointer is 8 bytes. The subsequent loop writes _`total`_ 8-byte pointers into a buffer sized for 4 bytes each — a 2x overrun that corrupts the zone allocator's linked list. The crash occurs later, in an unrelated _`Z_Malloc`_ call, when it traverses the corrupted list. 


This was explicitly predicted in three different artifacts and even specifically called out in Build Order 003. The implementation skipped the fix because the initial testing only looked at the title screen and dismissed the prediction as unnecessary. 


If three separate documentation artifacts predict a risk and the implementation does not address it, that is a contradiction that should halt execution, not dismissed. 


**Failure 3:**


The platform dependency catalog's summary section, which synthesized across all sections to classify each file as "needs changes" or "unchanged" was only 62% accurate.


This is a really interesting observation. Each of the failure points here didn’t have a specific vector that looked for this information during the earlier phases. For e.g., the summary said am_map.c was unchanged because no scan category existed for K&R implicit int patterns. It said m_swap.c/h was unchanged because no scan category existed for long as a general LP64 hazard. The is a systemic failure where 8 files were misclassified and each downstream artifact inherited those gaps. 


![image.png](/images/posts/doom-port-autonomous-software-engineering/d0befaea33d7.png)


There are some lessons to be gained from this. 

1. **Category blindness** (Failure 1) - The catalog was looking for a code pattern (int)some_pointer and it found those reliably. What it didn’t find was the void **columndirectory sitting inside a struct that gets overlaid onto binary file data. This is a data representation assumption. The lesson here is to generate separate research vectors for binary struct layout contracts. This is one unpredicted change, but a big insight about how the methodology needs to evolve.
2. **Execution Override** (Failure 2) - the analysis was spot-on but ignored. Build order discipline needs to be enforced. It skipped the prescribed fix because the title screen worked in the test. The build orders need to be treated as mandatory unless explicitly deferred with justification. This is also a lesson in ensuring that the tests are comprehensive. Title screen loading alone isn’t sufficient.
3. **Multiple lessons (Failure 3)** - There are multiple lessons to be learned looking at Failure 3.
    1. Systemic Category Blindness: You can see this manifest more systemically in Failure 3 because the information is incomplete. am_map.c (K&R implicit int patterns), m_swap.c/h (long as general LP64 hazard), info.h (long in state_t), d_net.h (long in doomcom_t), tables.h (#ifdef LINUX removal). There are genuine blindspots that were not covered in the initial analysis. (This is the hardest piece of solve given that it is so nuanced and specific to each codebase)
    2. The long issues across m_swap.c/h, info.h, and d_net.h are data representation contracts. We are missing this vector in our approach. Every long in a struct that crosses a boundary (file format, network protocol, shared memory) is a potential layout drift.
    3. The tables.h #ifdef linux removal is a configuration surface gap. The catalog inventoried the build-time symbols but didn’t exhaustively trace every file that consumes this.
    4. The i_system.c needed mb_used changed from 6 to 16MB. You can’t know this from static analysis. This requires testing and execution to determine that we do truly in fact run out of zone memory. This raises the general question about what needs to be true about automated testing in this new paradigm of software development.

The fundamental limitation is that you can’t evaluate against a category that you haven’t explicitly prescribed. The retroactive scoring reveals gaps only after the work is done. The categories unpredicted and the types of issues uncovered seed the categories that will be predicted for the next project. This is the compounding mechanism and requires a fundamental shift in organizational design and mindset. The system will only get better if there is a disciplined approach to curation. 


## Generalizing Architecture Research Vectors


This experiment exercised a subset of the analysis categories a migration might require. Looking across the gaps revealed by this exercise, a more comprehensive architecture phase would need to cover research vectors across the following areas: 


**Structural Vectors (How is the code organized?)** 

- Dependency Maps - We already have this
- Boundary Taxonomy - interface contracts where you have API boundaries (HTTP, gRPC), process boundaries (IPC, message queues), trust boundaries (auth layers), and domain boundaries. The agent should be able to identify and classify every boundary in the system.

**Behavioral Vectors (How does the code execute):** 

- Call chains - we have this. This is in essence the execution path analysis
- State Topology - We didn’t need this for DOOM because it’s all globals and runs a single process. This would typically capture things such as, where does the mutable state live, who can read and write to it, is it a database, cache, or a message queue? The agent needs to map every stateful component and trace how state progresses
- Concurrency Model - This is critical for most systems. What’s the threading model, what’s shared, what’s the locking strategy, async patterns, event loops, etc. This should focus on every single event synchronization primitive and shared-state access pattern.

**Data Vectors (What the system processes):**

- Data flow map - This shows how information transforms as it moves through the system.The agent should trace how the primary data entities enter the system, transform and exit. This should also include the shape and structure of the data as it crosses boundaries and interfaces.
- Persistence patterns - How does the system interact with storage (databases, file-systems, caching layers, consistency models) etc. This is the hardest thing to change.
- Configuration surface - This was done in phase 4 for DOOM. This should be generalized to capture all points that could change behavior that’s not in the code i.e., environment variables, feature flags, config files, database-driven configs, A/B test frameworks. This matters and is an after thought.

**Cross cutting vectors**

- This includes Observability surface, security model, lifecycle and resource management, etc.

This is by no means exhaustive and is intended to serve as a starting point to build on. 


## Key Takeaways


### Understanding is not documentation


Understanding a codebase is so much more than just documentation. It is a sequence of distinct operations and multiple research vectors to product artifacts that can compound and allow for precision in the software engineering lifecycle. The documentation and specifications need to describe what needs to happen in the context of the objective and not just what the codebase currently does. 


### Blueprints and build orders


Blueprints in this context are artifacts scoped to a particular objective. It’s a specification of what needs to happen such as the function signatures, behavioral guarantees, translation rules, etc. Build orders provide a mechanism to decompose the work into packages that contain explicit predictions. This also provides the ability to score changes post execution to allow for continuous learning. Execution discipline is paramount, build orders need to be followed strictly. New findings, bugs, and inconsistencies need route back through the process instead of a brute-force fix during execution. 


### Feedback Loops


The formula is fairly straightforward here: Broad > Deep > Repeat


Each broad pass generates a set of questions. The research vectors need to be tailored ecosystem as well as incorporating learnings from prior projects. The deep pass answers questions posed earlier and generates new questions. This is something that can be automated with swarms or teams of agents. Each step can be decomposed into sub-tasks that can run in parallel. 


The recursive structure is the pattern that the teams of agents execute →spawn a broad-pass agent, collect questions, spawn deep-pass agents in parallel to answer those questions, generate new questions → repeat


An interesting research question to pose here is “when does human judgement enter this loop”? An autonomous system would need to make the judgement calls needed to know when there is a need for escalation given unknowns and blindspots. 


### Self-Correction


The append-only ledger provides a mechanism for self-correction. These corrections can then be verified and validated against. An autonomous system needs the ability to continuously self-correct as it is executing and a pre-requisite for this is knowing when it’s operating outside of its defined boundary


## Conclusion


This study is tilted toward refactoring and platform migration and not building from scratch. The research vectors, failure classifications, and scoring methodology reflect that bias. A greenfield project or a distributed systems decomposition would require different vectors and would also surface different failure modes.


The intent here is not to present a completed framework. It's to show the shape of the problem and think through what needs to be true to start the journey toward autonomous software engineering. 


![image.png](/images/posts/doom-port-autonomous-software-engineering/ff061c315c6d.png)


All artifacts, documentation, ledger entries, and scored predictions are available on [GitHub](_https://github.com/sesh11/doom_).


---


## BONUS: How did Carmack and idSoftware fit 3D into 4MB of RAM? 


The most fascinating part of the doom codebase is how they built a real-time 3D engine that ran on q 66MHz processor with 4MB of RAM. This meant no floating point math, no GPU, and no hardware acceleration of any kind. Every technique employed to make this happen was known in theory, but nobody had combined them into a real-time engine at this level of complexity. Honestly, I had so much fun learning about how doom works and writing this section. It goes to show how early we are with what can done with LLMs. The potential of an 8-year old with a $20 subscription is limitless if harnessed the right way. 


DOOM runs at 320X200 pixels, 8-bit color, at 35 frames per second. The target hardware at the time was 66MHz, 4MB RAM. Everything is computed in fixed-point integer arithmetic. This is why it was monumental. This was first someone had taken all of these theoretical concepts about how to render in 3D and brought them to life. Here are some cool things about the codebase: 

1. **BAM (Binary Angle Measurement).** Angles are 32-bit unsigned integers where the 360 degree circle maps to the integer range i.e., 0 - 2^32. The overflow at 2 ^ 32 naturally wraps to 0 which in this context just means that you’ve just done a full 360 as a player.
2. **Precomputed trigonometry.** Given that angles are 32-bit unsigned integers, there is a specific integer value between 0 and 4,294,967,295. This means precise measurement in terms of viewing angles but it also means computation against 4 billion plus values which on a 66MHz 4MB RAM was not possible. This was reduced to 8,192 values by simply right shifting the angle by 19 bits (ANGLETOFINESHIFT). This means that you throw away the right 19 bits of a 32 bit unsigned integer, which leaves you with 13 bits. Each angle still covers 0.044 degrees of a circle which is plenty of precision for the game. The angle to table index is a single CPU instruction (bit shift) instead of actual division which wouldn’t have been fast enough on a 66MHz processor for every moving object in the game. 
So, when the player is facing a particular direction represented by BAM (as a single unsigned int value), the change to the ‘x’ and ‘y’ positions of the player are simply computed as the formula speed*cos(thetha) and speed*(sine) respectively. And instead of computing cost(thetha) every time, Carmack created a precomputed look-up table for each of the 8192 values. Given that cos(thetha) is just sine(thetha) shifted by 90 degrees, additional 2048 entries (8192/4) were added to the precomputed trig table thereby creating just one array with 10,240 entries (8192 + 2048) with two pointers, one for sine and one for cosine. Now, this pattern applies to basically everything that moves in the game, simplified down to integer multiplication and lookups.
3. **BSP rendering:** Doom does not ray cast. Instead, it walks a binary space partition tree that is precomputed for each level. The node builder picks a wall segment and extends to an infinite line that cuts across the map. Everything on one side goes to the left child, and the other to the right side. It then recurses, picks up another splitting line for each child, and continues on until every leaf region has no wall segment that cross any other within that region. This is the data that is loaded into the WAD file. 
At runtime, the renderer starts at the root node and then runs a simple computation to understand which side of the splitting line the player is on.

The node stores the splitting line as a point (x,y) and a direction (dx,dy). The player is at (player_x, player_y). The vector rom the line’s origin to the player is computed by pdx = (player_x -x) and pdy = (player_y - y). Then result = (dx*pdy) - (dy*pdx). If the result is positive, the player is on the “front” side (right child) and if negative, player is on the “back side” (left child). The player side gets visited first and the closer walls get processed first than the farther ones. The formula is a brilliant implementation of the 2D cross product. 

The renderer visits the player side first and draws the subsectors in front-to-back order by traversing the whole tree. Once it reaches a subsector, it takes all the wall segments and figures out which screen columns the wall covers. The occlusion tracker is in essence an array that tracks whether the column has been filled. It only draws the visible columns. Once all 320 columns have been filled, the traversing stops. Additionally, the BSP node stores a bounding box for each child. If the renderer seeps that the bounding box overlaps with any filled columns and if there are no unfilled columns, it skips the branch completely.
4. **The perspective formula:** Once the rendered know which columns the seg covers, it needs to figure out two things: how tall to draw the wall and what to fill it with? 
For the height, the perpendicular distance from the wall is calculated and then does a (160/distance). The 160 is because it’s half of 320 given that DOOM was intended to run at a 320X200 pixel configuration. This is the perspective effect. 
Now let’s talk about the color. Each seg knows which wall texture it uses. The textures are images stored in the WAD as columns of palette indices. Each pixel is a number from 0 to 255. For a given screen column , the renderer figures out which vertical slice of the texture corresponding to the column. 
There are 34 pre-computed colormaps. Colormap 0 is full brightness, Colormap 1 is slightly darker etc. The renderer which color map to use based on the distance to the wall. The computation is just reading from a different table. 
Everything until now is in the context of a palette index space. The framebuffer, which is 64,000 bytes contains only indices. The palette is a separate 768-byte table (256 colors X 3 bytes for red, green, and blue). Once the frame is done, it reads each of the 64,000 index bytes, lookups the RGB color in the palette, and sends that to the display. The game itself has multiple palettes and just changes the lookup against a different palette keeping the framebuffer intact. 
In essence, the pipeline is simple: One pixel → Texture (which index?) → Colormap (darken based on distance) → framebuffer (store final index) → palette (convert index to actual color). **Three sets of lookups and one write.**
