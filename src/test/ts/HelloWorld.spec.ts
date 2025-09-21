import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import HomeView from "../../main/vue/views/HomeView.vue";

describe('HomeView', () => {
    it('renders the correct message', () => {
        const wrapper = mount(HomeView, {
            props: {
                msg: 'Hello, world!'
            }
        });
        expect(wrapper.text()).toContain('Hello, world!');
    });
});