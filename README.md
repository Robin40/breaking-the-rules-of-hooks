# breaking-the-rules-of-hooks
without really breaking them

### Wait, what?

This app consists of a list of counters,
where you can add, remove and increment any counter.

That is easy to do in React,
until you want your counters
(or whatever state in your app)
to be implemented using hooks.

```typescript jsx
export type Counter = {
  value: number;
  increment(): void;
};

export function useCounter(): Counter {
  const [value, setValue] = useState(0);
  
  function increment(): void {
    setValue(x => x + 1);
  }
  
  return { value, increment };
}
```

Then you have the following problem

```typescript jsx
function App() {
  const [counters, setCounters] = useState<Counter[]>([]);
  
  function addCounter(): void {
    // you can't do this as it breaks the rules of hooks!
    setCounters(prev => [...prev, useCounter()])    
  }

  ...
  
  return (
    <div>
      {counters.map(...)}
      <button onClick={addCounter}/>
    </div>
  )
}
```

This repo solves this problem while still using hooks,
and without ignoring the rules-of-hooks linter.

- Install packages using `yarn`
- Run with `yarn start`
- See that it actually works
- Explore the code to see how it is done