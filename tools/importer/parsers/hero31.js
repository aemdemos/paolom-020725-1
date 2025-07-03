/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per instructions
  const cells = [['Hero (hero31)']];

  // Find the grid container for consistent extraction
  const grid = element.querySelector('.grid-layout');
  let contentEls = [];
  if (grid) {
    const children = Array.from(grid.children);

    // Author (optional, small text at top left)
    const authorEl = children.find(el => el.classList.contains('paragraph-xl'));
    if (authorEl) contentEls.push(authorEl);

    // Tags (optional, list of .tag)
    const tagsEl = children.find(el => el.classList.contains('flex-vertical'));
    if (tagsEl) contentEls.push(tagsEl);

    // Heading (h2)
    const headingEl = children.find(el => el.tagName === 'H2');
    if (headingEl) contentEls.push(headingEl);

    // Paragraphs (rich text)
    // This is usually a div containing .rich-text or .paragraph-lg
    const paraBlock = children.find(el => el.querySelector('.paragraph-lg'));
    if (paraBlock) {
      // inner .rich-text if present, or the parent
      const richText = paraBlock.querySelector('.rich-text');
      if (richText) {
        contentEls.push(richText);
      } else {
        contentEls.push(paraBlock);
      }
    }
  } else {
    // fallback: push all children as content if .grid-layout is missing
    contentEls = Array.from(element.children);
  }

  // As per instructions, background image row is optional and omitted if not present in HTML
  // Only one content row (with all items), as required by the example
  cells.push([contentEls]);

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
