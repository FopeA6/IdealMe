import Calories from '.';

describe('Calories', () => {
    let component
    
    beforeEach(() => {
        component = shallow(<Calories />)
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

test('it has another paragraph', () => {
    expect(component.find('p').text()).toContain('Total calories:');
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
})
