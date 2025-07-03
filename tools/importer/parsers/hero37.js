/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, must match example exactly
  const headerRow = ['Hero (hero37)'];

  // Second row: background image (none in example HTML, leave blank)
  const bgRow = [''];

  // Third row: Title (Heading), Subheading, CTA (button)
  // HTML structure is:
  // section > div.container > div.grid-layout > (div.title-group, a.cta)
  const grid = element.querySelector('.grid-layout');
  let contentCell = [];
  if (grid) {
    // Get all immediate children
    const children = Array.from(grid.children);
    // Look for the div with headings and the a (button)
    const headingDiv = children.find((child) => child.tagName === 'DIV');
    const ctaLink = children.find((child) => child.tagName === 'A');

    if (headingDiv) {
      // Heading (h2)
      const heading = headingDiv.querySelector('h2');
      if (heading) contentCell.push(heading);
      // Subheading (p.subheading)
      const subheading = headingDiv.querySelector('p');
      if (subheading) contentCell.push(subheading);
    }
    if (ctaLink) {
      contentCell.push(ctaLink);
    }
  }
  // If no elements found, still ensure the cell exists
  if (contentCell.length === 0) contentCell = [''];

  const cells = [
    headerRow,
    bgRow,
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
