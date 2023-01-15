create function check_orders() returns trigger
as $check_orders$
begin
	if exists (select o.id 
						 from "order" o 
						 join "order_status" os 
						 on o.status_id = os.id 
						 where os.name != 'Completed' and os.name != 'Cancelled' and o.user_id = old.id)
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