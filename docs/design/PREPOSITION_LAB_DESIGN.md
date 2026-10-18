# PREPOSITION LAB: Level 1 Functional Containment Design Specification
**Pedagogical Source:** Seth Lindstromberg, *English Prepositions Explained* (Revised Edition, 2010), Chapter 1 (§1.8, §1.12, pp. 13–14, 21) & Chapter 4 (§2.1–§2.3, pp. 73–76).  
**Document Status:** Refined Gameplay & Interaction Specification (Ready for Review).  
**Target Environment:** NextBand LMS Web Application (Desktop & Mobile Responsive).  
**Target Learners:** Intermediate English learners (CEFR A2–B2, with specific attention to Vietnamese cross-language cognitive transfer).

---

## 1. Pedagogical Logic & Cross-Linguistic Foundations

### 1.1 Source-Grounded Distinctions (Lindstromberg 2010)
In Chapter 1 (§1.12) and Chapter 4 (§2.3, pp. 74–76), Lindstromberg demonstrates that spatial prepositions cannot be reduced to pure Euclidean geometry or static dictionary definitions:
1. **Geometric Enclosure vs. Functional Meaning:**
   - Pure geometry (topology) describes spatial boundaries, contact, and coordinates.
   - Functional meaning describes physical relationships such as **support against gravity**, **prevention of escape/falling**, and **dynamic control/linkage**.
2. **Gestalt Completion vs. Functional Containment:**
   - *Gestalt completion* (Hottenroth 1993) explains that human perception imaginatively connects broken boundaries (e.g., mentally bridging the rim of a bowl to enclose fruit rising slightly above it).
   - However, Lindstromberg shows that gestalt completion alone **fails** to account for critical cases:
     - An apple covered by an upside-down bowl is geometrically within the concave boundary and inside any completed gestalt, yet native speakers naturally say the apple is **under** the bowl because the bowl acts as a *cover/shield*, not a container.
     - Smoke beneath an upside-down bowl is naturally described as **in** the bowl because the bowl's ceiling prevents the rising buoyant gas from escaping (active functional containment).
     - A nail hammered only 30% into a wooden plank has 70% of its body protruding into open space (where no gestalt closure exists), yet native speakers say the nail is **in** the board because the wood grips and holds it (moving the board moves the nail).
   - Coventry et al. (1994) experimentally validated that native speakers judge the functional containment zone of a bowl higher than that of a jug/pitcher because bowls conventionally hold stackable solids, whereas jugs hold liquids that spill if they exceed the brim.
3. **Caveat on Linguistic Rules:**
   - Prepositional usage in natural languages involves conventions, context, and speaker perspective, not absolute immutable laws. The pedagogical goal is to reveal why *in* is natural, communicative, and motivated in these contexts, rather than presenting a rigid mechanical rule.

### 1.2 Cross-Linguistic Transfer Friction (Vietnamese Learners)
- In Vietnamese, spatial relationships are frequently mediated by relational nouns or generic copular locatives (*ở*, *nằm ở*) combined with directional or static descriptors (*trong* = inside, *trên* = on/above, *dưới* = under/below).
- Because Vietnamese grammar relies heavily on lexical context and serial verbs rather than dedicated prepositional distinctions of functional support vs. simple contact, learners often rely on literal 1:1 translation dictionaries:
  - *in* $\rightarrow$ "ở trong"
  - *on* $\rightarrow$ "ở trên"
  - *under* $\rightarrow$ "ở dưới"
- When encountering an apple covered by an inverted bowl, a Vietnamese learner may translate "nằm trong lòng cái bát úp" and mistakenly produce *"The apple is in the bowl"*.
- Conversely, seeing fruit piled high above the brim, they may select *"above the bowl"* or *"on the bowl"* ("trên miệng bát") because the fruit is physically higher than the container's physical edges.
- **Pedagogical Strategy:** The game provides tactile proof: if you lift or move the landmark, what happens to the subject? The feedback directly targets this distinction.

---

## 2. Core Gameplay Loop

The player progresses through a tightly focused 6-step loop designed for short, high-engagement sessions:

$$\mathbf{Observe} \longrightarrow \mathbf{Predict} \longrightarrow \mathbf{Manipulate} \longrightarrow \mathbf{Discover} \longrightarrow \mathbf{Explain} \longrightarrow \mathbf{Transfer}$$

