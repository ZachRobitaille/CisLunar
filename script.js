"use strict";

const englishCopy = {"Animation : activée": "Animation: on", "Animation : désactivée": "Animation: off", "Masquez d’abord la Terre pour essayer le relais.": "Block Earth first to try the relay.", "Un trajet dégagé entre une antenne lunaire et la Terre": "A clear path between a lunar antenna and Earth", "À gauche, une antenne sur le sol lunaire. Le trait monte vers la Terre au-dessus de la montagne : le relief ne bloque pas le trajet.": "A lunar antenna stands on the left. The line reaches Earth above the mountain: the terrain does not block the path.", "Terre": "Earth", "Terre visible : un trajet direct est possible.": "Earth visible: a direct path is possible.", "La ligne passe au-dessus de la crête. Le relief ne bloque pas le signal, mais la puissance, le pointage et la disponibilité du réseau restent à vérifier.": "The line clears the ridge. The terrain does not block the signal, but power, antenna pointing and network availability still need to be checked.", "Le relief lunaire bloque le trajet direct vers la Terre": "Lunar terrain blocks the direct path to Earth", "Le trait part de l’antenne à gauche et rencontre le relief à droite, au niveau d’une croix. Le pointillé au-delà représente le trajet interrompu vers la Terre masquée.": "The line leaves the antenna on the left and meets the terrain at a cross on the right. The dashed line beyond it represents the blocked path to Earth.", "Terre masquée : le trajet direct est bloqué.": "Earth blocked: the direct path is unavailable.", "Le relief coupe le trajet direct. Activez « Rétablir le lien par satellite » pour ajouter un relais qui voit à la fois l’antenne et la Terre.": "The terrain blocks the direct path. Choose “Reconnect through a satellite” to add a relay with a clear view of both the antenna and Earth.", "Un satellite relaie le signal au-dessus du relief lunaire": "A satellite relays the signal above the lunar terrain", "Deux segments clairs relient l’antenne lunaire au satellite situé au-dessus de la crête, puis le satellite à la Terre à droite. Le trajet direct, en pointillé, reste bloqué par le relief.": "Two bright segments connect the lunar antenna to the satellite above the ridge, then the satellite to Earth on the right. The dashed direct path remains blocked by terrain.", "Terre toujours masquée au sol : le satellite fait le relais.": "Earth is still blocked from the surface: the satellite provides the relay.", "L’antenne rejoint le satellite, qui transmet vers la Terre par un second trajet dégagé. Cette géométrie illustre un contournement du relief ; une vraie liaison exige aussi une orbite adaptée, des terminaux compatibles, de l’énergie et une couverture disponible.": "The antenna reaches the satellite, which forwards the signal to Earth along a second clear path. This geometry illustrates a route around the terrain; a real link also needs a suitable orbit, compatible terminals, power and available coverage.", "La Terre est masquée : vous pouvez maintenant ajouter le satellite.": "Earth is blocked: you can now add the satellite.", "Le trajet direct reste bloqué ; les deux étapes du relais contournent le relief.": "The direct path remains blocked; the two relay legs bypass the terrain."};
const localize = text => document.documentElement.lang === "en" ? (englishCopy[text] || text) : text;

// Agrandit les illustrations sans quitter la page.
if (document.querySelector("[data-image-preview]") && typeof HTMLDialogElement !== "undefined") {
  const isEnglish = document.documentElement.lang === "en";
  const viewer = document.createElement("dialog");
  viewer.className = "image-viewer";
  viewer.setAttribute("aria-label", isEnglish ? "Image preview" : "Aperçu de l’image");

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "image-viewer-close";
  closeButton.textContent = "×";
  closeButton.setAttribute("aria-label", isEnglish ? "Close image" : "Fermer l’image");
  closeButton.setAttribute("autofocus", "");

  const image = document.createElement("img");
  viewer.append(closeButton, image);
  document.body.append(viewer);

  let opener;
  document.addEventListener("click", event => {
    const link = event.target.closest("a[data-image-preview]");
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
        typeof viewer.showModal !== "function") return;

    event.preventDefault();
    opener = link;
    image.alt = link.closest("figure")?.querySelector("img")?.alt ?? "";
    image.src = link.href;
    viewer.showModal();
  });

  closeButton.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", event => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("close", () => {
    image.removeAttribute("src");
    opener?.focus({ preventScroll: true });
  });
}

