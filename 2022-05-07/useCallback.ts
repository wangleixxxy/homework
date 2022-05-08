/**
 * 实现React useCallback原理
 */
let memorizedState = null;

function useCallback(callback, deps) {
  if (memorizedState) {
    let [lastCallback, lastDeps] = memorizedState;
    // 依赖是否改变
    let changed = !deps.every((dep, index) => {
      return dep === lastDeps[index];
    });
    if (changed) {
      memorizedState = [callback, deps];
      return callback;
    } else {
      return lastCallback;
    }
  } else {
    memorizedState = [callback, deps];
    return callback;
  }
}

// function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
//   const hook = mountWorkInProgressHook();

//   const nextDeps = deps === undefined ? null : deps;
//   hook.memoizedState = [callback, nextDeps];
//   return callback;
// }

// function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
//   const hook = updateWorkInProgressHook();
//   const nextDeps = deps === undefined ? null : deps;
//   const prevState = hook.memoizedState;
//   if (prevState !== null) {
//     if (nextDeps !== null) {
//       const prevDeps: Array<mixed> | null = prevState[1];
//       if (areHookInputsEqual(nextDeps, prevDeps)) {
//         return prevState[0];
//       }
//     }
//   }
//   hook.memoizedState = [callback, nextDeps];
//   return callback;
// }

// function areHookInputsEqual(
//   nextDeps: Array<mixed>,
//   prevDeps: Array<mixed> | null
// ) {
//   if (prevDeps === null) {
//     return false;
//   }

//   for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
//     if (is(nextDeps[i], prevDeps[i])) {
//       continue;
//     }
//     return false;
//   }
//   return true;
// }

// function is(x: any, y: any) {
//   return (
//     (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
//   );
// }
