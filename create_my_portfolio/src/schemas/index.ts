import {z} from "zod"

const passwordSchema = z.string().min(2);
const usernameSchema = z.string().min(4);
const emailSchema=z.string().email().min(5);

export const stringSchema = z.string();

export const signupSchema=z.object({
  username:usernameSchema,
  email:emailSchema,
  password:passwordSchema
})

export const loginSchema =z.object({
  identifier:z.string(),
  password:passwordSchema
})

const socialSchema=z.object({
    github:stringSchema.optional(),
    linkedIn:stringSchema.optional(),
    mail:stringSchema.optional()
  })

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId")
  .transform((val) => String(val)); // ensures it's a string


export const createDataSchema=z.object({
  owner:stringSchema,
  name:stringSchema,
  slug:stringSchema,
  tagLine:stringSchema.optional(),
  description:stringSchema.optional(),
  location:stringSchema,
  social:socialSchema,
  about:stringSchema,
  skills:z.array(z.object({
    name:stringSchema,
    level:z.number()
  })).optional(),
  stats:z.array(z.object({
    value:stringSchema,
    label:stringSchema
  })).optional(),
  projects:z.array(z.object({
    title:stringSchema,
    description:stringSchema.optional(),
    image:stringSchema.optional(),
    tech:z.array(z.string()),
    category:stringSchema,
    github:stringSchema.optional(),
    demo:stringSchema.optional(),
    featured:z.boolean().optional()
  })),
  experience:z.array(z.object({
    position:stringSchema,
    company:stringSchema,
    duration:stringSchema,
    description:stringSchema.optional()
  })),
  education:z.array(z.object({
    degree:stringSchema,
    school:stringSchema,
    year:stringSchema,
    cgpa:stringSchema.optional()
  })),
  contact:z.object({
    email:emailSchema,
    location:stringSchema,
    social:socialSchema
  })
})