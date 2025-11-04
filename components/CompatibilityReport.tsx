import React from 'react';
import { CompatibilityReport as Report } from '../types';

interface CompatibilityReportProps {
  report: Report | null | { error: string };
  isLoading: boolean;
}

const CompatibilityReport: React.FC<CompatibilityReportProps> = ({ report, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex-grow bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-gray-300">AI sedang menganalisis rakitan Anda...</p>
        </div>
      </div>
    );
  }
  
  if (!report) {
    return (
        <div className="flex-grow bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400">Pilih minimal dua komponen dan jalankan analisis.</p>
        </div>
    );
  }

  if ('error' in report) {
      return <div className="flex-grow bg-red-900/50 border border-red-700 rounded-lg p-4 text-red-300">Galat: {report.error}</div>;
  }

  return (
    <div className="flex-grow bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 overflow-y-auto max-h-96">
      <div className={`flex items-center space-x-3 mb-4 p-3 rounded-lg ${report.isCompatible ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
          {report.isCompatible ? 
            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> :
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          }
        <h3 className="text-lg font-bold">{report.isCompatible ? 'Rakitan Kompatibel' : 'Ditemukan Masalah Kompatibilitas'}</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-cyan-400">Penilaian Keseluruhan:</h4>
          <p className="text-sm text-gray-300 mt-1">{report.overallAssessment}</p>
        </div>

        {report.issues && report.issues.length > 0 && (
          <div>
            <h4 className="font-semibold text-red-400">Masalah:</h4>
            <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-red-300">
              {report.issues.map((issue, index) => (
                <li key={index}><strong>{issue.component1} & {issue.component2}:</strong> {issue.issue}</li>
              ))}
            </ul>
          </div>
        )}

        {report.recommendations && report.recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold text-yellow-400">Rekomendasi:</h4>
            <ul className="list-disc list-inside mt-1 space-y-2 text-sm text-yellow-300">
              {report.recommendations.map((rec, index) => (
                <li key={index}>
                    Ganti <strong>{rec.componentToReplace}</strong> dengan <strong>{rec.recommendation}</strong>.
                    <p className="pl-4 text-xs text-gray-400"><em>Alasan: {rec.reason}</em></p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompatibilityReport;