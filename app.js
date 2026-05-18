import * as THREE from "./vendor/three.module.js";

const planets = [
  {
    id: "mercury",
    name: "Mercury",
    color: "#b8b3a8",
    radius: 6,
    orbit: 80,
    speed: 0.9,
    moons: 0,
    environment: "Barren, cratered rock. Days reach 430C, nights plunge to -180C.",
    habitability: "Near zero - no atmosphere, extreme temperature swings.",
    fact: "A year on Mercury is just 88 Earth days.",
    knownFor: "Closest planet to the Sun and the smallest major planet.",
    publicName: "The cratered messenger",
    naturalColor: "Dark gray to warm gray rock",
    visualCue: "Look for a Moon-like, heavily cratered surface with almost no atmosphere or clouds.",
  },
  {
    id: "venus",
    name: "Venus",
    color: "#e8b97a",
    radius: 9,
    orbit: 115,
    speed: 0.7,
    moons: 0,
    environment: "Thick CO2 atmosphere, sulfuric-acid clouds, 465C surface.",
    habitability: "Hostile - crushing pressure and runaway greenhouse heat.",
    fact: "Venus spins backwards compared to most planets.",
    knownFor: "Hottest planet, wrapped in thick yellow-white sulfuric-acid clouds.",
    publicName: "Earth's toxic twin",
    naturalColor: "Pale yellow, cream, and cloud-white",
    visualCue: "Look for a smooth cloudy globe, not a visible rocky surface.",
  },
  {
    id: "earth",
    name: "Earth",
    color: "#5aa9e6",
    ring: "#7fd6a0",
    radius: 10,
    orbit: 150,
    speed: 0.6,
    moons: 1,
    environment: "Liquid water oceans, breathable nitrogen-oxygen atmosphere.",
    habitability: "Home. The only known cradle of life.",
    fact: "71% of Earth's surface is covered by water.",
    knownFor: "Only known world with life, liquid oceans, and blue-white appearance from space.",
    publicName: "The blue planet",
    naturalColor: "Deep ocean blue, white clouds, green-brown land",
    visualCue: "Look for oceans, continents, bright clouds, and a thin blue atmosphere.",
  },
  {
    id: "mars",
    name: "Mars",
    color: "#d96846",
    radius: 8,
    orbit: 190,
    speed: 0.5,
    moons: 2,
    environment: "Cold, thin CO2 atmosphere. Rusty dust, polar ice caps.",
    habitability: "Marginal - needs sealed habitats and life support.",
    fact: "Mars hosts the tallest volcano in the solar system, Olympus Mons.",
    knownFor: "The Red Planet, with iron-rich dust, volcanoes, canyons, and polar ice.",
    publicName: "The red planet",
    naturalColor: "Rust red, orange, tan, and darker basalt patches",
    visualCue: "Look for a rusty surface, darker highlands, and pale polar caps.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    color: "#d8a574",
    ring: "#a87648",
    radius: 22,
    orbit: 250,
    speed: 0.32,
    moons: 95,
    environment: "Gas giant - hydrogen and helium, a 350-year-old storm.",
    habitability: "None - no surface, crushing gravity.",
    fact: "Jupiter's Great Red Spot is a storm wider than Earth.",
    knownFor: "Largest planet, with colored cloud bands and the Great Red Spot storm.",
    publicName: "The giant storm world",
    naturalColor: "Cream, tan, orange-brown bands, and reddish storm regions",
    visualCue: "Look for broad stripes and a stormy atmosphere rather than a solid surface.",
  },
  {
    id: "saturn",
    name: "Saturn",
    color: "#e0c896",
    ring: "#bfa97a",
    radius: 19,
    orbit: 310,
    speed: 0.24,
    moons: 146,
    environment: "Gas giant wrapped in spectacular ice rings.",
    habitability: "None - but moon Titan has lakes of methane.",
    fact: "Saturn is less dense than water - it would float.",
    knownFor: "Bright ring system made of countless pieces of ice and rock.",
    publicName: "The ringed planet",
    naturalColor: "Soft gold, pale yellow, beige bands, and icy rings",
    visualCue: "Look for the wide ring system and subtle golden cloud bands.",
  },
  {
    id: "uranus",
    name: "Uranus",
    color: "#9ed7d8",
    radius: 14,
    orbit: 360,
    speed: 0.18,
    moons: 27,
    environment: "Ice giant tilted on its side, frigid methane atmosphere.",
    habitability: "None - -224C, no solid surface.",
    fact: "Uranus rotates on its side, rolling along its orbit.",
    knownFor: "A pale blue-green ice giant that rotates almost sideways.",
    publicName: "The sideways ice giant",
    naturalColor: "Pale cyan to blue-green",
    visualCue: "Look for a smooth, quiet blue-green disk and the extreme axial tilt.",
  },
  {
    id: "neptune",
    name: "Neptune",
    color: "#3f6fd8",
    radius: 14,
    orbit: 410,
    speed: 0.14,
    moons: 14,
    environment: "Deep blue ice giant, supersonic winds, methane clouds.",
    habitability: "None - too cold and stormy.",
    fact: "Neptune's winds reach 2,100 km/h, the fastest in the solar system.",
    knownFor: "Most distant major planet, with powerful winds and methane-blue color.",
    publicName: "The windy blue world",
    naturalColor: "Light blue, slightly deeper than Uranus",
    visualCue: "Look for a clearer blue ice giant with stormy wind identity, but not an over-saturated cartoon blue.",
  },
];

const sunBody = {
  id: "sun",
  name: "Sun",
  fact: "The Sun is a star. Its gravity holds the solar system together, and its core produces energy by nuclear fusion.",
};

const texturePaths = {
  mercury: "./assets/textures/mercury.jpg",
  venus: "./assets/textures/venus.jpg",
  earth: "./assets/textures/earth.jpg",
  mars: "./assets/textures/mars.jpg",
  jupiter: "./assets/textures/jupiter.jpg",
  saturn: "./assets/textures/saturn.jpg",
  uranus: "./assets/textures/uranus.jpg",
  neptune: "./assets/textures/neptune.jpg",
};

const nasaFacts = {
  mercury: { axialTiltDeg: 0.01, rotationHours: 1407.6, orbitalDays: 88.0, diameterKm: 4879, gravity: "3.7 m/s2", atmosphere: "Trace exosphere", meanTemp: "167C" },
  venus: { axialTiltDeg: 177.4, rotationHours: -5832.5, orbitalDays: 224.7, diameterKm: 12104, gravity: "8.9 m/s2", atmosphere: "Carbon dioxide, nitrogen", meanTemp: "464C" },
  earth: { axialTiltDeg: 23.4, rotationHours: 23.9, orbitalDays: 365.2, diameterKm: 12756, gravity: "9.8 m/s2", atmosphere: "Nitrogen, oxygen", meanTemp: "15C" },
  mars: { axialTiltDeg: 25.2, rotationHours: 24.6, orbitalDays: 687.0, diameterKm: 6792, gravity: "3.7 m/s2", atmosphere: "Carbon dioxide, nitrogen", meanTemp: "-65C" },
  jupiter: { axialTiltDeg: 3.1, rotationHours: 9.9, orbitalDays: 4331, diameterKm: 142984, gravity: "23.1 m/s2", atmosphere: "Hydrogen, helium", meanTemp: "-110C" },
  saturn: { axialTiltDeg: 26.7, rotationHours: 10.7, orbitalDays: 10747, diameterKm: 120536, gravity: "9.0 m/s2", atmosphere: "Hydrogen, helium", meanTemp: "-140C" },
  uranus: { axialTiltDeg: 97.8, rotationHours: -17.2, orbitalDays: 30589, diameterKm: 51118, gravity: "8.7 m/s2", atmosphere: "Hydrogen, helium, methane", meanTemp: "-195C" },
  neptune: { axialTiltDeg: 28.3, rotationHours: 16.1, orbitalDays: 59800, diameterKm: 49528, gravity: "11.0 m/s2", atmosphere: "Hydrogen, helium, methane", meanTemp: "-200C" },
};

const visualTuning = {
  mercury: { tint: "#b8b0a4", exposure: 1.05, atmosphere: 0x77706a },
  venus: { tint: "#f1d39b", exposure: 1.08, atmosphere: 0xf2c477 },
  earth: { tint: "#ffffff", exposure: 1.08, atmosphere: 0x6fb6ff },
  mars: { tint: "#d97852", exposure: 1.08, atmosphere: 0xd88c63 },
  jupiter: { tint: "#e1b07f", exposure: 1.12, atmosphere: 0xd39b6d },
  saturn: { tint: "#ead6a4", exposure: 1.08, atmosphere: 0xe2c98c },
  uranus: { tint: "#a9dfe2", exposure: 1.02, featureless: true, atmosphere: 0x9fe8ee },
  neptune: { tint: "#6fa7d8", exposure: 1.08, atmosphere: 0x5b9bd4 },
};

const orbitPhase = {
  mercury: 0.35,
  venus: 2.15,
  earth: 4.05,
  mars: 5.45,
  jupiter: 0.95,
  saturn: 2.85,
  uranus: 3.95,
  neptune: 5.7,
};

const orbitMotionScale = 8;
const spinMotionScale = 0.45;

const app = document.querySelector("#app");
let stage = "galaxy";
let selectedPlanet = null;
let solarTooltip = null;
let activePanel = "student";
let activeLesson = "tour";
let eduCollapsed = true;
let quizIndex = 0;
let quizScore = 0;
let quizTopic = "all";
let quizFeedback = null;
let comparison = { a: "earth", b: "mars" };
let studentLevel = "junior";
let activePath = "first-tour";
let pathStep = 0;
const weakTopics = {};
const uiState = {
  paused: false,
  labels: true,
  axes: true,
  scaleMode: "classroom",
  speed: 1,
  reducedMotion: false,
  dyslexiaFont: false,
  narration: false,
};

const lessons = {
  tour: {
    title: "Guided Solar System Tour",
    grade: "Middle school",
    objective: "Identify the eight planets, classify inner and outer planets, and explain why classroom models compress distance and size.",
    steps: [
      "Start at the Milky Way and locate the solar marker.",
      "Zoom to the Solar System and observe the tilted orbital plane.",
      "Pause on Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
      "Ask students which properties are real data and which are visual scaling choices.",
    ],
    prompts: ["Why are the planets not shown at true distance scale?", "Which planets rotate in unusual directions?", "How do gas giants differ from rocky planets?"],
  },
  seasons: {
    title: "Axial Tilt and Seasons",
    grade: "Middle / high school",
    objective: "Connect axial tilt to seasons and compare Earth, Mars, Uranus, and Venus.",
    steps: ["Turn on axes.", "Compare Earth and Mars tilts.", "Open Uranus and observe its sideways rotation.", "Discuss why Venus is upside down and retrograde."],
    prompts: ["Does distance from the Sun cause seasons?", "Why is Uranus an extreme case?", "What does retrograde rotation mean?"],
  },
  compare: {
    title: "Compare Worlds",
    grade: "Upper elementary / middle school",
    objective: "Use evidence to compare planet size, gravity, atmosphere, rotation, and orbital period.",
    steps: ["Open Compare.", "Select Earth and Mars.", "Switch to Jupiter and Saturn.", "Write one claim supported by two data points."],
    prompts: ["Which comparison surprised you most?", "Which planet would need the most life support?", "How does gravity affect exploration?"],
  },
};

