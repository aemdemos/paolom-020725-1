/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout for columns
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid
  const children = Array.from(grid.children);

  // Defensive: Must have at least 3 children (intro, contact list, image) for this pattern
  if (children.length < 3) return;

  // Combine the first and second elements (intro + contact list) into the first column
  const firstCol = [children[0], children[1]];
  // The third element (image) as the second column
  const secondCol = children[2];

  // Build the table rows: header and content row (2 columns)
  const cells = [
    ['Columns (columns19)'],
    [firstCol, secondCol]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
