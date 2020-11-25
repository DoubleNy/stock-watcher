import React from "react";

type FieldProps = {
  hasAddons?: boolean;
  isGrouped?:
    | boolean
    | {
        position: "centered" | "right";
        multiline?: never;
      }
    | {
        position?: never;
        multiline: boolean;
      };
  isNarrow?: boolean;
  className?: string;
};

const Field: React.FunctionComponent<FieldProps> = (props) => {
  const getClassNames = () => {
    let classNames = "field";

    if (props.hasAddons) {
      classNames += " has-addons";
    }

    if (props.isGrouped) {
      classNames += " is-grouped";

      if (typeof props.isGrouped === "object") {
        if (props.isGrouped.position) {
          classNames += ` is-grouped-${props.isGrouped.position}`;
        } else if (props.isGrouped.multiline) {
          classNames += " is-grouped-multiline";
        }
      }
    }

    if (props.isNarrow) {
      classNames += " is-narrow";
    }

    if (props.className) {
      classNames += ` ${props.className}`;
    }

    return classNames;
  };

  return <div className={getClassNames()}>{props.children}</div>;
};

export default Field;
