import { mount } from '@vue/test-utils';
import MyMeals from '@/views/MyMeals.vue'; // Assurez-vous que le chemin est correct
import RecipeCard from '@/components/RecipeCard.vue';

jest.mock('@/components/RecipeCard.vue', () => ({
  name: 'RecipeCard',
  template: '<div class="mock-recipe-card"></div>',
}));

describe('MyMeals.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MyMeals, {
      data() {
        return {
          recipes: [
            { ID_Recipe: 1, name: 'Recipe 1' },
            { ID_Recipe: 2, name: 'Recipe 2' },
          ],
        };
      },
    });
  });

  it('renders the title and subtitle', () => {
    expect(wrapper.find('h1').text()).toBe('My meals');
    expect(wrapper.find('p').text()).toBe("Check them when they're done !");
  });

  it('renders a RecipeCard for each recipe', () => {
    const recipeCards = wrapper.findAll('.mock-recipe-card');
    expect(recipeCards).toHaveLength(2);
  });

  it('calls deleteMeal method when clicking on delete button', async () => {
    const deleteMealSpy = jest.spyOn(wrapper.vm, 'deleteMeal');
    await wrapper.find('p').trigger('click');
    expect(deleteMealSpy).toHaveBeenCalledWith(1); // Assurez-vous que l'ID correspond à celui du premier élément
  });

  it('fetches meals on created hook', async () => {
    // Mock fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { ID_Recipe: 1, name: 'Recipe 1' },
          { ID_Recipe: 2, name: 'Recipe 2' },
        ]),
      })
    );

    await wrapper.vm.fetchMeals();
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/get-planned-meals?userId=6');
    expect(wrapper.vm.recipes).toHaveLength(2);
  });

  it('handles fetchMeals error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

    await wrapper.vm.fetchMeals();
    expect(console.error).toHaveBeenCalledWith("Error fetching planned meals:", expect.any(Error));
  });

  it('calls addMeal method when adding a meal', async () => {
    const addMealSpy = jest.spyOn(wrapper.vm, 'addMeal');
    await wrapper.vm.addMeal(1);
    expect(addMealSpy).toHaveBeenCalledWith(1);
  });

  it('calls deleteMeal method when deleting a meal', async () => {
    const deleteMealSpy = jest.spyOn(wrapper.vm, 'deleteMeal');
    await wrapper.vm.deleteMeal(1);
    expect(deleteMealSpy).toHaveBeenCalledWith(1);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
    jest.restoreAllMocks(); // Rétablir les implémentations originales des spies
  });
});
