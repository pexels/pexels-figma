import * as React from 'react';
import '../styles/ui.css';
import 'figma-plugin-ds/dist/figma-plugin-ds.css';
import Footer from './Footer';
import Gallery from './Gallery';

const App = ({}) => {
  return (
    <React.Fragment>
      <Gallery />
      <Footer />
    </React.Fragment>
  );
};

export default App;
