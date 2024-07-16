# Unit Test Creator

The Unit Test Creator is a React component designed to help developers easily create and test unit tests for their API endpoints. With this tool, you can upload a JSON file containing endpoint details, generate unit tests, and run them to get instant feedback on the success or failure of each test.

## Features

- **Upload JSON File**: Upload a JSON file with endpoint details to create unit tests in bulk.
- **Generate Unit Tests**: Automatically generate unit tests based on the provided endpoint details.
- **Run Tests**: Execute the generated unit tests and see the results in real-time.
- **Visual Feedback**: Tests that pass will be highlighted in green, and tests that fail will be highlighted in red.
- **Download Tests**: Download all generated unit tests in a zip folder with customizable names.

## How to Use

### Step 1: Declare the Component

To use the Unit Test Creator, simply declare it as a component in your React application:

```jsx
import UnitTestCreator from './path/to/UnitTestCreator';

function App() {
  return (
    <div className="App">
      <UnitTestCreator />
    </div>
  );
}

export default App;
```

### Step 2: Set the Base URL

Before uploading your JSON file, make sure to enter the base URL for your API endpoints. This ensures that all endpoints are correctly prefixed with the base URL.

### Step 3: Upload JSON File

Upload a JSON file containing the endpoint details. The JSON file should have the following structure:

```
[
  {
    "endpoint": "/generate-schema",
    "method": "POST",
    "description": "Generate a MongoDB schema based on the provided description.",
    "input": {
      "apiKey": "your-api-key",
      "description": "Schema for a user database",
      "model": "gpt-3.5-turbo"
    },
    "output": {
      "schema": "...",
      "prompt_sent": "...",
      "response_data": {
        "...": "..."
      }
    }
  },
  {
    "endpoint": "/generate-tkinter",
    "method": "POST",
    "description": "Generate a Tkinter GUI based on the provided description.",
    "input": {
      "apiKey": "your-api-key",
      "description": "GUI for a simple calculator",
      "model": "gpt-3.5-turbo"
    },
    "output": {
      "tkinter": "...",
      "prompt_sent": "...",
      "response_data": {
        "...": "..."
      }
    }
  }
]
```


### Step 4: Generate and Run Tests
After uploading the JSON file, the Unit Test Creator will generate unit tests for each endpoint. You can then run each test individually or run all tests in sequence.

### Step 5: Download Tests
Once the tests are generated, you can download them all in a zip folder. You can also customize the name of the zip folder before downloading.

Example JSON
Here's an example JSON file for uploading:

```
[
  {
    "endpoint": "/generate-schema",
    "method": "POST",
    "description": "Generate a MongoDB schema based on the provided description.",
    "input": {
      "apiKey": "your-api-key",
      "description": "Schema for a user database",
      "model": "gpt-3.5-turbo"
    },
    "output": {
      "schema": "...",
      "prompt_sent": "...",
      "response_data": {
        "...": "..."
      }
    }
  },
  {
    "endpoint": "/generate-tkinter",
    "method": "POST",
    "description": "Generate a Tkinter GUI based on the provided description.",
    "input": {
      "apiKey": "your-api-key",
      "description": "GUI for a simple calculator",
      "model": "gpt-3.5-turbo"
    },
    "output": {
      "tkinter": "...",
      "prompt_sent": "...",
      "response_data": {
        "...": "..."
      }
    }
  }
]
```


### Important Note
Ensure that you enter a base URL before uploading your JSON file. If you do not set the base URL, the requests will fail due to incorrect endpoint URLs.

License
This project is licensed under the MIT License.

Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue.

Contact
For questions or support, please contact your-email@example.com.