const quizQuestions = [
  { body: "Sun", q: "What is the Sun?", choices: ["A planet", "A star", "A moon", "An asteroid"], answer: "A star" },
  { body: "Sun", q: "What process powers the Sun's core?", choices: ["Combustion", "Nuclear fusion", "Lightning", "Volcanism"], answer: "Nuclear fusion" },
  { body: "Sun", q: "Which layer is the Sun's visible surface?", choices: ["Photosphere", "Core", "Mantle", "Troposphere"], answer: "Photosphere" },
  { body: "Mercury", q: "Which planet has the shortest year?", choices: ["Mercury", "Venus", "Mars", "Jupiter"], answer: "Mercury" },
  { body: "Mercury", q: "Why does Mercury have extreme temperature swings?", choices: ["It has almost no atmosphere", "It has thick clouds", "It is made of ice", "It has many oceans"], answer: "It has almost no atmosphere" },
  { body: "Mercury", q: "What does Mercury's cratered surface show?", choices: ["Many impacts", "Ocean waves", "Forest growth", "Cloud movement"], answer: "Many impacts" },
  { body: "Venus", q: "Which planet has the hottest surface?", choices: ["Mercury", "Venus", "Earth", "Mars"], answer: "Venus" },
  { body: "Venus", q: "What causes Venus's extreme heat?", choices: ["Runaway greenhouse effect", "An ocean current", "A giant moon", "A weak Sun"], answer: "Runaway greenhouse effect" },
  { body: "Venus", q: "How does Venus rotate compared with most planets?", choices: ["Backward", "It does not rotate", "Exactly like Earth", "Only during eclipses"], answer: "Backward" },
  { body: "Earth", q: "What covers about 71 percent of Earth's surface?", choices: ["Liquid water", "Lava", "Ice only", "Sand"], answer: "Liquid water" },
  { body: "Earth", q: "What does Earth's axial tilt help create?", choices: ["Seasons", "Gravity", "Oceans", "The Moon"], answer: "Seasons" },
  { body: "Earth", q: "Which gas is a major part of Earth's breathable atmosphere?", choices: ["Oxygen", "Methane", "Neon", "Sulfur dioxide"], answer: "Oxygen" },
  { body: "Mars", q: "What gives Mars its rusty color?", choices: ["Iron-rich dust", "Green plants", "Liquid methane", "Salt clouds"], answer: "Iron-rich dust" },
  { body: "Mars", q: "Which giant volcano is on Mars?", choices: ["Olympus Mons", "Mauna Loa", "Mount Everest", "Vesuvius"], answer: "Olympus Mons" },
  { body: "Mars", q: "What is Mars's atmosphere mostly made of?", choices: ["Carbon dioxide", "Oxygen", "Hydrogen", "Water vapor"], answer: "Carbon dioxide" },
  { body: "Jupiter", q: "What kind of planet is Jupiter?", choices: ["Gas giant", "Rocky planet", "Dwarf planet", "Comet"], answer: "Gas giant" },
  { body: "Jupiter", q: "What is the Great Red Spot?", choices: ["A giant storm", "A volcano", "A moon", "A crater"], answer: "A giant storm" },
  { body: "Jupiter", q: "Which mission currently helped reveal Jupiter's deep atmosphere and magnetic field?", choices: ["Juno", "Viking", "Magellan", "MESSENGER"], answer: "Juno" },
  { body: "Saturn", q: "What are Saturn's rings mostly made of?", choices: ["Ice and rock particles", "Solid metal sheets", "Liquid water", "Fire"], answer: "Ice and rock particles" },
  { body: "Saturn", q: "Which moon of Saturn has thick atmosphere and methane lakes?", choices: ["Titan", "Phobos", "Europa", "Triton"], answer: "Titan" },
  { body: "Saturn", q: "Which spacecraft studied Saturn for many years?", choices: ["Cassini", "Curiosity", "New Horizons", "Parker Solar Probe"], answer: "Cassini" },
  { body: "Uranus", q: "What is unusual about Uranus's rotation?", choices: ["It rotates on its side", "It never rotates", "It rotates once per minute", "It rotates around Earth"], answer: "It rotates on its side" },
  { body: "Uranus", q: "Why does Uranus look blue-green?", choices: ["Methane absorbs red light", "It is covered in grass", "It has blue oceans", "It reflects Earth"], answer: "Methane absorbs red light" },
  { body: "Uranus", q: "Which spacecraft has flown by Uranus?", choices: ["Voyager 2", "Cassini", "Viking 1", "Juno"], answer: "Voyager 2" },
  { body: "Neptune", q: "Which planet has the longest year?", choices: ["Neptune", "Mercury", "Earth", "Mars"], answer: "Neptune" },
  { body: "Neptune", q: "What is Neptune known for in its atmosphere?", choices: ["Very fast winds", "Breathable oxygen", "Red dust storms", "No weather"], answer: "Very fast winds" },
  { body: "Neptune", q: "What is Neptune's largest moon?", choices: ["Triton", "Titan", "Europa", "Deimos"], answer: "Triton" },
  { body: "Sun", q: "What force from the Sun helps keep planets in orbit?", choices: ["Gravity", "Sound", "Magnet paint", "Ocean tides"], answer: "Gravity" },
  { body: "Sun", q: "Which gas does the Sun mainly fuse in its core?", choices: ["Hydrogen", "Oxygen", "Nitrogen", "Carbon dioxide"], answer: "Hydrogen" },
  { body: "Sun", q: "What does fusion in the Sun produce for Earth?", choices: ["Light and heat", "Solid rocks", "Ocean salt", "Volcano ash"], answer: "Light and heat" },
  { body: "Sun", q: "Where is the Sun located in our solar system model?", choices: ["At the center", "Beyond Neptune", "Inside Earth", "Between Mars and Jupiter"], answer: "At the center" },
  { body: "Sun", q: "What should students never do when observing the real Sun?", choices: ["Look directly without certified protection", "Use a safe app model", "Read NASA data", "Draw the Sun"], answer: "Look directly without certified protection" },
  { body: "Sun", q: "Which part of the Sun releases streams of charged particles into space?", choices: ["Outer atmosphere", "Rocky crust", "Liquid ocean", "Iron surface"], answer: "Outer atmosphere" },
  { body: "Sun", q: "Why is the Sun not called a planet?", choices: ["It makes energy by fusion", "It has rings", "It is smaller than Mercury", "It orbits Earth"], answer: "It makes energy by fusion" },
  { body: "Mercury", q: "Where is Mercury in order from the Sun?", choices: ["1st", "3rd", "5th", "8th"], answer: "1st" },
  { body: "Mercury", q: "How many moons does Mercury have?", choices: ["0", "1", "2", "95"], answer: "0" },
  { body: "Mercury", q: "What type of planet is Mercury?", choices: ["Rocky planet", "Gas giant", "Ice giant", "Dwarf planet"], answer: "Rocky planet" },
  { body: "Mercury", q: "What is Mercury's atmosphere best described as?", choices: ["Trace exosphere", "Thick oxygen air", "Methane clouds", "Hydrogen ocean"], answer: "Trace exosphere" },
  { body: "Mercury", q: "Why does Mercury look similar to the Moon?", choices: ["It has many craters", "It has blue oceans", "It has forests", "It has bright rings"], answer: "It has many craters" },
  { body: "Mercury", q: "Compared with Earth, Mercury's gravity is", choices: ["Weaker", "The same", "Much stronger", "Zero everywhere"], answer: "Weaker" },
  { body: "Mercury", q: "What is a key challenge for humans on Mercury?", choices: ["Extreme heat and cold", "Too much liquid water", "Breathable forests", "Gentle weather"], answer: "Extreme heat and cold" },
  { body: "Venus", q: "Where is Venus in order from the Sun?", choices: ["2nd", "1st", "4th", "7th"], answer: "2nd" },
  { body: "Venus", q: "How many moons does Venus have?", choices: ["0", "1", "2", "14"], answer: "0" },
  { body: "Venus", q: "What gas dominates Venus's atmosphere?", choices: ["Carbon dioxide", "Oxygen", "Helium", "Neon"], answer: "Carbon dioxide" },
  { body: "Venus", q: "What covers Venus and hides its surface in visible light?", choices: ["Thick clouds", "Blue oceans", "Forest canopies", "Ice rings"], answer: "Thick clouds" },
  { body: "Venus", q: "Which planet is often called Earth's twin because of similar size?", choices: ["Venus", "Mars", "Mercury", "Neptune"], answer: "Venus" },
  { body: "Venus", q: "What is unusual about a day on Venus?", choices: ["It is longer than its year", "It lasts one hour", "It never rotates", "It equals Neptune's year"], answer: "It is longer than its year" },
  { body: "Venus", q: "What makes Venus hostile for landers and humans?", choices: ["Crushing pressure and heat", "Breathable oxygen", "Cool oceans", "Low gravity only"], answer: "Crushing pressure and heat" },
  { body: "Earth", q: "Where is Earth in order from the Sun?", choices: ["3rd", "1st", "6th", "8th"], answer: "3rd" },
  { body: "Earth", q: "How many natural moons does Earth have?", choices: ["1", "0", "2", "27"], answer: "1" },
  { body: "Earth", q: "What protects Earth from much of the solar wind?", choices: ["Magnetic field", "Saturn's rings", "Mars dust", "Jupiter's clouds"], answer: "Magnetic field" },
  { body: "Earth", q: "What is Earth's atmosphere mostly made of?", choices: ["Nitrogen and oxygen", "Carbon dioxide only", "Hydrogen and helium", "Methane and sulfur"], answer: "Nitrogen and oxygen" },
  { body: "Earth", q: "What is one reason Earth supports life?", choices: ["Liquid water", "No atmosphere", "No sunlight", "No gravity"], answer: "Liquid water" },
  { body: "Earth", q: "What does Earth's Moon help drive?", choices: ["Ocean tides", "Jupiter's storms", "Venus clouds", "Saturn's rings"], answer: "Ocean tides" },
  { body: "Earth", q: "About how long is Earth's year?", choices: ["365 days", "88 days", "12 years", "165 years"], answer: "365 days" },
  { body: "Mars", q: "Where is Mars in order from the Sun?", choices: ["4th", "2nd", "6th", "8th"], answer: "4th" },
  { body: "Mars", q: "How many small moons does Mars have?", choices: ["2", "0", "1", "95"], answer: "2" },
  { body: "Mars", q: "What are the names of Mars's moons?", choices: ["Phobos and Deimos", "Europa and Io", "Titan and Enceladus", "Triton and Charon"], answer: "Phobos and Deimos" },
  { body: "Mars", q: "What evidence suggests Mars had a wetter past?", choices: ["Dried river channels", "Thick forests", "Fresh coral reefs", "Saturn-like rings"], answer: "Dried river channels" },
  { body: "Mars", q: "How does Mars's atmosphere compare with Earth's?", choices: ["Much thinner", "Much thicker", "Exactly the same", "Mostly oxygen"], answer: "Much thinner" },
  { body: "Mars", q: "What are Mars's polar caps made from?", choices: ["Water ice and carbon dioxide ice", "Pure lava", "Liquid methane", "Metal sheets"], answer: "Water ice and carbon dioxide ice" },
  { body: "Mars", q: "Why is Mars useful for comparing habitability with Earth?", choices: ["It has similar day length but harsher conditions", "It has breathable air", "It has no gravity", "It is hotter than Venus"], answer: "It has similar day length but harsher conditions" },
  { body: "Jupiter", q: "Where is Jupiter in order from the Sun?", choices: ["5th", "2nd", "4th", "8th"], answer: "5th" },
  { body: "Jupiter", q: "What is Jupiter mostly made of?", choices: ["Hydrogen and helium", "Iron-rich rock", "Liquid water", "Frozen nitrogen"], answer: "Hydrogen and helium" },
  { body: "Jupiter", q: "Does Jupiter have a solid surface like Earth?", choices: ["No", "Yes", "Only on weekends", "Only near the Great Red Spot"], answer: "No" },
  { body: "Jupiter", q: "Which four large moons are called the Galilean moons?", choices: ["Io, Europa, Ganymede, Callisto", "Moon, Phobos, Deimos, Triton", "Titan, Enceladus, Mimas, Rhea", "Charon, Hydra, Nix, Kerberos"], answer: "Io, Europa, Ganymede, Callisto" },
  { body: "Jupiter", q: "Which Jupiter moon may have a subsurface ocean?", choices: ["Europa", "Phobos", "Titan", "Triton"], answer: "Europa" },
  { body: "Jupiter", q: "Why is Jupiter important for scale lessons?", choices: ["It is the largest planet", "It is the smallest planet", "It is closest to the Sun", "It has no moons"], answer: "It is the largest planet" },
  { body: "Jupiter", q: "What makes Jupiter's striped appearance?", choices: ["Cloud belts and zones", "Continents and oceans", "Ice rings only", "Impact craters only"], answer: "Cloud belts and zones" },
  { body: "Saturn", q: "Where is Saturn in order from the Sun?", choices: ["6th", "3rd", "5th", "8th"], answer: "6th" },
  { body: "Saturn", q: "What is Saturn most famous for?", choices: ["Bright rings", "Blue oceans", "A red dusty surface", "Being closest to the Sun"], answer: "Bright rings" },
  { body: "Saturn", q: "Are Saturn's rings solid plates?", choices: ["No, they are many particles", "Yes, they are one solid disk", "Yes, they are metal roads", "No, they are liquid oceans"], answer: "No, they are many particles" },
  { body: "Saturn", q: "What kind of planet is Saturn?", choices: ["Gas giant", "Rocky planet", "Dwarf planet", "Comet"], answer: "Gas giant" },
  { body: "Saturn", q: "Why is Titan important?", choices: ["It has a thick atmosphere", "It is Mercury's moon", "It is inside the Sun", "It has no chemistry"], answer: "It has a thick atmosphere" },
  { body: "Saturn", q: "Which Saturn moon shoots water-rich plumes?", choices: ["Enceladus", "Deimos", "Europa", "Triton"], answer: "Enceladus" },
  { body: "Saturn", q: "What does Saturn's low density mean in classroom explanations?", choices: ["It is less dense than water", "It is made of solid iron", "It has no atmosphere", "It is smaller than Mercury"], answer: "It is less dense than water" },
  { body: "Uranus", q: "Where is Uranus in order from the Sun?", choices: ["7th", "4th", "6th", "8th"], answer: "7th" },
  { body: "Uranus", q: "What type of planet is Uranus?", choices: ["Ice giant", "Rocky planet", "Gas dwarf", "Comet"], answer: "Ice giant" },
  { body: "Uranus", q: "About how tilted is Uranus's axis?", choices: ["About 98 degrees", "About 0 degrees", "About 23 degrees", "About 3 degrees"], answer: "About 98 degrees" },
  { body: "Uranus", q: "What does Uranus's extreme tilt affect?", choices: ["Its seasons", "Earth's oceans", "Mercury's craters", "The Sun's fusion"], answer: "Its seasons" },
  { body: "Uranus", q: "What is Uranus's natural visible color?", choices: ["Pale blue-green", "Bright red", "Dark black with continents", "Yellow with forests"], answer: "Pale blue-green" },
  { body: "Uranus", q: "Does Uranus have faint rings?", choices: ["Yes", "No", "Only one solid ring", "Only during eclipses"], answer: "Yes" },
  { body: "Uranus", q: "Why is Uranus still poorly explored?", choices: ["Only Voyager 2 has flown by it", "Humans live there already", "It is closer than the Moon", "It has no atmosphere to study"], answer: "Only Voyager 2 has flown by it" },
  { body: "Neptune", q: "Where is Neptune in order from the Sun?", choices: ["8th", "5th", "6th", "7th"], answer: "8th" },
  { body: "Neptune", q: "What type of planet is Neptune?", choices: ["Ice giant", "Rocky planet", "Gas dwarf", "Asteroid"], answer: "Ice giant" },
  { body: "Neptune", q: "Why does Neptune appear blue?", choices: ["Methane in its atmosphere", "Blue forests", "Liquid water oceans", "Paint from comets"], answer: "Methane in its atmosphere" },
  { body: "Neptune", q: "Which spacecraft flew by Neptune in 1989?", choices: ["Voyager 2", "Cassini", "Viking", "Magellan"], answer: "Voyager 2" },
  { body: "Neptune", q: "How long is Neptune's year compared with Earth's?", choices: ["About 165 Earth years", "About 88 Earth days", "About 24 hours", "About one Earth week"], answer: "About 165 Earth years" },
  { body: "Neptune", q: "What is unusual about Triton's orbit?", choices: ["It is retrograde", "It is inside Earth", "It never moves", "It orbits Saturn"], answer: "It is retrograde" },
  { body: "Neptune", q: "What classroom idea does Neptune show well?", choices: ["Farther planets have longer years", "All planets have the same year", "Distance does not affect orbit", "Planets orbit Earth"], answer: "Farther planets have longer years" },
];

const standards = [
  "NGSS MS-ESS1-2: Develop and use a model to describe the role of gravity in motions within galaxies and the solar system.",
  "NGSS MS-ESS1-3: Analyze and interpret data to determine scale properties of objects in the solar system.",
  "NGSS 5-ESS1-1: Support an argument that differences in apparent brightness are due to relative distances from Earth.",
  "CBSE Class 6-8: Motions of Earth, solar system, planets, satellites, and basic astronomical observation.",
];

const learnerLevels = {
  junior: {
    label: "Like I am 8",
    description: "Short explanations, simple vocabulary, and guided planet visits.",
  },
  middle: {
    label: "Like I am 12",
    description: "More data, comparisons, and cause-and-effect reasoning.",
  },
  high: {
    label: "High",
    description: "Adds evidence, model limits, missions, and stronger science vocabulary.",
  },
};

const learningPaths = {
  "first-tour": {
    title: "First Solar System Tour",
    goal: "Learn the Sun, inner planets, outer planets, and one key fact about each.",
    steps: [
      { title: "Start with the Sun", body: "Sun", action: "sun", prompt: "The Sun is a star. It gives light and heat and its gravity holds the planets in orbit." },
      { title: "Visit Mercury", body: "Mercury", action: "mercury", prompt: "Mercury is closest to the Sun and has the shortest year." },
      { title: "Visit Venus", body: "Venus", action: "venus", prompt: "Venus is the hottest planet because its thick atmosphere traps heat." },
      { title: "Visit Earth", body: "Earth", action: "earth", prompt: "Earth has liquid water, air we can breathe, and life." },
      { title: "Visit Mars", body: "Mars", action: "mars", prompt: "Mars is cold, dusty, and has signs that water flowed there long ago." },
      { title: "Visit the giants", body: "Jupiter", action: "jupiter", prompt: "Jupiter and Saturn are gas giants. Uranus and Neptune are ice giants." },
      { title: "Review with questions", body: "Quiz", action: "quiz", prompt: "Try the quiz. If you miss one, the app will explain and suggest what to review." },
    ],
  },
  "earth-mars": {
    title: "Earth and Mars Comparison",
    goal: "Understand habitability by comparing Earth and Mars.",
    steps: [
      { title: "Open Earth", body: "Earth", action: "earth", prompt: "Look for water, atmosphere, temperature, and gravity." },
      { title: "Open Mars", body: "Mars", action: "mars", prompt: "Mars has a similar day length, but its air is thin and cold." },
      { title: "Compare data", body: "Compare", action: "compare", prompt: "Use diameter, gravity, atmosphere, and year length as evidence." },
      { title: "Answer Mars questions", body: "Mars", action: "quiz-mars", prompt: "Practice only Mars questions until you can explain why Mars needs life support." },
    ],
  },
  "motion-seasons": {
    title: "Rotation, Orbit, and Tilt",
    goal: "Separate day, year, seasons, and unusual rotations.",
    steps: [
      { title: "Turn on axes", body: "Controls", action: "controls", prompt: "Axes show the direction each planet spins around." },
      { title: "Study Earth", body: "Earth", action: "earth", prompt: "Earth's tilt helps create seasons." },
      { title: "Study Venus", body: "Venus", action: "venus", prompt: "Venus rotates backward compared with most planets." },
      { title: "Study Uranus", body: "Uranus", action: "uranus", prompt: "Uranus rotates on its side, giving it extreme seasons." },
      { title: "Practice motion questions", body: "Quiz", action: "quiz-motion", prompt: "Use the quiz feedback to fix rotation and orbit mistakes." },
    ],
  },
};

const vocabulary = [
  { term: "Orbit", simple: "The path an object follows around another object.", example: "Earth orbits the Sun." },
  { term: "Rotation", simple: "A spin around an axis.", example: "Earth rotates once in about 24 hours." },
  { term: "Axis", simple: "An imaginary line a planet spins around.", example: "Uranus has an axis tilted almost sideways." },
  { term: "Atmosphere", simple: "The layer of gases around a planet.", example: "Venus has a thick carbon dioxide atmosphere." },
  { term: "Gravity", simple: "The pull between objects with mass.", example: "The Sun's gravity keeps planets in orbit." },
  { term: "Fusion", simple: "A process where small atoms join and release energy.", example: "Fusion in the Sun's core makes sunlight." },
  { term: "Year", simple: "The time it takes a planet to orbit the Sun once.", example: "Neptune's year is about 165 Earth years." },
];

