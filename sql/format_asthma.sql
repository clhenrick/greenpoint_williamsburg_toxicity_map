-- rename asthma column

-- Update asthma Set asthma5ypop = ( Asthma5y / totpop ) *1000
-- Update asthma Set rounyed_asthma5ypop = round(asthma5ypop)
alter table asthma_5yr rename column asthptot to asthma_rate_per_1000_people;