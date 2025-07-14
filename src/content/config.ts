import { defineCollection, z } from "astro:content";
// z -> zod schema

const projects = defineCollection({
    schema: z.object({
    title: z.string(),
    image: z.string(),
    price: z.string(),
    specifications: z.object({
      area: z.string(),
      construction: z.string(),
      year: z.string(),
      type: z.string(),
      status: z.string(),
      floors: z.string(),
      bedrooms: z.string(),
      bathrooms: z.string(),
      parking: z.string(),
      location: z.string(),
    }),
    features: z.array(z.string()),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    address: z.string(),
    images: z.array(z.string()),
    }),
    
});


export const collections = { projects };