import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import HomeView from "../../views/HomeView.vue";

describe("HomeView", () => {
  it("renders properly", () => {
    const wrapper = mount(HomeView, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
