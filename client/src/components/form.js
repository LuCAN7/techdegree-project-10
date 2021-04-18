import React, { useState } from 'react';

export const Tester = () => {
  const [person, setPerson] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(person);
    if (person.name && person.email) {
      const newPerson = { ...person };
      setPerson([{ ...person }, newPerson]);
    }
  };

  return (
    <form>
      <label>name</label>
      <input
        type='text'
        name='name'
        value={person.name}
        placeholder='Enter Username'
        onChange={handleChange}
      />
      <label>Email</label>
      <input
        type='text'
        name='email'
        value={person.email}
        placeholder='Email'
        onChange={handleChange}
      />
      <button type='submit' onClick={handleSubmit}>
        SEND
      </button>
    </form>
  );
};
