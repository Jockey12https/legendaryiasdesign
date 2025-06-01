/*
  # Create demo registrations table

  1. New Tables
    - `demo_registrations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `demo_registrations` table
    - Add policy for authenticated users to read their own registrations
    - Add policy for anyone to insert new registrations
*/

CREATE TABLE demo_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE demo_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert demo registrations"
  ON demo_registrations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own demo registrations"
  ON demo_registrations
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');