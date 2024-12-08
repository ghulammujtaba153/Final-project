'use client'; // Ensures this component runs on the client-side

import Spinner from '@/components/Spinner';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface PageProps {
    params: {
        id: string;
    };
}

interface ECGReport {
    _id: string;
    testId: string;
    ecg: string;
    prediction: string;
    upLoadedAt: string;
}

interface CBCReport {
    _id: string;
    testId: string;
    gender: number;
    hemoglobin: number;
    MCH: number;
    MCHC: number;
    MCV: number;
    result: {
        Result: number;
        IDA: number;
        FDA: number;
        Thalassemia: number;
        MPDs: number;
        HA: number;
        MA: number;
        MiA: number;
    };
    createdAt: string;
}

const Page: React.FC<PageProps> = ({ params }) => {
    const { id } = params;
    const [report, setReport] = useState<ECGReport | null>(null);
    const [cbcReport, setCBCReport] = useState<CBCReport | null>(null);
    const [loading, setLoading] =useState(false);

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE_URL}/testReports/test/${id}`);
                setReport(res.data[0]); // Assuming the API returns an array with one object
                const cbcRes = await axios.get(`${API_BASE_URL}/testReports/cbc/test/${id}`);
                setCBCReport(cbcRes.data[0]);
            } catch (error) {
                console.error('Error fetching the report:', error);
            }
            setLoading(false);
        };

        fetchReport();
    }, [id]);

    if (loading) {
        return <div className="pl-[100px] flex items-center justify-center h-screen text-white">
            <Spinner />
        </div>;
    }

    return (
        <div className="pl-[100px] h-[100%] text-white min-h-screen">
            {report && (
                <>
                    <h1 className="text-3xl font-bold mb-4">ECG Report Details</h1>
                    <p className="text-xl text-gray-200 mb-2">Report ID: <span className='text-md text-gray-200'>{report._id}</span></p>
                    <p className="text-xl text-gray-200 mb-2">Prediction: <span className='text-md text-gray-200'>{report.prediction}</span></p>
                    <p className="text-xl text-gray-200 mb-2">Uploaded At: <span className='text-md text-gray-200'>{new Date(report.upLoadedAt).toLocaleString()}</span></p>
                    <img src={report.ecg} alt="ECG Image" className="mt-4 max-w-full h-auto rounded-lg shadow-lg" />
                </>
            )}

            {cbcReport && (
                <div className="mt-8">
                    <h1 className="text-3xl font-bold mb-4">CBC Report Details</h1>
                    <p className="text-xl text-gray-200 mb-2">CBC Report ID: <span className='text-md text-gray-200'>{cbcReport._id}</span></p>
                    <p className="text-xl text-gray-200 mb-2">Gender: <span className='text-md text-gray-200'>{cbcReport.gender === 0 ? 'Male' : 'Female'}</span></p>
                    <p className="text-xl text-gray-200 mb-2">Hemoglobin: <span className='text-md text-gray-200'>{cbcReport.hemoglobin}</span></p>
                    <p className="text-xl text-gray-200 mb-2">MCH: <span className='text-md text-gray-200'>{cbcReport.MCH}</span></p>
                    <p className="text-xl text-gray-200 mb-2">MCHC: <span className='text-md text-gray-200'>{cbcReport.MCHC}</span></p>
                    <p className="text-xl text-gray-200 mb-2">MCV: <span className='text-md text-gray-200'>{cbcReport.MCV}</span></p>
                    <h2 className="text-2xl font-bold mt-4 mb-2">Results:</h2>
                    <p className="text-xl text-gray-200 mb-2">Anemia: <span className='text-md text-gray-200'>{cbcReport.result.Result == 1 ? "Detected" : "Not Detected"}</span></p>
                    {cbcReport.result.Result== 1 && <><p className="text-xl text-gray-200 mb-2">IDA: <span className='text-md text-gray-200'>{cbcReport.result.IDA == 1 ? "Detected" : "Not Detected"}</span></p>
                    <p className="text-xl text-gray-200 mb-2">FDA: <span className='text-md text-gray-200'>{cbcReport.result.FDA == 1 ? "Detected" : "Not Detected"}</span></p>
                    <p className="text-xl text-gray-200 mb-2">Thalassemia: <span className='text-md text-gray-200'>{cbcReport.result.Thalassemia == 1 ? "Detected" : "Not Detected"}</span></p>
                    <p className="text-xl text-gray-200 mb-2">MPDs: <span className='text-md text-gray-200'>{cbcReport.result.MPDs == 1 ? "Detected" : "Not Detected"}</span></p>
                    <p className="text-xl text-gray-200 mb-2">HA: <span className='text-md text-gray-200'>{cbcReport.result.HA == 1 ? "Detected" : "Not Detected"}</span></p>
                    <p className="text-xl text-gray-200 mb-2">MA: <span className='text-md text-gray-200'>{cbcReport.result.MA == 1 ? "Detected" : "Not Detected"}</span></p>
                    <p className="text-xl text-gray-200 mb-2">MiA: <span className='text-md text-gray-200'>{cbcReport.result.MiA == 1 ? "Detected" : "Not Detected"}</span></p>
                    <p className="text-xl text-gray-200 mb-2">Created At: <span className='text-md text-gray-200'>{new Date(cbcReport.createdAt).toLocaleString()}</span></p>
                    </>}
                </div>
            )}

            {!report && !cbcReport && (
                <div className="pl-[100px] h-[100%] text-white h-screen">
                    <h1 className="text-3xl font-bold mb-4">Report is not uploaded by Nurse</h1>
                </div>
            )}
        </div>
    );
};

export default Page;
