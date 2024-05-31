import React from 'react';
import { GraphiQL } from 'graphiql';

function CustomToolbar() {
  return (
    <GraphiQL.Toolbar>
      <GraphiQL.Button
        onClick={() => console.log('Custom action')}
        label="Custom Button"
        title="Click to perform a custom action"
      />
    </GraphiQL.Toolbar>
  );
}

export default CustomToolbar;
