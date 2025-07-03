/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for block name
  const rows = [['Cards (cards39)']];

  // Find the main grid containing cards
  let mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) mainGrid = element;

  // Gather all card-wrapping <a> tags in correct order (outer grid first, then nested grid)
  const cardEls = [];
  Array.from(mainGrid.children).forEach((child) => {
    if (child.matches('a.utility-link-content-block, a.utility-link-content-block.w-inline-block')) {
      cardEls.push(child);
    } else if (child.matches('div.w-layout-grid.grid-layout')) {
      // Add all direct child cards from nested grid
      cardEls.push(...child.querySelectorAll(':scope > a.utility-link-content-block, :scope > a.utility-link-content-block.w-inline-block'));
    }
  });

  cardEls.forEach((card) => {
    // Image: always first image inside the card
    const img = card.querySelector('img');

    // For text cell: collect heading(s), paragraph(s), and CTA(s) in source order
    const textCell = [];
    // Get content containers in source order
    const contentContainers = [];
    // Some cards have a <div> with padding, some do not
    let contentDiv = card.querySelector('.utility-padding-all-2rem');
    if (contentDiv) {
      contentContainers.push(...Array.from(contentDiv.children));
    } else {
      // Fallback: push all direct children that are not image wrappers
      Array.from(card.children).forEach((c) => {
        if (!c.classList.contains('utility-aspect-2x3') && !c.classList.contains('utility-aspect-1x1')) {
          contentContainers.push(c);
        }
      });
    }
    contentContainers.forEach((item) => {
      textCell.push(item);
    });
    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
