import { mount } from "@vue/test-utils";
import HeaderKarot from "@/components/HeaderKarot.vue";

describe("HeaderKarot.vue", () => {
  let wrapper;

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(HeaderKarot, {
      props: {
        isLoggedIn: false, // default prop for tests
      },
    });
  });

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the header with navigation links", () => {
    // Check that the header contains the expected navigation links
    const links = wrapper.findAll("nav a");
    expect(links).toHaveLength(4); // 4 links in total
    expect(links[0].text()).toBe("Create meals");
    expect(links[1].text()).toBe("Recipes");
    expect(links[2].text()).toBe("My meals");
    expect(links[3].text()).toBe("Log In");
  });

  it("toggles the mobile menu when clicked", async () => {
    // Initially the mobile menu should not be displayed
    expect(wrapper.find("#header_nav_burger").element.style.display).toBe("");

    // Click the menu button to toggle the menu
    await wrapper.find("#menu_button").trigger("click");

    // Check that the mobile menu is now displayed
    expect(wrapper.find("#header_nav_burger").element.style.display).toBe(
      "flex"
    );

    // Click again to toggle the menu off
    await wrapper.find("#menu_button").trigger("click");

    // Check that the mobile menu is hidden
    expect(wrapper.find("#header_nav_burger").element.style.display).toBe(
      "none"
    );
  });

  it('displays "My account" when logged in', async () => {
    // Update the prop to simulate user being logged in
    await wrapper.setProps({ isLoggedIn: true });

    // Check that the last link shows "My account"
    expect(wrapper.find("nav a:last-child").text()).toBe("My account");
  });

  it('displays "Log In" when not logged in', async () => {
    // Ensure the prop is set to false
    await wrapper.setProps({ isLoggedIn: false });

    // Check that the last link shows "Log In"
    expect(wrapper.find("nav a:last-child").text()).toBe("Log In");
  });
});
