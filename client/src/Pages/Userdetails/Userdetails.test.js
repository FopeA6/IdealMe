import Userdetails from '.';
import { shallow } from 'enzyme';

fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve([
        {
            "age": 25,
            "caloriesConsumed": 170,
            "caloriesGoal": 2286,
            "fitnessLevel": "Not Active",
            "id": 38,
            "myHeight": 69.6,
            "myWeight": 176.37,
            "today": "04/02/2021",
            "userId": 2
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


describe('fetching', ()=>{
    let component;

    beforeEach(()=>{
        component = shallow(<Userdetails.WrappedComponent 
            user={{
                name: "bob",
                userId: 2,
                email: "bob@b.com"
            }}/>)
    });

    test('componentDidMount', async()=>{
        const instance = await component.instance();

        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('the fetchDetails function', async()=>{
        const instance = component.instance();
        jest.spyOn(instance, 'fetchDetails');
        await instance.fetchDetails();
        expect(instance['state'].data).not.toBe([]);
        expect(instance.fetchDetails).toHaveBeenCalledTimes(1);
      
    });

    test('caloriesCalculator', ()=>{
        const instance = component.instance();
        jest.spyOn(instance, 'caloriesCalculator');
        const cal1 = instance.caloriesCalculator(69.6, 176.37, 25, 'male', 'Not Active', 'maintain');
        expect(cal1).toEqual(2286);
        
        const cal2 = instance.caloriesCalculator(69.6, 176.37, 25, 'male', 'Not Active', 'mild');
        expect(cal2).toEqual(2012);
        expect(instance.caloriesCalculator).toHaveBeenCalledTimes(2);
    })

})

// add details test

// calories counter


