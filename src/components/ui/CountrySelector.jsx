import { useState } from 'react'

const CountrySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'United States',
    icon: 'flag-us',
  })

  const countries = [
    { name: 'United States' },
    { name: 'Germany' },
    { name: 'France' },
    { name: 'Japan' },
    { name: 'United Kingdom' },
    { name: 'Canada' },
    { name: 'Italy' },
    { name: 'Spain' },
    { name: 'Australia' },
    { name: 'Brazil' },
    { name: 'India' },
    { name: 'South Korea' },
    { name: 'Mexico' },
    { name: 'Netherlands' },
    { name: 'Sweden' }
    ]


  const toggleDropdown = () => setIsOpen(!isOpen)
  const selectCountry = (country) => {
    setSelectedCountry(country)
    setIsOpen(false)
  };

  return (
    <div className="relative inline-block text-left">
      <button
        data-test-id="select-location"
        type="button"
        onClick={toggleDropdown}
        className="group flex items-center border border-gray-300 rounded px-4 py-2 w-full lg:w-auto lg:mx-auto"
        title="Select your country"
      >
        <div
          data-uds-child="text-label"
          aria-hidden="false"
          className="relative font-bold uppercase text-sm lg:text-base"
        >
          {selectedCountry.name}
        </div>
      </button>

      {isOpen && (
        <ul className="absolute z-10 bottom-full mb-2 bg-white border border-gray-300 rounded shadow-lg w-full max-h-48 overflow-y-auto">
          {countries.map((country) => (
            <li
              key={country.name}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => selectCountry(country)}
            >
              
              <span className="text-sm text-black">{country.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CountrySelector
