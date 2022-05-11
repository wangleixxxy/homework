/**
 * useState
 */

let memoizedState = [];
let index = -1;
const useState = (initialState) => {
  if (typeof initialState === 'function') {
    initialState = initialState();
  }
  index++;
  let currentIndex = index;
  memoizedState[currentIndex] = memoizedState[currentIndex] || initialState;
  const setState = (newState) => {
    memoizedState[currentIndex] = newState;
    // 重新渲染
    // render()
  };
  return [memoizedState[currentIndex], setState];
};
