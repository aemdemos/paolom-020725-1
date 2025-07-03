/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first descendant grid with .tablet-1-column (outer grid)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const children = Array.from(mainGrid.children);

  // Find the image (background visual)
  const img = children.find((child) => child.tagName === 'IMG');

  // Find the content block (the grid child that is not the img)
  const contentBlock = children.find((child) => child !== img);

  // The contentBlock contains a nested grid, whose only child contains the text/buttons section
  let contentSection = null;
  if (contentBlock) {
    // In most Webflow exports, the visual content is in a deeply nested single child grid
    const innerGrid = contentBlock.querySelector('.grid-layout');
    if (innerGrid && innerGrid.children.length === 1) {
      contentSection = innerGrid.firstElementChild;
    } else {
      // fallback: use contentBlock directly if structure is flatter
      contentSection = contentBlock;
    }
  }

  // Prepare the block table rows
  const headerRow = ['Hero (hero25)'];
  const imageRow = [img ? img : ''];
  const contentRow = [contentSection ? contentSection : ''];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
