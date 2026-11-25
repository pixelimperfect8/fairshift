// Every word on the page lives here. Figures about PAGA come from the PRD's
// sources and need the client's legal review before launch.

export const site = {
  name: "FairShift",
  tagline: "The payday check-in for hourly teams",
  description:
    "FairShift texts every hourly employee three questions on payday, tells the owner what to fix, and keeps a dated record that the business asked, listened and fixed it. Built for California employers.",
  // TODO(client): replace with the real booking link or address
  demoUrl: "#demo",
  contactEmail: "hello@fairshift.example",
};

export const nav = [
  { label: "How it works", href: "#how" },
  { label: "The math", href: "#math" },
  { label: "Who it's for", href: "#who" },
  { label: "Pricing", href: "#pricing" },
  { label: "Questions", href: "#faq" },
];

export const hero = {
  title: ["Ask every employee,", "every payday."],
  body: "FairShift texts your hourly team three quick questions each pay period. You get one page telling you what to fix, and a dated record showing you asked, listened and fixed it.",
  primary: "Book a demo",
  secondary: "See how it works",
  notes: ["No download required", "Quick setup"],
  photo: "1776353744117-9e8595e8092c",
  photoAlt: "A cook plating food under warm lights in a dark restaurant kitchen",
  hint: "Try it: answer as Maria",
};

// The hero's live check-in. Yes is 1, no is 2, exactly as it works by text.
export const demo = {
  business: "Rosa's Kitchen",
  employee: "Maria",
  sender: "FairShift for Rosa's Kitchen",
  intro: "Hi Maria, it's payday at Rosa's Kitchen. 3 quick questions, totally optional, and your answers won't affect your pay.",
  questions: [
    {
      text: "Did you get all your meal and rest breaks this pay period? Reply 1 for Yes, 2 for No.",
      flagOn: 2,
      auto: 2,
      followUp: "Sorry about that. What happened? A text or a voice note is fine, and it's optional.",
      detail: "Worked a double on Saturday. No meal break.",
      flag: {
        title: "Missed meal break",
        where: "Midtown kitchen · 1 employee",
        step: "Pay one hour of premium pay and check Saturday's schedule for back-to-back doubles.",
        urgent: false,
      },
    },
    {
      text: "Does your check look right, including overtime? Reply 1 for Yes, 2 for No.",
      flagOn: 2,
      auto: 1,
      followUp: "Thanks for telling us. What looks off? Optional.",
      detail: "Overtime from last Sunday is missing.",
      flag: {
        title: "Paycheck looks wrong",
        where: "Midtown kitchen · 1 employee",
        step: "Compare last Sunday's timecard with the pay stub and correct any unpaid overtime this period.",
        urgent: false,
      },
    },
    {
      text: "Is there anything at work that feels unsafe right now? Reply 1 for Yes, 2 for No.",
      flagOn: 1,
      auto: 2,
      followUp: "Thank you for speaking up. What feels unsafe? Optional.",
      detail: "The walk-in freezer door sticks from the inside.",
      flag: {
        title: "Safety concern",
        where: "Midtown kitchen · sent to the owner within the hour",
        step: "Have the walk-in door latch checked today and tell the crew when it's done.",
        urgent: true,
      },
    },
  ],
  outro: "Thanks, Maria. That's all until next payday. Reply STOP anytime.",
  yes: "Yes",
  no: "No",
  report: {
    title: "Pay period report",
    period: "Nov 8 – Nov 21",
    answered: "Answered",
    roster: 42,
    base: 36,
    clean: "No flags this period",
    cleanBody: "Every answer came back clean. The check-in goes straight to the record.",
    waiting: "Waiting for answers",
    waitingBody: "Texts went out at 9:02 this morning.",
    next: "Suggested next step",
    markFixed: "Mark fixed",
    fixed: "Fix logged",
    saved: "Saved to record",
    replay: "Run it again",
  },
};

