/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (block name)
  const headerRow = ['Hero (hero10)'];

  // --- Collage/Background image(s) ---
  // Find the image collage: .ix-hero-scale-3x-to-1x .grid-layout
  let grid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  let collageDiv = document.createElement('div');
  if (grid) {
    // Reference each image directly from the document (not cloning)
    grid.querySelectorAll('img').forEach(img => {
      collageDiv.appendChild(img);
    });
  }
  // If for some reason there are no images (rare edge case), leave collageDiv empty

  // --- Content: Title, Subheading, CTAs ---
  // Find the content area
  let contentDiv = document.createElement('div');
  let contentWrapper = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentWrapper) {
    // Get heading(s)
    const h1 = contentWrapper.querySelector('h1');
    if (h1) contentDiv.appendChild(h1);
    // Get subheading (p)
    const subP = contentWrapper.querySelector('p');
    if (subP) contentDiv.appendChild(subP);
    // Get CTAs (button group)
    const btnGroup = contentWrapper.querySelector('.button-group');
    if (btnGroup) contentDiv.appendChild(btnGroup);
  }
  // If contentWrapper is missing, contentDiv will simply be empty

  // As per example, 1 column, 3 rows: header, collage, content
  const rows = [
    headerRow,
    [collageDiv],
    [contentDiv]
  ];

  // Replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
