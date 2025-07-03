/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row (must match example exactly)
  const headerRow = ['Hero (hero33)'];

  // 2. Find the grid layout containing the image and the text block
  const container = element.querySelector('.container');
  let grid = null;
  if (container) {
    grid = container.querySelector('.grid-layout');
  }

  // 3. Find the prominent image (background image)
  let imgEl = null;
  if (grid) {
    imgEl = grid.querySelector('img');
  }

  // 4. Find the text content block (it's the non-image direct child of grid)
  let textBlock = null;
  if (grid) {
    const children = Array.from(grid.children);
    for (const child of children) {
      if (child !== imgEl) {
        textBlock = child;
        break;
      }
    }
  }

  // Edge cases: if no image or no text block, place empty string
  const imageRow = [imgEl ? imgEl : ''];
  const textRow = [textBlock ? textBlock : ''];

  // 5. Assemble rows
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  // 6. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
