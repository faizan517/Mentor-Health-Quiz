// import React, { useEffect, useState } from "react";
// import { CButton, CCol, CContainer, CRow } from "@coreui/react";
// import { useLocation } from "react-router-dom";

// import axios from "axios";
// import { toast } from "react-toastify";
// // import 'react-tabs-scrollable/dist/rts.css'
// import { useNavigate, useParams } from "react-router-dom";
// import Info from "../../components/Info";
// import TabsComponent from "../../components/Tabs";
// import { Fonts } from "../../Utils/Fonts";
// import Images from "../../Utils/Images";
// import formStructure from "../../components/Form";

// const styles = {
//   formContainer: {
//     textAlign: "center",
//     // width:'80vw',
//     // display:'flex',
//     // flexDirection:'column',
//     // justifyContent:'center',
//     // alignSelf:'center'
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     color: "white",
//     borderRadius: "10px",
//     position: "relative",
//   },
//   logo: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     display: "flex",
//     alignItems: "center",
//   },
//   mentor: {
//     color: "#006eff",
//     backgroundColor: "white",
//     padding: "0 10px",
//     borderRadius: "5px",
//   },
//   health: {
//     color: "black",
//   },
//   headContainor: {
//     margin: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   tabs: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "30px",
//     borderTop: "2px solid #ddd",
//     paddingTop: 30,
//   },
//   tab: {
//     padding: "5px",
//     width: "50vw",
//     cursor: "pointer",
//     backgroundColor: "#f0f0f0",
//     fontWeight: "bold",
//     color: "#333",
//     borderBottomRightRadius: 10,
//     borderBottomLeftRadius: 10,
//     textAlign: "center",
//   },
//   activeTab: {
//     backgroundColor: "#006eff",
//     color: "white",
//     // fontFamily: 'Inter',
//     fontWeight: 700,
//   },
//   mainHead: {
//     ...Fonts.Inter,
//     fontWeight: 700,
//     fontSize: "35px",
//     textAlign: "justify",
//     lineHeight: 1.3,
//   },
//   tabHead: {
//     ...Fonts.Inter,
//     fontWeight: 400,
//     fontSize: "20px",
//     textAlign: "justify",
//   },
//   heading: {
//     padding: 10,
//     ...Fonts.Inter,
//     fontWeight: 400,
//     fontSize: 14,
//     marginBottom: 20,
//   },
//   answerFont: {
//     padding: 10,
//     ...Fonts.Inter,
//     fontWeight: 400,
//     fontSize: 14,
//     marginBottom: 20,
//   },

//   answerText: {
//     padding: 10,
//     ...Fonts.Inter,
//     fontWeight: 400,
//     fontSize: 14,
//     marginBottom: 20,
//     maxWidth: "600px",
//     width: "632px",
//     borderRadius: 5,
//   },
//   answerCheck: {
//     padding: 10,
//     ...Fonts.Inter,
//     fontWeight: 400,
//     fontSize: 14,
//     marginBottom: 20,
//   },
//   tabs: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "30px",
//     borderTop: "2px solid #ddd",
//     paddingTop: 30,
//   },
//   mainHead: {
//     ...Fonts.Inter,
//     fontWeight: 700,
//     fontSize: "35px",
//     textAlign: "justify",
//     lineHeight: 1.3,
//   },
//   tabHead: {
//     ...Fonts.Inter,
//     fontWeight: 400,
//     fontSize: "20px",
//     textAlign: "justify",
//   },
//   tabsWrapper: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center", // Center the content
//     position: "relative",
//     marginTop: "30px",
//     borderTop: "2px solid #ddd",
//     paddingTop: 30,
//     gap: "10px", // Add spacing between arrows and tabs
//   },
//   arrowButton: {
//     cursor: "pointer",
//     padding: "10px",
//     zIndex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center", // Center arrow icon
//   },
//   tabsContainer: {
//     display: "flex",
//     overflowX: "hidden", // Will change to 'scroll' for mobile
//     scrollBehavior: "smooth",
//     width: "80vw", // Adjust for mobile in component
//   },
//   tab: {
//     flexShrink: 0,
//     width: "30vw", // Dynamic width based on screen size
//     cursor: "pointer",
//     backgroundColor: "#f0f0f0",
//     borderBottomRightRadius: "10px",
//     borderBottomLeftRadius: "10px",
//     textAlign: "center",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     // padding: '10px', // Ensure there's padding inside the tab
//   },
//   activeTab: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//   },
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     boxShadow: "4px 4px 15px 15px rgba(0, 0, 0, 0.05)",
//     borderWidth: 0,
//     borderRadius: 10,
//     marginTop: 50,
//     padding: 20,
//   },
//   image: {
//     width: "80px", // Width of the smiley face
//     height: "80px", // Height of the smiley face
//     marginBottom: "20px",
//   },
//   text: {
//     fontSize: "24px",
//     ...Fonts.Inter,
//     fontWeight: 400,
//   },
//   imgHeading: {
//     ...Fonts.Inter,
//     fontWeight: 700,
//     fontSize: 64,
//   },
// };

