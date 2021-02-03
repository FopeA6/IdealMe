import DailyCalories from '.';

describe('DailyCalories', () => {
    let component, stubProps, paragraph, form, label
    
    beforeEach(() => {
        component = shallow(<DailyCalories />)
    })

test('it renders', () => {
    expect(component.find('div')).toHaveLength(1)
    })

test('it is able to find a html element', () => {
    expect(component.find('p')).toHaveLength(3)
})

test('it should render BMI, intake and consumed inside the p tags', () => {
    paragraph = component.find('p')
    expect(paragraph.text(1)).toContain(stubProps.BMI)

})

test('it renders a form', () => {
    form = component.find('form');
    expect(form).toHaveLength(1);
})

test('the form has 1 number inputs', () => {
    form = component.find('form');
    const input = form.find('input')
    expect(input).toHaveLength(2)
    expect(input.first().props().type).toBe('number');
})

test('it renders an input with label', () => {
    component = shallow(<input type="number" step=".01" name="caloriesValue" />)
    label = component.find('label');
    expect(label).toHaveLength(1)
    expect(label.prop('htmlFor')).toEqual("adding")
    expect(label.text()).toEqual("Add calories")
})

test('it calls onSubmit prop function when form is submitted', () => {
    const onSubmitFn = jest.fn();
    component = shallow(<DailyCalories onSubmit={onSubmitFn} />)
    form = component.find('form')
    form.stimulate('submit')
    expect(onSubmitFn).toHaveBeenCalledTimes(1)
})

// lines 5 -22
test('the addCalories function', async() => {
    const instance = component.instance
    jest.spyOn(instance, 'addCalories');
    await instance.addCalories();
    console.log(instance['state']);
    expect(instance['state'])
})
})
