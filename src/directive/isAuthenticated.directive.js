import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError } from "graphql";

export default function isAuthenticated(schema, directiveName) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const isAuthenticatedDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (isAuthenticatedDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          if (!context.user) {
            throw new GraphQLError("You are not authenticated");
          }
          const result = await resolve(source, args, context, info);

          return result;
        };
        return fieldConfig;
      }
    },
  });
}
