import {
  generateRoutes,
  generateSpec,
  ExtendedRoutesConfig,
  ExtendedSpecConfig,
} from "tsoa";

(async () => {
  const filePath = __dirname;
  const specOptions: ExtendedSpecConfig = {
    basePath: "/api",
    entryFile: filePath + "/src/index.ts",
    specVersion: 3,
    outputDirectory: filePath + "/src/swagger",
    controllerPathGlobs: [filePath + "/src/controllers/*.ts"],
    noImplicitAdditionalProperties: "silently-remove-extras",
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  };
  const routeOptions: ExtendedRoutesConfig = {
    basePath: "/api",
    controllerPathGlobs: [filePath + "/src/controllers/*.ts"],
    entryFile: filePath + "/src/index.ts",
    routesDir: filePath + "/src/routes",
    bodyCoercion: true,
    noImplicitAdditionalProperties: "silently-remove-extras",
    authenticationModule: filePath + "/src/Middlewares/authentication",
  };
  await generateSpec(specOptions);
  await generateRoutes(routeOptions);
})();