export const stats = {
  title: "The first honest conversation shouldn't be with a plaintiff's lawyer.",
  body: "You can really know about ten people. Past that you're guessing, and employees who are afraid for their jobs don't speak up. In California, the silence gets expensive.",
  items: [
    { value: 8846, prefix: "", suffix: "", label: "PAGA notices filed with the state in fiscal year 2024–25", source: "LWDA rulemaking data" },
    { value: 34, prefix: "~", suffix: "", label: "new notices every working day", source: "Ankura" },
    { value: 100, prefix: "$", suffix: "", label: "default penalty per employee, per pay period, for an initial violation", source: "PAGA default penalty" },
    { value: 15, prefix: "", suffix: "%", label: "cap on penalties for employers who took all reasonable steps before a notice", source: "2024 PAGA reform" },
  ],
  industries: "Healthcare, restaurants and retail receive the most notices.",
};

export const how = {
  title: "One loop, every pay period.",
  body: "A clean check-in goes straight to the record. A flag goes to you with a next step, and only counts as done once the fix is logged.",
  steps: [
    {
      key: "send",
      title: "A text on payday",
      body: "It arrives from a registered business number on payday or the morning after. It is clearly voluntary and clearly separate from the paycheck.",
    },
    {
      key: "answer",
      title: "Three quick answers",
      body: "Reply 1 for yes, 2 for no, or tap a link to answer on a web page. Breaks are asked every time. The other two questions rotate, so it never feels like an interrogation.",
    },
    {
      key: "flag",
      title: "A flag with a next step",
      body: "You don't get a sentiment score. You get a plain sentence saying what happened, where, and what to do about it.",
    },
    {
      key: "fix",
      title: "The fix gets logged",
      body: "Every flag is marked with the action taken, by whom and when. Open flags keep nagging until they're closed.",
    },
    {
      key: "record",
      title: "The record closes",
      body: "One click exports a PDF of every check-in, answer, flag and fix, with timestamps and consent records. Nothing in it can be quietly edited.",
    },
  ],
  send: {
    heading: "Payday send",
    date: "Friday, Nov 20",
    window: "Quiet hours respected",
    rows: [
      { name: "Maria G.", lang: "Español", status: "Answered", time: "9:04 AM" },
      { name: "Danh T.", lang: "Tiếng Việt", status: "Answered", time: "9:11 AM" },
      { name: "Joseph R.", lang: "English", status: "Delivered", time: "9:02 AM" },
      { name: "Liza M.", lang: "Tagalog", status: "Answered", time: "9:37 AM" },
      { name: "Wei C.", lang: "中文", status: "Delivered", time: "9:02 AM" },
    ],
  },
  bank: [
    { topic: "Breaks", q: "Did you get all your meal and rest breaks this pay period?", often: "Every check-in" },
    { topic: "Pay accuracy", q: "Does your check look right, including overtime?", often: "Every other" },
    { topic: "Safety", q: "Is there anything at work that feels unsafe right now?", often: "In rotation" },
    { topic: "Respect", q: "Has anyone at work treated you in a way that made you uncomfortable?", often: "In rotation" },
    { topic: "Workspace", q: "Is your work area clean and do you have what you need?", often: "In rotation" },
  ],
  flag: {
    chip: "Open flag",
    title: "Two kitchen staff at the Midtown location said they missed meal breaks this period.",
    next: "Pay one hour of premium pay each and check the schedule for back-to-back doubles.",
    meta: ["Midtown", "Kitchen", "Breaks"],
  },
  log: [
    { state: "fixed", title: "Missed meal breaks, Midtown kitchen", action: "Premium pay added to the Dec 4 check. Saturday doubles split.", by: "Rosa D.", when: "Nov 21, 4:12 PM" },
    { state: "fixed", title: "Overtime missing, front of house", action: "Timecard corrected and 3.5 hours paid.", by: "Rosa D.", when: "Nov 22, 10:40 AM" },
    { state: "open", title: "Walk-in door latch", action: "Repair booked for Monday. Reminder set.", by: "Open for 2 days", when: "Nov 23" },
  ],
  packet: {
    title: "Audit packet",
    file: "rosas-kitchen-2026-pay-period-23.pdf",
    lines: ["What was asked, and in which language", "Who answered, and when", "What was flagged", "What was done about it, and by whom", "Consent and opt-out records"],
    button: "Export PDF",
    stamp: "Record closed · Nov 23, 2026",
  },
};

