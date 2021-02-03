import Login from '.';
import { shallow } from 'enzyme';

describe('Login', () => {
    let component, loginMock, form, label;
    const fakeEvent = { preventDefault: () => "do nothing" };
    
    beforeEach(() => {
        loginMock = jest.fn()
        component = shallow(<Login login={loginMock}/>)
    })

    test('it renders', () => {
        expect(component.find('div')).toHaveLength(4)
    })

    test('it has a state', () => {
        const instance = component.instance()
        expect(instance['state']).toEqual({"username": "", "password": ""})
    })

    test('it renders a title', () => {
        expect(component.find('h2').text()).toContain('Login')
    })

    test('it renders a form with two text inputs and a submit', () => {
        form = component.find('form');
        expect(form).toHaveLength(1);
        const inputs = form.find('input')
        expect(inputs).toHaveLength(3);
        expect(inputs.first().props().type).toBe('text');
    })
    test('it renders the title', () => {
        expect(component.find('h2').text()).toContain('Login');
    })
    test('it renders an input with label', () => {
        component = shallow(<input type="text" name="name" label="username" />)
        label = component.find('label');
        expect(label).toHaveLength(1)
        expect(label.prop('htmlFor')).toEqual("username")
        expect(label.text()).toEqual("Enter your username")
    })
    test('it calls on login prop on form submission', () => {
        form = component.find('form');
        component.setState({username: "bob",password: "enter"});
        form.simulate("submit", fakeEvent);
        expect(loginMock).toHaveBeenNthCalledWith(1, 'bob', 'enter');
 })
    test('it calls onSubmit prop function when form is submitted', () => {
        const onSubmitFn = jest.fn();
        component = shallow(<Login onSubmit={onSubmitFn} />)
        form = component.find('form')
        form.stimulate('submit')
        expect(onSubmitFn).toHaveBeenCalledTimes(1)
})

test('it disables submit button on incomplete form submission', () => {
    
})
})