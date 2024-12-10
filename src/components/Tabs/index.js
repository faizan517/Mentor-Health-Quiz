import React, { useState, useEffect } from 'react';
import { CRow } from '@coreui/react';
import { Tabs, Tab, Box } from '@mui/material';

const styles = {
  tabsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    borderTop: '2px solid #ddd',
    paddingTop: 30,
  },
  tabsContainer: {
    width: '100%', // Ensure it uses the full available width
    overflowX: 'auto', // Enable horizontal scrolling if necessary
    paddingX: { xs: 2, sm: 3 }, // Adjust padding for mobile and desktop
    whiteSpace: 'nowrap', // Prevent wrapping of tabs
  },
  tab: {
    fontSize: { xs: 14, sm: 16, md: 20 }, // Responsive font size
    minWidth: 120, // Minimum width for the tab
    backgroundColor: '#f0f0f0',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    textTransform: 'none',
    padding: '10px',
  },
};

const TabsComponent = ({ currentTab, formStructure, handleTabClick }) => {
  const [activeTab, setActiveTab] = useState(currentTab);

  // Sync state with currentTab prop
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]); // This will re-sync when currentTab prop changes

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    handleTabClick(newValue); // Ensure this triggers the parent handler
  };

  return (
    <CRow style={styles.tabsWrapper}>
      <Box sx={styles.tabsContainer}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Tabs"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start', // Align to the left
            '& .MuiTabs-flexContainer': {
              display: 'flex',
              flexWrap: 'nowrap', // Prevent wrapping
            },
          }}
        >
          {formStructure.map((tab, index) => (
            <Tab
              key={index}
              label={tab.subheading}
              sx={{
                ...styles.tab,
                width: `${100 / formStructure.length}vw`, // Dynamic width based on the number of tabs
                backgroundColor: activeTab === index ? '#007bff' : '#f0f0f0',
                color: activeTab === index ? '#f0f0f0' : '#000',
              }}
            />
          ))}
        </Tabs>
      </Box>
    </CRow>
  );
};

export default TabsComponent;
