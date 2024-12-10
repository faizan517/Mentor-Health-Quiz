import React, { useState } from "react";
import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Info from "../../components/Info";
import TabsComponent from "../../components/Tabs";
import formStructure from "../../components/Form";
import { Fonts } from "../../Utils/Fonts";
import Images from "../../Utils/Images";
const styles = {
  formContainer: { textAlign: "center" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    borderRadius: "10px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  text: {
    fontSize: "16px",
    ...Fonts.Inter,
    fontWeight: 400,
    textAlign: "justify",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    textAlign: "center",
  },
  button: { backgroundColor: "#0048ff", color: "white" },
  formContent: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    marginTop:20
  },
};

const Quiz = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // State variables
  const [responses, setResponses] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_BASE_URL = "http://localhost:5000/api";
  const [assessmentId, setAssessmentId] = useState(null); // Track assessment ID
  const isMobile = window.innerWidth <= 767;

  // Handle Navigation for Next and Previous Tabs
  const handleNavigation = (direction) => {
    if (!validateFields()) return;
    if (direction === "next") {
      if (currentTab < formStructure.length - 1) {
        setCurrentTab((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    } else {
      if (currentTab > 0) {
        setCurrentTab((prev) => prev - 1);
      }
    }
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Update personal info
  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Update question responses
  const handleInputChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  // Validate fields for current tab
  const validateFields = () => {
    const currentSection = formStructure[currentTab];
    const newErrors = {};

    if (currentTab === 0) {
      if (!personalInfo.firstName) newErrors.firstName = "Name is required.";
      if (!personalInfo.email) newErrors.email = "Email is required.";
    } else {
      currentSection.questions.forEach((q) => {
        if (q.isRequired && !responses[q.id]) {
          newErrors[q.id] = `${q.questionText} is required.`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Process data for backend submission (include subHeading)
  const processAssessmentData = () => {
    let totalScore = 0;
    let maxScore = 0;

    const sections = formStructure.map((section) => {
      let sectionScore = 0;

      const questions = section.questions.map((q) => {
        const response = responses[q.id];
        let questionScore = calculateQuestionScore(q, response);

        sectionScore += questionScore;
        maxScore += q.score || 0;

        return {
          questionId: q.id,
          questionText: q.questionText,
          response: response || null,
          score: questionScore,
        };
      });

      totalScore += sectionScore;

      return {
        subHeading: section.subheading, // Include subHeading in the section
        questions,
        sectionScore,
      };
    });

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    return { sections, totalScore, maxScore, percentage };
  };

  // Calculate score for a given question
  const calculateQuestionScore = (q, response) => {
    let questionScore = 0;

    if (q.options) {
      if (Array.isArray(response)) {
        questionScore = response.reduce((acc, ans) => {
          const optionScore = q.options.find((o) => o.answer === ans)?.score || 0;
          return acc + optionScore;
        }, 0);
      } else {
        questionScore = q.options.find((o) => o.answer === response)?.score || 0;
      }
    }

    return questionScore;
  };

  // Submit form with processed data (include subHeading in payload)
  const handleSubmit = async () => {
    if (!validateFields()) return;

    setIsSubmitting(true);
    try {
      const { sections, totalScore, maxScore, percentage } = processAssessmentData();

      const payload = {
        employee_info: JSON.stringify(personalInfo),
        health_assessment: JSON.stringify(sections), // sections include subHeading
        totalScore,
        maxScore,
        percentage,
      };

      const response = await axios.post(`${API_BASE_URL}/assessment/submitAssessment/${slug}`, payload, {
        params: { assessment_id: 6 },
      });

      if (response.data) {
        const id = response.data.assessment_id;
        setAssessmentId(id);
        navigate(`/response/${id}/${slug}`, { state: { assessmentId: id } });
      } else {
        toast.error(response.data.message || "Submission failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render questions for the current section
  const renderQuestions = (questions) => 
    questions.map((q) => (
      <div key={q.id}  style={{ margin: "20px", ...styles.text }}>
        <p>{q.questionText}</p>
        {renderInputField(q)}
        {errors[q.id] && <p style={{ color: "red",fontSize:14 }}>{errors[q.id]}</p>}
      </div>
    ));

  // Render the appropriate input field for each question type
  const renderInputField = (q) => {
    switch (q.questionType) {
      case "mcq":
        return q.options.map((o, idx) => (
          <label key={idx} style={{ ...styles.answerFont, margin: 5 }}>
            <input
              type="radio"
              name={`q-${q.id}`}
              value={o.answer}
              checked={responses[q.id] === o.answer}
              onChange={() => handleInputChange(q.id, o.answer)}
              style={{ marginRight: 10 }}
            />
            {o.answer}
          </label>
        ));
      case "text":
        return <textarea 
        style={{
          ...styles.answerText,
          width: isMobile ? "200px" : "632px",
        }} value={responses[q.id] || ""} onChange={(e) => handleInputChange(q.id, e.target.value)} />;
      case "multicheck":
        return q.options.map((o, idx) => (
          <label key={idx} style={{ margin: "10px", ...styles.text }}>
            <input
              type="checkbox"
              value={o.answer}
              checked={responses[q.id]?.includes(o.answer)}
              onChange={(e) => handleCheckboxChange(q.id, e, o.answer)}
              style={{ marginRight: 10 }}
            />
            {o.answer}
          </label>
        ));
      default:
        return null;
    }
  };

  // Handle checkbox input change
  const handleCheckboxChange = (questionId, e, answer) => {
    const selected = responses[questionId] || [];
    const newResponses = e.target.checked
      ? [...selected, answer]
      : selected.filter((item) => item !== answer);
    handleInputChange(questionId, newResponses);
  };

  return (
    <CContainer>
        <CRow
    lg={12}
    md={6}
    sm={3}
    style={{ ...styles.header, flexDirection: "row-reverse" }}
  >
    <CCol sm={6} md={6} lg={6}>
      <img alt="null" src={Images.head} style={{ width: "100%", height: "auto" }} />
    </CCol>
    <CCol
      sm={3}
      md={4}
      lg={3}
      style={{
        ...styles.logo,
        justifyContent: "center",
        marginTop: isMobile ? 20 : 0,
      }}
    >
      <img
      alt="logo"
        src={Images.logoBig}
        style={{
          width: isMobile ? "50%" : "100%",
          height: "auto",
          maxWidth: "400px",
        }}
      />
    </CCol>
  </CRow>
      <CCol style={styles.container}>
        <p style={styles.text}>
          Mentor Health is your dedicated health partner. Your well-being is our
          priority. Please take just 5 minutes out of your day to fill out this
          form. This personalized health journey is designed to evaluate your
          risks, understand your health needs, and maximize health benefits.
          Through this collaboration, we'll develop strategies to reduce your
          health costs and promote healthy living through preventive care.
          Together, we can ensure you lead a healthier, happier life.
        </p>
      </CCol>
      <TabsComponent
        currentTab={currentTab}
        formStructure={formStructure}
        handleTabClick={setCurrentTab}
        isMobile={isMobile}
      />
      <CContainer style={styles.formContent}>
        {currentTab === 0 ? (
          <Info onInputChange={handlePersonalInfoChange} personalInfo={personalInfo} />
        ) : (
          <>
            {renderQuestions(formStructure[currentTab]?.questions || [])}
          </>
        )}
        <CRow style={{display:'flex',justifyContent:'space-between'}}>
          <CCol sm={2} md={9}lg={10}>
            {currentTab > 0 && (
              <CButton   style={styles.button} onClick={() => handleNavigation("previous")} disabled={isSubmitting}>
                Previous
              </CButton>
            )}
          </CCol>
          <CCol sm={5} md={3} lg={2}>
            <CButton   style={styles.button} onClick={() => handleNavigation("next")} disabled={isSubmitting}>
              {currentTab === formStructure.length - 1 ? "Submit" : "Next"}
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </CContainer>
  );
};

export default Quiz;
