/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container and grid
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;
  const children = Array.from(mainGrid.children);
  // First row: heading | quote
  const heading = children.find(el => el.tagName === 'P' && el.className.includes('h2-heading'));
  const quote = children.find(el => el.tagName === 'P' && el.className.includes('paragraph-lg'));
  // Inner grid for avatar and logo
  const innerGrid = children.find(el => el.classList.contains('grid-layout') && el !== mainGrid);
  let avatar = '', logo = '';
  if (innerGrid) {
    const innerDivs = Array.from(innerGrid.children);
    avatar = innerDivs.find(div => div.classList.contains('flex-horizontal')) || '';
    logo = innerDivs.find(div => div.className && div.className.includes('utility-display-inline-block')) || '';
  }
  // Build block table: header, then two rows of two columns (heading|quote, avatar|logo)
  const cells = [
    ['Columns (columns27)'],
    [heading || '', quote || ''],
    [avatar || '', logo || '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
