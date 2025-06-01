/*
  # Create contacts table for storing contact form submissions

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `contacts` table
    - Add policy for authenticated users to read their own submissions
    - Add policy for anyone to insert new contacts
*/

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contacts"
  ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');