/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table Header: Exactly as required
  const headerRow = ['Hero (hero13)'];

  // 2. Background Image Extraction (2nd row)
  // Find the image that is visually a background (absolute positioned, not aspect-1x1, not a small card image)
  let bgImg = null;
  const imgs = element.querySelectorAll('img');
  for (const img of imgs) {
    if (img.classList.contains('cover-image') && !img.classList.contains('utility-aspect-1x1')) {
      bgImg = img;
      break;
    }
  }
  // Defensive: if not found, leave cell empty
  const bgImgRow = [bgImg || ''];

  // 3. The main content area (headline, body, cta, card image etc.)
  // Find the card body, as it's the main structured content block
  let contentBlock = null;
  let cardBody = element.querySelector('.card-body');
  // Defensive: fallback to .card if .card-body is missing
  if (!cardBody) {
    const card = element.querySelector('.card');
    if (card) {
      contentBlock = card;
    }
  } else {
    contentBlock = cardBody;
  }
  // Defensive: fallback to empty string if not found
  const contentRow = [contentBlock || ''];

  // Compose table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
