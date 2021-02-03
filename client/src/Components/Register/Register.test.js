import Register from '.';
import { shallow } from 'enzyme';

describe('Register', () => {
    let component, form, state;
    const fakeEvent = { preventDefault: () => "do nothing" };
    const registerMock = jest.fn()

    beforeEach(() => {
        component = shallow(<Register.WrappedComponent  register = {registerMock}/>)
    })

    test('it renders', () => {
        expect(component.find('div')).toHaveLength(6)
    })

    test('it has a state', () => {
        const instance = component.instance()
        expect(instance['state']).toEqual({name: "",
        email: "",
        password: "",
        passwordConfirmation: ""})
    })

    test('it renders a form', () => {
        form = component.find('form');
        expect(form).toHaveLength(1);
    })

    test('it renders the title', () => {
        expect(component.find('h2').text()).toContain('Create an Account');
    });
    
    test('it renders a form with three text inputs and a submit', () => {
        form = component.find('form');
        expect(form).toHaveLength(1);
        const inputs = form.find('input')
        expect(inputs).toHaveLength(5);
        expect(inputs.first().props().type).toBe('text');
    })

    test('it renders a form with a submit input', () => {
        form = component.find('form');
        component.find('form').simulate('submit', { preventDefault: jest.fn() });
    })
    test('it calls onSubmit prop function when form is submitted', () => {
        const onSubmitFn = jest.fn();
        component = shallow(<Register.WrappedComponent onSubmit={onSubmitFn} />)
        form = component.find('form')
        form.stimulate('submit')
        expect(onSubmitFn).toHaveBeenCalledTimes(1)
})

    test('it calls on register prop on form submission', () => {
    //
    registerMock = jest.fn()
    component = shallow(<Register register={registerMock}/>)
    //
    form = component.find('form');
    component.setState({username: "bob",password: "enter", passwordConfirmation: "enter"});
    form.simulate("submit", fakeEvent);
    expect(registerMock).toHaveBeenNthCalledWith(1, 'bob', 'enter', 'enter');
})
})