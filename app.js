const DB_SOURCE = './components.json';
const ATTR = {
  pasivo: '¿Es un componente pasivo? (no consume energía activa para funcionar)?',
  emiteLuz: '¿Emite luz visible?',
  esMCU: '¿Contiene un microcontrolador o procesador?',
  inalambrico: '¿Puede comunicarse sin cables?',
  necesitaProg: '¿Necesita programación para funcionar?',
  esModulo: '¿Es un módulo o placa con circuito propio?',
  esSensor: '¿Detecta o mide variables del entorno?',
  esDisplay: '¿Sirve principalmente para mostrar información?',
  esRGB: '¿Es un LED RGB?',
  colorRojo: '¿Es rojo?',
  colorVerde: '¿Es verde?',
  colorAzul: '¿Es azul?',
  esSMD: '¿Es SMD?',
  esThroughHole: '¿Es through-hole?',
  regulaV: '¿Regula o convierte voltaje/corriente?',
  masDe4Pines: '¿Tiene más de 4 pines?',
  tieneWifi: '¿Tiene WiFi integrado?',
  tieneBT: '¿Tiene Bluetooth integrado?',
  esActuador: '¿Mueve o controla cargas físicas?',
  esDigital: '¿Opera solo con señales digitales?',
  tieneUSB: '¿Incluye conector USB?',
  esAmplif: '¿Amplifica señales eléctricas?',
  mideTempH: '¿Mide temperatura o humedad?',
  mideMovim: '¿Detecta movimiento o aceleración?',
  esDePotencia: '¿Maneja corriente o voltaje de potencia?',
  tieneOscilador: '¿Tiene oscilador o reloj integrado?',
  es3v3: '¿Opera principalmente a 3.3V?',
  esIC: '¿Es un circuito integrado?',
  tieneI2C_SPI: '¿Se comunica por I2C, SPI o UART?',
  masDeUnComponente: '¿Incluye más de un componente interno?',
  mideDistancia: '¿Mide distancia o proximidad?',
  esDriver: '¿Es un controlador/driver para otros componentes?'
};
const ATTR_LABELS = {
  pasivo: 'Componente pasivo',
  emiteLuz: 'Emite luz',
  esMCU: 'Tiene MCU',
  inalambrico: 'Comunicacion inalámbrica',
  necesitaProg: 'Necesita programación',
  esModulo: 'Es módulo',
  esSensor: 'Es sensor',
  esDisplay: 'Es display',
  esRGB: 'LED RGB',
  colorRojo: 'Color rojo',
  colorVerde: 'Color verde',
  colorAzul: 'Color azul',
  esSMD: 'Es SMD',
  esThroughHole: 'Through-hole',
  regulaV: 'Regula voltaje',
  masDe4Pines: 'Más de 4 pines',
  tieneWifi: 'WiFi integrado',
  tieneBT: 'Bluetooth integrado',
  esActuador: 'Es actuador',
  esDigital: 'Solo digital',
  tieneUSB: 'Tiene USB',
  esAmplif: 'Amplificador',
  mideTempH: 'Mide temp/humedad',
  mideMovim: 'Mide movimiento',
  esDePotencia: 'Alta potencia',
  tieneOscilador: 'Tiene oscilador',
  es3v3: 'Opera a 3.3V',
  esIC: 'Circuito integrado',
  tieneI2C_SPI: 'I2C / SPI / UART',
  masDeUnComponente: 'Multicomponente',
  mideDistancia: 'Mide distancia',
  esDriver: 'Es driver'
};
const TYPE_RULES = [
  { key: 'Microcontroladores', test: attrs => attrs.esMCU === true },
  { key: 'Sensores', test: attrs => attrs.esSensor === true || attrs.mideTempH === true || attrs.mideMovim === true || attrs.mideDistancia === true },
  { key: 'Actuadores', test: attrs => attrs.esActuador === true },
  { key: 'Displays', test: attrs => attrs.esDisplay === true },
  { key: 'Comunicacion', test: attrs => attrs.inalambrico === true || attrs.tieneWifi === true || attrs.tieneBT === true },
  { key: 'Drivers y Potencia', test: attrs => attrs.esDriver === true || attrs.esDePotencia === true || attrs.regulaV === true },
  { key: 'Circuitos Integrados', test: attrs => attrs.esIC === true },
  { key: 'Iluminacion', test: attrs => attrs.emiteLuz === true },
  { key: 'Modulos', test: attrs => attrs.esModulo === true },
  { key: 'Pasivos', test: attrs => attrs.pasivo === true },
  { key: 'Digitales', test: attrs => attrs.esDigital === true }
];
const DEFAULT_DB = [
  {
    id: 'resistencia',
    name: 'Resistencia',
    desc: 'Componente pasivo que limita el flujo de corriente eléctrica.',
    attrs: { pasivo: true, emiteLuz: false, esMCU: false, inalambrico: false, necesitaProg: false, esModulo: false, esSensor: false, esDisplay: false, regulaV: false, masDe4Pines: false, tieneWifi: false, tieneBT: false, esActuador: false, esDigital: false, tieneUSB: false, esAmplif: false, mideTempH: false, mideMovim: false, esDePotencia: false, tieneOscilador: false, es3v3: false, esIC: false, tieneI2C_SPI: false, masDeUnComponente: false, mideDistancia: false, esDriver: false }
  },
  {
    id: 'led',
    name: 'LED',
    desc: 'Diodo emisor de luz. Uno de los componentes más usados en electrónica.',
    attrs: { pasivo: false, emiteLuz: true, esMCU: false, inalambrico: false, necesitaProg: false, esModulo: false, esSensor: false, esDisplay: false, regulaV: false, masDe4Pines: false, tieneWifi: false, tieneBT: false, esActuador: false, esDigital: false, tieneUSB: false, esAmplif: false, mideTempH: false, mideMovim: false, esDePotencia: false, tieneOscilador: false, es3v3: false, esIC: false, tieneI2C_SPI: false, masDeUnComponente: false, mideDistancia: false, esDriver: false }
  },
  {
    id: 'esp32',
    name: 'ESP32',
    desc: 'Módulo con WiFi y Bluetooth integrado para proyectos IoT.',
    attrs: { pasivo: false, emiteLuz: false, esMCU: true, inalambrico: true, necesitaProg: true, esModulo: true, esSensor: false, esDisplay: false, regulaV: false, masDe4Pines: true, tieneWifi: true, tieneBT: true, esActuador: false, esDigital: false, tieneUSB: true, esAmplif: false, mideTempH: false, mideMovim: false, esDePotencia: false, tieneOscilador: true, es3v3: true, esIC: false, tieneI2C_SPI: true, masDeUnComponente: true, mideDistancia: false, esDriver: false }
  },
  {
    id: 'hcsr04',
    name: 'HC-SR04',
    desc: 'Sensor ultrasónico de distancia con trigger y echo.',
    attrs: { pasivo: false, emiteLuz: false, esMCU: false, inalambrico: false, necesitaProg: false, esModulo: true, esSensor: true, esDisplay: false, regulaV: false, masDe4Pines: true, tieneWifi: false, tieneBT: false, esActuador: false, esDigital: true, tieneUSB: false, esAmplif: false, mideTempH: false, mideMovim: false, esDePotencia: false, tieneOscilador: false, es3v3: false, esIC: false, tieneI2C_SPI: false, masDeUnComponente: true, mideDistancia: true, esDriver: false }
  },
  {
    id: 'lcd16x2',
    name: 'LCD 16x2',
    desc: 'Pantalla de texto 16x2 con interfaz paralela o I2C.',
    attrs: { pasivo: false, emiteLuz: true, esMCU: false, inalambrico: false, necesitaProg: false, esModulo: true, esSensor: false, esDisplay: true, regulaV: false, masDe4Pines: true, tieneWifi: false, tieneBT: false, esActuador: false, esDigital: true, tieneUSB: false, esAmplif: false, mideTempH: false, mideMovim: false, esDePotencia: false, tieneOscilador: false, es3v3: false, esIC: false, tieneI2C_SPI: true, masDeUnComponente: true, mideDistancia: false, esDriver: false }
  }
];

