import SplitPane from "components/common/splitPane/splitPane";
import NormalForm from "./normal_form";
import MissingSubmit from "./missing_submit";
import ChatApp from "./chatApp/chatApp";
import BookStore from "./bookstore/bookstore";
import styles from "styles/flag.module.scss";

/**
 * Renders appropriate flag form. If challenge is locked, form will not appear
 * @param id Challenge ID
 * @param title Challenge title
 * @param desc Challenge description
 * @param unlocked Whether challenge has been completed/locked
 * @param callBack Switch background if challenge has been unlocked
 * @returns Flag component
 */
const Flag = ({
  id,
  title,
  desc,
  unlocked,
  callBack,
}: {
  id: number;
  title: string;
  desc: string;
  unlocked: boolean;
  callBack: Function;
}) => {
  /**
   * Chooses which flag form to render
   * @param id Challenge ID
   * @returns Challenge form component
   */
  const renderFlag = (id: number) => {
    switch (id) {
      case 0:
        return (
          <NormalForm
            id={0}
            callBack={callBack}
            initialVal={"FLAG{HelloWorld!}"}
          />
        );
      case 1:
        return <NormalForm id={1} callBack={callBack} />;
      case 2:
        return <MissingSubmit />;
      case 3:
        return (
          <SplitPane>
            <ChatApp />
            <NormalForm id={3} callBack={callBack} />
          </SplitPane>
        );
      case 4:
        return (
          <SplitPane>
            <BookStore />
            <NormalForm id={4} callBack={callBack} />
          </SplitPane>
        );
      default:
        console.error("No associated flag form");
        return;
    }
  };

  return (
    <div className="flag-col">
      <h2 className={styles.flag}>
        <strong>{title}</strong>
      </h2>
      <code className={styles.flag}>{desc}</code>
      <div>&nbsp;</div>
      {!unlocked && renderFlag(id)}
    </div>
  );
};

export default Flag;
