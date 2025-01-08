import React, { Fragment } from "react";

const ComboDescription = (props) => {
  const { description } = props;
  return (
    <Fragment>
      <div className="font-bold border-b-2 border-gray-200 mb-3">
        <h3 className="text-3xl text-capitalize ">
          About<span className="text-primary"> Package</span>
        </h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </Fragment>
  );
};

export default ComboDescription;