// Les deux versions conservent les mêmes pages et les mêmes ancres.
document.querySelectorAll(".language-switch a").forEach(link => {
  const destination = new URL(link.href);
  destination.hash = window.location.hash;
  link.href = destination.href;
});

// Les pointes restent ancrées au bouton ; la souris courbe seulement les trajets.
const downloadSection = document.querySelector('.software-download');
if (downloadSection) {
  const arrowSvg = downloadSection.querySelector('.download-arrows');
  const arrowPaths = Array.from(arrowSvg.querySelectorAll('.download-arrow'));
  const downloadButton = downloadSection.querySelector('.download-button');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const origins = [[.12,.04],[.43,.06],[.7,.02],[.12,.96],[.44,.95],[.96,.94]];
  let geometry;
  let frame = 0;
  let x = 0, y = 0, targetX = 0, targetY = 0;
  function drawArrows() {
    if (!geometry) return;
    const {width,height,cx,cy,panelLeft,panelRight,panelTop,panelBottom} = geometry;
    arrowPaths.forEach((path,i) => {
      const sx = origins[i][0] * width, sy = origins[i][1] * height;
      const vx = sx - cx, vy = sy - cy;
      // Arrêter la pointe avant la carte pour qu’elle reste visible en arrière-plan.
      const edgeX = Math.abs(vx) > .01 ? ((vx < 0 ? panelLeft : panelRight) - cx) / vx : Infinity;
      const edgeY = Math.abs(vy) > .01 ? ((vy < 0 ? panelTop : panelBottom) - cy) / vy : Infinity;
      const edge = Math.min(edgeX, edgeY);
      const ex = cx + vx * edge, ey = cy + vy * edge;
      const dx = ex - sx, dy = ey - sy;
      const bx = x * (26 + i * 4), by = y * (22 + i * 3);
      path.setAttribute('d', `M${sx} ${sy} C${sx + dx * .35 + bx} ${sy + dy * .35 + by},${sx + dx * .75 + bx * .5} ${sy + dy * .75 + by * .5},${ex} ${ey}`);
    });
  }
  function measureArrows() {
    const section = downloadSection.getBoundingClientRect();
    const button = downloadButton.getBoundingClientRect();
    const panel=downloadSection.querySelector('.download-panel').getBoundingClientRect();
    geometry = {width:section.width,height:section.height,cx:button.left-section.left+button.width/2,cy:button.top-section.top+button.height/2,panelLeft:panel.left-section.left-14,panelRight:panel.right-section.left+14,panelTop:panel.top-section.top-14,panelBottom:panel.bottom-section.top+14};
    arrowSvg.setAttribute('viewBox', `0 0 ${section.width} ${section.height}`);
    drawArrows();
  }
  function animateArrows() {
    frame = 0;
    x += (targetX - x) * .1;
    y += (targetY - y) * .1;
    drawArrows();
    if (Math.abs(targetX-x)+Math.abs(targetY-y)>.001 && !document.hidden) frame=requestAnimationFrame(animateArrows);
  }
  function scheduleArrows() {
    if (!frame && !reducedMotion.matches && finePointer.matches && !document.hidden) frame=requestAnimationFrame(animateArrows);
  }
  downloadSection.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
    const rect=downloadSection.getBoundingClientRect();
    targetX=(event.clientX-rect.left)/rect.width*2-1;
    targetY=(event.clientY-rect.top)/rect.height*2-1;
    scheduleArrows();
  },{passive:true});
  downloadSection.addEventListener('pointerleave',()=>{targetX=targetY=0;scheduleArrows();});
  function resetArrows() {
    cancelAnimationFrame(frame);frame=0;x=y=targetX=targetY=0;drawArrows();
  }
  reducedMotion.addEventListener('change',resetArrows);
  finePointer.addEventListener('change',resetArrows);
  window.addEventListener('blur',resetArrows);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)resetArrows();});
  new ResizeObserver(measureArrows).observe(downloadSection);
  measureArrows();
}

