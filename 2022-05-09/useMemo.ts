/**
 * 实现React useMemo原理
 */
let memoizedState = null;

function useMemo(nextCreate, deps) {
  if (memoizedState) {
    let [lastValue, lastDeps] = memorizedState;
    // 依赖是否改变
    let changed = !deps.every((dep, index) => {
      return dep === lastDeps[index];
    });
    // 有改变就重新计算
    if (changed) {
      const nextValue = nextCreate();
      memoizedState = [nextValue, deps];
      return nextValue;
    } else {
      // 无改变，直接返回上次的值
      return lastValue;
    }
  } else {
    const nextDeps = deps === undefined ? null : deps;
    const nextValue = nextCreate();
    memoizedState = [nextValue, nextDeps];
    return nextValue; // 返回值
  }
}

// function mountMemo<T>(
//   nextCreate: () => T,
//   deps: Array<mixed> | void | null
// ): T {
//   const hook = mountWorkInProgressHook();
//   const nextDeps = deps === undefined ? null : deps;
//   const nextValue = nextCreate();
//   hook.memoizedState = [nextValue, nextDeps];
//   return nextValue;
// }

// function updateMemo<T>(
//   nextCreate: () => T,
//   deps: Array<mixed> | void | null
// ): T {
//   const hook = updateWorkInProgressHook();
//   const nextDeps = deps === undefined ? null : deps;
//   const prevState = hook.memoizedState;
//   if (prevState !== null) {
//     // Assume these are defined. If they're not, areHookInputsEqual will warn.
//     if (nextDeps !== null) {
//       const prevDeps: Array<mixed> | null = prevState[1];
//       if (areHookInputsEqual(nextDeps, prevDeps)) {
//         return prevState[0];
//       }
//     }
//   }
//   const nextValue = nextCreate();
//   hook.memoizedState = [nextValue, nextDeps];
//   return nextValue;
// }
