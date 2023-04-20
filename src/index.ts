import express from 'express';
import { PORT } from './config';

const app = express();

const CATS: { [id: string]: { id: string; name: string; image: string } } = {
    '1': {
        id: '1',
        name: 'Chano',
        image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    '2': {
        id: '2',
        name: 'Cholele',
        image: 'https://images.pexels.com/photos/2686914/pexels-photo-2686914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    '3': {
        id: '3',
        name: 'Ben',
        image: 'https://images.pexels.com/photos/2539094/pexels-photo-2539094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
};

app.get('/health', (req, res) => {
    res.send(`<h1>Server is up!</h1><span>${new Date()}</span>`);
});

const Cat = (props: typeof CATS[keyof typeof CATS]) => {
    return `
    <li>
        <h3>${props.name}<h3>
        <img width="300px" height="300px" src="${props.image}"/>
        <a href="/cats/${props.id}" target="_blank">Go to API URL</a>
    </li>`;
};

app.get('/', (req, res) => {
    res.send(`
    <h1>Cats</h1>
    <ul>
        ${Object.values(CATS)
            .map((cat) => Cat(cat))
            .join('')} 
    </ul>
    `);
});
app.get('/cats', (req, res) => {
    res.json(CATS);
});

app.get('/cats/:id', (req, res) => {
    const cat = CATS[req.params.id];
    if (cat != null) return res.json(cat);
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is up at http://localhost:${PORT}`);
});
