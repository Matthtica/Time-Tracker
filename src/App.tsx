import { useEffect, useState } from "react";
import "./App.scss";
import HomeScreen from './components/HomeScreen';
import { colorLuminance } from './utils';

function App() {
    const [color, setColor] = useState("#282828");
    useEffect(() => {
        document.documentElement.style.cssText = `
--primary: ${color};
--primary-dark: ${colorLuminance(color, -0.3)};
--primary-light: ${colorLuminance(color, 0.3)};
`
    });
    return (
        <div className="app">
            <HomeScreen />
        </div>
    );
}

export default App;