const minorBodies = [
  { name: "Ceres", type: "Dwarf planet", region: "Asteroid belt", fact: "The largest object in the asteroid belt and the first dwarf planet visited by a spacecraft." },
  { name: "Pluto", type: "Dwarf planet", region: "Kuiper Belt", fact: "A complex icy world with mountains, plains, and the large moon Charon." },
  { name: "Asteroid Belt", type: "Region", region: "Between Mars and Jupiter", fact: "A broad region containing many rocky bodies, but it is mostly empty space." },
  { name: "Kuiper Belt", type: "Region", region: "Beyond Neptune", fact: "A distant region of icy bodies, dwarf planets, and comet-like objects." },
  { name: "Comets", type: "Small icy bodies", region: "Outer solar system origins", fact: "When comets approach the Sun, ices vaporize and can form a coma and tail." },
];

const majorMoons = [
  { name: "Moon", planet: "Earth", fact: "Stabilizes Earth's tilt and drives ocean tides." },
  { name: "Phobos", planet: "Mars", fact: "A small inner moon slowly spiraling closer to Mars." },
  { name: "Deimos", planet: "Mars", fact: "A small outer moon with a smoother appearance than Phobos." },
  { name: "Europa", planet: "Jupiter", fact: "Likely has a global ocean beneath an icy shell." },
  { name: "Ganymede", planet: "Jupiter", fact: "The largest moon in the solar system." },
  { name: "Titan", planet: "Saturn", fact: "Has a thick atmosphere and methane lakes." },
  { name: "Enceladus", planet: "Saturn", fact: "Shoots water-rich plumes from a subsurface ocean." },
  { name: "Triton", planet: "Neptune", fact: "Neptune's largest moon, orbiting backward compared with Neptune's rotation." },
];

const missionTimeline = [
  { year: "1962", mission: "Mariner 2", target: "Venus", fact: "First successful planetary flyby." },
  { year: "1974", mission: "Mariner 10", target: "Mercury", fact: "First spacecraft to visit Mercury." },
  { year: "1976", mission: "Viking", target: "Mars", fact: "First successful U.S. Mars landers." },
  { year: "1977", mission: "Voyager 1 and 2", target: "Outer planets", fact: "Revealed Jupiter, Saturn, Uranus, Neptune, and many moons in detail." },
  { year: "1990", mission: "Magellan", target: "Venus", fact: "Mapped Venus with radar." },
  { year: "1997", mission: "Cassini-Huygens", target: "Saturn", fact: "Studied Saturn, rings, Titan, and Enceladus." },
  { year: "2004", mission: "MESSENGER", target: "Mercury", fact: "Orbited and mapped Mercury." },
  { year: "2011", mission: "Juno", target: "Jupiter", fact: "Studies Jupiter's atmosphere, gravity, and magnetic field." },
  { year: "2018", mission: "Parker Solar Probe", target: "Sun", fact: "Samples the Sun's outer atmosphere." },
  { year: "2020", mission: "Perseverance", target: "Mars", fact: "Searches for signs of ancient microbial life and collects samples." },
];

const misconceptions = {
  sun: "The Sun is not on fire like wood or coal. Its energy comes from nuclear fusion in the core.",
  mercury: "Mercury is not the hottest planet overall; Venus is hotter because its atmosphere traps heat.",
  venus: "Venus is not Earth's twin in habitability. Its size is similar, but its surface environment is hostile.",
  earth: "Seasons are not caused mainly by distance from the Sun. They are caused by Earth's axial tilt.",
  mars: "Mars is not currently Earth-like. It is cold, dry, and has very thin air.",
  jupiter: "Jupiter does not have a solid surface where people could stand like on Earth.",
  saturn: "Saturn's rings are not solid disks. They are many particles orbiting Saturn.",
  uranus: "Uranus is not strongly striped like Jupiter in visible light; it appears mostly pale blue-green.",
  neptune: "Neptune's older deep-blue images were often enhanced. Its visible color is more subtle.",
};

const STORAGE_KEY = "cosmicDriftClassroomProgressV1";
const progressState = loadProgress();
Object.assign(weakTopics, getCurrentStudent().weakTopics || {});
activePath = getCurrentStudent().currentPath || activePath;
pathStep = getCurrentStudent().pathStep || pathStep;
studentLevel = normalizeStudentLevel(getCurrentStudent().level || studentLevel);
quizScore = getCurrentStudent().quizScore || quizScore;

const bodyEducation = {
  sun: {
    overview: "The Sun is a middle-aged star at the center of the solar system. It contains almost all the mass in the solar system, so its gravity controls the motion of planets, dwarf planets, asteroids, comets, and dust.",
    structure: "It has a core where hydrogen fuses into helium, then radiative and convective zones, followed by the photosphere, chromosphere, and corona. The core is about 15 million C, while the visible surface is about 5,500 C.",
    classroom: "Students should understand that the Sun is not a planet. It is a star, and Earth receives light and heat because the Sun radiates energy outward through space.",
    exploration: "NASA heliophysics missions such as SOHO, SDO, Parker Solar Probe, and Solar Orbiter study solar wind, magnetic fields, sunspots, flares, and coronal mass ejections.",
  },
  mercury: {
    overview: "Mercury is the smallest planet and the closest planet to the Sun. It is a rocky world with a heavily cratered surface that looks somewhat like the Moon.",
    surface: "Because Mercury has almost no atmosphere, it cannot trap heat or protect itself from impacts. Temperatures swing from extremely hot in sunlight to extremely cold at night.",
    classroom: "Mercury has the shortest year, only 88 Earth days, but one rotation takes much longer than an Earth day. Close to the Sun does not mean it is always the hottest planet.",
    exploration: "NASA's Mariner 10 and MESSENGER missions mapped Mercury. ESA/JAXA's BepiColombo mission is also studying it.",
  },
  venus: {
    overview: "Venus is similar in size to Earth but has a very different environment. It is covered by thick clouds and has the hottest surface of any planet.",
    surface: "Its atmosphere is mostly carbon dioxide, creating a runaway greenhouse effect. The pressure at the surface is crushing, and clouds contain sulfuric acid.",
    classroom: "Venus rotates backward compared with most planets. A day on Venus is longer than its year, which helps students separate rotation from revolution.",
    exploration: "NASA's Magellan mission mapped Venus with radar. Earlier Soviet Venera landers returned the first images from its surface.",
  },
  earth: {
    overview: "Earth is the only known planet with life. It has liquid water, a protective atmosphere, a magnetic field, and active geology.",
    surface: "Oceans cover about 71 percent of the surface. Plate tectonics, weather, and the water cycle constantly reshape the planet.",
    classroom: "Earth's 23.4 degree tilt helps create seasons. The Moon stabilizes Earth's tilt and drives ocean tides.",
    exploration: "Earth is studied by many satellites that track weather, climate, oceans, ice, vegetation, and natural hazards.",
  },
  mars: {
    overview: "Mars is a cold, dry rocky planet with rusty iron-rich dust. It is one of the most explored worlds beyond Earth.",
    surface: "Mars has volcanoes, canyons, dried river channels, polar ice caps, dust storms, and evidence that liquid water flowed long ago.",
    classroom: "Mars is a good comparison planet for Earth: it has a similar day length and axial tilt, but its atmosphere is thin and mostly carbon dioxide.",
    exploration: "NASA rovers such as Spirit, Opportunity, Curiosity, and Perseverance have studied rocks, climate history, and possible past habitability.",
  },
  jupiter: {
    overview: "Jupiter is the largest planet. It is a gas giant made mostly of hydrogen and helium, with no solid surface like Earth.",
    atmosphere: "Its colorful bands are fast-moving cloud belts. The Great Red Spot is a huge long-lasting storm larger than Earth.",
    classroom: "Jupiter helps students understand scale: it is far wider than Earth and has many moons, including the four large Galilean moons.",
    exploration: "NASA's Galileo and Juno missions studied Jupiter. Europa, one of its moons, is important because it likely has a subsurface ocean.",
  },
  saturn: {
    overview: "Saturn is a gas giant best known for its bright ring system. The rings are made of countless pieces of ice and rock.",
    atmosphere: "Like Jupiter, Saturn is mostly hydrogen and helium. It is less dense than water, although there is no ocean large enough to float it in.",
    classroom: "Saturn's rings are not solid plates. They are many orbiting particles, divided into bands and gaps.",
    exploration: "NASA/ESA/ASI's Cassini-Huygens mission transformed our understanding of Saturn, its rings, and moons such as Titan and Enceladus.",
  },
  uranus: {
    overview: "Uranus is an ice giant with a pale blue-green color caused by methane in its atmosphere. It is much less visually banded than Jupiter or Saturn.",
    atmosphere: "It contains hydrogen, helium, methane, and icy materials deeper inside. It is extremely cold and has faint rings.",
    classroom: "Uranus is famous for rotating on its side. Its axial tilt is about 98 degrees, so its seasons are extreme and long.",
    exploration: "Voyager 2 is the only spacecraft to fly by Uranus so far. Much of Uranus remains unexplored.",
  },
  neptune: {
    overview: "Neptune is the farthest major planet from the Sun. It is an ice giant with methane in its atmosphere and very strong winds.",
    atmosphere: "Neptune appears blue, but modern NASA color work shows it is not as intensely blue as older enhanced images suggested.",
    classroom: "Neptune has the longest year of the eight planets, about 165 Earth years. It shows students how orbital period increases with distance.",
    exploration: "Voyager 2 flew by Neptune in 1989 and revealed storms, rings, and the large moon Triton.",
  },
};

const levelBodyCopy = {
  junior: {
    sun: {
      fact: "The Sun is our star. It gives Earth light and warmth.",
      overview: "The Sun sits in the middle of our solar system. It is much bigger than every planet.",
      surface: "The Sun is a ball of very hot gas. Never look at the real Sun without special safe glasses.",
      classroom: "The Sun pulls the planets with gravity, so they travel around it.",
      exploration: "Special spacecraft study the Sun so people can learn about solar storms.",
      environment: "Very hot glowing gas.",
      habitability: "People cannot live on the Sun.",
      knownFor: "Our star and the source of daylight.",
      visualCue: "Look for the bright glowing ball at the center.",
    },
    mercury: {
      fact: "Mercury is the closest planet to the Sun.",
      environment: "A small rocky world with many craters.",
      habitability: "People cannot live there without a very strong spacecraft or base.",
      overview: "Mercury is small, rocky, gray, and very close to the Sun.",
      surface: "Its surface has many holes called craters, like the Moon.",
      classroom: "Mercury goes around the Sun faster than any other planet.",
      exploration: "Spacecraft have taken pictures and maps of Mercury.",
      knownFor: "The smallest planet and the nearest planet to the Sun.",
      visualCue: "Look for a gray cratered planet.",
    },
    venus: {
      fact: "Venus is the hottest planet.",
      environment: "A cloudy yellow world with very thick air.",
      habitability: "People cannot live there because it is too hot and the air pressure is crushing.",
      overview: "Venus is about Earth's size, but it is nothing like Earth inside its clouds.",
      surface: "Thick clouds hide the rocky ground below.",
      classroom: "Venus is hotter than Mercury because its thick air traps heat.",
      exploration: "Spacecraft have mapped Venus through its clouds.",
      knownFor: "The hottest planet and Earth's cloudy twin.",
      visualCue: "Look for a smooth pale yellow planet.",
    },
    earth: {
      fact: "Earth is our home planet.",
      environment: "A blue planet with oceans, land, clouds, and air we can breathe.",
      habitability: "Earth is the only planet we know that has life.",
      overview: "Earth has water, air, land, and living things.",
      surface: "Most of Earth is covered by ocean water.",
      classroom: "Earth's tilt helps make seasons.",
      exploration: "Satellites watch Earth to study weather, oceans, and ice.",
      knownFor: "The blue planet and the only known home of life.",
      visualCue: "Look for blue oceans, white clouds, and land.",
    },
    mars: {
      fact: "Mars is called the Red Planet.",
      environment: "A cold dusty world with thin air.",
      habitability: "People would need spacesuits, warm homes, and air tanks.",
      overview: "Mars is rocky, rusty red, cold, and dusty.",
      surface: "Mars has volcanoes, canyons, dry river shapes, and ice at the poles.",
      classroom: "Mars helps us compare another rocky planet with Earth.",
      exploration: "Rovers drive on Mars and study rocks.",
      knownFor: "The Red Planet and a favorite world for rovers.",
      visualCue: "Look for rusty red color and pale polar caps.",
    },
    jupiter: {
      fact: "Jupiter is the biggest planet.",
      environment: "A huge stormy planet made mostly of gas.",
      habitability: "People cannot stand on Jupiter because it has no solid ground like Earth.",
      overview: "Jupiter is enormous and has colorful cloud stripes.",
      surface: "Jupiter has clouds and storms instead of a rocky surface.",
      classroom: "Jupiter shows how huge the outer planets are.",
      exploration: "Spacecraft study Jupiter and its many moons.",
      knownFor: "The biggest planet and the Great Red Spot storm.",
      visualCue: "Look for stripes and a giant storm.",
    },
    saturn: {
      fact: "Saturn is famous for its rings.",
      environment: "A huge gas planet surrounded by bright icy rings.",
      habitability: "People cannot live on Saturn, but some moons are interesting to scientists.",
      overview: "Saturn is a giant planet with beautiful rings.",
      surface: "Saturn has clouds and gas, not a rocky surface to stand on.",
      classroom: "Saturn's rings are many small pieces of ice and rock.",
      exploration: "Cassini studied Saturn, its rings, and its moons.",
      knownFor: "The ringed planet.",
      visualCue: "Look for the wide bright rings.",
    },
    uranus: {
      fact: "Uranus spins on its side.",
      environment: "A cold pale blue-green ice giant.",
      habitability: "People cannot live there because it is extremely cold and has no solid surface.",
      overview: "Uranus is far from the Sun and looks smooth and blue-green.",
      surface: "Uranus is an ice giant with gas outside and icy materials deeper inside.",
      classroom: "Uranus is special because it is tipped almost sideways.",
      exploration: "Voyager 2 is the only spacecraft that has flown by Uranus.",
      knownFor: "The sideways ice giant.",
      visualCue: "Look for a smooth pale blue-green planet with a tilted axis.",
    },
    neptune: {
      fact: "Neptune is the farthest major planet from the Sun.",
      environment: "A very cold blue planet with powerful winds.",
      habitability: "People cannot live there because it is too cold and stormy.",
      overview: "Neptune is a blue ice giant far away from the Sun.",
      surface: "Neptune has deep gas layers and storms, not a ground like Earth.",
      classroom: "Neptune takes a very long time to go around the Sun.",
      exploration: "Voyager 2 flew past Neptune and saw storms and moons.",
      knownFor: "The windy blue world.",
      visualCue: "Look for a blue planet farther out than all the others.",
    },
  },
  high: {
    sun: {
      fact: "The Sun is a main-sequence star whose gravity controls solar-system motion.",
      overview: "The Sun contains almost all solar-system mass, so it dominates planetary orbits and supplies the energy Earth receives.",
      surface: "Its visible photosphere is about 5,500 C, while fusion occurs in a core near 15 million C.",
      classroom: "Use the Sun to separate gravitational structure, radiation, solar wind, and nuclear fusion.",
      exploration: "Heliophysics missions such as SOHO, SDO, Parker Solar Probe, and Solar Orbiter measure fields, plasma, flares, and the corona.",
      environment: "A magnetically active plasma star with layered internal and atmospheric regions.",
      habitability: "Not habitable; it is the energy source that shapes habitability elsewhere.",
      knownFor: "Solar fusion, solar wind, and gravitational control of the system.",
      visualCue: "Look for the central luminous body and remember the glow is a teaching representation.",
    },
  },
};

const space = new SpaceScene(document.querySelector("#space"), {
  onHover(planet) {
    if (!solarTooltip) return;
    solarTooltip.hidden = !planet;
    if (planet) solarTooltip.textContent = `${planet.name.toUpperCase()} - CLICK TO EXPLORE`;
  },
  onSelect(planet) {
    setStage("planet", planet);
  },
});

