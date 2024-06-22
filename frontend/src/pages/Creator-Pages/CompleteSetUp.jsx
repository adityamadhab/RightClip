import React, { useState } from 'react';
import CreatorSignUp from '../../components/Creator-Components/CreatorSignUp';
import SetUpStep1 from '../../components/Creator-Components/SetUpStep1';
import SetUpStep2 from '../../components/Creator-Components/SetUpStep2';
import SetUpStep3 from '../../components/Creator-Components/SetUpStep3';
import SetUpStep4 from '../../components/Creator-Components/SetUpStep4';

export default function CompleteSetUp() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleSubmit = () => {
        console.log('Final Form Data:', formData);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <CreatorSignUp nextStep={nextStep} formData={formData} setFormData={setFormData} />;
            case 2:
                return <SetUpStep1 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />;
            case 3:
                return <SetUpStep2 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />;
            case 4:
                return <SetUpStep3 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />;
            case 5:
                return <SetUpStep4 nextStep={handleSubmit} prevStep={prevStep} formData={formData} setFormData={setFormData} />;
            default:
                return <CreatorSignUp nextStep={nextStep} formData={formData} setFormData={setFormData} />;
        }
    };

    return (
        <div>
            {renderStep()}
        </div>
    );
}
