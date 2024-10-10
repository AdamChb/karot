import { mount } from '@vue/test-utils';
import RecipePage from '@/views/RecipePage.vue'; // Assurez-vous que le chemin est correct

describe('RecipePage.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Mocking the $route.query object to simulate passing the recipe ID
    const $route = {
      query: {
        id: '1', // ID de la recette simulée
      },
    };

    wrapper = mount(RecipePage, {
      props: {
        isLoggedIn: true,
        id_user: 6,
      },
      global: {
        mocks: {
          $route,
        },
      },
    });

    // Spy on console.log to test for log calls
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('renders the recipe title and author', async () => {
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{
          ID_Recipe: 1,
          Name_Recipe: 'Test Recipe',
          Author_Name: 'Test Author',
          Likes_Count: 10,
          Has_Liked: false,
          Ingredients_With_Quantity: 'Ingredient 1, Ingredient 2',
          Steps: 'Step 1, Step 2',
        }]),
      })
    );

    await wrapper.vm.$options.beforeMount.call(wrapper.vm);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe('Test Recipe');
    expect(wrapper.find('p').text()).toBe('by Test Author');
    expect(wrapper.find('.head-likes p').text()).toBe('10');
    expect(wrapper.findAll('li')).toHaveLength(2); // Nombre d'ingrédients
  });

  it('handles liking a recipe', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true })
    );

    await wrapper.vm.$options.beforeMount.call(wrapper.vm);
    await wrapper.vm.$nextTick();

    await wrapper.vm.toLike(); // Simuler un clic sur le bouton "like"

    expect(wrapper.vm.recipe.Has_Liked).toBe(true);
    expect(wrapper.vm.recipe.Likes_Count).toBe(11);
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:3000/api/like-recipe', expect.any(Object));
  });

  it('handles unliking a recipe', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true })
    );

    await wrapper.vm.$options.beforeMount.call(wrapper.vm);
    await wrapper.vm.$nextTick();

    // Simuler le fait que la recette a déjà été likée
    wrapper.vm.recipe.Has_Liked = true;
    wrapper.vm.recipe.Likes_Count = 11;

    await wrapper.vm.unLike(); // Simuler un clic sur le bouton "unlike"

    expect(wrapper.vm.recipe.Has_Liked).toBe(false);
    expect(wrapper.vm.recipe.Likes_Count).toBe(10);
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:3000/api/unlike-recipe?id_user=6&id_recipe=undefined', expect.any(Object));
  });

  it('handles fetch error on beforeMount', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await wrapper.vm.$options.beforeMount.call(wrapper.vm);
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
    jest.restoreAllMocks(); // Rétablir les implémentations originales des spies
  });
});
