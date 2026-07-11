`
SELECT *
FROM surveys s
    JOIN personal_data p
      ON p.survey_id = s.id
    JOIN context_data c
      ON c.survey_id = s.id
    JOIN who5_responses w
      ON w.survey_id = s.id
    JOIN eq5d5l_responses e
      ON e.survey_id = s.id
    JOIN ccsm_audiotest_responses ccsm
      ON ccsm.survey_id = s.id
WHERE s.id = 8;
`;
