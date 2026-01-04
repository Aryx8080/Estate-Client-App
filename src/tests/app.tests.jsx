import { describe, it, expect } from "vitest";
import filterProperties from "../utils/filterProperties";

const sample = [
  { id: "a", type: "House", bedrooms: 3, price: 300000, location: "BR1", added: { month: "January", day: 1, year: 2022 } },
  { id: "b", type: "Flat", bedrooms: 1, price: 150000, location: "CR0", added: { month: "June", day: 1, year: 2023 } }
];

describe("filterProperties", () => {
  it("filters by type", () => {
    const res = filterProperties(sample, { type: "Flat" });
    expect(res.length).toBe(1);
    expect(res[0].id).toBe("b");
  });

  it("filters by price range", () => {
    const res = filterProperties(sample, { minPrice: 200000, maxPrice: 400000 });
    expect(res.length).toBe(1);
    expect(res[0].id).toBe("a");
  });

  it("filters by bedrooms", () => {
    const res = filterProperties(sample, { minBeds: 2 });
    expect(res.length).toBe(1);
    expect(res[0].id).toBe("a");
  });

  it("filters by postcode area", () => {
    const res = filterProperties(sample, { postcode: "BR1" });
    expect(res.length).toBe(1);
    expect(res[0].id).toBe("a");
  });

  it("date range works", () => {
    const res = filterProperties(sample, { dateFrom: "2022-01-01", dateTo: "2022-12-31" });
    expect(res.length).toBe(1);
    expect(res[0].id).toBe("a");
  });
});
