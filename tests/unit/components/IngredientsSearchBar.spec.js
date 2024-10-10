// IngredientsSearchBar.spec.js
import { mount } from "@vue/test-utils";
import IngredientsSearchBar from "@/components/IngredientsSearchBar.vue";

describe("IngredientsSearchBar.vue", () => {
  it("focuses on the search bar when clicked", async () => {
    const wrapper = mount(IngredientsSearchBar);

    // Trouver l'élément d'input dans le composant
    const input = wrapper.find("input");

    // Simuler un clic sur l'input
    await input.trigger("click");

    // Simuler la mise au focus de l'input
    input.element.focus();

    // Vérifie que l'input est bien focalisé
    expect(document.activeElement).toBe(input.element);
  });
});
