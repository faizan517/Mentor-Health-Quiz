import React, { useState } from 'react';
import { CContainer, CForm, CRow, CCol, CFormLabel, CFormInput, CFormFeedback, CFormSelect } from '@coreui/react';
import { useForm } from 'react-hook-form';
import { Fonts } from '../../Utils/Fonts';

const styles = {
  container: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 20,
    boxShadow: '4px 4px 15px 15px rgba(0, 0, 0, 0.05)',
    borderWidth: 0,
    borderRadius: 10,
  },
  inputCon: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    width: '100%',
    borderRadius: 5,
    border: '1px solid #ddd',
    fontSize: 14,
  },
  title: {
    ...Fonts.Inter,
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 10,
  },
};

const Info = ({ onInputChange, onInfoSubmit }) => {
  const [weightInLbs, setWeightInLbs] = useState(null);
  const [heightInCm, setHeightInCm] = useState(null);
  // const {
    //     register,
    //     handleSubmit,
    //     setValue, // Allows setting the value for fields programmatically
    //     getValues, // Allows getting the values of form fields
    //     formState: { errors },
    //   } = useForm({
    //     defaultValues: {
    //       date: '',
    //       email: '',
    //       firstName: '',
    //       lastName: '',
    //       companyName: '',
    //       occupation: '',
    //       dob: '',
    //       gender: '',
    //       weight: '',
    //       height: '',
    //     }
    //   });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: '',
      email: '',
      firstName: '',
      lastName: '',
      companyName: '',
      occupation: '',
      dob: '',
      gender: '',
      weight: '',
      height: '',
    }
  });

  const onSubmit = (data) => {
    onInfoSubmit(data); // Pass data to parent component (DynamicForm) for submission
  };

  const handleWeightChange = (e) => {
    const weightInKg = e.target.value;
    onInputChange('weight', weightInKg);
    setWeightInLbs(weightInKg * 2.20462); // Convert kg to lbs
  };

  const handleHeightChange = (e) => {
    const height = e.target.value;
    onInputChange('height', height);

    // Parse the height input (e.g., "5.11")
    const [feet, inches] = height.split('.').map((part) => parseInt(part, 10));

    // If the height input is valid (either feet only or feet and inches)
    if (!isNaN(feet)) {
      let totalInches = feet * 12 + (isNaN(inches) ? 0 : inches); // Convert to total inches

      // Convert the height to cm
      const cm = totalInches * 2.54;
      setHeightInCm(cm);
    } else {
      setHeightInCm(null); // Reset if input is invalid
    }
  };

  return (
    <CContainer className="my-5">
      <CForm onSubmit={handleSubmit(onSubmit)} style={{ padding: 50 }}>
        <CRow className="mb-3">
          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>Date</CFormLabel>
            <CFormInput
              style={styles.input}
              type="date"
              {...register('date', { required: 'Date is required' })}
              onChange={(e) => onInputChange('date', e.target.value)}
            />
            <CFormFeedback invalid>{errors.date?.message}</CFormFeedback>
          </CCol>
          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>Email</CFormLabel>
            <CFormInput
              style={styles.input}
              type="email"
              {...register('email', { required: 'Email is required' })}
              onChange={(e) => onInputChange('email', e.target.value)}
            />
            <CFormFeedback invalid>{errors.email?.message}</CFormFeedback>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>First Name</CFormLabel>
            <CFormInput
              style={styles.input}
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              onChange={(e) => onInputChange('firstName', e.target.value)}
            />
            <CFormFeedback invalid>{errors.firstName?.message}</CFormFeedback>
          </CCol>
          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>Last Name</CFormLabel>
            <CFormInput
              style={styles.input}
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              onChange={(e) => onInputChange('lastName', e.target.value)}
            />
            <CFormFeedback invalid>{errors.lastName?.message}</CFormFeedback>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>Company Name</CFormLabel>
            <CFormInput
              style={styles.input}
              type="text"
              {...register('companyName')}
              onChange={(e) => onInputChange('companyName', e.target.value)}
            />
          </CCol>
          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>Occupation</CFormLabel>
            <CFormInput
              style={styles.input}
              type="text"
              {...register('occupation')}
              onChange={(e) => onInputChange('occupation', e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>Date of Birth</CFormLabel>
            <CFormInput
              style={styles.input}
              type="date"
              {...register('dob', { required: 'Date of Birth is required' })}
              onChange={(e) => onInputChange('dob', e.target.value)}
            />
            <CFormFeedback invalid>{errors.dob?.message}</CFormFeedback>
          </CCol>
          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>Gender</CFormLabel>
            <CFormSelect
              style={styles.input}
              {...register('gender', { required: 'Gender is required' })}
              onChange={(e) => onInputChange('gender', e.target.value)}
            >
              <option value="">Open this select menu</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </CFormSelect>
            <CFormFeedback invalid>{errors.gender?.message}</CFormFeedback>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>Weight (in Kg)</CFormLabel>
            <CFormInput
              style={styles.input}
              type="number"
              {...register('weight', { required: 'Weight is required' })}
              onChange={handleWeightChange}
            />
            <CFormFeedback invalid>{errors.weight?.message}</CFormFeedback>
            {weightInLbs && (
              <div style={{ marginTop: '5px' }}>
                <strong>{weightInLbs.toFixed(2)} lbs</strong>
              </div>
            )}
          </CCol>

          <CCol md={6} style={styles.inputCon}>
            <CFormLabel style={styles.title}>Height (in feet and inches)</CFormLabel>
            <CFormInput
              style={styles.input}
              type="number"
              {...register('height', { required: 'Height is required' })}
              onChange={handleHeightChange}
              // placeholder="Enter height (e.g., 5.11)"
            />
            {/* <CFormFeedback invalid>{errors.height?.message}</CFormFeedback> */}
            {heightInCm && (
              <div style={{ marginTop: '5px' }}>
                <strong>{heightInCm.toFixed(2)} cm</strong>
              </div>
            )}
          </CCol>
        </CRow>

      </CForm>
    </CContainer>
  );
};

export default Info;


// const Info = ({ onInputChange, personalInfo }) => {
//   return (
//     <div>
//       <label>
//         Name:
//         <input
//           type="text"
//           value={personalInfo.name || ""}
//           onChange={(e) => onInputChange("name", e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input
//           type="email"
//           value={personalInfo.email || ""}
//           onChange={(e) => onInputChange("email", e.target.value)}
//         />
//       </label>
//     </div>
//   );
// };

// export default Info;


// import React, { useState } from 'react';
// import { CContainer, CForm, CRow, CCol, CFormLabel, CFormInput, CFormFeedback, CFormSelect } from '@coreui/react';
// import { useForm } from 'react-hook-form';
// import { Fonts } from '../../Utils/Fonts';

// const styles = {
//   container: {
//     height: 'auto',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     padding: 20,
//     boxShadow: '4px 4px 15px 15px rgba(0, 0, 0, 0.05)',
//     borderWidth: 0,
//     borderRadius: 10,
//   },
//   inputCon: {
//     marginBottom: 20,
//   },
//   input: {
//     padding: 10,
//     width: '100%',
//     borderRadius: 5,
//     border: '1px solid #ddd',
//     fontSize: 14,
//   },
//   title: {
//     ...Fonts.Inter,
//     fontWeight: 500,
//     fontSize: 16,
//     marginBottom: 10,
//   },
// };

// const Info = ({ onInputChange, onInfoSubmit }) => {
//   const [weightInLbs, setWeightInLbs] = useState(null);
//   const [heightInCm, setHeightInCm] = useState(null);

//   // Initialize useForm with defaultValues to persist form data
//   const {
//     register,
//     handleSubmit,
//     setValue, // Allows setting the value for fields programmatically
//     getValues, // Allows getting the values of form fields
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       date: '',
//       email: '',
//       firstName: '',
//       lastName: '',
//       companyName: '',
//       occupation: '',
//       dob: '',
//       gender: '',
//       weight: '',
//       height: '',
//     }
//   });

//   const onSubmit = (data) => {
//     onInfoSubmit(data); // Pass data to parent component (DynamicForm) for submission
//   };

//   const handleWeightChange = (e) => {
//     const weightInKg = e.target.value;
//     onInputChange('weight', weightInKg);
//     setWeightInLbs(weightInKg * 2.20462); // Convert kg to lbs
//   };

//   const handleHeightChange = (e) => {
//     const height = e.target.value;
//     onInputChange('height', height);

//     // Parse the height input (e.g., "5.11")
//     const [feet, inches] = height.split('.').map((part) => parseInt(part, 10));

//     // If the height input is valid (either feet only or feet and inches)
//     if (!isNaN(feet)) {
//       let totalInches = feet * 12 + (isNaN(inches) ? 0 : inches); // Convert to total inches

//       // Convert the height to cm
//       const cm = totalInches * 2.54;
//       setHeightInCm(cm);
//     } else {
//       setHeightInCm(null); // Reset if input is invalid
//     }
//   };

//   const [activeTab, setActiveTab] = useState(1);

//   const goToNextTab = () => {
//     setActiveTab(activeTab + 1); // Move to the next section/tab
//   };

//   const goToPreviousTab = () => {
//     setActiveTab(activeTab - 1); // Go to previous section/tab
//   };

//   return (
//     <CContainer className="my-5">
//       <CForm onSubmit={handleSubmit(onSubmit)} style={{ padding: 50 }}>
//         {/* Tab 1 */}
//         {activeTab === 1 && (
//           <div>
//             <CRow className="mb-3">
//               <CCol md={6} style={styles.inputCon}>
//                 <CFormLabel style={styles.title}>Date</CFormLabel>
//                 <CFormInput
//                   style={styles.input}
//                   type="date"
//                   {...register('date', { required: 'Date is required' })}
//                   onChange={(e) => onInputChange('date', e.target.value)}
//                 />
//                 <CFormFeedback invalid>{errors.date?.message}</CFormFeedback>
//               </CCol>
//               <CCol md={6} style={styles.inputCon}>
//                 <CFormLabel style={styles.title}>Email</CFormLabel>
//                 <CFormInput
//                   style={styles.input}
//                   type="email"
//                   {...register('email', { required: 'Email is required' })}
//                   onChange={(e) => onInputChange('email', e.target.value)}
//                 />
//                 <CFormFeedback invalid>{errors.email?.message}</CFormFeedback>
//               </CCol>
//             </CRow>
//             <div className="d-flex justify-content-center mt-4">
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 style={{ width: '200px' }}
//                 onClick={goToNextTab}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Tab 2 */}
//         {activeTab === 2 && (
//           <div>
//             <CRow className="mb-3">
//               <CCol md={6} style={styles.inputCon}>
//                 <CFormLabel style={styles.title}>First Name</CFormLabel>
//                 <CFormInput
//                   style={styles.input}
//                   type="text"
//                   {...register('firstName', { required: 'First name is required' })}
//                   onChange={(e) => onInputChange('firstName', e.target.value)}
//                 />
//                 <CFormFeedback invalid>{errors.firstName?.message}</CFormFeedback>
//               </CCol>
//               <CCol md={6} style={styles.inputCon}>
//                 <CFormLabel style={styles.title}>Last Name</CFormLabel>
//                 <CFormInput
//                   style={styles.input}
//                   type="text"
//                   {...register('lastName', { required: 'Last name is required' })}
//                   onChange={(e) => onInputChange('lastName', e.target.value)}
//                 />
//                 <CFormFeedback invalid>{errors.lastName?.message}</CFormFeedback>
//               </CCol>
//             </CRow>
//             <div className="d-flex justify-content-center mt-4">
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 style={{ width: '200px' }}
//                 onClick={goToPreviousTab}
//               >
//                 Previous
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 style={{ width: '200px' }}
//                 onClick={goToNextTab}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Tab 3 */}
//         {activeTab === 3 && (
//           <div>
//             <CRow className="mb-3">
//               <CCol md={6} style={styles.inputCon}>
//                 <CFormLabel style={styles.title}>Company Name</CFormLabel>
//                 <CFormInput
//                   style={styles.input}
//                   type="text"
//                   {...register('companyName')}
//                   onChange={(e) => onInputChange('companyName', e.target.value)}
//                 />
//               </CCol>
//               <CCol md={6} style={styles.inputCon}>
//                 <CFormLabel style={styles.title}>Occupation</CFormLabel>
//                 <CFormInput
//                   style={styles.input}
//                   type="text"
//                   {...register('occupation')}
//                   onChange={(e) => onInputChange('occupation', e.target.value)}
//                 />
//               </CCol>
//             </CRow>
//             <div className="d-flex justify-content-center mt-4">
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 style={{ width: '200px' }}
//                 onClick={goToPreviousTab}
//               >
//                 Previous
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 style={{ width: '200px' }}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         )}
//       </CForm>
//     </CContainer>
//   );
// };

// export default Info