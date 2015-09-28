--- Data formatting SQL to be run in CartoDB
--- NOTE: if updating your data change the table names before running these queries!

--- For the acs_5_year_2013 table:
--- assumes you have columns for median_household_income & total_population,
--- steps: first merge the ACS data to census tract polygons, 
--- create columns for new values, populate columns, 
--- create new columns for formatted data, populated columns with formatted data

-- add columns for population density, median_household_income, etc.
ALTER TABLE acs_5yr_2013_merge 
  ADD COLUMN area numeric,
  ADD COLUMN ppl_per_sq_mi numeric,
  ADD COLUMN percent_hispanic numeric,
  ADD COLUMN percent_nonhispanic_asian numeric,
  ADD COLUMN percent_nonhispanic_black numeric,
  ADD COLUMN percent_nonhispanic_white numeric;

-- populate the above columns using the following calculations
UPDATE acs_5yr_2013_merge 
  SET area = (ST_Area(the_geom::geography) * POWER(0.000621371, 2)),
  SET ppl_per_sq_mi = round(totpop / area),
  SET percent_hispanic = '',
  SET percent_nonhispanic_asian = '',
  SET percent_nonhispanic_black = '',
  SET percent_nonhispanic_white = '';

--- add new columns for the formatted data 
alter table acs_5yr_2013_merge 
  add column pct_hispanic_formatted text,
  add column pct_nonhispanic_asian_formatted text,
  add column pct_nonhispanic_black_formatted text,
  add column pct_nonhispanic_white_formatted text,
  add column median_income_formatted text,
  add column ppl_per_sqmi_formatted text;

--- populate new columns with the formatted data 
update acs_5yr_2013_merge 
  set pct_hispanic_formatted = (percent_hispanic * 100)::text || '%',
  set pct_nonhispanic_asian_formatted = (percent_nonhispanic_asian * 100)::int::text || '%',
  set pct_nonhispanic_black_formatted = (percent_nonhispanic_black * 100)::int::text || '%',
  set pct_nonhispanic_white_formatted = (percent_nonhispanic_white * 100)::int::text || '%',
  set median_income_formatted = '$' || to_char(median_household_income, '999G999G999'),
  set ppl_per_sqmi_formatted = to_char(people_per_square_mile,'999G999G999');

--- delete original data columns as they're no longer needed
alter table acs_5yr_2013_merge 
  drop column percent_hispanic restrict,
  drop column percent_nonhispanic_asian restrict,
  drop column percent_nonhispanic_black restrict,
  drop column percent_nonhispanic_white restrict,
  drop column median_household_income restrict,
  drop column people_per_square_mile restrict;

--- rename new columns to be more human readable when displayed in infowindows
alter table acs_5yr_2013_merge 
  rename column pct_hispanic_formatted to percent_hispanic,
  rename column pct_nonhispanic_white_formatted to percent_nonhispanic_white,
  rename column pct_nonhispanic_asian_formatted to percent_nonhispanic_asian,
  rename column pct_nonhispanic_black_formatted to percent_nonhispanic_black,
  rename column median_income_formatted to median_household_income,
  rename column ppl_per_sqmi_formatted to people_per_square_mile; 

--- Finally, create a new table containing only the columns we need
--- Run this code in the CartoDB editor, then do "save table from query"
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