let db = [];
let candidates = [];
let askedAttrs = [];
let answersLog = [];
let stats = { games: 0, learned: 0 };
let newCompName = '';
let learnAttrs = {};
let typingInterval = null;

const phaseIds = ['phaseIntro','phaseQuestion','phaseGuess','phaseCorrect','phaseWrong','phaseLearn'];
const eyeMoods = {
  phaseIntro: 'idle',
  phaseQuestion: 'thinking',
  phaseGuess: 'curious',
  phaseCorrect: 'happy',
  phaseWrong: 'sad',
  phaseLearn: 'curious'
};
const ROBOT_STATES = {
  idle: {
    label: 'NEUTRAL',
    bgA: '#e0e7ff',
    bgB: '#ffffff',
    eyes: [ { h: 54, tl: -4, tr: 4 }, { h: 54, tl: 4, tr: -4 } ]
  },
  focused: {
    label: 'CONCENTRADO',
    bgA: '#f0f9ff',
    bgB: '#e2efff',
    eyes: [ { h: 50, tl: -8, tr: 2 }, { h: 50, tl: 2, tr: -8 } ]
  },
  thinking: {
    label: 'PENSANDO',
    bgA: '#dde9ff',
    bgB: '#eff6ff',
    eyes: [ { h: 58, tl: -12, tr: 10 }, { h: 58, tl: 10, tr: -12 } ]
  },
  thinking2: {
    label: 'PENSANDO',
    bgA: '#dbeafe',
    bgB: '#f0f7ff',
    eyes: [ { h: 62, tl: -20, tr: -4 }, { h: 62, tl: 4, tr: -20 } ]
  },
  curious: {
    label: 'CURIOSO',
    bgA: '#ecfdf5',
    bgB: '#f0f9ff',
    eyes: [ { h: 64, tl: -18, tr: -18 }, { h: 64, tl: -18, tr: -18 } ]
  },
  curious2: {
    label: 'CURIOSO',
    bgA: '#e0f2fe',
    bgB: '#eff6ff',
    eyes: [ { h: 50, tl: -24, tr: 8 }, { h: 56, tl: -8, tr: -24 } ]
  },
  confused: {
    label: 'CONFUNDIDO',
    bgA: '#f3e8ff',
    bgB: '#eef2ff',
    eyes: [ { h: 48, tl: 10, tr: -20 }, { h: 50, tl: -18, tr: 12 } ]
  },
  playful: {
    label: 'JUGUETÓN',
    bgA: '#e0f2fe',
    bgB: '#ecfdf5',
    eyes: [ { h: 52, tl: -14, tr: -10 }, { h: 42, tl: 12, tr: -4 } ]
  },
  happy: {
    label: 'FELIZ',
    bgA: '#dcfce7',
    bgB: '#ecfdf5',
    eyes: [ { h: 44, tl: -10, tr: -20 }, { h: 44, tl: -20, tr: -10 } ]
  },
  happy2: {
    label: 'FELIZ',
    bgA: '#eef2ff',
    bgB: '#e0f2fe',
    eyes: [ { h: 40, tl: -20, tr: -20 }, { h: 46, tl: -10, tr: -10 } ]
  },
  sad: {
    label: 'TRISTE',
    bgA: '#fee2e2',
    bgB: '#fff1f2',
    eyes: [ { h: 38, tl: 12, tr: -12 }, { h: 38, tl: -12, tr: 12 } ]
  },
  sad2: {
    label: 'TRISTE',
    bgA: '#f8d7da',
    bgB: '#fff5f5',
    eyes: [ { h: 36, tl: 16, tr: 2 }, { h: 42, tl: -2, tr: 16 } ]
  }
};