// Décor lunaire piloté par le pointeur : aucun mouvement autonome.
const lunarHero = document.querySelector('#accueil');
if (lunarHero) {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mousePreference = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionButton = document.querySelector('#lunar-motion');
  const stars = document.createElement('div');
  stars.className = 'lunar-stars';
  stars.setAttribute('aria-hidden', 'true');
  const particles = [];
  let fieldWidth = 0;
  let fieldHeight = 0;
  for (let i = 0; i < 70; i++) {
    const star = document.createElement('span');
    // Positions et propriétés tirées indépendamment à chaque chargement.
    const left = .015 + Math.random() * .97;
    const top = .025 + Math.random() * .94;
    const size = Math.random() < .16 ? 3.5 : 1.5 + Math.random();
    star.style.cssText = `left:${left * 100}%;top:${top * 100}%;--star-size:${size}px;opacity:${.65 + Math.random() * .35}`;
    stars.append(star);
    particles.push({element: star, left, top, x: 0, y: 0, glow: 0,
      depth: .4 + Math.random() * .9, easing: .065 + Math.random() * .072});
  }
  lunarHero.append(stars);
  let userEnabled = true;
  let frame = 0;
  let current = {x: 0, y: 0, px: 0, py: 0};
  let target = {...current};
  const enabled = () => userEnabled && !motionPreference.matches && mousePreference.matches;
  function paint() {
    frame = 0;
    let distance = 0;
    for (const key of ['x', 'y', 'px', 'py']) {
      current[key] += (target[key] - current[key]) * .12;
      distance += Math.abs(target[key] - current[key]);
    }
    lunarHero.style.setProperty('--moon-x', `${current.x * 18}px`);
    lunarHero.style.setProperty('--moon-y', `${current.y * 12}px`);
    const pointerPresent = lunarHero.classList.contains('pointer-present');
    const radius = Math.min(210, fieldWidth * .3);
    for (const particle of particles) {
      const dx = particle.left * fieldWidth - target.px;
      const dy = particle.top * fieldHeight - target.py;
      const length = Math.hypot(dx, dy);
      const proximity = pointerPresent && radius > 0 ? Math.max(0, 1 - length / radius) : 0;
      const force = proximity * proximity * (42 + particle.depth * 20);
      // Une étoile exactement sous le pointeur conserve une direction définie.
      const directionX = length > .01 ? dx / length : Math.cos(particle.left * 100);
      const directionY = length > .01 ? dy / length : Math.sin(particle.left * 100);
      const destinationX = directionX * force - current.x * 7 * particle.depth;
      const destinationY = directionY * force - current.y * 5 * particle.depth;
      particle.x += (destinationX - particle.x) * particle.easing;
      particle.y += (destinationY - particle.y) * particle.easing;
      particle.glow += (proximity - particle.glow) * particle.easing;
      distance += Math.abs(destinationX - particle.x) + Math.abs(destinationY - particle.y) + Math.abs(proximity - particle.glow);
      particle.element.style.transform = `translate(${particle.x.toFixed(2)}px, ${particle.y.toFixed(2)}px) scale(${(1 + particle.glow * .6).toFixed(3)})`;
      particle.element.style.filter = `brightness(${(1 + particle.glow * .9).toFixed(3)})`;
    }
    if (distance > .1 && enabled() && !document.hidden) frame = requestAnimationFrame(paint);
  }
  function schedule() {
    if (!frame && enabled() && !document.hidden) frame = requestAnimationFrame(paint);
  }
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    current = {x: 0, y: 0, px: 0, py: 0};
    target = {...current};
    lunarHero.classList.remove('pointer-present');
    lunarHero.style.removeProperty('--moon-x');
    lunarHero.style.removeProperty('--moon-y');
    for (const particle of particles) {
      particle.x = particle.y = particle.glow = 0;
      particle.element.style.transform = '';
      particle.element.style.filter = '';
    }
  }
  function syncMotion() {
    reset();
    motionButton.hidden = motionPreference.matches || !mousePreference.matches;
    motionButton.setAttribute('aria-pressed', String(userEnabled));
    motionButton.textContent = localize(userEnabled ? 'Animation : activée' : 'Animation : désactivée');
    lunarHero.classList.toggle('motion-ready', enabled());
  }
  lunarHero.addEventListener('pointermove', event => {
    if (!enabled() || event.pointerType === 'touch') return;
    const bounds = lunarHero.getBoundingClientRect();
    fieldWidth = bounds.width;
    fieldHeight = bounds.height;
    const px = event.clientX - bounds.left;
    const py = event.clientY - bounds.top;
    target = {x: (px / bounds.width - .5) * 2, y: (py / bounds.height - .5) * 2, px, py};
    if (!lunarHero.classList.contains('pointer-present')) {
      current.px = px;
      current.py = py;
    }
    lunarHero.classList.add('pointer-present');
    schedule();
  }, {passive: true});
  lunarHero.addEventListener('pointerleave', () => {
    lunarHero.classList.remove('pointer-present');
    target.x = 0;
    target.y = 0;
    schedule();
  });
  motionButton.addEventListener('click', () => {
    userEnabled = !userEnabled;
    syncMotion();
  });
  motionPreference.addEventListener('change', syncMotion);
  mousePreference.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  window.addEventListener('blur', reset);
  syncMotion();
}

