const app = require(".");

const PORT = process.env.PORT || 5454;
app.listen(PORT, async () => {
    try {
        console.log(`App is running on port ${PORT}.`);
        console.log(process.env.PORT);
    } catch (error) {
        
    }
});
