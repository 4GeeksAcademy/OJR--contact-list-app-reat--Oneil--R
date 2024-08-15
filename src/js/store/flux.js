const getState = ({ getStore, getActions, setStore }) => {
	return {
        store: {
            contacts: []
        },
        actions: {
            getContacts: async() => {
                let response = await fetch ('https://playground.4geeks.com/contact/agendas/Oneil-R/contacts')
				if(response.status==404){
					getActions().createAgenda()
				}else if(response.status==200){
					let data = await response.json()
					console.log(data)
					setStore({contacts:data.contacts})
					return true
				}else{
					alert('Error occurried while fetching contacts, please try again later')
				}
            },
            createAgenda: async() => {
                let response = await fetch ('https://playground.4geeks.com/contact/agendas/Oneil-R/',{
					method:'POST'
				})
				if(response.status==201){
					getActions().getContacts()
				}else{
					alert('Error occurried while creating an agenda, please try again later')
				}
            },
            addContact: (contact) => {
                fetch('https://playground.4geeks.com/contact/docs/api/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contact)
                })
                .then(response => response.json())
                .then(data => {
                    const store = getStore();
                    setStore({ contacts: [...store.contacts, data] });
                })
                .catch(error => console.log("Error adding contact", error));
            },
            updateContact: (id, contact) => {
                fetch(`https://playground.4geeks.com/contact/docs/api/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contact)
                })
                .then(response => response.json())
                .then(data => {
                    const store = getStore();
                    const updatedContacts = store.contacts.map(item => item.id === id ? data : item);
                    setStore({ contacts: updatedContacts });
                })
                .catch(error => console.log("Error updating contact", error));
            },
            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/docs/api/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(() => {
                    const store = getStore();
                    const filteredContacts = store.contacts.filter(item => item.id !== id);
                    setStore({ contacts: filteredContacts });
                })
                .catch(error => console.log("Error deleting contact", error));
            }
        }
    };
};

export default getState;
