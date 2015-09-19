-- Data formatting SQL to be run in CartoDB
-- NOTE: if updating your data change the table name before running these queries

-- For the acs 5 year 2013 table:
SELECT percent_hispanic,percent_nonhispanic_asian, percent_nonhispanic_black,percent_nonhispanic_white FROM acs_5yr_2013;
 
ALTER TABLE acs_5yr_2013_copy ADD column per_hispanic numeric;
ALTER TABLE acs_5yr_2013_copy ADD column per_nonhis_asian numeric;
ALTER TABLE acs_5yr_2013_copy ADD column per_nonhis_black numeric;
ALTER TABLE acs_5yr_2013_copy ADD column per_nonhis_white numeric;
UPDATE acs_5yr_2013_copy set per_hispanic = round(percent_hispanic::numeric,2);
UPDATE acs_5yr_2013_copy set per_nonhis_asian = round(percent_nonhispanic_asian::numeric,2);
UPDATE acs_5yr_2013_copy set per_nonhis_black = round(percent_nonhispanic_black::numeric,2);
UPDATE acs_5yr_2013_copy set per_nonhis_white = round(percent_nonhispanic_white::numeric,2);
ALTER TABLE acs_5yr_2013_copy DROP COLUMN percent_hispanic CASCADE;
ALTER TABLE acs_5yr_2013_copy DROP COLUMN percent_nonhispanic_asian CASCADE;
ALTER TABLE acs_5yr_2013_copy DROP COLUMN percent_nonhispanic_black CASCADE;
ALTER TABLE acs_5yr_2013_copy DROP COLUMN percent_nonhispanic_white CASCADE;
ALTER TABLE per_hispanic RENAME TO percent_hispanic;
ALTER TABLE per_nonhis_asian RENAME TO percent_nonhispanic_asian;
ALTER TABLE per_nonhis_black RENAME TO percent_nonhispanic_black;
ALTER TABLE per_nonhis_white RENAME TO percent_nonhispanic_white;


ALTER TABLE acs_5yr_2013_merge_copy add column pct_hispanic_formatted text;
ALTER TABLE acs_5yr_2013_merge_copy add column pct_nonhispanic_asian_formatted text;
ALTER TABLE acs_5yr_2013_merge_copy add column pct_nonhispanic_black_formatted text;
ALTER TABLE acs_5yr_2013_merge_copy add column pct_nonhispanic_white_formatted text;
ALTER TABLE acs_5yr_2013_merge_copy add column median_income_formatted text;
UPDATE acs_5yr_2013_merge_copy set pct_hispanic_formatted = (percent_hispanic * 100)::text || '%';
UPDATE acs_5yr_2013_merge_copy set pct_nonhispanic_asian_formatted = (percent_nonhispanic_asian * 100)::int::text || '%';
UPDATE acs_5yr_2013_merge_copy set pct_nonhispanic_black_formatted = (percent_nonhispanic_black * 100)::int::text || '%';
UPDATE acs_5yr_2013_merge_copy set pct_nonhispanic_white_formatted = (percent_nonhispanic_white * 100)::int::text || '%';
UPDATE acs_5yr_2013_merge_copy set median_income_formatted = '$' || to_char(median_household_income, '999G999G999');