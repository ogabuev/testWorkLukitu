import React from 'react';
import {Characters, Skill} from "../../models";
import PropertyPerson from "../propertyPersonComponent/propertyPerson.tsx";
import "./cards-persons.css"

interface Props {
    characters: Characters[];
    setCharacter?: any;
}

const CardsPersons = ({characters, setCharacter}: Props) => {
    function handlerSetPerson(index: number): void {
        setCharacter(index);
    }

    return (
        <div>
            {characters?.map((character: Characters, index: number) =>
                <div className={'card'} onClick={event => handlerSetPerson(index)}>
                    <img className={'img'} src={character?.image}/>
                    <div className={'card-text'}>
                        <h2>{character?.name}</h2>
                        {character?.property.map((property: Skill) =>
                            <PropertyPerson propertyPerson={property} thisIsCard={true} key={property.id}/>
                        )}
                        {character?.addProperty.map((addProperty) =>
                            <PropertyPerson propertyPerson={addProperty} thisIsCard={true} key={addProperty.id}/>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default CardsPersons;
