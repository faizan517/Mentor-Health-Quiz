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
  const [heightInFeet, setHeightInFeet] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onInfoSubmit(data); // Pass data to parent component (DynamicForm) for submission
  };


  const handleWeightChange = (e) => {
    const weightInKg = e.target.value;
    onInputChange('weight', weightInKg);
    setWeightInLbs(weightInKg * 2.20462); // Convert kg to lbs
  };

  const handleHeightChange = (e) => {
    const heightInCm = e.target.value;
    onInputChange('height', heightInCm);
    setHeightInFeet(heightInCm / 30.48); // Convert cm to feet
  };
  return (
    <CContainer className="my-5">
      <CForm onSubmit={handleSubmit(onSubmit)}>
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

        {/* <CRow className="mb-3"> */}
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
        <CFormLabel style={styles.title}>Height (in cm)</CFormLabel>
        <CFormInput
          style={styles.input}
          type="number"
          {...register('height', { required: 'Height is required' })}
          onChange={handleHeightChange}
        />
        {/* <CFormFeedback invalid>{errors.height?.message}</CFormFeedback> */}
        {heightInFeet && (
          <div style={{ marginTop: '5px' }}>
            <strong>{heightInFeet.toFixed(2)} feet</strong>
          </div>
        )}
      </CCol>
    </CRow>
{/* </CRow> */}

      </CForm>
    </CContainer>
  );
};

export default Info;
