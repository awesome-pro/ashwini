import * as z from "zod";

export const appointmentSchemaRegistered = z.object({
    patientId: z.string().optional(),
});

export const appointmentSchemaNew = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(10),
    gender: z.string().optional(),
    age: z.number().optional(),
});