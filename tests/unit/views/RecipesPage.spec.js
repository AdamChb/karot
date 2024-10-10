import { mount } from '@vue/test-utils';
import RecipesPage from '@/views/RecipesPage.vue';
import RecipeCard from '@/components/RecipeCard.vue';

describe('RecipesPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RecipesPage);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the correct number of recipe cards', () => {
    const recipeCards = wrapper.findAllComponents(RecipeCard);
    expect(recipeCards.length).toBe(wrapper.vm.recipes.length);
  });

  it('displays the correct recipe names', () => {
    const recipeCards = wrapper.findAllComponents(RecipeCard);
    recipeCards.forEach((card, index) => {
      expect(card.props('name')).toBe(wrapper.vm.recipes[index].name);
    });
  });

  it('renders author names correctly', () => {
    const recipeCards = wrapper.findAllComponents(RecipeCard);
    recipeCards.forEach((card, index) => {
      expect(card.props('author')).toBe(wrapper.vm.recipes[index].author);
    });
  });

  it('renders likes correctly', () => {
    const recipeCards = wrapper.findAllComponents(RecipeCard);
    recipeCards.forEach((card, index) => {
      expect(card.props('like')).toBe(wrapper.vm.recipes[index].like);
    });
  });
});