1. **Observe:** The player is presented with a 2.5D interactive scene containing a Subject (entity being located) and a Landmark (reference object), along with a prompt sentence with a blank.
2. **Predict:** The player chooses from 3–4 preposition chips *before* the simulation runs. The simulation trigger is disabled until a prediction is locked in.
3. **Manipulate (Action Phase):** The player presses the primary action button (e.g., "Move Bowl", "Lift Bowl", "Tilt Edge") or drags the Landmark to test their prediction.
4. **Discover:** The deterministic simulation animates. The physical consequence directly confirms or disproves the prediction (e.g., the fruit travels with the bowl, the apple stays behind on the table, or the smoke escapes into the air).
5. **Explain:** Immediate, focused cognitive feedback appears, explaining the functional relationship in 1–2 sentences. An optional "Insight (VN)" toggle allows Vietnamese learners to see a concise L1 contrast without cluttering the main English experience.
6. **Transfer:** The final puzzle presents a visually distinct scenario (e.g., carpentry/tools instead of tableware) where the player must apply the learned functional principle to succeed.

---

## 3. Five-Puzzle Level 1 Specification ("The Container & The Cover")

### Puzzle 1: Placement Basics (The Fruit, The Bowl & The Table)
- **Pedagogical Source:** Lindstromberg, Ch. 1 §12 (p. 13); Ch. 4 §2.1 (Figure 4.1, p. 73).
- **Initial Scene:** A clean wooden table. An upright ceramic bowl sits in the center. An orange is placed beside the bowl on the tabletop.
- **Available Actions:**
  - Drag the orange to three distinct snap zones:
    1. Zone A: Resting on the flat tabletop next to the bowl.
    2. Zone B: Balanced precariously on the thin upper rim of the bowl.
    3. Zone C: Dropped into the interior concave bottom of the bowl.
- **Player Prediction / Task:**
  - The orange is snapped into Zone C (inside the bowl).
  - Prompt: *"The orange is ______ the bowl."*
  - Choices: `[ IN ]`, `[ ON ]`, `[ UNDER ]`.
- **Deterministic Action & Outcome:**
  - Action button: *"Slide the Bowl"*.
  - When pressed, the bowl slides 100px to the right. The orange stays securely nestled inside and slides with it.
- **Evaluation & Feedback:**
  - **Choosing IN (Canonical):** Bowl moves, orange rides inside. Feedback: *"Notice how the bowl's concave walls enclose the orange and prevent it from rolling off. The orange is IN the bowl."*
  - **Choosing ON:** A visual overlay highlights the flat table surface vs. the bowl's hollow interior: *"If the orange were merely ON the bowl, it would balance on top or on the rim without enclosure. Because the sides hold it, we say IN."*
  - **Choosing UNDER:** A red line traces the table below the bowl: *"The orange is not beneath the base. It rests within the bowl's cavity."*
- **Optional VN Insight:** *"Khi vật thể được lòng vật chứa bao bọc và giữ lại, tiếng Anh dùng 'IN', không dùng 'ON'."*
- **Learning Objective:** Establish the baseline functional contrast between surface contact (`ON`) and concave enclosure with containment (`IN`).

---

### Puzzle 2: The Overflowing Bowl (Fruit Above the Rim)
- **Pedagogical Source:** Lindstromberg, Ch. 4 §2.3 (pp. 74–75, Figure 4.2 left; Coventry et al. 1994).
- **Initial Scene:** An upright bowl already filled to the brim with green apples. A single ripe banana is perched across the topmost apples, extending 40px entirely above the physical rim of the bowl.
- **Available Actions:**
  - Player can tap the banana to nudge it (it wobbles slightly, nestled stably in the fruit cluster).
- **Player Prediction / Task:**
  - Prompt: *"The banana is ______ the bowl."*
  - Choices: `[ IN ]`, `[ ABOVE ]`, `[ OVER ]`, `[ UNDER ]`.
- **Deterministic Action & Outcome:**
  - Action button: *"Push the Bowl"*.
  - When pressed, the bowl moves smoothly across the table. The entire fruit stack, including the topmost banana, moves together with the bowl without falling.
- **Evaluation & Feedback:**
  - **Choosing IN (Canonical):** Feedback: *"Even though the banana sits higher than the bowl's physical rim, moving the bowl moves the banana! The bowl's functional containment extends upward through the interlocking fruit."*
  - **Choosing ABOVE:** The simulation displays a hypothetical phantom banana hovering in mid-air above the bowl with empty space in between: *"ABOVE implies separation in space without contact or support. If the banana were ABOVE the bowl, moving the bowl wouldn't move the banana."*
  - **Choosing OVER:** Feedback: *"OVER can imply covering or crossing a path, but here the banana belongs to the contained stack held by the bowl."*
