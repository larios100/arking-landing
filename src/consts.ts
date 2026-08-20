/** Datos del negocio usados en el SEO, los datos estructurados y el pie. */

export const SITE = {
    url: 'https://www.arking.com.mx',
    name: 'Arking',
    legalName: 'Arking Diseño y Construcción',
    locale: 'es_MX',
    lang: 'es',
    defaultTitle: 'Arking | Diseño y construcción de casas en Colima',
    defaultDescription:
        'Arquitectura y construcción en Colima, México. Diseñamos y construimos casa habitación y espacio comercial: proyecto, obra y acabados bajo una sola dirección.',
    defaultImage: '/img/og-arking.jpg',
} as const;

export const BUSINESS = {
    phone: '+52 312 405 58 05',
    phoneE164: '+523124055805',
    whatsapp: '5213124055805',
    email: 'arking1805@gmail.com',
    hours: 'Lunes a viernes, 8:00 a 17:00 h',
    hoursSchema: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    street: 'Av. V. Carranza #1727 int. 8',
    neighborhood: 'Col. Residencial Esmeralda',
    postalCode: '28017',
    city: 'Colima',
    state: 'Colima',
    country: 'MX',
    social: [
        'https://www.instagram.com/arking.construccion',
        'https://www.facebook.com/profile.php?id=61573052413049',
    ],
} as const;