function setStage(nextStage, planet = selectedPlanet) {
  stage = nextStage;
  selectedPlanet = planet;
  updateCurrentStudent({ lastStage: nextStage, lastBody: planet?.name || (nextStage === "sun" ? "Sun" : "") });
  render();
}

function render() {
  app.innerHTML = "";
  solarTooltip = null;
  document.body.classList.toggle("dyslexia-font", uiState.dyslexiaFont);
  document.body.classList.toggle("reduced-motion", uiState.reducedMotion);
  app.append(createHeader());

  if (stage === "galaxy") renderGalaxy();
  if (stage === "solar") renderSolarSystem();
  if (stage === "sun") renderSun();
  if (stage === "planet" && selectedPlanet) renderPlanet(selectedPlanet);
  if (!eduCollapsed) app.append(createEducatorConsole());
  space.setOptions(uiState);
}

function createHeader() {
  const header = el("header", "site-header");
  const brand = el("button", "brand", "* COSMIC DRIFT");
  brand.addEventListener("click", () => setStage("galaxy", null));

  const nav = el("nav", "nav");
  nav.append(
    navButton("MILKY WAY", stage === "galaxy", () => setStage("galaxy", null)),
    el("span", "nav-separator", "/"),
    navButton("SOLAR SYSTEM", stage === "solar", () => setStage("solar", null)),
    el("span", "nav-separator", "/"),
    navButton("BODY", stage === "planet" || stage === "sun"),
    el("span", "nav-separator", "/"),
    navButton("EDUCATOR CONSOLE", !eduCollapsed, () => {
      eduCollapsed = false;
      render();
    })
  );
  header.append(brand, nav);
  return header;
}

function navButton(label, active, onClick) {
  const button = el("button", `nav-button${active ? " active" : ""}`, label);
  if (onClick) button.addEventListener("click", onClick);
  else button.disabled = true;
  return button;
}

function renderGalaxy() {
  space.setMode("galaxy");

  const scene = el("main", "scene galaxy-scene");
  const copy = el("section", "galaxy-copy");
  const intro = levelSceneCopy();
  copy.append(
    el("p", "kicker", intro.kicker),
    html("h1", intro.heading),
    el("p", "lead", intro.lead)
  );

  const enter = el("button", "pill", "ZOOM TO OUR SOLAR SYSTEM");
  enter.append(el("span", "", "->"));
  enter.addEventListener("click", () => {
    copy.classList.add("is-fading");
    space.beginGalaxyZoom();
    window.setTimeout(() => setStage("solar", null), 1250);
  });
  copy.append(enter);
  scene.append(copy);
  app.append(scene);
}

function renderSolarSystem() {
  space.setMode("solar");

  const scene = el("main", "scene solar-scene");
  const heading = el("section", "solar-heading");
  heading.append(el("p", "kicker", levelPrompt("MOVE YOUR CURSOR - CLICK A PLANET")), el("h1", "", levelTitle("Our Solar System")));

  solarTooltip = el("div", "tooltip");
  solarTooltip.hidden = true;
  scene.append(heading, solarTooltip);
  app.append(scene);
}

function renderSun() {
  space.setMode("sun");
  const content = getBodyLevelContent("sun");

  const scene = el("main", "scene planet-scene");
  const copy = el("section", "planet-copy");
  const back = el("button", "back", "<- BACK TO SOLAR SYSTEM");
  back.addEventListener("click", () => setStage("solar", null));

  copy.append(
    back,
    el("p", "kicker", "STAR 01 / 01"),
    el("h1", "", "Sun"),
    el("p", "fact", content.fact),
    createSunStats(),
    createSunInfo(content),
    el("p", "drag-hint", "THE SUN VIEW IS A TEACHING-SCALE REPRESENTATION")
  );
  scene.append(copy);
  app.append(scene);
}

function renderPlanet(planet) {
  space.setMode("planet", planet);
  const content = getBodyLevelContent(planet.id, planet);

  const scene = el("main", "scene planet-scene");
  const copy = el("section", "planet-copy");
  const back = el("button", "back", "<- BACK TO SOLAR SYSTEM");
  back.addEventListener("click", () => setStage("solar", null));

  copy.append(
    back,
    el("p", "kicker", `PLANET ${String(planets.indexOf(planet) + 1).padStart(2, "0")} / 08`),
    el("h1", "", planet.name),
    el("p", "fact", content.fact),
    createStats(planet),
    createPlanetIdentity(planet, content),
    createInfo(planet, content),
    el("p", "drag-hint", "DRAG THE PLANET TO ROTATE")
  );
  scene.append(copy);
  app.append(scene);
}

function createPlanetIdentity(planet, content = getBodyLevelContent(planet.id, planet)) {
  const card = el("section", "identity-card");
  const header = el("div", "identity-header");
  const swatch = el("span", "planet-swatch");
  swatch.style.background = `linear-gradient(135deg, ${planet.color}, ${planet.ring || visualTuning[planet.id].tint})`;
  header.append(swatch, el("div", "", levelValue(planet.publicName, planet.publicName, content.knownFor)));
  const facts = el("div", "identity-grid");
  facts.append(
    identityItem(levelValue("Color", "Original color", "Observed color"), levelValue(simpleColor(planet.naturalColor), planet.naturalColor, planet.naturalColor)),
    identityItem(levelValue("Famous for", "Known for", "Distinctive evidence"), content.knownFor),
    identityItem(levelValue("Look at", "Look for", "Model cue"), content.visualCue)
  );
  card.append(header, facts);
  return card;
}

function identityItem(label, value) {
  const item = el("div", "identity-item");
  item.append(el("p", "label", label), el("p", "", value));
  return item;
}

function createStats(planet) {
  const index = planets.indexOf(planet) + 1;
  const orbitalPeriods = {
    earth: "365 d",
    mercury: "88 d",
    venus: "225 d",
    mars: "687 d",
    jupiter: "12 y",
    saturn: "29 y",
    uranus: "84 y",
    neptune: "165 y",
  };
  const stats = el("dl", "stats");
  stats.append(
    stat(levelValue("Moons", "Moons", "Natural satellites"), String(planet.moons)),
    stat(levelValue("Place", "Position", "Solar order"), `${index}${ordinal(index)}`),
    stat(levelValue("Year", "Orbits Sun", "Orbital period"), orbitalPeriods[planet.id])
  );
  return stats;
}

function createSunStats() {
  const stats = el("dl", "stats");
  stats.append(
    stat("Type", "Star"),
    stat(levelValue("Size", "Diameter", "Diameter"), "1.4M km"),
    stat(levelValue("Hottest Part", "Core Temp", "Core temp"), "15M C")
  );
  return stats;
}

function stat(label, value) {
  const item = el("div", "stat");
  item.append(el("p", "label", label), el("strong", "", value));
  return item;
}

function createInfo(planet, content = getBodyLevelContent(planet.id, planet)) {
  const list = el("div", "info-list");
  const facts = nasaFacts[planet.id];
  list.append(
    infoBlock(levelValue("What it is like", "Environment", "Environment and constraints"), content.environment),
    infoBlock(levelValue("Could people live there?", "Chances of Human Life", "Habitability assessment"), content.habitability),
    infoBlock(levelValue("Quick numbers", "NASA Data", "NASA physical data"), levelNasaData(planet, facts)),
    infoBlock(levelValue("Big idea", "Overview", "Overview"), content.overview),
    infoBlock(levelValue("Ground or air", "Surface or Atmosphere", "Surface or atmosphere"), content.surface),
    infoBlock(levelValue("Teacher clue", "Classroom Explanation", "Learning focus"), content.classroom),
    infoBlock(levelValue("Space missions", "Exploration", "Exploration evidence"), content.exploration),
    infoBlock(levelValue("Model note", "Model Note", "Visualization limitation"), levelModelNote(planet, facts))
  );
  return list;
}

function createSunInfo(content = getBodyLevelContent("sun")) {
  const list = el("div", "info-list");
  list.append(
    infoBlock(levelValue("Big idea", "Overview", "Overview"), content.overview),
    infoBlock(levelValue("Inside", "Structure", "Solar structure"), content.surface),
    infoBlock(levelValue("Teacher clue", "Classroom Explanation", "Learning focus"), content.classroom),
    infoBlock(levelValue("Space missions", "Exploration", "Exploration evidence"), content.exploration),
    infoBlock(levelValue("Safety", "Safety Note", "Observation safety"), levelValue("Never look straight at the real Sun. Use safe solar glasses or this app.", "Never look directly at the real Sun without certified solar viewing equipment. The app view is a safe visualization.", "Direct solar observation requires certified filters; this app is a safe visualization, not an observing tool."))
  );
  return list;
}

function normalizeStudentLevel(level) {
  if (level === "advanced") return "high";
  return learnerLevels[level] ? level : "junior";
}

function currentLevel() {
  studentLevel = normalizeStudentLevel(studentLevel);
  return studentLevel;
}

function levelValue(junior, middle, high) {
  const level = currentLevel();
  if (level === "junior") return junior;
  if (level === "high") return high;
  return middle;
}

function levelTitle(text) {
  if (currentLevel() === "junior") return text.replace("Solar System", "Solar System Home");
  if (currentLevel() === "high") return `${text}: Scaled Interactive Model`;
  return text;
}

function levelPrompt(text) {
  if (currentLevel() === "junior") return "CLICK A PLANET TO LEARN";
  if (currentLevel() === "high") return "INSPECT THE MODEL - CLICK A BODY FOR DATA";
  return text;
}

function levelSceneCopy() {
  return {
    kicker: levelValue("OUR GALAXY HAS MANY STARS", "100,000 LIGHT-YEARS ACROSS - 400 BILLION STARS", "MILKY WAY CONTEXT - SCALE IS COMPRESSED FOR CLASSROOM USE"),
    heading: levelValue("The <em>Milky Way</em>", "The <em>Milky Way</em>", "The <em>Milky Way</em>"),
    lead: levelValue(
      "Our Sun is one star in the Milky Way. Earth and the other planets travel around the Sun.",
      "Somewhere on the Orion Arm, a small yellow star carries eight wanderers around it. That is home.",
      "The solar system sits in the Orion Arm of the Milky Way. This opening view sets galactic context before the model zooms to planetary scale."
    ),
  };
}

function getBodyLevelContent(id, planet = planets.find((item) => item.id === id)) {
  const level = currentLevel();
  const edu = bodyEducation[id];
  const junior = levelBodyCopy.junior[id];
  const high = levelBodyCopy.high[id];
  if (level === "junior" && junior) return junior;
  if (level === "high") return high || createHighBodyContent(id, planet, edu);
  if (id === "sun") {
    return {
      fact: sunBody.fact,
      environment: "A hot plasma star with strong gravity, magnetic fields, and solar wind.",
      habitability: "The Sun is not habitable, but its energy affects habitability throughout the solar system.",
      overview: edu.overview,
      surface: edu.structure,
      classroom: edu.classroom,
      exploration: edu.exploration,
      knownFor: "The star that powers and anchors the solar system.",
      visualCue: "Look for the glowing center of the model.",
    };
  }
  return {
    fact: planet.fact,
    environment: planet.environment,
    habitability: planet.habitability,
    overview: edu.overview,
    surface: edu.surface || edu.atmosphere,
    classroom: edu.classroom,
    exploration: edu.exploration,
    knownFor: planet.knownFor,
    visualCue: planet.visualCue,
  };
}

function createHighBodyContent(id, planet, edu) {
  const facts = nasaFacts[id];
  return {
    fact: `${planet.fact} Use the data below to connect appearance, motion, and environment.`,
    environment: `${planet.environment} Key constraints include gravity ${facts.gravity}, atmosphere: ${facts.atmosphere}, and mean temperature ${facts.meanTemp}.`,
    habitability: `${planet.habitability} Evaluate this using atmosphere, temperature, gravity, radiation exposure, and available volatiles.`,
    overview: edu.overview,
    surface: edu.surface || edu.atmosphere,
    classroom: `${edu.classroom} Ask students to cite one visual clue and one numerical data point as evidence.`,
    exploration: edu.exploration,
    knownFor: planet.knownFor,
    visualCue: `${planet.visualCue} Compare the visual cue with the NASA data and the model limitation note.`,
  };
}

function levelNasaData(planet, facts) {
  if (currentLevel() === "junior") {
    const moonText = planet.moons === 0 ? "a planet with no moons" : `a planet with ${planet.moons} moon${planet.moons === 1 ? "" : "s"}`;
    return `${planet.name} is ${moonText}. Its year is ${Math.round(facts.orbitalDays).toLocaleString()} Earth days.`;
  }
  if (currentLevel() === "high") {
    return `Diameter ${facts.diameterKm.toLocaleString()} km; gravity ${facts.gravity}; atmosphere: ${facts.atmosphere}; mean temperature ${facts.meanTemp}; rotation period ${Math.abs(facts.rotationHours)} hours; orbital period ${facts.orbitalDays.toLocaleString()} Earth days.`;
  }
  return `Diameter ${facts.diameterKm.toLocaleString()} km. Gravity ${facts.gravity}. Atmosphere: ${facts.atmosphere}. Mean temperature ${facts.meanTemp}.`;
}

function levelModelNote(planet, facts) {
  if (currentLevel() === "junior") {
    return "The model makes planets big enough and close enough to see in class. Real space is much larger.";
  }
  if (currentLevel() === "high") {
    return `The model uses NASA/JPL texture maps and real axial tilt (${facts.axialTiltDeg} degrees), rotation period (${Math.abs(facts.rotationHours)} hours), and orbital period (${facts.orbitalDays.toLocaleString()} Earth days), but size, distance, lighting, and time are compressed for instruction.`;
  }
  return `This view uses a NASA/JPL texture map, axial tilt ${facts.axialTiltDeg} degrees, rotation period ${Math.abs(facts.rotationHours)} hours, and orbital period ${facts.orbitalDays.toLocaleString()} Earth days.`;
}

function simpleColor(value) {
  return value.split(",")[0];
}

function infoBlock(label, value) {
  const block = el("section", "");
  const why = el("button", "why-button", "Why?");
  const note = el("p", "edu-note hidden", whyForFact(label, value));
  why.addEventListener("click", () => note.classList.toggle("hidden"));
  block.append(el("p", "label", label), el("p", "", value), why, note);
  return block;
}

function whyForFact(label, value) {
  if (currentLevel() === "junior") {
    const lowerJunior = `${label} ${value}`.toLowerCase();
    if (lowerJunior.includes("gravity") || lowerJunior.includes("pull")) return "Pull matters because it keeps planets and moons moving in paths.";
    if (lowerJunior.includes("air") || lowerJunior.includes("atmosphere")) return "Air matters because it can keep heat in and protect a planet.";
    if (lowerJunior.includes("temperature") || lowerJunior.includes("hot") || lowerJunior.includes("cold")) return "Hot and cold tell us if a place is safe for living things.";
    if (lowerJunior.includes("model")) return "The app makes space smaller so we can see it on a screen.";
    return "This helps explain what makes this world special.";
  }
  if (currentLevel() === "high") {
    const lowerHigh = `${label} ${value}`.toLowerCase();
    if (lowerHigh.includes("gravity")) return "Gravity links mass, orbital motion, atmospheric retention, ring systems, and mission design constraints.";
    if (lowerHigh.includes("atmosphere")) return "Atmospheric composition and pressure control greenhouse behavior, weather, radiation shielding, and surface stability.";
    if (lowerHigh.includes("model")) return "The visualization mixes real measurements with compressed scale; students should separate evidence from representation.";
  }
  const lower = `${label} ${value}`.toLowerCase();
  if (lower.includes("gravity")) return "Gravity is included because it controls weight, atmosphere retention, moons, rings, and orbital motion.";
  if (lower.includes("atmosphere")) return "Atmosphere matters because gas pressure and composition affect temperature, weather, surface conditions, and habitability.";
  if (lower.includes("temperature")) return "Temperature helps students compare distance from the Sun with atmosphere effects such as the greenhouse effect.";
  if (lower.includes("tilt") || lower.includes("rotation")) return "Rotation and tilt explain day length, seasons, unusual spins, and what the moving 3D model is showing.";
  if (lower.includes("exploration")) return "Missions are included so students can connect classroom facts with real observations from spacecraft.";
  if (lower.includes("model")) return "Model notes separate real NASA data from classroom scaling, which keeps the visualization honest for teaching.";
  if (lower.includes("life") || lower.includes("habitability")) return "Habitability is evidence-based: water, temperature, atmosphere, radiation protection, chemistry, and energy all matter.";
  return "This fact is shown because it helps explain what the body is made of, how it moves, or why it looks the way it does.";
}

