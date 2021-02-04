import NewDayBtn from '.';
import { shallow } from 'enzyme';

let fetch = jest.fn(()=> Promise.resolve({
    json: ()=> Promise.resolve([
        {
            data: 0,
            fetchcalories: fetchMock,
            user: 2
        }
    ])
}))

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
    expect(component.find('button').text()).toEqual('+')

})

// functions - line 6-27
describe('NewDayBtn functions', () => {
    let component

    beforeEach(() => {
        component = shallow(<NewDayBtn data={0} fetchCalories = {fetchMock} user={2} />)
    })
})
test('addNewDay function', () => {
    const instance = component.instance()
    jest.spyOn(instance, 'addNewDay')
    jest.spyOn(instance, 'fetchMock')
    instance.addNewDay();
    expect(instance.fetchMock).toHaveBeenCalledTimes(1)
})

})