/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should have only one cell, as per the example
  const headerRow = ['Carousel (carousel38)'];

  // Find the top-level grid layout (two columns: text and images)
  const topGrid = element.querySelector('.grid-layout');
  const gridChildren = Array.from(topGrid.children);
  let textCol = null;
  let imageCol = null;

  for (const child of gridChildren) {
    if (child.querySelector('h1, h2, h3, h4, h5, h6')) {
      textCol = child;
    } else if (child.querySelector('img')) {
      imageCol = child;
    }
  }

  // Find all images in the imageCol (they're inside a nested grid)
  let images = [];
  if (imageCol) {
    const imagesGrid = imageCol.querySelector('.grid-layout');
    if (imagesGrid) {
      images = Array.from(imagesGrid.querySelectorAll('img'));
    } else {
      images = Array.from(imageCol.querySelectorAll('img'));
    }
  }

  // Each slide: [image, textCol (only first slide) or empty string]
  const rows = images.map((img, idx) => [img, idx === 0 ? textCol : '']);
  
  // The header row must have only one cell, but slides are two columns
  // So we need to ensure the header row is 1 column (not ['header',''])
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
