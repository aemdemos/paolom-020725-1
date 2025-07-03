/* global WebImporter */
export default function parse(element, { document }) {
  // Build cells array with header row as a single column
  const cells = [
    ['Carousel (carousel24)']
  ];

  // Attempt to find slide content
  const cardRotate = element.querySelector('.ix-card-rotate-2');
  if (cardRotate) {
    const cardBody = cardRotate.querySelector('.card-body');
    if (cardBody) {
      const img = cardBody.querySelector('img');
      const heading = cardBody.querySelector('.h4-heading');
      let textCell = '';
      if (heading) {
        const h4 = document.createElement('h4');
        h4.textContent = heading.textContent;
        textCell = h4;
      }
      // Add slide row as two columns (image, text)
      cells.push([
        img || '',
        textCell
      ]);
    }
  }

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
