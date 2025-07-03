/* global WebImporter */
export default function parse(element, { document }) {
  // Only use the first (active) tab content
  const activePane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activePane) return;

  // Find the grid layout that contains all content
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find any <img> inside grid for the background image
  const img = grid.querySelector('img');

  // Gather all non-image direct children of the grid for the content row
  const contentElements = [];
  Array.from(grid.children).forEach(child => {
    if (child.tagName !== 'IMG') {
      contentElements.push(child);
    }
  });

  // Compose table as per block structure: header, image, content
  const cells = [
    ['Hero (hero23)'],
    [img ? img : ''],
    [contentElements.length ? contentElements : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}