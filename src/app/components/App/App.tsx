import * as React from 'react';
import { Tabs } from '@pexels/figma';
import { Pages } from '../../../constants';
import { SearchPage } from '../SearchPage';
import { HistoryPage } from '../HistoryPage';

export const App: React.FC = ({  }) => {
  const [selectedTab, setSelectedTab] = React.useState(Pages.SEARCH);

  const onSelect = React.useCallback((t: Pages) => {
    setSelectedTab(t);
  }, [selectedTab]);

  return (
    <>
      <Tabs selectedTab={selectedTab} onSelect={onSelect}>
        <Tabs.Tab
          id={Pages.SEARCH}
          title="Search"
        />
        <Tabs.Tab
          id={Pages.HISTORY}
          title="History"
        />
      </Tabs>
      {(selectedTab === Pages.SEARCH) && (
        <SearchPage />
      )}
      {(selectedTab === Pages.HISTORY) && (
        <HistoryPage />
      )}
    </>
  );
};
