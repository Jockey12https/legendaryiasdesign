/*
  # Create enrollments table

  1. New Tables
    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `course` (text)
      - `amount` (text)
      - `fullName` (text)
      - `email` (text)
      - `phone` (text)
      - `city` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `enrollments` table
    - Add policy for authenticated users to read their own enrollments
    - Add policy for authenticated users to insert enrollments
*/

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  course text NOT NULL,
  amount text NOT NULL,
  fullName text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert enrollments"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);