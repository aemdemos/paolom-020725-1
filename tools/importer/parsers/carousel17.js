/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the image slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Each direct child of the grid is a slide wrapper
  const slideDivs = Array.from(grid.children);

  // Each slide: first cell = image, second cell = text (none in this input)
  const rows = slideDivs.map((slide) => {
    // Find the img inside the nested structure
    const img = slide.querySelector('img');
    // Text: there is no text content for these slides in this HTML
    return [img, ''];
  });

  // Build the carousel block table: header row, then each slide as a row
  const cells = [
    ['Carousel (carousel17)'], // Header row with exact block name
    ...rows
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
