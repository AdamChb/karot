import { mount } from '@vue/test-utils'
import MealSectionCreateResult from '@/components/MealSectionCreateResult.vue'

describe('MealSectionCreateResult.vue', () => {
  let wrapper

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(MealSectionCreateResult)
  })

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the meal name and author', () => {
    // Check if the meal name and author are rendered correctly
    expect(wrapper.find('#meal-name').text()).toBe('Pasta with tomato sauce')
    expect(wrapper.find('#author').text()).toBe('by Mathias')
  })

  it('displays the correct number of likes', () => {
    // Check that the initial like count is correct
    expect(wrapper.find('.like').text()).toContain('47')
  })

  it('toggles the like status when liked', async () => {
    // Initially not liked
    expect(wrapper.vm.recipe.liked).toBe(false)

    // Click the like button
    await wrapper.find('.like img').trigger('click')

    // Check that the like status is now true and likes increased
    expect(wrapper.vm.recipe.liked).toBe(true)
    expect(wrapper.vm.recipe.like).toBe(48)

    // Click the like button again to unlike
    await wrapper.find('.like img').trigger('click')

    // Check that the like status is now false and likes decreased
    expect(wrapper.vm.recipe.liked).toBe(false)
    expect(wrapper.vm.recipe.like).toBe(47)
  })

  it('navigates to the recipe page on clicking the more info link', async () => {
    // Mock the $router.push method
    const pushMock = jest.fn()
    wrapper.vm.$router = { push: pushMock }

    // Click the "Click for more..." link
    await wrapper.find('#meal-more').trigger('click')

    // Check that the router push method is called with the correct parameters
    expect(pushMock).toHaveBeenCalledWith({ path: '/recipe', query: { id: 1 } })
  })

  it('renders the ingredients correctly', () => {
    // Check that ingredients are rendered in the list
    const ingredientItems = wrapper.findAll('.ingredient-required')
    expect(ingredientItems.length).toBe(6) // 6 ingredients including those with empty quantities

    expect(ingredientItems[0].text()).toContain('Pasta: 300g')
    expect(ingredientItems[1].text()).toContain('Bacon: 50g')
    expect(ingredientItems[2].text()).toContain('Eggs: 3')
    expect(ingredientItems[3].text()).toContain('Salt')
    expect(ingredientItems[4].text()).toContain('Pepper')
    expect(ingredientItems[5].text()).toContain('Parmesan')
  })
})
