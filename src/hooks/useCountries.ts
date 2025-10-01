import { useState, useEffect } from 'react';
import { Country } from '@/types/auth';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd');
        const data = await response.json();
        
        const formattedCountries: Country[] = data
          .filter((country: { idd?: { root?: string; suffixes?: string[] } }) => country.idd?.root && country.idd?.suffixes?.[0])
          .map((country: { name: { common: string }; cca2: string; idd: { root: string; suffixes: string[] } }) => ({
            name: country.name.common,
            code: country.cca2,
            dial_code: `${country.idd.root}${country.idd.suffixes[0]}`,
            flag: `https://flagcdn.com/24x18/${country.cca2.toLowerCase()}.png`,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);
      } catch (err) {
        setError('Failed to fetch countries');
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};
