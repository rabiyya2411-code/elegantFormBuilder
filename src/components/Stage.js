import React from 'react';
import Select from 'react-select'
import '@fontsource/roboto/700.css';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const Stage = ({ stageObj, setStage, setIndex }) => {

    const handleEdit = (index) => {
        setIndex(index)
    }
 
    const handleDelete = (index) => {
        let copy = [...stageObj];
                copy.splice(index, 1);
                setStage(copy);
                setIndex(-1)    
        }
        
        const StageItem = (props) => {
            const {index, id} = props;
        return (
            <div className="row" >
                <div className="col-sm-11">{props.children}</div>

                <div className="col-sm-1" >
                    <DeleteForeverTwoToneIcon id={id} onClick={() => handleDelete(index, id)}></DeleteForeverTwoToneIcon>
                    
                    <ModeEditOutlineOutlinedIcon id={props.id} onClick={() => handleEdit(index)} ></ModeEditOutlineOutlinedIcon>
                </div>
            </div>
        )
    }
    console.log("Before returning the stageObj is:", stageObj);
    return (
        <>
            <div className="drag-n-drop-stage">

                <div className="stage-dnd-group">
                    {
                        stageObj.map((item, index) => {
                            return <>
                                <StageItem
                                    id={item.id}
                                    index={index}
                                    key={item.tag}
                                    tag={item.tag}
                                    properties={item.properties.Text}
                                    onDelete={handleDelete}
                                >
                                    <FormElement item={item} />
                                </StageItem>
                                <br></br>
                            </>
                        })
                    }
                </div>
            </div>
        </>
    );
}

const FormElement = (props) => {
    let { item } = props;
    // console.log(item, "Form Item")
    switch (item.tag) {
        case "TITLE":
            return <TitleElement item={item} />
            break;
        case "HEADING":
            return <HeadingElement item={item} />
            break;
        case "PARAGRAPH":
            return <ParaElement item={item} />
            break;
        case "UL":
            return <BulletedElement item={item} />
            break;
        case "OL":
            return <NumberedElement item={item} />
            break;
        case "HYPERLINK":
            return <LinkElement item={item} />
            break;
        case "TEXTFIELD":
            return <TextField item={item} />
            break;
        case "TEXTAREA":
            return <TextArea item={item} />
            break;
        case "SINGLESELECT":
            return <SingleSelect item={item} />
            break;
        case "MULTISELECT":
            return <MultiSelect item={item} />
            break;
        case "SUBMITBUTTON":
            return <SubmitButton item={item} />
            break;
        default:
            return (
                <p>unknown Tag: {item.tag}</p>
            );
    }
}
const TitleElement = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <h1 style={{ color: newColor }}>{item.properties.Text}</h1>
    );
}
const HeadingElement = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <h2 style={{ color: newColor }}>{item.properties.Text}</h2>
    );
}
const ParaElement = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <p style={{ color: newColor }}>{item.properties.Text}</p>
    );
}
const BulletedElement = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <>
            <h3 style={{ color: newColor }}>{item.properties.Text}</h3>
            <ul style={{ color: newColor }}>
                <li>{item.properties.Option[0].label}</li>
                <li>{item.properties.Option[1].label}</li>
                <li>{item.properties.Option[2].label}</li>
            </ul>
        </>
    );
}
const NumberedElement = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <>
            <h3 style={{ color: newColor }}>{item.properties.Text}</h3>
            <ol style={{ color: newColor }}>
                <li>{item.properties.Option[0].label}</li>
                <li>{item.properties.Option[1].label}</li>
                <li>{item.properties.Option[2].label}</li>
            </ol>
        </>
    );
}
const LinkElement = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <a href={item.properties.Link} style={{ color: newColor }} target="_blank">
            {item.properties.Text}
        </a>
    );
}
const TextField = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <label style={{ color: newColor }}>
            {item.properties.Text}
            <input type="text" name="name" />
        </label>
    );
}
const TextArea = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <label style={{ color: newColor }}> {item.properties.Text}
            <textarea></textarea>
        </label>
    );
}
const SingleSelect = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <label style={{ color: newColor }}> {item.properties.Text}
            <Select options={item.properties.Option} isClearable />
        </label>
    );
}
const MultiSelect = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    console.log(item, "Multi Select")
    return (
        <label style={{ color: newColor }}>{item.properties.Text}
            <Select
                options={item.properties.Option}
                isClearable
                isSearchable
                isMulti />
        </label>
    );
}
const SubmitButton = (props) => {
    let { item } = props;
    let newColor = item.properties.Color;
    return (
        <Stack direction="row">
            <Button sx={{background: "#3E1D00"}} variant="contained" type="submit" style={{ color: newColor }}>
                {item.properties.Text}
            </Button>
        </Stack>
    )
}

export default Stage;