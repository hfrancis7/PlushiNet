import { reducer } from '../utils/reducers';
import {
  UPDATE_PRODUCTS
} from '../utils/actions';

const initialState = {
  products: []
   
};

test('UPDATE_PRODUCTS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}]
  });

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});




