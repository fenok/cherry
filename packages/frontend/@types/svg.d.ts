declare module "*.svg" {
    import { ComponentType, SVGAttributes } from "react";
    const URL: string;
    const ReactComponent: ComponentType<SVGAttributes<SVGElement>>;

    export { ReactComponent };
    export default URL;
}
