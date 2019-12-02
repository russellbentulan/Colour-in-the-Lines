import React from 'react';
import cn from 'classnames';

function AppTitle(props) {

  const componentClass = cn(
    'AppTitle__heading',
    {'AppTitle__heading--expand': props.expand}
  );

  return (
    <div className="AppTitle">
      <h1 className={componentClass}>Colour in the Lines</h1>
    </div>
  );
  
}

export default AppTitle;