function ordinal(value) {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = value % 100;
  return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
}

function el(tag, className = "", text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function html(tag, markup) {
  const node = document.createElement(tag);
  node.innerHTML = markup;
  return node;
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && saved.students) return saved;
  } catch {}
  return {
    className: "Local Classroom",
    currentStudent: "Guest Student",
    students: {
      "Guest Student": createStudentRecord("Guest Student"),
    },
    customQuestions: [],
    assignments: { path: "first-tour", quizTopic: "all" },
  };
}

function createStudentRecord(name) {
  return {
    name,
    level: "junior",
    currentPath: "first-tour",
    pathStep: 0,
    completedPaths: [],
    quizAttempts: [],
    weakTopics: {},
    badges: [],
    lastStage: "galaxy",
    lastBody: "",
    quizScore: 0,
  };
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
}

function getCurrentStudent() {
  const name = progressState.currentStudent || "Guest Student";
  if (!progressState.students[name]) progressState.students[name] = createStudentRecord(name);
  return progressState.students[name];
}

function updateCurrentStudent(patch) {
  Object.assign(getCurrentStudent(), patch);
  saveProgress();
}

function switchStudent(name) {
  const clean = name.trim() || "Guest Student";
  progressState.currentStudent = clean;
  if (!progressState.students[clean]) progressState.students[clean] = createStudentRecord(clean);
  const record = getCurrentStudent();
  activePath = record.currentPath || activePath;
  pathStep = record.pathStep || 0;
  studentLevel = normalizeStudentLevel(record.level || "junior");
  quizScore = record.quizScore || 0;
  Object.keys(weakTopics).forEach((key) => delete weakTopics[key]);
  Object.assign(weakTopics, record.weakTopics || {});
  saveProgress();
  render();
}

function recordPathProgress() {
  updateCurrentStudent({ currentPath: activePath, pathStep, level: studentLevel });
}

function completeCurrentPath() {
  const record = getCurrentStudent();
  if (!record.completedPaths.includes(activePath)) record.completedPaths.push(activePath);
  addBadge(`${learningPaths[activePath].title} Complete`);
  record.pathStep = pathStep;
  saveProgress();
}

function addBadge(label) {
  const record = getCurrentStudent();
  if (!record.badges.includes(label)) record.badges.push(label);
  saveProgress();
}

function recordQuizAttempt(item, selected, correct) {
  const record = getCurrentStudent();
  record.quizAttempts.push({
    at: new Date().toISOString(),
    body: item.body,
    question: item.q,
    selected,
    answer: item.answer,
    correct,
  });
  record.quizScore = quizScore;
  record.weakTopics = { ...weakTopics };
  if (correct && getMasteryForTopic(item.body, record) >= 80) addBadge(`${item.body} Master`);
  saveProgress();
}

function getMasteryForTopic(topic, record = getCurrentStudent()) {
  const attempts = record.quizAttempts.filter((attempt) => topic === "All" || attempt.body === topic);
  if (!attempts.length) return 0;
  const correct = attempts.filter((attempt) => attempt.correct).length;
  return Math.round((correct / attempts.length) * 100);
}

function getTopicSummary(record = getCurrentStudent()) {
  const topics = ["Sun", ...planets.map((planet) => planet.name), "Motion", "Habitability", "Rocky planets", "Gas giants"];
  return topics.map((topic) => ({
    topic,
    mastery: getMasteryForTopic(topic, record),
    weak: record.weakTopics[topic] || 0,
  }));
}

function createEducatorConsole() {
  const consoleWrap = el("aside", "edu-console");
  const tabs = el("div", "edu-tabs");
  const tabDefs = [
    ["student", "Student Mode"],
    ["dashboard", "Teacher Dashboard"],
    ["lessons", "Lesson Paths"],
    ["controls", "Controls"],
    ["quiz", "Quiz"],
    ["compare", "Compare"],
    ["sim", "Simulations"],
    ["explore", "Explore More"],
    ["sources", "Sources"],
    ["access", "Accessibility"],
    ["product", "Product"],
    ["qa", "Quality"],
  ];
  tabDefs.forEach(([id, label]) => {
    const button = el("button", activePanel === id ? "edu-tab active" : "edu-tab", label);
    button.addEventListener("click", () => {
      activePanel = id;
      render();
    });
    tabs.append(button);
  });
  const collapse = el("button", "edu-close", "×");
  collapse.setAttribute("aria-label", "Close educator console");
  collapse.setAttribute("title", "Close");
  collapse.addEventListener("click", () => {
    eduCollapsed = true;
    render();
  });

  const body = el("div", "edu-body");
  if (activePanel === "student") body.append(createStudentPanel());
  if (activePanel === "dashboard") body.append(createDashboardPanel());
  if (activePanel === "lessons") body.append(createLessonsPanel());
  if (activePanel === "controls") body.append(createControlsPanel());
  if (activePanel === "quiz") body.append(createQuizPanel());
  if (activePanel === "compare") body.append(createComparePanel());
  if (activePanel === "sim") body.append(createSimulationsPanel());
  if (activePanel === "explore") body.append(createExplorePanel());
  if (activePanel === "sources") body.append(createSourcesPanel());
  if (activePanel === "access") body.append(createAccessPanel());
  if (activePanel === "product") body.append(createProductPanel());
  if (activePanel === "qa") body.append(createQaPanel());
  consoleWrap.append(collapse, tabs, body);
  return consoleWrap;
}

function createStudentPanel() {
  studentLevel = currentLevel();
  const panel = el("section", "edu-panel student-panel");
  panel.append(el("h2", "", "Student Mode"), el("p", "edu-muted", learnerLevels[studentLevel].description));
  panel.append(createProfileCard());

  panel.append(el("h3", "", "Explain Like I Am"));
  const levels = el("div", "segmented");
  Object.entries(learnerLevels).forEach(([id, level]) => {
    const button = el("button", studentLevel === id ? "segment active" : "segment", level.label);
    button.addEventListener("click", () => {
      studentLevel = normalizeStudentLevel(id);
      updateCurrentStudent({ level: studentLevel });
      render();
    });
    levels.append(button);
  });
  panel.append(levels);

  const pathPicker = el("div", "path-picker");
  Object.entries(learningPaths).forEach(([id, path]) => {
    const button = el("button", activePath === id ? "path-card active" : "path-card");
    button.append(el("strong", "", levelPathTitle(path.title)), el("span", "", adaptText(path.goal)));
    button.addEventListener("click", () => {
      activePath = id;
      pathStep = 0;
      recordPathProgress();
      render();
    });
    pathPicker.append(button);
  });
  panel.append(el("h3", "", levelValue("Learning Trips", "Guided Learning Paths", "Guided Lesson Paths")), pathPicker);

  const path = learningPaths[activePath];
  const step = path.steps[pathStep];
  const progress = el("div", "path-progress");
  progress.style.setProperty("--progress", `${((pathStep + 1) / path.steps.length) * 100}%`);
  const stepCard = el("div", "student-card");
  stepCard.append(
    el("p", "edu-muted", `Step ${pathStep + 1} of ${path.steps.length}`),
    el("h3", "", step.title),
    el("p", "", adaptText(step.prompt))
  );
  const stepActions = el("div", "edu-actions");
  const show = el("button", "small-button", "Show Me");
  show.addEventListener("click", () => runPathAction(step.action));
  const previous = el("button", "small-button", "Back");
  previous.disabled = pathStep === 0;
  previous.addEventListener("click", () => {
    pathStep = Math.max(0, pathStep - 1);
    recordPathProgress();
    render();
  });
  const next = el("button", "small-button", pathStep === path.steps.length - 1 ? "Finish Path" : "Next Step");
  next.addEventListener("click", () => {
    if (pathStep === path.steps.length - 1) completeCurrentPath();
    else pathStep = Math.min(path.steps.length - 1, pathStep + 1);
    recordPathProgress();
    render();
  });
  stepActions.append(show, previous, next);
  stepCard.append(progress, stepActions);
  panel.append(stepCard);

  panel.append(createVocabularyHelper());
  panel.append(createWeakTopicCard());
  return panel;
}

function createProfileCard() {
  const record = getCurrentStudent();
  const card = el("div", "student-card");
  card.append(el("h3", "", "Student Profile"));
  const row = el("div", "profile-row");
  const name = document.createElement("input");
  name.className = "text-input";
  name.value = progressState.currentStudent;
  name.placeholder = "Student name";
  const className = document.createElement("input");
  className.className = "text-input";
  className.value = progressState.className;
  className.placeholder = "Classroom name";
  const save = el("button", "small-button", "Save Profile");
  save.addEventListener("click", () => {
    progressState.className = className.value.trim() || "Local Classroom";
    switchStudent(name.value);
  });
  row.append(name, className, save);
  card.append(row);
  const stats = el("p", "edu-muted", `${record.completedPaths.length} completed path${record.completedPaths.length === 1 ? "" : "s"} | ${record.quizAttempts.length} quiz attempt${record.quizAttempts.length === 1 ? "" : "s"} | ${record.badges.length} badge${record.badges.length === 1 ? "" : "s"}`);
  card.append(stats);
  const resume = el("button", "small-button", "Resume Last View");
  resume.addEventListener("click", resumeStudentProgress);
  card.append(resume);

  const mastery = el("div", "mastery-grid");
  getTopicSummary(record).forEach(({ topic, mastery: score, weak }) => {
    const item = el("div", "mastery-item");
    item.append(el("span", "", topic), el("strong", "", `${score}%`), el("small", "", weak ? `${weak} weak signal${weak === 1 ? "" : "s"}` : "No weak signals"));
    mastery.append(item);
  });
  card.append(el("h3", "", "Mastery by Topic"), mastery);
  if (record.badges.length) {
    const badges = el("div", "badge-row");
    record.badges.forEach((badge) => badges.append(el("span", "badge", badge)));
    card.append(badges);
  }
  return card;
}

function resumeStudentProgress() {
  const record = getCurrentStudent();
  if (record.lastStage === "sun") {
    setStage("sun", null);
    return;
  }
  if (record.lastStage === "planet" && record.lastBody) {
    openBodyByName(record.lastBody);
    return;
  }
  setStage(record.lastStage || "solar", null);
}

function adaptText(text) {
  if (currentLevel() === "junior") {
    return text
      .replace("atmosphere", "air around a planet")
      .replace("Atmosphere", "Air")
      .replace("rotates", "spins")
      .replace("rotation", "spin")
      .replace("orbit", "path around the Sun")
      .replace("Orbit", "Path")
      .replace("gravity", "pull");
  }
  if (currentLevel() === "high") {
    return `${text} Look for evidence in the NASA data and model note.`;
  }
  return text;
}

function levelPathTitle(title) {
  if (currentLevel() === "junior") {
    return title
      .replace("First Solar System Tour", "First Space Trip")
      .replace("Earth and Mars Comparison", "Earth and Mars")
      .replace("Rotation, Orbit, and Tilt", "Spinning and Moving");
  }
  if (currentLevel() === "high") return `${title}: Evidence Path`;
  return title;
}

function createVocabularyHelper() {
  const wrap = el("div", "student-card");
  wrap.append(el("h3", "", "Vocabulary Helper"));
  const grid = el("div", "vocab-grid");
  vocabulary.forEach((item) => {
    const card = el("details", "vocab-card");
    const summary = el("summary", "", item.term);
    card.append(summary, el("p", "", item.simple), el("p", "edu-note", item.example));
    grid.append(card);
  });
  wrap.append(grid);
  return wrap;
}

function createWeakTopicCard() {
  const wrap = el("div", "student-card");
  wrap.append(el("h3", "", "Practice Coach"));
  const entries = Object.entries(weakTopics).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]);
  if (!entries.length) {
    wrap.append(el("p", "edu-muted", "No weak topics yet. Take a quiz and this area will recommend what to review."));
    return wrap;
  }
  const list = el("ul", "edu-list");
  entries.slice(0, 4).forEach(([topic, count]) => {
    const item = el("li", "", `${topic}: review recommended after ${count} missed question${count > 1 ? "s" : ""}.`);
    list.append(item);
  });
  const actions = el("div", "edu-actions");
  const topic = entries[0][0];
  const review = el("button", "small-button", `Review ${topic}`);
  review.addEventListener("click", () => openBodyByName(topic));
  const practice = el("button", "small-button", `Quiz ${topic}`);
  practice.addEventListener("click", () => {
    quizTopic = topic.toLowerCase();
    quizIndex = 0;
    quizFeedback = null;
    activePanel = "quiz";
    render();
  });
  actions.append(review, practice);
  wrap.append(list, actions);
  return wrap;
}

function createDashboardPanel() {
  const panel = el("section", "edu-panel");
  panel.append(el("h2", "", "Teacher Dashboard"), el("p", "edu-muted", `${progressState.className} | ${Object.keys(progressState.students).length} local learner profile${Object.keys(progressState.students).length === 1 ? "" : "s"}`));

  const weakSummary = el("div", "student-card");
  weakSummary.append(el("h3", "", "Common Weak Topics"));
  const weakList = el("ul", "edu-list");
  const classWeakTopics = Object.values(progressState.students).reduce((summary, student) => {
    Object.entries(student.weakTopics).forEach(([topic, count]) => {
      summary[topic] = (summary[topic] || 0) + count;
    });
    return summary;
  }, {});
  const sortedWeakTopics = Object.entries(classWeakTopics).sort((a, b) => b[1] - a[1]);
  if (sortedWeakTopics.length) {
    sortedWeakTopics.slice(0, 5).forEach(([topic, count]) => weakList.append(el("li", "", `${topic}: ${count} missed answer${count === 1 ? "" : "s"} across the class.`)));
  } else {
    weakList.append(el("li", "", "No weak topics recorded yet. Run a quiz to build this view."));
  }
  weakSummary.append(weakList);
  panel.append(weakSummary);

  const table = el("table", "compare-table");
  const rows = Object.values(progressState.students).map((student) => `
    <tr>
      <td>${student.name}</td>
      <td>${student.completedPaths.length}</td>
      <td>${student.quizAttempts.length}</td>
      <td>${getMasteryForTopic("All", student)}%</td>
      <td>${Object.entries(student.weakTopics).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"}</td>
    </tr>`).join("");
  table.innerHTML = `<thead><tr><th>Student</th><th>Paths</th><th>Attempts</th><th>Mastery</th><th>Weak topic</th></tr></thead><tbody>${rows}</tbody>`;
  panel.append(table);

  const assignment = el("div", "student-card");
  assignment.append(el("h3", "", "Assign Path or Quiz"));
  const controls = el("div", "profile-row");
  const pathSelect = document.createElement("select");
  pathSelect.className = "planet-select";
  Object.entries(learningPaths).forEach(([id, path]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = path.title;
    option.selected = progressState.assignments.path === id;
    pathSelect.append(option);
  });
  const topicSelect = document.createElement("select");
  topicSelect.className = "planet-select";
  [["all", "All bodies"], ["motion", "Motion"], ["sun", "Sun"], ...planets.map((planet) => [planet.id, planet.name])].forEach(([id, label]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = label;
    option.selected = progressState.assignments.quizTopic === id;
    topicSelect.append(option);
  });
  const assign = el("button", "small-button", "Save Assignment");
  assign.addEventListener("click", () => {
    progressState.assignments.path = pathSelect.value;
    progressState.assignments.quizTopic = topicSelect.value;
    activePath = pathSelect.value;
    quizTopic = topicSelect.value;
    saveProgress();
    render();
  });
  controls.append(pathSelect, topicSelect, assign);
  assignment.append(controls);
  panel.append(assignment);

  panel.append(createCustomQuestionForm());
  const actions = el("div", "edu-actions");
  const exportCsv = el("button", "small-button", "Export CSV");
  exportCsv.addEventListener("click", exportProgressCsv);
  const printReport = el("button", "small-button", "Print / Save PDF Report");
  printReport.addEventListener("click", () => window.print());
  const worksheet = el("button", "small-button", "Print Worksheet");
  worksheet.addEventListener("click", printWorksheet);
  actions.append(exportCsv, printReport, worksheet);
  panel.append(actions);
  panel.append(createPassportCard());
  return panel;
}

