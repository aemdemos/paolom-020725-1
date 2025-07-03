/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per guidelines
  const cells = [['Cards (cards4)']];

  // Helper: extract image if present, else return empty string
  function getImage(card) {
    const img = card.querySelector('img');
    return img || '';
  }

  // Helper: extract all tags as span elements
  function getTags(card) {
    const group = card.querySelector('.tag-group');
    if (!group) return [];
    return Array.from(group.querySelectorAll('.tag')).map(tag => tag);
  }

  // Helper: extract card text content with semantic HTML
  function getTextContent(card) {
    const nodes = [];
    // Tags (styled as spans)
    const tags = getTags(card);
    if (tags.length > 0) {
      tags.forEach((tag, i) => {
        nodes.push(tag);
        if (i < tags.length - 1) nodes.push(document.createTextNode(' '));
      });
      nodes.push(document.createElement('br'));
    }
    // Heading (keep whatever heading is present)
    const heading = card.querySelector('h2, h3, h4');
    if (heading) nodes.push(heading);
    // Paragraph (description)
    const para = card.querySelector('p');
    if (para) nodes.push(para);
    return nodes;
  }

  // Find the grid containing all the cards
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // --- First card: the large feature on the left ---
  const firstCard = children.find(el => el.tagName === 'A' && el.classList.contains('utility-link-content-block'));
  if (firstCard) {
    cells.push([
      getImage(firstCard),
      getTextContent(firstCard)
    ]);
  }

  // --- Next: two cards with image (right, upper) ---
  // These are inside the first .flex-horizontal
  const flexes = grid.querySelectorAll('div.flex-horizontal');
  if (flexes[0]) {
    const rightCards = flexes[0].querySelectorAll('a.utility-link-content-block');
    rightCards.forEach(card => {
      cells.push([
        getImage(card),
        getTextContent(card)
      ]);
    });
  }

  // --- Remaining: text-only cards in second .flex-horizontal ---
  if (flexes[1]) {
    const textCards = flexes[1].querySelectorAll('a.utility-link-content-block');
    textCards.forEach(card => {
      cells.push([
        '',
        getTextContent(card)
      ]);
    });
  }

  // Replace element with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
