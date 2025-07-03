/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header: must match example exactly
  const headerRow = ['Hero (hero7)'];

  // No background image present in this HTML; mark row 2 as empty string
  const bgImgRow = [''];

  // Content: get the grid and its children
  const grid = element.querySelector('.w-layout-grid');
  let title = null;
  let contentDiv = null;
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > *');
    title = gridChildren[0];
    contentDiv = gridChildren[1];
  }
  // Compose content cell: include title, then all children of the content div (p, a, etc.)
  const contentCellEls = [];
  if (title) contentCellEls.push(title);
  if (contentDiv) {
    // Add all direct children of contentDiv (do not clone or create, just reference)
    Array.from(contentDiv.children).forEach((el) => contentCellEls.push(el));
  }
  const contentRow = [contentCellEls];

  // Compose table structure: [header, background img, content]
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
