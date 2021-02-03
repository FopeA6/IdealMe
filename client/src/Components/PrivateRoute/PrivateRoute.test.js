import PrivateRoute from '.';
import { shallow } from 'enzyme';
import { component } from 'react';

describe('PrivateRoute', () => {
    let component;
    
    beforeEach(() => {
        component = shallow(<PrivateRoute isLoggedIn={true} />)
    })

    test('it renders', () => {
        expect(component.find('Route')).toHaveLength(1)
    })

    test('The props renders accordingly', () => {
        const loginComponent = shallow(<PrivateRoute isLoggedIn={true}/>)
        loginComponent.setProps({isLoggedIn: true})
        expect(loginComponent).toHaveLength(1)
    })

    test('it redirects to /login link', () => {
        let links = component.find('Redirect');
        expect(links).toHaveLength(0)
        })
})