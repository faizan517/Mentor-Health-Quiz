// TabsComponent.js
import React, { useRef } from 'react'
import { CRow, CCol } from '@coreui/react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { Fonts } from '../../Utils/Fonts'


const styles = {
  heading: {
    padding: 10,
    ...Fonts.Inter,
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 20,
  },
  answerFont: {
    padding: 10,
    ...Fonts.Inter,
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 20,
  },
  
  answerText: {
    padding: 10,
    ...Fonts.Inter,
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 20,
    maxWidth: '600px',
    width: '632px',
    borderRadius: 5,
  },
  answerCheck: {
    padding: 10,
    ...Fonts.Inter,
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 20,
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    borderTop: '2px solid #ddd',
    paddingTop: 30,
  },
  mainHead: {
    ...Fonts.Inter,
    fontWeight: 700,
    fontSize: '35px',
    textAlign: 'justify',
    lineHeight: 1.3,
  },
  tabHead: {
    ...Fonts.Inter,
    fontWeight: 400,
    fontSize: '20px',
    textAlign: 'justify',
  },
  tabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the content
    position: 'relative',
    marginTop: '30px',
    borderTop: '2px solid #ddd',
    paddingTop: 30,
    gap: '10px', // Add spacing between arrows and tabs
  },
  arrowButton: {
    cursor: 'pointer',
    padding: '10px',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center arrow icon
  },
  tabsContainer: {
    display: 'flex',
    overflowX: 'hidden', // Will change to 'scroll' for mobile
    scrollBehavior: 'smooth',
    width: '80vw', // Adjust for mobile in component
  },
  tab: {
    flexShrink: 0,
    width: '30vw', // Dynamic width based on screen size
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: '10px', // Ensure there's padding inside the tab
  },
  activeTab: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  container: {
          height: '90vh', // Full screen height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '4px 4px 15px 15px rgba(0, 0, 0, 0.05)',
      borderWidth: 0,
      borderRadius: 10,
        },
        image: {
          width: '80px', // Width of the smiley face
          height: '80px', // Height of the smiley face
          marginBottom: '20px',
        },
        text: {
          fontSize: '24px',
          ...Fonts.Inter,
          fontWeight:400,
        },
        imgHeading:{
          ...Fonts.Inter,
          fontWeight:700,
          fontSize:64
        },
}


const TabsComponent = ({ currentTab, formStructure, handleTabClick, isMobile }) => {
  const tabsContainerRef = useRef(null)

  const scrollLeft = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  return (
    <CRow style={{ ...styles.tabsWrapper }}>
      {/* Left Arrow */}
      <CCol
        style={{ 
          ...styles.arrowButton, 
          display: isMobile || formStructure.length <= 3 ? 'none' : '' 
        }} 
        onClick={scrollLeft}
      >
        <MdKeyboardDoubleArrowLeft size={20} />
      </CCol>

      {/* Tabs Container */}
      <div
        style={{
          ...styles.tabsContainer,
          overflowX: isMobile ? 'scroll' : 'hidden',
          width: isMobile ? '90vw' : '75vw',
        }}
        ref={tabsContainerRef}
      >
        {formStructure.map((tab, index) => (
          <div
            key={index}
            style={{
              ...styles.tab,
              ...(currentTab === index ? styles.activeTab : {}),
              width: isMobile ? '25vw' : '15vw',
            }}
            onClick={() => handleTabClick(index)}
          >
            <span style={{ fontSize: isMobile ? 14 : 20 }}>{tab.subheading}</span>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <CCol
        style={{
          ...styles.arrowButton,
          display: isMobile || formStructure.length <= 3 ? 'none' : ''
        }}
        onClick={scrollRight}
      >
        <MdKeyboardDoubleArrowRight size={20} />
      </CCol>
    </CRow>
  )
}

export default TabsComponent
