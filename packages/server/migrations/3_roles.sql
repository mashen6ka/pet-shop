create role client with login noinherit encrypted password 'sf2nce3' connection limit -1;
create role worker with login inherit encrypted password '1gjg5cjk' connection limit -1;
create role admin with login noinherit createdb createrole encrypted password '2jk493hs' connection limit -1;

grant insert, update, select on table public.user to client;
grant insert, select on table public.order to client;
grant select on table public.order_status to client;
grant insert, select on table public.order__product to client;
grant select on table public.product to client;
grant select on table public.product__shop to client;
grant select on table public.manufacturer to client;
grant select on table public.country to client;
grant select on table public.company to client;
grant select on table public.shop to client;
grant select on table public.user__company to client;
grant insert, delete, select on table public.session to client;

grant client to worker;
grant delete on table public.user to worker;
grant update on table public.order to worker;
grant insert, update, delete, select on table public.company to worker;
grant insert, update, delete, select on table public.user__company to worker;
grant update, delete  on table public.order__product to worker;
grant insert, update, delete, select on table public.product__shop to worker;

grant insert, update, delete, select on table public.country to admin;
grant insert, update, delete, select on table public.manufacturer to admin;
grant insert, update, delete, select on table public.order_status to admin;
grant insert, update, delete, select on table public.shop to admin;