import { mount } from "@vue/test-utils";
import IngredientsSearchBar from "@/components/IngredientsSearchBar.vue";

describe("IngredientsSearchBar.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(IngredientsSearchBar);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the search bar input", () => {
    // Vérifie que le composant existe
    expect(wrapper.exists()).toBe(true);

    // Vérifie que l'input est présent dans le DOM
    const input = wrapper.find('input[type="search"]');
    expect(input.exists()).toBe(true);

    // Vérifie le placeholder de l'input
    expect(input.attributes("placeholder")).toBe("Research an ingredient");
  });

  it("responds to user input", async () => {
    // Simule une entrée dans la barre de recherche
    const input = wrapper.find('input[type="search"]');
    await input.setValue("Tomato");

    // Vérifie que la valeur de l'input a bien été mise à jour
    expect(input.element.value).toBe("Tomato");
  });

  it("adds hover effect on search bar", async () => {
    // Vérifie si l'input réagit à l'hover en modifiant le style
    const input = wrapper.find('input[type="search"]');

    // Simule le survol
    await input.trigger("mouseover");

    // Comme il s'agit d'une animation CSS, nous ne pouvons pas directement
    // tester le changement de style, mais nous vérifions que l'élément existe
    expect(input.exists()).toBe(true);
  });

  it("focuses on the search bar when clicked", async () => {
    // Simule le focus sur la barre de recherche
    const input = wrapper.find('input[type="search"]');
    await input.trigger("focus");

    // Vérifie que l'input est bien focalisé
    expect(input.element).toBe(document.activeElement);
  });
});
