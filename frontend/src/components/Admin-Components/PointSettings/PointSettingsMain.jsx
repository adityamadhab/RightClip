import { useState, useEffect } from 'react';
import axios from 'axios';
import AdDashNav from '../DashBoard/AdDashNav';

export default function PointSettingsMain() {
    const [settings, setSettings] = useState({
        earningsPerProject: 10,
        qualityScorePerProject: 5
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get('/points/settings', {
                headers: {
                    Authorization: localStorage.getItem('AdminToken')
                }
            });
            setSettings(response.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put('/points/settings/update', settings, {
                headers: {
                    Authorization: localStorage.getItem('AdminToken')
                }
            });
            setMessage('Settings updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating settings:', error);
            setMessage('Error updating settings');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <AdDashNav />
                <div className="max-w-2xl mx-auto mt-8 p-6 bg-[#FFEADD] rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-6">Point Settings</h2>
                    {message && (
                        <div className={`p-4 mb-4 rounded ${
                            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Earnings Per Project (points)
                            </label>
                            <input
                                type="number"
                                name="earningsPerProject"
                                value={settings.earningsPerProject}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quality Score Per Project (points)
                            </label>
                            <input
                                type="number"
                                name="qualityScorePerProject"
                                value={settings.qualityScorePerProject}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300"
                        >
                            {isLoading ? 'Updating...' : 'Update Settings'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 