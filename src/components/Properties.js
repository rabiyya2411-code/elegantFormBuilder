import React, {useState} from "react";
import "@fontsource/roboto/700.css";
import { Button } from "@mui/material";
import { uid } from "../uid";

const Properties = ({
  stageObj,
  setStage,
  getIndex,
  showAlert
}) => {
  const [val, setVal] = useState(false)
  
  
  const properties = getIndex !== -1 ? stageObj[getIndex].properties : {};
  const handleSubmit = (e) => {
    e.preventDefault();
    let OptionLength;
    let toChange = stageObj[getIndex].properties;
    let Option = stageObj[getIndex].properties.Option;
    if (Option) {
      OptionLength = Option && Object.keys(Option).length;
    }
    else {
      OptionLength = 1;
    }

    let propsLength = Object.keys(toChange).length;
    let toChangeLength = (propsLength) + (OptionLength - 1);

    let Otherobj = {};
    const newArr = [];
    const singleObj = {
      value: "",
      label: "",
      id: ""
    }
    const mergedEmpty = {
      Text: "",
      Color: "",
      Option: ""
    }
    for (let i = 0; i <= toChangeLength - 1; i++) {

      let name = e.target.elements[i].name;
      let value = e.target.elements[i].value;
      console.log([i], "Name: ", name);
      console.log([i], "Properties --> value: ", value);
      /////////////////////
      if (name === 'Text' || name === 'Color' || name === 'Link') {
        Otherobj[name] = value;
        const newObj = { ...stageObj[getIndex], properties: Otherobj };
        const replaceWith = [...stageObj];
        let toSubmit = replaceWith.splice(getIndex, 1, newObj);
        setStage(replaceWith);
      }
      else {
        const newSingleObj = Object.create(singleObj);
        newSingleObj.value = value;
        newSingleObj.label = value;
        newSingleObj.id = uid();
        newArr.push(newSingleObj);
        //setOptions(newArr);

        const mergedObj = Object.create(mergedEmpty);
        mergedObj.Text = Otherobj.Text;
        mergedObj.Color = Otherobj.Color;
        mergedObj.Option = newArr;

        const newObj2 = { ...stageObj[getIndex], properties: mergedObj };
        const replaceWith2 = [...stageObj];
        let toSubmit = replaceWith2.splice(getIndex, 1, newObj2);
        setStage(replaceWith2);
      }
    }
    showAlert("Item has been updated!" , "success")

  };

  const PropItems = ({ property }) => {
    {
      if (getIndex == -1) {
        return null;
      }
      console.log("Entered PropItems with: ", property);
      let propKeys = [];
      Object.keys(property).forEach((propKey) => {
        propKeys.push(propKey);
      });
      return propKeys.map((propKey) => {
        setVal(properties[propKey])
  
        return (
          <>
            <ul key={propKey}>

              {properties.Option && propKey === "Option" ? (
                <>

                  {properties.Option.map((option, index) => {

                    return (
                      <>
                        <div className="row">
                          <div className="col-sm-3">{propKey} {index + 1}</div>
                          <div className="col-sm-3">
                          
                            <input
                              type="text"
                              defaultValue= {option.value}
                              name={option.label}
                            />
                          </div>
                        </div>

                      </>
                    );
                  })}
                </>

              ) : (
                <>
                  <div className="row">
                    <div className="col-sm-3">{propKey}</div>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        name={propKey}
                        id= "input"
                        defaultValue = {properties[propKey]}
                        
                      />
                    </div>
                  </div>
                </>
              )}
            </ul>
          </>
        );
      });
    }
  };

  return (
    <>
      <div className="drag-n-drop-properties">
        <div className="group-title">Properties</div>
        <form onSubmit={handleSubmit}>
          <div className="stage-dnd-group">
            {<PropItems property={properties} />}
          </div>
          <div className="center">
          <Button variant="contained" type="submit" sx={{background: "#5E3C00"}}>
            Update
          </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Properties;
