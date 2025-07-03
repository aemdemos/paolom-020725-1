/* global WebImporter */
export default function parse(element, { document }) {
  // --- Header row ---
  const headerRow = ['Hero (hero6)'];

  // --- 2nd row: background image ---
  // The background image is always the .cover-image img
  const bgImg = element.querySelector('img.cover-image');
  const imageRow = [bgImg ? bgImg : ''];

  // --- 3rd row: content (title, subheading, CTAs) ---
  // The content is inside the .card div
  const card = element.querySelector('.card');
  const contentRow = [card ? card : ''];

  // --- Table assembly ---
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}