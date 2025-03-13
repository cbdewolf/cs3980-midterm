# cs3980-midterm

## Overview

This is my Midterm Project for CS:3980, Web Application Development With Python, Spring 2025. We were tasked with creating a simple TODO-like web application, with the main goals being
- Able to create a virtual environment for Python projects
- Able to set up FastAPI projects
- Able to create CRUD API endpoints
- Able to connect front end with back end using HTTP calls

My project is a Payment Tracker App, which looked to bring organization towards various scheduled payments that a user may have in their life. 

## How to Demo 

### 1. Clone the Repository 
First off, clone this repository and open it using whatever IDE you see fit.
### 2. Setup Virtual Environment 
Next, you'll need to setup the a virtual environment for this project, and install all necessary packages. 

For Windows, input these commands into the terminal to create and activate :
```powershell
python -m venv venv
.\venv\Scripts\activate
```

For MacOS: 
```bash
python -m venv venv
source ./venv/bin/activate
```

Next, you'll need to install all packeges used in the project, in your terminal, input this command: 
```powershell
pip install -r requirements.txt
```

Now your virtual environment is ready to demo the project!

### 3. Launch the app

To launch the app, input this command into the terminal:

```powershell
(venv)$ uvicorn main:app --port 8000 --reload
```

The terminal will then launch the app, and prompt you with this text:
![image](https://github.com/user-attachments/assets/6740c212-5f7d-4c73-94c8-ec5fbfdfea64)
Hold down control (command on MacOS), and click on **http://127.0.0.1:8000**, this will open up the app in your preferred browser.

Now you're done! The app is ready to be used. 

## How To Use The App
As mentioned before, the main purpose of the application is to create CRUD API endpoints. Here is how you can use each aspect (Create, Read, Update, Delete) in the app. 

### Create 
To add a new scheduled payment, simply click the "Add New Payment" button, where the use will then be prompted to create a new payment.
![image](https://github.com/user-attachments/assets/f5731fd8-b8de-4846-a474-ee54bd2a2156)
Once the modal is filled out, the payment will be added to the UI. 
![image](https://github.com/user-attachments/assets/41adb7d1-1565-4433-94c8-cd30b198bbee)

### Read
With the added payment, you can see the UI rendering the new data that has been added to the UI. Therefor, the READ is satisfied! 

### Update
Any payment can be updated when you click the ![image](https://github.com/user-attachments/assets/d3db41de-ff65-4cec-9c03-50cb239d50c6) icon at the bottom of the payment.
The user will be prompted with the same modal as when they added a payment, where they can then edit it as desired. 
![image](https://github.com/user-attachments/assets/85f8088d-1bbb-4b5d-b2aa-0305ebc8f5cf)
In this example, I changed the due date. Notice the OVERDUE text next to the due date, this will show whenever a payment is in the "Not Paid" state after the due date passes.

### Delete
To delete a payment, ![image](https://github.com/user-attachments/assets/6c5eaf95-9ca2-4ab7-9ee2-968173494f46) icon at the bottom of the payment. The user will be prompted to confirm the deletion, and once confirmed, the payment will be removed from the list. 








