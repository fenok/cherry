import { FC } from "react";

interface Props {
    name: string;
}

const NameDisplay: FC<Props> = ({ name }) => <span>{name}</span>;

export { NameDisplay };
export default NameDisplay;
export type { Props };
