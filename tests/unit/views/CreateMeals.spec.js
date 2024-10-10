import { mount } from '@vue/test-utils';
import CreateMeals from '@/views/CreateMeals.vue';
import IngredientsSectionCreate from '@/components/IngredientsSectionCreate.vue';
import MealSectionCreate from '@/components/MealSectionCreate.vue';

describe('CreateMeals.vue', () => {
  let wrapper;

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(CreateMeals);
  });

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the IngredientsSectionCreate component', () => {
    const ingredientsSection = wrapper.findComponent(IngredientsSectionCreate);
    expect(ingredientsSection.exists()).toBe(true);
  });

  it('renders the MealSectionCreate component', () => {
    const mealSection = wrapper.findComponent(MealSectionCreate);
    expect(mealSection.exists()).toBe(true);
  });

  it('has a default data value of generated as "false"', () => {
    expect(wrapper.vm.generated).toBe("false");
  });

  it('sets generated to "true" when generate method is called', async () => {
    await wrapper.vm.generate();
    expect(wrapper.vm.generated).toBe("true");
  });

  it('sets generated to "false" when reset method is called', async () => {
    // First, generate the meal
    await wrapper.vm.generate();
    expect(wrapper.vm.generated).toBe("true");

    // Then reset it
    await wrapper.vm.reset();
    expect(wrapper.vm.generated).toBe("false");
  });

  it('emits generate event when the generate method is called', async () => {
    await wrapper.vm.generate();
    const mealSection = wrapper.findComponent(MealSectionCreate);
    expect(mealSection.emitted().generate).toBeTruthy();
  });

  it('emits reset event when the reset method is called', async () => {
    await wrapper.vm.reset();
    const mealSection = wrapper.findComponent(MealSectionCreate);
    expect(mealSection.emitted().reset).toBeTruthy();
  });
});