- **Optional VN Insight:** *"Dù chuối nhô cao hơn thành bát, nhưng nó vẫn thuộc khối vật thể được bát nâng đỡ và giữ lại khi di chuyển. Người bản xứ vẫn coi chuối là 'IN the bowl'."*
- **Learning Objective:** Discover that functional containment extends beyond rigid geometrical rims when objects interlock and move as a contained cargo.

---

### Puzzle 3: Cover or Container? (The Inverted Bowl & The Apple)
- **Pedagogical Source:** Lindstromberg, Ch. 4 §2.3 (p. 74, Figure 4.2 middle; Cuyckens 1993, Vandeloise 1986).
- **Initial Scene:** A red apple rests on the table. A bowl is turned upside-down and placed over the apple, completely concealing it from side view.
- **Available Actions:**
  - The player can tap "X-Ray Mode" to reveal the apple sitting quietly on the table inside the bowl's interior cavity.
- **Player Prediction / Task:**
  - Prompt: *"The apple is ______ the bowl."*
  - Choices: `[ UNDER ]`, `[ IN ]`, `[ ON ]`, `[ BEHIND ]`.
- **Deterministic Action & Outcome:**
  - Action button: *"Lift the Bowl"*.
  - When pressed, the bowl lifts 80px straight up into the air. The apple remains stationary on the table surface.
- **Evaluation & Feedback:**
  - **Choosing UNDER (Canonical):** Feedback: *"The bowl functions as a roof or COVER to shield the apple. Because lifting the bowl leaves the apple behind on the table, the apple is UNDER the bowl, not in it."*
  - **Choosing IN:** The bowl lifts, leaving the apple behind on the table: *"Look at what happened when the bowl was lifted: the apple didn't go with it! The bowl is not containing or carrying the apple; it is acting as a cover. Therefore, the apple is UNDER the bowl."*
  - **Choosing ON:** Feedback: *"The apple is beneath the bowl's inverted base, not resting on top of it."*
- **Optional VN Insight:** *"Dù quả táo nằm trọn trong vòm bát úp (về mặt hình học), nhưng chiếc bát đang đóng vai trò là 'nắp đậy' chứ không 'chứa đựng'. Nhấc bát lên thì táo vẫn ở lại bàn $\rightarrow$ dùng 'UNDER'."*
- **Learning Objective:** Differentiate geometric boundary enclosure from functional role (container vs. cover).

---

### Puzzle 4: The Smoke Challenge (The Climax: Inverted Bowl with Trapped Smoke)
- **Pedagogical Source:** Lindstromberg, Ch. 4 §2.3 (p. 74, Figure 4.2 right; Cuyckens 1993, Vandeloise 1986).
- **Initial Scene:** An upside-down bowl rests flat on the table, exactly identical in geometry to Puzzle 3. However, through the semi-translucent glass bowl, dense purple smoke is swirling actively.
- **Available Actions:**
  - Slider or Toggle: *"Tilt Bowl Rim 15°"*.
- **Player Prediction / Task:**
  - Prompt: *"There is smoke ______ the bowl."*
  - Choices: `[ IN ]`, `[ UNDER ]`, `[ ON ]`, `[ ACROSS ]`.
- **Deterministic Action & Outcome:**
  - When the player tests the tilt handle, the rim lifts slightly: smoke immediately begins billowing upward into the room.
  - When released, the bowl drops back down, trapping the remaining smoke tightly against the table.
- **Evaluation & Feedback:**
  - **Choosing IN (Canonical):** Feedback: *"Surprising, isn't it? Even though the bowl is upside down, rising smoke naturally escapes upwards. The bowl actively prevents the smoke from escaping—it holds the smoke in! Thus, native speakers naturally say smoke is IN the bowl."*
  - **Choosing UNDER:** Feedback: *"In Puzzle 3, the apple was UNDER the bowl because gravity held it to the table. But smoke naturally rises! The bowl is not just a roof; it is actively trapping and containing the gas. In English, when an object prevents escape, it functions as a container $\rightarrow$ IN."*
- **Optional VN Insight:** *"Khác với quả táo bị trọng lực kéo xuống bàn, khói có xu hướng bay lên và thoát ra. Chiếc bát úp đang trực tiếp 'giam giữ' không cho khói thoát ra $\rightarrow$ lúc này bát thực hiện chức năng vật chứa (containment), nên dùng 'smoke IN the bowl'."*
- **Learning Objective:** Discover that functional containment depends on substance behavior (solid fruit held down by gravity vs. buoyant gas trapped by an inverted ceiling).

