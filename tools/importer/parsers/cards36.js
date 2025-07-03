/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block definition
  const headerRow = ['Cards (cards36)'];

  // Select all top-level card containers
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach(div => {
    // Find the image inside each card div (should always exist)
    const img = div.querySelector('img');
    // For this HTML, there is no text content so second cell is empty
    rows.push([img, '']);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