function pickRandom(values) {
  return values[Math.floor(Math.random() * values.length)];
}

let robotFromState = null;
let robotToState = null;
let robotAnimationT = 1;
let robotLastTimestamp = null;
let robotAnimationFrame = null;
let robotMotionPhase = 0;
let gazeTarget = { x: 0.5, y: 0.5, active: false };
let gazeCurrent = { x: 0.5, y: 0.5 };
let robotFromRGB = [0, 191, 255];
let robotToRGB = [0, 191, 255];
let robotLiveRGB = [0, 191, 255];
let blinkT = 0;
let blinkDir = 0;
let blinkTimer = 0;
let nextBlink = 2.0;
let eyeOffsetX = 0;
let eyeOffsetY = 0;
let jitterX = 0;
let jitterY = 0;
let jitterTargetX = 0;
let jitterTargetY = 0;
let jitterTimer = 0;

const ROBOT_NEON = {
  idle: [0, 191, 255],
  focused: [255, 230, 0],
  thinking: [0, 191, 255],
  thinking2: [0, 210, 255],
  curious: [255, 140, 0],
  curious2: [255, 50, 200],
  confused: [255, 50, 200],
  playful: [0, 255, 120],
  happy: [0, 255, 120],
  happy2: [0, 255, 120],
  sad: [40, 120, 255],
  sad2: [40, 120, 255]
};

const ROBOT_SUBLABELS = {
  idle: 'ANÁLISIS EN TIEMPO REAL',
  focused: 'ENFOQUE ALTO',
  thinking: 'EVALUANDO RESPUESTA',
  curious: 'BUSCANDO PATRONES',
  confused: 'DATOS INSUFICIENTES',
  playful: 'MODO EXPLORACIÓN',
  happy: 'COINCIDENCIA DETECTADA',
  sad: 'APRENDIENDO DEL ERROR'
};

async function init() {
  const savedStats = localStorage.getItem('componentbot_stats');
  if (savedStats) stats = safeParse(savedStats, stats);

  const savedDb = localStorage.getItem('componentbot_db');
  if (savedDb) {
    const parsed = safeParse(savedDb, null);
    if (Array.isArray(parsed)) db = parsed;
  }

  if (!db.length) {
    db = await loadInitialDatabase();
  }

  initRobotCanvas();
  initCursorTracking();
  updateEyeMood('phaseIntro');
  updateUI();
  showPhase('phaseIntro');
}

