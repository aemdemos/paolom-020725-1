/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all column elements (children of the grid)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row must be exactly one cell, with the block name
  const headerRow = ['Columns (columns11)'];
  // The second row: each cell is one column's content
  const contentRow = columns;

  // Build the table with exactly two rows: header (1 cell), content (n cells)
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
