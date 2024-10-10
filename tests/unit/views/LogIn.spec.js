import { mount } from '@vue/test-utils';
import LogIn from '@/views/LogIn.vue';

describe('LogIn.vue', () => {
  let wrapper;

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(LogIn);
  });

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the form with email and password fields', () => {
    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');
    expect(emailInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);
  });

  it('has a title "Log In"', () => {
    const title = wrapper.find('#title');
    expect(title.text()).toBe('Log In');
  });

  it('updates the email data property on input', async () => {
    const emailInput = wrapper.find('#email');
    await emailInput.setValue('test@example.com');
    expect(wrapper.vm.email).toBe('test@example.com');
  });

  it('updates the password data property on input', async () => {
    const passwordInput = wrapper.find('#password');
    await passwordInput.setValue('password123');
    expect(wrapper.vm.password).toBe('password123');
  });

  it('calls checkData method on form submit', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ ID_User: 1 }),
    });

    // Set values for email and password
    wrapper.vm.email = 'test@example.com';
    wrapper.vm.password = 'password123';

    // Spy on the loggedInUpdate method
    const loggedInUpdateSpy = jest.spyOn(wrapper.vm, 'loggedInUpdate');

    // Trigger the form submission
    await wrapper.find('#submit').trigger('click');

    // Check if fetch was called
    expect(global.fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:3000/api/log-in',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
      })
    );

    // Check if loggedInUpdate was called with the correct user ID
    expect(loggedInUpdateSpy).toHaveBeenCalledWith(1);

    // Cleanup the mock
    global.fetch.mockClear();
  });

  it('renders the signup link', () => {
    const signupLink = wrapper.find('#signup a');
    expect(signupLink.exists()).toBe(true);
    expect(signupLink.text()).toBe('Register now');
  });
});
