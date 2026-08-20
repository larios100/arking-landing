import { BUSINESS, SITE } from '../consts';

const abs = (path: string) => new URL(path, SITE.url).href;

const postalAddress = {
    '@type': 'PostalAddress',
    streetAddress: `${BUSINESS.street}, ${BUSINESS.neighborhood}`,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.state,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.country,
};

/** Ficha del negocio. Va en el home; el resto de páginas la referencian por @id. */
export function businessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'GeneralContractor',
        '@id': `${SITE.url}/#business`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: `${SITE.url}/`,
        image: abs(SITE.defaultImage),
        logo: abs('/img/logo-horizontal.png'),
        description: SITE.defaultDescription,
        telephone: BUSINESS.phoneE164,
        email: BUSINESS.email,
        address: postalAddress,
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [...BUSINESS.hoursSchema.days],
                opens: BUSINESS.hoursSchema.opens,
                closes: BUSINESS.hoursSchema.closes,
            },
        ],
        areaServed: {
            '@type': 'State',
            name: `${BUSINESS.state}, México`,
        },
        knowsAbout: ['Arquitectura', 'Construcción', 'Diseño de interiores', 'Urbanización'],
        sameAs: [...BUSINESS.social],
    };
}

export function websiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: `${SITE.url}/`,
        name: SITE.name,
        inLanguage: 'es-MX',
        publisher: { '@id': `${SITE.url}/#business` },
    };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: abs(item.path),
        })),
    };
}

type ProjectData = {
    title: string;
    image: string;
    category: string;
    images: string[];
    specifications: {
        area: string;
        construction: string;
        year: string;
        floors: string;
        bedrooms: string;
        bathrooms: string;
        location: string;
    };
    location: { lat: number; lng: number };
};

/** Los m² vienen como '280 m²'; schema.org los quiere numéricos. */
const toNumber = (value: string) => {
    const parsed = parseFloat(value.replace(/[^\d.]/g, ''));
    return Number.isFinite(parsed) ? parsed : undefined;
};

export function projectSchema(project: ProjectData, slug: string, description: string) {
    const isHouse = /casa|habitaci/i.test(project.category);
    const area = toNumber(project.specifications.construction);

    return {
        '@context': 'https://schema.org',
        '@type': isHouse ? 'SingleFamilyResidence' : 'Place',
        name: project.title,
        description,
        url: abs(`/projects/${slug}/`),
        image: project.images.map(abs),
        // La dirección exacta de cada obra no es pública: solo se declara la localidad.
        address: {
            '@type': 'PostalAddress',
            addressLocality: BUSINESS.city,
            addressRegion: BUSINESS.state,
            addressCountry: BUSINESS.country,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: project.location.lat,
            longitude: project.location.lng,
        },
        ...(area ? { floorSize: { '@type': 'QuantitativeValue', value: area, unitCode: 'MTK' } } : {}),
        ...(isHouse
            ? {
                  numberOfBedrooms: toNumber(project.specifications.bedrooms),
                  numberOfBathroomsTotal: toNumber(project.specifications.bathrooms),
                  numberOfFloors: toNumber(project.specifications.floors),
              }
            : {}),
        provider: { '@id': `${SITE.url}/#business` },
    };
}
