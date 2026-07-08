# WebdriverIO E2E Test Framework

This project contains end-to-end tests written using WebdriverIO.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd interview_framework
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

## Running the Tests

To run the tests, execute the following command from the root of the project:

```bash
npm run wdio
```

This command will start the WebdriverIO test runner, which will execute the spec files located in the `src/specs` directory.

## Test Framework Structure

I've placed environment variables into a `environments.ts` file, and into a "qa" section so that tests can grab the relevant data and links can be changed depending on use case and version. 

Page object files have been created for each encountered page and are placed into a `pages` folder and each extends a base page object. 

Tests files have been created based on test cases and are placed into a `specs` folder. 

I've chosen not to chain the tests together and instead keep them seperate to allow parallel execution, running the tests using the above command will be similar to chaining them but we get the benefit of isolated testing.

## Test Cases Documentation

Test cases and their documentation are found in the `TESTCASES.md` file

## Bug Reports 

Bug reports are found in the `BUGS.md` file