export const math = {
  title: "The math is brutal. The reform rewards the careful.",
  body: "For cases filed since June 19, 2024, California caps PAGA penalties at 15% for employers who took all reasonable steps to comply before a notice arrived. The statute's own examples include running audits and acting on what you find.",
  employees: "Hourly employees",
  schedule: "Pay schedule",
  schedules: [
    { key: "weekly", label: "Weekly", periods: 52 },
    { key: "biweekly", label: "Every two weeks", periods: 26 },
    { key: "semimonthly", label: "Twice a month", periods: 24 },
    { key: "monthly", label: "Monthly", periods: 12 },
  ],
  rows: {
    exposure: "Default penalties for one violation type over one year",
    capped: "The same penalties under the 15% cap",
    cost: "A year of FairShift",
  },
  formula: "$100 × employees × pay periods",
  fine: "An illustration, not a prediction. Penalties depend on the facts, and a court decides whether the cap applies. FairShift does not give legal advice and no check-in guarantees an outcome.",
  takeaway: "A check-in every pay period, with a log of what got fixed, is a pay-period audit with receipts.",
};

export const features = {
  photo: { id: "1588416794236-0a08bd47e110", alt: "Cooks plating food on a dim kitchen line", line: "Built for the people on the line, and read in under a minute." },
  title: "Built to be read in a minute and acted on today.",
  items: [
    {
      key: "report",
      title: "One page, each pay period",
      body: "By text and email, with a link to a simple web view. Response rate, what got flagged, by location and manager.",
    },
    {
      key: "urgent",
      title: "Urgent alerts within the hour",
      body: "Safety, harassment, or anything with a legal clock. If a flag names a manager, it goes to the owner, not to that manager.",
    },
    {
      key: "languages",
      title: "Their language, your translation",
      body: "Employees answer in the language they speak. You read a translation, and the original is kept on the record.",
    },
    {
      key: "premium",
      title: "Who's owed an hour of pay",
      body: "When a break is missed, the report lists who is owed premium pay, so the fix can go on the next check.",
    },
    {
      key: "retaliation",
      title: "A warning before a mistake",
      body: "California presumes retaliation when discipline follows a complaint within 90 days. The report reminds you who has raised a flag.",
    },
    {
      key: "setup",
      title: "Zero setup",
      body: "Upload a roster and pick the pay schedule. Questions, languages, timing and escalation come preset for California and for your industry.",
    },
  ],
  greetings: [
    { lang: "English", text: "It's payday. 3 quick questions, totally optional." },
    { lang: "Español", text: "Hoy es día de pago. 3 preguntas rápidas, totalmente opcionales." },
    { lang: "中文", text: "今天是发薪日。3个简短的问题，完全自愿。" },
    { lang: "Tagalog", text: "Araw ng sahod ngayon. 3 mabilis na tanong, hindi sapilitan." },
    { lang: "Tiếng Việt", text: "Hôm nay là ngày lĩnh lương. 3 câu hỏi nhanh, hoàn toàn tự nguyện." },
    { lang: "한국어", text: "오늘은 급여일입니다. 간단한 질문 3개, 답변은 선택 사항입니다." },
  ],
  roster: ["Name", "Mobile", "Language", "Location", "Manager"],
};

