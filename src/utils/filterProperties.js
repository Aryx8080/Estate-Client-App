function monthNum(monthName) {
  const map = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
  };
  return map[String(monthName || "").toLowerCase()] || 1;
}

function toDate(added) {
  if (!added) return null;
  const m = monthNum(added.month);
  const d = Number(added.day || 1);
  const y = Number(added.year || 1970);
  return new Date(y, m - 1, d);
}

function normalizePostcodeArea(input) {
  return String(input || "").trim().toUpperCase();
}

export default function filterProperties(properties = [], c = {}) {
  let minPrice = c.minPrice === "" ? null : Number(c.minPrice);
  let maxPrice = c.maxPrice === "" ? null : Number(c.maxPrice);
  let minBeds = c.minBeds === "" ? null : Number(c.minBeds);
  let maxBeds = c.maxBeds === "" ? null : Number(c.maxBeds);

  // Graceful swap if user enters reversed range
  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) [minPrice, maxPrice] = [maxPrice, minPrice];
  if (minBeds !== null && maxBeds !== null && minBeds > maxBeds) [minBeds, maxBeds] = [maxBeds, minBeds];

  const postcodeArea = normalizePostcodeArea(c.postcode);

  const dateFrom = c.dateFrom ? new Date(c.dateFrom) : null;
  const dateTo = c.dateTo ? new Date(c.dateTo) : null;

  return properties.filter((p) => {
    if (!p) return false;

    // Type
    if (c.type && c.type !== "any" && p.type !== c.type) return false;

    // Price
    if (minPrice !== null && Number(p.price) < minPrice) return false;
    if (maxPrice !== null && Number(p.price) > maxPrice) return false;

    // Bedrooms
    if (minBeds !== null && Number(p.bedrooms) < minBeds) return false;
    if (maxBeds !== null && Number(p.bedrooms) > maxBeds) return false;

    // Postcode area: check contains + also check last token looks like postcode
    if (postcodeArea) {
      const loc = String(p.location || "").toUpperCase();
      if (!loc.includes(postcodeArea)) return false;
    }

    // Date added
    if (dateFrom || dateTo) {
      const addedDate = toDate(p.added);
      if (!addedDate) return false;
      if (dateFrom && addedDate < dateFrom) return false;
      if (dateTo && addedDate > dateTo) return false;
    }

    return true;
  });
}
