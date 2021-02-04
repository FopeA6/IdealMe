import Progress from '.';
import { shallow } from 'enzyme';

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