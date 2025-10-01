'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Country } from '@/types';

interface CountrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  countries: Country[];
}

export function CountrySelect({ value, onValueChange, countries }: CountrySelectProps) {
  const [open, setOpen] = useState(false);

  const selectedCountry = countries.find(country => country.dial_code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-4 h-3" />
              <span>{selectedCountry.dial_code}</span>
            </div>
          ) : (
            "Select country..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-auto">
            {countries.map((country) => (
              <CommandItem
                key={country.code}
                value={`${country.name} ${country.dial_code}`}
                onSelect={() => {
                  onValueChange(country.dial_code);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === country.dial_code ? "opacity-100" : "opacity-0"
                  )}
                />
                <img src={country.flag} alt={country.name} className="w-4 h-3 mr-2" />
                <span className="flex-1">{country.name}</span>
                <span className="text-muted-foreground">{country.dial_code}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
