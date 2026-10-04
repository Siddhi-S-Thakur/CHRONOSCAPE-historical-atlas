import React from 'react';
import { useTemporal } from '../../../context/TemporalContext';
import { PLACES } from '../../../data/places';
import { Place } from '../../../types';

export const CityMarkersLayer: React.FC = () => {
  const { 
    selectPlace, 
    selectedEntity, 
    setHoveredEntity, 
    currentAnchor 
  } = useTemporal();

  // In 1857 revolt mode, dim city markers slightly to highlight revolt hubs
  const isRevolt = currentAnchor.id === 'revolt';
  const layerOpacity = isRevolt ? 0.35 : 1.0;
  const places = Object.values(PLACES) as Place[];

  return (
    <g id="map-cities-layer" opacity={layerOpacity} className="transition-opacity duration-500 select-none">
      {places.map((place: Place) => {
        const [cx, cy] = place.coordinates;
        const isSelected = selectedEntity?.type === 'place' && selectedEntity.data.id === place.id;
        const isPataliputra = place.id === 'pataliputra';
        const isRaigad = place.id === 'raigad';

        return (
          <g
            key={place.id}
            id={`city-marker-${place.id}`}
            className="cursor-pointer group"
            onClick={() => selectPlace(place.id)}
            onMouseEnter={() =>
              setHoveredEntity({
                name: place.name,
                details: `${place.role} • Click to zoom`,
              })
            }
            onMouseLeave={() => setHoveredEntity(null)}
          >
            {/* Animated Pulse Ring for Imperial Capital / Special Sites */}
            {(isPataliputra || isSelected) && (
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 16 : 10}
                fill={isPataliputra ? '#C5A059' : '#E2DDD3'}
                className="animate-ping-slow opacity-60 pointer-events-none"
              />
            )}

            {/* Core Circle Marker */}
            <circle
              cx={cx}
              cy={cy}
              r={isSelected ? 6 : (isPataliputra || isRaigad ? 5 : 4)}
              fill={isSelected ? '#F7E7C4' : (isPataliputra ? '#F4E6C3' : (isRaigad ? '#E07A5F' : '#E2DDD3'))}
              stroke={isSelected ? '#C5A059' : '#121620'}
              strokeWidth={isSelected ? 2.5 : 1.5}
              className="transition-transform group-hover:scale-125 filter drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]"
            />

            {/* City Name Inscription */}
            <text
              x={cx + 10}
              y={cy - 4}
              fontFamily="'Cinzel', serif"
              fontSize={isSelected ? '13' : (isPataliputra ? '12.5' : '10.5')}
              fontWeight={isPataliputra || isSelected ? '700' : '600'}
              fill={isSelected ? '#FADB8C' : '#EAE6DC'}
              className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] group-hover:fill-[#FADB8C] transition-colors"
            >
              {place.name}
            </text>

            {/* City Subtitle / Role Tag */}
            <text
              x={cx + 10}
              y={cy + 8}
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="8.5"
              fill={isSelected ? '#D1D7E5' : '#8893A8'}
              className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] group-hover:fill-[#CCD2E0] transition-colors"
            >
              {place.role}
            </text>
          </g>
        );
      })}
    </g>
  );
};