---

### Puzzle 5: The Transfer Challenge (The Protruding Nail in Wood)
- **Pedagogical Source:** Lindstromberg, Ch. 4 §2.3 (p. 75; nail diagram).
- **Initial Scene:** A sturdy wooden plank rests vertically or horizontally on a workshop bench. A heavy iron nail is driven only 30% into the wood; 70% of the nail’s body visibly protrudes into open air.
- **Available Actions:**
  - Action button: *"Slide the Wooden Plank"*.
  - Action button: *"Pull with Pliers"*.
- **Player Prediction / Task:**
  - Prompt: *"Most of the nail is out in the open air. Yet native speakers say: The nail is ______ the wood."*
  - Choices: `[ IN ]`, `[ ON ]`, `[ OUT OF ]`, `[ AT ]`.
- **Deterministic Action & Outcome:**
  - When the player slides the wooden plank, the protruding nail moves rigidly with it.
  - When the player pulls with pliers, the nail resists removal because the wood's fibers grip its tip tightly.
- **Evaluation & Feedback:**
  - **Choosing IN (Canonical):** Feedback: *"Transfer complete! Gestalt completion cannot explain this (the wood's rectangular shape is already complete). We say IN because the wood grips and holds the nail: moving the wood moves the nail. Functional grip = IN."*
  - **Choosing ON:** Feedback: *"The nail is embedded and gripped by the wood's interior fibers, not resting freely on its external surface."*
  - **Choosing OUT OF:** Feedback: *"While part of the nail protrudes out, the sentence describes its current anchored state: the gripped portion establishes the relationship as IN the wood."*
- **Optional VN Insight:** *"Dù hơn nửa cái đinh nhô ra ngoài không khí (không có hình học nào khép kín phần đinh đó), người bản xứ vẫn dùng 'IN the wood' vì thớ gỗ đang kẹp chặt và giữ chiếc đinh: thanh gỗ chuyển động thì đinh chuyển động theo."*
- **Learning Objective:** Transfer the abstract principle of "functional grip and coupled movement" to a completely new physical domain without prompts or pre-teaching.

---

## 4. Screen Layout & Wireframes (Desktop & Mobile)

The layout prioritizes visual clarity, keeping the interactive scene central and interaction targets large (minimum 48px height) to prevent mobile touch errors.

### 4.1 Desktop Wireframe (Centered 640px Lab Card)
```
+-----------------------------------------------------------------------+
|  PREPOSITION LAB : LEVEL 1                 [ 💡 Hint ]  [ Step 3 / 5 ] |
|  The Container & The Cover                                            |
+-----------------------------------------------------------------------+
|                                                                       |
|                       INTERACTIVE DIORAMA                             |
|                    (SVG 2.5D Isometric Canvas)                        |
|                                                                       |
|                          /=============\                              |
|                         /   (Bowl)      \                             |
|                        /                 \                            |
|                        \=================/                            |
|                                [Apple]                                |
|             ----------------------------------------------            |
|                           [ Tabletop ]                                |
|                                                                       |
|                 [ 👁️ Toggle X-Ray ]   [ ⬆️ Lift Bowl ]                 |
|                                                                       |
+-----------------------------------------------------------------------+
|  PREDICT: "The red apple is ________ the bowl."                       |
|                                                                       |
|     +------------+   +------------+   +------------+   +------------+ |
|     |  A) UNDER  |   |   B) IN    |   |   C) ON    |   | D) BEHIND  | |
|     +------------+   +------------+   +------------+   +------------+ |
|                                                                       |
|             [ TEST MY PREDICTION ] (Enabled after choice)             |
+-----------------------------------------------------------------------+
|  COGNITIVE FEEDBACK PANEL (Expands upon action):                      |
|  "The bowl functions as a COVER. Lifting it leaves the apple behind.   |
|   Therefore, the apple is UNDER the bowl."                            |
|   [ 🇻🇳 Xem giải thích tiếng Việt ]                                     |
+-----------------------------------------------------------------------+
```

### 4.2 Mobile Responsive Layout (<640px Screen Height / Width)
- **Top Bar (44px):** Level title, step dots (`● ● ○ ○ ○`), and a persistent `[💡]` icon button.
- **Interactive Diorama (Top 45% of viewport):** Aspect ratio 4:3, pure SVG scaling. Objects respond to direct touch gestures (tap to lift, slider for tilt).
- **Control & Prediction Area (Bottom 55% of viewport):**
  - Prompt sentence displayed in bold 16px text with high-contrast blank.
  - Preposition selector buttons formatted as a $2 \times 2$ grid with generous touch targets (height: 52px, font-size: 18px bold).
  - Primary Action Button (*"TEST PREDICTION"* / *"OBSERVE RESULT"*): Full-width 50px pill button at bottom.
  - Slide-up Drawer: When an action completes, feedback slides smoothly from the bottom with a 1-tap dismiss handle.

