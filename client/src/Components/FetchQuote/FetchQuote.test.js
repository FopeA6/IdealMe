import FetchQuote from '.'
import { shallow } from 'enzyme';

fetch = jest.fn(()=> Promise.resolve({
    json: ()=> Promise.resolve({
        contents: {
            quotes: [
                {
                    quote: "Failure is the condiment that gives success its flavor.",
                    author: "Truman Capote"
                }
            ]
        }
    })
}))

describe('FetchQuote', ()=>{
    let component;

    beforeEach(()=>{
        component = shallow(<FetchQuote />)
    });

    test('it renders', ()=>{
        expect(component).toExist;
    });

    test('elements', ()=>{
        let divElement = component.find('div');
        expect(divElement.length).toBe(1);
        expect(divElement.children().length).toBe(2);
    })

    test('get quote', async ()=>{
        const instance = component.instance()
        jest.spyOn(instance, "getQuote");
        await instance.getQuote();
         
        expect(instance.getQuote).toHaveBeenCalledTimes(1);
        expect(instance['state']['quote']).toBe("Failure is the condiment that gives success its flavor.");
        expect(instance['state']['author']).toBe("Truman Capote");
    })
})