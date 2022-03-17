import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Toolbar = ({ toolbar, stageObj, setStage, showAlert }) => {

  const handleClick = (e) => {
    createItem(e.target.id);
    showAlert("Item added!" , "success")
  }

  const createItem = (id) => {
    let [grpIndex, index] = id.split("_");
    let addTo = [...stageObj];
    let html_element = toolbar[grpIndex].items[index];
    console.log(html_element, "is clicked");
    addTo.push(html_element);
    setStage(addTo);
  }
  return (
    <div className="drag-n-drop" >

      {toolbar.map((grp, grpIndex) => (

        <div key={grp.title} className='dnd-group'>
          <Accordion 
          sx={{
              background: "#AD8029"
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className='group-Accordian'>{grp.title}</div>
            </AccordionSummary>
            <AccordionDetails  >
              {

                grp.items.map((item, index) => (
                  <div key={item.tag}
                    id={`${grpIndex}_${index}`}
                    className="dnd-item"
                    onClick={handleClick}>

                    {item.tag}
                  </div>
                ))
              }
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
export default Toolbar;

{/* <TextField id={propKey} name= {propKey} variant="standard"  type='text' defaultValue = {properties[propKey]} /> */ }