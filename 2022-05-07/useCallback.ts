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

/*
let hooksList = [];
let hooksIndex = 0;
function useCallback(fn,deps){
    if(!deps) return fn;
    if(hooksList.length>0){
        let last = hooksList[hooksIndex-1];
        let same = last[1].every((item,index)=>item === deps[index]);
        if(same){
            return last[0];
        }else{
            hooksList[hooksIndex++] = [fn,deps];
            return fn
        }
    }else{
        hooksList[hooksIndex++] = [fn,deps];
        return fn
    }
}
*/
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
