/* global WebImporter */
export default function parse(element, { document }) {
  // Locate main two-column content
  const container = element.querySelector(':scope > .container');
  const mainGrid = container && container.querySelector(
    ':scope > .w-layout-grid.grid-layout.tablet-1-column'
  );
  const mainCols = mainGrid ? mainGrid.querySelectorAll(':scope > div') : [];

  // Defensive: if mainCols are missing, avoid breaking
  const leftCol = mainCols[0] || document.createElement('div');
  const rightCol = mainCols[1] || document.createElement('div');

  // Left column: eyebrow + h1
  const leftContent = [];
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftContent.push(eyebrow);
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);

  // Right column: rich text, author, button
  const rightContent = [];
  const desc = rightCol.querySelector('.rich-text');
  if (desc) rightContent.push(desc);

  // Author info block
  let authorBlock = null;
  const innerGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
  if (innerGrid) {
    const authorCandidates = innerGrid.querySelectorAll(
      ':scope > .flex-horizontal.y-center'
    );
    if (authorCandidates.length > 0) {
      authorBlock = authorCandidates[0];
    }
    if (authorBlock) rightContent.push(authorBlock);
    const button = innerGrid.querySelector('a.button');
    if (button) rightContent.push(button);
  }
  if (rightContent.filter(e => e.tagName === 'A').length === 0) {
    const fallbackButton = rightCol.querySelector('a.button');
    if (fallbackButton) rightContent.push(fallbackButton);
  }

  // Build main row: two columns (left, right)
  const mainRow = [leftContent, rightContent];

  // Get lower grid for images (should be 2 columns)
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  const imgDivs = imageGrid ? Array.from(imageGrid.children) : [];
  const imageRow = [imgDivs[0] || document.createElement('div'), imgDivs[1] || document.createElement('div')];

  // Prepare table rows
  const cells = [];
  // The header row: single cell, to be set with colspan below.
  cells.push(['Columns (columns16)']);
  // Then the main content row (2 columns)
  cells.push(mainRow);
  // Then the two images
  cells.push(imageRow);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix: set colspan on the header cell to cover all columns (should match the column count of second row)
  const headerRow = table.querySelector('tr:first-child');
  if (headerRow && headerRow.children.length === 1) {
    const th = headerRow.children[0];
    th.setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
