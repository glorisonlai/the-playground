import React, { lazy, Suspense } from "react";
import SplitPane from "components/common/split-pane/split-pane";

const NormalFlag = lazy(() => import("./normal_form"));
const MissingSubmit = lazy(() => import("./missing_submit"));
const ChatApp = lazy(() => import("./chatApp/chatApp"));
const BookStore = lazy(() => import("./bookstore/bookstore"));

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
          <NormalFlag
            id={0}
            callBack={callBack}
            initialVal={"FLAG{HelloWorld!}"}
          />
        );
      case 1:
        return <NormalFlag id={1} callBack={callBack} />;
      case 2:
        return <MissingSubmit />;
      case 3:
        return (
          <SplitPane>
            <ChatApp />
            <NormalFlag id={3} callBack={callBack} />
          </SplitPane>
        );
      case 4:
        return (
          <SplitPane>
            <BookStore />
            <NormalFlag id={4} callBack={callBack} />
          </SplitPane>
        );
      default:
        console.error("No associated flag form");
        return;
    }
  };

  return (
    <div className="flag-col">
      <label className="flag title" htmlFor="flag">
        <h2>
          <strong>{title}</strong>
        </h2>
      </label>
      <code>{desc}</code>
      <div>&nbsp;</div>
      {!unlocked && (
        <Suspense fallback={<div className="bg"></div>}>
          {renderFlag(id)}
        </Suspense>
      )}
    </div>
  );
};

export default Flag;
