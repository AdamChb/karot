import { mount } from "@vue/test-utils";
import HomePageThird from "@/components/HomePageThird.vue";
import RecipeCard from "@/components/RecipeCard.vue";

describe("HomePageThird.vue", () => {
  let wrapper;

  // Mocking the fetch function to simulate API calls
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "Recipe 1" },
            { id: 2, name: "Recipe 2" },
          ]), // Mock data
      })
    );
  });

  // Cleanup after all tests
  afterAll(() => {
    jest.restoreAllMocks();
  });

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(HomePageThird);
  });

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the section header correctly", () => {
    // Check that the header is rendered correctly
    const header = wrapper.find("h1");
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe("Most liked recipes");
  });

  it("fetches and renders the most liked recipes", async () => {
    // Wait for the component to update after the fetch call
    await wrapper.vm.$nextTick();

    // Check that the recipes have been rendered
    const recipeCards = wrapper.findAll(".recipe-card");
    expect(recipeCards).toHaveLength(2); // Check that 2 recipes are rendered

    // Check that each RecipeCard component is rendered with the correct recipe prop
    expect(RecipeCard).toHaveBeenCalledTimes(2); // Ensure RecipeCard is called twice

    expect(recipeCards[0].props("recipe")).toEqual({ id: 1, name: "Recipe 1" });
    expect(recipeCards[1].props("recipe")).toEqual({ id: 2, name: "Recipe 2" });
  });

  it("displays an error if fetching fails", async () => {
    // Mock fetch to simulate an error
    global.fetch.mockImplementationOnce(() => Promise.reject("API is down"));

    // Mount the component again to trigger the fetch
    wrapper = mount(HomePageThird);

    // Wait for the component to update
    await wrapper.vm.$nextTick();

    // Check that no recipe cards are rendered when fetching fails
    const recipeCards = wrapper.findAll(".recipe-card");
    expect(recipeCards).toHaveLength(0); // No recipes should be rendered
  });
});
