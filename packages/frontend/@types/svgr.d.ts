declare module "*.svg?svgr" {
    import { ComponentType, SVGAttributes } from "react";
    const ReactComponent: ComponentType<SVGAttributes<SVGElement>>;

    export default ReactComponent;
}
