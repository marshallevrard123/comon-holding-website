/**
 * Coordonnées GPS de chaque entité COM'ON Holding
 * Source des adresses fournies par le client
 */

export const HOLDING = {
  name: "COM'ON Holding",
  sector: "Siège Social",
  address: "Rue Marconi, Zone 4, Abidjan",
  lat: 5.2897,
  lng: -3.9822,
  color: '#8B1A1A',
  isHolding: true,
}

export const FILIALES_LOCATIONS = [
  {
    slug: 'assurances',
    name: "Com'on Assurances",
    sector: "Assurance",
    address: "M'Badon, sise Tridem Pharma, Abidjan",
    lat: 5.3271,
    lng: -4.0107,
    color: '#CC0000',
  },
  {
    slug: 'vati-co',
    name: "Vati&Co",
    sector: "Média · Journal en ligne",
    address: "Mosquée du Golf, Cocody, Abidjan",
    lat: 5.3622,
    lng: -3.9779,
    color: '#CC0000',
  },
  {
    slug: 'services',
    name: "Com'on Services",
    sector: "Commerce & Services",
    address: "Rue Marconi, Zone 4, Abidjan",
    lat: 5.2890,
    lng: -3.9815,
    color: '#CC0000',
  },
  {
    slug: 'distri-agri',
    name: "Com'on Distri Agri",
    sector: "Distribution Agricole",
    address: "Hôtel Palace, Yamoussoukro",
    lat: 6.8156,
    lng: -5.2757,
    color: '#8B1A1A',
  },
  {
    slug: 'agro',
    name: "Com'on Agro",
    sector: "Agro-industrie",
    address: "Toumodi, Côte d'Ivoire",
    lat: 6.5584,
    lng: -5.0198,
    color: '#2E7D32',
  },
  {
    slug: 'sigeced',
    name: "SIGECED",
    sector: "Génie Civil · BTP",
    address: "Vridi Cité, Port-Bouët, Abidjan",
    lat: 5.2460,
    lng: -3.9657,
    color: '#E65100',
  },
  {
    slug: 'cmet',
    name: "Clinique Médicale Espérance",
    sector: "Santé · Clinique Médicale",
    address: "Toumodi Sakassou, Côte d'Ivoire",
    lat: 6.5700,
    lng: -5.0350,
    color: '#1565C0',
  },
]

// Toutes les localisations (holding + filiales) pour la carte globale
export const ALL_LOCATIONS = [HOLDING, ...FILIALES_LOCATIONS]
