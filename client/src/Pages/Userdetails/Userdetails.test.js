import Userdetails from '.';
import { shallow } from 'enzyme';

describe('userdetails', () => {
    let component, form
    let state = {
        data: []
    }

    beforeEach(() => {
        component = shallow(<Userdetails />)
    })

test('it renders', () => {
    expect(component.find('section')).toHaveLength(1)
    })
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
    const input = form.find('input')
    expect(input).toHaveLength(3)
    expect(inputs.first().props().type).toBe('number');
})

test('it renders a form with a submit input', () => {
    form = component.find('form');
    expect(form.first().props().type).toBe('number')
})
test('it has a state', () => {
    const instance = component.instance()
    expect(instance['state']).toEqual({"data": []})
})