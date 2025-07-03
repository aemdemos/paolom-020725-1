/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Cards (cards34)'];

  // Get all direct <a> elements (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // Get the image (first img in card)
    const img = card.querySelector('img');

    // Find the card content container (the div after img)
    let textCell = null;
    const gridInner = card.querySelector('.w-layout-grid');
    if (gridInner) {
      // The children: [img, contentDiv]
      const children = Array.from(gridInner.children);
      // Find the first div after img
      textCell = children.find(child => child !== img && child.tagName === 'DIV');
    }
    // Fallback for robustness
    if (!textCell) {
      // Try to find a div inside the card as content cell, if needed
      const possibleDivs = Array.from(card.querySelectorAll('div'));
      textCell = possibleDivs.find(div => div !== img && div.childElementCount > 0);
    }
    
    // Use empty string if missing (edge case)
    return [img || '', textCell || ''];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
