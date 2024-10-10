import { mount } from '@vue/test-utils'
import RecipeCard from '@/components/RecipeCard.vue'

describe('RecipeCard.vue', () => {
  let wrapper
  const recipe = {
    ID_Recipe: 1,
    Name_Recipe: 'Spaghetti Carbonara',
    Author_Name: 'John Doe',
    Likes_Count: 5,
    Has_Liked: false,
  }

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(RecipeCard, {
      props: {
        recipe: recipe,
      },
    })
  })

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the recipe card correctly', () => {
    // Check if the recipe name and author are rendered correctly
    expect(wrapper.find('h3').text()).toBe(recipe.Name_Recipe)
    expect(wrapper.find('.author').text()).toBe(recipe.Author_Name)
    expect(wrapper.find('.likes').text()).toBe(recipe.Likes_Count.toString())
  })

  it('emits the correct route on click to go to recipe page', async () => {
    // Mock the $router
    wrapper.vm.$router = {
      push: jest.fn(),
    }

    // Click on the recipe card to navigate
    await wrapper.find('.recipe').trigger('click')

    // Check that the router push method was called with the correct path and query
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ path: '/recipe', query: { id: recipe.ID_Recipe } })
  })

  it('toggles like status when toLike is called', async () => {
    // Call the toLike method
    wrapper.vm.toLike(recipe)

    // Check if the recipe like status and count are updated
    expect(recipe.Has_Liked).toBe(true)
    expect(recipe.Likes_Count).toBe(6)
  })

  it('toggles like status when unLike is called', async () => {
    // Set the recipe to liked
    recipe.Has_Liked = true
    recipe.Likes_Count = 6

    // Call the unLike method
    wrapper.vm.unLike(recipe)

    // Check if the recipe like status and count are updated
    expect(recipe.Has_Liked).toBe(false)
    expect(recipe.Likes_Count).toBe(5)
  })
})
