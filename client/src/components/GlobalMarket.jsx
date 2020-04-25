import React from 'react';

import GlobalMarketEntry from './GlobalMarketEntry';

const GlobalMarket = () => {
  const renderEntries = () => {
    let entries = [];
    for (let i = 0; i < 10; i++) {
      entries.push(<GlobalMarketEntry key={i} />);
    }
    return entries;
  };

  return (
    <div>
      <h1>Global Market</h1>
      {renderEntries()}
    </div>
  );
};

export default GlobalMarket;
