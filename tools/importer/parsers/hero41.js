/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const outerGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!outerGrid) return;

  const gridChildren = outerGrid.querySelectorAll(':scope > div');

  // 1. Extract the background image (if present)
  let imageEl = null;
  if (gridChildren.length > 0) {
    imageEl = gridChildren[0].querySelector('img');
  }

  // 2. Extract the hero content block (headline, subheading, cta)
  let contentBlock = null;
  if (gridChildren.length > 1) {
    // Usually the content is inside a .grid-layout
    const possibleBlock = gridChildren[1].querySelector('.w-layout-grid.grid-layout');
    contentBlock = possibleBlock || gridChildren[1];
  }

  // Defensive: If imageEl or contentBlock are null, substitute empty string
  const cells = [
    ['Hero (hero41)'],
    [imageEl || ''],
    [contentBlock || '']
  ];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
