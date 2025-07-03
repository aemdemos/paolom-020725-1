/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate child <a> (tab links)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));
  // Table header: must be an array with ONE cell only
  const rows = [['Tabs']];
  // Each subsequent row: [Tab Label, Tab Content (empty string, since not present)]
  tabLinks.forEach((tabLink) => {
    // Extract tab label: inside a <div> or fallback to link text
    let labelElem = tabLink.querySelector('div');
    let label = labelElem ? labelElem.textContent.trim() : tabLink.textContent.trim();
    // Push a row with TWO columns to match example: [label, '']
    rows.push([label, '']);
  });
  // Create table with correct structure
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}