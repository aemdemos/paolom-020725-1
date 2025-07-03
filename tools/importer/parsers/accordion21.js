/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row exactly as specified
  const headerRow = ['Accordion (accordion21)'];
  const rows = [headerRow];

  // Find all accordion item wrappers: direct children with class 'divider'
  const accordionItems = element.querySelectorAll(':scope > .divider');
  accordionItems.forEach(divider => {
    // Each item should have a .w-layout-grid (or .grid-layout) with two children
    const grid = divider.querySelector('.w-layout-grid, .grid-layout');
    if (!grid) return;
    // Get all direct children of the grid (title, content)
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length < 2) return; // Skip if structure is broken
    const title = gridChildren[0];
    const content = gridChildren[1];
    // Use references to the existing elements
    rows.push([title, content]);
  });
  // Build the new table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
