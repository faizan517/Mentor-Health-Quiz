import React, { useEffect, useState } from 'react'
import { CButton, CCol, CContainer, CRow } from '@coreui/react'

import axios from 'axios'
import { toast } from 'react-toastify'
// import 'react-tabs-scrollable/dist/rts.css'
import { useNavigate, useParams } from 'react-router-dom'
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
  const { slug } = useParams()
  const { isActive, styling, isReport, scroll } = props
  const [responses, setResponses] = useState({}) // To store form responses
  const [totalMarks, setTotalMarks] = useState(null) // To store calculated marks
  const [currentTab, setCurrentTab] = useState(0) // Track current tab
  const [isSubmitted, setIsSubmitted] = useState(false) // Form submission state
  const [personalInfo, setPersonalInfo] = useState({}) // To store personal info
  const [personalInfoSubmitted, setPersonalInfoSubmitted] = useState(false) // To track if personal info is submitted
  const [errors, setErrors] = useState({}) // Store validation errors
const API_BASE_URL = 'http://localhost:5000/api'
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isMobile = window.innerWidth <= 767 // Mobile screen check

  // Function to handle personal info input change in the Info component
  const handleFetchError = (error) => {
    const message = error.response
      ? error.response.data.message
      : error.request
        ? 'No response received from server.'
        : 'Error: ' + error.message
    toast.error(message)
  }

  const handlePersonalInfoChange = (field, value) => {
    console.log('Change', field, value)
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleInputChange = (field, value) => {
    console.log('Change', field, value)
    setResponses((prev) => ({ ...prev, [field]: value }))
  }

  const validateTab = () => {
    const currentSection = formStructure[currentTab]
    let valid = true
    let errorMessages = {}

    if (currentTab === 0) {
      if (!personalInfo.name) {
        valid = false
        errorMessages.name = 'Name is required.'
      }
      if (!personalInfo.email) {
        valid = false
        errorMessages.email = 'Email is required.'
      }
    } else {
      currentSection.questions.forEach((question) => {
        if (question.required && !responses[question.id]) {
          valid = false
          errorMessages[question.id] = `${question.questionText} is required.`
        }
      })
    }

    setErrors(errorMessages)
    return valid
  }

  const handlePersonalInfoSubmit = async () => {
    // try {
    //   await axios.post(`${API_BASE_URL}/personal-info`, personalInfo)
    //   toast.success('Personal info submitted successfully!')
    //   setPersonalInfoSubmitted(true)
    // } catch (error) {
    //   toast.error('Failed to submit personal info')
    // }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    setIsSubmitting(true)

    if (!validateTab()) {
      setIsSubmitting(false)
      return
    }

    let marks = 0
    formStructure.forEach((section) => {
      section.questions.forEach((question) => {
        const response = responses[question.questionText]
        if (question.questionType === 'mcq' && response) {
          marks += response
        } else if (question.questionType === 'multicheck' && response) {
          marks += response.reduce((sum, mark) => sum + mark, 0)
        } else if (question.questionType === 'text' && response) {
          marks += question.marks
        }
      })
    })

    const health_assessment = {
      ...responses,
      marks,
    }

    try {
      await axios.post(`${API_BASE_URL}/assessment/submitAssessment/${slug}`, {
        employee_info: JSON.stringify(personalInfo),
        health_assessment: JSON.stringify(health_assessment),
      })
      toast.success('Form submitted successfully!')
    } catch (error) {
      toast.error('Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTabClick = async (index) => {
    if (currentTab === 0 && !personalInfoSubmitted) {
      await handlePersonalInfoSubmit()
    }
    setCurrentTab(index)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }


  // function handleClick() {
  //   Navigate('/')
  // }
  
  useEffect(() => {
    console.log(personalInfo)
    console.log(responses)
  }, [personalInfo, responses])

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
            // onClick={handleClick}
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
            // width: isMobile ? '90vw' : '',
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

// import Info from '../Info' // Personal info component
// import TabsComponent from '../Tabs'
// import formStructure from './formStructure'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { Fonts } from '../../utils/Fonts'
// import Color from '../../utils/Color'
// import Images from '../../utils/Images'
// import { CButton, CContainer, CRow, CCol } from '@coreui/react'
// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// Define your API base URL
// const API_BASE_URL = 'http://localhost:5000/api'

// const DynamicForm = (props) => {
//   const { styling, isReport } = props
//   const { slug } = useParams()

  // const [formStructure, setFormStructure] = useState([])
  // const [responses, setResponses] = useState({})
  // const [currentTab, setCurrentTab] = useState(0)
  // const [isSubmitted, setIsSubmitted] = useState(false)
  // const [personalInfo, setPersonalInfo] = useState({})
  // const [questionText, setQuestionText] = useState({})

  // const [personalInfoSubmitted, setPersonalInfoSubmitted] = useState(false)
  // const [errors, setErrors] = useState({})
  // const [isSubmitting, setIsSubmitting] = useState(false)

  const isMobile = window.innerWidth <= 767

  // Fetch form data based on company slug
  // useEffect(() => {
  //   const fetchFormData = async () => {
  //     try {
  //       const slug = window.location.pathname.split('/').pop()
  //       const response = await axios.get(`${API_BASE_URL}/formdata/url/${slug}`)
  //       setFormStructure(response.data)
  //     } catch (error) {
  //       handleFetchError(error)
  //     }
  //   }
  //   fetchFormData()
  // }, [])

//   const handleFetchError = (error) => {
//     const message = error.response
//       ? error.response.data.message
//       : error.request
//         ? 'No response received from server.'
//         : 'Error: ' + error.message
//     toast.error(message)
//   }

//   const handlePersonalInfoChange = (field, value) => {
//     console.log('Change', field, value)
//     setPersonalInfo((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleInputChange = (field, value) => {
//     console.log('Change', field, value)
//     setResponses((prev) => ({ ...prev, [field]: value }))
//   }

//   const validateTab = () => {
//     const currentSection = formStructure[currentTab]
//     let valid = true
//     let errorMessages = {}

//     if (currentTab === 0) {
//       if (!personalInfo.name) {
//         valid = false
//         errorMessages.name = 'Name is required.'
//       }
//       if (!personalInfo.email) {
//         valid = false
//         errorMessages.email = 'Email is required.'
//       }
//     } else {
//       currentSection.questions.forEach((question) => {
//         if (question.required && !responses[question.id]) {
//           valid = false
//           errorMessages[question.id] = `${question.questionText} is required.`
//         }
//       })
//     }

//     setErrors(errorMessages)
//     return valid
//   }

//   const handlePersonalInfoSubmit = async () => {
//     // try {
//     //   await axios.post(`${API_BASE_URL}/personal-info`, personalInfo)
//     //   toast.success('Personal info submitted successfully!')
//     //   setPersonalInfoSubmitted(true)
//     // } catch (error) {
//     //   toast.error('Failed to submit personal info')
//     // }
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     setIsSubmitted(true)
//     setIsSubmitting(true)

//     if (!validateTab()) {
//       setIsSubmitting(false)
//       return
//     }

//     let marks = 0
//     formStructure.forEach((section) => {
//       section.questions.forEach((question) => {
//         const response = responses[question.questionText]
//         if (question.questionType === 'mcq' && response) {
//           marks += response
//         } else if (question.questionType === 'multicheck' && response) {
//           marks += response.reduce((sum, mark) => sum + mark, 0)
//         } else if (question.questionType === 'text' && response) {
//           marks += question.marks
//         }
//       })
//     })

//     const health_assessment = {
//       ...responses,
//       marks,
//     }

//     try {
//       await axios.post(`${API_BASE_URL}/assessment/submitAssessment/${slug}`, {
//         employee_info: JSON.stringify(personalInfo),
//         health_assessment: JSON.stringify(health_assessment),
//       })
//       toast.success('Form submitted successfully!')
//     } catch (error) {
//       toast.error('Failed to submit form')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleTabClick = async (index) => {
//     if (currentTab === 0 && !personalInfoSubmitted) {
//       await handlePersonalInfoSubmit()
//     }
//     setCurrentTab(index)
//     window.scrollTo({ top: 400, behavior: 'smooth' })
//   }

//   useEffect(() => {
//     console.log(personalInfo)
//     console.log(responses)
//   }, [personalInfo, responses])

//   return (
//     <CContainer
//       style={{
//         width: isMobile ? '90vw' : '',
//         boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.05)',
//         borderRadius: 10,
//         textAlign: 'left',
//         marginTop: 40,
//         ...styling,
//       }}
//     >
//       {!isSubmitted ? (
//         <form onSubmit={handleSubmit}>
//           <TabsComponent
//             currentTab={currentTab}
//             formStructure={formStructure}
//             handleTabClick={handleTabClick}
//             isMobile={isMobile}
//           />
//           {formStructure.length > 0 && formStructure[currentTab] && (
//             <div>
//               {currentTab === 0 && <Info onInputChange={handlePersonalInfoChange} />}
//               {formStructure[currentTab].questions.map((question) => (
//                 <div key={question.id} style={{ paddingLeft: 50, marginTop: 10 }}>
//                   <p style={{ fontWeight: 500, fontSize: 14 }}>{question.questionText}</p>
//                   {/* Render input based on question type */}
//                   {question.questionType === 'mcq' && (
//                     <CCol style={{ display: isMobile ? 'flex' : '', flexDirection: 'column' }}>
//                       {question.options.map((option, index) => (
//                         <label key={index}>
//                           <input
//                             style={{ marginRight: 10 }}
//                             type="radio"
//                             name={`question-${question.id}`}
//                             value={option.answer}
//                             onChange={() => handleInputChange(question.questionText, option.marks)}
//                           />
//                           {option.answer}
//                         </label>
//                       ))}
//                     </CCol>
//                   )}

//                   {question.questionType === 'text' && (
//                     <textarea
//                       style={{ width: isMobile ? '200px' : '632px' }}
//                       name={`question-${question.id}`}
//                       onChange={(e) => handleInputChange(question.id, e.target.value)}
//                     />
//                   )}

//                   {question.questionType === 'multicheck' && (
//                     <CCol
//                       style={{
//                         marginTop: 10,
//                         display: isMobile ? 'flex' : '',
//                         flexDirection: 'column',
//                       }}
//                     >
//                       {question.options.map((option, index) => (
//                         <label key={index}>
//                           <input
//                             style={{ marginRight: 10 }}
//                             type="checkbox"
//                             name={`question-${question.id}`}
//                             value={option.answer}
//                             onChange={(e) => {
//                               const currentMarks = responses[question.id] || []
//                               handleInputChange(
//                                 question.questionText,
//                                 e.target.checked
//                                   ? [...currentMarks, option.marks]
//                                   : currentMarks.filter((mark) => mark !== option.marks),
//                               )
//                             }}
//                           />
//                           {option.answer}
//                         </label>
//                       ))}
//                     </CCol>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="d-flex justify-content-end">
//             {currentTab === formStructure.length - 1 ? (
//               isReport ? (
//                 <CButton
//                   style={{ backgroundColor: '#0048ff', color: 'white' }}
//                   className="mb-3 mt-3"
//                 >
//                   PDF
//                 </CButton>
//               ) : (
//                 <CButton
//                   style={{ backgroundColor: '#0048ff', color: 'white' }}
//                   type="submit"
//                   className="mb-3 mt-3"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Submit'}
//                 </CButton>
//               )
//             ) : (
//               <CButton
//                 style={{ backgroundColor: '#0048ff', color: 'white' }}
//                 type="button"
//                 onClick={() => handleTabClick(currentTab + 1)}
//                 className="mb-3 mt-3"
//               >
//                 Next
//               </CButton>
//             )}
//           </div>
//         </form>
//       ) : (
//         <CContainer>
//           <img src={Images.smile} alt="Smiley Face" />
//           <span>Thank you!</span>
//           <span>You will receive your assessment form report via email.</span>
//         </CContainer>
//       )}
//     </CContainer>
//   )
// }

// export default DynamicForm