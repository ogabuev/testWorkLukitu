import React, {useEffect, useState} from 'react';
import {AddSkills} from "../../models";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {IconButton} from "@mui/material";

interface Props {
    propertyPerson: AddSkills;
    setPropertyValue?: void;
    points?: number;
    thisIsCard: boolean,
}

const SkillPerson = ({propertyPerson, skillPerson, setSkillValue, points}: Props) => {
    const [value, setValue] = useState<number>(skillPerson.value);

    useEffect(() => {
        if (setSkillValue) {
            setSkillValue(value, propertyPerson.id, skillPerson.id);
        }
    }, [value])

    function renderSwitch(skillPersonValue: number): string {
        switch(skillPersonValue) {
            case 0:
                return 'Нетренированный';
            case 1:
                return 'Новичок';
            case 2:
                return 'Ученик';
            case 3:
                return 'Адепт';
            case 4:
                return 'Эксперт';
            case 5:
                return 'Мастер';
        }
    }

    function increment(): void {
        if (points && value < propertyPerson.value && value < 5) {
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
            <label style={{color: 'red'}}>{skillPerson?.name}</label>
            <IconButton variant="text" onClick={decrement}><RemoveCircleOutlineIcon/></IconButton>
            <label style={{color: 'red'}}>{renderSwitch(skillPerson?.value)}</label>
            <IconButton variant="text" onClick={increment}><AddCircleOutlineIcon/></IconButton>
        </div>
    );
};

export default SkillPerson;
