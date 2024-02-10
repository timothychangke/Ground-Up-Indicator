# Hack4Good 2024

## Problem Statement
To develop and implement a robust and reliable system for Ground-Up Initiative to accurately track and measure the number of people impacted by volunteering efforts, as well as assess the depth and nature of this impact.

## Our Solution
The Ground-Up Indicator (GUI) endeavors to quantify the impact of the organization's social initiatives to determine whether there is indeed a psychological influence on individuals, particularly regarding enhancements in their environmental consciousness. Our all-in-one solution comprises a carbon footprint tracker, a nature immersion tracker, sentiment analysis for reflective feedback, and a centralized dashboard to visualize aggregated data. This holistic solution seeks to provide an assessment of individuals' environmental conservation levels before and after engaging with Ground Up Initiative's conservation activities, thereby calculating the attributable change brought about by their events.

https://github.com/timothychangke/hack4Good/assets/101695218/0a33d547-5408-440d-aa8d-e33a74ad6867

## Features and Components
### Carbon Footprint Trackee 
Allows users to track their carbon footprint before and after participating in volunteering activities, providing insights into their environmental impact.
### Time Spent in Nature Tracker
Records the amount of time users spend in natural environments during volunteering activities, promoting environmental stewardship and well-being.
### Sentiment towards Nature Analysis using NLP
Utilizes Natural Language Processing (NLP) to analyze users' sentiment towards nature based on their feedback and interactions. This helps assess the qualitative impact of volunteering experiences.
### Dashboard
Provides administrators with a comprehensive view of trends and data, including volunteer engagement, environmental impact metrics, and sentiment analysis results.

## Technologies Used
### MongoDB
A NoSQL database used for storing user data, activity logs, and sentiment analysis results.
### ExpressJS
A web application framework for Node.js used to build the backend API and handle HTTP requests.
### ReactJS
A JavaScript library for building user interfaces used to create the frontend interface for volunteers and administrators.
### Node.js
A JavaScript runtime environment used for server-side scripting and running the backend of the application.
### Sentiment Analysis with NLP
Utilizes Natural Language Processing (NLP) techniques for sentiment analysis. We employ the Roberta model pretrained on various Twitter datasets to detect colloquial terms and expressions in users' feedback. This algorithm allows our application to analyze sentiments and store corresponding values in our database. Constantly tracking these opinions of users enables our application to display to the organization how positively or negatively users' experiences and outlooks have changed before and after participating in activities.

## What's next
We aim to test the application with more users to gain a better understanding of its strengths and shortcomings. Additionally, we plan to continuously improve the user experience, add more features based on user feedback, and optimize performance for scalability.

## Getting started
1. Clone the repository to your local machine.
2. go to ./server and run `npm install`
3. run `npm start`
4. go to ./client and run `npm install`
5. Add in JWT Secret Token as `JWT_SECRET`, and mongo uri as `MONGO_URL` in YOUR .env file
6. run `npm run dev`
