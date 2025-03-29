import React, { useState } from 'react';
import Select from 'react-select';
import styles from "./styles.module.css";
import { createEnquiry } from '../store/AllSlices/enquiry.slice';
import { useDispatch } from 'react-redux';
import Notification from '../common/Notification';

const CommentForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nameOfTheStudent: '',
    collegeName: '',
    collegeAddress: '',
    educationalDegree: '',
    branch: '',
    lastYearPercentageGrade: '',
    email: '',
    phone: '',
    emergencyPhone: '',
    address: '',
    aadharCardNumber: '',
    panNumber: '',
    workingStyle: '',
  });
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [showOtherField, setShowOtherField] = useState(false);
  const [otherTechnologies, setOtherTechnologies] = useState("");
  const [errors, setErrors] = useState({});

  const validateFormData = () => {
    const newErrors = {};

    // Check required fields
    const requiredFields = [
      'nameOfTheStudent',
      'collegeName',
      'educationalDegree',
      'email',
      'phone',
      'workingStyle'
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone number validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Additional validations can be added here if necessary

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // console.log("formDataformData",formData)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the validation function to validate form data
    const isValid = validateFormData(); // This sets errors in the component state

    // Check if validation passed (isValid will be true if no errors)
    if (!isValid) {
      const errorMessages = Object.values(errors);
      Notification({ message: errorMessages[0], type: 'error' }); // Show the first error message
      return; // Exit if there are validation errors
    }

    // Prepare data to submit
    const selectedTechnologyValues = selectedTechnologies
      .filter(option => option.value !== 'Other') // Exclude 'Other'
      .map(option => option.value);

    const additionalTechnologies = showOtherField ? (otherTechnologies ? otherTechnologies.split(',').map(item => item.trim()) : []) : [];

    const formDataToSubmit = {
      ...formData,
      internshipInterestedTechnologies: [...selectedTechnologyValues, ...additionalTechnologies],
    };

    // console.log('Form submitted:', formDataToSubmit);

    try {
      const res = await dispatch(createEnquiry(formDataToSubmit))
      // console.log(res)
      if (res.status === 200) {
        setFormData({
          nameOfTheStudent: '',
          collegeName: '',
          collegeAddress: '',
          educationalDegree: '',
          branch: '',
          email: '',
          phone: '',
          emergencyPhone: '',
          address: '',
          aadharCardNumber: '',
          panNumber: '',
          workingStyle: '',
          lastYearPercentageGrade: '',
        });
        setSelectedTechnologies([]);
        setOtherTechnologies("");
        setShowOtherField(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTechnologyChange = (selectedOptions) => {
    setSelectedTechnologies(selectedOptions);
    setShowOtherField(selectedOptions.some(option => option.value === 'Other'));
  };

  const technologyOptions = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form id="registration-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="studentName">Name of the Student*</label>
            <input
              id="studentName"
              name="nameOfTheStudent"
              type="text"
              maxLength="255"
              required
              value={formData.nameOfTheStudent}
              onChange={handleInputChange}
            />
            {errors.nameOfTheStudent && <div className="error colorRedError">{errors.nameOfTheStudent}</div>}
          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="collegeName">College/Institute Name*</label>
            <input
              id="collegeName"
              name="collegeName"
              type="text"
              maxLength="255"
              required
              value={formData.collegeName}
              onChange={handleInputChange}
            />
            {errors.collegeName && <div className="error colorRedError">{errors.collegeName}</div>}

          </div>
        </div>
        <div className="col-xxl-12">
          <div className="postbox__comment-input">
            <label htmlFor="collegeAddress">College Address</label>
            <input
              id="collegeAddress"
              name="collegeAddress"
              type="text"
              value={formData.collegeAddress}
              onChange={handleInputChange}
            />
            {/* {errors.collegeAddress && <div className="error">{errors.collegeAddress}</div>} */}

          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="educationalDegree">Educational Degree*</label>
            <select
              className={styles.postboxcommentselect}
              id="educationalDegree"
              name="educationalDegree"
              required
              value={formData.educationalDegree}
              onChange={handleInputChange}
            >
              <option value="" disabled>--select--</option>

              <option value="Btech">Bachelor of Technology (B.Tech)</option>
              <option value="Mtech">Master of Technology (M.Tech)</option>
              <option value="Diploma Engineering">Diploma in Engineering</option>
              <option value="Phd Engineering">Ph.D. in Engineering</option>

              <option value="BBA">Bachelor of Business Administration (BBA)</option>
              <option value="MBA">Master of Business Administration (MBA)</option>
              <option value="PGDM">Post Graduate Diploma in Management (PGDM)</option>
              <option value="Phd Management">Ph.D. in Management</option>

              <option value="Bsc">Bachelor of Science (B.Sc)</option>
              <option value="Msc">Master of Science (M.Sc)</option>
              <option value="Bca">Bachelor of Computer Applications (BCA)</option>
              <option value="Mca">Master of Computer Applications (MCA)</option>

              <option value="BA">Bachelor of Arts (BA)</option>
              <option value="MA">Master of Arts (MA)</option>
              <option value="Bfa">Bachelor of Fine Arts (BFA)</option>
              <option value="Mfa">Master of Fine Arts (MFA)</option>

              <option value="Bcom">Bachelor of Commerce (B.Com)</option>
              <option value="Mcom">Master of Commerce (M.Com)</option>
              <option value="CA">Chartered Accountancy (CA)</option>
              <option value="CS">Company Secretary (CS)</option>
              <option value="BE">Bachelor of Engineering (BE)</option>

            </select>
            {errors.educationalDegree && <div className="error colorRedError">{errors.educationalDegree}</div>}

          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="branch">Branch</label>
            <select
              className={styles.postboxcommentselect}
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
            >
              <option value="" disabled>--select --</option>
              <option value="Arts and Commerce">Arts and Commerce</option>
              <option value="Commerce">Commerce</option>
              <option value="Science">Science</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Electronics Communication">Electronics and Communication Engineering</option>
              <option value="Computer Science Engineering">Computer Science Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Aeronautical Engineering">Aeronautical Engineering</option>
              <option value="Automobile Engineering">Automobile Engineering</option>
              <option value="Biomedical Engineering">Biomedical Engineering</option>
              <option value="Environmental Engineering">Environmental Engineering</option>
              <option value="Industrial Engineering">Industrial Engineering</option>
              <option value="Marine Engineering">Marine Engineering</option>
            </select>
            {/* {errors.branch && <div className="error">{errors.branch}</div>} */}

          </div>
        </div>
        <div className="col-xxl-6">
          <div className="postbox__comment-input">
            <label htmlFor="lastYearGrade">Last year/semester percentage/grade obtained</label>
            <input
              id="lastYearGrade"
              name="lastYearPercentageGrade"
              type="text"
              maxLength="255"
              value={formData.lastYearPercentageGrade}
              onChange={handleInputChange}
            />
            {/* {errors.lastYearPercentageGrade && <div className="error">{errors.lastYearPercentageGrade}</div>} */}

          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="email">Candidate email id*</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error colorRedError">{errors.email}</div>}

          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="phone">Candidate Phone number*</label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <div className="error colorRedError">{errors.phone}</div>}

          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="emergencyContact">Candidate emergency contact number</label>
            <input
              id="emergencyContact"
              name="emergencyPhone"
              type="text"
              value={formData.emergencyPhone}
              onChange={handleInputChange}
            />
            {/* {errors.emergencyPhone && <div className="error">{errors.emergencyPhone}</div>} */}

          </div>
        </div>
        <div className="col-xxl-12">
          <div className="postbox__comment-input">
            <label htmlFor="address">Candidate Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
            />
            {/* {errors.address && <div className="error">{errors.address}</div>} */}

          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="aadharCard">Candidate Aadhar Card Number</label>
            <input
              id="aadharCard"
              name="aadharCardNumber"
              type="text"
              value={formData.aadharCardNumber}
              onChange={handleInputChange}
            />
            {/* {errors.aadharCardNumber && <div className="error">{errors.aadharCardNumber}</div>} */}

          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="panCard">Candidate PAN number</label>
            <input
              id="panCard"
              name="panNumber"
              type="text"
              value={formData.panNumber}
              onChange={handleInputChange}
            />
            {/* {errors.panNumber && <div className="error">{errors.panNumber}</div>} */}

          </div>
        </div>
        <div className="col-xxl-12">
          <div className="postbox__comment-input">
            <label htmlFor="internshipTechnologies">Internship technologies interested in* (if not listed then select other)</label>
            <Select
              isMulti
              name="internshipTechnologies"
              options={technologyOptions}
              classNamePrefix="select"
              onChange={handleTechnologyChange}
              value={selectedTechnologies}
              id="internshipTechnologies"
              styles={{
                menu: (base) => ({
                  ...base,
                  zIndex: 1000
                })
              }}
            />
          </div>
        </div>
        {showOtherField && (
          <div className="col-xxl-12">
            <div className="postbox__comment-input">
              <label htmlFor="otherTechnologies">If Other, please specify (if multiple then add separated by commas)</label>
              <input
                id="otherTechnologies"
                name="otherTechnologies"
                type="text"
                maxLength="255"
                value={otherTechnologies}
                onChange={(e) => setOtherTechnologies(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="postbox__comment-input">
            <label htmlFor="workingStyle">Working Style*</label>
            <select
              className={styles.postboxcommentselect}
              id="workingStyle"
              name="workingStyle"
              required
              value={formData.workingStyle}
              onChange={handleInputChange}
            >
              <option value="" disabled>--select--</option>
              <option value="Work from Home">Work from Home</option>
              <option value="Work from Office">Work from Office</option>
              <option value="Both">Both</option>
            </select>
            {errors.workingStyle && <div className="error colorRedError">{errors.workingStyle}</div>}

          </div>
        </div>
        <div className="col-xxl-12">
          <div className="postbox__comment-btn">
            <button type="submit" className="tp-btn">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
