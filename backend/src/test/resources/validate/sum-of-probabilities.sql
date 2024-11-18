SELECT  type, grade, part, level, position, SUM(probability) probabilities
FROM potential
GROUP BY type, grade, part, level, position
ORDER BY probabilities DESC;
