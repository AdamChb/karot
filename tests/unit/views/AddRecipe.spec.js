import { mount } from '@vue/test-utils'
import AddRecipe from '@/views/AddRecipe.vue'

describe('AddRecipe.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AddRecipe)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the form correctly', () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('textarea.ingredients-input').exists()).toBe(true)
    expect(wrapper.find('textarea.steps-input').exists()).toBe(true)
    expect(wrapper.find('.upload-btn').exists()).toBe(true)
  })

  it('updates recipeName data property when input changes', async () => {
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Pasta')
    expect(wrapper.vm.recipeName).toBe('Pasta')
  })

  it('updates ingredients data property when textarea changes', async () => {
    const textarea = wrapper.find('textarea.ingredients-input')
    await textarea.setValue('2 cucumbers, 3 tomatoes')
    expect(wrapper.vm.ingredients).toBe('2 cucumbers, 3 tomatoes')
  })

  it('updates steps data property when textarea changes', async () => {
    const textarea = wrapper.find('textarea.steps-input')
    await textarea.setValue('Cut the tomatoes')
    expect(wrapper.vm.steps).toBe('Cut the tomatoes')
  })

  it('handles file selection correctly', async () => {
    const file = new Blob(['dummy content'], { type: 'image/jpeg' })
    const input = wrapper.find('input[type="file"]')

    await input.setValue(file) // Simulate file selection
    expect(wrapper.vm.fileName).toBe('dummy content')
  })

  it('submits the recipe when all fields are filled', async () => {
    const recipeData = {
      name: 'Pasta',
      ingredients: ['2 cucumbers', '3 tomatoes'],
      steps: 'Cut the tomatoes',
      image: 'dummy content',
    }

    // Fill in the form fields
    wrapper.vm.recipeName = recipeData.name
    wrapper.vm.ingredients = recipeData.ingredients.join(', ')
    wrapper.vm.steps = recipeData.steps
    wrapper.vm.fileName = recipeData.image

    // Mock the fetch call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Recipe added successfully!' }),
      })
    )

    // Call submitRecipe method
    await wrapper.vm.submitRecipe()

    // Check if the form was reset
    expect(wrapper.vm.recipeName).toBe('')
    expect(wrapper.vm.ingredients).toBe('')
    expect(wrapper.vm.steps).toBe('')
    expect(wrapper.vm.fileName).toBe('')
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/add-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: recipeData.name,
        ingredients: recipeData.ingredients,
        steps: recipeData.steps,
        image: recipeData.image,
      }),
    })
  })

  it('shows an alert when submitting without filling all fields', async () => {
    // Spy on alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Call submitRecipe method without filling fields
    await wrapper.vm.submitRecipe()

    // Check that the alert was called
    expect(alertSpy).toHaveBeenCalledWith("Please fill in all fields before submitting the recipe.")

    // Restore the original alert
    alertSpy.mockRestore()
  })

  it('handles fetch error correctly', async () => {
    // Mock the fetch call to reject
    global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')))

    // Fill in the form fields
    wrapper.vm.recipeName = 'Pasta'
    wrapper.vm.ingredients = '2 cucumbers'
    wrapper.vm.steps = 'Cut the tomatoes'

    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // Call submitRecipe method
    await wrapper.vm.submitRecipe()

    // Check if console.error was called
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error:", expect.any(Error))

    // Restore the original console.error
    consoleErrorSpy.mockRestore()
  })
})
