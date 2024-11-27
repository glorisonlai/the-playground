import useStore from "@/stores/useStore";
import useBackground from "@/stores/useBackground";
import style from "@/styles/background.module.scss";

/**
 * Current available backgrounds. Will be updated!
 * @param bg Background ID
 * @returns Background
 */
const renderBg = (uri: string): JSX.Element => (
  <iframe className={style.bg} src={`/backgrounds/${uri}`} />
);

/**
 * Suspended background. Not sure if worth it
 * @param bg Background ID
 * @returns Background
 */
const Background = () => {
  const bgId = useStore(useBackground, (state) => state.bgId)

  return (
    <Suspense fallback={<div className={style.bg} />}>{renderBg(bgId)}</Suspense>
  );
};

export default Background;
