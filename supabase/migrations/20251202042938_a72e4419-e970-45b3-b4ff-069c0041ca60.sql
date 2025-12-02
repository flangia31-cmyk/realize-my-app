-- Create pharmacies table
CREATE TABLE public.pharmacies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  opening_hours JSONB DEFAULT '{}',
  is_on_call BOOLEAN DEFAULT false,
  has_parking BOOLEAN DEFAULT false,
  is_pmr BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view pharmacies)
CREATE POLICY "Public can view all pharmacies" 
ON public.pharmacies 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_pharmacies_updated_at
BEFORE UPDATE ON public.pharmacies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_pharmacies_is_on_call ON public.pharmacies(is_on_call);
CREATE INDEX idx_pharmacies_location ON public.pharmacies(latitude, longitude);