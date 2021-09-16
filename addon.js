import compression from "compression";
import helmet from "helmet";


export default (app) => {
    app.use(compression());
    app.use((err, req, res, next) => {
        // handle error
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use(helmet.hidePoweredBy());
    app.use(
        helmet.permittedCrossDomainPolicies({
            permittedPolicies: "by-content-type",
        })
    );
}