export const who = {
  title: "Designed for the employee. Sold to the owner. Carried by the agent.",
  tabs: [
    {
      key: "owners",
      label: "Owners and managers",
      title: "Fewer surprises, and less time on people problems.",
      body: "No dashboard to learn. You read one page each pay period and mark issues fixed. Works for one taqueria or forty locations.",
      points: ["A report you can read in a minute", "A clear next step for every flag", "Alerts that skip the manager they name", "An export your defense lawyer will recognize"],
    },
    {
      key: "employees",
      label: "Hourly employees",
      title: "Heard, without risking the job.",
      body: "A text on payday, sixty seconds, in their language. Always optional, never tied to the paycheck, and STOP ends it for good.",
      points: ["No app and no login", "Reply 1 or 2, or leave a voice note", "Answers never change what they're paid", "HELP explains who is asking and why"],
    },
    {
      key: "agents",
      label: "Insurance agents",
      title: "A reason to call every client in your book.",
      body: "Sign up the businesses you already serve, see who has adopted it, and earn recurring income. You never see an employee's answers.",
      points: ["A one-page pitch and a demo account", "Adoption across your book at a glance", "Recurring income on the businesses you bring", "Employee answers stay with the employer, always"],
    },
    {
      key: "public",
      label: "Public agencies",
      title: "By the book, from the first text.",
      body: "A written pilot agreement through your own legal and procurement teams, a data review before launch, and a labor relations touchpoint where one is needed.",
      points: ["Voluntary and free of consequences", "No questions about unions or organizing, ever", "Encrypted, with role-based access", "A written retention policy before the first send"],
    },
  ],
};

export const promises = {
  title: "What FairShift will never do.",
  body: "This product sits on top of employment law, labor law and texting rules. The limits are part of the design.",
  items: [
    { title: "Tie an answer to a paycheck", body: "Same day, separate message, always optional. There is no “answer to get paid.”" },
    { title: "Claim an employee can't sue", body: "A clean answer is not a waiver. What you get is early warning and proof of reasonable steps." },
    { title: "Ask about unions or organizing", body: "Not once, in any language, for any customer." },
    { title: "Show answers to agents or law firms", body: "Employee answers are visible to the employer's own admins and nobody else." },
    { title: "Let the record be edited", body: "Every send, answer, edit and fix is timestamped and append-only." },
    { title: "Sell employee data", body: "Encrypted at rest and in transit, kept only as long as the written policy says." },
    { title: "Pretend to be the government", body: "FairShift is a private company. No seals, no agency language." },
    { title: "Give legal advice", body: "Next steps are operational, like “pay the premium” or “talk to the shift lead.”" },
  ],
};

export const pricing = {
  title: "Priced per employee, per pay period.",
  body: "Every plan includes the check-in, the report, the fix log and the audit packet. There is nothing to unlock.",
  plans: [
    {
      key: "small",
      name: "Small shop",
      range: "Under 20 employees",
      price: "$49",
      unit: "a month, flat",
      body: "One easy number for the smallest teams.",
      cta: "Book a demo",
      featured: false,
    },
    {
      key: "standard",
      name: "Standard",
      range: "20 to 249 employees",
      price: "$2.83",
      unit: "per employee, per pay period",
      body: "About $73.58 a year for each employee paid every two weeks.",
      cta: "Book a demo",
      featured: true,
    },
    {
      key: "large",
      name: "Large and public",
      range: "250 employees and up",
      price: "Volume",
      unit: "priced together",
      body: "For multi-location employers, public agencies and union workplaces.",
      cta: "Talk to us",
      featured: false,
    },
  ],
  included: ["Payday texts in the employee's language", "One-page report each pay period", "Urgent alerts within the hour", "Fix log with reminders", "Audit packet export", "Roster upload by spreadsheet"],
  note: "W-2 employees only. Available in California first.",
};

