import React, { useState } from 'react';

export const TitleContext = React.createContext();

export const TitleProvider = ({ children }) => {
	const [title, setTitle] = useState('picture perfect');

	const [color, setColor] = useState();

	const [showDefault, setShowDefault] = useState(true);

	const [scroll, setScroll] = useState(0);

	const providerValue = {
		title,
		setTitle,
		color,
		setColor,
		showDefault,
		setShowDefault,
		scroll,
		setScroll
	};

	return (
		<TitleContext.Provider value={providerValue}>{children}</TitleContext.Provider>
	);
};