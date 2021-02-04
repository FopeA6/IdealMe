import { default as NavBar } from '.';
import { shallow } from 'enzyme';

describe('NavBar', () => {
    let wrapper, mockLogout, mockisLoggedIn, NavLink, nav, firstNavLink;
    let logout = jest.fn();
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
        wrapper.find('.menuIcon').simulate("click");
        const pro2 = wrapper.props()
        //console.log(pro['children'].props.children[1].props.style.display)
        expect(pro2['children'].props.children[1].props.style.display).toBe("flex")
    })


    test('closeLog', ()=>{
        //const instance = wrapper.instance();
        const pro2 = wrapper.props()
        const func = pro2['children'].props.children[1].props.children[4].props.onClick
        jest.spyOn(wrapper, func)

        expect(instance.closeLog).toHaveBeenCalledTimes(1);
        expect(instance.openMenu).toHaveBeenCalledTimes(1);
        expect(instance.logout).toHaveBeenCalledTimes(1);

    })


})