function initCursorTracking() {
  const panel = document.getElementById('robotPanel');
  if (!panel) return;

  function updateTargetFromClient(clientX, clientY) {
    const rect = panel.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    gazeTarget.x = Math.max(0, Math.min(1, x));
    gazeTarget.y = Math.max(0, Math.min(1, y));
    gazeTarget.active = true;
  }

  window.addEventListener('mousemove', (event) => {
    updateTargetFromClient(event.clientX, event.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (event) => {
    const touch = event.touches && event.touches[0];
    if (!touch) return;
    updateTargetFromClient(touch.clientX, touch.clientY);
  }, { passive: true });

  panel.addEventListener('mouseleave', () => {
    gazeTarget = { x: 0.5, y: 0.5, active: false };
  });
}

function initRobotCanvas() {
  const canvas = document.getElementById('robotCanvas');
  if (!canvas) return;
  canvas.width = 360;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startRobotMood('idle');
}

function updateEyeMood(phaseOrMood = null) {
  const target = phaseOrMood || window._currentPhase || 'phaseIntro';
  const mood = eyeMoods[target] || (ROBOT_STATES[target] ? target : 'idle');
  startRobotMood(mood);
  setRobotSubMood(mood);
  window._currentMood = mood;
}

function setRobotSubMood(mood) {
  const label = document.getElementById('robotSubMood');
  if (!label) return;
  label.textContent = ROBOT_SUBLABELS[mood] || ROBOT_SUBLABELS.idle;
}

function reactToAnswer(value) {
  if (value === true) {
    updateEyeMood(pickRandom(['happy', 'playful', 'curious']));
    return;
  }

  if (value === false) {
    updateEyeMood(pickRandom(['confused', 'focused', 'thinking2']));
    return;
  }

  if (value === 'unknown') {
    updateEyeMood('confused');
    return;
  }

  updateEyeMood(pickRandom(['curious2', 'thinking', 'playful']));
}

function getQuestionMood(randomVariant = false) {
  if (candidates.length <= 4) {
    return randomVariant ? pickRandom(['curious', 'curious2', 'playful', 'focused']) : 'curious';
  }
  if (candidates.length <= 10) {
    return randomVariant ? pickRandom(['thinking', 'thinking2', 'confused', 'focused']) : 'thinking';
  }
  return randomVariant ? pickRandom(['idle', 'focused', 'thinking']) : 'idle';
}

function safeParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function ease(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerpEye(a, b, t) {
  return {
    h: lerp(a.h, b.h, t),
    tl: lerp(a.tl, b.tl, t),
    tr: lerp(a.tr, b.tr, t)
  };
}

function lerpRGB(a, b, t) {
  return a.map((v, i) => Math.round(lerp(v, b[i], t)));
}

function rgb(c, alpha = 1) {
  return alpha < 1 ? `rgba(${c[0]},${c[1]},${c[2]},${alpha})` : `rgb(${c[0]},${c[1]},${c[2]})`;
}

function roundedRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function eyeTrapPath(ctx, cx, cy, ew, h, tl, tr, ox, oy, scaleY = 1) {
  const corner = 9;
  const x = cx - ew / 2 + ox;
  const y = cy - h / 2 + oy;
  const atl = tl * scaleY;
  const atr = tr * scaleY;
  const ah = h * scaleY;
  const offset = (h - ah) / 2;
  const startY = y + offset;
  const tlY = startY + atl;
  const trY = startY + atr;
  const bY = startY + ah;

  ctx.beginPath();
  ctx.moveTo(x + corner, tlY);
  ctx.lineTo(x + ew - corner, trY);
  ctx.quadraticCurveTo(x + ew, trY, x + ew, trY + corner);
  ctx.lineTo(x + ew, bY - corner);
  ctx.quadraticCurveTo(x + ew, bY, x + ew - corner, bY);
  ctx.lineTo(x + corner, bY);
  ctx.quadraticCurveTo(x, bY, x, bY - corner);
  ctx.lineTo(x, tlY + corner);
  ctx.quadraticCurveTo(x, tlY, x + corner, tlY);
  ctx.closePath();
}

function lerpState(a, b, t) {
  return {
    label: b.label,
    bgA: b.bgA,
    bgB: b.bgB,
    eyes: [
      lerpEye(a.eyes[0], b.eyes[0], t),
      lerpEye(a.eyes[1], b.eyes[1], t)
    ]
  };
}

function startRobotMood(mood) {
  const canvas = document.getElementById('robotCanvas');
  if (!canvas) return;

  const target = ROBOT_STATES[mood] || ROBOT_STATES.idle;
  const targetRGB = ROBOT_NEON[mood] || ROBOT_NEON.idle;
  robotFromState = robotToState || JSON.parse(JSON.stringify(ROBOT_STATES.idle));
  robotToState = JSON.parse(JSON.stringify(target));
  robotFromRGB = [...robotLiveRGB];
  robotToRGB = [...targetRGB];
  robotAnimationT = 0;
  if (blinkDir === 0) {
    blinkDir = 1;
    blinkT = 0;
    blinkTimer = 0;
  }
  robotLastTimestamp = null;
  if (!robotAnimationFrame) {
    robotAnimationFrame = requestAnimationFrame(robotFrame);
  }
}

function robotFrame(timestamp) {
  if (robotLastTimestamp === null) robotLastTimestamp = timestamp;
  const dtMs = timestamp - robotLastTimestamp;
  const dt = Math.min(dtMs / 1000, 0.05);
  robotLastTimestamp = timestamp;
  robotMotionPhase += dt * 2.2;
  robotAnimationT = Math.min(1, robotAnimationT + dt / 0.3);
  const follow = 0.08;
  gazeCurrent.x += (gazeTarget.x - gazeCurrent.x) * follow;
  gazeCurrent.y += (gazeTarget.y - gazeCurrent.y) * follow;

  const lookX = (gazeCurrent.x - 0.5) * 2;
  const lookY = (gazeCurrent.y - 0.5) * 2;
  const maxShift = 18;
  eyeOffsetX = lerp(eyeOffsetX, lookX * maxShift, 0.18);
  eyeOffsetY = lerp(eyeOffsetY, lookY * maxShift, 0.18);

  jitterTimer -= dt;
  if (jitterTimer <= 0) {
    jitterTargetX = (Math.random() - 0.5) * 3.5;
    jitterTargetY = (Math.random() - 0.5) * 2.5;
    jitterTimer = 0.08 + Math.random() * 0.12;
  }
  jitterX = lerp(jitterX, jitterTargetX, 0.25);
  jitterY = lerp(jitterY, jitterTargetY, 0.25);

  blinkTimer += dt;
  if (blinkTimer >= nextBlink && blinkDir === 0) {
    blinkDir = 1;
  }

  let blinkScale = 1;
  if (blinkDir !== 0) {
    blinkT += dt * (blinkDir === 1 ? 8 : 5);
    if (blinkT >= 1 && blinkDir === 1) {
      blinkT = 1;
      blinkDir = -1;
    }
    if (blinkT <= 0 && blinkDir === -1) {
      blinkT = 0;
      blinkDir = 0;
      blinkTimer = 0;
      nextBlink = 1.8 + Math.random() * 3.0;
    }
    blinkScale = blinkDir === 1 ? 1 - ease(blinkT) : ease(1 - blinkT);
  }

  const t = ease(robotAnimationT);
  const current = robotAnimationT < 1 ? lerpState(robotFromState, robotToState, t) : robotToState;
  robotLiveRGB = robotAnimationT < 1 ? lerpRGB(robotFromRGB, robotToRGB, t) : [...robotToRGB];
  drawRobot(current, robotMotionPhase, blinkScale);
  robotAnimationFrame = requestAnimationFrame(robotFrame);
}

function drawRobot(state, phase = 0, blinkScale = 1) {
  const canvas = document.getElementById('robotCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#ffffff');
  bg.addColorStop(1, '#f5f9ff');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const fx = 18;
  const fy = 12;
  const fw = W - 36;
  const fh = H - 24;
  const fr = 52;

  roundedRectPath(ctx, fx, fy, fw, fh, fr);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  const pulse = 0.78 + 0.22 * Math.sin(phase);
  const neonLayers = [
    { blur: 36, width: 12, alpha: 0.22 * pulse },
    { blur: 18, width: 6, alpha: 0.45 * pulse },
    { blur: 7, width: 3, alpha: 0.75 },
    { blur: 0, width: 2, alpha: 1 }
  ];

  neonLayers.forEach(layer => {
    ctx.save();
    ctx.shadowColor = rgb(robotLiveRGB);
    ctx.shadowBlur = layer.blur;
    roundedRectPath(ctx, fx, fy, fw, fh, fr);
    ctx.strokeStyle = rgb(robotLiveRGB, layer.alpha);
    ctx.lineWidth = layer.width;
    ctx.stroke();
    ctx.restore();
  });

  const blink = Math.max(0.04, Math.min(1, blinkScale));
  const eyeWidth = 92;
  const eyeCenters = [W * 0.3, W * 0.7];
  const eyeCenterY = H * 0.5;

  eyeCenters.forEach((cx, index) => {
    const eye = state.eyes[index];
    const jx = eyeOffsetX + (index === 0 ? jitterX : -jitterX * 0.7);
    const jy = eyeOffsetY + jitterY;

    ctx.save();
    ctx.shadowColor = 'rgba(0,210,200,0.6)';
    ctx.shadowBlur = 18;
    eyeTrapPath(ctx, cx, eyeCenterY, eyeWidth, eye.h, eye.tl, eye.tr, jx, jy, blink);
    ctx.fillStyle = '#00D4CC';
    ctx.fill();
    ctx.shadowBlur = 0;

    eyeTrapPath(ctx, cx, eyeCenterY, eyeWidth, eye.h, eye.tl, eye.tr, jx, jy, blink);
    ctx.strokeStyle = 'rgba(0,170,165,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  });
}

async function loadInitialDatabase() {
  const data = await loadJsonFetch();
  if (Array.isArray(data) && data.length) return data;
  if (data && Array.isArray(data.components)) return data.components;
  return DEFAULT_DB;
}

async function loadJsonFetch() {
  try {
    const response = await fetch(DB_SOURCE);
    if (!response.ok) return null;
    return await response.json();
  } catch (_) {
    return null;
  }
}

function saveDB() {
  localStorage.setItem('componentbot_db', JSON.stringify(db));
  localStorage.setItem('componentbot_stats', JSON.stringify(stats));
  updateUI();
}

function getComponentType(component) {
  const attrs = component.attrs || {};
  const match = TYPE_RULES.find(rule => rule.test(attrs));
  return match ? match.key : 'General';
}

function getTypeSummary(items) {
  const summary = new Map();

  items.forEach(component => {
    const type = getComponentType(component);
    if (!summary.has(type)) {
      summary.set(type, { count: 0, names: [] });
    }
    const bucket = summary.get(type);
    bucket.count += 1;
    bucket.names.push(component.name);
  });

  return [...summary.entries()]
    .map(([type, info]) => ({
      type,
      count: info.count,
      names: info.names.sort((a, b) => a.localeCompare(b, 'es'))
    }))
    .sort((a, b) => b.count - a.count || a.type.localeCompare(b.type, 'es'));
}

function getActiveAttributes(component) {
  const attrs = component.attrs || {};
  return Object.entries(attrs)
    .filter(([, value]) => value === true)
    .map(([key]) => ATTR_LABELS[key] || key)
    .sort((a, b) => a.localeCompare(b, 'es'));
}

function updateUI() {
  document.getElementById('dbCount').textContent = db.length;
  document.getElementById('sessionCount').textContent = stats.games;
  document.getElementById('statTotal').textContent = db.length;
  document.getElementById('statLearned').textContent = stats.learned;
  document.getElementById('statAttr').textContent = Object.keys(ATTR).length;
  document.getElementById('statGames').textContent = stats.games;

  const typeSummary = getTypeSummary(db);
  const typeCounter = document.getElementById('statTypes');
  if (typeCounter) typeCounter.textContent = typeSummary.length;

  const typeGrid = document.getElementById('typeVarietyGrid');
  if (typeGrid) {
    typeGrid.innerHTML = typeSummary.map(item => {
      const previewNames = item.names.slice(0, 6);
      const rest = item.names.length - previewNames.length;
      const extraChip = rest > 0 ? `<span class="type-chip type-chip-more">+${rest} mas</span>` : '';
      return `
        <article class="type-card">
          <div class="type-head">
            <span class="type-name">${item.type}</span>
            <span class="type-count">${item.count}</span>
          </div>
          <div class="type-chip-list">
            ${previewNames.map(name => `<span class="type-chip">${name}</span>`).join('')}
            ${extraChip}
          </div>
        </article>
      `;
    }).join('');
  }

  const grid = document.getElementById('componentGrid');
  const sortedByType = [...db].sort((a, b) => {
    const typeA = getComponentType(a);
    const typeB = getComponentType(b);
    if (typeA !== typeB) return typeA.localeCompare(typeB, 'es');
    return a.name.localeCompare(b.name, 'es');
  });

  const coverage = document.getElementById('componentCoverage');
  if (coverage) {
    coverage.textContent = `Mostrando ${sortedByType.length} de ${db.length} componentes`;
  }

  grid.innerHTML = sortedByType.map(c => {
    const isNew = c.isLearned || false;
    const type = getComponentType(c);
    const attrs = getActiveAttributes(c);
    const attrsHtml = attrs.length
      ? attrs.map(label => `<span class="comp-attr">${label}</span>`).join('')
      : '<span class="comp-attr comp-attr-empty">Sin atributos marcados</span>';

    return `
      <article class="comp-chip ${isNew ? 'new-chip' : ''}" title="${c.desc || ''}">
        <div class="comp-head">
          <span class="comp-name">${isNew ? '✦ ' : ''}${c.name}</span>
          <span class="comp-type">${type}</span>
        </div>
        <div class="comp-desc">${c.desc || 'Sin descripcion registrada.'}</div>
        <div class="comp-attrs">${attrsHtml}</div>
      </article>
    `;
  }).join('');
}

function startGame() {
  candidates = [...db];
  askedAttrs = [];
  answersLog = [];
  clearHistory();
  stats.games += 1;
  saveDB();
  showPhase('phaseQuestion');
  askNextQuestion();
}

function getBestQuestion() {
  let bestScore = Infinity;
  const bestAttrs = [];

  Object.keys(ATTR).forEach(attr => {
    if (askedAttrs.includes(attr)) return;
    let yes = 0;
    let no = 0;

    candidates.forEach(item => {
      if (item.attrs[attr] === true) yes += 1;
      if (item.attrs[attr] === false) no += 1;
    });

    const score = Math.abs(yes - no);
    if (score < bestScore) {
      bestScore = score;
      bestAttrs.length = 0;
      bestAttrs.push(attr);
    } else if (score === bestScore) {
      bestAttrs.push(attr);
    }
  });

  if (!bestAttrs.length) return null;
  return bestAttrs[Math.floor(Math.random() * bestAttrs.length)];
}

function askNextQuestion() {
  if (!candidates.length) {
    showGuess({ name: 'Componente desconocido', desc: 'No encontré ningún componente con esas características.' });
    return;
  }

  if (candidates.length === 1) {
    showGuess(candidates[0]);
    return;
  }

  const attr = getBestQuestion();
  if (!attr) {
    showGuess(candidates[0]);
    return;
  }

  const askedCount = askedAttrs.length;
  const total = Object.keys(ATTR).length;
  const progress = Math.round((askedCount / total) * 100);

  document.getElementById('questionNumber').textContent = `PREGUNTA ${String(askedCount + 1).padStart(2, '0')}`;
  document.getElementById('candidatesCount').textContent = candidates.length;
  document.getElementById('progressFill').style.width = `${progress}%`;
  document.getElementById('progressPct').textContent = `${progress}%`;
  typeQuestion(ATTR[attr]);
  window._currentAttr = attr;
  if (window._currentPhase === 'phaseQuestion') {
    updateEyeMood(getQuestionMood(true));
  }
}

function typeQuestion(text) {
  const el = document.getElementById('questionText');
  if (typingInterval) clearInterval(typingInterval);
  el.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  el.appendChild(cursor);

  let index = 0;
  typingInterval = setInterval(() => {
    if (index < text.length) {
      el.insertBefore(document.createTextNode(text[index]), cursor);
      index += 1;
    } else {
      clearInterval(typingInterval);
      cursor.remove();
    }
  }, 16);
}

function answer(value) {
  const attr = window._currentAttr;
  if (!attr) return;

  addLogEntry(ATTR[attr], value);
  answersLog.push({ attr, value, question: ATTR[attr] });
  reactToAnswer(value);

  if (value !== null && value !== 'unknown') {
    candidates = candidates.filter(item => {
      const itemValue = item.attrs[attr];
      return itemValue === undefined || itemValue === value;
    });
  }

  askedAttrs.push(attr);
  askNextQuestion();
}

function addLogEntry(question, value) {
  const history = document.getElementById('historyLog');
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  const label = question.length > 55 ? `${question.slice(0, 55)}…` : question;
  const statusClass = value === true ? 'log-yes' : value === false ? 'log-no' : value === 'unknown' ? 'log-unknown' : 'log-maybe';
  const statusText = value === true ? '✔ SÍ' : value === false ? '✖ NO' : value === 'unknown' ? '— NO SÉ' : '~ TAL VEZ';

  entry.innerHTML = `<span class="log-q">${label}</span><span class="log-a ${statusClass}">${statusText}</span>`;
  history.appendChild(entry);
  history.scrollTop = history.scrollHeight;
}

function clearHistory() {
  document.getElementById('historyLog').innerHTML = '';
}

function showGuess(component) {
  // Mostrar solo el nombre del componente al revelar la suposición
  document.getElementById('guessName').textContent = component.name;
  document.getElementById('guessDesc').textContent = '';
  document.getElementById('guessIcon').textContent = '';
  window._currentGuess = component;
  showPhase('phaseGuess');
}

function getComponentIcon(name) {
  const icons = {
    'Resistencia': '🔩',
    'LED': '💡',
    'LED RGB': '🌈',
    'ESP32': '📡',
    'HC-SR04': '📏',
    'LCD 16x2': '🖥️',
    'Servomotor SG90': '🔧',
    'Módulo Relé': '🔌',
    'DHT22': '🌡️',
    'Timer 555': '⏱️',
    'Arduino Uno': '🟦',
    'Transistor MOSFET': '⚡'
  };
  return icons[name] || '🔌';
}

function confirmGuess(correct) {
  if (correct) {
    showPhase('phaseCorrect');
  } else {
    document.getElementById('correctComponentInput').value = '';
    showPhase('phaseWrong');
    setTimeout(() => document.getElementById('correctComponentInput').focus(), 120);
  }
}

function proceedWithCorrect() {
  const name = document.getElementById('correctComponentInput').value.trim();
  if (!name) {
    alert('Por favor escribe el nombre del componente.');
    return;
  }

  newCompName = name;
  const existing = db.find(item => item.name.toLowerCase() === name.toLowerCase());

  if (existing) {
    document.getElementById('learnComponentName').textContent = `${existing.name} (actualizar)`;
    buildLearnGrid(existing.attrs);
    showLearnNotice('✦ Este componente ya existe. Ajusta sus atributos y guarda los cambios.');
    window._learnExisting = existing;
  } else {
    document.getElementById('learnComponentName').textContent = name;
    buildLearnGrid({});
    hideLearnNotice();
    window._learnExisting = null;
  }

  showPhase('phaseLearn');
}

function buildLearnGrid(existingAttrs) {
  learnAttrs = {};
  const grid = document.getElementById('learnGrid');
  grid.innerHTML = '';

  Object.entries(ATTR).forEach(([attr, label]) => {
    const value = existingAttrs[attr];
    learnAttrs[attr] = value === undefined ? null : value;
    const tile = document.createElement('div');
    tile.className = `learn-attr ${value === true ? 'active-yes' : value === false ? 'active-no' : ''}`;
    tile.dataset.attr = attr;
    tile.innerHTML = `<span class="attr-label">${ATTR_LABELS[attr]}</span><span class="attr-toggle">${value === true ? '✔' : value === false ? '✖' : '?'}</span>`;
    tile.addEventListener('click', () => toggleLearnAttr(attr, tile));
    grid.appendChild(tile);
  });
}

function toggleLearnAttr(attr, element) {
  const current = learnAttrs[attr];
  const next = current === null ? true : current === true ? false : null;
  learnAttrs[attr] = next;
  element.className = `learn-attr ${next === true ? 'active-yes' : next === false ? 'active-no' : ''}`;
  element.querySelector('.attr-toggle').textContent = next === true ? '✔' : next === false ? '✖' : '?';
}

function saveLearnedComponent() {
  const attrs = Object.keys(ATTR).reduce((acc, key) => {
    acc[key] = learnAttrs[key] === true;
    return acc;
  }, {});

  if (window._learnExisting) {
    window._learnExisting.attrs = attrs;
  } else {
    const id = `${newCompName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}_${Date.now()}`;
    db.push({ id, name: newCompName, desc: `Componente aprendido por el usuario: ${newCompName}`, attrs, isLearned: true });
    stats.learned += 1;
  }

  saveDB();
  showPhase('phaseIntro');
  showTemporaryNotice(`✦ Componente <strong>${newCompName}</strong> guardado correctamente.`);
}

function showLearnNotice(message) {
  const notice = document.getElementById('learnNotice');
  notice.style.display = 'block';
  notice.textContent = message;
}

function hideLearnNotice() {
  const notice = document.getElementById('learnNotice');
  notice.style.display = 'none';
  notice.textContent = '';
}

function showTemporaryNotice(message) {
  const intro = document.getElementById('phaseIntro');
  const notice = document.createElement('div');
  notice.className = 'notice notice-info';
  notice.innerHTML = message;
  intro.appendChild(notice);
  setTimeout(() => notice.remove(), 4500);
}

function showPhase(id) {
  phaseIds.forEach(phase => {
    const element = document.getElementById(phase);
    if (!element) return;
    element.classList.toggle('hidden', phase !== id);
    if (phase === id) {
      element.classList.add('fade-in');
      setTimeout(() => element.classList.remove('fade-in'), 320);
    }
  });
  window._currentPhase = id;
  updateEyeMood(id === 'phaseQuestion' ? getQuestionMood() : id);
}

function exportDB() {
  const payload = { version: '1.0', date: new Date().toISOString(), stats, components: db };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `componentbot_backup_${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function importDB(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const imported = JSON.parse(ev.target.result);
      const components = Array.isArray(imported.components) ? imported.components : Array.isArray(imported) ? imported : null;
      if (!components) throw new Error('Formato JSON inválido.');
      db = components;
      if (imported.stats) stats = imported.stats;
      saveDB();
      alert(`✦ Base de datos importada: ${db.length} componentes.`);
    } catch (error) {
      alert(`Error al importar JSON: ${error.message}`);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function resetDB() {
  const confirmed = confirm('⚠ ¿Seguro? Esto eliminará los componentes aprendidos y reseteará las estadísticas.');
  if (!confirmed) return;
  db = [...DEFAULT_DB];
  stats = { games: 0, learned: 0 };
  saveDB();
  alert('Base de datos restaurada a los valores iniciales.');
}

function toggleDBPanel() {
  const body = document.getElementById('dbPanelBody');
  const arrow = document.getElementById('dbArrow');
  const isOpen = body.classList.toggle('open');
  arrow.textContent = isOpen ? '▲' : '▼';
  if (isOpen) updateUI();
}

window.startGame = startGame;
window.answer = answer;
window.confirmGuess = confirmGuess;
window.proceedWithCorrect = proceedWithCorrect;
window.saveLearnedComponent = saveLearnedComponent;
window.exportDB = exportDB;
window.importDB = importDB;
window.resetDB = resetDB;
window.toggleDBPanel = toggleDBPanel;

init();
