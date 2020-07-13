import React, { createContext, useState, ChangeEvent, useEffect } from "react";
import axios from "axios";

interface ContextData {
  formData: {
    name: string;
    email: string;
    whatsapp: string;
  };
  handleInputChange(event: ChangeEvent<HTMLInputElement>): void;
  ufs: string[];
  cities: string[];
  selectedUf: string;
  selectedCity: string;
  handleSelected(type: string, event: ChangeEvent<HTMLSelectElement>): void;
}

interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}

const Context = createContext<ContextData>({} as ContextData);
export const ObjectsFormContextProvider: React.FC = ({ children }) => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "") return;

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cities = response.data.map((city) => city.nome);
        setCities(cities);
      });
  }, [selectedUf]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function handleSelected(type: string, event: ChangeEvent<HTMLSelectElement>) {
    if (type === "city") {
      handleSelectedCity(event);
    }
    if (type === "uf") {
      handleSelectedUf(event);
    }
  }

  return (
    <Context.Provider
      value={{
        formData,
        handleInputChange,
        ufs,
        cities,
        selectedUf,
        selectedCity,
        handleSelected,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
