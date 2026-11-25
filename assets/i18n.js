/*
 * 2human website: every word on the public pages. English only. The home page copy is the 25 Nov 2026 positioning
 * (martech, web and apps as the means; an organization that sees, decides, acts and learns as the end); the Agentic
 * e-commerce page, the 404 page and the contact form's questions are verbatim from the Lovable site. The page templates are
 * in render.js; the hub's Website pages read this file (tools/hub/build-website-data.mjs). Inline markup in a value
 * (<b>, <span>) is written as {{key}} placeholders that render.js fills, so the words stay plain text here.
 */
(function (root) {
  root.TWOHUMAN_I18N = {
    en: {
      meta: {
        title: "2human · Martech, websites and apps that work together",
        description: "2human builds and runs the marketing tools, websites and apps that help organizations see what is working, decide what to do next and get it done, without the usual delays.",
        author: "2human",
        ogImage: "https://lovable.dev/opengraph-image-p98pqg.png",
        twitterSite: "@2human"
      },
      nav: {
        brand: "2human",
        items: [
          { label: "How it works", id: "approach" },
          { label: "What we build", id: "build" },
          { label: "How we work", id: "how" },
          { label: "Who we work with", id: "who" },
          { label: "Team", id: "team" }
        ],
        cta: "Start a conversation"
      },
      hero: {
        eyebrow: "Martech · Web · Apps",
        title: "See what works. Act on it faster.",
        accent: "faster",
        lead: "2human builds and runs the marketing tools, websites and apps that help organizations find out what their customers value, deliver it, and build what works into how they operate.",
        primary: "Start a conversation",
        secondary: "How it works",
        loop: ["Discovery", "Delivery", "Validation", "Integration"],
        loopLabel: "way of work"
      },
      end: {
        eyebrow: "Why we do this",
        title: "Most teams don't lack tools. They lack a simple way to see what is working and act on it quickly.",
        text: "We set up and run the pieces, from the website to the CRM to the reports, so that this becomes the normal way of working, not something that depends on people staying late."
      },
      loop: {
        eyebrow: "How it works",
        title: "Four tracks, running side by side.",
        lead: "Not phases, one after another. All four run for as long as we work together, and every round starts from what the last one taught us.",
        steps: [
          { name: "Discovery", line: "Start from what you already know.", items: ["An honest look at what you have: site, campaigns, data", "What you know about your customers, and what you are still guessing", "Each round begins with what the last one taught us"] },
          { name: "Delivery", line: "Build what reaches people.", items: ["Websites, campaigns, emails and tools, built and launched", "Measurement built in from the first day", "Changes made in hours, not weeks"] },
          { name: "Validation", line: "Let your audience decide.", items: ["What visitors and customers actually do, measured", "What they tell you, collected", "Clear calls on what to keep and what to drop"] },
          { name: "Integration", line: "Keep what works.", items: ["What proves itself becomes part of your site, sales and service", "What does not is retired, not carried along", "Each round leaves you a little stronger"] }
        ]
      },
      build: {
        eyebrow: "What we build",
        title: "Martech, websites and apps.",
        lead: "We work across all three, so they work together instead of side by side.",
        items: [
          { name: "Martech", line: "Reach the right people, and know it worked.", text: "Analytics, CRM, email, ads and social media, set up properly and kept running, with reports that show what each effort brings in.", items: ["Analytics and tracking", "CRM set-up and clean-up", "Ads, email and social campaigns", "Simple, regular reports"] },
          { name: "Web", line: "Where people decide to get in touch.", text: "Fast, clear websites and landing pages that are easy to change, built on technology you own.", items: ["Websites and landing pages", "Moving off website builders", "Testing what turns visitors into enquiries", "Easy to find, good to share"] },
          { name: "Apps", line: "Less manual work, everything in one place.", text: "Team hubs, internal tools and assistants that take care of routine work and keep information where everyone can find it.", items: ["Team and client hubs", "Internal tools", "Assistants for routine work", "Connecting the tools you already use"] }
        ]
      },
      how: {
        eyebrow: "How we work",
        title: "Simple, steady, and yours.",
        items: [
          { name: "Proven building blocks", text: "Every project starts from what already works elsewhere, so you see results sooner and pay less." },
          { name: "Smart tools, human judgement", text: "We use AI to do more in less time. A person checks and approves everything before it goes live." },
          { name: "Everything stays yours", text: "Your website, data and accounts belong to you. No lock-in, to a platform or to us." },
          { name: "Your team, stronger", text: "We work alongside your people and leave clear notes, so you can keep going without us." }
        ]
      },
      who: {
        eyebrow: "Who we work with",
        title: "Agencies, businesses and causes.",
        items: [
          { name: "Agencies", text: "We work behind the scenes for agencies: building sites, running campaigns and setting up CRMs under their name, while they look after their clients." },
          { name: "Businesses", text: "Growing teams with too many tools and spreadsheets, who want marketing, website and operations to work together." },
          { name: "Civic and community", text: "Movements, institutions and communities that need to reach people and organise well, on a tight budget." }
        ]
      },
      team: {
        title: "Who we are",
        eyebrow: "Team",
        lead: "2human is founded and run by Miloš Milosavljević, with more than twenty years in product, communication and helping organizations change.",
        linkedin: "LinkedIn",
        website: "Website",
        founders: [
          {
            name: "Miloš Milosavljević",
            role: "Digital Strategist and Product Leader",
            photo: "milos-milosavljevic.png",
            linkedinUrl: "https://www.linkedin.com/in/milosmilosavljevic/",
            websiteUrl: "",
            description: "20+ years of experience across journalism, media, non-profit, SaaS, HR tech, and B2B. He has helped design and scale platforms, products, and campaigns that require both narrative precision and solid technical thinking, while keeping teams aligned on clear intent and measurable outcomes. Clients value Miloš for three things: a systems mindset that connects architecture, product, communications, and user/customer experience; an ability to translate complex ideas into clear, resonant language; and a mentoring style that develops people as much as it delivers projects. At 2human, he anchors the work in continuous discovery, crisp positioning, and go-to-market clarity, ensuring learning travels from market signals to product decisions and execution. In 2025, he co-founded (with others) Odvaž, contributing to learning spaces and civic initiatives that keep his practice grounded in real-world systems."
          }
        ]
      },
      faq: {
        eyebrow: "Questions",
        title: "Questions we often hear",
        items: [
          { question: "Do you work with agencies?", answer: "Yes. Much of our work is for agencies, under their name. They keep the client relationship, and we make sure the work gets done well." },
          { question: "Who owns what you build?", answer: "You do. The website, the data and the accounts are yours, and we leave everything documented." },
          { question: "Do you use AI?", answer: "Yes, to work faster and keep costs down. A person reviews everything before it reaches your customers." },
          { question: "Where do we start?", answer: "With an honest look at what you already have: your website, campaigns, data and the way you talk to customers. We keep what works, fix what causes the most trouble first, and build from there." }
        ]
      },
      contact: {
        title: "What would you like to work better?",
        lead: "Tell us a little about where you are and what you would like to change. We will reply with a suggestion for the first step.",
        eyebrow: "Contact",
        start: "Start a conversation",
        submit: "Send",
        responseTime: "We typically respond within 24 hours.",
        questions: [
          { name: "context_on_mind", label: "What's on your mind right now?", placeholder: "Share what's happening in your workplace or organization..." },
          { name: "context_desired_outcome", label: "What would you like to have happen?", placeholder: "Describe your ideal outcome..." }
        ],
        typeHere: "Type here.",
        detailsTitle: "One last thing",
        detailsLead: "Where should we reach you to continue this conversation?",
        fields: [
          { name: "first_name", label: "First Name", type: "text", required: true },
          { name: "last_name", label: "Last Name", type: "text", required: true },
          { name: "organization", label: "Organization", type: "text", required: false },
          { name: "email", label: "Email", type: "email", required: true }
        ],
        // the CRM inbox only accepts a submission with the visitor's consent (firebase/firestore.rules validInbox)
        consent: "I agree that 2human stores these details to answer my enquiry, as described in the {{privacy}}.",
        privacy: "privacy policy",
        privacyUrl: "/privacy",
        step: "Step {n} of {total}",
        exit: "Exit form",
        back: "Back",
        next: "Continue",
        submitting: "Submitting...",
        required: "{label} is required",
        invalidEmail: "Please enter a valid email address",
        thanks: "Thank you",
        success: "Thank you for reaching out!",
        failedTitle: "Submission failed",
        failedText: "There was an error submitting your request. Please try again."
      },
      footer: { brand: "2human", copyright: "© {year} 2human" },
      notFound: { code: "404", text: "Oops! Page not found", home: "Return to Home" },
      agentic: {
        hero: {
          badge: "Agentic Commerce Readiness",
          title: "Is your e-commerce ready for {{accent}}",
          accent: "AI agents that buy?",
          lead: "Only 0.1% of e-commerce stores are prepared for the shift to agentic commerce. We help you become one of them, using the same learning-first approach that drives everything we do.",
          primary: "Assess Your Readiness",
          secondary: "Learn How We Help"
        },
        shift: {
          eyebrow: "The Shift Is Here",
          title: "AI agents don't assist shopping anymore. They complete it.",
          p1: "In January 2026, Google launched the {{ucp}} — an open standard that allows AI systems to connect directly to a retailer's backend and complete transactions without sending users to a website.",
          ucp: "Universal Commerce Protocol (UCP)",
          p2: "Walmart, Target, Shopify, Visa, Mastercard, and dozens more have already signed on. This isn't a fringe experiment. It's industry consensus.",
          stats: [
            { stat: "0.1%", label: "of e-commerce stores are UCP-ready today" },
            { stat: "700%", label: "YoY growth in conversational shopping traffic (Etsy)" },
            { stat: "2026", label: "Native checkout via UCP rolling out globally" }
          ]
        },
        means: {
          eyebrow: "What This Means For You",
          title: "If you're not agent-ready, you become invisible.",
          lead: "When an AI agent can complete a purchase from your competitor but not from you, market share migrates without an obvious cliff. It just... happens.",
          items: [
            { title: "Checkout Without Clicks", description: "AI agents browse inventory, check variants, apply discounts, and initiate payment — all without redirecting the user." },
            { title: "Real-Time Everything", description: "Inventory accuracy, deterministic pricing, shipping timelines — agents need reliable data to complete transactions." },
            { title: "New Security Models", description: "Non-human actors executing payments require fraud controls that don't block legitimate agent traffic." },
            { title: "Visibility = Conversion", description: "In agentic commerce, appearing in AI results and completing the sale are the same question." }
          ]
        },
        approach: {
          eyebrow: "Our Approach",
          title: "How we help you become agent-ready",
          lead: "The same learning-first process we use for product strategy, applied to the specific challenge of agentic commerce readiness.",
          steps: [
            { title: "Diagnose your current state", description: "We deploy simulated AI shopping agents against your store to understand where carts break, checkout fails, or agents can't complete purchases." },
            { title: "Map the gaps", description: "Real-time inventory accuracy? Deterministic pricing? Bot-friendly authentication? We identify exactly what's blocking agent-driven conversion." },
            { title: "Design the path forward", description: "We help you prioritize fixes, design UCP-compatible flows, and plan integration with your existing commerce stack." },
            { title: "Build the capability", description: "We work alongside your team to implement changes, test with real agent traffic, and leave you with the ability to evolve as the protocol matures." }
          ]
        },
        readiness: {
          eyebrow: "Quick Assessment",
          title: "Agent-readiness isn't a checkbox. It's a system.",
          question: "Can you answer \"yes\" to all of these?",
          items: [
            "Real-time inventory accuracy across all channels",
            "Pricing that doesn't change between browse and checkout",
            "Payment handlers that work with non-human actors",
            "Clear, machine-readable shipping commitments",
            "Discount and loyalty logic that works without human input",
            "Bot controls that don't block legitimate AI agents"
          ],
          note: "Most commerce stacks have never been tested this way. That's where we come in."
        }
      }
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