export const faq = {
  title: "Straight answers.",
  body: "If yours isn't here, ask us. A person replies.",
  cta: "Contact us",
  items: [
    {
      q: "If an employee says everything is fine, can they still sue?",
      a: "Yes. A clean answer is not a waiver and we will never sell it as one. The value is catching problems early, fixing them, and having a dated record that you did. That is the behavior California's 2024 PAGA reform rewards.",
    },
    {
      q: "Is this legal advice?",
      a: "No. FairShift suggests operational next steps, such as paying a missed-break premium or talking to a shift lead. It never draws legal conclusions. For those, talk to an employment lawyer.",
    },
    {
      q: "Do employees have to answer?",
      a: "No. Every check-in is voluntary, it is separate from the paycheck, and answering or not answering never affects pay. Replying STOP opts out at any time.",
    },
    {
      q: "Do they need an app?",
      a: "No. It's a text message. They reply 1 or 2, or tap a link to answer on a web page. There is nothing to download and nothing to log in to.",
    },
    {
      q: "Which languages does it work in?",
      a: "Most spoken languages. If an employee replies in another language, the conversation continues in that language. Compliance questions are reviewed by native speakers, starting with Spanish, Chinese, Tagalog, Vietnamese and Korean.",
    },
    {
      q: "Who can see what an employee wrote?",
      a: "The employer's own admins. If a flag names a manager, it is routed to the owner instead of that manager. Insurance agents and partner firms never see answers.",
    },
    {
      q: "Does it work with my payroll?",
      a: "Yes, with any of them. You upload a roster as a spreadsheet and pick your pay schedule: weekly, every two weeks, twice a month or monthly. Direct payroll connections are on the way, and they are read-only.",
    },
    {
      q: "What happens once I know about a problem?",
      a: "You need to act on it, and FairShift is built around that. Every flag stays open, with reminders, until a fix is logged. Asking and then ignoring the answer is worse than never asking.",
    },
    {
      q: "Can I use it for contractors?",
      a: "Not today. FairShift is for W-2 employees only.",
    },
  ],
};

export const closing = {
  title: "See a check-in land on a real phone.",
  body: "A demo takes about five minutes. We'll text you the three questions, then show you the report and the record they produce.",
  primary: "Book a demo",
  secondary: "Email us",
  ledger: [
    "Check-in sent · 9:02 AM",
    "Answered in Español · 9:04 AM",
    "Flag opened: missed meal break · 9:05 AM",
    "Owner notified · 9:05 AM",
    "Premium pay added · 4:12 PM",
    "Fix logged by Rosa D. · 4:12 PM",
    "Saved to record · 4:12 PM",
  ],
};

export const footer = {
  blurb: "The payday check-in for hourly teams. California first.",
  columns: [
    { title: "Product", links: [{ label: "How it works", href: "#how" }, { label: "The math", href: "#math" }, { label: "Pricing", href: "#pricing" }] },
    { title: "For", links: [{ label: "Owners and managers", href: "#who" }, { label: "Insurance agents", href: "#who" }, { label: "Public agencies", href: "#who" }] },
    { title: "Company", links: [{ label: "Questions", href: "#faq" }, { label: "Book a demo", href: "#demo" }] },
  ],
  legal: "FairShift is a private company. It is not a government agency and is not affiliated with any state office. Nothing on this site is legal advice, and using FairShift does not guarantee any legal outcome.",
  sources: "Figures: LWDA rulemaking data (FY 2024–25), Ankura PAGA trend update, and California's PAGA statute as amended in 2024.",
};

