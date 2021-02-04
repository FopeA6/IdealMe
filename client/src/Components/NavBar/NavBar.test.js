import { default as NavBar } from '.';
import { shallow } from 'enzyme';

describe('NavBar', () => {
let wrapper, mockLogout, mockisLoggedIn, NavLink, nav, firstNavLink 
let logout = jest.fn() 
// let mockSetState = jest.fn()

// jest.mock('react', () => ({
//     useState:({display: "none"}) => [{display: "none"}, mockSetState]
// }))

beforeEach(() => {
    // mockLogout = { logout: jest.fn() }
    mockisLoggedIn = { isLoggedIn: jest.fn() }
    wrapper = shallow(<NavBar logout={mockLogout} isLoggedIn={mockisLoggedIn}/>)
})

test('it renders', () => {
    expect(wrapper.find('nav')).toHaveLength(1);
})

test('it has a title', () => {
    expect(wrapper.find('h2')).toHaveLength(2);
})

test('able to find a html element by id', () => {
    expect(wrapper.find('#idealMeTitle').html()).toContain('idealMe')
})

test('in nav, it contains 4 nav links', () => {
    nav = wrapper.find('nav');
    NavLink = wrapper.find('NavLink')
    expect(wrapper.find('NavLink')).toHaveLength(4)
})

test('NavLinks paths 1', () => {
    nav = wrapper.find('nav');
    NavLink = wrapper.find('NavLink')
    expect(wrapper.find('NavLink')).toHaveLength(4)
    const firstNavLink = wrapper.find('NavLink').first();
    expect(firstNavLink.prop('to')).toEqual('/calories');
})

test('NavLinks paths 2', () => {
    nav = wrapper.find('nav');
    NavLink = wrapper.find('NavLink')
    expect(wrapper.find('NavLink')).toHaveLength(4)
    const secondNavLink = wrapper.find('NavLink').at(1)
    expect(secondNavLink.prop('to')).toEqual('/details');
})

test('NavLinks paths 3', () => {
    nav = wrapper.find('nav');
    NavLink = wrapper.find('NavLink')
    expect(wrapper.find('NavLink')).toHaveLength(4)
    const thirdNavLink = wrapper.find('NavLink').at(2)
    expect(thirdNavLink.prop('to')).toEqual('/progress');
    
})

test('NavLinks paths 4', () => {
    nav = wrapper.find('nav');
    NavLink = wrapper.find('NavLink')
    expect(wrapper.find('NavLink')).toHaveLength(4)
    const fourthNavLink = wrapper.find('NavLink').at(3)
    expect(fourthNavLink.prop('to')).toEqual('/recipe');
})

test('it should handle a click event', () => {
    const menuIcon = wrapper.find('.menuIcon')
    wrapper.find('.menuIcon').stimulate("click");
    expect(wraper.state("active")).toBeTruthy()
})

// test('calls logout function when clicked', () => {
//     const button = wrapper.find('button').first()
//     button.stimulate('click')
//     expect(logout.mock.calls.length).toBe(1)
// })

test('onClick of the menuIcon, the menu opens', () => {

})


})
