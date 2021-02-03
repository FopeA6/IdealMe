import Calories from '.';
import { shallow } from 'enzyme';

describe('Calories', () => {
    let component
    let getSearchMock = jest.fn();

    beforeEach(() => {
        component = shallow(<Calories getSearch = {getSearchMock}/>)
    })

test('it renders', () => {
    expect(component.find('div')).toHaveLength(3)
    })

test('it renders the title', () => {
    expect(component.find('h1').text()).toContain('Hello to calories page!');
    })

test('it renders a second title', () => {
     expect(component.find('h2').text()).toContain('What did you eat?');
    })
test('it renders a sub-paragraph', () => {
    expect(component.find('p').text()).toContain('Enter the food you had her and we tell you how much calories you had.');
})
test('it has a form', () => {
    form = component.find('form')
    expect(form).toHaveLength(1);
})

test('it has a h3', () => {
    expect(component.find('h3').text()).toContain('Your food has the following nutritional value:');
})

test('it has a table', () => {
    expect(component.find('table')).toHaveLength(1)
})

test('able to find the following html elements', () => {
    expect(component.find('th')).toHaveLength(6);
    expect(component.find('caption')).toHaveLength(1);
    expect(component.find('caption').html()).toContain('Nutritional Values')
})
test('it has another paragraph', () => {
    expect(component.find('p').text()).toContain('Total calories:');
})

test('it has an onSubmit', () => {
    component.find('form').stimulate('submit', { preventDefault: jest.fn() });
})
test('it has a state', () => {
    const instance = component.instance()
    expect(instance['state']).toEqual({ data: [],
        search: "",
        foodData: [],
        totalCal: 0,
        uptoDate: true})
})
test('lifecycle method should have been called', () => {
    const componentDidMount = jest.fn()

    class Hi extends Calories {
        state = stateStub;
        componentDidMount = componentDidMount;

        render() {
            return (<Calories />)
        }
    }
    component = shallow(<Hi />)
    expect(componentDidMount.mock.calls.length).toBe(1)
})
test('it should call onChange prop', () => {
    form = component.find('form')
    const textInput = form.find('input').first()
    const initState = component.state('search')
    textInput.stimulate('change', { target: { value: 'Banana' } })
    const newState = component.state('search')
    expect(newState).not.toEqual(initState)

})
})
