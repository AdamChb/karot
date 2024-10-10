import { mount } from '@vue/test-utils'
import MealSectionCreate from '@/components/MealSectionCreate.vue'
import MealSectionCreateText from '@/components/MealSectionCreateText.vue'
import MealSectionCreateResult from '@/components/MealSectionCreateResult.vue'

describe('MealSectionCreate.vue', () => {
  let wrapper

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(MealSectionCreate, {
      props: {
        generated: 'false', // Initial prop value
      },
    })
  })

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the MealSectionCreateText component', () => {
    // Check if MealSectionCreateText is rendered
    expect(wrapper.findComponent(MealSectionCreateText).exists()).toBe(true)
  })

  it('does not render MealSectionCreateResult when generated is false', () => {
    // Check that MealSectionCreateResult is not rendered initially
    expect(wrapper.findComponent(MealSectionCreateResult).exists()).toBe(false)
  })

  it('renders MealSectionCreateResult when generated is true', async () => {
    // Update the generated prop to true
    await wrapper.setProps({ generated: 'true' })

    // Check that MealSectionCreateResult is rendered
    expect(wrapper.findComponent(MealSectionCreateResult).exists()).toBe(true)
  })

  it('emits generate event when generate method is called', async () => {
    // Call the generatechild method
    await wrapper.vm.generatechild()

    // Check if the generate event was emitted
    expect(wrapper.emitted().generate).toBeTruthy()
  })

  it('emits reset event when resetchild method is called', async () => {
    // Call the resetchild method
    await wrapper.vm.resetchild()

    // Check if the reset event was emitted
    expect(wrapper.emitted().reset).toBeTruthy()
  })
})