function createCustomQuestionForm() {
  const card = el("div", "student-card");
  card.append(el("h3", "", "Create Custom Question"));
  const grid = el("div", "custom-question-grid");
  const body = document.createElement("select");
  body.className = "planet-select";
  ["Sun", ...planets.map((planet) => planet.name)].forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    body.append(option);
  });
  const q = input("Question");
  const choices = input("Choices separated by |");
  const answer = input("Correct answer");
  const save = el("button", "small-button", "Add Question");
  save.addEventListener("click", () => {
    const choiceList = choices.value.split("|").map((item) => item.trim()).filter(Boolean);
    if (!q.value.trim() || choiceList.length < 2 || !answer.value.trim()) return;
    progressState.customQuestions.push({ body: body.value, q: q.value.trim(), choices: choiceList, answer: answer.value.trim() });
    saveProgress();
    render();
  });
  grid.append(body, q, choices, answer, save);
  card.append(grid, el("p", "edu-note", `${progressState.customQuestions.length} custom question${progressState.customQuestions.length === 1 ? "" : "s"} saved locally.`));
  return card;
}

function input(placeholder) {
  const node = document.createElement("input");
  node.className = "text-input";
  node.placeholder = placeholder;
  return node;
}

function exportProgressCsv() {
  const header = ["student", "completed_paths", "quiz_attempts", "mastery_percent", "weak_topics", "badges"];
  const lines = [header.join(",")];
  Object.values(progressState.students).forEach((student) => {
    lines.push([
      csv(student.name),
      student.completedPaths.length,
      student.quizAttempts.length,
      getMasteryForTopic("All", student),
      csv(Object.entries(student.weakTopics).map(([topic, count]) => `${topic}:${count}`).join("; ")),
      csv(student.badges.join("; ")),
    ].join(","));
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "cosmic-drift-progress.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

function csv(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function printWorksheet() {
  const path = learningPaths[activePath];
  const html = `
    <h1>Cosmic Drift Worksheet</h1>
    <h2>${path.title}</h2>
    <p>${path.goal}</p>
    <ol>${path.steps.map((step) => `<li><strong>${step.title}</strong>: ${step.prompt}</li>`).join("")}</ol>
    <h3>Answer in complete sentences</h3>
    <p>1. What did you learn about the Sun?</p>
    <p>2. Which planet surprised you most? Why?</p>
    <p>3. What is one model limitation?</p>`;
  const win = window.open("", "_blank");
  win.document.write(`<html><head><title>Worksheet</title></head><body>${html}</body></html>`);
  win.document.close();
  win.print();
}

function createPassportCard() {
  const record = getCurrentStudent();
  const card = el("div", "student-card");
  card.append(el("h3", "", "Planet Passport"));
  const bodies = ["Sun", ...planets.map((planet) => planet.name)];
  const grid = el("div", "passport-grid");
  bodies.forEach((body) => {
    const mastery = getMasteryForTopic(body, record);
    const stamp = el("div", mastery >= 60 ? "passport-stamp earned" : "passport-stamp");
    stamp.append(el("strong", "", body), el("span", "", `${mastery}% mastery`));
    grid.append(stamp);
  });
  card.append(grid);
  return card;
}

function runPathAction(action) {
  if (action === "sun") return setStage("sun", null);
  if (action === "quiz") {
    activePanel = "quiz";
    quizTopic = "all";
    quizFeedback = null;
    return render();
  }
  if (action === "compare") {
    activePanel = "compare";
    return render();
  }
  if (action === "controls") {
    activePanel = "controls";
    return render();
  }
  if (action === "quiz-mars") {
    activePanel = "quiz";
    quizTopic = "mars";
    quizIndex = 0;
    quizFeedback = null;
    return render();
  }
  if (action === "quiz-motion") {
    activePanel = "quiz";
    quizTopic = "motion";
    quizIndex = 0;
    quizFeedback = null;
    return render();
  }
  const planet = planets.find((item) => item.id === action);
  if (planet) setStage("planet", planet);
}

function openBodyByName(name) {
  if (name.toLowerCase() === "sun") return setStage("sun", null);
  const planet = planets.find((item) => item.name.toLowerCase() === name.toLowerCase() || item.id === name.toLowerCase());
  if (planet) setStage("planet", planet);
}

function createLessonsPanel() {
  const panel = el("section", "edu-panel");
  const lessonTabs = el("div", "segmented");
  Object.entries(lessons).forEach(([id, lesson]) => {
    const button = el("button", activeLesson === id ? "segment active" : "segment", lesson.title);
    button.addEventListener("click", () => {
      activeLesson = id;
      render();
    });
    lessonTabs.append(button);
  });
  const lesson = lessons[activeLesson];
  panel.append(el("h2", "", levelPathTitle(lesson.title)), el("p", "edu-muted", `${levelValue("Young learners", lesson.grade, "High school / advanced")} | ${levelValue("Goal", "Objective", "Evidence objective")}: ${adaptText(lesson.objective)}`), lessonTabs);
  const steps = el("ol", "edu-list");
  lesson.steps.forEach((step) => steps.append(el("li", "", adaptText(step))));
  const prompts = el("ul", "edu-list");
  lesson.prompts.forEach((prompt) => prompts.append(el("li", "", adaptText(prompt))));
  panel.append(el("h3", "", levelValue("Class Steps", "Class Flow", "Teaching Sequence")), steps, el("h3", "", levelValue("Ask Students", "Discussion Prompts", "Evidence Prompts")), prompts);
  const actions = el("div", "edu-actions");
  const sun = el("button", "small-button", "Open Sun");
  sun.addEventListener("click", () => setStage("sun", null));
  const solar = el("button", "small-button", "Open Solar System");
  solar.addEventListener("click", () => setStage("solar", null));
  const earth = el("button", "small-button", "Open Earth");
  earth.addEventListener("click", () => setStage("planet", planets.find((planet) => planet.id === "earth")));
  actions.append(sun, solar, earth);
  panel.append(actions);
  return panel;
}

function createControlsPanel() {
  const panel = el("section", "edu-panel");
  panel.append(el("h2", "", levelValue("Teacher Buttons", "Classroom Controls", "Model Controls")), el("p", "edu-muted", levelValue("Use these to slow the model and point to planet names.", "Use these while teaching. They do not change the underlying NASA data notes.", "Use these controls to isolate motion, labels, axes, and scale while preserving the source data notes.")));
  panel.append(toggleRow(levelValue("Stop moving", "Pause motion", "Pause animation"), "paused"));
  panel.append(toggleRow(levelValue("Show names", "Planet labels", "Planet labels"), "labels"));
  panel.append(toggleRow(levelValue("Show spin sticks", "Rotation axes", "Rotation axes"), "axes"));

  const speed = el("label", "control-row");
  speed.append(el("span", "", `${levelValue("Speed", "Speed", "Animation speed")} ${uiState.speed.toFixed(1)}x`));
  const range = document.createElement("input");
  range.type = "range";
  range.min = "0.2";
  range.max = "4";
  range.step = "0.2";
  range.value = String(uiState.speed);
  range.addEventListener("input", () => {
    uiState.speed = Number(range.value);
    space.setOptions(uiState);
    render();
  });
  speed.append(range);
  panel.append(speed);

  const scale = el("div", "control-row");
  scale.append(el("span", "", levelValue("Planet size", "Planet display scale", "Display scale mode")));
  const select = document.createElement("select");
  [["classroom", levelValue("Easy to see", "Classroom readable", "Readable classroom scale")], ["relative", levelValue("Closer to real size", "Relative diameter", "Relative diameter scale")]].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.selected = uiState.scaleMode === value;
    select.append(option);
  });
  select.addEventListener("change", () => {
    uiState.scaleMode = select.value;
    space.setOptions(uiState);
  });
  scale.append(select);
  panel.append(scale);
  panel.append(el("p", "edu-note", levelModelControlNote()));
  return panel;
}

function levelModelControlNote() {
  return levelValue(
    "Space is much bigger than the screen, so the app brings planets closer together.",
    "Accuracy note: distances and sizes are compressed for classroom visibility. Use the source tab when discussing model limitations.",
    "Model limitation: distance, size, and time are compressed; use Sources to separate measured NASA values from visualization choices."
  );
}

function toggleRow(label, key) {
  const row = el("label", "control-row");
  row.append(el("span", "", label));
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = Boolean(uiState[key]);
  input.addEventListener("change", () => {
    uiState[key] = input.checked;
    space.setOptions(uiState);
    render();
  });
  row.append(input);
  return row;
}

function createQuizPanel() {
  const panel = el("section", "edu-panel");
  const availableQuestions = getQuizQuestions();
  if (quizIndex >= availableQuestions.length) quizIndex = 0;
  const item = availableQuestions[quizIndex];
  panel.append(el("h2", "", levelValue("Planet Practice", "Adaptive Planet Checkpoint", "Adaptive Evidence Checkpoint")));
  panel.append(createQuizTopicPicker());
  panel.append(el("p", "edu-muted", `${item.body} | Question ${quizIndex + 1} of ${availableQuestions.length} | Score ${quizScore}`), el("h3", "", adaptText(item.q)));

  if (quizFeedback) {
    panel.append(createFeedbackCard(item));
  } else {
    const choices = el("div", "choice-grid");
    item.choices.forEach((choice) => {
      const button = el("button", "choice", choice);
      button.addEventListener("click", () => answerQuiz(choice, item));
      choices.append(button);
    });
    panel.append(choices);
  }

  const reset = el("button", "small-button", "Reset Quiz");
  reset.addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;
    quizFeedback = null;
    render();
  });
  panel.append(reset);
  return panel;
}

function getQuizQuestions() {
  const allQuestions = [...quizQuestions, ...progressState.customQuestions];
  if (quizTopic === "all") return allQuestions;
  if (quizTopic === "motion") {
    return allQuestions.filter((item) => /rotate|rotates|rotation|tilt|seasons|backward|year|orbit/i.test(`${item.q} ${item.answer}`));
  }
  return allQuestions.filter((item) => item.body.toLowerCase() === quizTopic);
}

function createQuizTopicPicker() {
  const row = el("div", "quiz-topic-row");
  const select = document.createElement("select");
  select.className = "planet-select";
  const topics = [
    ["all", "All bodies"],
    ["motion", "Motion and seasons"],
    ["sun", "Sun"],
    ...planets.map((planet) => [planet.id, planet.name]),
  ];
  topics.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.selected = quizTopic === value;
    select.append(option);
  });
  select.addEventListener("change", () => {
    quizTopic = select.value;
    quizIndex = 0;
    quizFeedback = null;
    render();
  });
  row.append(el("span", "", levelValue("Pick a topic", "Practice topic", "Assessment topic")), select);
  return row;
}

function answerQuiz(choice, item) {
  const correct = choice === item.answer;
  if (correct) {
    quizScore += 1;
  } else {
    weakTopics[item.body] = (weakTopics[item.body] || 0) + 1;
  }
  recordQuizAttempt(item, choice, correct);
  quizFeedback = {
    correct,
    selected: choice,
    body: item.body,
    answer: item.answer,
    explanation: explainQuizAnswer(item),
  };
  render();
}

function createFeedbackCard(item) {
  const card = el("div", quizFeedback.correct ? "feedback-card correct" : "feedback-card wrong");
  card.append(
    el("h3", "", quizFeedback.correct ? levelValue("You got it", "Correct", "Correct") : levelValue("Let's try again", "Review This", "Review the evidence")),
    el("p", "", quizFeedback.correct ? adaptText(`Yes. ${quizFeedback.answer} is right.`) : adaptText(`You chose ${quizFeedback.selected}. The correct answer is ${quizFeedback.answer}.`)),
    el("p", "edu-muted", adaptText(quizFeedback.explanation))
  );
  if (!quizFeedback.correct) {
    card.append(el("p", "edu-note", simplerFollowUp(item)));
  }
  const actions = el("div", "edu-actions");
  const review = el("button", "small-button", `Show ${quizFeedback.body}`);
  review.addEventListener("click", () => openBodyByName(quizFeedback.body));
  const next = el("button", "small-button", quizFeedback.correct ? "Next Question" : "Try Next");
  next.addEventListener("click", () => {
    quizFeedback = null;
    const availableQuestions = getQuizQuestions();
    quizIndex = (quizIndex + 1) % availableQuestions.length;
    render();
  });
  const simpler = el("button", "small-button", "Simpler Help");
  simpler.addEventListener("click", () => {
    studentLevel = "junior";
    activePanel = "student";
    render();
  });
  actions.append(review, simpler, next);
  card.append(actions);
  return card;
}

function explainQuizAnswer(item) {
  const explanations = {
    "A star": "The Sun makes its own energy through fusion, which is why it is classified as a star rather than a planet.",
    "Nuclear fusion": "In the Sun's core, hydrogen atoms join to form helium and release energy as light and heat.",
    Photosphere: "The photosphere is the visible surface-like layer of the Sun that we see from Earth.",
    Mercury: "Mercury is closest to the Sun, so it completes one orbit in only 88 Earth days.",
    "It has almost no atmosphere": "Without a thick atmosphere, Mercury cannot hold heat at night or spread heat around the planet.",
    "Many impacts": "Craters form when rocks from space strike a surface. Mercury has many because it has little atmosphere and little erosion.",
    Venus: "Venus traps heat with a thick carbon dioxide atmosphere, making it hotter than Mercury.",
    "Runaway greenhouse effect": "Venus's atmosphere traps solar energy very efficiently, so heat builds up at the surface.",
    Backward: "Venus spins in the opposite direction from most planets. This is called retrograde rotation.",
    "Liquid water": "Earth's oceans cover most of the surface and are one reason Earth supports life.",
    Seasons: "Earth's axis is tilted, so sunlight hits each hemisphere differently during the year.",
    Oxygen: "Earth's atmosphere contains oxygen that many living things need for respiration.",
    "Iron-rich dust": "Iron minerals in Martian dust oxidize, giving Mars its red-orange color.",
    "Olympus Mons": "Olympus Mons is a huge shield volcano on Mars and is the tallest known volcano in the solar system.",
    "Carbon dioxide": "Mars has a thin atmosphere made mostly of carbon dioxide.",
    "Gas giant": "Jupiter is mostly hydrogen and helium and does not have a solid surface like Earth.",
    "A giant storm": "The Great Red Spot is a long-lasting storm system in Jupiter's atmosphere.",
    Juno: "NASA's Juno spacecraft studies Jupiter's atmosphere, gravity, magnetic field, and interior.",
    "Ice and rock particles": "Saturn's rings are not solid sheets; they are many orbiting pieces of ice and rock.",
    Titan: "Titan is Saturn's largest moon and has a thick atmosphere and methane lakes.",
    Cassini: "Cassini orbited Saturn for years and studied its rings, atmosphere, and moons.",
    "It rotates on its side": "Uranus has an axial tilt of about 98 degrees, so it spins almost sideways.",
    "Methane absorbs red light": "Methane in Uranus's atmosphere absorbs red light and leaves blue-green light to reach our eyes.",
    "Voyager 2": "Voyager 2 is the only spacecraft that has flown by Uranus and Neptune.",
    Neptune: "Neptune is farthest from the Sun among the eight major planets, so its orbit takes about 165 Earth years.",
    "Very fast winds": "Neptune's atmosphere has some of the fastest winds measured in the solar system.",
    Triton: "Triton is Neptune's largest moon and has unusual geology and a retrograde orbit.",
  };
  return explanations[item.answer] || `${item.answer} is supported by the planet data and description in this lesson.`;
}

