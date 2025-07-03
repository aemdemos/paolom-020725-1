/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container representing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all columns (immediate children of grid layout)
  const columns = Array.from(grid.children);

  // Defensive: skip if no columns found
  if (!columns.length) return;

  // Table header must be a single-cell row
  const headerRow = ['Columns (columns32)'];

  // The second row contains one cell for each column in the grid
  const columnsRow = columns;

  // Correct: rows is an array of arrays; headerRow is single-cell
  const rows = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
