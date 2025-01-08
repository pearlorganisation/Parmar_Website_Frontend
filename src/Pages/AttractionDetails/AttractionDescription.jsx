import React, { Fragment } from "react";

const AttractionDescription = (props) => {
  const { description } = props;

  return (
    <Fragment>
      <div className="font-bold border-b-2 border-gray-200 mb-3">
        <h3 className="text-3xl text-capitalize">
          About<span className="text-primary"> Attraction</span>
        </h3>
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <style jsx>{`
        .prose {
          line-height: 1.75; /* Custom line height */
        }
        .prose ul {
          list-style-type: disc;
          margin-left: 1.25rem; /* Tailwind equivalent to ml-5 */
        }
        .prose li {
          margin-bottom: 0.5rem; /* Spacing between list items */
        }
      `}</style>
    </Fragment>
  );
};

export default AttractionDescription;
