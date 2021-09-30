/* eslint-disable max-len */
import React, { useReducer } from 'react';

const initalVal = {
  before: [],
  current: '#FF0000',
  after: ['#00FF00']
};

const colorHistory = (state, action) => {
  switch (action.type) {
    case 'undo':
      return { after: [state.current, ...state.after], current: state.before[state.before.length - 1], before: state.before.slice(0, -1) };
    case 'redo':
      return { before: [...state.before, state.current], current: state.after[0], after: state.after.slice(1) };
    case 'record':
      return { ...state, before: [...state.before, state.current], current: action.payload };

    default:
      return new Error(`AN ERROR HAS OCCURED, UNEXPECTED ACTION TYPE: ${action.type}`);
  }
};

function App() {
  const [state, dispatch] = useReducer(colorHistory, initalVal);

  return (
    <>
      <button aria-label="undo-button" onClick={() => dispatch({ type: 'undo' })}>undo</button>
      <button aria-label="redo-button" onClick={() => dispatch({ type: 'redo' })}>redo</button>
      <input aria-label="color-picker" type="color" value={state.current} onChange={({ target }) => dispatch({ type: 'record', payload: target.value })} />
      <div aria-label="display" style={{ backgroundColor: state.current, width: '10rem', height: '10rem' }}></div>
    </>
  );
}

export default App;
