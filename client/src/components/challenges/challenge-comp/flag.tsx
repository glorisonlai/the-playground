import React, { lazy, Suspense } from "react";

const NormalFlag = lazy(() => import("./normal_form"));
const MissingSubmit = lazy(() => import("./missing_submit"));
const ChatApp = lazy(() => import("./chat_app/chat_app"));

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
  // Chooses which flag form to render
  const renderFlag = (id: number) => {
    switch (id) {
      case 1:
        return <NormalFlag id={1} callBack={callBack} />;
      case 2:
        return <MissingSubmit />;
      case 3:
        return <ChatApp id={3} callBack={callBack} />;
      default:
        console.error("No associated flag form");
        return;
    }
  };

  return (
    <div className="flag-col">
      <label className="flag flag-label" htmlFor="flag">
        <strong>{title}</strong>
      </label>
      <p>{desc}</p>
      <br />
      {!unlocked && (
        <Suspense fallback={<div className="bg"></div>}>
          {renderFlag(id)}
        </Suspense>
      )}
    </div>
  );
};

export default Flag;
