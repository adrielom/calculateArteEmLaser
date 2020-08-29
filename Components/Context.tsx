import React, { createContext, useState } from 'react';

//Global States can be imported here
export const Context = createContext({ larg: {}, alt: {}, qnt: {}, topElemId: {} });
//! This is pretty important! Defines how it's set up

export const Provider = (props) => {
    const [largura, setLargura] = useState(20);
    const [altura, setAltura] = useState(20);
    const [quantity, setQuantity] = useState(1)
    const [topElementId, setTopElementId] = useState(0)

    return (
        <Context.Provider value={{ larg: [largura, setLargura], alt: [altura, setAltura], qnt: [quantity, setQuantity], topElemId: [topElementId, setTopElementId] }}>
            {props.children}
        </Context.Provider>
    );
};