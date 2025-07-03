/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Hero (hero14)'];

  // Extract the two grid columns (background image and content)
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = '';
  let contentCell = '';
  if (grid) {
    const gridDivs = grid.querySelectorAll(':scope > div');
    // Background image row
    if (gridDivs.length > 0) {
      const img = gridDivs[0].querySelector('img');
      if (img) {
        bgImg = img;
      }
    }
    // Content row: gather ALL meaningful children of .utility-margin-bottom-6rem except empty .button-group
    if (gridDivs.length > 1) {
      const col = gridDivs[1];
      const contentDiv = col.querySelector('.utility-margin-bottom-6rem');
      if (contentDiv) {
        const children = Array.from(contentDiv.children)
          .filter(el => !(el.classList && el.classList.contains('button-group') && !el.hasChildNodes()));
        if (children.length === 1) {
          contentCell = children[0];
        } else if (children.length > 1) {
          contentCell = children;
        } else {
          contentCell = '';
        }
      }
    }
  }
  const cells = [
    headerRow,
    [bgImg],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
