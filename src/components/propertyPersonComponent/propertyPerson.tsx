import React, {useEffect, useState} from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {Skill} from "../../models";
import SkillPerson from "../skillPersonComponent/skillPerson.tsx";
import "./propertyPerson.css";
import {IconButton} from "@mui/material";

interface Props {
    propertyPerson: Skill;
    setPropertyValue?: any;
    points?: number;
    thisIsCard: boolean,
}

const PropertyPerson = ({propertyPerson, setPropertyValue, points, thisIsCard}: Props) => {
    const [value, setValue] = useState<number>(0)
    const [openAddSkills, setOpenAddSkills] = useState<boolean>(false)

    useEffect(() => {
        if (setPropertyValue && !thisIsCard) {
            setPropertyValue(value, propertyPerson.id);
        }
    }, [value])

    function handlerChangeSkills(value: number, id: number , idSkill: number): void {
        setPropertyValue(value, id, idSkill)
    }

    function openAddSkillsFn(): void {
        setOpenAddSkills(!openAddSkills);
    }

    function increment(): void {
        if (points) {
            setValue(value + 1);
        }
    }

    function decrement(): void {
        if (value > 0) {
            setValue(value - 1);
        }
    }

    return (
        <div>
            <div onClick={openAddSkillsFn} className={thisIsCard && propertyPerson?.addSkills ? 'property-card ': ''}>
                <label>{propertyPerson.name}</label>
                {!thisIsCard &&
                    <div className={'property-settings'}>
                        <IconButton onClick={decrement}><RemoveCircleOutlineIcon/></IconButton>
                        <label>{value}</label>
                        <IconButton onClick={increment}><AddCircleOutlineIcon/></IconButton>
                    </div>}


            { thisIsCard && <label> {propertyPerson.value}</label>}
            </div>
            { thisIsCard && openAddSkills && propertyPerson.addSkills?.map((addSkill) =>
                <SkillPerson propertyPerson={propertyPerson} skillPerson={addSkill} points={points} setSkillValue={handlerChangeSkills} key={addSkill.id}/>
            )}
        </div>
    );
};

export default PropertyPerson;
