/* global WebImporter */
export default function parse(element, { document }) {
  // The header for the cards block
  const headerRow = ['Cards (cards22)'];
  const cardRows = [];

  // Process each tab-pane for cards
  const tabPanes = element.querySelectorAll('[class*=w-tab-pane]');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link.secondary-card-link.utility-link-content-block');
    cards.forEach((card) => {
      // Try to get the image
      let imageCell = '';
      const aspect = card.querySelector('.utility-aspect-3x2');
      if (aspect) {
        const img = aspect.querySelector('img');
        if (img) imageCell = img;
      }

      // Try to get the heading (use first h3 or .h4-heading)
      let heading = card.querySelector('h3, .h4-heading');
      // Try to get description (first .paragraph-sm)
      let desc = card.querySelector('.paragraph-sm');

      // Construct the content cell with references to the real document nodes
      const contentParts = [];
      if (heading) contentParts.push(heading);
      if (desc) contentParts.push(desc);
      // Only add the row if there's at least image or text content
      if (imageCell || contentParts.length) {
        cardRows.push([
          imageCell || '',
          contentParts.length === 1 ? contentParts[0] : contentParts
        ]);
      }
    });
  });

  // Final table
  const tableRows = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
