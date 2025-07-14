export const projects = [
    {
        slug: "casa-marmol",
        title: "Casa Marmol",
        description: "Hermosa casa de una planta con acabados de lujo, ideal para familias.",
        image: "/img/projects/rioja25-1.jpg",
        price:100000,
        especifications: {
            area: "120 m²",
            construction: "150 m²",
            year: "2025",
            type: "Residencial",
            status: "En construcción",
            floors: "1",
            bedrooms: "2",
            bathrooms: "2",
            parking: "1",
            location: "Colima, México",
        },
        features: [
            "Cocina integral"
        ],
        location: {
            lat: 19.2465,
            lng: -103.7242,
        },
        address: "Calle Ejemplo 123, Colima, México",
        images: [
            "/img/projects/rioja25-1.jpg",
            "/img/projects/rioja25-2.jpg",
            "/img/projects/rioja25-3.jpg"
        ]
    },
    {
        slug: "casa-caliza",
        title: "Casa Caliza",
        description: "Hermosa casa de dos pisos con acabados de lujo, ideal para familias.",
        image: "/img/projects/rioja21-1.jpg",
        price:100000,
        especifications: {
            area: "120 m²",
            construction: "150 m²",
            year: "2025",
            type: "Residencial",
            status: "En construcción",
            floors: "2",
            bedrooms: "3",
            bathrooms: "2",
            parking: "1",
            location: "Colima, México",
        },
        features: [
            "Cocina integral"
        ],
        location: {
            lat: 19.2465,
            lng: -103.7242,
        },
        address: "Calle Ejemplo 123, Colima, México",
        images: [
            "/img/projects/rioja21-1.jpg",
            "/img/projects/rioja21-2.jpg",
            "/img/projects/rioja21-3.jpg"
        ]
    },
    {
        slug: "casa-bego",
        title: "Casa Bego",
        description: "Hermosa casa de dos pisos con acabados de lujo, ideal para familias.",
        image: "/img/projects/mirador-1.jpg",
        price:100000,
        especifications: {
            area: "120 m²",
            construction: "150 m²",
            year: "2025",
            type: "Residencial",
            status: "En construcción",
            floors: "2",
            bedrooms: "3",
            bathrooms: "2",
            parking: "1",
            location: "Colima, México",
        },
        features: [
            "Cocina integral"
        ],
        location: {
            lat: 19.2465,
            lng: -103.7242,
        },
        address: "Calle Ejemplo 123, Colima, México",
        images: [
            "/img/projects/mirador-1.jpg",
            "/img/projects/mirador-2.jpg",
            "/img/projects/mirador-3.jpg",
            "/img/projects/mirador-4.jpg"
        ]
    },
    {
        slug: "local-capire",
        title: "Local Capire",
        description: "Hermoso local comercial en una zona de alto tráfico, ideal para negocios.",
        image: "/img/projects/local-1.jpg",
        price:100000,
        especifications: {
            area: "120 m²",
            construction: "150 m²",
            year: "2025",
            type: "Comercial",
            status: "En construcción",
            floors: "2",
            bedrooms: "3",
            bathrooms: "2",
            parking: "1",
            location: "Colima, México",
        },
        features: [
            "Cocina integral"
        ],
        location: {
            lat: 19.2465,
            lng: -103.7242,
        },
        address: "Calle Ejemplo 123, Colima, México",
        images: [
            "/img/projects/local-1.jpg",
            "/img/projects/local-2.jpg"
        ]
    },
];
export const recentProjects = projects.slice(0, 3);