import React, { useState, useEffect } from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import CustomToolbar from './CustomToolbar';
import GraphiQLExplorer from 'graphiql-explorer';
import { graphQLFetcher } from '../utils/fetcher';
import { getIntrospectionQuery, buildClientSchema } from 'graphql';

function GraphiQLWrapper() {
  const [schema, setSchema] = useState(null);
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('{}'); // State for variables
  const [explorerIsOpen, setExplorerIsOpen] = useState(true);

  useEffect(() => {
    async function fetchSchema() {
      const response = await graphQLFetcher({ query: getIntrospectionQuery() });
      const schema = buildClientSchema(response.data);
      setSchema(schema);
    }
    fetchSchema();
  }, []);

  const handleEditQuery = (query) => {
    setQuery(query);
  };

  const handleEditVariables = (event) => {
    setVariables(event.target.value);
  };

  const handleExplorerEdit = (queryString) => {
    setQuery(queryString);
  };

  return (
    <div className="graphiql-container" style={{ display: 'flex', height: '100vh' }}>
      {schema && (
        <GraphiQLExplorer
          schema={schema}
          query={query}
          onEdit={handleExplorerEdit}
          explorerIsOpen={explorerIsOpen}
          onToggleExplorer={() => setExplorerIsOpen(!explorerIsOpen)}
        />
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GraphiQL
          fetcher={graphQLFetcher}
          schema={schema}
          query={query}
          onEditQuery={handleEditQuery}
          variables={variables}
          toolbar={<CustomToolbar/>
          }
        />
        <textarea
          style={{ flex: '0 0 200px', marginTop: '10px', padding: '10px' }}
          placeholder="Enter query variables as JSON"
          value={variables}
          onChange={handleEditVariables}
        />
      </div>
    </div>
  );
}

export default GraphiQLWrapper;
