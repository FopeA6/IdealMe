import DailyCalories from '.';
import { shallow } from 'enzyme';

describe('DailyCalories', () => {
    let component, stubProps, paragraph, form, label
    //const fakeEvent = { preventDefault: () => "do nothing" };
    
    beforeEach(() => {
        fetchMock = jest.fn();
        component = shallow(<DailyCalories key={1} BMI={26} intake={2500} consumed={100} user={2} fetchCalories={fetchMock}/>)
    })

test('it renders', () => {
    expect(component.find('div')).toHaveLength(1)
    })

test('it is able to find a html element', () => {
    expect(component.find('p')).toHaveLength(3)
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

test('it calls onSubmit prop function when form is submitted', () => {
    const onSubmitFn = jest.fn();
    component = shallow(<DailyCalories onSubmit={onSubmitFn} />)
    form = component.find('form')
    form.stimulate('submit')
    expect(onSubmitFn).toHaveBeenCalledTimes(1)
})
// test('it calls on addCalories prop on form submission', () => {
//     form = component.find('form');
//     component.setProps({key="{1}", BMI="{26}", intake="{2500}", consumed="{100}", user="{2}", fetchCalories="{fetchmock}"});
//     form.simulate("submit", fakeEvent);
//     expect(fetchMock).toHaveBeenNthCalledWith(1, 'bob', 'enter');
// })
// lines 30
test('the addCalories function', async() => {
    const instance = component.instance
    jest.spyOn(instance, 'addCalories');
    await instance.addCalories();
    console.log(instance['state']);
    expect(instance['state'].fetchCalories)
})
})
