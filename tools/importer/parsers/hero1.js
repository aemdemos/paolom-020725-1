/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all immediate child divs
  const childDivs = element.querySelectorAll(':scope > div');
  // Get the first image in the block for the background image
  let backgroundImage = '';
  for (const div of childDivs) {
    const img = div.querySelector('img');
    if (img) {
      backgroundImage = img;
      break;
    }
  }
  // Structure per requirements: header, image, empty content (no heading/subheading/cta in HTML)
  const cells = [
    ['Hero (hero1)'],
    [backgroundImage],
    ['']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
