import React, { useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Helmet } from 'react-helmet';

const UnitTestCreator = () => {
  const [baseUrl, setBaseUrl] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [input, setInput] = useState('');
  const [tests, setTests] = useState([]);
  const [zipName, setZipName] = useState('');
  const [processingAll, setProcessingAll] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(null);

  const addTest = (e) => {
    e.preventDefault();
    const newTest = { baseUrl, endpoint, input: JSON.parse(input), result: null };
    setTests([...tests, newTest]);
    setEndpoint('');
    setInput('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data)) {
        const updatedTests = data.map(test => ({
          ...test,
          baseUrl: baseUrl,
          input: JSON.stringify(test.input, null, 2),
          result: null
        }));
        setTests(updatedTests);
      } else {
        alert("Invalid file format. Please upload a JSON array.");
      }
    };
    reader.readAsText(file);
  };

  const handleRunTest = async (test, index) => {
    try {
      const response = await axios({
        method: test.method,
        url: `${test.baseUrl}${test.endpoint}`,
        data: JSON.parse(test.input)
      });
      const updatedTests = [...tests];
      updatedTests[index].result = 'success';
      setTests(updatedTests);
      console.log('Test Passed:', response.data);
    } catch (error) {
      const updatedTests = [...tests];
      updatedTests[index].result = 'failure';
      setTests(updatedTests);
      console.error('Test Failed:', error);
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleRunAllTests = async () => {
    setProcessingAll(true);
    for (let i = 0; i < tests.length; i++) {
      setCurrentTestIndex(i);
      await handleRunTest(tests[i], i);
      await delay(1000); // Add a 1-second delay between each test
    }
    setProcessingAll(false);
    setCurrentTestIndex(null);
  };

  const downloadTests = () => {
    const zip = new JSZip();
    tests.forEach((test) => {
      const content = `import axios from 'axios';

test('Test ${test.endpoint}', async () => {
  const response = await axios({
    method: '${test.method}',
    url: '${test.baseUrl}${test.endpoint}',
    data: ${JSON.stringify(JSON.parse(test.input), null, 2)}
  });
  // Add your assertions here
  expect(response.status).toBe(200);
  // expect(response.data).toEqual(expectedData);
});
`;
      const fileName = test.endpoint.replace(/\//g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      zip.file(`${fileName}.js`, content);
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, zipName || 'tests.zip');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-[6px]">
              <Helmet>
        <title>Unit Test Creator - Create and Test Your API Endpoints</title>
        <meta name="description" content="Easily create and test unit tests for your API endpoints with our Unit Test Creator demo tool. Upload JSON files, generate tests, and get instant feedback." />
        <meta name="keywords" content="unit test creator, API testing, generate unit tests, upload JSON, API endpoint testing, automated testing tool" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Unit Test Creator - Create and Test Your API Endpoints" />
        <meta property="og:description" content="Easily create and test unit tests for your API endpoints with our Unit Test Creator demo tool. Upload JSON files, generate tests, and get instant feedback." />
        <meta property="og:url" content="https://playground.leumas.tech/unit-tests" />
        <meta property="og:type" content="website" />

        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Unit Test Creator - Create and Test Your API Endpoints" />
        <meta name="twitter:description" content="Easily create and test unit tests for your API endpoints with our Unit Test Creator demo tool. Upload JSON files, generate tests, and get instant feedback." />

        {/* Additional SEO Tags */}
        <link rel="canonical" content="https://playground.leumas.tech/unit-tests" />
      </Helmet>
      <div className=" mx-auto bg-white p-6 rounded-lg shadow-lg ">
        <form onSubmit={addTest} className="mb-6">

            <div className='flex items-center gap-2 justify-between '>
            
          <div className="mb-4 w-full">
            <label className="block text-gray-700">Base URL:</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700">Endpoint:</label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
</div>


          <div className="mb-4">
            <label className="block text-gray-700">Input JSON:</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 resize-none min-h-[200px] max-h-[200px]"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
          >
            Add Test
          </button>
        </form>
<div className='flex items-center gap-2 justify-between border'>



        <div className="mb-6 w-full">
          <label className="block text-gray-700">Upload JSON File:</label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-6 w-full">
          <label className="block text-gray-700">ZIP File Name:</label>
          <input
            type="text"
            value={zipName}
            onChange={(e) => setZipName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter name for the ZIP file"
          />
        </div>
</div>


<div className='flex items-center justify-between'>


        <h2 className="text-2xl font-bold mb-4">Generated Tests</h2>
        <div className='flex items-center justify-center gap-2'>
        
        <button
          onClick={downloadTests}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        >
          Download All Tests
        </button>
        <button
          onClick={handleRunAllTests}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-black hover:text-white mb-4 ${processingAll ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={processingAll}
        >
          {processingAll ? `Processing Test ${currentTestIndex + 1} of ${tests.length}` : 'Run All Tests'}
        </button></div>
</div>
        <div className='flex mb-2 gap-2'>
            <p className='flex text-center gap-2'><strong>No. Tests:</strong> {tests?.length}</p>
            <p className='flex text-center gap-2'><strong className='text-green-400'>No. Success:</strong> {tests.filter(test => test.result === 'success').length}</p>
            <p className='flex text-center gap-2'><strong className='text-red-400'>No. Failures:</strong> {tests.filter(test => test.result === 'failure').length}</p>
        </div>

        <div>
          {tests.map((test, index) => (
            <div
              key={index}
              className={`mb-4 p-4 border rounded ${test.result === 'success' ? 'border-green-500' : test.result === 'failure' ? 'border-red-500' : 'border-gray-200'}`}
            >
              <h3 className="font-bold">Test {index + 1}</h3>
              <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(test, null, 2)}</pre>
              <button
                onClick={() => handleRunTest(test, index)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
              >
                Run Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitTestCreator;
