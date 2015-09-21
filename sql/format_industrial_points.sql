-- split the sources column so that multiple URLS can be hyperlinked
alter table industrialhistory_points 
  add column source_one text, 
  add column source_two text,
  add column source_three text;

update industrialhistory_points set source_one = split_part(sources, ' / ', 1);
update industrialhistory_points set source_two = split_part(sources, ' / ', 2);
update industrialhistory_points set source_three = split_part(sources, ' / ', 3);

update industrialhistory_points set source_one = split_part(sources, ' ', 1);
update industrialhistory_points set source_two = split_part(sources, ' ', 2) where source_two is not null;
update industrialhistory_points set source_three = split_part(sources, ' ', 3);

update industrialhistory_points set source_two = source_three where source_two is null OR source_two IN ('/',  '');

update industrialhistory_points set source_one = regexp_replace(source_one, ',$', '');
update industrialhistory_points set source_two = regexp_replace(source_two, ',$', '');

alter table industrialhistory_points drop column source_three;
