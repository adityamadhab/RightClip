import React, { useState } from 'react';
import CreatorSignUp from '../../components/Creator-Components/CreatorSignUp';
import SetUpStep2 from '../../components/Creator-Components/SetUpStep2';
import SetUpStep3 from '../../components/Creator-Components/SetUpStep3';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CompleteSetUp() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        industry: '',
        experience: '',
        email: '',
        phone: '',
        password: '',
        linkedin: '',
        resume: '',
        jobFunction: '',
        bio: '',
        workSample: '',
    });
    const [error, setError] = useState('');

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/creator/signup', formData);
            if (response.status === 201) {
                navigate('/creator/verify-otp', { state: { email: formData.email } });
            }
        } catch (error) {
            console.error('Error signing up:', error.response ? error.response.data : error.message);
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div>
            {error && (
                <div className="text-red-500 text-center mb-4">
                    {error}
                </div>
            )}
            {step === 1 && <CreatorSignUp formData={formData} setFormData={setFormData} nextStep={nextStep} />}
            {step === 2 && <SetUpStep2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <SetUpStep3 formData={formData} setFormData={setFormData} nextStep={handleSubmit} prevStep={prevStep} />}
        </div>
    );
}
