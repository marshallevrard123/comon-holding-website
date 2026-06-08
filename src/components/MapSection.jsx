import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './MapSection.module.css'

// ── Fix icônes Leaflet avec Vite ──
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// ── Crée un marqueur SVG coloré ──
function createColorMarker(color) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 36px; height: 36px; border-radius: 50% 50% 50% 0;
        background: ${color}; border: 3px solid #fff;
        box-shadow: 0 3px 14px rgba(0,0,0,0.4);
        transform: rotate(-45deg);
        display: flex; align-items: center; justify-content: center;
      ">
        <div style="
          width: 10px; height: 10px; background: #fff; border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize:   [36, 36],
    iconAnchor: [18, 36],
    popupAnchor:[0, -40],
  })
}

// ── Recadre la carte sur les marqueurs ──
function FitBounds({ locations }) {
  const map = useMap()
  useEffect(() => {
    if (locations.length === 1) {
      map.setView([locations[0].lat, locations[0].lng], 14)
    } else if (locations.length > 1) {
      const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]))
      map.fitBounds(bounds, { padding: [60, 60] })
    }
  }, [locations, map])
  return null
}

/**
 * MapSection — carte interactive avec marqueurs cliquables
 *
 * Props :
 *  - locations : [{
 *      name, sector, address, slug, color,
 *      lat, lng, isHolding?
 *    }]
 *  - title      : string (optionnel)
 *  - subtitle   : string (optionnel)
 *  - height     : string (défaut "520px")
 *  - singleMode : boolean — true pour page filiale (1 marqueur, zoom fort)
 */
export default function MapSection({
  locations = [],
  title = 'Nos implantations',
  subtitle = 'Cliquez sur un marqueur pour découvrir la filiale',
  height = '520px',
  singleMode = false,
}) {
  const center = locations.length === 1
    ? [locations[0].lat, locations[0].lng]
    : [6.2, -5.5]   // Centre Côte d'Ivoire par défaut

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="label">Localisation</p>
          <h2>{title}</h2>
          <div className="divider divider-center" />
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>

      <div className={styles.mapWrapper} style={{ height }}>
        <MapContainer
          center={center}
          zoom={singleMode ? 14 : 7}
          style={{ width: '100%', height: '100%' }}
          zoomControl={true}
          scrollWheelZoom={false}
        >
          {/* Fond de carte gris clair (CartoDB light) */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            maxZoom={19}
          />

          <FitBounds locations={locations} />

          {locations.map((loc) => (
            <Marker
              key={loc.slug || loc.name}
              position={[loc.lat, loc.lng]}
              icon={createColorMarker(loc.color || '#8B1A1A')}
            >
              <Popup className={styles.popup}>
                <div className={styles.popupInner}>
                  {loc.isHolding && (
                    <span className={styles.popupBadge}>Siège</span>
                  )}
                  <p className={styles.popupSector}>{loc.sector}</p>
                  <h3 className={styles.popupName}>{loc.name}</h3>
                  <p className={styles.popupAddress}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill={loc.color || '#8B1A1A'} style={{ marginRight: 6, flexShrink: 0 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {loc.address}
                  </p>
                  {loc.slug && !loc.isHolding && (
                    <Link
                      to={`/${loc.slug}`}
                      className={styles.popupLink}
                      style={{ background: loc.color || '#8B1A1A' }}
                    >
                      Voir la filiale <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  )
}
