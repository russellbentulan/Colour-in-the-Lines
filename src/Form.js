import React from 'react';

function Form(props) {
  return (
    <form className="userInput__form" onSubmit={props.formHandler}>
      <label htmlFor="userInpuTextarea">Enter your text below</label>
      <textarea
        className="userInput__textarea"
        id="userInpuTextarea"
        rows="4"
        cols="50"
        onChange={props.textareaHandler}
      ></textarea>

      <button type="submit">Get Your Colours</button>
    </form>
  );
} 

export default Form;