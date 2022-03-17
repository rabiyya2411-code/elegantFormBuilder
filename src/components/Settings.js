import React from 'react';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const SettingItem = ({ settings, stageObj }) => {
  const [value, setValue] = useState("");
  const [userInput, setuserInput] = useState("");

  let formCode = "";
  let finalForm = "";
  const handleFormCode = (stageObj) => {
    console.log("Entered handleFormCode", stageObj);
    {
      formCode = stageObj.map((item) => {
        switch (item.tag) {
          case "TITLE":
            return "<h1 style=" + "'color:" + item.properties.Color + ";'>" + item.properties.Text + "</h1>" 
            break;
          case "HEADING":
            return "<h2 style=" + "'color:" + item.properties.Color + ";'>" + item.properties.Text + "</h2>"
            break;
          case "PARAGRAPH":
            return "<p style=" + "'color:" + item.properties.Color + ";'>" + item.properties.Text + "</p>"
            break;
          case "UL":
            return (
              "<h3 style='" + "color:" + item.properties.Color + ";'>" + item.properties.Text + "</h3>" +
              "<ul>" +
              "<li>" + item.properties.Option[0].label + "</li>" +
              "<li>" + item.properties.Option[1].label + "</li>" +
              "<li>" + item.properties.Option[2].label + "</li>" +
              "</ul><br>"
            );
            break;
          case "OL":
            return (
              "<h3" + "style=" + "color:" + item.properties.Color + ">" + item.properties.Text + "</h3>" +
              "<ol>" +
              "<li>" + item.properties.Option[0].label + "</li>" +
              "<li>" + item.properties.Option[1].label + "</li>" +
              "<li>" + item.properties.Option[2].label + "</li>" +
              "</ol><br>"
            );
            break;
          case "HYPERLINK":
            return (
              "<a href=" + item.properties.Link + " style= '" + "color:" + item.properties.Color + ";' target='_blank'" +">"
              + item.properties.Text +
              "</a><br>"
            );
            break;
          case "TEXTFIELD":
            return (
              "<label style = 'color:" + item.properties.Color + ";'" + ">" +
              item.properties.Text +
              "<input type='text' name='name' />" +
              "</label><br>"
            );
            break;
          case "TEXTAREA":
            return (
              "<label style ='" + "color:" + item.properties.Color+ ";'" + ">" +
              item.properties.Text +
              "<textarea>" + "</textarea>" +
              "</label><br>"
            );
            break;
          case "SINGLESELECT":
            return (
              "<label style ='" + "color:" + item.properties.Color + ";'" + ">" +
              item.properties.Text +
              "<select> <option value= " + item.properties.Option[0].value + ">" + item.properties.Option[0].label + 
              "</option> <option value= "+ item.properties.Option[1].value + ">" + item.properties.Option[1].label + 
              "</option> <option value= " + item.properties.Option[2].value + ">" + item.properties.Option[2].label + 
              "</option> <select/> </label><br>"
            )
            break;
          case "MULTISELECT":
            return (
              "<label style ='" + "color:" + item.properties.Color + ";'" + ">" +
              item.properties.Text +
              "<select multiple> <option value= " + item.properties.Option[0].value + ">" + item.properties.Option[0].label + 
              "</option> <option value= " + item.properties.Option[1].value + ">" + item.properties.Option[1].label + 
              "</option> <option value= " + item.properties.Option[2].value + ">" + item.properties.Option[2].label + 
              "</option> <select/> </label><br>"
            )
            break;
          case "SUBMITBUTTON":
            return (
              "<button  type='submit' style ='color: " + item.properties.Color + ";'>" +
              item.properties.Text +
              "</button><br>" 
            )
            break;
          default:
            return (
              "<p>" + "unknown Tag:" + item.tag + "</p>"
            );
        }
      })
    }
    let joined = formCode.join(" ");
    finalForm = "<form action= '" +  userInput +  "' target='_blank'>"+ joined + "<br> <input type='submit'></input> </form><br>"

    console.log("formCode", formCode);
    console.log("finalForm", finalForm);
    setValue(finalForm);
  }
  return (
    <div className="drag-n-drop" >
      {
        settings.map((grp, grpIndex) => (
          <div key={grp.title} className='dnd-group'>
         
            {
              grp.items.map((item, index) => (
                <div className='dnd-item-prop my-3' key={item.tag}
                  id={`${grpIndex}_${index}`}>
                <TextField 
                  type="text" id="outlined-basic" 
                  sx={{
                  '& input':{
                    color: "#3E1D00"
                  },
                  width:"90%"
                }}
                  label={item.tag} variant="outlined" 
                  value={userInput}
                  onChange={(e) => setuserInput(e.target.value)}
                />
                </div>

              ))
            }

            <div className='dnd-item-prop'>
              <Button  sx={{background: "#5E3C00"}} 
              variant='contained' type='submit' onClick={() => handleFormCode(stageObj)}>Generate Form Code</Button>
            </div>
            <div className='dnd-item-prop my-3'>
              <TextField
                variant="outlined"
                placeholder="Form Code comes here..."
                label="Form Code"
                multiline
                fullWidth
                sx={{
                  '& textarea':{
                    color: "#3E1D00"
                  },
                  width:"90%"
                }}
                rows={15}
                value= {value}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
export default SettingItem;