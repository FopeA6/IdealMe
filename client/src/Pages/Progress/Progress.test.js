import Progress from '.';
import { shallow } from 'enzyme';

fetch = jest.fn(()=> Promise.resolve({
    json: ()=> Promise.resolve([
        {
            chartdata: 0,
            fetchcalories: fetchMock,
            user: 2
        }
    ])
}))

describe('Progress', () => {
    let component

beforeEach(() => {
    component = shallow(<Progress />)
});
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

test('componentDidMount does fetch once', async()=> {
    const data = await component.instance();

    //console.log(data['state']);
    expect(fetch).toHaveBeenCalledTimes(1);
})
})
