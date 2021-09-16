import 'reflect-metadata'
import { createModule, gql, Injectable } from "graphql-modules";

@Injectable()
export default class DataInit {
    constructor(props) {
        console.log(props)
        this.client = props?.client
    }
}