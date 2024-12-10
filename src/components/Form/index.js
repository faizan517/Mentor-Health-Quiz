const formStructure = [
  {
    subheading: "Personal Information", // First tab heading
    questions: [
      {
        questionType: "info",
      },
    ],
  },
  {
    sectionId: "PHH",
    subheading: "Personal Health Habits",
    questions: [
      {
        id: "PHH1",
        questionText:
          "1. How frequently do you see your physician for routine checkups and health risk prevention?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Never", score: 5 },
          { answer: "Only when needed", score: 4 },
          { answer: "Once in 3 years", score: 3 },
          { answer: "Once a Year", score: 2 },
          { answer: "Twice a Year", score: 1 },
        ],
      },
      {
        id: "PHH2",
        questionText:
          "2. How often do you engage in physical exercise? (Skip question 2 and 3 if you never)",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Daily", score: 1 },
          { answer: "3-5 times a week", score: 2 },
          { answer: "1-2 times a week", score: 3 },
          { answer: "Rarely", score: 4 },
          { answer: "Never", score: 5 },
        ],
      },
      {
        id: "PHH3",
        questionText: "3. How long is your average workout session?",
        questionType: "mcq",
        // isRequired: true,
        options: [
          { answer: "Less than 15 min", score: 5 },
          { answer: "15-30 Min", score: 4 },
          { answer: "31-45 Min", score: 3 },
          { answer: "45-60 Min", score: 2 },
          { answer: "More than 60 Min", score: 1 },
        ],
      },
      {
        id: "PHH4",
        questionText:
          "4. What is the intensity of your average workout session?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Light", score: 5 },
          { answer: "Moderate", score: 4 },
          { answer: "Vigorous", score: 3 },
          { answer: "Very Vigorous", score: 2 },
          { answer: "Extreme", score: 1 },
        ],
      },
      {
        id: "PHH5",
        questionText:
          "5. Do you smoke cigarettes, vape, or cigars? (Skip question 5 if no)",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 5 },
          { answer: "No", score: 1 },
        ],
      },
      {
        id: "PHH6",
        questionText:
          "6. How many times per day do you smoke cigarettes, vape, or cigars?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "More than 10 times", score: 5 },
          { answer: "8-10 times", score: 4 },
          { answer: "6-7 times", score: 3 },
          { answer: "3-5 times", score: 2 },
          { answer: "1-2 times", score: 1 },
        ],
      },
      {
        id: "PHH7",
        questionText:
          "7. Do you use tobacco, paan, chaliya (betel nut), or gutka? (Skip question 8 if you don't)",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 5 },
          { answer: "No", score: 1 },
        ],
      },
      {
        id: "PHH8",
        questionText:
          "8. How many times per day do you use tobacco, paan, chaliya (betel nut), or gutka?",
        questionType: "mcq",
        options: [
          { answer: "More than 10 times", score: 5 },
          { answer: "8-10 times", score: 4 },
          { answer: "6-7 times", score: 3 },
          { answer: "3-5 times", score: 2 },
          { answer: "1-2 times", score: 1 },
        ],
      },
      {
        id: "PHH9",
        questionText:
          "9. Do you consume alcohol? (Skip question 10 if you don't)",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 5 },
          { answer: "No", score: 1 },
        ],
      },
      {
        id: "PHH10",
        questionText: "10. How many pegs of alcohol do you consume per week?",
        questionType: "mcq",
        options: [
          { answer: "More than 7 pegs", score: 5 },
          { answer: "6-7 pegs", score: 4 },
          { answer: "4-5 pegs", score: 3 },
          { answer: "2-3 pegs", score: 2 },
          { answer: "1-2 pegs", score: 1 },
        ],
      },
    ],
  },
  {
    sectionId: "PMH",
    subheading: "Personal Medical History",
    questions: [
      {
        id: "PMH1",
        questionText:
          "1. In general, how would you rate your health compared to other people of your age?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Poor", score: 5 },
          { answer: "Fair", score: 4 },
          { answer: "Good", score: 3 },
          { answer: "Very Good", score: 2 },
          { answer: "Excellent", score: 1 },
        ],
      },
      {
        id: "PMH2",
        questionText:
          "2. Compared to one year ago, how would you rate your health today?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Much worse now than a year ago", score: 5 },
          { answer: "Somewhat worse now than a year ago", score: 4 },
          { answer: "About the same as a year ago", score: 3 },
          { answer: "Somewhat better now than a year ago", score: 2 },
          { answer: "Much better now than a year ago", score: 1 },
        ],
      },
      {
        id: "PMH3",
        questionText: "3. Do you have any of the following chronic diseases?",
        questionType: "multicheck",
        isRequired: true,
        options: [
          { answer: "Diabetes", score: 5 },
          { answer: "Hypertension (High BP)", score: 5 },
          { answer: "High Cholesterol", score: 5 },
          { answer: "Cardiovascular Disease (heart disease)", score: 5 },
          {
            answer:
              "Chronic Obstructive Pulmonary Disease (COPD) / lung disease",
            score: 5,
          },
          { answer: "Chronic Kidney Disease", score: 5 },
          { answer: "None", score: 0 },
        ],
      },
      {
        id: "PMH4",
        questionText:
          "4. If Yes, please specify the name of the disease, when it occurred, and the treatment received.",
        questionType: "text",
        score: 3,
      },
      {
        id: "PMH5",
        questionText:
          "5. Do you have any of the following condition or diseases?",
        questionType: "multicheck",
        isRequired: true,
        options: [
          { answer: "Rheumatoid Arthritis", score: 3 },
          { answer: "Osteoarthritis", score: 3 },
          { answer: "Gout", score: 3 },
          { answer: "Anemia", score: 3 },
          { answer: "Fibromyalgia", score: 3 },
          { answer: "Metabolic Disorder", score: 3 },
          { answer: "Thyroid Disease", score: 3 },
          { answer: "Asthma", score: 3 },
          { answer: "Osteoporosis", score: 3 },
          { answer: "Urogenital Disease", score: 3 },
          { answer: "None", score: 0 },
        ],
      },
      {
        id: "PMH6",
        questionText:
          "6. If Yes, please specify the Name of Disease, when diagnosed, and treatment.",
        questionType: "text",
        score: 3,
      },
      {
        id: "PMH7",
        questionText:
          "7. Have you ever had any of the following events in the past?",
        questionType: "multicheck",
        isRequired: true,
        options: [
          { answer: "Heart failure", score: 5 },
          { answer: "Myocardial Infarction", score: 5 },
          { answer: "Hepatitis B or C", score: 5 },
          { answer: "Tuberculosis", score: 5 },
          { answer: "Stroke / Paralysis", score: 5 },
          { answer: "Liver Disease", score: 5 },
          { answer: "Kidney Disease", score: 5 },
          { answer: "Cancer", score: 5 },
          { answer: "None", score: 0 },
        ],
      },
      {
        id: "PMH8",
        questionText:
          "8. If yes, when it occurred, and the treatment received.",
        questionType: "text",
        score: 3,
      },
      {
        id: "PMH9",
        questionText:
          "9. Have you been hospitalized in the past five years due to serious illness or major surgery?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 5 },
          { answer: "No", score: 1 },
        ],
      },
      {
        id: "PMH10",
        questionText:
          "10. If yes, please specify the reason for hospitalization, duration of stay, and treatment received.",
        questionType: "text",
        score: 3,
      },
      {
        id: "PMH11",
        questionText:
          "11. Are you currently taking any prescription medication? (Skip question 12 if you don’t)",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 5 },
          { answer: "No", score: 1 },
        ],
      },
      {
        id: "PMH12",
        questionText:
          "12. Please mention the medicine you are taking on a regular basis and their dosage.",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "More than 6", score: 5 },
          { answer: "5-6", score: 4 },
          { answer: "4-5", score: 3 },
          { answer: "2-3", score: 2 },
          { answer: "1-2", score: 1 },
        ],
      },
      {
        id: "PMH13",
        questionText:
          "13. How many prescription medications are you currently taking per day?",
        questionType: "text",
        score: 3,
      },
      {
        "id": "PMH14",
        "questionText": "14. What is your most recent blood pressure reading (Systolic/Diastolic)? Select the appropriate option from the list below.",
        "questionType": "mcq",
        isRequired: true,
        "options": [
          { "answer": "140 mmHg or higher / 90 mmHg or higher", "score": 5 },
          { "answer": "130-139 mm Hg / 85-89 mmHg", "score": 4 },
          { "answer": "120-129 mmHg / 80-84 mmHg", "score": 3 },
          { "answer": "80-119 mmHg / 60-79 mmHg", "score": 2 },
          { "answer": "Less than 80 mmHg / less than 60 mmHg", "score": 1 },
          { "answer": "I don't know", "score": 3 }
        ]
      },
      {
        "id": "PMH15",
        "questionText": "15. What is your most recent fasting blood glucose level? If you are diabetic and are unsure, please consult our medical team for assistance.",
        "questionType": "mcq",
        isRequired: true,
        "options": [
          { "answer": "150 mg/dL or higher", "score": 5 },
          { "answer": "126-149 mg/dL", "score": 4 },
          { "answer": "100-125 mg/dL", "score": 3 },
          { "answer": "70-99 mg/dL", "score": 2 },
          { "answer": "Less than 70 mg/dL", "score": 1 },
          { "answer": "I don't know", "score": 3 }
        ]
      },
      {
        "id": "PMH16",
        "questionText": "16. What is your most recent cholesterol profile (LDL/HDL ratio)? If you don't know, you can skip this question.",
        "questionType": "mcq",
        isRequired: true,
        "options": [
          { "answer": "Greater than 3", "score": 5 },
          { "answer": "2.5-3", "score": 4 },
          { "answer": "2-2.5", "score": 3 },
          { "answer": "1.5-2", "score": 2 },
          { "answer": "Less than 1.5", "score": 1 },
          { "answer": "I don't know", "score": 3 }
        ]
      },
      {
        id: "PMH17",
        questionText:
          "17. Do any of your immediate family members have a history of any of the following conditions?",
        questionType: "multicheck",
        isRequired: true,
        options: [
          { answer: "Heart Disease", score: 2 },
          { answer: "High blood pressure", score: 2 },
          { answer: "Diabetes", score: 2 },
          { answer: "High Cholesterol", score: 2 },
          { answer: "Thyroid Disease", score: 2 },
          { answer: "Stroke", score: 2 },
          { answer: "Cancer", score: 2 },
          { answer: "Genetic Disorder", score: 2 },
          { answer: "None", score: 0 },
        ],
      },
      {
        id: "PMH18",
        questionText:
          "18. If Yes, please specify the Name of Disease, when diagnosed, and treatment, and your relationship with them.",
        questionType: "text",
        score: 3,
      },
    ],
  },
  {
    sectionId: "WH",
    subheading: "Women Health",
    questions: [
      {
        id: "WH1",
        questionText: "1. How often do you visit a gynecologist for check-ups?",
        questionType: "mcq",
        options: [
          { answer: "Never", score: 5 },
          { answer: "Only when needed", score: 4 },
          { answer: "Once in 3 years", score: 3 },
          { answer: "Once a year", score: 2 },
          { answer: "Twice a year", score: 1 },
        ],
      },
      {
        id: "WH2",
        questionText:
          "2. Do you have a history of any of the following gynecological conditions?",
        questionType: "multicheck",
        options: [
          { answer: "Polycystic Ovarian Syndrome (PCOS)", score: 3 },
          { answer: "Endometriosis", score: 3 },
          { answer: "Uterine Fibroids", score: 3 },
          { answer: "Ovarian cysts", score: 3 },
          { answer: "Menstrual Irregularities", score: 3 },
          { answer: "None", score: 0 },
        ],
      },
      {
        id: "WH3",
        questionText:
          "3. Are you currently receiving treatment for any of the above conditions? Please specify the treatment.",
        questionType: "text",
        score: 3,
      },
      {
        id: "WH4",
        questionText:
          "4. Are you currently pregnant or planning to become pregnant?",
        questionType: "mcq",
        options: [
          { answer: "Yes", score: 3 },
          { answer: "No", score: 1 },
        ],
      },
    ],
  },
  {
    sectionId: "LsD",
    subheading: "Lifestyle and Diet",
    questions: [
      {
        id: "LsD1",
        questionText: "1. How often do you consume processed or fast food?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Daily", score: 5 },
          { answer: "3-4 times a week", score: 4 },
          { answer: "1-2 times a week", score: 3 },
          { answer: "1-2 times per month", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "LsD2",
        questionText:
          "2. How often do you consume sugary beverages (e.g., soda, fruit juice)?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Daily", score: 5 },
          { answer: "3-4 times a week", score: 4 },
          { answer: "1-2 times a week", score: 3 },
          { answer: "1-2 times per month", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "LsD3",
        questionText: "3. How often do you eat meals prepared at home?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Never", score: 5 },
          { answer: "1-2 times a week", score: 4 },
          { answer: "3-4 times a week", score: 3 },
          { answer: "5-6 times per month", score: 2 },
          { answer: "Daily", score: 1 },
        ],
      },
      {
        id: "LsD4",
        questionText: "4. Do you follow any specific diet or eating plan?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 2 },
          { answer: "No", score: 3 },
        ],
      },
      {
        id: "LsD5",
        questionText: "5. How often do you consume fruits and vegetables?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Never", score: 5 },
          { answer: "Rarely", score: 4 },
          { answer: "Once a week", score: 3 },
          { answer: "Several times a week", score: 2 },
          { answer: "Daily", score: 1 },
        ],
      },
      {
        id: "LsD6",
        questionText: "6. How much water do you drink daily?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Less than 2 glasses", score: 5 },
          { answer: "2-4 glasses", score: 4 },
          { answer: "4-6 glasses", score: 3 },
          { answer: "6-8 glasses", score: 2 },
          { answer: "More than 8 glasses", score: 1 },
        ],
      },
      {
        id: "LsD7",
        questionText: "7. Do you take any dietary supplements?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 2 },
          { answer: "No", score: 3 },
        ],
      },
    ],
  },
  {
    sectionId: "MEHR",
    subheading: "Mental and Emotional Health Risk",
    questions: [
      {
        id: "MEHR1",
        questionText: "1. How often do you feel stressed or overwhelmed?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "MEHR2",
        questionText:
          "2. How would you rate your overall mood in the past month?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Poor", score: 5 },
          { answer: "Fair", score: 4 },
          { answer: "Good", score: 3 },
          { answer: "Very Good", score: 2 },
          { answer: "Excellent", score: 1 },
        ],
      },
      {
        id: "MEHR3",
        questionText:
          "3. How often do you experience difficulty concentrating or focusing?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "MEHR4",
        questionText:
          "4. How often do you feel a loss of interest in daily activities?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "MEHR5",
        questionText:
          "5. Do you have a support system (e.g., friends, family) that you can turn to for help or advice?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 5 },
          { answer: "No", score: 1 },
        ],
      },
      {
        id: "MEHR6",
        questionText:
          "6. How often do you engage in activities that help you relax or de-stress (e.g., exercise, hobbies, meditation)?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Never", score: 5 },
          { answer: "Rarely", score: 4 },
          { answer: "Once a week", score: 3 },
          { answer: "Several times a week", score: 2 },
          { answer: "Daily", score: 1 },
        ],
      },
      {
        id: "MEHR7",
        questionText:
          "7. Have you ever sought professional help for mental health issues (e.g., counseling, therapy)?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 5 },
          { answer: "No", score: 1 },
        ],
      },
      {
        id: "MEHR8",
        questionText:
          "8. On average, how many hours of sleep do you get per night?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Less than 4 hours", score: 5 },
          { answer: "4-5 hours", score: 4 },
          { answer: "6-7 hours", score: 3 },
          { answer: "8-9 hours", score: 2 },
          { answer: "More than 9 hours", score: 1 },
        ],
      },
    ],
  },

  {
    sectionId: "OHR",
    subheading: "Occupational Health Risk",
    questions: [
      {
        id: "OHR1",
        questionText:
          "1. How often do you experience physical discomfort or pain due to your work?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "OHR2",
        questionText:
          "2. Do you have any of the following work-related health issues?",
        questionType: "multicheck",
        isRequired: true,
        options: [
          { answer: "Chronic Back or Neck Pain", score: 3 },
          { answer: "Eye Strain or Dry Eye", score: 3 },
          { answer: "Repetitive Stress Injury", score: 3 },
          { answer: "Respiratory Disease", score: 3 },
          { answer: "Stress / Burn Out", score: 3 },
          { answer: "None", score: 0 },
        ],
      },
      {
        id: "OHR3",
        questionText:
          "3. If yes, how long have you had this problem, and have you received any treatment for it?",
        questionType: "text",
      },
      {
        id: "OHR4",
        questionText:
          "4. Do you use ergonomic equipment (e.g., adjustable chair, keyboard, monitor) to support your physical health at work?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 1 },
          { answer: "No", score: 5 },
        ],
      },
      {
        id: "OHR5",
        questionText: "5. How often do you take breaks during your workday?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Never", score: 5 },
          { answer: "Rarely", score: 4 },
          { answer: "Every 5-6 hours", score: 3 },
          { answer: "Every 3-4 hours", score: 2 },
          { answer: "Every 2 hours", score: 1 },
        ],
      },
      {
        id: "OHR6",
        questionText:
          "6. Do you feel that your work environment is safe and conducive to your well-being?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 1 },
          { answer: "No", score: 5 },
        ],
      },
      {
        id: "OHR7",
        questionText:
          "7. Have you received any training on workplace safety and health?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 1 },
          { answer: "No", score: 5 },
        ],
      },
      {
        id: "OHR8",
        questionText:
          "8. Do you have access to health and wellness programs at work (e.g., fitness programs, mental health resources)?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 1 },
          { answer: "No", score: 5 },
        ],
      },
      {
        id: "OHR9",
        questionText:
          "9. How often do you feel that work-related factors impact your overall health?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
    ],
  },
  {
    sectionId: "WB",
    subheading: "Burnout at Work",
    questions: [
      {
        id: "WB1",
        questionText: "1. Do you feel emotionally drained at work?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "WB2",
        questionText:
          "2. Do you feel working with people all day long requires a great deal of effort?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "WB3",
        questionText: "3. Do you feel like your work is breaking you down?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "WB4",
        questionText:
          "4. Does direct contact with people at work stress you too much?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "WB5",
        questionText:
          "5. Do you feel you interact with people at work impersonally, as if they were objects?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "WB6",
        questionText:
          "6. Do you feel tired when you wake up and have to face another day at work?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "WB7",
        questionText:
          "7. Do you think you really don’t care about what happens at work?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "WB8",
        questionText: "8. Do you feel your job is making you unempathetic?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "WB9",
        questionText:
          "9. Are you becoming more insensitive to people since starting this job?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
      {
        id: "WB10",
        questionText:
          "10. Do you feel that others at work make you responsible for their problems?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Always", score: 5 },
          { answer: "Often", score: 4 },
          { answer: "Sometimes", score: 3 },
          { answer: "Rarely", score: 2 },
          { answer: "Never", score: 1 },
        ],
      },
    ],
  },

  {
    sectionId: "HBE",
    subheading: "Health Benefits and Expenditure",
    questions: [
      {
        "id": "HBE1",
        "questionText": "Do you believe the health benefits offered by the company sufficiently meet your needs?",
        "questionType": "mcq",
        isRequired: true,
        "options": [
          { "answer": "Yes", "score": 1 },
          { "answer": "No", "score": 5 }
        ]
      },
      {
        id: "HBE2",
        questionText:
          "2. What type of health services that are covered by your benefits do you frequently use?",
        questionType: "multicheck",
        isRequired: true,
        options: [
          { answer: "Telemedicine", score: 1 },
          { answer: "OPD", score: 1 },
          { answer: "IPD", score: 1 },
          { answer: "Pharmacy", score: 1 },
          { answer: "Lab and Diagnostics", score: 1 },
          { answer: "Homecare services", score: 1 },
        ],
      },
      {
        id: "HBE3",
        questionText:
          "3. What specific services would you like to see covered in your health benefits?",
        questionType: "multicheck",
        isRequired: true,
        options: [
          { answer: "OPD", score: 1 },
          { answer: "IPD", score: 1 },
          { answer: "Pharmacy", score: 1 },
          { answer: "Lab and Diagnostics", score: 1 },
          { answer: "Homecare", score: 1 },
          { answer: "Maternity", score: 1 },
          { answer: "Telemedicine", score: 1 },
          { answer: "Dental procedure", score: 1 },
          { answer: "Pre-existing condition", score: 1 },
          { answer: "Wellness program and preventive care", score: 1 },
        ],
      },
      {
        id: "HBE4",
        questionText:
          "4. What is your average monthly expense for hospital or outpatient department (OPD) services?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "More than PKR 6000", score: 5 },
          { answer: "PKR 5000 - PKR 6000", score: 4 },
          { answer: "PKR 3000 - PKR 4000", score: 3 },
          { answer: "PKR 1000 - PKR 2000", score: 2 },
          { answer: "Less than PKR 1000", score: 1 },
        ],
      },
      {
        id: "HBE5",
        questionText:
          "5. What is your average monthly expense for laboratory tests and diagnostics?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "More than PKR 10,000", score: 5 },
          { answer: "PKR 6000 - PKR 10,000", score: 4 },
          { answer: "PKR 4000 - PKR 5000", score: 3 },
          { answer: "PKR 2000 - PKR 3000", score: 2 },
          { answer: "Less than PKR 2000", score: 1 },
        ],
      },
      {
        id: "HBE6",
        questionText:
          "6. What is your average monthly expense for pharmacy or medication costs?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "More than PKR 15,000", score: 5 },
          { answer: "PKR 12,000 - PKR 15,000", score: 4 },
          { answer: "PKR 8000 - PKR 11,000", score: 3 },
          { answer: "PKR 5000 - PKR 8000", score: 2 },
          { answer: "Less than PKR 5000", score: 1 },
        ],
      },
      {
        id: "HBE7",
        questionText:
          "7. Would you like us to deliver your monthly medication to you in a timely manner?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 1 },
          { answer: "No", score: 5 },
        ],
      },
      {
        id: "HBE8",
        questionText:
          "8. Would you like health insurance coverage for your family members that is not included in your current health benefit plan?",
        questionType: "mcq",
        isRequired: true,
        options: [
          { answer: "Yes", score: 1 },
          { answer: "No", score: 5 },
        ],
      },
      {
        id: "HBE9",
        questionText:
          "9. What is your relationship to the family members you would like to include in health insurance coverage?",
        questionType: "multicheck",
        isRequired: true,
        options: [
          { answer: "Spouse", score: 1 },
          { answer: "Parents", score: 1 },
          { answer: "Children", score: 1 },
          { answer: "Siblings", score: 1 },
          { answer: "Others", score: 1 },
        ],
      },
      {
        id: "HBE10",
        // "questionText": "Thank you for submitting this form, please tick mark to accept that the summary of this data will be shared with your employer. This form is intended solely to measure your health risk. The results of this form will allow your employer to analyze your and your colleagues' health needs to provide you with the best and most personalized health benefits.",
        questionType: "mcq",
        isRequired: true,
        options: [
          {
            answer:
              "Thank you for submitting this form, please tick mark to accept that the summary of this data will be shared with your employer. This form is intended solely to measure your health risk. The results of this form will allow your employer to analyze your and your colleagues' health needs to provide you with the best and most personalized health benefits.",
            score: 0,
          },
        ],
      },
    ],
  },
];

export default formStructure;
