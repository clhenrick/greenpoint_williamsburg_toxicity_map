-- Data formatting SQL to be run in CartoDB
-- NOTE: if updating your data change the table name before running these queries

BEGIN;
-- For the acs_5_year_2013 table:
-- First create a new table with only columns we need
SELECT percent_hispanic, 
       percent_nonhispanic_asian, 
       percent_nonhispanic_black,
       percent_nonhispanic_white,
       median_household_income,
       people_per_square_mile,
       rounded_mhhi,
       roundedcpop,
       cartodb_id,
       the_geom,
       the_geom_webmercator
FROM acs_5yr_2013_merge;

-- add new columns for the formatted data 
alter table acs_5yr_2013_merge_copy add column pct_hispanic_formatted text;
alter table acs_5yr_2013_merge_copy add column pct_nonhispanic_asian_formatted text;
alter table acs_5yr_2013_merge_copy add column pct_nonhispanic_black_formatted text;
alter table acs_5yr_2013_merge_copy add column pct_nonhispanic_white_formatted text;
alter table acs_5yr_2013_merge_copy add column median_income_formatted text;

-- populate new columns with the formatted data 
update acs_5yr_2013_merge_copy set pct_hispanic_formatted = (percent_hispanic * 100)::text || '%';
update acs_5yr_2013_merge_copy set pct_nonhispanic_asian_formatted = (percent_nonhispanic_asian * 100)::int::text || '%';
update acs_5yr_2013_merge_copy set pct_nonhispanic_black_formatted = (percent_nonhispanic_black * 100)::int::text || '%';
update acs_5yr_2013_merge_copy set pct_nonhispanic_white_formatted = (percent_nonhispanic_white * 100)::int::text || '%';
update acs_5yr_2013_merge_copy set median_income_formatted = '$' || to_char(median_household_income, '999G999G999');

-- delete original data columns as they're no longer needed
alter table acs_5yr_2013_merge_copy drop column percent_hispanic restrict;
alter table acs_5yr_2013_merge_copy drop column percent_nonhispanic_asian restrict;
alter table acs_5yr_2013_merge_copy drop column percent_nonhispanic_black restrict;
alter table acs_5yr_2013_merge_copy drop column percent_nonhispanic_white restrict;
alter table acs_5yr_2013_merge_copy drop column median_household_income restrict;



COMMIT;

-- UPDATE acs_5yr_2013_merge_copy 
-- SET rounded_mhhi = a.rounded_mhhi 
-- FROM acs_5yr_2013_merge a 
-- WHERE acs_5yr_2013_merge_copy.cartodb_id = a.cartodb_id

UPDATE acs_5yr_2013_merge_copy 
SET roundedcpop = a.roundedcpop 
FROM acs_5yr_2013_merge a 
WHERE acs_5yr_2013_merge_copy.cartodb_id = a.cartodb_id