// // In the Result component, use useLocation to get the state
// const Result = (props) => {
//   const {id} = useParams()
//   const location = useLocation();
//   const { assessmentId } = location.state || {}; // Access the assessmentId passed in the state
// console.log(id)
//   const handleSendEmail = async () => {
//     if (!assessmentId) {
//       alert("Assessment ID is missing!");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/api/employee-report/shaheercorp?assessment_id=${id}`, {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const result = await response.json();
//       console.log('Email sent successfully:', result);
//       alert('Email sent successfully!');
//     } catch (error) {
//       console.error('Error sending email:', error);
//       alert('Failed to send the email. Please try again.');
//     }
//   };

//   return (
//     <CContainer style={styles.container}>
//       <img src={Images.smile} alt="Smiley Face" style={styles.image} />
//       <span style={styles.imgHeading}>Thank you!</span>
//       <span style={{ ...styles.text, marginTop: 10 }}>
//         Please tick mark to accept that the summary of this data will be
//         shared with your employer. This form is intended solely to measure
//         your health risk. The results of this form will allow your employer
//         to analyze your and your colleagues' health needs to provide you
//         with the best and most personalized health benefits.
//       </span>

//       <button onClick={handleSendEmail}>email</button>
//       <div
//         style={{
//           ...styles.text,
//           fontWeight: 400,
//           display: "flex",
//           alignItems: "flex-end",
//           justifyContent: "flex-end",
//           height: 300,
//         }}
//       >
//         You will get your assessment form report on your email
//       </div>
//     </CContainer>
//   );
// };

// export default Result;

// // import React, { useState } from 'react';

// // function SendEmailButton() {
// //   const assessmentId = 1; // For testing purposes

// //   const handleSendEmail = async () => {
// //     console.log(`Sending request to: http://localhost:5000/api/send-email-with-pdf?assessment_id=${assessmentId}`);

