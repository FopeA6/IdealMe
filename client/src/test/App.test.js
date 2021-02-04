import App from '../App.js';
import { shallow } from 'enzyme';

fetch = jest.fn(() =>Promise.resolve({
    json: () => Promise.resolve({
        userId: 4,
        userName: "MrAwesome"
    })
}))

describe('App', () => {
    let component;
    let state = {
        isLoggedIn: false,
        currentUser: {}
    }

    beforeEach(() => {
        component = shallow(<App.WrappedComponent history={{push: (p)=>{}}} 
        state = {{isLoggedIn: false,
        currentUser: {}}} />)
    });

    test('it exists', () => {
        expect(component).toExist
    })

    test('it renders', () => {
        expect(component.find('main')).toHaveLength(1)
    });

    test('number of switch', () => {
        let routerSwitch = component.find('Switch')
        expect(routerSwitch.length).toBe(1)
        expect(routerSwitch.children().length).toBe(7);
    });

    test('number of routers', () => {
        let router = component.find('Route')
        let logRouter = component.find('LoggedOutRoute')
        let privRouter = component.find('PrivateRoute')

        expect(router.length).toBe(1)
        expect(component.find('LoggedOutRoute')).toHaveLength(2)
        expect(privRouter.length).toBe(4)
    });

    test('path of the routes', ()=>{
        let rswitch = component.find('Switch');
        let router = component.find('Route')
        expect(rswitch.prop('id')).toEqual('navPaths');
        expect(router.prop('path')).toEqual('/');
    })

    test('path of LoggedOutRoutes', () => {
        const firstLoggedOutRoute = component.find('LoggedOutRoute').first();
        expect(firstLoggedOutRoute.prop('path')).toEqual('/login')
    })

    test('path of LoggedOutRoute2', () => {
        const secondLoggedOutRoute = component.find('LoggedOutRoute').at(1);
        expect(secondLoggedOutRoute.prop('path')).toEqual('/register')
    })

    test('path of PrivateRoute1', () => {
        const firstPrivateRoute = component.find('PrivateRoute').first();
        expect(firstPrivateRoute.prop('path')).toEqual('/calories')
    })

    test('path of PrivateRoute2', () => {
        const secondPrivateRoute = component.find('PrivateRoute').at(1);
        expect(secondPrivateRoute.prop('path')).toEqual('/progress')
    })

    test('path of PrivateRoute3', () => {
        const thirdPrivateRoute = component.find('PrivateRoute').at(2);
        expect(thirdPrivateRoute.prop('path')).toEqual('/details')
    })

    test('path of PrivateRoute4', () => {
        const fourthPrivateRoute = component.find('PrivateRoute').at(3);
        expect(fourthPrivateRoute.prop('path')).toEqual('/recipe')
    })


    test('check logout', ()=>{
        let instance = component.instance();
        instance.setState({ isLoggedIn: true });
        expect(instance.state.isLoggedIn).toBe(true);

        instance.logout();

        expect(instance.state.isLoggedIn).toBe(false);
    })

    test('fetch login works', async()=>{
        const instance = component.instance();
        jest.spyOn(instance, 'login');
        await instance.login({username: "MrAwesome", password: "welcome"});

        expect(instance['state'].currentUser.userName).toEqual('MrAwesome');
    })
    test('it renders links to Logged Out Route Page', () => {
        let links = component.find('LoggedOutRoute');
        expect(links).toHaveLength(2)
        })
    
    test('it renders links to PrivateRoute Page', () => {
        let links = component.find('PrivateRoute');
        expect(links).toHaveLength(4)
        })

    test('it has a state', () => {
        const instance = component.instance()
        expect(instance['state']).toEqual( {isLoggedIn: false,
            currentUser: {}})
    })
})

