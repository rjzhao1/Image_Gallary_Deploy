import React from 'react';
import './App.css';

//Import Components
import ImageList from './Components/Image_List';
import Title from './Components/Title';
import Footer from "./Components/Footer"

import SimpleReactLightbox from 'simple-react-lightbox';

function App() {
	return (
		<div className="App">
			<Title />
			<SimpleReactLightbox>
				<ImageList />
			</SimpleReactLightbox>
			<h5>
				Website Icons made by{' '}
				<a href="https://www.flaticon.com/authors/freepik" title="Freepik">
					Freepik
				</a>{' '}
				from{' '}
				<a href="https://www.flaticon.com/" title="Flaticon">
					{' '}
					www.flaticon.com
				</a>
			</h5>
			<Footer />
		</div>
	);
}

export default App;
