/* global WebImporter */
export default function parse(element, { document }) {
  // Block header must be exactly 'Hero (hero3)'
  const headerRow = ['Hero (hero3)'];

  // There is no background image in the provided HTML, so the second row is empty as specified
  const bgImageRow = [''];

  // Extract main content: headline, subheading, and CTAs
  // Structure: <section><div.container><div.w-layout-grid><div>text</div><div>buttons</div></div></div></section>
  let contentElements = [];
  // Safely traverse to grid children
  const container = element.querySelector('.container');
  let grid = container ? container.querySelector('.w-layout-grid') : null;
  if (!grid) grid = element;
  const gridChildren = grid ? Array.from(grid.children) : [];
  const contentDiv = gridChildren[0] || null;
  const ctaDiv = gridChildren[1] || null;
  // Headline (h2)
  if (contentDiv) {
    const headline = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (headline) contentElements.push(headline);
    // Subheading (p, could have class or not)
    // Try paragraphs with class 'subheading' first, else any p
    let subheading = contentDiv.querySelector('p.subheading');
    if (!subheading) subheading = contentDiv.querySelector('p');
    if (subheading) contentElements.push(subheading);
  }
  // CTAs: all <a> in ctaDiv
  if (ctaDiv) {
    const ctaLinks = Array.from(ctaDiv.querySelectorAll('a'));
    contentElements.push(...ctaLinks);
  }
  // If we have no content, use empty string (shouldn't happen but guards for empty nodes)
  if (contentElements.length === 0) contentElements = [''];
  const contentRow = [contentElements];

  // Compose final table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow
  ], document);

  // Replace original element with new table
  element.replaceWith(table);
}
