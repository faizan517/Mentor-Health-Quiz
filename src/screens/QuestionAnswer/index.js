import Info from '../../components/Info'; // Personal info component
import TabsComponent from '../../components/Tabs';
import formStructure from '../../components/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { Fonts } from '../../utils/Fonts';
// import Color from '../../utils/Color';
import Images from '../../Utils/Images';
import { CButton, CContainer, CRow, CCol } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { Fonts } from '../../Utils/Fonts';
// Define your API base URL
const API_BASE_URL = 'http://localhost:5000/api';

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

const DynamicForm = (props) => {
  const { styling, isReport } = props;
  const [formStructure, setFormStructure] = useState([]);
  const [responses, setResponses] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});
  const [personalInfoSubmitted, setPersonalInfoSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMobile = window.innerWidth <= 767;

  // Fetch form data based on company slug
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const slug = window.location.pathname.split('/').pop();
        const response = await axios.get(`${API_BASE_URL}/formdata/url/${slug}`);
        setFormStructure(response.data);
      } catch (error) {
        handleFetchError(error);
      }
    };
    fetchFormData();
  }, []);

  const handleFetchError = (error) => {
    const message = error.response
      ? error.response.data.message
      : error.request
      ? 'No response received from server.'
      : 'Error: ' + error.message;
    toast.error(message);
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field, value) => {
    setResponses((prev) => ({ ...prev, [field]: value }));
  };

  const validateTab = () => {
    const currentSection = formStructure[currentTab];
    let valid = true;
    let errorMessages = {};

    if (currentTab === 0) {
      if (!personalInfo.name) {
        valid = false;
        errorMessages.name = "Name is required.";
      }
      if (!personalInfo.email) {
        valid = false;
        errorMessages.email = "Email is required.";
      }
    } else {
      currentSection.questions.forEach((question) => {
        if (question.required && !responses[question.id]) {
          valid = false;
          errorMessages[question.id] = `${question.questionText} is required.`;
        }
      });
    }

    setErrors(errorMessages);
    return valid;
  };

  const handlePersonalInfoSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/personal-info`, personalInfo);
      toast.success('Personal info submitted successfully!');
      setPersonalInfoSubmitted(true);
    } catch (error) {
      toast.error('Failed to submit personal info');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsSubmitting(true);

    if (!validateTab()) {
      setIsSubmitting(false);
      return;
    }

    let marks = 0;
    formStructure.forEach((section) => {
      section.questions.forEach((question) => {
        const response = responses[question.id];
        if (question.questionType === 'mcq' && response) {
          marks += response;
        } else if (question.questionType === 'multicheck' && response) {
          marks += response.reduce((sum, mark) => sum + mark, 0);
        } else if (question.questionType === 'text' && response) {
          marks += question.marks;
        }
      });
    });

    try {
      await axios.post(`${API_BASE_URL}/submit-form`, { responses, totalMarks: marks });
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabClick = async (index) => {
    if (currentTab === 0 && !personalInfoSubmitted) {
      await handlePersonalInfoSubmit();
    }
    setCurrentTab(index);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <CContainer style={{
      width: isMobile ? '90vw' : '',
      boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.05)',
      borderRadius: 10,
      textAlign: 'left',
      marginTop: 40,
      ...styling,
    }}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <TabsComponent
            currentTab={currentTab}
            formStructure={formStructure}
            handleTabClick={handleTabClick}
            isMobile={isMobile}
          />
          {formStructure.length > 0 && formStructure[currentTab] && (
            <div>
              {currentTab === 0 && <Info onInputChange={handlePersonalInfoChange} />}
              {formStructure[currentTab].questions.map((question) => (
                <div key={question.id} style={{ paddingLeft: 50, marginTop: 10 }}>
                  <p style={{ fontWeight: 500, fontSize: 14 }}>{question.questionText}</p>
                  {/* Render input based on question type */}
                  {question.questionType === 'mcq' && (
                    <CCol style={{ display: isMobile ? 'flex' : '', flexDirection: 'column' }}>
                      {question.options.map((option, index) => (
                        <label key={index}>
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

                  {question.questionType === 'text' && (
                    <textarea
                      style={{ width: isMobile ? '200px' : '632px' }}
                      name={`question-${question.id}`}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                    />
                  )}

                  {question.questionType === 'multicheck' && (
                    <CCol style={{ marginTop: 10, display: isMobile ? 'flex' : '', flexDirection: 'column' }}>
                      {question.options.map((option, index) => (
                        <label key={index}>
                          <input
                            style={{ marginRight: 10 }}
                            type="checkbox"
                            name={`question-${question.id}`}
                            value={option.answer}
                            onChange={(e) => {
                              const currentMarks = responses[question.id] || [];
                              handleInputChange(
                                question.id,
                                e.target.checked
                                  ? [...currentMarks, option.marks]
                                  : currentMarks.filter((mark) => mark !== option.marks),
                              );
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
          )}

          <div className="d-flex justify-content-end">
            {currentTab === formStructure.length - 1 ? (
              isReport ? (
                <CButton style={{ backgroundColor: '#0048ff', color: 'white' }} className="mb-3 mt-3">
                  PDF
                </CButton>
              ) : (
                <CButton
                  style={{ backgroundColor: '#0048ff', color: 'white' }}
                  type="submit"
                  className="mb-3 mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
      ) : (
        <CContainer>
          <img src={Images.smile} alt="Smiley Face" />
          <span>Thank you!</span>
          <span>You will receive your assessment form report via email.</span>
        </CContainer>
      )}
    </CContainer>
  );
};

export default DynamicForm;