create function check_orders() returns trigger
as $check_orders$
begin
  if exists (select count(*) from "order" o where o.status_id in (1, 2, 3, 4) and o.user_id = old.id)
  then
  raise exception 'This user cannot be deleted, he/she has unfinished orders!';
  else
  return old;
  end if;
end;
$check_orders$ language plpgsql;

create trigger delete_user before delete
on "user"
for each row
execute procedure check_orders();