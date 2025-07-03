/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column divs (each column in the layout)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: if there are no columns, do nothing
  if (!columnDivs.length) return;

  // Header row: exactly ONE cell, regardless of number of columns
  const headerRow = ['Columns (columns40)'];

  // Content row: one cell per column
  const contentRow = columnDivs;

  // Compose the cells array for createTable
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table using the helper
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
