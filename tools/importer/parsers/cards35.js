/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as specified
  const headerRow = ['Cards (cards35)'];

  // Get all immediate card wrappers
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');

  // Each card: Image in column 1, no text in column 2 (since there is no heading/text in HTML)
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the image element
    const img = cardDiv.querySelector('img');
    // Use the img element as-is for column 1, keep column 2 empty
    return [img, ''];
  });

  // Compose the table rows
  const cells = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(table);
}
