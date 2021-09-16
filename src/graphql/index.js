import { createApplication } from "graphql-modules";
import myModule from "./myModule";

const schema = createApplication({
    modules: [myModule],
}).createSchemaForApollo();

export default schema;
