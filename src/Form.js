import React from 'react';

function Form(props) {
  return (
    <form className="userInput__form" onSubmit={props.formHandler}>
      <label htmlFor="textInput">Enter your text below</label>
      <input
        type="text"
        className="userInput__text"
        id="textInput"
        rows="4"
        cols="50"
        onChange={props.textHandler}
      ></input>

      <button type="submit">Get Your Colours</button>
    </form>
  );
} 

export default Form;