---

## 5. Technical Decisions & Boundaries

### 5.1 Architecture & Tech Stack
1. **Zero External Heavy Dependencies:**
   - **No Three.js / WebGL:** 3D libraries add unnecessary bundle weight (~600KB gzipped), complicate mobile touch hitboxes, and drain mobile battery.
   - **Rendering Engine:** Clean, standard 2D/2.5D SVG elements controlled via React component state and styled with Tailwind CSS transitions.
2. **State Management:**
   - Strictly deterministic local React state machine (`idle` $\rightarrow$ `predicted` $\rightarrow$ `simulating` $\rightarrow$ `evaluated` $\rightarrow$ `completed`).
   - No backend, no database migrations, and no mock in-memory user stores.
3. **Location in Codebase:**
   - Component Module: `nextband/src/features/preposition-lab/`
   - Content Definitions: `nextband/src/features/preposition-lab/data/level-1.data.ts`
   - Types: `nextband/src/features/preposition-lab/types.ts`
4. **Architectural Conformance (AGENTS.md & Architecture Rules):**
   - Single-channel compliance: UI components do not query Supabase or Prisma directly.
   - Zero circular dependencies (DAG: UI $\rightarrow$ Hooks $\rightarrow$ Pure Data).

---

## 6. Observable Acceptance Criteria for the Prototype

The playable prototype must satisfy the following verifiable criteria:
1. **Flow Completeness:** A player can advance from Puzzle 1 through Puzzle 5 without page reloads or unhandled exceptions.
2. **Prediction Gating:** The "Test / Simulate" action is strictly disabled until the player selects a preposition candidate. No answer is revealed prior to the player's prediction.
3. **Cross-Platform Input:**
   - Desktop: Click-and-drag and button presses function with 0 lag.
   - Mobile: Touch events (touchstart/touchmove/touchend) correctly manipulate objects on touchscreens without unintended page scrolling.
4. **Deterministic Simulation:**
   - In Puzzle 2, moving the bowl *always* moves the banana along with the fruit pile.
   - In Puzzle 3, lifting the bowl *always* leaves the apple resting on the table.
   - In Puzzle 4, tilting the bowl *always* triggers the smoke escape animation; dropping it traps the smoke.
   - In Puzzle 5, moving the wood *always* moves the protruding nail.
5. **Accurate Contextual Feedback:** Feedback text explicitly explains the physical reason (*support*, *cover*, *trapping escape*, or *grip*) rather than displaying an uninformative "Correct" or "Incorrect" label.
6. **Bilingual Insight Availability:** The Vietnamese explanation is hidden by default and expands cleanly on demand without disrupting the English sentence focus.
7. **Brevity & Focus:** Each puzzle explanation is 35 words or fewer, readable in under 10 seconds.

---

## 7. Open Educational Questions for Human Review

Before coding begins, the following three pedagogical nuances should be confirmed by the human product lead:

1. **Puzzle 2 Preposition Naturalness:**
   - While Lindstromberg and Coventry et al. (1994) demonstrate that native speakers predominantly judge fruit above the rim as being *in* the bowl, some speakers accept *"on top of the bowl"* in informal casual speech.
   - *Question for Review:* Should we treat *"ON TOP OF"* as an acceptable distractor that triggers an explanatory note (*"Accurate observation of surface placement, but 'in the bowl' captures its role as part of the container's contents"*), or exclude *"ON TOP OF"* from the options to keep the contrast sharply focused on `IN` vs. `ABOVE`?
2. **Puzzle 4 Terminology for A2 Learners:**
   - In Puzzle 4 (Smoke), Lindstromberg uses the formulation *"smoke in a bowl"*.
   - *Question for Review:* Is the phrase *"There is smoke in the bowl"* sufficiently natural for A2 learners, or would *"The smoke is in the bowl"* be clearer to match the sentence structure of Puzzles 1–3?
3. **Level Completion Transition:**
   - After completing the transfer test (Puzzle 5: Nail in wood), should the prototype present a summary diagram of the **Containment vs. Cover** principle, or immediately offer a "Replay / Next Level Coming Soon" card?
