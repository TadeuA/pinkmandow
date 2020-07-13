import React, { useState, FormEvent, useContext } from "react";

import {
  InputForm,
  SelectForm,
  CheckBoxTextForm,
} from "../../components/ObjectsForm";

import "./styles.css";

const Home = () => {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  const items = [
    { title: "fezmesmoz", name: "mania", id: 2 },
    { title: "fezmesmoz", name: "mania", id: 2 },
    { title: "fezmesmoz", name: "mania", id: 2 },
  ];

  return (
    <div id="page-create-point">
      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <InputForm
            id="name"
            name="name"
            type="text"
            title="Nome da entidade"
          />
          <div className="field-group">
            <InputForm id="email" name="email" type="email" title="E-mail" />

            <InputForm
              id="whatsapp"
              name="whatsapp"
              type="tel"
              title="Whatsapp"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
          </legend>
          <div className="field-group">
            <SelectForm
              title="Estado (UF)"
              name="uf"
              id="uf"
              frist="Selecione uma UF"
            />

            <SelectForm
              title="Cidade"
              name="city"
              id="city"
              frist="Selecione uma Cidade"
            />
          </div>
          <CheckBoxTextForm item={items} section={1} />
          <CheckBoxTextForm item={items} section={2} />
        </fieldset>
      </form>
    </div>
  );
};

export default Home;
