<template>
    <div class="dashboard">
        <div>
            <h2>StarTech - Dashboard</h2>
            <div class="button-container">
                <button class="button-form" @click="fetchData">Carica Dati</button>
                <button class="button-form" @click="exportData">Esporta Dati</button>
            </div>
        </div>
        <div class="data-container">
            <table class="table-container" v-if="data.length">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Corsi Selezionati</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in data" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.first_name }}</td>
                        <td>{{ user.last_name }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.selected_courses }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            data: []
        };
    },
    methods: {
        async fetchData() {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:3000/data', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.data = response.data;
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
            }
        },
        async exportData() {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:3000/export', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    responseType: 'blob' // Per gestire la risposta come file binario
                });

                // Crea un link per scaricare il file CSV
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'startech-data.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Errore durante l\'esportazione dei dati:', error);
            }
        }
    }
};
</script>
<style scoped>
.dashboard {
    display: flex;
    flex-direction: column;
padding: 2em;
    flex: 1;
    flex-wrap: wrap;
    background-color: #EEEEEE;
}

.data-head {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex: 1;
}

.dashboard h2 {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    color: #2e0249;
    margin: 0;
}

/* Buttons */
.button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-align: center;
}

.button-container button {
    width: 200px;
    border-radius: 20px;
    border: 2px solid #a91079;
    background-color: #EEEEEE;
    color: #a91079;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    margin: 2em;

}

.button-container button:hover {
    background-color: rgba(169, 16, 121, 0.5);
    color: #EEEEEE;
}

/* Table */
.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

thead {
    background-color: #2e0249;
    color: #EEEEEE;
}

th,
td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
}

th {
    font-weight: 600;
}

th:hover {
    background-color: #2e0249;
}

tbody tr:nth-child(even) {
    background-color: #dcd5d5;
}

tbody tr:hover {
    background-color: #eee3ee;
}

tbody td {
    color: #2e0249;
}

tbody tr:last-child td {
    border-bottom: none;
}
</style>