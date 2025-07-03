/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all columns (direct child divs)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // The header row must have exactly one column, even if content row has multiple columns
  const headerRow = ['Columns (columns30)'];
  const contentRow = columns;
  // Pass table data as [ [header], [content0, content1, ...] ]
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}