// Le menu reste visible sans JavaScript pour garder les liens accessibles.
const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
header.classList.add("enhanced");

function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  navigation.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

// Géométries fictives : liaison directe, masque local et relais visible.
const radioControls = document.querySelector('#radio-controls');
if (radioControls) {
  radioControls.hidden = false;
  const relayButton = radioControls.querySelector('[data-radio="relay"]');
  let currentRadioMode = 'clear';
  const descriptions = {
    clear: ['Un trajet dégagé entre une antenne lunaire et la Terre', 'À gauche, une antenne sur le sol lunaire. Le trait monte vers la Terre au-dessus de la montagne : le relief ne bloque pas le trajet.', 'Terre visible : un trajet direct est possible.', 'La ligne passe au-dessus de la crête. Le relief ne bloque pas le signal, mais la puissance, le pointage et la disponibilité du réseau restent à vérifier.'],
    blocked: ['Le relief lunaire bloque le trajet direct vers la Terre', 'Le trait part de l’antenne à gauche et rencontre le relief à droite, au niveau d’une croix. Le pointillé au-delà représente le trajet interrompu vers la Terre masquée.', 'Terre masquée : le trajet direct est bloqué.', 'Le relief coupe le trajet direct. Activez « Rétablir le lien par satellite » pour ajouter un relais qui voit à la fois l’antenne et la Terre.'],
    relay: ['Un satellite relaie le signal au-dessus du relief lunaire', 'Deux segments clairs relient l’antenne lunaire au satellite situé au-dessus de la crête, puis le satellite à la Terre à droite. Le trajet direct, en pointillé, reste bloqué par le relief.', 'Terre toujours masquée au sol : le satellite fait le relais.', 'L’antenne rejoint le satellite, qui transmet vers la Terre par un second trajet dégagé. Cette géométrie illustre un contournement du relief ; une vraie liaison exige aussi une orbite adaptée, des terminaux compatibles, de l’énergie et une couverture disponible.']
  };
  radioControls.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.dataset.radio;
      if (mode === 'relay' && currentRadioMode === 'clear') return;
      currentRadioMode = mode;
      relayButton.disabled = mode === 'clear';
      radioControls.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelector('#radio-clear').style.display = mode === 'clear' ? '' : 'none';
      document.querySelector('#radio-blocked').style.display = mode === 'blocked' ? '' : 'none';
      document.querySelector('#radio-relay').style.display = mode === 'relay' ? '' : 'none';
      document.querySelector('#relay-hint').textContent = localize(mode === 'clear'
        ? 'Masquez d’abord la Terre pour essayer le relais.'
        : mode === 'blocked' ? 'La Terre est masquée : vous pouvez maintenant ajouter le satellite.'
        : 'Le trajet direct reste bloqué ; les deux étapes du relais contournent le relief.');
      ['#radio-title', '#radio-desc', '#radio-status', '#radio-explanation'].forEach((id, i) => document.querySelector(id).textContent = localize(descriptions[mode][i]));
    });
  });
}
