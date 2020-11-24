import MinMax from './../counters/minmax'
import React from 'react';
import ReactDOM from 'react-dom';

import userSettingContext from './../contexts/userSettings';
let data = {lang: 'en'};

ReactDOM.render(
	<userSettingContext.Provider value={data}>
		<MinMax 
			min={1}
			max={10}
			current={13}
			onChange={() => {}}
		/>
	</userSettingContext.Provider>, 
	document.querySelector('#tests')
);