-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Extends Supabase Auth)
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Policies for Users
create policy "Public profiles are viewable by everyone." on public.users
  for select using (true);

create policy "Users can insert their own profile." on public.users
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.users
  for update using (auth.uid() = id);

-- SEATS TABLE
create table public.seats (
  id uuid default uuid_generate_v4() primary key,
  seat_number text not null unique,
  is_occupied boolean default false,
  layout_position jsonb, -- e.g. { "x": 10, "y": 20 }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.seats enable row level security;

create policy "Seats are viewable by everyone." on public.seats
  for select using (true);
  
create policy "Admins can insert/update seats." on public.seats
  for all using (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  plan_type text not null, -- 'monthly', 'quarterly'
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  status text default 'pending' check (status in ('active', 'expired', 'pending')),
  razorpay_subscription_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscriptions." on public.subscriptions
  for select using (auth.uid() = user_id);

create policy "Admins can view all subscriptions." on public.subscriptions
  for select using (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

-- BOOKINGS TABLE
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  seat_id uuid references public.seats(id) not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  status text default 'active' check (status in ('active', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.bookings enable row level security;

create policy "Users can view own bookings." on public.bookings
  for select using (auth.uid() = user_id);

create policy "Admins can view all bookings." on public.bookings
    for select using (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

-- PAYMENTS TABLE
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  amount numeric not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payments enable row level security;

create policy "Users can view own payments." on public.payments
  for select using (auth.uid() = user_id);
  
-- TRIGGER to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
