// tests/unit/MyAccount.spec.js

import { mount } from '@vue/test-utils';
import MyAccount from '@/views/MyAccount.vue'; // Ajustez le chemin si nécessaire

describe('MyAccount.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MyAccount);
  });

  it('renders the account section', () => {
    expect(wrapper.find('#account').exists()).toBe(true);
    expect(wrapper.find('#ingredients').exists()).toBe(true);
    expect(wrapper.find('#allergies').exists()).toBe(true);
    expect(wrapper.find('#my-meals').exists()).toBe(true);
  });

  it('renders the correct number of ingredients', () => {
    const ingredientElements = wrapper.findAll('.ingredient');
    expect(ingredientElements.length).toBe(wrapper.vm.ingredients.length);
  });

  it('renders the correct number of allergies', () => {
    const allergyElements = wrapper.findAll('.allergy');
    expect(allergyElements.length).toBe(wrapper.vm.allergies.length);
  });

  it('calls deleteAllergy method and removes an allergy', async () => {
    // Set up a mock for the fetch API to simulate a DELETE request
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Allergy deleted' }),
      })
    );

    // Simulate deleting the first allergy
    const allergyToDelete = wrapper.vm.allergies[0];
    await wrapper.vm.deleteAllergy(allergyToDelete);

    expect(global.fetch).toHaveBeenCalled();
    expect(wrapper.vm.allergies).not.toContain(allergyToDelete);
  });

  it('displays the correct recipe cards', () => {
    const recipeCards = wrapper.findAllComponents({ name: 'RecipeCard' });
    expect(recipeCards.length).toBe(wrapper.vm.recipes.length);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
    jest.restoreAllMocks(); // Rétablir les implémentations originales des spies
  });
});
