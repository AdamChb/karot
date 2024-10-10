import { mount } from '@vue/test-utils';
import UserAllergies from '@/components/UserAllergies.vue';

describe('UserAllergies.vue', () => {
  let wrapper;

  // Fonction d'initialisation pour chaque test
  beforeEach(() => {
    wrapper = mount(UserAllergies);
    // Simuler des ingrédients et allergies par défaut
    wrapper.setData({
      ingredients: ['Tomato', 'Peanut', 'Milk'],
      allergies: [],
      userId: 1, // ID utilisateur fictif pour le test
    });
  });

  // Nettoyage après chaque test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test pour la méthode addAllergy
  it('should add an allergy when addAllergy is called successfully', async () => {
    // Mock de la fonction fetch pour l'ajout d'allergie
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Allergy added' }),
      })
    );

    // Appel de la méthode addAllergy
    await wrapper.vm.addAllergy('Peanut');

    // Vérification que l'allergie a été ajoutée
    expect(wrapper.vm.allergies).toContain('Peanut');
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/add-allergy',
      expect.objectContaining({
        method: 'POST',
        body: expect.anything(),
      })
    );
  });

  // Test pour la méthode addAllergy en cas d'erreur
  it('should alert when there is an error adding an allergy', async () => {
    // Espionner l'alerte
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Mock de la fonction fetch pour simuler une erreur
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to add allergy' }),
      })
    );

    // Appel de la méthode addAllergy
    await wrapper.vm.addAllergy('Peanut');

    // Vérification que l'alerte a été appelée
    expect(window.alert).toHaveBeenCalledWith('Failed to add allergy');
  });

  // Test pour la méthode deleteAllergy
  it('should delete an allergy when deleteAllergy is called successfully', async () => {
    // Mock de la fonction fetch pour la suppression d'allergie
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Allergy deleted' }),
      })
    );

    // Ajout d'une allergie pour la suppression
    wrapper.setData({ allergies: ['Peanut'] });

    // Appel de la méthode deleteAllergy
    await wrapper.vm.deleteAllergy('Peanut');

    // Vérification que l'allergie a été supprimée
    expect(wrapper.vm.allergies).not.toContain('Peanut');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('http://localhost:3000/api/delete-allergy'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });

  // Test pour la méthode deleteAllergy en cas d'erreur
  it('should alert when there is an error deleting an allergy', async () => {
    // Espionner l'alerte
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Mock de la fonction fetch pour simuler une erreur
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to delete allergy' }),
      })
    );

    // Ajout d'une allergie pour la suppression
    wrapper.setData({ allergies: ['Peanut'] });

    // Appel de la méthode deleteAllergy
    await wrapper.vm.deleteAllergy('Peanut');

    // Vérification que l'alerte a été appelée
    expect(window.alert).toHaveBeenCalledWith('Failed to delete allergy');
  });
});
