import Userdetails from '.';
import { shallow } from 'enzyme';

fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve([
        {
            data: 0
        }
    ])
}))

describe('userdetails', () => {
    let component, form, input
    

    beforeEach(() => {
        component = shallow(<Userdetails.WrappedComponent 
            data={{
                height: 72.2,
                weight: 176.37,
                age: 25,
                fitness: "Not Active",
                caloriesGoal: "Maintain",
                caloriesConsumed:0,
                today: "04/02/2021",
                user: 2
             }} 
             />)
             
    })

test('it renders', () => {
    expect(component.find('section')).toHaveLength(1)
    })

test('it renders the title', () => {
    expect(component.find('h1').text()).toContain('View your details here');
})

test('it renders a form', () => {
    form = component.find('form');
    expect(form).toHaveLength(1);
})

test('the form has 3 number inputs', () => {
    form = component.find('form');
    input = form.find('input')
    expect(input).toHaveLength(4)
    expect(input.first().props().type).toBe('number');
})

test('it has a state', () => {
    const instance = component.instance()
    expect(instance['state']).toEqual({"data": []})
})

test('it renders a form with a submit input', () => {
    form = component.find('form');
    component.find('form').simulate('submit', { preventDefault: jest.fn() });
})
})

// fetch details test
test('the fetchDetails function', async()=>{
    const instance = component.instance()
    jest.spyOn(instance, 'fetchDetails');
    await instance.fetchDetails();
    expect(instance['state'].data);
    expect(instance.fetchDetails).toHaveBeenCalledTimes(1);
  
});

// add details test

// calories counter


