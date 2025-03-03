import express, { type Request, type Response, type Router } from "express";
import swaggerUi from "swagger-ui-express";

import { generateOpenAPIDocument } from "@/api-docs/openAPIDocumentGenerator";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

export const openAPIRouter: Router = express.Router();
const openAPIDocument = generateOpenAPIDocument();

openAPIRouter.get("/swagger.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openAPIDocument);
});

const theme = new SwaggerTheme();

const options = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
};

openAPIRouter.use("/", swaggerUi.serve, swaggerUi.setup(openAPIDocument, options));
