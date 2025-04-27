import { useState, useEffect } from 'react';
import { runTestSuite, logIssue } from '../../utils/testUtils';

const TestSuite = ({ isEnabled = false }) => {
  const [results, setResults] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Run tests when enabled
  useEffect(() => {
    if (isEnabled && !results) {
      runTests();
    }
  }, [isEnabled, results]);

  const runTests = async () => {
    setIsTesting(true);
    try {
      const testResults = await runTestSuite();
      setResults(testResults);
      
      // Log any critical issues
      if (testResults.accessibilityIssues.length > 0) {
        logIssue('TestSuite', 'Accessibility issues detected', {
          issues: testResults.accessibilityIssues
        });
      }
      
      if (!testResults.featureSupport.flexbox || !testResults.featureSupport.grid) {
        logIssue('TestSuite', 'Layout feature support issues', {
          features: testResults.featureSupport
        });
      }
    } catch (error) {
      console.error('Test suite failed:', error);
      logIssue('TestSuite', 'Test execution failed', { error: error.message });
    } finally {
      setIsTesting(false);
    }
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
          aria-label="Open test panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium dark:text-white">Test Results</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close test panel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isTesting ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Running tests...</p>
            </div>
          ) : results ? (
            <div className="space-y-3 overflow-y-auto max-h-96">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Browser</h4>
                <div className="text-sm mt-1">
                  <p className="text-gray-600 dark:text-gray-400">
                    {results.browserInfo.browser} {results.browserInfo.isMobile ? '(Mobile)' : '(Desktop)'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Feature Support</h4>
                <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                  {Object.entries(results.featureSupport).map(([feature, supported]) => (
                    <div key={feature} className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${supported ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Accessibility</h4>
                <div className="mt-1 text-sm">
                  {results.accessibilityIssues.length === 0 ? (
                    <p className="text-green-600 dark:text-green-400">No issues detected</p>
                  ) : (
                    <div className="space-y-2">
                      {results.accessibilityIssues.map((issue, i) => (
                        <div key={i} className="text-red-600 dark:text-red-400">
                          {issue.issue} {issue.count ? `(${issue.count})` : ''}
                          {issue.details && <p className="text-xs text-red-500">{issue.details}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Performance</h4>
                <div className="mt-1 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    DOM Updates: {results.performance.domUpdates.toFixed(2)}ms
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No test results available</p>
          )}

          <div className="mt-4 flex justify-center">
            <button
              onClick={runTests}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-300"
              disabled={isTesting}
            >
              Run Tests Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestSuite; 