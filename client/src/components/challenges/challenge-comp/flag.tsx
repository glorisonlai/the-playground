import React, { lazy, Suspense, useState, ChangeEvent } from "react";
import Challenges from "../challenges";

const NormalFlag = lazy(() => import("./normal_form"));
const MissingSubmit = lazy(() => import("./missing_submit"));
const ChatApp = lazy(() => import("./chat_app"));

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
  const renderFlag = (id: number) => {
    switch (id) {
      case 1:
        return <NormalFlag id={1} callBack={callBack} />;
      case 2:
        return <MissingSubmit callBack={callBack} />;
      case 3:
        return <ChatApp id={3} callBack={callBack} />;
      default:
        console.error("No associated flag form");
    }
  };
  return (
    <div className="flag-col">
      <label className="flag flag-label" htmlFor="flag">
        <strong>{title}</strong>
      </label>
      <p>{desc}</p>
      <br />
      <Suspense fallback={<div className="bg"></div>}>
        {!unlocked && renderFlag(id)}
      </Suspense>
    </div>
  );
};

export default Flag;
