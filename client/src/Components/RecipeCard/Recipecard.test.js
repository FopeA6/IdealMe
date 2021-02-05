import Recipecard from '.';
import { shallow } from 'enzyme';


describe('Recipecard', () => {
    let component, stubRecipes
    
    beforeEach(() => {
        //stubRecipes = { title , image, whatever, calories, ingredients, url}
        component = shallow(<Recipecard title ={[]} image ={[]} calories ={[]} ingredients ={[]} url ={[]}   />)
    })

    test('it renders', () => {
        expect(component.find('div')).toHaveLength(3)
        })
    test('it renders the title', () => {
        expect(component.find('h1')).toHaveLength(1)
        })
    test('it finds an ordered list', () => {
        expect(component.find('ol')).toHaveLength(1);
    })
    test('it renders a paragraph', () => {
        expect(component.find('p')).toHaveLength(1);
        expect(component.find('p').html()).toContain('Calories')
    })

    test('it renders an image', () => {
        expect(component.find('img')).toHaveLength(1);
    })

    test('able to find the a html element', () => {
        expect(component.find('a')).toHaveLength(1);
        expect(component.find('a').html()).toContain('Hungry? Go to the recipe')
    })

    test('renders a list', () => {
        expect(component.find('li')).toHaveLength(0);
    })


// describe('Testing Keys', () => {
//     test('it returns an obeject with 5 keys')
// })
//     test('it renders a title when passed a recipe as a prop', () => {
//         const header = component.find('h1')
//         expect(header.props()).children(title)
//     })
})
