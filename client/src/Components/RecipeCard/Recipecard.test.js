import Recipecard from '.';
import { shallow } from 'enzyme';


describe('Recipecard', () => {
    let component
    
    beforeEach(() => {
        component = shallow(<Recipecard />)
    })

    test('it renders', () => {
        expect(component.find('div')).toHaveLength(1)
        })
    test('it renders the title', () => {
        expect(component.find('h1').text()).toContain('Welcome to idealMe');
        })
    test('it renders an ordered list', () => {

    })
    test('it renders a paragraph', () => {

    })

    test('it renders an image', () => {

    })
})