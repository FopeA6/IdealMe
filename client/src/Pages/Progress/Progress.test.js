import Progress from '.';
import { shallow } from 'enzyme';

fetch = jest.fn(()=> Promise.resolve({
    json: ()=> Promise.resolve([
        [
            170,
            "04/02/2021",
            2500,
            1500
        ]
    ])
}))

describe('Progress', () => {
    let component

    beforeEach(() => {
        component = shallow(<Progress user={{name: "bob", userId: 2, email:"bob@b.com"}}/>)
    });

    test('it exists', ()=>{
        expect(component).toExist;
    });

    test('componentDidMount is called', ()=>{
        const instance = component.instance();
        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();
        expect(instance.componentDidMount).toHaveBeenCalledTimes(1);
    });

    test('fetchData', async()=>{
        const instance = component.instance();
        jest.spyOn(instance, 'fetchData');
        jest.spyOn(instance['state'], 'caloriesdata');
        await instance.fetchData();

        expect(instance['state'].caloriesdata.length).toBeGreaterThan(0)
    })

    test('chart data', ()=>{
        const instance = component.instance();
        jest.spyOn(instance, 'getChartData');

        instance.getChartData();
        expect(instance.getChartData).toHaveBeenCalledTimes(1);
    });

    test('it has a state', () => {
        const instance = component.instance()
        expect(instance['state']).toEqual({"chartdata": "{}",
            "caloriesdata": "{}"})
    })

    describe('testing fetches on the page', () => {
        let component, form, instance
        let stubProgress = {

        }
        beforeEach(() => {
            component = shallow(<Progress user= {stubProgress} />)
        })
    })

})
