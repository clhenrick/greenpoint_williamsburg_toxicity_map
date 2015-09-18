-- Data formatting SQL to be run in CartoDB
-- NOTE: if updating your data change the table name before running these queries

-- For the acs 5 year 2013 table:
alter table acs_5yr_2013_merge_copy add column pct_hispanic_formatted text;
alter table acs_5yr_2013_merge_copy add column pct_nonhispanic_asian_formatted text;
alter table acs_5yr_2013_merge_copy add column pct_nonhispanic_black_formatted text;
alter table acs_5yr_2013_merge_copy add column pct_nonhispanic_white_formatted text;
alter table acs_5yr_2013_merge_copy add column median_income_formatted text;
update acs_5yr_2013_merge_copy set pct_hispanic_formatted = (percent_hispanic * 100)::text || '%';
update acs_5yr_2013_merge_copy set pct_nonhispanic_asian_formatted = (percent_nonhispanic_asian * 100)::int::text || '%';
update acs_5yr_2013_merge_copy set pct_nonhispanic_black_formatted = (percent_nonhispanic_black * 100)::int::text || '%';
update acs_5yr_2013_merge_copy set pct_nonhispanic_white_formatted = (percent_nonhispanic_white * 100)::int::text || '%';
update acs_5yr_2013_merge_copy set median_income_formatted = '$' || to_char(median_household_income, '999G999G999');