import expect from 'expect';
import todos from '../../lib/reducers';

describe('todos reducer', () => {

  it('should handle initial state', () => {
    expect(
      todos(undefined, {})
    ).toEqual([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });
});
