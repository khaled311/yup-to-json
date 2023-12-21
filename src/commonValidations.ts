import * as z from "zod";

export const emailValidation = z.string().email();
export const nameValidation = z.string().min(2);
