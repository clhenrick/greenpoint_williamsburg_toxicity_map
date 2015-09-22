--- Data formatting SQL to be run in CartoDB
--- NOTE: if updating your data change the table name before running these queries

--- For the acs_5_year_2013 table:
--- First create a new table with only columns we need
SELECT 
       percent_hispanic, 
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
FROM 
       acs_5yr_2013_merge;

--- TO DO: condense the formatting code from here to line 38
-- ALTER TABLE acs_5yr_2013_copy ADD COLUMN per_hispanic numeric;
-- ALTER TABLE acs_5yr_2013_copy ADD COLUMN per_nonhis_asian numeric;
-- ALTER TABLE acs_5yr_2013_copy ADD COLUMN per_nonhis_black numeric;
-- ALTER TABLE acs_5yr_2013_copy ADD COLUMN per_nonhis_white numeric;

-- UPDATE acs_5yr_2013_copy SET per_hispanic = round(percent_hispanic::numeric,2);
-- UPDATE acs_5yr_2013_copy SET per_nonhis_asian = round(percent_nonhispanic_asian::numeric,2);
-- UPDATE acs_5yr_2013_copy SET per_nonhis_black = round(percent_nonhispanic_black::numeric,2);
-- UPDATE acs_5yr_2013_copy SET per_nonhis_white = round(percent_nonhispanic_white::numeric,2);

-- ALTER TABLE acs_5yr_2013_copy DROP COLUMN percent_hispanic;
-- ALTER TABLE acs_5yr_2013_copy DROP COLUMN percent_nonhispanic_asian;
-- ALTER TABLE acs_5yr_2013_copy DROP COLUMN percent_nonhispanic_black;
-- ALTER TABLE acs_5yr_2013_copy DROP COLUMN percent_nonhispanic_white;

-- ALTER TABLE acs_5yr_2013_copy per_hispanic RENAME TO percent_hispanic;
-- ALTER TABLE acs_5yr_2013_copy RENAME COLUMN per_nonhis_asian TO percent_nonhispanic_asian;
-- ALTER TABLE acs_5yr_2013_copy RENAME COLUMN per_nonhis_black TO percent_nonhispanic_black;
-- ALTER TABLE acs_5yr_2013_copy RENAME COLUMN per_nonhis_white TO percent_nonhispanic_white;

--- add new columns for the formatted data 
alter table acs_5yr_2013_merge_copy add column pct_hispanic_formatted text;
alter table acs_5yr_2013_merge_copy add column pct_nonhispanic_asian_formatted text;
alter table acs_5yr_2013_merge_copy add column pct_nonhispanic_black_formatted text;
alter table acs_5yr_2013_merge_copy add column pct_nonhispanic_white_formatted text;
alter table acs_5yr_2013_merge_copy add column median_income_formatted text;
alter table acs_5yr_2013_merge_copy add column ppl_per_sqmi_formatted text;

--- populate new columns with the formatted data 
update acs_5yr_2013_merge_copy set pct_hispanic_formatted = (percent_hispanic * 100)::text || '%';
update acs_5yr_2013_merge_copy set pct_nonhispanic_asian_formatted = (percent_nonhispanic_asian * 100)::int::text || '%';
update acs_5yr_2013_merge_copy set pct_nonhispanic_black_formatted = (percent_nonhispanic_black * 100)::int::text || '%';
update acs_5yr_2013_merge_copy set pct_nonhispanic_white_formatted = (percent_nonhispanic_white * 100)::int::text || '%';
update acs_5yr_2013_merge_copy set median_income_formatted = '$' || to_char(median_household_income, '999G999G999');
update acs_5yr_2013_merge_copy set ppl_per_sqmi_formatted = to_char(people_per_square_mile,'999G999G999');

--- delete original data columns as they're no longer needed
alter table acs_5yr_2013_merge_copy drop column percent_hispanic restrict;
alter table acs_5yr_2013_merge_copy drop column percent_nonhispanic_asian restrict;
alter table acs_5yr_2013_merge_copy drop column percent_nonhispanic_black restrict;
alter table acs_5yr_2013_merge_copy drop column percent_nonhispanic_white restrict;
alter table acs_5yr_2013_merge_copy drop column median_household_income restrict;
alter table acs_5yr_2013_merge_copy drop column people_per_square_mile restrict;

--- rename new columns to be more readable
alter table acs_5yr_2013_merge_copy rename column pct_hispanic_formatted to percent_hispanic;
alter table acs_5yr_2013_merge_copy rename column pct_nonhispanic_white_formatted to percent_nonhispanic_white;
alter table acs_5yr_2013_merge_copy rename column pct_nonhispanic_asian_formatted to percent_nonhispanic_asian;
alter table acs_5yr_2013_merge_copy rename column pct_nonhispanic_black_formatted to percent_nonhispanic_black;
alter table acs_5yr_2013_merge_copy rename column median_income_formatted to median_household_income;
alter table acs_5yr_2013_merge_copy rename column ppl_per_sqmi_formatted to people_per_square_mile; 

COMMIT;

-- UPDATE acs_5yr_2013_merge_copy 
-- SET rounded_mhhi = a.rounded_mhhi 
-- FROM acs_5yr_2013_merge a 
-- WHERE acs_5yr_2013_merge_copy.cartodb_id = a.cartodb_id