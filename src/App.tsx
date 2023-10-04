
import './App.css';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from "react";
import {AddSkills, Character, Characters, Skill} from "./models";
import PropertyPerson from "./components/propertyPersonComponent/propertyPerson.tsx";
import Button from "@mui/material/Button";
import axios, {AxiosResponse} from "axios";
import CardsPersons from "./components/cardsPersons/cardsPersons.tsx";

function initPropertyPerson(): Skill[] {
    return [{id: 0, name: 'Сила', value: 0,
            addSkills: [{id: 0, name: 'Атака', value: 0, levelName: 0}]},
        {id: 1, name: 'Ловкость', value: 0,
            addSkills: [{id: 0, name: 'Стелс', value: 0, levelName: 0}, {id: 1, name: 'Стрельба из лука', value: 0, levelName: 0}]},
        {id: 2, name: 'Интеллект', value: 0,
            addSkills: [{id: 0, name: 'Обучаемость', value: 0, levelName: 0}, {id: 1, name: 'Выживание', value: 0, levelName: 0}, {id: 2, name: 'Медицина', value: 0, levelName: 0}]},
        {id: 3, name: 'Харизма', value: 0,
            addSkills: [{id: 0, name: 'Запугивание', value: 0, levelName: 0}, {id: 1, name: 'Проницательность', value: 0, levelName: 0}, {id: 2, name: 'Внешний вид', value: 0, levelName: 0}, {id: 3, name: 'Манипулирование', value: 0, levelName: 0}]
        }];
}

function setOldCharacter(character: Skill[]): Skill[] {
    return [...character]
}

function setOldAddCharacter(character: AddSkills[]): AddSkills[] {
    return [...character]
}

function initAddPropertyPerson(): AddSkills[] {
    return [{id: 0, name: 'Жизненная сила', value: 3}, {id: 1, name: 'Уклонение', value: 10},{id: 2, name: 'Энергичность', value: 0}];
}

