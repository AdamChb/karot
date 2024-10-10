import { mount } from '@vue/test-utils'
import MealSectionCreateText from '@/components/MealSectionCreateText.vue'

describe('MealSectionCreateText.vue', () => {
  let wrapper

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(MealSectionCreateText, {
      props: {
        generated: 'false', // Default prop value
      },
    })
  })

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the title and subtitle correctly when not generated', () => {
    // Check if the title and subtitle are rendered correctly
    expect(wrapper.find('.title').text()).toBe('Create meals')
    expect(wrapper.find('.subtitle').text()).toBe('Based on the ingredients you have')
  })

  it('renders the instruction text when not generated', () => {
    // Check if the instruction text is rendered
    expect(wrapper.find('.instruction-text').text()).toBe("Don't forget to add ingredients you have in your fridge !")
  })

  it('emits the generate event when the button is clicked and not generated', async () => {
    // Click the generate button
    await wrapper.find('.generate-button').trigger('click')

    // Check that the generate event is emitted
    expect(wrapper.emitted('generate')).toBeTruthy()
  })

  it('emits the reset event when the button is clicked and generated', async () => {
    // Set the generated prop to true
    await wrapper.setProps({ generated: 'true' })

    // Click the generate button
    await wrapper.find('.generate-button').trigger('click')

    // Check that the reset event is emitted
    expect(wrapper.emitted('reset')).toBeTruthy()
  })

  it('applies the correct class when generated', async () => {
    // Check initial class
    expect(wrapper.classes()).toContain('container-text-meal')

    // Set the generated prop to true
    await wrapper.setProps({ generated: 'true' })

    // Check that the container has the correct class when generated
    expect(wrapper.attributes('id')).toBe('container-text-meal-generated')
  })

  it('changes title styles based on generated prop', async () => {
    // Check title styles when not generated
    expect(wrapper.find('.title').attributes('id')).toBe('title-not-generated')

    // Set the generated prop to true
    await wrapper.setProps({ generated: 'true' })

    // Check title styles when generated
    expect(wrapper.find('.title').attributes('id')).toBe('title-generated')
  })
})
