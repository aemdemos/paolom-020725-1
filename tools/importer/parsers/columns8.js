/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid with columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Reference the actual elements in the DOM (not clones) for table cells
  // This preserves all text, structure, and semantics from the source
  const leftCol = columns[0];
  const rightCol = columns[1];

  // The header row must be exactly as in the requirements
  const cells = [
    ['Columns (columns8)'],
    [leftCol, rightCol],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
