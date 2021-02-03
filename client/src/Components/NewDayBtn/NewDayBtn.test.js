import NewDayBtn from '.';
import { shallow } from 'enzyme';

describe('NewDayBtn', () => {
    let component, button

beforeEach(() => {
    component = shallow(<NewDayBtn />)
});

test('it renders', () => {
    expect(component.find('div')).toHaveLength(1);
})

test('it renders a paragraph', () => {
    expect(component.find('p')).toHaveLength(1);
})
test('it renders a button', () => {
    button = component.find('button');
    expect(component.find('button')).toHaveLength(1);
})
test('it calls addNewDay on click', () => {
    button = component.find('button');
    expect(button.props().onClick).toEqual(addNewDay);

})

// functions - line 6-27


})