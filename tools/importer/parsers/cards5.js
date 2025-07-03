/* global WebImporter */
export default function parse(element, { document }) {
  // Header matches exactly 'Cards (cards5)'
  const headerRow = ['Cards (cards5)'];
  const rows = [headerRow];

  // Each card is an <a.card-link>
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach(card => {
    // Get the image (first .utility-aspect-3x2) -- inside a div, contains <img>
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imageContainer) {
      img = imageContainer.querySelector('img');
    }
    // Get the text content
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const textParts = [];
    if (textContainer) {
      // Tag (optional)
      const tag = textContainer.querySelector('.tag');
      if (tag) {
        textParts.push(tag);
      }
      // Heading (optional)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) {
        textParts.push(heading);
      }
      // Description (optional)
      const p = textContainer.querySelector('p');
      if (p) {
        textParts.push(p);
      }
    }
    // Add the row: [image, all text content as array]
    rows.push([
      img,
      textParts
    ]);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
