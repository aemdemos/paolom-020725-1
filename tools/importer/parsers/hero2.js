/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row for the Hero (hero2) block
  const headerRow = ['Hero (hero2)'];

  // Safely find the container and grid layout
  const container = element.querySelector('.container');
  let img = null;
  let textContent = null;
  if (container) {
    const grid = container.querySelector('.w-layout-grid');
    if (grid) {
      const gridChildren = grid.querySelectorAll(':scope > *');
      // Assume: one image, one text-content DIV
      gridChildren.forEach(child => {
        if (!img && child.tagName === 'IMG') img = child;
        else if (!textContent && child.tagName === 'DIV') textContent = child;
      });
    }
  }

  // Second row: background image (optional)
  const imageRow = [img || ''];

  // Third row: Title (heading), Subheading, Call to Action(s)
  const textRowContent = [];
  if (textContent) {
    // Heading (h1/h2/h3)
    const heading = textContent.querySelector('h1, h2, h3');
    if (heading) textRowContent.push(heading);
    // Subheading paragraph (specific class if present, else any p)
    const subheading = textContent.querySelector('p.subheading') || textContent.querySelector('p');
    if (subheading) textRowContent.push(subheading);
    // CTA buttons (if present)
    const buttonGroup = textContent.querySelector('.button-group');
    if (buttonGroup) textRowContent.push(buttonGroup);
  }
  // Make sure something goes into the row to avoid empty cell
  const textRow = [textRowContent.length > 0 ? textRowContent : ''];

  // Assemble the block
  const cells = [headerRow, imageRow, textRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