function App() {
    const [savedPerson, setSavedPerson] = useState<Characters[]>();
    const [namePerson, setNamePerson] = useState<string>('')
    const [propertyPerson, setPropertyPerson] = useState<Skill[]>(initPropertyPerson());
    const [addPropertyPerson, setAddPropertyPerson] = useState<AddSkills[]>(initAddPropertyPerson());
    const [points, setPoints] = useState<number>(10);
    const [newPerson, setPerson] = useState<boolean>(false);
    const [deathPerson, setDeathPerson] = useState<boolean>(false);
    const [appState, setAppState] = useState<string>();
    const [seePersons, setSeePersons] = useState<boolean>(false);

    useEffect(() => {
        const apiUrl = `https://rickandmortyapi.com/api/character/${Math.floor(Math.random() * 101)}`;
        axios.get(apiUrl).then((resp:AxiosResponse<any>) => {
            debugger;
            const allPersons: Character = resp.data;
            setAppState(allPersons.image);
        }).catch();
    }, [deathPerson]);

    useEffect(() => {
        if (deathPerson && !newPerson) {
            setDeathPerson(false);
        }
    }, [propertyPerson, addPropertyPerson])

    function set(value: number, id: number): void {
        debugger;
        const newPropertyPerson: Skill[] = propertyPerson.map((skill: Skill) => {
            if (skill.id === id) {
                skill.value = value;
            }
            return skill;
        })

        let newAddPropertyPerson: Skill[] = [];
        debugger;
        addPropertyPerson.forEach((addProperty: Skill, index: number) => {
            newAddPropertyPerson.push(addProperty);
            if (addProperty.name === 'Жизненная сила' && propertyPerson.find((property) => property.name === 'Сила').value ) {
                newAddPropertyPerson[index].value = propertyPerson.find((property) => property.name === 'Сила').value + 3;
            }
            if (addProperty.name === 'Уклонение' && propertyPerson.find((property) => property.name === 'Ловкость').value) {
                newAddPropertyPerson[index].value = propertyPerson.find((property) => property.name === 'Ловкость').value + 10;
            }
            if (addProperty.name === 'Энергичность' && (propertyPerson.find((property) => property.name === 'Интеллект').value || propertyPerson.find((property) => property.name === 'Ловкость').value)) {
                newAddPropertyPerson[index].value = propertyPerson.find((property) => property.name === 'Интеллект').value + propertyPerson.find((property) => property.name === 'Ловкость').value;
            }
        })

        setAddPropertyPerson(newAddPropertyPerson);
        setPoints(10 - propertyPerson.reduce((sum: number, skill: Skill) => sum + skill.value, 0));
        setPropertyPerson(newPropertyPerson);
    }

    function setAddSkill(value: number, idProperty: number, idSkill: number): void {
        debugger;
        let difference: number = 0;
        const newPropertyPerson: Skill[] = propertyPerson.map((skill: Skill) => {
            if (skill.id === idProperty) {
                difference = value - skill.addSkills.find((skill) => skill.id === idSkill).value;
                skill.addSkills.find((skill) => skill.id === idSkill).value = value;
            }
            return skill;
        })

        setPoints(points - difference);
        setPropertyPerson(newPropertyPerson);
    }

    function create(e?) {
        debugger;
        if (!namePerson || savedPerson && savedPerson[savedPerson.length-1] === namePerson) {
            setNamePerson('Имя');
        }
        setPerson(!newPerson);

        if (deathPerson) {
            initProperties(initPropertyPerson(), initAddPropertyPerson(), '');
        }
        setPoints(0);
        setDeathPerson(false);


        const newPersons = savedPerson?.map((savedPerson) => {
            if(savedPerson?.addProperty[0].value !== 0) return savedPerson;
        })
        setSavedPerson(newPersons);
        if (e) {
            e.preventDefault();
        }
        console.log(propertyPerson);
    }

    function atack(): void {
        const newAddPropertyPerson: AddSkills[] = addPropertyPerson.map((addProperty: AddSkills) => {
            if (addProperty.name === "Жизненная сила" && addProperty.value >= 0) {
                addProperty.value = addProperty.value - 1;
                setPoints(points + 50);
                debugger;
                if (addProperty.value <= 0) {
                    setDeathPerson(true);
                }
            }
            return addProperty;
        });
        debugger;
        setAddPropertyPerson(newAddPropertyPerson);
    }

    function save(): void {
        debugger;
        let newCharacters: Characters[] = savedPerson;
        let saveImage: string = appState;

        if (!newCharacters) {
            newCharacters = [];
        }
        newCharacters.push({image: saveImage, name: namePerson, property: structuredClone(propertyPerson), addProperty: structuredClone(addPropertyPerson)})
        setSavedPerson(newCharacters);
        setPerson(!newPerson);
        setDeathPerson(true);

        initProperties(initPropertyPerson(), initAddPropertyPerson(), '');
    }

    function setCharacter(index: number): void {
        setPerson(!newPerson);
        initProperties(setOldCharacter(savedPerson[index].property), setOldAddCharacter(savedPerson[index].addProperty), savedPerson[index].name)
        setAppState(savedPerson[index].image)
        setPoints(0);
        setDeathPerson(false);
    }

    function initProperties(initProperty: Skill[], initAddProperty: AddSkills[], initName: string): void {
        setPropertyPerson(initProperty);
        setAddPropertyPerson(initAddProperty);
        setNamePerson(initName);
    }

    function increment(): void {
        setPoints(points + 1);
    }

  return (
    <div className="App">
      <header className="App-header">

          {!newPerson &&
              <div>
              <h1>Создать персонажа</h1>
              <h2>Осталось баллов {points}</h2>

              <TextField id="standard-basic" label="Имя" variant="outlined" type={"text"} required={true} onBlur={event => setNamePerson(event.target.value)}/>
              </div>
          }
              {!newPerson && propertyPerson.map((skill: Skill) =>
                  <PropertyPerson propertyPerson={skill} thisIsCard={false} setPropertyValue={set} points={points} key={skill.id}/>
              )}
          {!newPerson && <div>
              <Button variant="contained" className={'button'} onClick={create}>Создать</Button>
              <Button variant="contained" className={'button'} onClick={event => setSeePersons(!seePersons)}>Выбрать персонажа</Button>
              {seePersons && <CardsPersons characters={savedPerson} setCharacter={setCharacter}/>}
          </div>}




          {newPerson && !deathPerson &&
              <div>
                  <h2 style={{margin: '10px'}}>Количество баллов {points}</h2>
                  <div>
                      <h1 style={{margin: '10px'}}>{namePerson}</h1>
                      <img
                          src={appState}
                      />
                      <h3 style={{margin: '10px'}}>Характеристики персонажа</h3>
                      {propertyPerson?.map((skill: Skill) =>
                          <PropertyPerson propertyPerson={skill} setPropertyValue={setAddSkill} points={points} thisIsCard={true} key={skill.id}/>)}

                      <h3 style={{margin: '10px'}}>Дополнительные характеристики персонажа</h3>
                      {addPropertyPerson?.map((addskill: Skill) =>
                          <PropertyPerson propertyPerson={addskill} thisIsCard={true} key={addskill.id}/>)}

                  </div>

                  <div>
                      <Button variant="contained" className={'button'} onClick={increment}>Получить балл</Button>
                      <Button variant="contained" className={'button'} onClick={atack}>Пойти в атаку</Button>
                      <Button variant="contained" className={'button'} onClick={save}>Сохранить персонажа</Button>
                  </div>
              </div>}


          {deathPerson && <div>
              <h1>{namePerson} умер в бою</h1>
              <Button variant="contained" className={'button'} onClick={create}>Создать нового персонажа</Button>
          </div>}

      </header>
    </div>
  );
}

export default App;
