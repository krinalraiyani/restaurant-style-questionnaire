/* Questionnaire content shared by the client page (index.html) and the admin page (admin.html). */

/**
 * @typedef {{value: string, note: string, image: string, width: number, height: number}} StyleOption
 * @typedef {{id: string, title: string, hint: string, options: StyleOption[]}} StyleQuestion
 * @typedef {{id: string, title: string, label: string, maxPicks: number | null, options: string[]}} ChoiceQuestion
 *   maxPicks: 1 = pick one, 2+ = pick up to that many, null = pick all that apply
 * @typedef {{id: string, label: string, text: string}} TextQuestion
 * @typedef {{picks: Record<string, string>, choices: Record<string, string[]>, yesno: Record<string, string>, text: Record<string, string>, name: string, email: string}} Answers
 */

/** @type {StyleQuestion[]} */
const STYLE_QUESTIONS = [
  { id: "page", title: "Sample web page", hint: "Which page feels more like your restaurant?",
    options: [
      { value: "Simple and clean", note: "Only what matters", image: "images/Q8-1-Simple-and-clean.jpg", width: 1600, height: 1217 },
      { value: "Busy and detailed", note: "Lively, lots going on", image: "images/Q8-2-Busy-and-detailed.jpg", width: 1600, height: 1217 } ] },
];

/** @type {ChoiceQuestion[]} */
const CHOICE_QUESTIONS = [
  { id: "customer", label: "Main customer", title: "Who is your main customer?", maxPicks: 2,
    options: ["Families with kids", "Young people / students (18-30)", "Couples / date-night diners", "Office workers and tourists / mixed locals"] },
  { id: "age", label: "Most important age group", title: "Which age group matters most to you?", maxPicks: 1,
    options: ["Under 18 (kids and teens)", "18-30 years", "31-50 years", "50+ years"] },
  { id: "busy", label: "Busiest time", title: "When do you expect the busiest crowds?", maxPicks: 1,
    options: ["Weekday lunch", "Weekday dinner", "Weekend brunch / lunch", "Weekend dinner"] },
  { id: "bookings", label: "Bookings to attract", title: "Which kind of bookings do you want to attract?", maxPicks: null,
    options: ["Small tables (1-4 people)", "Large groups (8+ people)", "Birthdays / parties / private events", "Kids-friendly family bookings"] },
  { id: "device", label: "Main device", title: "Will customers mostly visit the website on:", maxPicks: 1,
    options: ["Mobile phone", "Tablet", "Desktop / laptop", "Not sure, equal mix"] },
  { id: "gallery", label: "Gallery", title: "What should the gallery show?", maxPicks: 1,
    options: ["Photos only", "Photos and video"] },
];

/** How many options a client may pick, as an instruction. */
function choiceHint(/** @type {ChoiceQuestion} */ q) {
  if (q.maxPicks === 1) return "Choose one.";
  if (q.maxPicks === null) return "Choose all that apply.";
  return `Choose up to ${q.maxPicks}.`;
}

/** Picked options of a choice question as one line, e.g. "Weekday lunch, Weekend dinner". */
function choiceText(/** @type {string[] | undefined} */ picked) {
  return (picked ?? []).join(", ");
}

/** @type {TextQuestion[]} */
const YES_NO_QUESTIONS = [
  { id: "story", label: "Story page", text: "Do you want a page that tells the story of your restaurant?" },
  { id: "photos", label: "Has photos and videos", text: "Do you already have all the photos and videos for the website?" },
  { id: "booking", label: "Table booking", text: "Do you want customers to book a table on the website?" },
  { id: "logo", label: "Has a logo", text: "Do you already have a logo?" },
  { id: "brand", label: "Has brand colors and fonts", text: "Do you already have brand colors, fonts and style rules?" },
  { id: "contact", label: "Contact form", text: "Do you want a form where customers can send you a message?" },
  { id: "consultant", label: "Consultant gives final content", text: "Will the consultant give us the final text, photos and videos?" },
  { id: "pdfmenu", label: "PDF menu download", text: "Do you want a PDF menu to download as well?" },
];

/** @type {TextQuestion[]} */
const TEXT_QUESTIONS = [
  { id: "searchterms", label: "Local search terms", text: "What local search terms matter most? (For example: \"family restaurant in Clearwater\")" },
  { id: "cuisine", label: "Cuisine and dining style", text: "What cuisine and what style of dining: casual, family, fine dining, or fast-casual?" },
  { id: "founder", label: "Story and founder", text: "What is the story behind \"Everyday-Meal\"? Who is the founder or chef?" },
  { id: "threewords", label: "Three words", text: "What three words should customers use to describe the restaurant?" },
  { id: "price", label: "Price range", text: "What is the price range (budget, mid, premium)?" },
  { id: "competitors", label: "Competitors", text: "Which restaurants do you see as competitors in Clearwater?" },
  { id: "services", label: "Other services", text: "Do you plan other services such as delivery, takeaway, catering, private events, or a bar?" },
  { id: "menu", label: "Menu size and changes", text: "How many menu items are there? Does the menu change daily, weekly or seasonally?" },
  { id: "why", label: "Your story", text: "Why are you opening this restaurant? Tell us your story. (We will use it for the About page.)" },
  { id: "food", label: "Food and drinks", text: "What kind of food and drinks will you serve?" },
  { id: "address", label: "Address and hours", text: "What is the restaurant address, and what are your opening hours?" },
  { id: "domain", label: "Website address", text: "What website address would you like? (For example: yourplace.com) Do you have one already?" },
  { id: "launch", label: "Opening and launch date", text: "When does the restaurant open, and when should the website be live?" },
  { id: "likes", label: "Websites you like", text: "Write the names or links of restaurant websites you like, and what you like about them." },
  { id: "socials", label: "Phone, email and social media", text: "What phone number, email and social media pages (Instagram, Facebook) should we show on the website?" },
];

/** Every answered item as label/value rows, in questionnaire order. */
function answerRows(/** @type {Answers} */ a) {
  /** @type {{label: string, value: string, long: boolean}[]} */
  const rows = [];
  STYLE_QUESTIONS.forEach((q) => rows.push({ label: q.title, value: a.picks[q.id] ?? "", long: false }));
  CHOICE_QUESTIONS.forEach((q) => rows.push({ label: q.label, value: choiceText(a.choices[q.id]), long: false }));
  YES_NO_QUESTIONS.forEach((q) => rows.push({ label: q.label, value: a.yesno[q.id] ?? "", long: false }));
  TEXT_QUESTIONS.forEach((q) => rows.push({ label: q.label, value: (a.text[q.id] ?? "").trim(), long: true }));
  return rows;
}
