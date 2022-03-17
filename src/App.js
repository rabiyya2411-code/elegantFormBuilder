import React, { useState } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import toolbar from './toolbar.json';
import Stage from './components/Stage';
import stage from './stage.json';
import Properties from './components/Properties';
import SettingItem from './components/Settings';
import settings from './settings.json';
import Alert from './components/Alert';
import Header from './components/Header';

function App() {
  const [stageObj, setStage] = useState(stage);
  const [getIndex, setIndex] = useState(-1);
  const [alert, setAlert] = useState(null);
  // const [canDelete, setCanDelete] = useState(true);

  const showAlert = (message, type) => {
    setAlert({
      //now alert is an object instead of null
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }
  return (
    <div>
    <Header/>
    <Alert alert={alert} />
    <div className="App">
      <div className='drag-n-drop-toolbar'>
        <div className='group-title'>Tools Panel</div>
        <Toolbar
          stageObj={stageObj}
          setStage={setStage}
          toolbar={toolbar}
          showAlert={showAlert}
        />
        <div className='group-title'>Settings</div>
        <SettingItem
          settings={settings}
          stageObj={stageObj}
        />
      </div>

      <div className='drag-n-drop-stage-title'>
      <div className='group-title'>Form Preview</div>
          
        <Stage
          stageObj={stageObj}
          setStage={setStage}
          getIndex={getIndex}
          setIndex={setIndex}
        />
      </div>

      <Properties
        stageObj={stageObj}
        setStage={setStage}
        getIndex={getIndex}
        showAlert={showAlert}

      />
    </div>
    </div>
  );
}

export default App;