function simplerFollowUp(item) {
  if (item.body === "Sun") return "Simpler follow-up: does the Sun make its own light, or does it only reflect light?";
  if (item.body === "Mercury") return "Simpler follow-up: which planet is closest to the Sun and has the shortest year?";
  if (item.body === "Venus") return "Simpler follow-up: what happens when a thick atmosphere traps heat near a planet's surface?";
  if (item.body === "Earth") return "Simpler follow-up: what three things make Earth comfortable for life?";
  if (item.body === "Mars") return "Simpler follow-up: is Mars warm with thick air, or cold with thin air?";
  if (item.body === "Jupiter") return "Simpler follow-up: is Jupiter a small rocky planet or a huge gas giant?";
  if (item.body === "Saturn") return "Simpler follow-up: are Saturn's rings solid sheets, or many small pieces of ice and rock?";
  if (item.body === "Uranus") return "Simpler follow-up: what is unusual about the way Uranus spins?";
  if (item.body === "Neptune") return "Simpler follow-up: why does Neptune take so long to go around the Sun?";
  return "Simpler follow-up: which body page should you review before trying another question?";
}

function createComparePanel() {
  const panel = el("section", "edu-panel");
  panel.append(el("h2", "", levelValue("Compare Worlds", "Compare Planets", "Comparative Planetology")), el("p", "edu-muted", levelValue("Pick two planets and see what is different.", "Build evidence-based comparisons for worksheets or class discussion.", "Use measured properties to build claims about classification, habitability, motion, and environment.")));
  const pickers = el("div", "compare-pickers");
  pickers.append(planetSelect("a"), planetSelect("b"));
  panel.append(pickers);
  const a = planets.find((planet) => planet.id === comparison.a);
  const b = planets.find((planet) => planet.id === comparison.b);
  const table = el("table", "compare-table");
  table.innerHTML = `
    <thead><tr><th>Property</th><th>${a.name}</th><th>${b.name}</th></tr></thead>
    <tbody>
      ${compareRow(levelValue("Size", "Diameter", "Diameter"), `${nasaFacts[a.id].diameterKm.toLocaleString()} km`, `${nasaFacts[b.id].diameterKm.toLocaleString()} km`)}
      ${compareRow("Gravity", nasaFacts[a.id].gravity, nasaFacts[b.id].gravity)}
      ${compareRow(levelValue("Air", "Atmosphere", "Atmosphere"), nasaFacts[a.id].atmosphere, nasaFacts[b.id].atmosphere)}
      ${compareRow("Day", `${Math.abs(nasaFacts[a.id].rotationHours)} h`, `${Math.abs(nasaFacts[b.id].rotationHours)} h`)}
      ${compareRow("Year", `${nasaFacts[a.id].orbitalDays.toLocaleString()} d`, `${nasaFacts[b.id].orbitalDays.toLocaleString()} d`)}
      ${compareRow(levelValue("Tilt", "Axial tilt", "Axial tilt"), `${nasaFacts[a.id].axialTiltDeg} deg`, `${nasaFacts[b.id].axialTiltDeg} deg`)}
    </tbody>`;
  const openA = el("button", "small-button", `Open ${a.name}`);
  openA.addEventListener("click", () => setStage("planet", a));
  const openB = el("button", "small-button", `Open ${b.name}`);
  openB.addEventListener("click", () => setStage("planet", b));
  const actions = el("div", "edu-actions");
  actions.append(openA, openB);
  panel.append(table, actions);
  return panel;
}

function createSimulationsPanel() {
  const panel = el("section", "edu-panel");
  panel.append(el("h2", "", levelValue("See It Move", "Interactive Simulations", "Interactive Concept Simulations")), el("p", "edu-muted", levelValue("Use these buttons to show hard ideas with moving planets.", "Use these guided demos to turn abstract ideas into visible classroom moments.", "Use these demos to connect observed motion with axial tilt, orbital period, greenhouse behavior, scale, and moon systems.")));
  const sims = [
    ["Day and Night", "Watch Earth rotate. The lit side has day and the shadow side has night.", () => setStage("planet", planets.find((planet) => planet.id === "earth"))],
    ["Seasons and Axial Tilt", "Turn on axes, open Earth, and connect tilt with changing sunlight angle.", () => { uiState.axes = true; setStage("planet", planets.find((planet) => planet.id === "earth")); }],
    ["Greenhouse Effect", "Compare Earth and Venus. Venus is hotter because thick carbon dioxide traps heat.", () => { comparison = { a: "earth", b: "venus" }; activePanel = "compare"; render(); }],
    ["Gravity and Orbit Speed", "Inner planets orbit faster; outer planets take much longer to complete a year.", () => { uiState.speed = 2; setStage("solar", null); }],
    ["True Scale vs Classroom Scale", "Switch between readable classroom size and relative diameter size.", () => { activePanel = "controls"; render(); }],
    ["Saturn Ring Particles", "Open Saturn and explain that rings are many orbiting ice and rock particles.", () => setStage("planet", planets.find((planet) => planet.id === "saturn"))],
    ["Moon Systems", "Explore major moons of Earth, Mars, Jupiter, Saturn, and Neptune.", () => { activePanel = "explore"; render(); }],
  ];
  const grid = el("div", "path-picker");
  sims.forEach(([title, text, action]) => {
    const card = el("button", "path-card");
    card.append(el("strong", "", levelPathTitle(title)), el("span", "", adaptText(text)));
    card.addEventListener("click", action);
    grid.append(card);
  });
  panel.append(grid);
  return panel;
}

function createExplorePanel() {
  const panel = el("section", "edu-panel");
  panel.append(el("h2", "", levelValue("More Space Objects", "Beyond the Eight Planets", "Small Bodies and Moon Systems")));
  panel.append(el("h3", "", levelValue("Dwarf Planets and Comets", "Dwarf Planets, Asteroids, Kuiper Belt, and Comets", "Dwarf Planets, Small Bodies, and Reservoirs")));
  const minorGrid = el("div", "content-grid");
  minorBodies.forEach((item) => {
    const card = el("div", "student-card");
    card.append(el("h3", "", item.name), el("p", "edu-muted", `${item.type} | ${item.region}`), el("p", "", adaptText(item.fact)));
    minorGrid.append(card);
  });
  panel.append(minorGrid);

  panel.append(el("h3", "", levelValue("Important Moons", "Major Moons", "Major Natural Satellites")));
  const moonGrid = el("div", "content-grid");
  majorMoons.forEach((moon) => {
    const card = el("div", "student-card");
    card.append(el("h3", "", moon.name), el("p", "edu-muted", moon.planet), el("p", "", adaptText(moon.fact)));
    moonGrid.append(card);
  });
  panel.append(moonGrid);

  panel.append(el("h3", "", levelValue("Spacecraft Visits", "Missions Timeline", "Exploration Timeline")));
  const timeline = el("ol", "timeline");
  missionTimeline.forEach((mission) => {
    const item = el("li", "");
    item.innerHTML = `<strong>${mission.year} - ${mission.mission}</strong><br><span>${mission.target}: ${adaptText(mission.fact)}</span>`;
    timeline.append(item);
  });
  panel.append(timeline);

  panel.append(el("h3", "", levelValue("Common Mix-Ups", "Common Misconceptions", "Common Misconceptions to Challenge")));
  const myths = el("ul", "edu-list");
  Object.entries(misconceptions).forEach(([body, text]) => myths.append(el("li", "", `${capitalize(body)}: ${adaptText(text)}`)));
  panel.append(myths);
  return panel;
}

function createAccessPanel() {
  const panel = el("section", "edu-panel");
  panel.append(el("h2", "", "Accessibility and Compliance"), el("p", "edu-muted", "Classroom-safe controls and compliance planning notes."));
  panel.append(toggleRow("Reduced motion", "reducedMotion"));
  panel.append(toggleRow("Dyslexia-friendly font", "dyslexiaFont"));
  panel.append(toggleRow("Read-aloud narration", "narration"));
  const read = el("button", "small-button", "Read Current Page");
  read.addEventListener("click", readCurrentPage);
  const stop = el("button", "small-button", "Stop Narration");
  stop.addEventListener("click", () => speechSynthesis.cancel());
  const actions = el("div", "edu-actions");
  actions.append(read, stop);
  panel.append(actions);
  const terms = el("div", "student-card");
  terms.append(el("h3", "", "Pronunciation Help"));
  const termButtons = el("div", "edu-actions");
  ["atmosphere", "axial", "fusion", "Triton"].forEach((term) => {
    const button = el("button", "small-button", term);
    button.addEventListener("click", () => speakText(term));
    termButtons.append(button);
  });
  terms.append(termButtons);
  panel.append(terms);
  const list = el("ul", "edu-list");
  [
    "Keyboard-accessible buttons, tabs, selects, and quiz choices.",
    "Reduced motion and pause controls for students sensitive to animation.",
    "Dyslexia-friendly font option for text-heavy panels.",
    "No student personal data leaves this local browser build.",
    "If online accounts are added later, FERPA/COPPA review and data deletion controls are required.",
    "Before institutional sale: complete WCAG 2.1 AA audit with real assistive technology.",
  ].forEach((item) => list.append(el("li", "", item)));
  panel.append(list);
  return panel;
}

function createQaPanel() {
  const panel = el("section", "edu-panel");
  panel.append(el("h2", "", "Quality Assurance Checklist"));
  const checks = [
    "All tabs open without console errors.",
    "Student profiles persist after refresh.",
    "Quiz feedback records weak topics.",
    "CSV export opens in spreadsheet software.",
    "Print worksheet and print report work as browser print/PDF.",
    "Solar system maintains acceptable frame rate on school Chromebooks.",
    "Mobile and tablet layouts keep text readable.",
    "Teacher/science reviewer checks all facts and citations.",
    "WCAG 2.1 AA audit is completed before paid deployment.",
    "Privacy policy reviewed before adding accounts or cloud sync.",
  ];
  const list = el("ul", "edu-list checklist");
  checks.forEach((item) => list.append(el("li", "", item)));
  panel.append(list);
  return panel;
}

