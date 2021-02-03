import { default as NavBar } from '.';
import { shallow } from 'enzyme';

describe('NavBar', () => {
let wrapper, mockLogout, mockisLoggedIn 

beforeEach(() => {
    // mockLogout = {logout: jest.fn()}
    wrapper = shallow(<NavBar logout={mockLogout}/>)
})

test('it renders', () => {
    expect(wrapper.find('nav')).toHaveLength(1);
})

test('has 3 NavLinks', () => {
    expect(wrapper.find('NavLink')).toHaveLength(0);
})

test('able to find the a html element', () => {
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('h2')).toHaveLength(1)
    expect(wrapper.find('button').html()).toContain('Logout')
    expect(wrapper.find('h2').html()).toContain('idealMe')

})
test('it renders a button with an id of "logoutbtn"',() =>{
    expect(component.find('#logoutbtn')).toHaveLength(0)
})

test('onClick it logsout', () => {
    component.find('button');
})

test('it renders a button', () => {
    const button = wrapper.find('button');
    expect(wrapper.find('button')).toHaveLength(1);
})

test('if user is loggedIn, then Navlinks for habits, addhabit, statistics appear', () => {

})
})