// //     try {
// //       const response = await fetch(`http://localhost:5000/api/employee-report/shaheercorp?assessment_id=1`, {
// //         method: 'GET',
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Error: ${response.status} ${response.statusText}`);
// //       }

// //       const result = await response.json();
// //       console.log('Email sent successfully:', result);
// //       alert('Email sent successfully!');
// //     } catch (error) {
// //       console.error('Error sending email:', error);
// //       alert('Failed to send the email. Please try again.');
// //     }
// //   };

// //   return (
// //     <div>
// //       <button onClick={handleSendEmail}>
// //         Send Email for Assessment ID {assessmentId}
// //       </button>
// //     </div>
// //   );
// // }

// // export default SendEmailButton;

import React, { useEffect, useState } from "react";
import { CButton, CCol, CContainer, CRow } from "@coreui/react";

import axios from "axios";
import { toast } from "react-toastify";
// import 'react-tabs-scrollable/dist/rts.css'
import { useNavigate, useParams } from "react-router-dom";
import Info from "../../components/Info";
import TabsComponent from "../../components/Tabs";
import { Fonts } from "../../Utils/Fonts";
import Images from "../../Utils/Images";
import formStructure from "../../components/Form";

const styles = {
  formContainer: {
    textAlign: "center",
    // width:'80vw',
    // display:'flex',
    // flexDirection:'column',
    // justifyContent:'center',
    // alignSelf:'center'
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    borderRadius: "10px",
    position: "relative",
  },
  logo: {
    fontSize: "2rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  mentor: {
    color: "#006eff",
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: "5px",
  },
  health: {
    color: "black",
  },
  headContainor: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    borderTop: "2px solid #ddd",
    paddingTop: 30,
  },
  tab: {
    padding: "5px",
    width: "50vw",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    color: "#333",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    textAlign: "center",
  },
  activeTab: {
    backgroundColor: "#006eff",
    color: "white",
    // fontFamily: 'Inter',
    fontWeight: 700,
  },
  mainHead: {
    ...Fonts.Inter,
    fontWeight: 700,
    fontSize: "35px",
    textAlign: "justify",
    lineHeight: 1.3,
  },
  tabHead: {
    ...Fonts.Inter,
    fontWeight: 400,
    fontSize: "20px",
    textAlign: "justify",
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
    maxWidth: "600px",
    width: "632px",
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
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    borderTop: "2px solid #ddd",
    paddingTop: 30,
  },
  mainHead: {
    ...Fonts.Inter,
    fontWeight: 700,
    fontSize: "35px",
    textAlign: "justify",
    lineHeight: 1.3,
  },
  tabHead: {
    ...Fonts.Inter,
    fontWeight: 400,
    fontSize: "20px",
    textAlign: "justify",
  },
  tabsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center the content
    position: "relative",
    marginTop: "30px",
    borderTop: "2px solid #ddd",
    paddingTop: 30,
    gap: "10px", // Add spacing between arrows and tabs
  },
  arrowButton: {
    cursor: "pointer",
    padding: "10px",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center arrow icon
  },
  tabsContainer: {
    display: "flex",
    overflowX: "hidden", // Will change to 'scroll' for mobile
    scrollBehavior: "smooth",
    width: "80vw", // Adjust for mobile in component
  },
  tab: {
    flexShrink: 0,
    width: "30vw", // Dynamic width based on screen size
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: '10px', // Ensure there's padding inside the tab
  },
  activeTab: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "4px 4px 15px 15px rgba(0, 0, 0, 0.05)",
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 50,
    padding: 20,
  },
  image: {
    width: "80px", // Width of the smiley face
    height: "80px", // Height of the smiley face
    marginBottom: "20px",
  },
  text: {
    fontSize: "24px",
    ...Fonts.Inter,
    fontWeight: 400,
  },
  imgHeading: {
    ...Fonts.Inter,
    fontWeight: 700,
    fontSize: 64,
  },
};

const Result = (props) => {
  const { id, slug } = useParams();
  console.log(id, slug);
  const handleSendEmail = async () => {
    // console.log(`Sending request to: http://localhost:5000/api/send-email-with-pdf?assessment_id=${assessmentId}`);

    try {
      const response = await fetch(
        `http://localhost:5000/api/employee-report/${slug}?assessment_id=${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Email sent successfully:", result);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send the email. Please try again.");
    }
  };

  const isMobile = window.innerWidth <= 767; // Mobile screen check

  return (
    <CContainer style={styles.container}>
      <img src={Images.smile} alt="Smiley Face" style={styles.image} />
      <span style={styles.imgHeading}>Thank you!</span>
      <span style={{ ...styles.text, marginTop: 10 }}>
        Please tick mark to accept that the summary of this data will be shared
        with your employer. This form is intended solely to measure your health
        risk. The results of this form will allow your employer to analyze your
        and your colleagues&#39; health needs to provide you with the best and
        most personalized health benefits.
      </span>
      <CCol xs="auto" style={{marginTop:50 }}>
            <CButton
              color="primary"
              style={{ backgroundColor: '#0048ff', color: 'white', padding: '10px 20px', ...Fonts.Poppins}}
              type="button"
              className="mb-3 mt-3"
              onClick={() => handleSendEmail()}            >
              Send Email
            </CButton>
          </CCol>
      <div
        style={{
          ...styles.text,
          fontWeight: 400,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          height: 300,
        }}
      >
        You will get your assessment form report on your email
      </div>
    </CContainer>
  );
};

export default Result;

// import React, { useState } from 'react';

// function SendEmailButton() {
//   const assessmentId = 1; // For testing purposes

//   const handleSendEmail = async () => {
//     console.log(`Sending request to: http://localhost:5000/api/send-email-with-pdf?assessment_id=${assessmentId}`);

//     try {
//       const response = await fetch(`http://localhost:5000/api/employee-report/shaheercorp?assessment_id=1`, {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const result = await response.json();
//       console.log('Email sent successfully:', result);
//       alert('Email sent successfully!');
//     } catch (error) {
//       console.error('Error sending email:', error);
//       alert('Failed to send the email. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleSendEmail}>
//         Send Email for Assessment ID {assessmentId}
//       </button>
//     </div>
//   );
// }

// export default SendEmailButton;
