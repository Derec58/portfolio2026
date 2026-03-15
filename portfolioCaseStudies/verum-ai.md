# Verum AI
## Candidate Match: Verum AI

Building an AI-powered platform to identify bias and misinformation in political speeches and text, and putting it in the hands of everyday voters.

---

**Timeline:** Aug. – Oct. 2022
**Team:** Dereck Villagrana (UX/Front-end Design), Akshat Jain (Back-end), Megan Leong (Back-end), Marco Paredes (Back-end)
**Tools:** Figma, React, Python, JavaScript, Vercel, GPT-3.5 Turbo
**Disciplines:** UX Design, Artificial Intelligence, Machine Learning, Data Analytics
**Project Type:** Designer-Developer Collaboration
**Award:** 2nd Place, All Inclusive Hacks (663 participants, $905,957 in prizes)

**Links:** Live Website · Devpost Article · GitHub Repo
**YouTube Demo:** youtube.com/watch?v=qoUohsBjUeE

---

### Overview

Verum.AI is a platform designed to empower informed democracy by leveraging advanced AI to cut through bias, inconsistency, and misinformation in political messages. Built during All Inclusive Hacks, a virtual student-led hackathon focused on web disability access, bias detection, and inclusion through computational linguistics and AI, Verum brought together designers and developers from UC Davis and UC San Diego across a six-week sprint.

The result was a chatbot capable of analyzing political speeches and text for bias and misinformation using GPT-3.5 Turbo, earning 2nd place out of 663 participants worldwide.

---

### The Problem

Most Americans can't reliably tell political fact from fiction, and the tools that exist weren't built for them.

A December 2022 national survey of nearly 25,000 Americans found that only **8%** could correctly identify all false political claims shown to them. **41%** believed at least one false claim outright, and about half expressed uncertainty about their ability to spot misinformation at all. Meanwhile, **14%** admitted to actively sharing political information they suspected was false.

The trust problem runs just as deep. By 2022, only about **30% of Americans** said they trusted mass media, and **47%** said their trust had declined compared to the year prior. With roughly **half of U.S. adults** getting political news from social media, and only a small fraction able to consistently recognize false claims, the gap between information consumed and information understood was growing.

Existing AI tools weren't closing that gap. Systems like ClaimBuster, Newtral ClaimHunter, and Full Fact AI were powerful. Full Fact's pipeline processed around 500,000 claims per day. But they were built for journalists and professional fact-checkers, not ordinary voters. They surfaced "check-worthy" claims without providing user-friendly explanations, holistic bias breakdowns across a full document, or any kind of interactive interface a voter could just open and use.

**Problem Statement:** Voters need a tool that translates AI's ability to detect bias and misinformation into an accessible, conversational experience, one that doesn't require a journalism background to use.

---

### The Mission

Empower voters with a steadfast tool that cuts through bias, inconsistency, and misinformation. By leveraging advanced AI, guide users toward confident, well-informed voting decisions, promoting a more transparent and engaged democratic process.

---

### The Hackathon Context

All Inclusive Hacks was a virtual student-led competition focused on developing creative solutions to detect bias, increase accessibility, and increase inclusivity on the web using computational technologies, including large language models like BERT and GPT-4. Open to all ages 13+ regardless of programming experience, the event drew 663 participants globally with $905,957 in prizes awarded as software and educational resources.

Participants could compete in two tracks:
- **Hackathon:** coded, working projects
- **Ideathon:** no-code designs and proposals

Verum competed in the Hackathon track and placed 2nd overall.

---

### What It Does

Verum offers a chatbot that helps individuals examine political speeches and texts. Users can:

- Paste a link to a transcript or article
- Select from a library of pre-loaded transcripts
- Input their own text directly

After submitting, the tool forwards the content to GPT-3.5 Turbo for a comprehensive bias assessment. It detects bias and false information, offers explanatory interpretations of flagged content, and presents analytics showing the percentage and count of biased statements detected across the document.

Where existing tools routed content to human fact-checkers behind the scenes, Verum puts the analysis directly in the voter's hands, in plain language, on demand.

---

### The Story

Verum came together through serendipity and shared ambition. We brought together designers and developers from UC Davis and UC San Diego, forging connections both professionally and personally.

I led all front-end design and UX, while Akshat Jain, Marco Paredes, and Megan Leong built the back-end infrastructure. Our shared goal: an AI solution that doesn't just detect bias but keeps the voter at the center of the experience.

---

### Technical Challenges

**Text and Web Content Analysis**
Enabling analysis of both plain text and live web content required integrating an external API for text extraction from websites, with AWS Lambda orchestrating the pipeline.

**GPT-3.5 Turbo Integration**
Managing prompt input meant dynamically summarizing text to fit within prompt limits while preserving the full context and intent of the original document. Getting the model to return structured, readable bias analytics rather than a wall of text took significant prompt engineering.

**Async Optimization**
We tackled API call optimization and asynchronous process handling throughout, ultimately landing on a system robust enough to analyze both text and web content at scale.

**Tech Stack**
- AWS Lambda + API Gateway
- GPT-3.5 Turbo / OpenAI API
- Extractor API / X-RapidAPI
- Next.js / React / JavaScript
- Python
- Vercel

---

### What's Next for Verum

Building out the platform ahead of the next election cycle, boosting voter trust and cultivating a more knowledgeable society as more politicians voice their perspectives.

---

### Reflection

Building Verum in six weeks forced me to confront a design challenge I hadn't fully anticipated: how do you make a politically sensitive AI tool feel trustworthy, not just functional?

The statistics we found during research made the need undeniable. Only 8% of Americans could correctly identify all false political claims in a national survey. Half weren't even confident they could try. But knowing a problem is real and knowing how to design for it are different things. People don't distrust political content because they lack access to information. They distrust it because they can't tell what's reliable. Building another tool that just produces more output isn't a solution. The UX had to do real work: making the analysis feel legible, neutral, and earned.

That shaped every front-end decision I made. The interface had to feel credible without feeling preachy. The bias breakdown had to be specific enough to be useful without overwhelming someone who just wanted to understand a speech they'd heard. Working with GPT-3.5 Turbo meant the output could vary, and designing around that variability, presenting percentages and annotated statements in a way that felt consistent and readable regardless of what the model returned, was one of the more interesting problems I've worked on.

The cross-school collaboration was equally formative. Designing for a back-end I didn't build and communicating UI constraints and requirements to developers I'd just met taught me how much good handoff matters. I learned to ask better questions earlier: What does the API actually return? What breaks the layout? What's the latency we're designing around?

If I had more time, I'd focus on the experience around uncertainty. When the model flags a statement as biased, a voter's natural next question is why. While Verum provides explanations, I'd want to go further. Letting users push back, ask follow-ups, or explore a claim from multiple angles would move the product from a bias detector to something closer to a thinking partner. That's the version I'd want to exist before the next election.
