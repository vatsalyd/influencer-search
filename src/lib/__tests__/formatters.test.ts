import { describe, it, expect } from "vitest";
import { formatFollowers, formatEngagementRate, formatNumber, timeAgo } from "../formatters";

describe("formatFollowers", () => {
  it("formats millions", () => {
    expect(formatFollowers(1500000)).toBe("1.5M");
  });

  it("formats thousands", () => {
    expect(formatFollowers(2500)).toBe("2.5K");
  });

  it("formats small numbers", () => {
    expect(formatFollowers(500)).toBe("500");
  });
});

describe("formatEngagementRate", () => {
  it("formats rate as percentage", () => {
    expect(formatEngagementRate(0.0125)).toBe("1.25%");
  });

  it("returns N/A for undefined", () => {
    expect(formatEngagementRate(undefined)).toBe("N/A");
  });
});

describe("formatNumber", () => {
  it("formats millions with 2 decimals", () => {
    expect(formatNumber(1234567)).toBe("1.23M");
  });

  it("formats thousands with 1 decimal", () => {
    expect(formatNumber(1234)).toBe("1.2K");
  });

  it("returns string for small numbers", () => {
    expect(formatNumber(999)).toBe("999");
  });
});

describe("timeAgo", () => {
  it("returns 'just now' for recent timestamps", () => {
    expect(timeAgo(Date.now() - 10000)).toBe("just now");
  });

  it("returns minutes ago", () => {
    expect(timeAgo(Date.now() - 120000)).toBe("2m ago");
  });

  it("returns hours ago", () => {
    expect(timeAgo(Date.now() - 7200000)).toBe("2h ago");
  });
});
