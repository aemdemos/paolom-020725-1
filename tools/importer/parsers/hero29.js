/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Identify immediate children: text block (div) and image (img)
  let textBlock = null;
  let imgEl = null;
  Array.from(grid.children).forEach(child => {
    if (child.tagName === 'IMG') {
      imgEl = child;
    } else if (child.tagName === 'DIV') {
      textBlock = child;
    }
  });

  // Compose the text cell: include all children, preserving elements
  const textCell = textBlock ? Array.from(textBlock.children) : [];

  // Compose table cells according to spec
  const cells = [
    ['Hero (hero29)'],    // Header row -- must match block name
    [imgEl],             // Row for background image (may be null)
    [textCell]           // Row for text/cta content (array of original elements)
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
