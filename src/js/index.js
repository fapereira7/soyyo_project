const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/entities/filter', async(req, res) => {
    let filter = req.body;
    const startId = filter.startId;
    const endId = filter.endId;
    const sortedEntities = [];

    startId === undefined ? (startId === 1, console.log("Faltan datos de inicio")) : startId;
    endId === undefined ? (endId === 5, console.log("Faltan datos finales")) : endId;

    const entities = [...Array(endId - startId + 1)].map((_, i) => Number(startId) + i);

    for (let i = 0; i < entities.length; i++) {
        const url = `https://f56c0ao48b.execute-api.us-east-1.amazonaws.com/dev/entity/v2.1/entities/${entities[i]}`;

        try {
            const response = await axios.get(url);

            const entity = response.data.data;

            Object.entries(entity).length === 0;

            if (Object.entries(entity).length === 0) {
                sortedEntities.push('La entidad: ' + entities[i] + ' no existe');
            } else {
                sortedEntities.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }

            sortedEntities.push(entity);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error en validación datos de entrada');
        }
    }
    res.json(sortedEntities);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});