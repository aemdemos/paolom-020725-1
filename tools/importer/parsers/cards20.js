/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards20)'];

  // Get all immediate card divs
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map(card => {
    // Icon cell: the .icon container (contains SVG)
    const icon = card.querySelector('.icon');

    // Text cell: collect all text nodes and elements that are not .icon
    // We'll grab all direct children except the icon wrapper
    const textContainerParts = [];
    card.childNodes.forEach(node => {
      if (
        !(node.nodeType === 1 && node.classList && node.classList.contains('icon')) &&
        node.nodeType !== 8 // ignore comment nodes
      ) {
        // Only add if it's not whitespace
        if (node.nodeType === 3) {
          if (node.textContent.trim()) {
            textContainerParts.push(document.createTextNode(node.textContent));
          }
        } else if (node.nodeType === 1) {
          textContainerParts.push(node);
        }
      }
    });
    // If nothing found, fallback to empty string
    const textCell = textContainerParts.length ? textContainerParts : '';
    return [icon, textCell];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
