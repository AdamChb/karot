import { mount } from '@vue/test-utils';
import HomePage from '@/views/HomePage.vue';
import HomePageFirst from '@/components/HomePageFirst.vue';
import HomePageSecond from '@/components/HomePageSecond.vue';
import HomePageThird from '@/components/HomePageThird.vue';

describe('HomePage.vue', () => {
  let wrapper;

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(HomePage, {
      props: {
        isLoggedIn: true, // Set isLoggedIn to true for testing
      },
    });
  });

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the HomePageFirst component', () => {
    const homePageFirst = wrapper.findComponent(HomePageFirst);
    expect(homePageFirst.exists()).toBe(true);
  });

  it('renders the HomePageSecond component', () => {
    const homePageSecond = wrapper.findComponent(HomePageSecond);
    expect(homePageSecond.exists()).toBe(true);
  });

  it('renders the HomePageThird component', () => {
    const homePageThird = wrapper.findComponent(HomePageThird);
    expect(homePageThird.exists()).toBe(true);
  });

  it('passes isLoggedIn prop to HomePageFirst component', () => {
    const homePageFirst = wrapper.findComponent(HomePageFirst);
    expect(homePageFirst.props().isLoggedIn).toBe(true);
  });

  it('does not pass isLoggedIn prop to HomePageSecond and HomePageThird components', () => {
    const homePageSecond = wrapper.findComponent(HomePageSecond);
    const homePageThird = wrapper.findComponent(HomePageThird);
    
    expect(homePageSecond.props().isLoggedIn).toBeUndefined();
    expect(homePageThird.props().isLoggedIn).toBeUndefined();
  });
});
