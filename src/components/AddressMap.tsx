import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { Search } from 'lucide-react';

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ['places'];

interface Location {
  lat: number;
  lng: number;
}

interface AddressComponent {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface AddressMapProps {
  onAddressSelect: (address: AddressComponent, location: Location) => void;
}

const defaultCenter = { lat: -26.2041, lng: 28.0473 }; // Johannesburg
const mapContainerStyle = { width: '100%', height: '400px' };

const AddressMap: React.FC<AddressMapProps> = ({ onAddressSelect }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<Location>(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: 'za' } },
    debounce: 300,
    cache: 86400,
  });

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarker({ lat, lng });
      reverseGeocode({ lat, lng });
    }
  }, []);

  const reverseGeocode = async (location: Location) => {
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location });
      
      if (response.results[0]) {
        const addressComponents = response.results[0].address_components;
        const formattedAddress = formatAddressComponents(addressComponents);
        onAddressSelect(formattedAddress, location);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  const formatAddressComponents = (components: google.maps.GeocoderAddressComponent[]): AddressComponent => {
    let street = '', city = '', state = '', postalCode = '', country = '';

    components.forEach(component => {
      const type = component.types[0];
      switch (type) {
        case 'street_number':
          street = component.long_name + ' ';
          break;
        case 'route':
          street += component.long_name;
          break;
        case 'locality':
          city = component.long_name;
          break;
        case 'administrative_area_level_1':
          state = component.long_name;
          break;
        case 'postal_code':
          postalCode = component.long_name;
          break;
        case 'country':
          country = component.long_name;
          break;
      }
    });

    return { street, city, state, postalCode, country };
  };

  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      setMarker({ lat, lng });
      map?.panTo({ lat, lng });
      const formattedAddress = formatAddressComponents(results[0].address_components);
      onAddressSelect(formattedAddress, { lat, lng });
    } catch (error) {
      console.error('Error selecting location:', error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="p-4 rounded-lg bg-gold-primary/5 border border-gold-primary/20 text-gold-primary">
        Loading Google Maps...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-primary/50" />
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search for your address..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-charcoal/50 border border-gold-primary/20 focus:border-gold-primary text-light-gray placeholder-gold-primary/30 focus:outline-none"
        />
        {status === 'OK' && (
          <ul className="absolute z-50 w-full mt-1 bg-charcoal border border-gold-primary/20 rounded-lg shadow-lg max-h-60 overflow-auto">
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                className="px-4 py-2 hover:bg-gold-primary/10 cursor-pointer text-light-gray"
              >
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={marker}
        zoom={15}
        onClick={handleMapClick}
        onLoad={map => setMap(map)}
        options={{
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [{ hue: '#B39A38' }]
            },
            {
              featureType: 'water',
              elementType: 'all',
              stylers: [{ saturation: -50 }, { lightness: -50 }]
            }
          ],
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <Marker
          position={marker}
          draggable={true}
          onDragEnd={(e) => {
            if (e.latLng) {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              setMarker({ lat, lng });
              reverseGeocode({ lat, lng });
            }
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default AddressMap;