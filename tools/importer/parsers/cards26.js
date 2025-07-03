/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per example
  const headerRow = ['Cards (cards26)'];

  // Find all direct card wrappers (each child div is a card)
  const cardNodes = Array.from(element.querySelectorAll(':scope > div'));

  // Collect card rows
  const rows = [headerRow];

  cardNodes.forEach(card => {
    // Always find the first img in card
    const img = card.querySelector('img');
    // Compose the text cell
    let textCell = [];
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    if (h3) textCell.push(h3);
    if (p) textCell.push(p);
    // If neither h3 nor p, ensure at least an empty string (so table stays 2 columns)
    if (!h3 && !p) textCell = '';
    rows.push([img, textCell]);
  });

  // Build table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