// ------------------------------------------------------------------
// Version two (/v2): the cinematic, people-first page. It reuses the
// stats, math, audiences, promises, pricing and questions from above.
// Photographs are free-licence stock placeholders (Unsplash ids).
// ------------------------------------------------------------------
export const v2 = {
  hero: {
    photo: "1776353744117-9e8595e8092c",
    alt: "A cook plating food under warm lights in a dark restaurant kitchen",
    caption: "Friday night. Payday at Rosa's Kitchen.",
    title: ["Your team has something", "to tell you."],
    body: "FairShift asks for you. Three questions by text, every payday. You get one page telling you what to fix, and a dated record showing you asked, listened and fixed it.",
    primary: "Book a demo",
    secondary: "See how it works",
  },
  statement: "You can really know about ten people. Past that, you're guessing. And the first honest conversation shouldn't be with a plaintiff's lawyer.",
  scenes: {
    title: "Three questions. Sixty seconds. Every payday.",
    items: [
      {
        photo: "1651977560788-98792cd34da0",
        alt: "A line cook working at a busy restaurant counter",
        who: "Line cook, Midtown",
        topic: "Breaks",
        q: "Did you get all your meal and rest breaks this pay period?",
        a: "No. I worked a double on Saturday.",
        flag: true,
      },
      {
        photo: "1637652918719-a32a2c187b9b",
        alt: "A cook in a cap preparing food at a restaurant counter",
        who: "Prep cook",
        topic: "Pay",
        q: "Does your check look right, including overtime?",
        a: "Yes.",
        flag: false,
      },
      {
        photo: "1576704546872-8d647cd96f8d",
        alt: "A cook working over steam in a busy open kitchen",
        who: "Line cook",
        topic: "Safety",
        q: "Is there anything at work that feels unsafe right now?",
        a: "No.",
        flag: false,
      },
    ],
  },
  rows: {
    title: "What happens after they answer.",
    items: [
      {
        photo: "1622021142947-da7dedc7c39a",
        alt: "A chef chopping vegetables in a restaurant kitchen",
        title: "They answer in their own words",
        body: "A text arrives on payday from a registered business number. They reply 1 or 2, or leave a voice note, in the language they speak. It is always optional and never tied to the paycheck.",
        overlay: "text",
      },
      {
        photo: "1790750541233-3481ce66fbb9",
        alt: "A woman in an apron standing in her cafe",
        title: "You get one page, not a dashboard",
        body: "No sentiment scores. A plain sentence saying what happened, where, and what to do about it. If a flag names a manager, it goes to you instead of to them.",
        overlay: "flag",
      },
      {
        photo: "1765896387387-0538bc9f997e",
        alt: "A care worker smiling with an elderly resident",
        title: "The fix goes on the record",
        body: "Every flag is marked with the action taken, by whom and when. One click exports a dated packet of every check-in, answer, flag and fix. Nothing in it can be quietly edited.",
        overlay: "stamp",
      },
    ],
  },
  industries: {
    title: "For the people who work on their feet.",
    body: "Healthcare, restaurants and retail receive the most PAGA notices in California. They are also where an owner is least likely to hear about a problem in time.",
    items: [
      { photo: "1765448856922-b97fce59d270", alt: "A cook at the stove in a dim kitchen", name: "Restaurants" },
      { photo: "1753354868577-39c8302a1a2b", alt: "A grocery worker stocking shelves", name: "Retail" },
      { photo: "1765896387398-1e1ae8d2eb85", alt: "A care worker leaning toward an elderly resident", name: "Care" },
    ],
  },
  closing: {
    photo: "1658042250027-7cd4f325742b",
    alt: "Staff working behind a restaurant counter in warm evening light",
    title: "Ask before someone else does.",
    body: "A demo takes about five minutes. We'll text you the three questions, then show you the report and the record they produce.",
    primary: "Book a demo",
    secondary: "Email us",
  },
};

// v2: the loop, told in four hairline drawings
export const loop = {
  title: "One loop, closed every pay period.",
  body: "A clean check-in goes straight to the record. A flag goes to you with a next step, and only counts as done once the fix is logged.",
  steps: [
    { key: "text", title: "A text on payday", body: "From a registered business number. Voluntary, and separate from the paycheck." },
    { key: "answer", title: "Three quick answers", body: "Reply 1 or 2. Breaks are asked every time, and two more questions rotate." },
    { key: "fix", title: "A flag, then a fix", body: "You get a plain sentence and a next step. Open flags stay open until you act." },
    { key: "record", title: "The record closes", body: "Every send, answer and fix is timestamped, append-only and ready to export." },
  ],
};

