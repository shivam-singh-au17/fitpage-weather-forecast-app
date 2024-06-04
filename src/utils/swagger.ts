import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { Application, Request, Response } from 'express';

const setupSwagger = (app: Application): void => {
    const ymlPath = path.join(__dirname, '../api-docs.yml');
    app.use('/docs', swaggerUi.serve, (req: Request, res: Response) => {
        res.send(swaggerUi.generateHTML(YAML.load(ymlPath)));
    });
};

export default setupSwagger;