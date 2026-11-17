/* Questionnaire content shared by the client page (index.html) and the admin page (admin.html). */

/**
 * @typedef {{value: string, note: string, image: string, width: number, height: number}} StyleOption
 * @typedef {{id: string, title: string, hint: string, options: StyleOption[]}} StyleQuestion
 * @typedef {{id: string, label: string, text: string}} TextQuestion
 * @typedef {{picks: Record<string, string>, yesno: Record<string, string>, text: Record<string, string>, name: string, email: string}} Answers
 */

/** @type {StyleQuestion[]} */
const STYLE_QUESTIONS = [
  { id: "corner", title: "Corner shape", hint: "Should the boxes have round corners or square corners?",
    options: [
      { value: "Round corners", note: "Soft and friendly", image: "images/Q2-1-Round-corners.jpg", width: 1600, height: 1217 },
      { value: "Square corners", note: "Sharp and neat", image: "images/Q2-2-Square-corners.jpg", width: 1600, height: 1217 } ] },
  { id: "surface", title: "Flat or shadow look", hint: "Plain flat boxes, or boxes that lift off the page with a shadow?",
    options: [
      { value: "Flat look", note: "Clean and even", image: "images/Q3-1-Flat-look.jpg", width: 1600, height: 1217 },
      { value: "Shadow look", note: "Boxes with depth", image: "images/Q3-2-Shadow-look.jpg", width: 1600, height: 619 } ] },
  { id: "space", title: "Empty space", hint: "Lots of room around things, or more information on each screen?",
    options: [
      { value: "Lots of empty space", note: "Calm and roomy", image: "images/Q4-1-Lots-of-empty-space.jpg", width: 1600, height: 1217 },
      { value: "Lots of information", note: "More to see at once", image: "images/Q4-2-Lots-of-information.jpg", width: 1600, height: 1217 } ] },
  { id: "colors", title: "Colors", hint: "Just one or two colors, or many bright colors?",
    options: [
      { value: "Few colors", note: "Simple and calm", image: "images/Q5-1-Few-colors.jpg", width: 1600, height: 1217 },
      { value: "Many colors", note: "Bright and playful", image: "images/Q5-2-Many-colors.jpg", width: 1600, height: 1217 } ] },
  { id: "letters", title: "Letter style", hint: "Look at the letters. Which style do you like?",
    options: [
      { value: "Letters with small tails", note: "Classic, like a menu card", image: "images/Q6-1-Letters-with-small-tails.jpg", width: 1188, height: 462 },
      { value: "Letters with no tails", note: "Modern and simple", image: "images/Q6-2-Letters-with-no-tails.jpg", width: 1188, height: 462 } ] },
  { id: "combo", title: "Letter combinations", hint: "Which title and text pair feels most like your restaurant?",
    options: [
      { value: "Classic and graceful", note: "Elegant and timeless", image: "images/Q7-1-Classic-and-graceful.jpg", width: 776, height: 462 },
      { value: "Modern and friendly", note: "Warm and easy to read", image: "images/Q7-2-Modern-and-friendly.jpg", width: 776, height: 462 },
      { value: "Bold and strong", note: "Big and confident", image: "images/Q7-3-Bold-and-strong.jpg", width: 776, height: 462 },
      { value: "Clean and simple", note: "Nothing extra", image: "images/Q7-4-Clean-and-simple.jpg", width: 776, height: 462 },
      { value: "Fun and playful", note: "Light and cheerful", image: "images/Q7-5-Fun-and-playful.jpg", width: 776, height: 462 },
      { value: "Handwritten and personal", note: "Like a note from you", image: "images/Q7-6-Handwritten-and-personal.jpg", width: 776, height: 462 } ] },
  { id: "page", title: "Sample web page", hint: "Which page feels more like your restaurant?",
    options: [
      { value: "Simple and clean", note: "Only what matters", image: "images/Q8-1-Simple-and-clean.jpg", width: 1600, height: 1217 },
      { value: "Busy and detailed", note: "Lively, lots going on", image: "images/Q8-2-Busy-and-detailed.jpg", width: 1600, height: 1217 } ] },
  { id: "blend", title: "How colors look", hint: "Solid colors, or colors that mix into each other?",
    options: [
      { value: "Plain colors", note: "One solid color", image: "images/Q9-1-Plain-colors.jpg", width: 1600, height: 1217 },
      { value: "Mixed colors", note: "Colors blend together", image: "images/Q9-2-Mixed-colors.jpg", width: 1600, height: 1217 } ] },
];

/** @type {TextQuestion[]} */
const YES_NO_QUESTIONS = [
  { id: "story", label: "Story page", text: "Do you want a page that tells the story of your restaurant?" },
  { id: "photos", label: "Has photos and videos", text: "Do you already have all the photos and videos for the website?" },
  { id: "booking", label: "Table booking", text: "Do you want customers to book a table on the website?" },
  { id: "logo", label: "Has a logo", text: "Do you already have a logo?" },
  { id: "brand", label: "Has brand colors and fonts", text: "Do you already have brand colors, fonts and style rules?" },
  { id: "contact", label: "Contact form", text: "Do you want a form where customers can send you a message?" },
];

/** @type {TextQuestion[]} */
const TEXT_QUESTIONS = [
  { id: "why", label: "Your story", text: "Why are you opening this restaurant? Tell us your story. (We will use it for the About page.)" },
  { id: "food", label: "Food and drinks", text: "What kind of food and drinks will you serve?" },
  { id: "address", label: "Address and hours", text: "What is the restaurant address, and what are your opening hours?" },
  { id: "guests", label: "Who you want to welcome", text: "Who do you want to come to your restaurant? (For example: families, students, office workers)" },
  { id: "howbook", label: "How guests book", text: "How should guests book a table? (For example: on our website, OpenTable, or by phone)" },
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
  YES_NO_QUESTIONS.forEach((q) => rows.push({ label: q.label, value: a.yesno[q.id] ?? "", long: false }));
  TEXT_QUESTIONS.forEach((q) => rows.push({ label: q.label, value: (a.text[q.id] ?? "").trim(), long: true }));
  return rows;
}
