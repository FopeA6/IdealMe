import Recipe from '.';

describe('Recipe', () => {
    let component, form, button
    let useEffect;
    let props

    let mockUseEffect = () => {
      useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect();
        component = shallow(<Recipe />)

        props ={
            getRecipes: jest.fn().mockResolvedValue(recipes)
        }
    })

test('it renders', () => {
    expect(component.find('div')).toHaveLength(1)
    })

 test('it renders a form ', () => {
        form = component.find('form');
        expect(form).toHaveLength(1);
 })

test('it renders a button', () => {
        button = component.find('button');
        expect(component.find('button')).toHaveLength(1);
        expect(component.find('button').html()).toContain('Search')
    })

test('it calls onSubmit prop function when form is submitted', () => {
    const onSubmitFn = jest.fn();
    component = shallow(<Recipe onSubmit={onSubmitFn} />)
    form = component.find('form')
    form.stimulate('submit')
    expect(onSubmitFn).toHaveBeenCalledTimes(1)

})
test('able to find the h1,h2 html element', () => {
    expect(component.find('h1')).toHaveLength(1);
    expect(component.find('h2')).toHaveLength(1);
    expect(component.find('h1').html()).toContain('What do you want to eat?')
    expect(component.find('h2').html()).toContain('Enter a craving and we will give you some meal suggestions')
})

test('updates search onChange', () => {
    form = component.find('form');
    const textInput = form.find('input').first();
    const initState = component.state('search');
    textInput.simulate('change', { target: { value: 'Banana' } })
    const newState = wrapper.state('search');
    expect(newState).not.toEqual(initState)
})

test('it renders', () => {
    expect(component.find('RecipeCard')).toHaveLength(1)
})

// Functions

test('updatSearch function', () => {
    updateSearch = jest.fn()
})

test('getSearch function', () => {
    getSearch = jest.fn()
})

test('on start it gets Recipes', () => {
    expect(props.getRecipes).toHaveBeenCalled();
})
    })
