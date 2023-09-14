let cells = [];
/* Array des cells a remplir avec la fonction */

function generateGrid() {
  var gridContainer = document.getElementById("grid__container");
  var gridWidth = document.documentElement.scrollWidth;
  var gridHeight = document.documentElement.scrollHeight;

  var cellSize = 72; // Taille de chaque cellule de la grille /!\ Pensez a changer la taille ici ET en css si y'as des modifs a faire. /!\

  var numColumns = Math.floor(gridWidth / cellSize);
  var numRows = Math.floor(gridHeight / cellSize);

  for (var row = 0; row < numRows; row++) {
    for (var col = 0; col < numColumns; col++) {
      var cell = document.createElement("div");
      cell.classList.add("grid__cell");
      gridContainer.appendChild(cell);
    }
  }

  cells = Array.from(document.querySelectorAll(".grid__cell")); // Convertit la NodeList en tableau et le retourne pour qu'on puisse l'utiliser ensuite
  return cells;
}

window.addEventListener("load", generateGrid);

window.addEventListener("load", () => {
   // On recuepre pour chaque cell la couleur de background pour eviter des bugs au moment du fade. Et on l'enregistre dans un attribut pour le récuperer plus tard.
    cells.forEach((cell) => {
      cell.setAttribute('data-bg',getComputedStyle(cell).backgroundColor)
    });

  // On change la couleur.
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      let cell_tl = gsap.timeline();
      cell_tl.to(cell, {
        duration: 0.08,
        // La couleur doit etre celle du CSS mais SANS '00' a la fin. et vice versa. Ca permet une transition smooth sans passer par des couleurs non voulu.
        backgroundColor: "#CFCFCF40",
        ease: "power2.inOut"
      });
    });

    // On remet celle d'avant avec l'attribut
    cell.addEventListener("mouseout", () => {
      let cell_tl = gsap.timeline();
      cell_tl.to(cell, {
        duration: 0.5,
        backgroundColor: cell.getAttribute('data-bg'),
        ease: "power2.Out"
      });
    });
  });
});

// Selectionne tous les containers de cartes et toutes les cartes
const cardsContainers = Array.from(document.querySelectorAll(".cards"));
const cards = Array.from(document.querySelectorAll(".card"));

// Fonction pour appliquer l'effet d'overlay
const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget.querySelector('.overlay');
  const x = e.pageX - e.currentTarget.offsetLeft;
  const y = e.pageY - e.currentTarget.offsetTop;
  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

// Fonction pour créer l'élément CTA de l'overlay
const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCard.append(overlayCta);
};

// Fonction pour initialiser une carte
const initOverlayCard = (cardEl, overlay) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  // Ici, vous pouvez ajouter le code de ResizeObserver si nécessaire
};

// Boucle sur chaque container de cartes
cardsContainers.forEach((cardsContainer) => {
  const cardsContainerInner = cardsContainer.querySelector(".cards__inner");
  const overlay = cardsContainer.querySelector(".overlay");

  // Initialise chaque carte dans ce container
  const cardsInContainer = Array.from(cardsContainer.querySelectorAll(".card"));
  cardsInContainer.forEach((card) => initOverlayCard(card, overlay));
  
  // Ajoute l'écouteur d'événements pour cette instance particulière
  cardsContainer.addEventListener("pointermove", applyOverlayMask);
});



