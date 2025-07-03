/* global WebImporter */
export default function parse(element, { document }) {
  // Set up the header row according to the block name
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Select all direct child accordions (w-dropdowns)
  const accordions = element.querySelectorAll(':scope > .accordion');

  accordions.forEach((accordion) => {
    // Title cell: find the .w-dropdown-toggle, and within it, the .paragraph-lg for text
    let titleCell = '';
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const para = toggle.querySelector('.paragraph-lg');
      if (para) {
        titleCell = para;
      } else {
        // Fallback to the toggle's text if .paragraph-lg isn't present
        titleCell = document.createTextNode(toggle.textContent.trim());
      }
    }

    // Content cell: find the .w-dropdown-list, and include the full block for resilience
    let contentCell = '';
    const dropdownList = accordion.querySelector('.w-dropdown-list');
    if (dropdownList) {
      contentCell = dropdownList;
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
