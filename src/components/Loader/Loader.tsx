import { ColorRing } from "react-loader-spinner";
import css from "./Loader.module.css";

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <ColorRing
      visible={loading}
      height="80"
      width="80"
      ariaLabel="color-ring-wrapper"
      wrapperClass={css.colorRingLoading}
      colors={["#4830f0", "#de367f", "#4830f0", "#de367f", "#4830f0"]}
    />
  );
};

export default Loader;
