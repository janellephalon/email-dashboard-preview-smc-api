
# Secure Email Inbox Integration in Admin Dashboard

## Description
This React-based admin dashboard is tailored for professionals in regulated industries who require secure communication channels. We've integrated the DataMotion Secure Message Center API to provide a seamless and secure email experience right within the dashboard. This integration allows users to stay on top of their workload by accessing their secure email inbox without needing to switch between different applications.

![Dashboard](https://github.com/janellephalon/email-dashboard-preview-smc-api/assets/95178236/b35c113e-ff4d-4c0c-922a-94a3473059b8)

## Table of Contents
- [Secure Email Inbox Integration in Admin Dashboard](#secure-email-inbox-integration-in-admin-dashboard)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Resources \& Credits](#resources--credits)

## User Story
```
AS a professional in regulated industries,
I WANT to view a preview of my secure email inbox on my admin dashboard,
SO THAT I can quickly and easily stay on top of my workload and respond to important communications in a timely manner. 
```

## Acceptance Criteria
```
GIVEN a React application with an admin dashboard,
AND integration of DataMotion Secure Message Center API,
WHEN I access the admin dashboard,
THEN I see a dedicated section for the secure email inbox.

GIVEN the server-side implementation,
WHEN the application is running,
THEN the server retrieves a token from DataMotion's token API
AND fetches email data from the Get Message Summary API.

GIVEN the email inbox section in the admin dashboard,
WHEN I view the email inbox,
THEN a list of secure emails is displayed
AND the emails are presented with sender, subject, and date.
```

## Installation 
* `git clone` 
* After cloning, navigate to the project directory.
* Install the required dependencies by running `npm install`.
* Start the application by running `npm start`.
* Navigate to the server directory and start the server by running `node server.js`

## Usage 
* Once you have started the application, it will be accessible at `localhost:3000` (unless otherwise specified) in your web browser.
* Explore the different functionalities of the secure message center.
* If you encounter any issues or have suggestions, feel free to provide feedback or contribute to the project by submitting a pull request.

## Resources & Credits
* [DataMotion SMC API](https://datamotion.com/portal/project/DataMotion/dashboard)
* [Core UI Free React Admin Template](https://github.com/coreui/coreui-free-react-admin-template)
* [React Documentation](https://reactjs.org/)
* [DataMotion API Documentation](https://developers.datamotion.com/)

