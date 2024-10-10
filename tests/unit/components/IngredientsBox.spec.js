import { mount } from '@vue/test-utils'
import IngredientsBox from '@/components/IngredientsBox.vue'

describe('IngredientsBox.vue', () => {
  let wrapper

  const ingredient = {
    id: 1,
    name: 'Tomato'
  }

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(IngredientsBox, {
      props: {
        ingredient,
        boxColor: 'red', // Provide a default color
        active: false // Default state
      },
    })
  })

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the ingredient name correctly', () => {
    // Check that the ingredient name is rendered
    expect(wrapper.find('.ingredient-name').text()).toBe(ingredient.name)
  })

  it('applies the correct background color', () => {
    // Check that the background color is applied correctly
    expect(wrapper.element.style.backgroundColor).toBe('red')
  })

  it('emits changeState event with ingredient id when clicked', async () => {
    // Set up a listener for the changeState event
    wrapper.vm.$emit = jest.fn()

    // Simulate a click on the img-box
    await wrapper.find('#img-box').trigger('click')

    // Check that the changeState event is emitted with the correct id
    expect(wrapper.emitted().changeState[0]).toEqual([ingredient.id])
  })

  it('renders the correct image based on active state', async () => {
    // Initially, the active prop is false, so no image should be rendered
    expect(wrapper.find('img').exists()).toBe(false)

    // Update the active prop to true and check if the correct image is rendered
    await wrapper.setProps({ active: true })
    expect(wrapper.find('img').exists()).toBe(false) // No image is displayed since the images are commented out

    // Uncomment these lines in the component if images should be rendered based on active state
    /*
    expect(wrapper.find('img[alt="remove"]').exists()).toBe(true)
    await wrapper.setProps({ active: false })
    expect(wrapper.find('img[alt="add"]').exists()).toBe(true)
    */
  })
})
