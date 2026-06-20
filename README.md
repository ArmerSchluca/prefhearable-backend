# Prefhearable (Server)

<details>
<summary><b>Expand for details on the project</b></summary>
<br>

> **Prefhearable** is a mobile data collection instrument developed to standardize the assessment of personal **hearing preferences** based on psychoacoustic and contextual data with special focus on health-related wellbeeing.

This app serves as a large-scale crowdsourcing tool to build a comprehensive, standardized dataset for audiology and hearing research. The long-term goal of this dataset is to enable advanced **Auditory Profiling** using Machine Learning.

This repository contains the source code for the mobile application developed as part of a Bachelor's Thesis:
_"Entwicklung eines mobilen Erhebungsinstruments zur standardisierten Erfassung persönlicher Hörpräferenzen auf Basis psychoakustischer und kontextueller Daten"_.

## Purpose & Scope

⚠️ **Note:** _Prefhearable is strictly a data collection and crowdsourcing tool. It does not perform data analysis or machine learning evaluation on the device._

To train robust machine learning models for auditory profiling, researchers require a vast amount of diverse data. This app bridges the gap between lab research and the real world by allowing users to contribute data seamlessly via their smartphones.

### Key Features of the App:

- **Psychoacoustic Testing:** Seamless, user-friendly mobile audio tests to capture hearing characteristics.
- **Contextual Data Harvesting:** Gathering situational data (e.g., environmental noise levels, user activity, or time of day) to understand _where_ and _how_ people listen.
- **Standardized Dataset Creation:** Consolidating user inputs into a structured format ready for future big data and AI analysis.
</details>

## Tech Stack & Architecture

- **Backend Framework:** Node.js with Express.js
- **Database:** MariaDB
- **API Style:** REST API
- **API Documentation:** SwaggerUI -> Aufrufbar über http://localhost:3000/api-docs

## Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and a running instance of [MariaDB](https://mariadb.org/) installed.

### Installation & Run

1. Create directory if not already done:

```bash
mkdir Prefhearable
cd Prefhearable
```

2. Clone repository:

```bash
git clone https://git.rchw.de/Prefhearable/backend.git
```

3. Setup project and dependencies:

```bash
cd backend
npm install
```

4. Create a new .env file on root level of the project and fill in the variables with proper values of your database instance:

```bash
DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DATABASE=your_database_name
```

5. Start the server:

```bash
npm run dev
```
