/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per spec
  const headerRow = ['Cards (cards12)'];
  // Each card is a direct child div of the grid
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each card has an image, but no accompanying text elements
  const rows = cardDivs.map(div => {
    // Use the existing <img> element
    const img = div.querySelector('img');
    // If img is missing for some reason, provide an empty string
    return [img || '', ''];
  });
  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);
  // Replace the original element
  element.replaceWith(table);
}
