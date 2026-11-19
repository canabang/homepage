import { describe, expect, it } from "vitest";

import { expectWidgetConfigShape } from "test-utils/widget-config";

import widget from "./widget";

describe("arcane widget config", () => {
  it("exports a valid widget config", () => {
    expectWidgetConfigShape(widget);
  });

  it("counts containers with available updates in containerUpdates and containerUpdates_v2 mappings", () => {
    const payload = JSON.stringify({
      data: [
        { id: "1", updateInfo: { hasUpdate: true } },
        { id: "2", updateInfo: { hasUpdate: false } },
        { id: "3", updateInfo: { hasUpdate: true } },
        { id: "4" },
      ],
    });

    expect(widget.mappings.containerUpdates.endpoint).toBe("environments/{env}/containers?limit=-1");
    expect(widget.mappings.containerUpdates.map(payload)).toEqual({ containerUpdates: 2 });
    expect(widget.mappings.containerUpdates_v2.endpoint).toBe("agents/{env}/containers?limit=-1");
    expect(widget.mappings.containerUpdates_v2.map(payload)).toEqual({ containerUpdates: 2 });
  });

  it("returns 0 containerUpdates when container list is missing or not an array", () => {
    for (const mapping of [widget.mappings.containerUpdates, widget.mappings.containerUpdates_v2]) {
      expect(mapping.map(JSON.stringify({}))).toEqual({ containerUpdates: 0 });
      expect(mapping.map(JSON.stringify({ data: null }))).toEqual({ containerUpdates: 0 });
    }
  });
});
