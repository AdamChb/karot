import { mount } from '@vue/test-utils'
import IngredientsSectionCreate from '@/components/IngredientsSectionCreate.vue'
import IngredientsBox from '@/components/IngredientsBox.vue'
import IngredientsSearchBar from '@/components/IngredientsSearchBar.vue'

describe('IngredientsSectionCreate.vue', () => {
  let wrapper

  const ingredientsSelected = [
    { id: 2, name: 'Cheese' },
    { id: 4, name: 'Lettuce' },
    { id: 5, name: 'Chicken' },
    { id: 7, name: 'Milk' },
    { id: 9, name: 'Bread' },
  ]

  const ingredientsUnselected = [
    { id: 1, name: 'Pasta' },
    { id: 3, name: 'Oil' },
    { id: 6, name: 'Meat' },
    { id: 8, name: 'Flour' },
  ]

  // Mount the component before each test
  beforeEach(() => {
    wrapper = mount(IngredientsSectionCreate, {
      data() {
        return {
          ingredientsSelected,
          ingredientsUnselected,
        }
      },
    })
  })

  // Destroy the wrapper after each test to clean up
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the search bar', () => {
    // Check that the IngredientsSearchBar component is rendered
    expect(wrapper.findComponent(IngredientsSearchBar).exists()).toBe(true)
  })

  it('renders the correct number of inactive ingredients', () => {
    // Check that the number of inactive ingredients displayed is correct
    const inactiveIngredients = wrapper.findAll('#items-inactive .container-component-ingredients')
    expect(inactiveIngredients.length).toBe(ingredientsUnselected.length)
  })

  it('renders the correct number of active ingredients', () => {
    // Check that the number of active ingredients displayed is correct
    const activeIngredients = wrapper.findAll('#items-active .container-component-ingredients')
    expect(activeIngredients.length).toBe(ingredientsSelected.length)
  })

  it('selects an ingredient and moves it from unselected to selected', async () => {
    // Simulate selecting an unselected ingredient (Pasta)
    await wrapper.findComponent(IngredientsBox).vm.$emit('changeState', 1)

    // Verify that the ingredient has been moved to the selected list
    expect(wrapper.vm.ingredientsSelected.length).toBe(ingredientsSelected.length + 1)
    expect(wrapper.vm.ingredientsUnselected.length).toBe(ingredientsUnselected.length - 1)

    // Check if Pasta is in the selected ingredients
    expect(wrapper.vm.ingredientsSelected).toContainEqual({ id: 1, name: 'Pasta' })
  })

  it('unselects an ingredient and moves it back to unselected', async () => {
    // Simulate unselecting an active ingredient (Cheese)
    await wrapper.findAllComponents(IngredientsBox)[0].vm.$emit('changeState', 2)

    // Verify that the ingredient has been moved back to the unselected list
    expect(wrapper.vm.ingredientsSelected.length).toBe(ingredientsSelected.length - 1)
    expect(wrapper.vm.ingredientsUnselected.length).toBe(ingredientsUnselected.length + 1)

    // Check if Cheese is back in the unselected ingredients
    expect(wrapper.vm.ingredientsUnselected).toContainEqual({ id: 2, name: 'Cheese' })
  })

  it('updates the search filter', async () => {
    // Simulate updating the search bar
    const searchValue = 'Pasta'
    await wrapper.findComponent(IngredientsSearchBar).vm.$emit('search', searchValue)

    // Verify that the search filter value is updated correctly
    expect(wrapper.vm.searchfilter).toBe(searchValue)
  })

  it('filters unselected ingredients based on the search filter', () => {
    // Test the filtering functionality
    const filteredIngredients = wrapper.vm.filterSearchBar('Pasta')

    // Verify that only the ingredient with "Pasta" is returned
    expect(filteredIngredients).toEqual([{ id: 1, name: 'Pasta' }])
  })
})
