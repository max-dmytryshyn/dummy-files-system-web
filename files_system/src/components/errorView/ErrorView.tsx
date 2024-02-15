import React from "react";
import { GetItemByPathError } from "types/constants";
import NotFoundView from "components/errorView/specificErrorViews/NotFoundView";
import UnknownErrorView from "components/errorView/specificErrorViews/UnknownErrorView";

interface ErrorViewProps {
  type: GetItemByPathError;
  message: string;
}

const ErrorView: React.FC<ErrorViewProps> = ({ type, message }) => {
  switch (type) {
    case GetItemByPathError.NOT_FOUND:
      return <NotFoundView message={message} />;
    case GetItemByPathError.UNKNOWN_ERROR:
      return <UnknownErrorView />;
  }
};

export default ErrorView;
