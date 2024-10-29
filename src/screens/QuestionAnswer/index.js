import React, { useState } from 'react'
import { CButton, CCol, CContainer, CRow } from '@coreui/react'

import axios from 'axios'
import { toast } from 'react-toastify'
// import 'react-tabs-scrollable/dist/rts.css'
import { useNavigate } from 'react-router-dom'
import Info from '../../components/Info'
import TabsComponent from '../../components/Tabs'
import { Fonts } from '../../Utils/Fonts'
import Images from '../../Utils/Images'
import formStructure from '../../components/Form'

const styles = {
  formContainer: {
    textAlign: 'center',
    // width:'80vw',
    // display:'flex',
    // flexDirection:'column',
    // justifyContent:'center',
    // alignSelf:'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
    borderRadius: '10px',
    position: 'relative',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  mentor: {
    color: '#006eff',
    backgroundColor: 'white',
    padding: '0 10px',
    borderRadius: '5px',
  },
  health: {
    color: 'black',
  },
  headContainor: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    borderTop: '2px solid #ddd',
    paddingTop: 30,
  },
  tab: {
    padding: '5px',
    width: '50vw',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    color: '#333',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: '#006eff',
    color: 'white',
    // fontFamily: 'Inter',
    fontWeight: 700,
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '4px 4px 15px 15px rgba(0, 0, 0, 0.05)',
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 50,
    padding:20
  },
  image: {
    width: '80px', // Width of the smiley face
    height: '80px', // Height of the smiley face
    marginBottom: '20px',
  },
  text: {
    fontSize: '24px',
    ...Fonts.Inter,
    fontWeight: 400,
  },
  imgHeading: {
    ...Fonts.Inter,
    fontWeight: 700,
    fontSize: 64,
  },
}
const Quiz = (props) => {
  const { isActive, styling, isReport, scroll } = props
  const [responses, setResponses] = useState({}) // To store form responses
  const [totalMarks, setTotalMarks] = useState(null) // To store calculated marks
  const [currentTab, setCurrentTab] = useState(0) // Track current tab
  const [isSubmitted, setIsSubmitted] = useState(false) // Form submission state
  const [personalInfo, setPersonalInfo] = useState({}) // To store personal info
  const [personalInfoSubmitted, setPersonalInfoSubmitted] = useState(false) // To track if personal info is submitted
  const [errors, setErrors] = useState({}) // Store validation errors

  const isMobile = window.innerWidth <= 767 // Mobile screen check

  // Function to handle personal info input change in the Info component
  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }

  // Function to handle form input change
  const handleInputChange = (field, value) => {
    setResponses((prev) => ({ ...prev, [field]: value }))
  }

  const handlePersonalInfoSubmit = async () => {
    try {
      const response = await axios.post(
        'https://your-personal-info-api-endpoint.com/api/submit',
        personalInfo,
      )
      toast.success('Login successful!')
      console.log('Personal info submitted:', response.data)
      setPersonalInfoSubmitted(true) // Mark personal info as submitted
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed, please try again')
      console.error('Error submitting personal info:', error)
    }
  }

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    let marks = 0

    // Calculate marks for form questions
    formStructure.forEach((section) => {
      section.questions.forEach((question) => {
        const response = responses[question.id]

        if (question.questionType === 'mcq' && response) {
          marks += response // MCQ marks
        } else if (question.questionType === 'multicheck' && response) {
          marks += response.reduce((sum, mark) => sum + mark, 0) // Sum multicheck marks
        } else if (question.questionType === 'text' && response) {
          marks += question.marks // Assign full marks for text response
        }
      })
    })

    setTotalMarks(marks)
    console.log('Total Marks:', marks)
    console.log('Responses:', responses)

    // API call to submit the form data
    try {
      const response = await axios.post('https://your-form-api-endpoint.com/api/submit', responses)
      toast.success('Login successful!')
      console.log('Form data submitted:', response.data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed, please try again')
      console.error('Error submitting form:', error)
    }
  }

  // Handle tab click to proceed to the next section
  const handleTabClick = async (index) => {
    // If moving from personal info (first tab) to the next, submit personal info
    if (currentTab === 0 && !personalInfoSubmitted) {
      await handlePersonalInfoSubmit()
    }
    setCurrentTab(index)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }
  const [activeTab, setActiveTab] = useState(0) // Manage active tab state
  const navigate = useNavigate()

  function handleClick() {
    navigate('/')
  }

  const onTabClick = (e, index) => {
    console.log(e)
    setActiveTab(index)
  }

  return (
    <CContainer style={styles.formContainer}>
      {/* Header Section */}
      <CRow
        lg={12}
        md={6}
        sm={3}
        style={{ ...styles.header, display: 'flex', flexDirection: 'row-reverse' }}
      >
        <CCol sm={6} md={6} lg={6} style={styles.headContainor}>
          <img src={Images.head} style={{ width: '100%', height: 'auto' }} />
        </CCol>
        <CCol
          sm={3}
          md={4}
          lg={3}
          style={{
            ...styles.logo,
            display: 'flex',
            justifyContent: 'center',
            marginTop: isMobile ? 20 : 0,
          }}
        >
          <img
            src={Images.logoBig}
            style={{ width: isMobile ? '50%' : '100%', height: 'auto', maxWidth: '400px' }}
            onClick={handleClick}
          />
        </CCol>
      </CRow>
      {!isSubmitted && (
        <CCol
          style={{
            textAlign: 'justify',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}
        >
          <text
            style={{
              textAlign: 'justify',
              ...Fonts.Inter,
              fontWeight: 400,
              fontSize: '16px',
            }}
          >
            Mentor Health is your dedicated health partner. Your well-being is our priority. Please
            take just 5 minutes out of your day to fill out this form. This personalized health
            journey is designed to evaluate your risks, understand your health needs, and maximize
            health benefits. Through this collaboration, we'll develop strategies to reduce your
            health costs and promote healthy living through preventive care. Together, we can ensure
            you lead a healthier, happier life.
          </text>
        </CCol>
      )}
      {/* <Quiz/> */}

      {/* Tabs Navigation */}
      {!isSubmitted && (
        <TabsComponent
          currentTab={currentTab}
          formStructure={formStructure}
          handleTabClick={handleTabClick}
          isMobile={isMobile}
        />
      )}
      {/* Form Content */}
      {!isSubmitted ? (
        <CContainer
          style={{
            width: isMobile ? '90vw' : '',
            boxShadow: '4px 4px 15px 15px rgba(0, 0, 0, 0.05)',
            borderWidth: 0,
            borderRadius: 10,
            textAlign: 'left',
            marginTop: 40,
            ...styling,
          }}
        >
          <form onSubmit={handleSubmit}>
            {formStructure.slice(currentTab, currentTab + 1).map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {/* First Tab for Personal Info */}
                {currentTab === 0 && <Info onInputChange={handlePersonalInfoChange} />}
                {/* Static Heading*/}
                {currentTab && (
                  <CRow>
                    <CCol className="mb-5 mt-5">
                      <text
                        style={{
                          ...styles.answerFont,
                          fontSize: 16,
                          paddingLeft: 50,
                          marginTop: 10,
                        }}
                      >
                        Note: Please skip questions that do not apply to you.
                      </text>
                    </CCol>
                  </CRow>
                )}
                {/* Render questions for each section */}
                {section.questions.map((question) => (
                  <div key={question.id} style={{ paddingLeft: 50, marginTop: 10 }}>
                    <p style={{ fontWeight: 500, fontSize: 14 }}>{question.questionText}</p>

                    {/* Multiple Choice Questions */}
                    {question.questionType === 'mcq' && (
                      <CCol
                        style={{
                          display: isMobile ? 'flex' : '',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                        }}
                      >
                        {question.options.map((option, index) => (
                          <label key={index} style={styles.answerFont}>
                            <input
                              style={{ marginRight: 10 }}
                              type="radio"
                              name={`question-${question.id}`}
                              value={option.answer}
                              onChange={() => handleInputChange(question.id, option.marks)}
                            />
                            {option.answer}
                          </label>
                        ))}
                      </CCol>
                    )}

                    {/* Text Question */}
                    {question.questionType === 'text' && (
                      <textarea
                        style={{ ...styles.answerText, width: isMobile ? '200px' : '632px' }}
                        name={`question-${question.id}`}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                      />
                    )}

                    {/* Multi-check Question */}
                    {question.questionType === 'multicheck' && (
                      <CCol
                        style={{
                          marginTop: 10,
                          display: isMobile ? 'flex' : '',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                        }}
                      >
                        {question.options.map((option, index) => (
                          <label key={index} style={styles.answerFont}>
                            <input
                              style={{ marginRight: 10 }}
                              type="checkbox"
                              name={`question-${question.id}`}
                              value={option.answer}
                              onChange={(e) => {
                                const currentMarks = responses[question.id] || []
                                handleInputChange(
                                  question.id,
                                  e.target.checked
                                    ? [...currentMarks, option.marks]
                                    : currentMarks.filter((mark) => mark !== option.marks),
                                )
                              }}
                            />
                            {option.answer}
                          </label>
                        ))}
                      </CCol>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Submit/Next Button */}
            <div className="d-flex justify-content-end">
              {currentTab === formStructure.length - 1 ? (
                isReport ? (
                  <CButton
                    style={{ backgroundColor: '#0048ff', color: 'white' }}
                    className="mb-3 mt-3"
                  >
                    PDF
                  </CButton>
                ) : (
                  <CButton
                    style={{ backgroundColor: '#0048ff', color: 'white' }}
                    type="submit"
                    className="mb-3 mt-3"
                  >
                    Submit
                  </CButton>
                )
              ) : (
                <CButton
                  style={{ backgroundColor: '#0048ff', color: 'white' }}
                  type="button"
                  onClick={() => handleTabClick(currentTab + 1)}
                  className="mb-3 mt-3"
                >
                  Next
                </CButton>
              )}
            </div>
          </form>

          {/* Show total marks if form is submitted */}
          {/* {totalMarks !== null && (
          <div>
            <h2>Your Total Marks: {totalMarks}</h2>
          </div>
        )} */}
        </CContainer>
      ) : (
        <CContainer style={styles.container}>
          <img src={Images.smile} alt="Smiley Face" style={styles.image} />
          <span style={styles.imgHeading}>Thank you!</span>
          <span style={{ ...styles.text, marginTop: 10 }}>
            Please tick mark to accept that the summary of this data will be shared with your
            employer. This form is intended solely to measure your health risk. The results of this
            form will allow your employer to analyze your and your colleagues&#39; health needs to
            provide you with the best and most personalized health benefits.
          </span>
          <div style={{...styles.text, fontWeight:400,display:'flex',alignItems:'flex-end',justifyContent:'flex-end',height:300}}>You will get your assessment form report on your email</div>
        </CContainer>
      )}
    </CContainer>
  )
}

export default Quiz
