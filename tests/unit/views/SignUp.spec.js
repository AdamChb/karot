import { mount } from '@vue/test-utils';
import SignUp from '@/components/SignUp.vue';

describe('SignUp.vue', () => {
  let wrapper;

  // Fonction d'initialisation pour chaque test
  beforeEach(() => {
    wrapper = mount(SignUp, {
      props: {
        isLoggedIn: false,
      },
    });
  });

  // Nettoyage après chaque test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test pour la méthode loggedInUpdate
  it('should emit loggedInUpdate with user ID when loggedInUpdate is called', () => {
    const userId = 1; // ID fictif pour le test
    wrapper.vm.loggedInUpdate(userId);
    expect(wrapper.emitted('loggedInUpdate')).toBeTruthy();
    expect(wrapper.emitted('loggedInUpdate')[0]).toEqual([userId]);
  });

  // Test pour la méthode checkData avec des mots de passe correspondants
  it('should successfully create a user and log in when passwords match', async () => {
    // Mock de la fonction fetch
    global.fetch = jest.fn((url, options) => {
      if (url.includes('new-user')) {
        return Promise.resolve({ ok: true });
      } else if (url.includes('log-in')) {
        return Promise.resolve({
          json: () => Promise.resolve({ ID_User: 1 }),
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });

    // Remplissage des données du formulaire
    wrapper.setData({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      repeat_password: 'password123',
    });

    // Appel de la méthode checkData
    await wrapper.vm.checkData({ preventDefault: jest.fn() });

    // Vérification que fetch a été appelé deux fois
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:3000/api/new-user', expect.any(Object));
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:3000/api/log-in', expect.any(Object));

    // Vérification que loggedInUpdate a été émis avec le bon ID
    expect(wrapper.emitted('loggedInUpdate')).toBeTruthy();
    expect(wrapper.emitted('loggedInUpdate')[0]).toEqual([1]);

    // Vérification que la redirection vers la page d'accueil a été effectuée
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'HomePage' });
  });

  // Test pour la méthode checkData lorsque les mots de passe ne correspondent pas
  it('should alert when passwords do not match', async () => {
    // Espionner l'alerte
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Remplissage des données du formulaire
    wrapper.setData({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      repeat_password: 'differentPassword',
    });

    // Appel de la méthode checkData
    await wrapper.vm.checkData({ preventDefault: jest.fn() });

    // Vérification que l'alerte a été appelée
    expect(window.alert).toHaveBeenCalledWith("The passwords do not match.");
  });
});
