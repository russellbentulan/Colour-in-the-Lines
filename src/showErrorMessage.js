import React from 'react';

const errorMessage = {
  emptyInput: "Please type in something in to get your colour palette",
  emptyPaletteList: `Try something else like: "Sweet Caroline" or "Some Words"`
};

function showErrorMessage(error) {
  return errorMessage[error] 
    ? <span>{errorMessage[error]}</span>
    : <span>{error}</span>;
}

export default showErrorMessage;