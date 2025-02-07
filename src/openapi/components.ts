import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { userCreateSchema, userLoginSchema } from '../schemas/user.schema';
import { productCreateSchema, productUpdateSchema } from '../schemas/product.schema';

export const components = (registry: OpenAPIRegistry) => {
  // Register schemas
  registry.register('UserCreate', userCreateSchema);
  registry.register('UserLogin', userLoginSchema);
  registry.register('ProductCreate', productCreateSchema);
  registry.register('ProductUpdate', productUpdateSchema);

  // Register security schemes
  registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });
}; 