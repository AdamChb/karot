// FooterKarot.spec.js
import { mount } from "@vue/test-utils";
import FooterKarot from "@/components/FooterKarot.vue";

describe("FooterKarot.vue", () => {
  let wrapper;

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(FooterKarot);
  });

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the footer with the correct text", () => {
    // Check that the footer contains the expected text
    expect(wrapper.find("footer p").text()).toBe(
      "© 2024 Mathias BENOIT – Adam CHABA – Eva MAROT – Sacha PORTAL"
    );
  });

  it("applies correct styles to footer", () => {
    // Check if the footer has the expected class
    const footerElement = wrapper.find("footer");
    expect(footerElement.classes()).toContain("footer");

    // Check text color of the paragraph
    const paragraph = wrapper.find("footer p");
    expect(getComputedStyle(paragraph.element).color).toBe("rgb(0, 0, 0)"); // Check computed style
  });
});
