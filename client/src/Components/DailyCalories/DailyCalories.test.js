import DailyCalories from '.';
import { shallow } from 'enzyme';

fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve([
        {"msg": "calories have been added"}
    ])
}))

describe('DailyCalories', () => {
    let component, stubProps, paragraph, form, label, fetchMock
    //const fakeEvent = { preventDefault: () => "do nothing" };
    
    beforeEach(() => {
        component = shallow(<DailyCalories key={1} BMI={26} intake={2500} consumed={100} user={2} fetchCalories={fetchMock}/>)
        fetchMock = jest.fn();
    })

    test('it renders', () => {
        expect(component).toExist;
        })

    test('it is able to find a html element', () => {
        expect(component.find('p')).toHaveLength(3)
    })

    test('it renders a form', () => {
        form = component.find('form');
        expect(form).toHaveLength(1);
    })

    test('the form has 1 number inputs', () => {
        form = component.find('form');
        const input = form.find('input')
        expect(input).toHaveLength(2)
        expect(input.first().props().type).toBe('number');
    })

    test('it calls onSubmit prop function when form is submitted', () => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        const instance = component.instance()
        jest.spyOn(instance, 'addCalories');
        expect(component.find('.countForm').length).toBe(1);
        component.find('.countForm').simulate('submit', fakeEvent);

        expect(instance.addCalories).toHaveBeenCalledTimes(1);
    })
// test('it calls on addCalories prop on form submission', () => {
//     form = component.find('form');
//     component.setProps({key="{1}", BMI="{26}", intake="{2500}", consumed="{100}", user="{2}", fetchCalories="{fetchmock}"});
//     form.simulate("submit", fakeEvent);
//     expect(fetchMock).toHaveBeenNthCalledWith(1, 'bob', 'enter');
// })
// lines 30
    test('the addCalories function', async() => {
        const e = { preventDefault: () => console.log('preventDefault'),
                    target: {
                        caloriesValue: {
                            value: "submitted value"
                        }
                    }    
                };

        const instance = component.instance();
        jest.spyOn(instance, 'addCalories');
        jest.spyOn(instance['props'], 'fetchCalories');
        await instance.addCalories(e);
        expect(instance.addCalories).toHaveBeenCalledTimes(1);
        expect(e.target.caloriesValue.value).toBe("");
        expect(instance['props'].fetchCalories).toHaveBeenCalledTimes(1);
    })
})
