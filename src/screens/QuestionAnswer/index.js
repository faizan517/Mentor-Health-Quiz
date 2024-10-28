import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://your-backend-url.com'; // Update this with your backend URL

const DynamicForm = () => {
  const [formStructure, setFormStructure] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch form structure from the backend
    const fetchFormStructure = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/form-structure`);
        setFormStructure(response.data);
      } catch (error) {
        toast.error('Failed to load form structure');
      }
    };

    fetchFormStructure();
  }, []);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const validateTab = () => {
    const { name, email, phone } = personalInfo;
    if (!name || !email || !phone) {
      toast.error('Please fill out all personal information fields');
      return false;
    }

    for (const section of formStructure) {
      for (const question of section.questions) {
        const response = responses[question.id];
        if (!response && question.required) {
          toast.error(`Please answer all required questions in ${section.title}`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsSubmitting(true);

    // Validate the entire form (personal info + form responses)
    if (!validateTab()) {
      setIsSubmitting(false);
      return;
    }

    // Calculate total marks
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

    // Combine personal info and responses into a single request body
    const requestBody = {
      personalInfo, // The personal info object
      responses, // The form responses
      totalMarks: marks, // Total calculated marks
    };

    try {
      // Send all data in a single API call
      await axios.post(`${API_BASE_URL}/submit-form`, requestBody);
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Dynamic Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Personal Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={personalInfo.name}
            onChange={handlePersonalInfoChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={personalInfo.email}
            onChange={handlePersonalInfoChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={personalInfo.phone}
            onChange={handlePersonalInfoChange}
            required
          />
        </div>

        {formStructure.map((section) => (
          <div key={section.id}>
            <h3>{section.title}</h3>
            {section.questions.map((question) => (
              <div key={question.id}>
                <label>{question.label}</label>
                {question.questionType === 'text' && (
                  <input
                    type="text"
                    placeholder="Your answer"
                    value={responses[question.id] || ''}
                    onChange={(e) =>
                      handleResponseChange(question.id, e.target.value)
                    }
                    required={question.required}
                  />
                )}
                {question.questionType === 'mcq' && (
                  <select
                    value={responses[question.id] || ''}
                    onChange={(e) =>
                      handleResponseChange(question.id, Number(e.target.value))
                    }
                    required={question.required}
                  >
                    <option value="">Select an option</option>
                    {question.options.map((option, index) => (
                      <option key={index} value={option.marks}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                )}
                {question.questionType === 'multicheck' && (
                  <div>
                    {question.options.map((option, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          value={option.marks}
                          onChange={(e) => {
                            const selectedMarks = responses[question.id] || [];
                            if (e.target.checked) {
                              handleResponseChange(question.id, [
                                ...selectedMarks,
                                Number(e.target.value),
                              ]);
                            } else {
                              handleResponseChange(
                                question.id,
                                selectedMarks.filter(
                                  (mark) => mark !== Number(e.target.value)
                                )
                              );
                            }
                          }}
                        />
                        {option.text}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
