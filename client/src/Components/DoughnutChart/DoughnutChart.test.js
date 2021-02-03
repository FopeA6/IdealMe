import DoughnutChart from '.';
import { shallow } from 'enzyme';

describe('DoughnutChart', () => {
    let component

beforeEach(() => {
    component = shallow(<DoughnutChart />)
});

test('it renders')
expect(component.find('div')).toHaveLength(1);
})