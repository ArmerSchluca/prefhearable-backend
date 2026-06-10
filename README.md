# Prefhearable

> **Prefhearable** is a mobile data collection instrument developed to standardize the assessment of personal **hearing preferences** based on psychoacoustic and contextual data with special focus on health-related wellbeeing. 

This app serves as a large-scale crowdsourcing tool to build a comprehensive, standardized dataset for audiology and hearing research. The long-term goal of this dataset is to enable advanced **Auditory Profiling** using Machine Learning.

This repository contains the source code for the mobile application developed as part of a Bachelor's Thesis: 
*"Entwicklung eines mobilen Erhebungsinstruments zur standardisierten Erfassung persönlicher Hörpräferenzen auf Basis psychoakustischer und kontextueller Daten"*.

---

## Purpose & Scope

⚠️ **Note:** *Prefhearable is strictly a data collection and crowdsourcing tool. It does not perform data analysis or machine learning evaluation on the device.*

To train robust machine learning models for auditory profiling, researchers require a vast amount of diverse data. This app bridges the gap between lab research and the real world by allowing users to contribute data seamlessly via their smartphones.

### Key Features of the App:
* **Psychoacoustic Testing:** Seamless, user-friendly mobile audio tests to capture hearing characteristics.
* **Contextual Data Harvesting:** Gathering situational data (e.g., environmental noise levels, user activity, or time of day) to understand *where* and *how* people listen.
* **Standardized Dataset Creation:** Consolidating user inputs into a structured format ready for future big data and AI analysis.

---

## Tech Stack & Architecture

* **Backend Framework:** Node.js with Express.js
* **Database:** MariaDB
* **API Style:** REST API

## Setup

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and a running instance of [MariaDB](https://mariadb.org/) installed.

### Installation & Run

1. Clone this repository:
```bash
git clone https://git.rchw.de/Prefhearable/server.git
```

2. Create a new .env file on root level of the project and fill in the variables with proper values of your database instance:
```bash
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DATABASE=
```

3. Start the server:
```bash
npm run dev
```