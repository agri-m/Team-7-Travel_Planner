
app.use(cors());
app.use(express.json());

app.use('/api/v1/documents', documentRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

module.exports = app;