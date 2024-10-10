import { mount } from '@vue/test-utils'
import HomePageSecond from '@/components/HomePageSecond.vue'

describe('HomePageSecond.vue', () => {
  let wrapper

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(HomePageSecond)
  })

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the title correctly', () => {
    // Check that the title is rendered correctly
    const title = wrapper.find('h1.txt-orange')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('How to use')
  })

  it('renders the steps correctly', () => {
    // Check that the steps are rendered correctly
    const steps = wrapper.findAll('.steps')
    expect(steps).toHaveLength(5) // Check for 5 steps

    // Validate each step's number and text
    const expectedSteps = [
      { number: 1, text: "Create your account" },
      { number: 2, text: "Enter the ingredients from your fridge" },
      { number: 3, text: "Generate meal ideas based on your fridge ingredients" },
      { number: 4, text: "Browse the recommandations and add your own meals" },
      { number: 5, text: "Discover our other amazing features" },
    ]

    steps.forEach((step, index) => {
      const stepNumber = step.find('div p').text()
      const stepText = step.find('p').text()

      expect(stepNumber).toBe(String(expectedSteps[index].number))
      expect(stepText).toBe(expectedSteps[index].text)
    })
  })

  it('renders images correctly', () => {
    // Check that images are rendered
    const logoImage = wrapper.find('img[alt="Logo"]')
    const singingImage = wrapper.find('img[alt="Karot singing"]')
    
    expect(logoImage.exists()).toBe(true)
    expect(singingImage.exists()).toBe(true)
  })
})
