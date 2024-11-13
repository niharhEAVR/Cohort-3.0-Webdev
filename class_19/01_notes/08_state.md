That's correct! In React, any data that is expected to change and should trigger a re-render of the component needs to be stored in **state** (using `useState`). This way, React will know when the data changes and can automatically re-render the component to reflect the new data.

### Why Use State Instead of Regular Variables?

- **React Re-renders with State Changes**: If you create a variable with `useState`, any update to that variable (via the state setter function) will tell React to re-render the component, updating the UI with the latest value.
- **Normal Variables Don’t Trigger Re-renders**: Regular variables, on the other hand, are only defined when the component initially renders. If you update a regular variable, React won’t re-render the component to show that new value because it doesn’t "watch" for changes in plain variables.

### Example: Why `useState` Matters

Here’s an example to illustrate this:

```javascript
import { useState } from 'react';

function Counter() {
  let count = 0; // Regular variable
  const [stateCount, setStateCount] = useState(0); // State variable

  return (
    <div>
      <button onClick={() => {
        count += 1; 
        console.log(count); // Will log updated count, but the UI won’t show it
      }}>
        Increment (regular variable)
      </button>

      <button onClick={() => setStateCount(stateCount + 1)}>
        Increment (state)
      </button>
      
      <p>Regular Count: {count}</p>
      <p>State Count: {stateCount}</p>
    </div>
  );
}
```

- **Button 1** updates `count`, but the UI doesn’t show the new count because React doesn’t re-render when a regular variable changes.
- **Button 2** updates `stateCount` using `setStateCount`, which triggers React to re-render, and the UI will show the updated `stateCount`.

### Summary
In React, store data that impacts the UI in state variables so the component will re-render whenever that data changes. Regular variables are fine for static data that doesn’t need to update in the UI.