function readCurrentPage() {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const text = document.querySelector(".planet-copy")?.innerText || document.querySelector(".edu-body")?.innerText || document.body.innerText;
  speakText(text.slice(0, 1600));
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = studentLevel === "junior" ? 0.88 : 1;
  speechSynthesis.speak(utterance);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function planetSelect(side) {
  const select = document.createElement("select");
  select.className = "planet-select";
  planets.forEach((planet) => {
    const option = document.createElement("option");
    option.value = planet.id;
    option.textContent = planet.name;
    option.selected = comparison[side] === planet.id;
    select.append(option);
  });
  select.addEventListener("change", () => {
    comparison[side] = select.value;
    render();
  });
  return select;
}

function compareRow(label, a, b) {
  return `<tr><td>${label}</td><td>${a}</td><td>${b}</td></tr>`;
}

function createSourcesPanel() {
  const panel = el("section", "edu-panel");
  panel.append(el("h2", "", "Sources and Model Notes"));
  const notes = el("ul", "edu-list");
  [
    "Planet texture maps: NASA/JPL Solar System Simulator texture maps. Gas giant maps are representative because their atmospheres change daily.",
    "Planetary values: NASA Planetary Fact Sheet values for rotation period, orbital period, axial tilt, diameter, gravity, atmosphere, and temperature.",
    "Sun facts: NASA Science Sun facts for diameter, layers, core temperature, solar wind, and fusion explanation.",
    "Uranus and Neptune color treatment: NASA Science article on haze differences. Uranus is shown as pale cyan; Neptune is bluer but not exaggerated as older enhanced imagery.",
    "Scale limitation: orbital distances, planet sizes, and time are compressed to fit a classroom screen.",
    "Privacy posture: this local build stores no student data and sends no analytics.",
  ].forEach((note) => notes.append(el("li", "", note)));
  panel.append(notes);
  const links = el("div", "source-links");
  [
    ["NASA/JPL Texture Maps", "https://maps.jpl.nasa.gov/tmaps/"],
    ["NASA Sun Facts", "https://science.nasa.gov/sun/facts/"],
    ["NASA Uranus/Neptune Colors", "https://science.nasa.gov/solar-system/why-uranus-and-neptune-are-different-colors/"],
    ["NASA Planetary Fact Sheet", "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"],
  ].forEach(([label, href]) => {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = label;
    links.append(link);
  });
  panel.append(links);
  return panel;
}

function createProductPanel() {
  const panel = el("section", "edu-panel");
  panel.append(el("h2", "", "Institution-Ready Notes"));
  const list = el("ul", "edu-list");
  [
    "No login required in this local version; suitable for projector, lab, or offline classroom use.",
    "Accessibility: keyboard-accessible controls, high-contrast UI, reduced-motion option through pause control, and textual source notes.",
    "Teacher workflow: lesson flow, prompts, quiz, comparison table, and standards alignment are included in-app.",
    "Product packaging: use this folder as an offline package; run it with a local static server from README.md.",
    "Institution demo: use Student Mode for learner value and Dashboard for teacher value.",
    "Pricing page placeholder: recommended future packaging is per-school annual license plus offline lab license.",
    "Admin onboarding placeholder: create class, choose path, add student profiles, export progress.",
    "About data and sources: Sources tab and LICENSING_AND_SOURCES.md are included for buyer review.",
    "Compliance baseline: avoid collecting student personal data unless a future dashboard adds FERPA/COPPA controls.",
    "Commercial next step: add LMS export, class rosters, teacher-authored quizzes, and institutional licensing pages.",
  ].forEach((item) => list.append(el("li", "", item)));
  panel.append(list, el("h3", "", "Standards Alignment"));
  const standardsList = el("ul", "edu-list");
  standards.forEach((item) => standardsList.append(el("li", "", item)));
  panel.append(standardsList);
  return panel;
}

function mulberry32(seed) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function SpaceScene(canvas, callbacks) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true,
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 5000);
  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();
  const textureLoader = new THREE.TextureLoader();
  const textureCache = new Map();
  const pointer = new THREE.Vector2(2, 2);
  const mouse = new THREE.Vector2(0, 0);
  const targetCamera = new THREE.Vector3(0, 0, 820);
  const lookAt = new THREE.Vector3();
  const planetMeshes = [];

  let mode = "galaxy";
  let hoveredPlanet = null;
  let activePlanet = null;
  let detailPivot = null;
  let detailSphere = null;
  let detailDragging = false;
  let lastPointer = { x: 0, y: 0 };
  let galaxyZoom = 0;
  let options = { ...uiState };

  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  camera.position.set(0, 0, 820);

  scene.add(new THREE.AmbientLight(0x5d6f9f, 0.65));
  const keyLight = new THREE.PointLight(0xffffff, 1.4, 1800);
  keyLight.position.set(220, 180, 520);
  scene.add(keyLight);

  const stars = createStarfield();
  const galaxyGroup = createGalaxy();
  const solarGroup = createSolarSystem();
  const detailGroup = new THREE.Group();
  scene.add(stars, galaxyGroup, solarGroup, detailGroup);
  solarGroup.rotation.x = 1.06;

  const onResize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const onPointerMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (mode === "planet" && detailDragging && detailPivot) {
      const dx = event.clientX - lastPointer.x;
      const dy = event.clientY - lastPointer.y;
      lastPointer = { x: event.clientX, y: event.clientY };
      detailPivot.rotation.y += dx * 0.01;
      detailPivot.rotation.x = clamp(detailPivot.rotation.x + dy * 0.01, -0.8, 0.8);
    }
  };

  const onPointerDown = (event) => {
    if (mode !== "planet" || event.target !== canvas) return;
    detailDragging = true;
    lastPointer = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event) => {
    detailDragging = false;
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch {}
  };

  const onClick = () => {
    if (mode === "solar" && hoveredPlanet) callbacks.onSelect(hoveredPlanet);
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("click", onClick);
  onResize();
  animate();

  return {
    setMode(nextMode, planet) {
      mode = nextMode;
      galaxyZoom = 0;
      hoveredPlanet = null;
      callbacks.onHover(null);
      activePlanet = planet || null;
      galaxyGroup.visible = nextMode === "galaxy";
      solarGroup.visible = nextMode === "solar";
      detailGroup.visible = nextMode === "planet";
      detailGroup.visible = nextMode === "planet" || nextMode === "sun";

      if (nextMode === "galaxy") targetCamera.set(0, 0, window.innerWidth < 760 ? 1120 : 820);
      if (nextMode === "solar") {
        solarGroup.rotation.x = 1.06;
        targetCamera.set(0, 450, window.innerWidth < 760 ? 980 : 820);
      }
      if (nextMode === "planet") {
        targetCamera.set(window.innerWidth < 760 ? 0 : -70, 70, window.innerWidth < 760 ? 650 : 620);
        buildDetailPlanet(planet);
      }
      if (nextMode === "sun") {
        targetCamera.set(window.innerWidth < 760 ? 0 : -70, 70, window.innerWidth < 760 ? 720 : 680);
        buildDetailSun();
      }
    },
    setOptions(nextOptions) {
      options = { ...options, ...nextOptions };
      applySceneOptions();
    },
    beginGalaxyZoom() {
      galaxyZoom = 1;
      targetCamera.set(0, 0, 160);
    },
    selectPlanet(id) {
      const planet = planets.find((item) => item.id === id);
      if (planet) callbacks.onSelect(planet);
    },
  };

  function animate() {
    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;
    const px = mouse.x;
    const py = mouse.y;

    stars.rotation.y += delta * 0.015;

    if (mode === "galaxy") {
      galaxyGroup.rotation.z += delta * 0.035;
      galaxyGroup.rotation.x = THREE.MathUtils.lerp(galaxyGroup.rotation.x, py * 0.12, 0.04);
      galaxyGroup.rotation.y = THREE.MathUtils.lerp(galaxyGroup.rotation.y, px * 0.16, 0.04);
      galaxyGroup.scale.setScalar(THREE.MathUtils.lerp(galaxyGroup.scale.x, galaxyZoom ? 4.6 : 1, 0.025));
      const marker = galaxyGroup.getObjectByName("solar-marker");
      if (marker) marker.scale.setScalar(1 + Math.sin(elapsed * 4.2) * 0.12);
    }

    if (mode === "solar") {
      solarGroup.rotation.x = THREE.MathUtils.lerp(solarGroup.rotation.x, 1.06 + py * 0.08, 0.08);
      solarGroup.rotation.z = THREE.MathUtils.lerp(solarGroup.rotation.z, px * 0.18, 0.08);
      const motionDelta = options.paused || options.reducedMotion ? 0 : delta * options.speed;
      solarGroup.children.forEach((child) => {
        if (!child.userData.planet) return;
        const planet = child.userData.planet;
        const facts = nasaFacts[planet.id];
        child.userData.orbitAngle += motionDelta * (orbitMotionScale / facts.orbitalDays);
        const angle = child.userData.orbitAngle;
        child.position.set(Math.cos(angle) * planet.orbit, 0, Math.sin(angle) * planet.orbit);
        child.rotateY(motionDelta * spinRateForPlanet(planet));
      });
      updateSolarHover();
    }

    if ((mode === "planet" || mode === "sun") && detailPivot) {
      const motionDelta = options.paused || options.reducedMotion ? 0 : delta * options.speed;
      detailPivot.rotation.y += detailDragging ? 0 : motionDelta * 0.22;
      if (detailSphere) detailSphere.rotateY(mode === "sun" ? motionDelta * 0.08 : motionDelta * spinRateForPlanet(activePlanet) * 0.7);
    }

    camera.position.lerp(targetCamera, 0.055);
    lookAt.set(px * 24, py * -18, 0);
    camera.lookAt(lookAt);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function updateSolarHover() {
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(planetMeshes, true)[0];
    const planet = hit?.object.userData.planet || hit?.object.parent?.userData.planet || null;
    if (planet === hoveredPlanet) return;

    hoveredPlanet = planet;
    callbacks.onHover(planet);
    canvas.style.cursor = planet ? "pointer" : "default";
    planetMeshes.forEach((mesh) => {
      const isActive = mesh.userData.planet === planet;
      const base = options.scaleMode === "relative" ? mesh.userData.relativeScale : mesh.userData.baseScale;
      mesh.scale.setScalar(isActive ? base * 1.35 : base);
    });
  }

  function applySceneOptions() {
    planetMeshes.forEach((mesh) => {
      const targetScale = options.scaleMode === "relative" ? mesh.userData.relativeScale : mesh.userData.baseScale;
      mesh.scale.setScalar(targetScale);
      const label = mesh.getObjectByName("planet-label");
      if (label) label.visible = Boolean(options.labels);
      const axis = mesh.getObjectByName("axis-line");
      if (axis) axis.visible = Boolean(options.axes);
    });
  }

  function createStarfield() {
    const random = mulberry32(11235);
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const radius = 700 + random() * 1600;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.cos(phi) * radius;
      color.setHSL(0.58 + random() * 0.12, 0.35, 0.58 + random() * 0.38);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    return new THREE.Points(geometry, material);
  }

  function createGalaxy() {
    const group = new THREE.Group();
    const random = mulberry32(8421);
    const starsPerArm = 900;
    const positions = new Float32Array(starsPerArm * 4 * 3);
    const colors = new Float32Array(starsPerArm * 4 * 3);
    const color = new THREE.Color();
    let cursor = 0;

    for (let arm = 0; arm < 4; arm++) {
      const baseAngle = (arm / 4) * Math.PI * 2;
      for (let index = 0; index < starsPerArm; index++) {
        const d = index / starsPerArm;
        const radius = d * 230 + 8;
        const angle = baseAngle + d * 5.4 + (random() - 0.5) * 0.5;
        const scatter = (1 - d) * 22 + 3;
        positions[cursor * 3] = Math.cos(angle) * radius + (random() - 0.5) * scatter;
        positions[cursor * 3 + 1] = Math.sin(angle) * radius + (random() - 0.5) * scatter;
        positions[cursor * 3 + 2] = (random() - 0.5) * (22 - d * 14);
        color.set(d < 0.3 ? "#fff7d6" : d < 0.6 ? "#cfd9ff" : "#91a1ff");
        colors[cursor * 3] = color.r;
        colors[cursor * 3 + 1] = color.g;
        colors[cursor * 3 + 2] = color.b;
        cursor++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    group.add(
      new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
          size: 2.5,
          vertexColors: true,
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      )
    );

    const core = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createGlowTexture("#fff0c8", "#ff8c4c"),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    core.scale.set(180, 180, 1);
    group.add(core);

    const marker = new THREE.Group();
    marker.name = "solar-marker";
    marker.position.set(160, -40, 24);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(18, 0.7, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0x7fd6a0, transparent: true, opacity: 0.6 })
    );
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(2.6, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x7fd6a0 })
    );
    marker.add(ring, dot);
    group.add(marker);
    return group;
  }

  function createSolarSystem() {
    const group = new THREE.Group();
    group.visible = false;

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(32, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0xffb547 })
    );
    const sunGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createGlowTexture("#ffde88", "#ff6a00"),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    sunGlow.scale.set(190, 190, 1);
    group.add(sun, sunGlow);

    const sunlight = new THREE.PointLight(0xffcc88, 5, 1200);
    group.add(sunlight);

    planets.forEach((planet) => {
      group.add(createOrbit(planet.orbit));
      const mesh = createPlanetMesh(planet, 1.45);
      mesh.userData.planet = planet;
      planetMeshes.push(mesh);
      group.add(mesh);
    });
    return group;
  }

  function createOrbit(radius) {
    const points = [];
    for (let i = 0; i < 160; i++) {
      const angle = (i / 160) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    const orbit = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 })
    );
    return orbit;
  }

  function createAxisLine(radius) {
    const material = new THREE.LineBasicMaterial({ color: 0x9fd2ff, transparent: true, opacity: 0.48 });
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -radius * 1.45, 0),
      new THREE.Vector3(0, radius * 1.45, 0),
    ]);
    const axis = new THREE.Line(geometry, material);
    axis.name = "axis-line";
    return axis;
  }

  function createLabelSprite(text, radius) {
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 256;
    labelCanvas.height = 96;
    const ctx = labelCanvas.getContext("2d");
    ctx.font = "22px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText(text.toUpperCase(), 128, 48);
    const texture = new THREE.CanvasTexture(labelCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
    sprite.name = "planet-label";
    sprite.position.set(0, radius * 2.25, 0);
    sprite.scale.set(56, 21, 1);
    sprite.renderOrder = 5;
    return sprite;
  }

  function relativeVisualScale(planet) {
    const earthDiameter = nasaFacts.earth.diameterKm;
    return clamp(Math.sqrt(nasaFacts[planet.id].diameterKm / earthDiameter) * 0.55, 0.45, 1.75);
  }

  function createPlanetMesh(planet, scale) {
    const radius = Math.max(planet.radius * scale, 8);
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), createPlanetMaterial(planet, false));
    mesh.rotation.z = THREE.MathUtils.degToRad(nasaFacts[planet.id].axialTiltDeg);
    mesh.userData.baseRadius = radius;
    mesh.userData.baseScale = 1;
    mesh.userData.relativeScale = relativeVisualScale(planet);
    mesh.userData.orbitAngle = orbitPhase[planet.id];

    if (planet.id === "saturn") {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(radius * 1.35, radius * 2.05, 96),
        new THREE.MeshBasicMaterial({
          map: createRingTexture(),
          transparent: true,
          opacity: 0.82,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      ring.rotation.x = Math.PI / 2.4;
      mesh.add(ring);
    }
    if (["earth", "venus", "uranus", "neptune"].includes(planet.id)) {
      mesh.add(createAtmosphere(planet, radius));
    }
    mesh.add(createAxisLine(radius));
    mesh.add(createLabelSprite(planet.name, radius));
    return mesh;
  }

  function buildDetailPlanet(planet) {
    detailGroup.clear();
    detailPivot = new THREE.Group();
    const detailRadius = window.innerWidth < 760 ? 112 : 128;
    detailSphere = new THREE.Mesh(
      new THREE.SphereGeometry(detailRadius, 96, 96),
      createPlanetMaterial(planet, true)
    );
    detailSphere.rotation.z = THREE.MathUtils.degToRad(nasaFacts[planet.id].axialTiltDeg);
    detailPivot.add(detailSphere);
    if (["earth", "venus", "uranus", "neptune"].includes(planet.id)) {
      detailPivot.add(createAtmosphere(planet, detailRadius));
    }

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createGlowTexture(planet.color, planet.ring || planet.color),
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    glow.scale.set(detailRadius * 2.8, detailRadius * 2.8, 1);
    detailPivot.add(glow);

    if (planet.id === "saturn") {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(detailRadius * 1.35, detailRadius * 2.05, 128),
        new THREE.MeshBasicMaterial({
          map: createRingTexture(),
          transparent: true,
          opacity: 0.86,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      ring.rotation.x = Math.PI / 2.25;
      detailPivot.add(ring);
    }

    detailPivot.position.x = window.innerWidth < 760 ? 0 : -175;
    detailPivot.position.y = window.innerWidth < 760 ? 115 : 0;
    detailGroup.add(detailPivot);
  }

  function buildDetailSun() {
    detailGroup.clear();
    detailPivot = new THREE.Group();
    const radius = window.innerWidth < 760 ? 126 : 145;
    const sunMaterial = new THREE.MeshBasicMaterial({
      map: createSunTexture(),
      color: 0xffc45c,
    });
    detailSphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 96, 96), sunMaterial);
    detailPivot.add(detailSphere);

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createGlowTexture("#fff1a8", "#ff6a00"),
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    glow.scale.set(radius * 4.6, radius * 4.6, 1);
    detailPivot.add(glow);

    const corona = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createGlowTexture("#ffd27a", "rgba(255,120,0,0)"),
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    corona.scale.set(radius * 6.4, radius * 6.4, 1);
    detailPivot.add(corona);

    detailPivot.position.x = window.innerWidth < 760 ? 0 : -175;
    detailPivot.position.y = window.innerWidth < 760 ? 115 : 0;
    detailGroup.add(detailPivot);
  }

  function createPlanetMaterial(planet, detail) {
    const texture = loadPlanetTexture(planet);
    const isGasGiant = ["jupiter", "saturn", "uranus", "neptune"].includes(planet.id);
    const tuning = visualTuning[planet.id];
    const hasSurfaceTexture = !tuning.featureless;
    return new THREE.MeshStandardMaterial({
      map: hasSurfaceTexture ? texture : null,
      color: new THREE.Color(tuning.tint).multiplyScalar(tuning.exposure),
      roughness: isGasGiant ? 0.78 : 0.92,
      metalness: 0,
      bumpMap: !isGasGiant && detail && hasSurfaceTexture ? texture : null,
      bumpScale: planet.id === "earth" ? 1.8 : 1.1,
      emissive: new THREE.Color(tuning.tint),
      emissiveIntensity: planet.id === "venus" ? 0.04 : planet.id === "uranus" ? 0.12 : planet.id === "neptune" ? 0.08 : isGasGiant ? 0.025 : 0.01,
    });
  }

  function loadPlanetTexture(planet) {
    if (textureCache.has(planet.id)) return textureCache.get(planet.id);
    const texture = textureLoader.load(texturePaths[planet.id]);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    textureCache.set(planet.id, texture);
    return texture;
  }

  function createAtmosphere(planet, radius) {
    const color = planet.id === "earth" ? 0x6fb6ff : 0xf0c16a;
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.025, 64, 64),
      new THREE.MeshBasicMaterial({
        color: visualTuning[planet.id]?.atmosphere || color,
        transparent: true,
        opacity: planet.id === "earth" ? 0.18 : 0.24,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    return atmosphere;
  }

  function createRingTexture() {
    const cacheKey = "saturn-ring";
    if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);
    const size = 512;
    const ringCanvas = document.createElement("canvas");
    ringCanvas.width = size;
    ringCanvas.height = size;
    const ctx = ringCanvas.getContext("2d");
    const center = size / 2;
    const image = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - center;
        const dy = y - center;
        const distance = Math.sqrt(dx * dx + dy * dy) / center;
        const i = (y * size + x) * 4;
        if (distance < 0.48 || distance > 0.98) continue;
        const band = 0.52 + Math.sin(distance * 120) * 0.08 + Math.sin(distance * 260) * 0.045;
        const gap = distance > 0.69 && distance < 0.735 ? 0.18 : 1;
        image.data[i] = 225 * band;
        image.data[i + 1] = 204 * band;
        image.data[i + 2] = 158 * band;
        image.data[i + 3] = Math.floor(220 * gap);
      }
    }
    ctx.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(ringCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    textureCache.set(cacheKey, texture);
    return texture;
  }

  function createGlowTexture(inner, outer) {
    const size = 256;
    const canvasTexture = document.createElement("canvas");
    canvasTexture.width = size;
    canvasTexture.height = size;
    const ctx = canvasTexture.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, inner);
    gradient.addColorStop(0.24, inner);
    gradient.addColorStop(0.58, outer);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvasTexture);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  function createSunTexture() {
    const cacheKey = "sun-texture";
    if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);
    const size = 512;
    const sunCanvas = document.createElement("canvas");
    sunCanvas.width = size;
    sunCanvas.height = size;
    const ctx = sunCanvas.getContext("2d");
    const random = mulberry32(9901);
    const gradient = ctx.createRadialGradient(size * 0.42, size * 0.38, 12, size / 2, size / 2, size * 0.58);
    gradient.addColorStop(0, "#fff6b0");
    gradient.addColorStop(0.32, "#ffd15f");
    gradient.addColorStop(0.7, "#ff8a22");
    gradient.addColorStop(1, "#b34205");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 180; i++) {
      ctx.globalAlpha = 0.08 + random() * 0.14;
      ctx.strokeStyle = random() > 0.5 ? "#fff4a6" : "#ff6b1d";
      ctx.lineWidth = 2 + random() * 8;
      ctx.beginPath();
      const y = random() * size;
      ctx.moveTo(0, y);
      for (let x = 0; x <= size; x += 32) {
        ctx.lineTo(x, y + Math.sin(x * 0.035 + random() * 4) * (12 + random() * 30));
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    const texture = new THREE.CanvasTexture(sunCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    textureCache.set(cacheKey, texture);
    return texture;
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function spinRateForPlanet(planet) {
  if (!planet) return 0;
  const hours = nasaFacts[planet.id].rotationHours;
  const direction = Math.sign(hours) || 1;
  return direction * (24 / Math.abs(hours)) * spinMotionScale;
}

render();

window.cosmicDrift = {
  selectPlanet(id) {
    space.selectPlanet(id);
  },
  openSun() {
    setStage("sun", null);
  },
  go(stageName) {
    setStage(stageName, selectedPlanet);
  },
};