// v2, third pass: layouts drawn from the reference sites
export const v3 = {
  hero: {
    bright: "Your team has something to tell you.",
    dim: "FairShift asks for you, every payday.",
    body: "Three questions by text. One page telling you what to fix. A dated record showing you asked, listened and fixed it.",
  },
  statement: {
    bright: "You can really know about ten people. Past that, you're guessing.",
    dim: "And the first honest conversation shouldn't be with a plaintiff's lawyer.",
  },
  loop: {
    title: "One loop, closed every pay period.",
    steps: [
      { key: "phone", lead: "A text", rest: "on payday, from a registered business number.", body: "It is clearly voluntary and clearly separate from the paycheck. No app, no login, nothing to download." },
      { key: "riffle", lead: "Three answers", rest: "in under a minute, in their language.", body: "Reply 1 for yes, 2 for no. Breaks are asked every time, and two more questions rotate so it never feels like an interrogation." },
      { key: "settle", lead: "A flag", rest: "arrives with a next step, and gets fixed.", body: "You get a plain sentence saying what happened, where, and what to do. Open flags keep nagging until the fix is logged." },
      { key: "vault", lead: "The record", rest: "closes, dated and locked.", body: "Every send, answer and fix is timestamped and append-only. One click exports the packet as a PDF." },
    ],
  },
  gets: {
    title: "Everything the owner gets.",
    items: [
      { title: "The report", rows: [["Each pay period", "One page, by text and email"], ["Shows", "Response rate and flags, by location and manager"], ["Next step", "A plain sentence for every flag"]] },
      { title: "Urgent alerts", rows: [["Within the hour", "Safety, harassment, or anything with a legal clock"], ["Routing", "A flag that names a manager goes to the owner instead"]] },
      { title: "Languages", rows: [["Texts", "Sent in the language each employee speaks"], ["Replies", "Translated for you, with the original kept"], ["Reviewed first", "Spanish, Chinese, Tagalog, Vietnamese and Korean"]] },
      { title: "The fix log", rows: [["Each flag", "Action taken, by whom and when"], ["Reminders", "Open flags nag until they are closed"], ["Premium pay", "Lists who is owed an hour for a missed break"]] },
      { title: "The audit packet", rows: [["Export", "One click, as a PDF"], ["Contains", "Every check-in, answer, flag and fix, with timestamps"], ["Integrity", "Append-only, so nothing can be quietly edited"]] },
      { title: "Setup", rows: [["Roster", "Upload a spreadsheet"], ["Schedule", "Weekly, every two weeks, twice a month or monthly"], ["Presets", "Questions, timing and escalation for California"]] },
    ],
  },
  stat: {
    bright: "8,846 PAGA notices were filed in California last year.",
    dim: "About 34 every working day.",
    rest: [2, 3],
  },
  trades: {
    title: "For the people who work on their feet.",
    items: [
      { photo: "1651981038189-e71e557f5869", alt: "A cook tossing pizza dough in a restaurant kitchen", name: "Pizza" },
      { photo: "1565724088606-95acf1e8ff14", alt: "A sushi chef preparing rolls at the counter", name: "Sushi bar" },
      { photo: "1719329468651-5e7c51ec94e5", alt: "Cooks preparing food along a wooden counter", name: "Counter" },
      { photo: "1588416794236-0a08bd47e110", alt: "Cooks plating food on a dim kitchen line", name: "The line" },
      { photo: "1585303078739-d305be21b919", alt: "A cook at the pass in an open kitchen", name: "The pass" },
      { photo: "1723598132309-c8f1ed6e0064", alt: "A cook working at the stove in low light", name: "Grill" },
      { photo: "1538128844159-f08f41bfb169", alt: "A cook prepping at a crowded kitchen station", name: "Prep" },
    ],
  },
  closing: { bright: "Ask before", dim: "someone else does." },
};

// v1: the people being asked, shown beside what their answer becomes in the product
export const people = {
  title: "Three questions, asked of the people you can't always check on.",
  body: "Each answer is a text from someone on your floor. A clean one goes straight to the record. A flag reaches you with a next step.",
  items: [
    {
      photo: "1651977560788-98792cd34da0",
      alt: "A line cook working at a busy restaurant counter",
      q: "Did you get all your meal and rest breaks this pay period?",
      a: "No. I worked a double on Saturday.",
      chip: { kind: "flag", title: "Missed meal break", body: "Pay one hour of premium pay and check Saturday for back-to-back doubles." },
    },
    {
      photo: "1637652918719-a32a2c187b9b",
      alt: "A cook in a cap preparing food at a restaurant counter",
      q: "Does your check look right, including overtime?",
      a: "Yes.",
      chip: { kind: "clean", title: "Saved to record", body: "Nov 21, 9:04 AM" },
    },
    {
      photo: "1576704546872-8d647cd96f8d",
      alt: "A cook working over steam in a busy open kitchen",
      q: "Is there anything at work that feels unsafe right now?",
      a: "Yes. The walk-in door sticks from the inside.",
      chip: { kind: "urgent", title: "Safety concern", body: "Sent to the owner within the hour." },
    },
  ],
};
