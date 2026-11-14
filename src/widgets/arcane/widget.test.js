import { describe, expect, it } from "vitest";

import { expectWidgetConfigShape } from "test-utils/widget-config";

import widget from "./widget";

describe("arcane widget config", () => {
  it("exports a valid widget config", () => {
    expectWidgetConfigShape(widget);
  });

  it("counts containers with available updates in containerUpdates mapping", () => {
    const payload = JSON.stringify({
      data: [
        { id: "1", updateInfo: { hasUpdate: true } },
        { id: "2", updateInfo: { hasUpdate: false } },
        { id: "3", updateInfo: { hasUpdate: true } },
        { id: "4" },
      ],
    });

    expect(widget.mappings.containerUpdates.map(payload)).toEqual({ containerUpdates: 2 });
  });

  it("returns 0 containerUpdates when container list is missing or not an array", () => {
    expect(widget.mappings.containerUpdates.map(JSON.stringify({}))).toEqual({ containerUpdates: 0 });
    expect(widget.mappings.containerUpdates.map(JSON.stringify({ data: null }))).toEqual({ containerUpdates: 0 });
  });
});
