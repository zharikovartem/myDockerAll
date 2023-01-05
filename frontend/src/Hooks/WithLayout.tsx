import { FunctionComponent } from "react";
import Layout from "../Layout/Layout";



export const WithLayout = <T extends Record<string, unknown>, O extends boolean | undefined>(Component: FunctionComponent<T>, isWithoutFooter?: O) => {
    return function withLayoutComponent({...props}: T): JSX.Element {
        return (
                <Layout isWithoutFooter={isWithoutFooter}>
                    <Component {...props}/>
                </Layout>
        );
    };
};