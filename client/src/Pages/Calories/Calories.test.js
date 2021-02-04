import Calories from '.';
import { shallow } from 'enzyme';

fetch = jest.fn(() => Promise.resolve({
    json: ()=>Promise.resolve([
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

describe('Calories', () => {
    let component
    let getSearchMock;

    beforeEach(() => {
        component = shallow(<Calories getSearch = {getSearchMock}/>)
        getSearchMock = jest.fn();
    });

    test('it renders', () => {
        expect(component).toExist;
        expect(component.find('div')).toHaveLength(4);
        });

    test('it renders the title', () => {
        expect(component.find('h1').text()).toContain(' Tracking your daily calories! ');
        });

    test('it renders a second title', () => {
        expect(component.find('h2').text()).toContain('What did you eat?');
        });

    test('it renders a sub-paragraph', () => {
        expect(component.find('.subContainer > p').first().text()).toContain('Enter the food you had here and we tell you how much calories you had.');
    });
    
    test('it has a form', () => {
        const form = component.find('form')
        expect(form).toHaveLength(1);
    });

    test('it has a h3', () => {
        expect(component.find('h3').text()).toContain('Your food has the following nutritional value:');
    });

    test('it has a table', () => {
        expect(component.find('table')).toHaveLength(1)
    });

    test('able to find the following html elements', () => {
        expect(component.find('th')).toHaveLength(6);
        expect(component.find('caption')).toHaveLength(1);
        expect(component.find('caption').html()).toContain('Nutritional Values')
    });

    test('it has another paragraph', () => {
        expect(component.find('p').last().text()).toContain('Total calories:');
    });

    test('it has an onSubmit', () => {
        component.find('form').simulate('submit', { preventDefault: jest.fn() });
    });

    test('it has a state', () => {
        const instance = component.instance()
        expect(instance['state']).toEqual({ 
            chartData: {},
            data: [],
            search: "",
            foodData: [],
            newUser: false,
            totalCal: 0,
            uptoDate: true})
    });

    test('lifecycle method should have been called', async() => {
        const instance = await component.instance();
        
        expect(fetch).toHaveBeenCalledTimes(1)
    });

    test('it should call onChange prop', () => {
        const form = component.find('form')
        const textInput = form.find('input').first()
        const initState = component.state('search')
        textInput.simulate('change', { target: { value: 'Banana' } })
        const newState = component.state('search')
        expect(newState).toEqual('')
    });
})


describe('the fetch stuff', ()=>{
    let component, getSearchMock;

    beforeEach(()=>{
        component = shallow(<Calories user={{
            name:"bob",
            userId:2,
            email:"bob@b.com"
        }}
            getSearch = {getSearchMock}/>)
        getSearchMock = jest.fn();
    });

    test('fetchCalories', async()=>{
        const instance = await component.instance();
        jest.spyOn(instance, 'fetchCalories');
        instance.fetchCalories();
        console.log(instance['state'])
        expect(instance['state'].data[0]).toEqual({
            "age": 25,
            "caloriesConsumed": 170,
            "caloriesGoal": 2286,
            "fitnessLevel": "Not Active",
            "id": 38,
            "myHeight": 69.6,
            "myWeight": 176.37,
            "today": "04/02/2021",
            "userId": 2
          });
    });

    test('calculate BMI', async ()=>{
        const instance = await component.instance();
        jest.spyOn(instance, 'calculateBMI');
        instance.fetchCalories();
        const stateVal = instance['state'].data[0];
        const bobBmi = instance.calculateBMI(stateVal.myWeight, stateVal.myHeight)
        
        expect(instance.calculateBMI).toHaveBeenCalledTimes(1);
        expect(bobBmi).toEqual(20);
    });

    test('fake calorieninja api', async ()=> {
        const instance = await component.instance();
        const e = {preventDefault: ()=>{""}}
        jest.spyOn(instance, 'getSearch')

        expect(instance['state'].search).toEqual("");
    });

    test('addTotal', ()=>{
        const data = [{
            calories: 263.8,
            carbohydrates_total_g: 19.7,
            protein_g: 15.1,
            fat_total_g: 14.1
        }]
        const instance = component.instance();
        jest.spyOn(instance, 'addTotal');
        instance.addTotal(data);
        expect(instance.addTotal).toHaveBeenCalledTimes(1);
        expect(instance['state'].totalCal).toEqual(263.8);
    })
})