/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as seen in the example
  const headerRow = ['Cards (cards15)'];

  // Gather all direct card elements
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  const rows = [];
  cards.forEach(card => {
    // Image in first cell (reference the actual img element)
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    let img = imgDiv ? imgDiv.querySelector('img') : null;

    // Textual content for second cell
    const textCell = document.createElement('div');
    // Tag & date row (optional, shown above heading)
    const tagDiv = card.querySelector('.flex-horizontal');
    if (tagDiv) {
      textCell.appendChild(tagDiv);
    }
    // Heading (h3)
    const heading = card.querySelector('h3');
    if (heading) {
      textCell.appendChild(heading);
    }
    // In this structure, there is no further description or CTA
    // but this will handle all available text content, in order
    rows.push([
      img,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
